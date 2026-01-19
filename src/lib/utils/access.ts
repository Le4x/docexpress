// lib/utils/access.ts

import { prisma } from '@/lib/prisma'
import { DOCUMENT_TIERS, SUBSCRIPTION_PLANS, getDocumentTier, type DocumentTier } from '@/config/pricing'

type AccessResult =
  | { allowed: true; reason: 'subscription' | 'free_tier' | 'one_time' }
  | {
      allowed: false
      reason: 'login_required' | 'upgrade_required' | 'limit_reached'
      requiredAction: string
      suggestedPrice?: number
    }

export async function checkDocumentAccess(
  documentSlug: string,
  userId?: string
): Promise<AccessResult> {
  // Trouver le tier du document
  const tier = getDocumentTier(documentSlug)

  if (!tier) {
    // Document non trouvé dans la config, considérer comme standard
    console.warn(`Document ${documentSlug} not found in pricing config, using standard tier`)
  }

  const effectiveTier = tier || 'standard'

  // Si pas connecté
  if (!userId) {
    return {
      allowed: false,
      reason: 'login_required',
      requiredAction: 'Créez un compte gratuit pour générer ce document',
    }
  }

  // Récupérer user avec subscription et usage
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      monthlyUsage: {
        where: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
      },
    },
  })

  if (!user) {
    return {
      allowed: false,
      reason: 'login_required',
      requiredAction: 'Compte introuvable',
    }
  }

  const currentUsage = user.monthlyUsage[0]?.count ?? 0
  const subscription = user.subscription
  const plan = (subscription?.plan ?? 'free') as keyof typeof SUBSCRIPTION_PLANS
  const planConfig = SUBSCRIPTION_PLANS[plan]

  // Vérifier si le plan donne accès au tier
  const hasAccess = planConfig.features.accessTiers.includes(effectiveTier as DocumentTier)

  // Plan payant actif avec accès au tier
  if (subscription?.status === 'active' && hasAccess && plan !== 'free') {
    return { allowed: true, reason: 'subscription' }
  }

  // Plan gratuit
  if (plan === 'free') {
    // Document basique et quota pas atteint
    if (effectiveTier === 'basic' && currentUsage < planConfig.features.documentsPerMonth) {
      return { allowed: true, reason: 'free_tier' }
    }

    // Quota atteint
    if (currentUsage >= planConfig.features.documentsPerMonth) {
      return {
        allowed: false,
        reason: 'limit_reached',
        requiredAction:
          'Vous avez atteint votre limite mensuelle. Passez au Pass Mensuel pour un accès illimité.',
      }
    }

    // Document non basique
    const docPrice = DOCUMENT_TIERS[effectiveTier as DocumentTier]?.price ?? 299
    return {
      allowed: false,
      reason: 'upgrade_required',
      requiredAction: `Ce document nécessite un achat à ${(docPrice / 100).toFixed(2)}€ ou le Pass Mensuel.`,
      suggestedPrice: docPrice,
    }
  }

  // Fallback
  return {
    allowed: false,
    reason: 'upgrade_required',
    requiredAction: 'Une mise à niveau est nécessaire pour accéder à ce document.',
  }
}

// Incrémenter l'usage mensuel
export async function incrementMonthlyUsage(userId: string): Promise<void> {
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()

  await prisma.monthlyUsage.upsert({
    where: {
      userId_month_year: { userId, month, year },
    },
    update: {
      count: { increment: 1 },
    },
    create: {
      userId,
      month,
      year,
      count: 1,
    },
  })
}

// Obtenir l'usage actuel
export async function getCurrentUsage(userId: string): Promise<{ count: number; limit: number }> {
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscription: true,
      monthlyUsage: {
        where: { month, year },
      },
    },
  })

  if (!user) {
    return { count: 0, limit: 1 }
  }

  const plan = (user.subscription?.plan ?? 'free') as keyof typeof SUBSCRIPTION_PLANS
  const planConfig = SUBSCRIPTION_PLANS[plan]
  const limit = planConfig.features.documentsPerMonth
  const count = user.monthlyUsage[0]?.count ?? 0

  return { count, limit }
}

// Vérifier si un utilisateur a un abonnement actif
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  })

  return subscription?.status === 'active' && subscription?.plan !== 'free'
}
