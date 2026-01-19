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
