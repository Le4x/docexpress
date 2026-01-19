// config/pricing.ts

export const DOCUMENT_TIERS = {
  basic: {
    price: 199, // centimes
    freeWithAccount: true,
    documents: [
      'attestation-honneur',
      'autorisation-parentale',
      'declaration-perte-vol',
      'changement-adresse',
      'declaration-naissance'
    ]
  },
  standard: {
    price: 299,
    freeWithAccount: false,
    documents: [
      'lettre-demission-cdi',
      'lettre-demission-cdd',
      'resiliation-box-internet',
      'resiliation-mobile',
      'resiliation-assurance',
      'resiliation-salle-sport',
      'resiliation-electricite-gaz',
      'resiliation-streaming',
      'preavis-logement',
      'attestation-hebergement',
      'autorisation-sortie-territoire',
      'procuration',
      'opposition-prelevement'
    ]
  },
  premium: {
    price: 399,
    freeWithAccount: false,
    documents: [
      'mise-en-demeure',
      'contestation-contravention',
      'reclamation-banque',
      'reclamation-colis',
      'demande-remboursement',
      'demande-echeancier',
      'demande-logement-social',
      'demande-conge-parental',
      'demande-teletravail',
      'demande-augmentation',
      'lettre-motivation',
      'attestation-employeur'
    ]
  }
} as const

export type DocumentTier = keyof typeof DOCUMENT_TIERS

export const SUBSCRIPTION_PLANS = {
  free: {
    id: 'free',
    name: 'Gratuit',
    price: 0,
    interval: null,
    features: {
      documentsPerMonth: 1,
      accessTiers: ['basic'] as DocumentTier[],
      watermark: true,
      history: false,
      support: 'email'
    }
  },
  pass: {
    id: 'pass_monthly',
    name: 'Pass Mensuel',
    price: 499,
    interval: 'month',
    stripePriceId: process.env.STRIPE_PRICE_PASS_MONTHLY,
    features: {
      documentsPerMonth: -1, // illimité
      accessTiers: ['basic', 'standard', 'premium'] as DocumentTier[],
      watermark: false,
      history: true,
      support: 'priority'
    }
  },
  pro: {
    id: 'pro_monthly',
    name: 'Pro',
    price: 1999,
    interval: 'month',
    stripePriceId: process.env.STRIPE_PRICE_PRO_MONTHLY,
    features: {
      documentsPerMonth: -1,
      accessTiers: ['basic', 'standard', 'premium'] as DocumentTier[],
      watermark: false,
      history: true,
      support: 'priority',
      multiUser: 5,
      customLogo: true,
      apiAccess: true,
      exportWord: true
    }
  }
} as const

export type SubscriptionPlan = keyof typeof SUBSCRIPTION_PLANS

// Helper pour trouver le tier d'un document
export function getDocumentTier(documentSlug: string): DocumentTier | null {
  for (const [tier, config] of Object.entries(DOCUMENT_TIERS)) {
    if ((config.documents as readonly string[]).includes(documentSlug)) {
      return tier as DocumentTier
    }
  }
  return null
}

// Helper pour obtenir le prix d'un document
export function getDocumentPrice(documentSlug: string): number {
  const tier = getDocumentTier(documentSlug)
  if (!tier) return 299 // Prix par défaut
  return DOCUMENT_TIERS[tier].price
}

// Formater le prix pour l'affichage
export function formatPrice(priceInCents: number): string {
  return (priceInCents / 100).toFixed(2).replace('.', ',') + '€'
}
