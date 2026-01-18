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
import { stripe } from '@/lib/stripe'
import { getDocumentBySlug } from '@/data/documents'

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID manquant' }, { status: 400 })
    }

    if (!stripe) {
      return NextResponse.json({ error: 'Stripe non configuré' }, { status: 503 })
    }

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Paiement non confirmé' }, { status: 403 })
    }

    const documentSlug = session.metadata?.documentSlug
    const formData = JSON.parse(session.metadata?.formData || '{}')

    if (!documentSlug || !formData) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const documentInfo = getDocumentBySlug(documentSlug)

    // Générer le PDF selon le type de document
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
        // Utiliser le template générique amélioré pour tous les autres documents
        pdfDocument = GenericDocument(formData, documentInfo?.title || 'Document')
        break
    }

    // Générer le buffer PDF
    const pdfBuffer = await renderToBuffer(pdfDocument)

    // Convertir en Uint8Array pour NextResponse
    const uint8Array = new Uint8Array(pdfBuffer)

    // Retourner le PDF
    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${documentSlug}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération du PDF' }, { status: 500 })
  }
}