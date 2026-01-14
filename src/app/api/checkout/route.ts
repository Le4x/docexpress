import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getDocumentBySlug } from '@/data/documents'

export async function POST(request: NextRequest) {
  try {
    const { documentSlug, formData, email } = await request.json()

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
            unit_amount: Math.round(document.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/documents/${documentSlug}`,
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