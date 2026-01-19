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

    console.log(`[Activate Pack] Activation demandée pour session: ${sessionId}`)

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID requis' }, { status: 400 })
    }

    // Vérifier si le pack existe déjà pour cette session
    const existingPack = await getPackByStripeSession(sessionId)
    if (existingPack) {
      console.log(`[Activate Pack] Pack déjà existant: ${existingPack.packId}`)
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
      console.log(`[Activate Pack] Mode dev - création pack test`)
      const email = 'test@docexpress.fr'
      const packId = await createPack(email, sessionId, 3)

      if (!packId) {
        console.error(`[Activate Pack] Échec création pack test`)
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
    console.log(`[Activate Pack] Récupération session Stripe...`)
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      console.error(`[Activate Pack] Session Stripe non trouvée`)
      return NextResponse.json({ error: 'Session non trouvée' }, { status: 404 })
    }

    console.log(`[Activate Pack] Session Stripe trouvée - payment_status: ${session.payment_status}, type: ${session.metadata?.type}`)

    // Vérifier que le paiement est bien complété
    if (session.payment_status !== 'paid') {
      console.error(`[Activate Pack] Paiement non complété: ${session.payment_status}`)
      return NextResponse.json({ error: 'Paiement non complété' }, { status: 400 })
    }

    // Vérifier que c'est bien un achat de pack
    if (session.metadata?.type !== 'pack3') {
      console.error(`[Activate Pack] Type incorrect: ${session.metadata?.type}`)
      return NextResponse.json({ error: 'Cette session n\'est pas un achat de pack' }, { status: 400 })
    }

    const email = session.customer_email
    console.log(`[Activate Pack] Email depuis Stripe: ${email}`)

    if (!email) {
      console.error(`[Activate Pack] Email manquant dans la session Stripe`)
      return NextResponse.json({ error: 'Email non trouvé dans la session' }, { status: 400 })
    }

    // Créer le pack
    console.log(`[Activate Pack] Création du pack pour ${email}...`)
    const packId = await createPack(email, sessionId, 3)

    if (!packId) {
      console.error(`[Activate Pack] Échec création pack pour ${email}`)
      return NextResponse.json({ error: 'Erreur lors de la création du pack' }, { status: 500 })
    }

    console.log(`[Activate Pack] Pack créé avec succès: ${packId}`)

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
    console.error('[Activate Pack] Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
