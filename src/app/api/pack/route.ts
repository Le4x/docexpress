import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import {
  getActivePackForUser,
  usePackDocument
} from '@/lib/kv-storage'
import { getDocumentBySlug } from '@/data/documents'
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
import { sendDocumentEmail } from '@/lib/resend'

// GET: Vérifier si l'utilisateur a un pack actif
export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const activePack = await getActivePackForUser(email)

    if (activePack) {
      return NextResponse.json({
        hasPack: true,
        packId: activePack.packId,
        documentsRemaining: activePack.data.documentsRemaining,
        documentsTotal: activePack.data.documentsTotal,
        expiresAt: activePack.data.expiresAt,
        documentsUsed: activePack.data.documentsUsed
      })
    }

    return NextResponse.json({ hasPack: false })
  } catch (error) {
    console.error('Erreur vérification pack:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST: Utiliser un document du pack
export async function POST(request: NextRequest) {
  try {
    const { email, packId, documentSlug, formData } = await request.json()

    if (!email || !packId || !documentSlug || !formData) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    // Vérifier que le pack appartient bien à cet email
    const activePack = await getActivePackForUser(email)
    if (!activePack || activePack.packId !== packId) {
      return NextResponse.json({ error: 'Pack invalide ou expiré' }, { status: 403 })
    }

    // Vérifier que le document existe
    const documentInfo = getDocumentBySlug(documentSlug)
    if (!documentInfo) {
      return NextResponse.json({ error: 'Document non trouvé' }, { status: 404 })
    }

    // Utiliser un document du pack
    const result = await usePackDocument(packId, documentSlug)
    if (!result.success) {
      return NextResponse.json({
        error: 'Plus de documents disponibles dans votre pack',
        documentsRemaining: 0
      }, { status: 403 })
    }

    // Générer le PDF
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

    // Envoyer par email
    try {
      await sendDocumentEmail({
        to: email,
        documentTitle: documentInfo.title,
        pdfBuffer: Buffer.from(pdfBuffer),
        fileName: `${documentSlug}.pdf`
      })
    } catch (emailError) {
      console.error('Erreur envoi email:', emailError)
    }

    // Retourner le PDF avec info sur les documents restants
    const response = new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${documentSlug}.pdf"`,
        'X-Documents-Remaining': result.remaining.toString()
      },
    })

    return response

  } catch (error) {
    console.error('Erreur utilisation pack:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
