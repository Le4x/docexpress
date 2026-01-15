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
  icon: string
  popular?: boolean
  duration: string
}

export const documents: DocumentTemplate[] = [
  // === TRAVAIL ===
  {
    slug: 'lettre-demission-cdi',
    title: 'Lettre de démission CDI',
    shortDescription: 'Démissionnez de votre CDI en bonne et due forme',
    description: 'Modèle de lettre de démission pour un contrat à durée indéterminée (CDI). Document conforme à la législation française, prêt à être envoyé à votre employeur.',
    price: 2.99,
    category: 'Travail',
    seoKeywords: ['lettre démission cdi', 'modèle démission', 'démissionner cdi'],
    icon: '📝',
    popular: true,
    duration: '2 min',
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
    slug: 'lettre-demission-cdd',
    title: 'Lettre de démission CDD',
    shortDescription: 'Rompez votre CDD dans les règles',
    description: 'Modèle de lettre pour rompre un contrat à durée déterminée (CDD) de manière anticipée. Conforme aux cas de rupture autorisés par la loi.',
    price: 2.99,
    category: 'Travail',
    seoKeywords: ['lettre démission cdd', 'rompre cdd', 'rupture cdd'],
    icon: '📝',
    popular: false,
    duration: '2 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', placeholder: 'ABC SARL', required: true },
      { name: 'adresseEntreprise', label: 'Adresse de l\'entreprise', type: 'text', placeholder: '45 avenue des Champs-Élysées', required: true },
      { name: 'poste', label: 'Poste occupé', type: 'text', placeholder: 'Assistant commercial', required: true },
      { name: 'motifRupture', label: 'Motif de rupture', type: 'select', required: true, options: ['CDI trouvé ailleurs', 'Accord commun avec l\'employeur', 'Faute grave de l\'employeur', 'Inaptitude médicale'] },
      { name: 'dateDepart', label: 'Date de départ souhaitée', type: 'date', required: true },
    ]
  },
  {
    slug: 'demande-conge-parental',
    title: 'Demande de congé parental',
    shortDescription: 'Demandez votre congé parental d\'éducation',
    description: 'Lettre de demande de congé parental d\'éducation à adresser à votre employeur. Document conforme au Code du travail.',
    price: 2.99,
    category: 'Travail',
    seoKeywords: ['congé parental', 'demande congé parental', 'lettre congé parental'],
    icon: '👶',
    popular: false,
    duration: '3 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Marie', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'entreprise', label: 'Nom de l\'entreprise', type: 'text', placeholder: 'ABC SARL', required: true },
      { name: 'adresseEntreprise', label: 'Adresse de l\'entreprise', type: 'text', placeholder: '45 avenue des Champs-Élysées', required: true },
      { name: 'typeConge', label: 'Type de congé', type: 'select', required: true, options: ['Congé parental total', 'Congé parental partiel (temps partiel)'] },
      { name: 'dateNaissanceEnfant', label: 'Date de naissance de l\'enfant', type: 'date', required: true },
      { name: 'dateDebut', label: 'Date de début souhaitée', type: 'date', required: true },
      { name: 'duree', label: 'Durée souhaitée', type: 'select', required: true, options: ['6 mois', '1 an', '2 ans', '3 ans'] },
    ]
  },

  // === RÉSILIATION ===
  {
    slug: 'resiliation-box-internet',
    title: 'Résiliation box internet',
    shortDescription: 'Résiliez votre abonnement internet facilement',
    description: 'Lettre de résiliation pour votre box internet (Orange, SFR, Free, Bouygues). Conforme aux conditions de résiliation des opérateurs.',
    price: 2.99,
    category: 'Résiliation',
    seoKeywords: ['résiliation box internet', 'résilier orange', 'résilier sfr', 'résilier free'],
    icon: '📡',
    popular: true,
    duration: '2 min',
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
    slug: 'resiliation-mobile',
    title: 'Résiliation forfait mobile',
    shortDescription: 'Résiliez votre forfait téléphone mobile',
    description: 'Lettre de résiliation pour votre forfait mobile. Compatible avec tous les opérateurs français.',
    price: 2.99,
    category: 'Résiliation',
    seoKeywords: ['résiliation mobile', 'résilier forfait', 'résiliation téléphone'],
    icon: '📱',
    popular: true,
    duration: '2 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'operateur', label: 'Opérateur', type: 'select', required: true, options: ['Orange', 'SFR', 'Free Mobile', 'Bouygues Telecom', 'La Poste Mobile', 'RED by SFR', 'Sosh', 'B&You'] },
      { name: 'numeroClient', label: 'Numéro client', type: 'text', placeholder: 'Votre numéro client', required: true },
      { name: 'numeroMobile', label: 'Numéro de mobile', type: 'text', placeholder: '06 12 34 56 78', required: true },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Changement d\'opérateur', 'Portabilité du numéro', 'Difficultés financières', 'Insatisfaction du service', 'Autre'] },
      { name: 'portabilite', label: 'Portabilité du numéro ?', type: 'select', required: true, options: ['Oui, je garde mon numéro', 'Non'] },
    ]
  },
  {
    slug: 'resiliation-assurance',
    title: 'Résiliation assurance',
    shortDescription: 'Résiliez votre contrat d\'assurance',
    description: 'Lettre de résiliation pour tout type d\'assurance : auto, habitation, santé, etc. Conforme à la loi Hamon et Châtel.',
    price: 2.99,
    category: 'Résiliation',
    seoKeywords: ['résiliation assurance', 'résilier assurance auto', 'loi hamon'],
    icon: '🛡️',
    popular: true,
    duration: '3 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'assureur', label: 'Nom de l\'assureur', type: 'text', placeholder: 'AXA, MAIF, Allianz...', required: true },
      { name: 'adresseAssureur', label: 'Adresse de l\'assureur', type: 'text', placeholder: 'Adresse du service résiliation', required: true },
      { name: 'typeAssurance', label: 'Type d\'assurance', type: 'select', required: true, options: ['Assurance auto', 'Assurance habitation', 'Assurance santé / Mutuelle', 'Assurance vie', 'Autre'] },
      { name: 'numeroContrat', label: 'Numéro de contrat', type: 'text', placeholder: 'Votre numéro de contrat', required: true },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Loi Hamon (après 1 an)', 'Échéance annuelle', 'Vente du bien assuré', 'Changement de situation', 'Augmentation de tarif', 'Autre'] },
    ]
  },
  {
    slug: 'resiliation-salle-sport',
    title: 'Résiliation salle de sport',
    shortDescription: 'Résiliez votre abonnement fitness',
    description: 'Lettre de résiliation pour votre salle de sport ou club de fitness. Valable pour toutes les enseignes.',
    price: 2.99,
    category: 'Résiliation',
    seoKeywords: ['résiliation salle de sport', 'résilier basic fit', 'résilier fitness'],
    icon: '🏋️',
    popular: false,
    duration: '2 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'salleSport', label: 'Nom de la salle', type: 'text', placeholder: 'Basic Fit, Fitness Park...', required: true },
      { name: 'adresseSalle', label: 'Adresse de la salle', type: 'text', placeholder: 'Adresse de votre salle', required: true },
      { name: 'numeroAbonnement', label: 'Numéro d\'abonnement', type: 'text', placeholder: 'Votre numéro d\'abonnement', required: true },
      { name: 'motif', label: 'Motif de résiliation', type: 'select', required: true, options: ['Déménagement', 'Problème de santé', 'Fin d\'engagement', 'Difficultés financières', 'Autre'] },
    ]
  },

  // === LOGEMENT ===
  {
    slug: 'preavis-logement',
    title: 'Préavis de départ logement',
    shortDescription: 'Informez votre propriétaire de votre départ',
    description: 'Lettre de préavis pour informer votre propriétaire de votre intention de quitter le logement. Préavis de 1 ou 3 mois selon votre situation.',
    price: 2.99,
    category: 'Logement',
    seoKeywords: ['préavis logement', 'lettre préavis', 'quitter appartement', 'préavis 1 mois'],
    icon: '🏠',
    popular: true,
    duration: '3 min',
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
  {
    slug: 'demande-logement-social',
    title: 'Demande de logement social',
    shortDescription: 'Demandez un logement HLM',
    description: 'Lettre de demande de logement social (HLM) à adresser aux organismes compétents.',
    price: 2.99,
    category: 'Logement',
    seoKeywords: ['demande hlm', 'logement social', 'demande logement'],
    icon: '🏢',
    popular: false,
    duration: '4 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse actuelle', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'telephone', label: 'Téléphone', type: 'text', placeholder: '06 12 34 56 78', required: true },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'jean.dupont@email.fr', required: true },
      { name: 'situationFamiliale', label: 'Situation familiale', type: 'select', required: true, options: ['Célibataire', 'Marié(e)', 'Pacsé(e)', 'Divorcé(e)', 'Veuf(ve)'] },
      { name: 'nombrePersonnes', label: 'Nombre de personnes dans le foyer', type: 'select', required: true, options: ['1', '2', '3', '4', '5', '6 ou plus'] },
      { name: 'motifDemande', label: 'Motif de la demande', type: 'select', required: true, options: ['Premier logement', 'Logement trop petit', 'Logement insalubre', 'Loyer trop élevé', 'Rapprochement travail', 'Séparation', 'Autre'] },
    ]
  },

  // === ATTESTATIONS ===
  {
    slug: 'attestation-honneur',
    title: 'Attestation sur l\'honneur',
    shortDescription: 'Attestation sur l\'honneur personnalisable',
    description: 'Modèle d\'attestation sur l\'honneur pour diverses démarches administratives. Document officiel reconnu.',
    price: 2.99,
    category: 'Attestations',
    seoKeywords: ['attestation sur l\'honneur', 'attestation', 'déclaration sur l\'honneur'],
    icon: '✋',
    popular: true,
    duration: '2 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'dateNaissance', label: 'Date de naissance', type: 'date', required: true },
      { name: 'lieuNaissance', label: 'Lieu de naissance', type: 'text', placeholder: 'Paris', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'objet', label: 'Objet de l\'attestation', type: 'textarea', placeholder: 'Je soussigné(e) atteste sur l\'honneur que...', required: true },
    ]
  },
  {
    slug: 'attestation-hebergement',
    title: 'Attestation d\'hébergement',
    shortDescription: 'Certifiez héberger quelqu\'un à votre domicile',
    description: 'Attestation d\'hébergement à fournir pour les démarches administratives d\'une personne que vous hébergez.',
    price: 2.99,
    category: 'Attestations',
    seoKeywords: ['attestation hébergement', 'certificat hébergement', 'héberger quelqu\'un'],
    icon: '🏡',
    popular: true,
    duration: '2 min',
    fields: [
      { name: 'prenomHebergeur', label: 'Prénom de l\'hébergeur', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nomHebergeur', label: 'Nom de l\'hébergeur', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'dateNaissanceHebergeur', label: 'Date de naissance de l\'hébergeur', type: 'date', required: true },
      { name: 'lieuNaissanceHebergeur', label: 'Lieu de naissance de l\'hébergeur', type: 'text', placeholder: 'Paris', required: true },
      { name: 'adresse', label: 'Adresse du logement', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'prenomHeberge', label: 'Prénom de la personne hébergée', type: 'text', placeholder: 'Marie', required: true },
      { name: 'nomHeberge', label: 'Nom de la personne hébergée', type: 'text', placeholder: 'Martin', required: true },
      { name: 'dateNaissanceHeberge', label: 'Date de naissance de la personne hébergée', type: 'date', required: true },
      { name: 'dateDebut', label: 'Date de début d\'hébergement', type: 'date', required: true },
    ]
  },
  {
    slug: 'autorisation-parentale',
    title: 'Autorisation parentale',
    shortDescription: 'Autorisez votre enfant mineur pour diverses activités',
    description: 'Modèle d\'autorisation parentale pour sorties scolaires, voyages, activités sportives, etc.',
    price: 2.99,
    category: 'Attestations',
    seoKeywords: ['autorisation parentale', 'autorisation sortie', 'autorisation mineur'],
    icon: '👨‍👩‍👧',
    popular: true,
    duration: '2 min',
    fields: [
      { name: 'prenomParent', label: 'Prénom du parent', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nomParent', label: 'Nom du parent', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'prenomEnfant', label: 'Prénom de l\'enfant', type: 'text', placeholder: 'Lucas', required: true },
      { name: 'nomEnfant', label: 'Nom de l\'enfant', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'dateNaissanceEnfant', label: 'Date de naissance de l\'enfant', type: 'date', required: true },
      { name: 'typeAutorisation', label: 'Type d\'autorisation', type: 'select', required: true, options: ['Sortie scolaire', 'Voyage à l\'étranger', 'Activité sportive', 'Intervention médicale', 'Autre'] },
      { name: 'details', label: 'Détails (lieu, date, activité)', type: 'textarea', placeholder: 'Précisez les détails de l\'autorisation', required: true },
    ]
  },

  // === ADMINISTRATIF ===
  {
    slug: 'contestation-contravention',
    title: 'Contestation de contravention',
    shortDescription: 'Contestez une amende ou un PV',
    description: 'Lettre de contestation de contravention routière (excès de vitesse, stationnement, etc.).',
    price: 2.99,
    category: 'Administratif',
    seoKeywords: ['contestation amende', 'contester pv', 'contestation contravention'],
    icon: '🚗',
    popular: false,
    duration: '4 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'numeroAvis', label: 'Numéro d\'avis de contravention', type: 'text', placeholder: 'Numéro sur l\'avis', required: true },
      { name: 'dateInfraction', label: 'Date de l\'infraction', type: 'date', required: true },
      { name: 'lieuInfraction', label: 'Lieu de l\'infraction', type: 'text', placeholder: 'Ville et adresse', required: true },
      { name: 'immatriculation', label: 'Immatriculation du véhicule', type: 'text', placeholder: 'AA-123-BB', required: true },
      { name: 'motifContestation', label: 'Motif de contestation', type: 'select', required: true, options: ['Véhicule volé', 'Véhicule vendu/cédé', 'Erreur d\'immatriculation', 'Vice de procédure', 'Je n\'étais pas le conducteur', 'Autre'] },
      { name: 'explications', label: 'Explications détaillées', type: 'textarea', placeholder: 'Expliquez votre contestation en détail', required: true },
    ]
  },
  {
    slug: 'declaration-perte-vol',
    title: 'Déclaration de perte ou vol',
    shortDescription: 'Déclarez la perte ou le vol d\'un document',
    description: 'Déclaration de perte ou de vol pour vos papiers d\'identité, permis de conduire, carte grise, etc.',
    price: 2.99,
    category: 'Administratif',
    seoKeywords: ['déclaration perte', 'déclaration vol', 'perte carte identité'],
    icon: '🔍',
    popular: true,
    duration: '2 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'dateNaissance', label: 'Date de naissance', type: 'date', required: true },
      { name: 'lieuNaissance', label: 'Lieu de naissance', type: 'text', placeholder: 'Paris', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'typeDocument', label: 'Type de document', type: 'select', required: true, options: ['Carte d\'identité', 'Passeport', 'Permis de conduire', 'Carte grise', 'Carte vitale', 'Autre'] },
      { name: 'perteOuVol', label: 'Perte ou vol ?', type: 'select', required: true, options: ['Perte', 'Vol'] },
      { name: 'datePerte', label: 'Date de la perte/vol', type: 'date', required: true },
      { name: 'lieuPerte', label: 'Lieu de la perte/vol', type: 'text', placeholder: 'Lieu approximatif', required: true },
      { name: 'circonstances', label: 'Circonstances', type: 'textarea', placeholder: 'Décrivez les circonstances', required: false },
    ]
  },
  {
    slug: 'demande-remboursement',
    title: 'Demande de remboursement',
    shortDescription: 'Demandez le remboursement d\'un achat ou service',
    description: 'Lettre de demande de remboursement pour un produit défectueux, un service non rendu ou une erreur de facturation.',
    price: 2.99,
    category: 'Administratif',
    seoKeywords: ['demande remboursement', 'lettre remboursement', 'réclamation'],
    icon: '💰',
    popular: false,
    duration: '3 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'destinataire', label: 'Nom du destinataire (entreprise)', type: 'text', placeholder: 'Nom de l\'entreprise', required: true },
      { name: 'adresseDestinataire', label: 'Adresse du destinataire', type: 'text', placeholder: 'Adresse de l\'entreprise', required: true },
      { name: 'numeroCommande', label: 'Numéro de commande/facture', type: 'text', placeholder: 'Numéro de référence', required: false },
      { name: 'dateAchat', label: 'Date d\'achat', type: 'date', required: true },
      { name: 'montant', label: 'Montant à rembourser', type: 'text', placeholder: '99,00 €', required: true },
      { name: 'motif', label: 'Motif du remboursement', type: 'select', required: true, options: ['Produit défectueux', 'Produit non conforme', 'Service non rendu', 'Erreur de facturation', 'Rétractation (14 jours)', 'Autre'] },
      { name: 'explications', label: 'Explications', type: 'textarea', placeholder: 'Détaillez votre demande', required: true },
    ]
  },
  {
    slug: 'reclamation-colis',
    title: 'Réclamation colis',
    shortDescription: 'Réclamez pour un colis perdu ou endommagé',
    description: 'Lettre de réclamation pour un colis non reçu, perdu, endommagé ou dont le contenu est manquant.',
    price: 2.99,
    category: 'Administratif',
    seoKeywords: ['réclamation colis', 'colis perdu', 'colis endommagé'],
    icon: '📦',
    popular: false,
    duration: '3 min',
    fields: [
      { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Jean', required: true },
      { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Dupont', required: true },
      { name: 'adresse', label: 'Adresse', type: 'text', placeholder: '12 rue de la Paix', required: true },
      { name: 'codePostal', label: 'Code postal', type: 'text', placeholder: '75001', required: true },
      { name: 'ville', label: 'Ville', type: 'text', placeholder: 'Paris', required: true },
      { name: 'transporteur', label: 'Transporteur', type: 'select', required: true, options: ['La Poste / Colissimo', 'Chronopost', 'DHL', 'UPS', 'FedEx', 'Mondial Relay', 'Relais Colis', 'GLS', 'Autre'] },
      { name: 'numeroSuivi', label: 'Numéro de suivi', type: 'text', placeholder: 'Numéro de tracking', required: true },
      { name: 'dateEnvoi', label: 'Date d\'envoi', type: 'date', required: true },
      { name: 'probleme', label: 'Type de problème', type: 'select', required: true, options: ['Colis non reçu', 'Colis endommagé', 'Contenu manquant', 'Livraison à mauvaise adresse', 'Autre'] },
      { name: 'description', label: 'Description du problème', type: 'textarea', placeholder: 'Décrivez le problème en détail', required: true },
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

export function getPopularDocuments(): DocumentTemplate[] {
  return documents.filter(doc => doc.popular)
}

export function searchDocuments(query: string): DocumentTemplate[] {
  const lowerQuery = query.toLowerCase()
  return documents.filter(doc => 
    doc.title.toLowerCase().includes(lowerQuery) ||
    doc.shortDescription.toLowerCase().includes(lowerQuery) ||
    doc.seoKeywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  )
}