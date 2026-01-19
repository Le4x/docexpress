import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getDocumentBySlug } from '@/data/documents'

// Types de produits
type ProductType = 'single' | 'pack3'

// Prix des produits
const PRICES = {
  single: 2.99, // Prix par document
  pack3: 6.99,  // Pack 3 documents (-22%)
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier si Stripe est configuré
    if (!stripe) {
      return NextResponse.json({ error: 'Paiement non disponible' }, { status: 503 })
    }

    const body = await request.json()
    const { type, email } = body as { type: ProductType; email: string }

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const appUrl = request.nextUrl.origin

    // Achat d'un document individuel
    if (type === 'single' || !type) {
      const { documentSlug, formData } = body

      const document = getDocumentBySlug(documentSlug)
      if (!document) {
        return NextResponse.json({ error: 'Document non trouvé' }, { status: 404 })
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: document.title,
                description: document.shortDescription,
              },
              unit_amount: Math.round(PRICES.single * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&type=single`,
        cancel_url: `${appUrl}/documents/${documentSlug}`,
        customer_email: email,
        metadata: {
          type: 'single',
          documentSlug,
          formData: JSON.stringify(formData),
        },
      })

      return NextResponse.json({ url: session.url })
    }

    // Achat du pack 3 documents
    if (type === 'pack3') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Pack 3 Documents',
                description: '3 documents au choix parmi +30 modèles. Valable 1 an.',
              },
              unit_amount: Math.round(PRICES.pack3 * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&type=pack3`,
        cancel_url: `${appUrl}/#pricing`,
        customer_email: email,
        metadata: {
          type: 'pack3',
          documentsRemaining: '3',
        },
      })

      return NextResponse.json({ url: session.url })
    }

    return NextResponse.json({ error: 'Type de produit invalide' }, { status: 400 })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}
