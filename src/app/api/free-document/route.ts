import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { headers } from 'next/headers'
import {
  LettreDemissionCDI,
  LettreDemissionCDD,
  ResiliationBox,
  ResiliationMobile,
  ResiliationAssurance,
  PreavisLogement,
  AttestationHonneur,
  AttestationHebergement,
  GenericDocument
} from '@/lib/pdf-templates'
import { getDocumentBySlug } from '@/data/documents'
import { sendDocumentEmail } from '@/lib/resend'
import {
  hasEmailUsedFreeDocument,
  markEmailAsUsed,
  generateVerificationCode,
  storeVerificationCode,
  verifyCode,
  storePendingVerification,
  getPendingVerification,
  deletePendingVerification,
  incrementFreeDocumentCount,
  freeDocumentRatelimit,
  emailCheckRatelimit
} from '@/lib/kv-storage'
import { sendVerificationEmail, sendFollowUpEmail } from '@/lib/email-templates'

// Helper pour obtenir l'IP
async function getClientIP(request: NextRequest): Promise<string> {
  const headersList = await headers()
  const forwardedFor = headersList.get('x-forwarded-for')
  const realIP = headersList.get('x-real-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  return '127.0.0.1'
}

// GET: Vérifier éligibilité d'un email
export async function GET(request: NextRequest) {
  try {
    const ip = await getClientIP(request)

    // Rate limiting
    const { success: rateLimitOk } = await emailCheckRatelimit.limit(ip)
    if (!rateLimitOk) {
      return NextResponse.json({
        error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.',
        rateLimited: true
      }, { status: 429 })
    }

    const email = request.nextUrl.searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const hasUsed = await hasEmailUsedFreeDocument(email)

    return NextResponse.json({
      eligible: !hasUsed,
      message: !hasUsed
        ? 'Vous êtes éligible au document gratuit !'
        : 'Vous avez déjà utilisé votre document gratuit.'
    })
  } catch (error) {
    console.error('Erreur vérification éligibilité:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST: Initier le processus ou générer le document
export async function POST(request: NextRequest) {
  try {
    const ip = await getClientIP(request)
    const body = await request.json()
    const { action } = body

    // Action: Envoyer code de vérification
    if (action === 'send-code') {
      const { email, documentSlug, formData } = body

      if (!email || !documentSlug || !formData) {
        return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
      }

      // Rate limiting
      const { success: rateLimitOk } = await emailCheckRatelimit.limit(ip)
      if (!rateLimitOk) {
        return NextResponse.json({
          error: 'Trop de requêtes. Veuillez réessayer dans quelques minutes.',
          rateLimited: true
        }, { status: 429 })
      }

      // Vérifier éligibilité
      const hasUsed = await hasEmailUsedFreeDocument(email)
      if (hasUsed) {
        return NextResponse.json({
          error: 'Vous avez déjà utilisé votre document gratuit.',
          requirePayment: true
        }, { status: 403 })
      }

      // Générer et stocker le code
      const code = generateVerificationCode()
      await storeVerificationCode(email, code)
      await storePendingVerification(email, documentSlug, formData)

      // Envoyer l'email avec le code
      const emailSent = await sendVerificationEmail(email, code)

      if (!emailSent) {
        return NextResponse.json({
          error: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer.'
        }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: 'Code de vérification envoyé à votre adresse email.'
      })
    }

    // Action: Vérifier code et générer document
    if (action === 'verify-and-generate') {
      const { email, code } = body

      if (!email || !code) {
        return NextResponse.json({ error: 'Email et code requis' }, { status: 400 })
      }

      // Rate limiting pour génération
      const { success: rateLimitOk } = await freeDocumentRatelimit.limit(ip)
      if (!rateLimitOk) {
        return NextResponse.json({
          error: 'Trop de tentatives. Veuillez réessayer dans une heure.',
          rateLimited: true
        }, { status: 429 })
      }

      // Vérifier le code
      const isValid = await verifyCode(email, code)
      if (!isValid) {
        return NextResponse.json({
          error: 'Code invalide ou expiré. Veuillez redemander un code.'
        }, { status: 400 })
      }

      // Récupérer les données en attente
      const pendingData = await getPendingVerification(email)
      if (!pendingData) {
        return NextResponse.json({
          error: 'Session expirée. Veuillez recommencer.'
        }, { status: 400 })
      }

      const { documentSlug, formData } = pendingData

      const documentInfo = getDocumentBySlug(documentSlug)
      if (!documentInfo) {
        return NextResponse.json({ error: 'Document non trouvé' }, { status: 404 })
      }

      // Générer le PDF (cast en any car formData est générique)
      let pdfDocument
      switch (documentSlug) {
        case 'lettre-demission-cdi':
          pdfDocument = LettreDemissionCDI(formData as any)
          break
        case 'lettre-demission-cdd':
          pdfDocument = LettreDemissionCDD(formData as any)
          break
        case 'resiliation-box-internet':
          pdfDocument = ResiliationBox(formData as any)
          break
        case 'resiliation-mobile':
          pdfDocument = ResiliationMobile(formData as any)
          break
        case 'resiliation-assurance':
          pdfDocument = ResiliationAssurance(formData as any)
          break
        case 'preavis-logement':
          pdfDocument = PreavisLogement(formData as any)
          break
        case 'attestation-honneur':
          pdfDocument = AttestationHonneur(formData as any)
          break
        case 'attestation-hebergement':
          pdfDocument = AttestationHebergement(formData as any)
          break
        default:
          pdfDocument = GenericDocument(formData as any, documentInfo.title)
          break
      }

      const pdfBuffer = await renderToBuffer(pdfDocument)

      // Marquer l'email comme utilisé
      await markEmailAsUsed(email, documentSlug)
      await incrementFreeDocumentCount()
      await deletePendingVerification(email)

      // Envoyer le document par email
      try {
        await sendDocumentEmail({
          to: email,
          documentTitle: documentInfo.title,
          pdfBuffer: Buffer.from(pdfBuffer),
          fileName: `${documentSlug}.pdf`
        })
      } catch (emailError) {
        console.error('Erreur envoi email document:', emailError)
      }

      // Envoyer email de relance (après 2 minutes pour ne pas bloquer)
      setTimeout(async () => {
        try {
          await sendFollowUpEmail(email, documentInfo.title)
        } catch (e) {
          console.error('Erreur envoi email relance:', e)
        }
      }, 120000) // 2 minutes

      // Retourner le PDF
      return new NextResponse(new Uint8Array(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${documentSlug}.pdf"`,
        },
      })
    }

    return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 })

  } catch (error) {
    console.error('Erreur génération document gratuit:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
