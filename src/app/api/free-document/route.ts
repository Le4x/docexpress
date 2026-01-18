import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
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

// Stockage en mémoire des emails utilisés (pour dev)
// En production, utiliser Vercel KV, Upstash Redis, ou une base de données
const usedEmails = new Set<string>()

// Pour persister les emails entre les redémarrages,
// on pourrait utiliser un fichier JSON ou Vercel KV
// Pour l'instant, on utilise une variable d'environnement comme liste
function getUsedEmailsFromEnv(): Set<string> {
  const envEmails = process.env.USED_FREE_EMAILS || ''
  if (envEmails) {
    envEmails.split(',').forEach(email => usedEmails.add(email.trim().toLowerCase()))
  }
  return usedEmails
}

// Vérifier si un email a déjà utilisé son document gratuit
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Email requis' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()
  const emails = getUsedEmailsFromEnv()

  const isEligible = !emails.has(normalizedEmail)

  return NextResponse.json({
    eligible: isEligible,
    message: isEligible
      ? 'Vous êtes éligible au document gratuit !'
      : 'Vous avez déjà utilisé votre document gratuit.'
  })
}

// Générer un document gratuit
export async function POST(request: NextRequest) {
  try {
    const { email, documentSlug, formData } = await request.json()

    if (!email || !documentSlug || !formData) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const emails = getUsedEmailsFromEnv()

    // Vérifier si l'email a déjà utilisé son document gratuit
    if (emails.has(normalizedEmail)) {
      return NextResponse.json({
        error: 'Vous avez déjà utilisé votre document gratuit. Veuillez passer au paiement.',
        requirePayment: true
      }, { status: 403 })
    }

    const documentInfo = getDocumentBySlug(documentSlug)
    if (!documentInfo) {
      return NextResponse.json({ error: 'Document non trouvé' }, { status: 404 })
    }

    // Générer le PDF
    let pdfDocument
    switch (documentSlug) {
      case 'lettre-demission-cdi':
        pdfDocument = LettreDemissionCDI(formData)
        break
      case 'lettre-demission-cdd':
        pdfDocument = LettreDemissionCDD(formData)
        break
      case 'resiliation-box-internet':
        pdfDocument = ResiliationBox(formData)
        break
      case 'resiliation-mobile':
        pdfDocument = ResiliationMobile(formData)
        break
      case 'resiliation-assurance':
        pdfDocument = ResiliationAssurance(formData)
        break
      case 'preavis-logement':
        pdfDocument = PreavisLogement(formData)
        break
      case 'attestation-honneur':
        pdfDocument = AttestationHonneur(formData)
        break
      case 'attestation-hebergement':
        pdfDocument = AttestationHebergement(formData)
        break
      default:
        pdfDocument = GenericDocument(formData, documentInfo.title)
        break
    }

    const pdfBuffer = await renderToBuffer(pdfDocument)

    // Marquer l'email comme utilisé
    usedEmails.add(normalizedEmail)

    // Envoyer le document par email
    try {
      await sendDocumentEmail({
        to: normalizedEmail,
        documentName: documentInfo.title,
        pdfBuffer: Buffer.from(pdfBuffer),
        documentSlug: documentSlug
      })
    } catch (emailError) {
      console.error('Erreur envoi email:', emailError)
      // On continue même si l'email échoue - on retourne le PDF directement
    }

    // Retourner le PDF directement pour téléchargement
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${documentSlug}.pdf"`,
      },
    })

  } catch (error) {
    console.error('Erreur génération document gratuit:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
