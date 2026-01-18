/**
 * Script de test pour générer tous les PDFs
 * Usage: npx ts-node scripts/test-pdf-generation.ts
 */

import { renderToBuffer } from '@react-pdf/renderer'
import * as fs from 'fs'
import * as path from 'path'
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
} from '../src/lib/pdf-templates'
import { documents } from '../src/data/documents'

// Données de test pour chaque type de document
const testData: Record<string, Record<string, string>> = {
  'lettre-demission-cdi': {
    prenom: 'Jean',
    nom: 'Dupont',
    adresse: '12 rue de la Paix',
    codePostal: '75001',
    ville: 'Paris',
    entreprise: 'ABC SARL',
    adresseEntreprise: '45 avenue des Champs-Élysées, 75008 Paris',
    poste: 'Développeur web',
    dateEmbauche: '2020-01-15',
    dateDepart: '2025-03-01',
  },
  'lettre-demission-cdd': {
    prenom: 'Marie',
    nom: 'Martin',
    adresse: '5 rue du Commerce',
    codePostal: '69001',
    ville: 'Lyon',
    entreprise: 'XYZ SA',
    adresseEntreprise: '10 place Bellecour, 69002 Lyon',
    poste: 'Assistant commercial',
    motifRupture: 'CDI trouvé ailleurs',
    dateDepart: '2025-02-15',
  },
  'resiliation-box-internet': {
    prenom: 'Pierre',
    nom: 'Durand',
    adresse: '8 avenue Victor Hugo',
    codePostal: '33000',
    ville: 'Bordeaux',
    operateur: 'Orange',
    numeroClient: 'CLI123456789',
    numeroLigne: '05 12 34 56 78',
    motif: 'Déménagement',
  },
  'resiliation-mobile': {
    prenom: 'Sophie',
    nom: 'Bernard',
    adresse: '22 rue de la République',
    codePostal: '13001',
    ville: 'Marseille',
    operateur: 'Free Mobile',
    numeroClient: 'FM987654321',
    numeroMobile: '06 12 34 56 78',
    motif: 'Changement d\'opérateur',
    portabilite: 'Oui, je garde mon numéro',
  },
  'resiliation-assurance': {
    prenom: 'Lucas',
    nom: 'Petit',
    adresse: '15 boulevard Haussmann',
    codePostal: '75009',
    ville: 'Paris',
    assureur: 'AXA France',
    adresseAssureur: 'AXA France - Service Résiliation, 313 Terrasses de l\'Arche, 92727 Nanterre Cedex',
    typeAssurance: 'Assurance auto',
    numeroContrat: 'AUTO-2023-456789',
    motif: 'Loi Hamon (après 1 an)',
  },
  'preavis-logement': {
    prenom: 'Emma',
    nom: 'Leroy',
    adresse: '3 rue des Lilas',
    codePostal: '44000',
    ville: 'Nantes',
    proprietaire: 'M. et Mme Dupont',
    adresseProprietaire: '10 rue du Château, 44000 Nantes',
    adresseLogement: '3 rue des Lilas, 44000 Nantes',
    dateEntree: '2022-06-01',
    typePreavis: 'Préavis réduit (1 mois)',
    motifPreavis: 'Mutation professionnelle',
  },
  'attestation-honneur': {
    prenom: 'Thomas',
    nom: 'Moreau',
    adresse: '7 place de la Mairie',
    codePostal: '31000',
    ville: 'Toulouse',
    dateNaissance: '1985-07-20',
    lieuNaissance: 'Lyon',
    objetAttestation: 'Je certifie sur l\'honneur que les informations fournies dans mon dossier de candidature sont exactes et complètes.',
  },
  'attestation-hebergement': {
    hebergeurPrenom: 'Michel',
    hebergeurNom: 'Garcia',
    hebergeurAdresse: '25 rue de la Liberté',
    hebergeurCodePostal: '59000',
    hebergeurVille: 'Lille',
    hebergeurDateNaissance: '1960-03-15',
    hebergeurLieuNaissance: 'Lille',
    hebergePrenom: 'Julie',
    hebergeNom: 'Garcia',
    hebergeDateNaissance: '1990-08-25',
    hebergeLieuNaissance: 'Lille',
    dateDebut: '2024-01-01',
  },
}

