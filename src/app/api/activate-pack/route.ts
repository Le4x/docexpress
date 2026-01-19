import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import {
  createPack,
  getPackByStripeSession,
  linkStripeSessionToPack
} from '@/lib/kv-storage'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID requis' }, { status: 400 })
    }

    // Vérifier si le pack existe déjà pour cette session
    const existingPack = await getPackByStripeSession(sessionId)
    if (existingPack) {
      return NextResponse.json({
        packId: existingPack.packId,
        email: existingPack.data.email,
        documentsRemaining: existingPack.data.documentsRemaining,
        expiresAt: existingPack.data.expiresAt,
        alreadyActivated: true
      })
    }

    // Vérifier si Stripe est configuré
    if (!stripe) {
      // Mode dev sans Stripe - créer un pack de test
      const email = 'test@docexpress.fr'
      const packId = await createPack(email, sessionId, 3)

      if (!packId) {
        return NextResponse.json({ error: 'Erreur création pack' }, { status: 500 })
      }

      await linkStripeSessionToPack(sessionId, packId)

      const now = new Date()
      const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)

      return NextResponse.json({
        packId,
        email,
        documentsRemaining: 3,
        expiresAt: expiresAt.toISOString()
      })
    }

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return NextResponse.json({ error: 'Session non trouvée' }, { status: 404 })
    }

    // Vérifier que le paiement est bien complété
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Paiement non complété' }, { status: 400 })
    }

    // Vérifier que c'est bien un achat de pack
    if (session.metadata?.type !== 'pack3') {
      return NextResponse.json({ error: 'Cette session n\'est pas un achat de pack' }, { status: 400 })
    }

    const email = session.customer_email
    if (!email) {
      return NextResponse.json({ error: 'Email non trouvé dans la session' }, { status: 400 })
    }

    // Créer le pack
    const packId = await createPack(email, sessionId, 3)

    if (!packId) {
      return NextResponse.json({ error: 'Erreur lors de la création du pack' }, { status: 500 })
    }

    // Lier la session au pack pour éviter les doublons
    await linkStripeSessionToPack(sessionId, packId)

    const now = new Date()
    const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)

    return NextResponse.json({
      packId,
      email,
      documentsRemaining: 3,
      expiresAt: expiresAt.toISOString()
    })

  } catch (error) {
    console.error('Erreur activation pack:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
