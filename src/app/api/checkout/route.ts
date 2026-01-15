import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getDocumentBySlug } from '@/data/documents'

export async function POST(request: NextRequest) {
  try {
    // Vérifier si Stripe est configuré
    if (!stripe) {
      return NextResponse.json({ error: 'Paiement non disponible' }, { status: 503 })
    }

    const { documentSlug, formData, email } = await request.json()

    const document = getDocumentBySlug(documentSlug)
    if (!document) {
      return NextResponse.json({ error: 'Document non trouvé' }, { status: 404 })
    }

    const appUrl = request.nextUrl.origin

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
            unit_amount: Math.round(document.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/documents/${documentSlug}`,
      customer_email: email,
      metadata: {
        documentSlug,
        formData: JSON.stringify(formData),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}