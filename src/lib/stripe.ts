// lib/stripe.ts

import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      // @ts-expect-error - API version mismatch with types
      apiVersion: '2025-12-18.acacia',
      typescript: true,
    })
  : null

// Vérifier si Stripe est configuré
export function isStripeConfigured(): boolean {
  return !!stripe
}

// Créer une session de checkout pour un abonnement
export async function createSubscriptionCheckout(
  priceId: string,
  customerEmail: string,
  successUrl: string,
  cancelUrl: string,
  customerId?: string
): Promise<string | null> {
  if (!stripe) return null

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: customerId ? undefined : customerEmail,
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        email: customerEmail,
      },
    },
  })

  return session.url
}

// Créer une session de checkout pour un achat unique
export async function createOneTimeCheckout(
  amount: number,
  productName: string,
  productDescription: string,
  customerEmail: string,
  successUrl: string,
  cancelUrl: string,
  metadata?: Record<string, string>
): Promise<string | null> {
  if (!stripe) return null

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: productName,
            description: productDescription,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata,
  })

  return session.url
}

// Créer un portail client pour gérer l'abonnement
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
): Promise<string | null> {
  if (!stripe) return null

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session.url
}

// Obtenir ou créer un client Stripe
export async function getOrCreateStripeCustomer(
  email: string,
  name?: string
): Promise<string | null> {
  if (!stripe) return null

  // Chercher un client existant
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  })

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0].id
  }

  // Créer un nouveau client
  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer.id
}

// Annuler un abonnement
export async function cancelSubscription(
  subscriptionId: string,
  immediately: boolean = false
): Promise<boolean> {
  if (!stripe) return false

  try {
    if (immediately) {
      await stripe.subscriptions.cancel(subscriptionId)
    } else {
      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      })
    }
    return true
  } catch (error) {
    console.error('Erreur annulation abonnement:', error)
    return false
  }
}

// Vérifier la signature du webhook
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event | null {
  if (!stripe) return null

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error) {
    console.error('Erreur vérification webhook:', error)
    return null
  }
}