// Créer le dossier de sortie
const outputDir = path.join(__dirname, '../test-pdfs')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

async function generatePdf(slug: string, data: Record<string, string>, title: string): Promise<boolean> {
  try {
    let pdfDocument

    switch (slug) {
      case 'lettre-demission-cdi':
        pdfDocument = LettreDemissionCDI(data as any)
        break
      case 'lettre-demission-cdd':
        pdfDocument = LettreDemissionCDD(data as any)
        break
      case 'resiliation-box-internet':
        pdfDocument = ResiliationBox(data as any)
        break
      case 'resiliation-mobile':
        pdfDocument = ResiliationMobile(data as any)
        break
      case 'resiliation-assurance':
        pdfDocument = ResiliationAssurance(data as any)
        break
      case 'preavis-logement':
        pdfDocument = PreavisLogement(data as any)
        break
      case 'attestation-honneur':
        pdfDocument = AttestationHonneur(data as any)
        break
      case 'attestation-hebergement':
        pdfDocument = AttestationHebergement(data as any)
        break
      default:
        // Utiliser le template générique
        pdfDocument = GenericDocument(data, title)
        break
    }

    const pdfBuffer = await renderToBuffer(pdfDocument)
    const filePath = path.join(outputDir, `${slug}.pdf`)
    fs.writeFileSync(filePath, pdfBuffer)

    return true
  } catch (error) {
    console.error(`Erreur pour ${slug}:`, error)
    return false
  }
}

async function main() {
  console.log('='.repeat(60))
  console.log('TEST DE GÉNÉRATION DE TOUS LES DOCUMENTS PDF')
  console.log('='.repeat(60))
  console.log('')

  const results: { slug: string; title: string; success: boolean; error?: string }[] = []

  for (const doc of documents) {
    process.stdout.write(`Génération: ${doc.title}... `)

    // Utiliser les données de test spécifiques ou générer des données génériques
    const data = testData[doc.slug] || generateGenericTestData(doc)

    try {
      const success = await generatePdf(doc.slug, data, doc.title)
      if (success) {
        console.log('✅ OK')
        results.push({ slug: doc.slug, title: doc.title, success: true })
      } else {
        console.log('❌ ERREUR')
        results.push({ slug: doc.slug, title: doc.title, success: false })
      }
    } catch (error: any) {
      console.log('❌ ERREUR:', error.message)
      results.push({ slug: doc.slug, title: doc.title, success: false, error: error.message })
    }
  }

  // Résumé
  console.log('')
  console.log('='.repeat(60))
  console.log('RÉSUMÉ')
  console.log('='.repeat(60))

  const successCount = results.filter(r => r.success).length
  const failCount = results.filter(r => !r.success).length

  console.log(`Total: ${documents.length} documents`)
  console.log(`✅ Succès: ${successCount}`)
  console.log(`❌ Échecs: ${failCount}`)

  if (failCount > 0) {
    console.log('')
    console.log('Documents en erreur:')
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.title} (${r.slug})${r.error ? ': ' + r.error : ''}`)
    })
  }

  console.log('')
  console.log(`PDFs générés dans: ${outputDir}`)
}

// Générer des données de test génériques basées sur les champs du document
function generateGenericTestData(doc: typeof documents[0]): Record<string, string> {
  const data: Record<string, string> = {}

  for (const field of doc.fields) {
    if (field.type === 'select' && field.options) {
      data[field.name] = field.options[0]
    } else if (field.type === 'date') {
      data[field.name] = '2025-01-15'
    } else if (field.type === 'email') {
      data[field.name] = 'test@example.com'
    } else if (field.type === 'textarea') {
      data[field.name] = 'Texte de test pour ce champ. Lorem ipsum dolor sit amet.'
    } else {
      data[field.name] = field.placeholder || `Test ${field.label}`
    }
  }

  return data
}

main().catch(console.error)
