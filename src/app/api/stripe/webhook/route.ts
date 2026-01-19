// app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { stripe, constructWebhookEvent } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import type Stripe from 'stripe'

interface SubscriptionData {
  current_period_start: number
  current_period_end: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
    }

    const event = constructWebhookEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)

    if (!event) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    console.log(`[Stripe Webhook] Event type: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.mode === 'subscription') {
          await handleSubscriptionCreated(session)
        } else if (session.mode === 'payment') {
          await handleOneTimePayment(session)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handlePaymentFailed(invoice)
        break
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_email
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string

  if (!customerEmail || !subscriptionId) {
    console.error('[Stripe Webhook] Missing customer email or subscription ID')
    return
  }

  console.log(`[Stripe Webhook] Creating subscription for ${customerEmail}`)

  // Récupérer les détails de l'abonnement
  if (!stripe) return
  const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId)
  const subscription = subscriptionResponse as unknown as Stripe.Subscription & SubscriptionData

  const priceId = subscription.items.data[0]?.price.id
  const plan = priceId === process.env.STRIPE_PRICE_PRO_MONTHLY ? 'pro' : 'pass'

  // Trouver l'utilisateur
  const user = await prisma.user.findUnique({
    where: { email: customerEmail },
  })

  if (!user) {
    console.error(`[Stripe Webhook] User not found: ${customerEmail}`)
    return
  }

  // Mettre à jour ou créer l'abonnement
  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: {
      plan,
      status: 'active',
      stripeSubscriptionId: subscriptionId,
      stripePriceId: priceId,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: false,
    },
    create: {
      userId: user.id,
      plan,
      status: 'active',
      stripeSubscriptionId: subscriptionId,
      stripePriceId: priceId,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    },
  })

  // Mettre à jour le stripeCustomerId sur l'utilisateur
  await prisma.user.update({
    where: { id: user.id },
    data: { stripeCustomerId: customerId },
  })

  console.log(`[Stripe Webhook] Subscription ${plan} created for ${customerEmail}`)
}

async function handleSubscriptionUpdated(subscriptionEvent: Stripe.Subscription) {
  const subscription = subscriptionEvent as unknown as Stripe.Subscription & SubscriptionData
  const subscriptionId = subscription.id

  console.log(`[Stripe Webhook] Updating subscription ${subscriptionId}`)

  const priceId = subscription.items.data[0]?.price.id
  const plan = priceId === process.env.STRIPE_PRICE_PRO_MONTHLY ? 'pro' : 'pass'

  const status = subscription.status === 'active' ? 'active' : subscription.status === 'past_due' ? 'past_due' : 'canceled'

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      plan,
      status,
      stripePriceId: priceId,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  })

  console.log(`[Stripe Webhook] Subscription updated: ${status}`)
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const subscriptionId = subscription.id

  console.log(`[Stripe Webhook] Deleting subscription ${subscriptionId}`)

  // Remettre l'utilisateur sur le plan gratuit
  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      plan: 'free',
      status: 'canceled',
      stripeSubscriptionId: null,
      stripePriceId: null,
    },
  })

  console.log(`[Stripe Webhook] Subscription deleted, user reverted to free plan`)
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = (invoice as unknown as { subscription: string | null }).subscription

  if (!subscriptionId) return

  console.log(`[Stripe Webhook] Payment failed for subscription ${subscriptionId}`)

  await prisma.subscription.updateMany({
    where: { stripeSubscriptionId: subscriptionId },
    data: {
      status: 'past_due',
    },
  })
}

async function handleOneTimePayment(session: Stripe.Checkout.Session) {
  const customerEmail = session.customer_email
  const metadata = session.metadata

  console.log(`[Stripe Webhook] One-time payment completed for ${customerEmail}`)
  console.log(`[Stripe Webhook] Metadata:`, metadata)

  // Le traitement spécifique dépend des metadata
  // Par exemple, si c'est pour un document, on pourrait stocker le paiement
}

// Désactiver le parsing automatique du body
export const runtime = 'nodejs'
export const maxDuration = 30
