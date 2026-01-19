import { kv } from '@vercel/kv'
import { Ratelimit } from '@upstash/ratelimit'

// Rate limiter: 5 requêtes par IP par heure pour les documents gratuits
export const freeDocumentRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
  prefix: 'ratelimit:free-doc',
})

// Rate limiter: 10 vérifications email par IP par heure
export const emailCheckRatelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 h'),
  analytics: true,
  prefix: 'ratelimit:email-check',
})

// Clés KV
const USED_EMAILS_PREFIX = 'used-email:'
const VERIFICATION_CODE_PREFIX = 'verify-code:'
const PENDING_VERIFICATION_PREFIX = 'pending-verify:'

// Vérifier si un email a déjà utilisé son document gratuit
export async function hasEmailUsedFreeDocument(email: string): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const result = await kv.get(`${USED_EMAILS_PREFIX}${normalizedEmail}`)
    return result !== null
  } catch (error) {
    console.error('Erreur KV hasEmailUsedFreeDocument:', error)
    // En cas d'erreur KV, on autorise (fallback gracieux)
    return false
  }
}

// Marquer un email comme ayant utilisé son document gratuit
export async function markEmailAsUsed(email: string, documentSlug: string): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    await kv.set(`${USED_EMAILS_PREFIX}${normalizedEmail}`, {
      usedAt: new Date().toISOString(),
      documentSlug,
    })
    return true
  } catch (error) {
    console.error('Erreur KV markEmailAsUsed:', error)
    return false
  }
}

// Générer un code de vérification (6 chiffres)
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Stocker un code de vérification (expire après 10 minutes)
export async function storeVerificationCode(email: string, code: string): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    await kv.set(
      `${VERIFICATION_CODE_PREFIX}${normalizedEmail}`,
      code,
      { ex: 600 } // Expire après 10 minutes
    )
    return true
  } catch (error) {
    console.error('Erreur KV storeVerificationCode:', error)
    return false
  }
}

// Vérifier un code
export async function verifyCode(email: string, code: string): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const storedCode = await kv.get(`${VERIFICATION_CODE_PREFIX}${normalizedEmail}`)

    if (storedCode === code) {
      // Supprimer le code après vérification réussie
      await kv.del(`${VERIFICATION_CODE_PREFIX}${normalizedEmail}`)
      return true
    }
    return false
  } catch (error) {
    console.error('Erreur KV verifyCode:', error)
    return false
  }
}

// Stocker une vérification en attente (pour le flow document gratuit)
export async function storePendingVerification(
  email: string,
  documentSlug: string,
  formData: Record<string, string>
): Promise<boolean> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    await kv.set(
      `${PENDING_VERIFICATION_PREFIX}${normalizedEmail}`,
      { documentSlug, formData },
      { ex: 600 } // Expire après 10 minutes
    )
    return true
  } catch (error) {
    console.error('Erreur KV storePendingVerification:', error)
    return false
  }
}

// Récupérer une vérification en attente
export async function getPendingVerification(
  email: string
): Promise<{ documentSlug: string; formData: Record<string, string> } | null> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const data = await kv.get<{ documentSlug: string; formData: Record<string, string> }>(
      `${PENDING_VERIFICATION_PREFIX}${normalizedEmail}`
    )
    return data
  } catch (error) {
    console.error('Erreur KV getPendingVerification:', error)
    return null
  }
}

// Supprimer une vérification en attente
export async function deletePendingVerification(email: string): Promise<void> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    await kv.del(`${PENDING_VERIFICATION_PREFIX}${normalizedEmail}`)
  } catch (error) {
    console.error('Erreur KV deletePendingVerification:', error)
  }
}

// Statistiques (optionnel)
export async function getFreeDocumentStats(): Promise<{ totalUsed: number }> {
  try {
    // Note: Cette méthode est limitée, Vercel KV n'a pas de scan complet
    // Pour des stats complètes, utiliser un compteur dédié
    const count = await kv.get<number>('stats:free-docs-count') || 0
    return { totalUsed: count }
  } catch (error) {
    console.error('Erreur KV getFreeDocumentStats:', error)
    return { totalUsed: 0 }
  }
}

// Incrémenter le compteur de documents gratuits
export async function incrementFreeDocumentCount(): Promise<void> {
  try {
    await kv.incr('stats:free-docs-count')
  } catch (error) {
    console.error('Erreur KV incrementFreeDocumentCount:', error)
  }
}

