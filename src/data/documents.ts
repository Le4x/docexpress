export interface DocumentField {
  name: string
  label: string
  type: 'text' | 'email' | 'date' | 'textarea' | 'select'
  placeholder?: string
  required?: boolean
  options?: string[]
}

export interface DocumentTemplate {
  slug: string
  title: string
  shortDescription: string
  description: string
  price: number
  category: string
  fields: DocumentField[]
  seoKeywords: string[]
}

export const documents: DocumentTemplate[] = [
  {
    slug: 'lettre-demission-cdi',
    title: 'Lettre de démission CDI',
    shortDescription: 'Démissionnez de votre CDI en bonne et due forme',
    description: 'Modèle de lettre de démission pour un contrat à durée indéterminée (CDI). Document conforme à la législation française, prêt à être envoyé à votre employeur.',
    price: 2.99,
    category: 'Travail',
    seoKeywords: ['lettre démission cdi', 'modèle démission', 'démissionner cdi'],
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', placeholder: 'ABC SARL', required: true },
      { name: 'adresseEntreprise', label: 'Adresse de l\'entreprise', type: 'text', placeholder: '45 avenue des Champs-Élysées', required: true },
      { name: 'poste', label: 'Poste occupé', type: 'text', placeholder: 'Développeur web', required: true },
      { name: 'dateEmbauche', label: 'Date d\'embauche', type: 'date', required: true },
      { name: 'dateDepart', label: 'Date de départ souhaitée', type: 'date', required: true },
    ]
  },
  {
    slug: 'resiliation-box-internet',
    title: 'Résiliation box internet',
    shortDescription: 'Résiliez votre abonnement internet facilement',
    description: 'Lettre de résiliation pour votre box internet (Orange, SFR, Free, Bouygues). Conforme aux conditions de résiliation des opérateurs.',
    price: 2.99,
    category: 'Résiliation',
    seoKeywords: ['résiliation box internet', 'résilier orange', 'résilier sfr', 'résilier free'],
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'operateur', label: 'Opérateur', type: 'select', required: true, options: ['Orange', 'SFR', 'Free', 'Bouygues Telecom'] },
      { name: 'numeroClient', label: 'Numéro client', type: 'text', placeholder: 'Votre numéro client', required: true },
      { name: 'numeroLigne', label: 'Numéro de ligne', type: 'text', placeholder: '01 23 45 67 89', required: true },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Déménagement', 'Changement d\'opérateur', 'Difficultés financières', 'Insatisfaction du service', 'Autre'] },
    ]
  },
  {
    slug: 'preavis-logement',
    title: 'Préavis de départ logement',
    shortDescription: 'Informez votre propriétaire de votre départ',
    description: 'Lettre de préavis pour informer votre propriétaire de votre intention de quitter le logement. Préavis de 1 ou 3 mois selon votre situation.',
    price: 2.99,
    category: 'Logement',
    seoKeywords: ['préavis logement', 'lettre préavis', 'quitter appartement', 'préavis 1 mois'],
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse du logement', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'nomProprietaire', label: 'Nom du propriétaire/bailleur', type: 'text', placeholder: 'M. Martin ou Agence XYZ', required: true },
      { name: 'adresseProprietaire', label: 'Adresse du propriétaire', type: 'text', placeholder: '45 avenue Victor Hugo', required: true },
      { name: 'dureePreavis', label: 'Durée du préavis', type: 'select', required: true, options: ['1 mois (zone tendue)', '3 mois'] },
      { name: 'dateDepart', label: 'Date de départ souhaitée', type: 'date', required: true },
      { name: 'motif', label: 'Motif (si préavis réduit)', type: 'select', options: ['Zone tendue', 'Mutation professionnelle', 'Perte d\'emploi', 'Premier emploi', 'Problème de santé', 'RSA', 'Non applicable'] },
    ]
  },
]

export function getDocumentBySlug(slug: string): DocumentTemplate | undefined {
  return documents.find(doc => doc.slug === slug)
}

export function getDocumentsByCategory(category: string): DocumentTemplate[] {
  return documents.filter(doc => doc.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(documents.map(doc => doc.category))]
}