// ============================================
// GESTION DES PACKS
// ============================================

const PACK_PREFIX = 'pack:'

interface PackData {
  email: string
  documentsRemaining: number
  documentsTotal: number
  purchasedAt: string
  expiresAt: string
  stripeSessionId: string
  documentsUsed: string[] // Liste des slugs des documents déjà générés
}

// Créer un nouveau pack pour un utilisateur
export async function createPack(
  email: string,
  stripeSessionId: string,
  documentsTotal: number = 3
): Promise<string | null> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const packId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const now = new Date()
    const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000) // 1 an

    const packData: PackData = {
      email: normalizedEmail,
      documentsRemaining: documentsTotal,
      documentsTotal,
      purchasedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      stripeSessionId,
      documentsUsed: [],
    }

    // Stocker le pack
    await kv.set(`${PACK_PREFIX}${packId}`, packData)

    // Associer le pack à l'email de l'utilisateur
    const userPacks = await getUserPacks(normalizedEmail)
    userPacks.push(packId)
    await kv.set(`user-packs:${normalizedEmail}`, userPacks)

    return packId
  } catch (error) {
    console.error('Erreur KV createPack:', error)
    return null
  }
}

// Récupérer les packs d'un utilisateur
export async function getUserPacks(email: string): Promise<string[]> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const packs = await kv.get<string[]>(`user-packs:${normalizedEmail}`)
    return packs || []
  } catch (error) {
    console.error('Erreur KV getUserPacks:', error)
    return []
  }
}

// Récupérer les données d'un pack
export async function getPackData(packId: string): Promise<PackData | null> {
  try {
    return await kv.get<PackData>(`${PACK_PREFIX}${packId}`)
  } catch (error) {
    console.error('Erreur KV getPackData:', error)
    return null
  }
}

// Vérifier si un utilisateur a un pack actif avec des documents restants
export async function getActivePackForUser(email: string): Promise<{ packId: string; data: PackData } | null> {
  try {
    const normalizedEmail = email.toLowerCase().trim()
    const packIds = await getUserPacks(normalizedEmail)

    for (const packId of packIds) {
      const packData = await getPackData(packId)
      if (packData) {
        const now = new Date()
        const expiresAt = new Date(packData.expiresAt)

        // Vérifier si le pack est encore valide et a des documents restants
        if (now < expiresAt && packData.documentsRemaining > 0) {
          return { packId, data: packData }
        }
      }
    }

    return null
  } catch (error) {
    console.error('Erreur KV getActivePackForUser:', error)
    return null
  }
}

// Utiliser un document du pack
export async function usePackDocument(
  packId: string,
  documentSlug: string
): Promise<{ success: boolean; remaining: number }> {
  try {
    const packData = await getPackData(packId)
    if (!packData) {
      return { success: false, remaining: 0 }
    }

    // Vérifier expiration
    const now = new Date()
    const expiresAt = new Date(packData.expiresAt)
    if (now >= expiresAt) {
      return { success: false, remaining: 0 }
    }

    // Vérifier documents restants
    if (packData.documentsRemaining <= 0) {
      return { success: false, remaining: 0 }
    }

    // Mettre à jour le pack
    packData.documentsRemaining -= 1
    packData.documentsUsed.push(documentSlug)

    await kv.set(`${PACK_PREFIX}${packId}`, packData)

    return { success: true, remaining: packData.documentsRemaining }
  } catch (error) {
    console.error('Erreur KV usePackDocument:', error)
    return { success: false, remaining: 0 }
  }
}

// Vérifier si un pack existe pour une session Stripe
export async function getPackByStripeSession(sessionId: string): Promise<{ packId: string; data: PackData } | null> {
  // Note: Cette fonction nécessiterait un index secondaire en production
  // Pour l'instant, on stocke aussi par session_id
  try {
    const packId = await kv.get<string>(`stripe-session:${sessionId}`)
    if (packId) {
      const data = await getPackData(packId)
      if (data) {
        return { packId, data }
      }
    }
    return null
  } catch (error) {
    console.error('Erreur KV getPackByStripeSession:', error)
    return null
  }
}

// Stocker l'association session Stripe -> pack
export async function linkStripeSessionToPack(sessionId: string, packId: string): Promise<void> {
  try {
    await kv.set(`stripe-session:${sessionId}`, packId)
  } catch (error) {
    console.error('Erreur KV linkStripeSessionToPack:', error)
  }
}
