import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 30,
  },
  senderInfo: {
    marginBottom: 20,
  },
  senderName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 14,
  },
  recipientInfo: {
    marginBottom: 30,
    textAlign: 'right',
  },
  date: {
    marginBottom: 30,
    textAlign: 'right',
  },
  subject: {
    fontFamily: 'Helvetica-Bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  body: {
    textAlign: 'justify',
    marginBottom: 15,
  },
  signature: {
    marginTop: 40,
  },
  signatureName: {
    fontFamily: 'Helvetica-Bold',
  },
})

interface LettreDemissionProps {
  prenom: string
  nom: string
  adresse: string
  codePostal: string
  ville: string
  entreprise: string
  adresseEntreprise: string
  poste: string
  dateEmbauche: string
  dateDepart: string
}

export function LettreDemissionCDI(data: LettreDemissionProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const dateDepartFormatted = new Date(data.dateDepart).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Expéditeur */}
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{data.prenom} {data.nom}</Text>
          <Text>{data.adresse}</Text>
          <Text>{data.codePostal} {data.ville}</Text>
        </View>

        {/* Destinataire */}
        <View style={styles.recipientInfo}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>{data.entreprise}</Text>
          <Text>{data.adresseEntreprise}</Text>
        </View>

        {/* Date et lieu */}
        <View style={styles.date}>
          <Text>{data.ville}, le {today}</Text>
        </View>

        {/* Objet */}
        <Text style={styles.subject}>Objet : Lettre de démission</Text>

        {/* Corps de la lettre */}
        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>

        <View style={styles.body}>
          <Text>
            Par la présente, je vous informe de ma décision de démissionner de mon poste de {data.poste} que j'occupe au sein de votre entreprise depuis le {new Date(data.dateEmbauche).toLocaleDateString('fr-FR')}.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Conformément aux dispositions légales et conventionnelles en vigueur, je respecterai mon préavis dont la durée est prévue par la convention collective applicable à l'entreprise. Ainsi, mon départ effectif devrait intervenir le {dateDepartFormatted}.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Je reste à votre disposition pour organiser au mieux la transition et assurer le transfert de mes dossiers en cours.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenom} {data.nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>
            (Signature)
          </Text>
        </View>
      </Page>
    </Document>
  )
}

interface ResiliationBoxProps {
  prenom: string
  nom: string
  adresse: string
  codePostal: string
  ville: string
  operateur: string
  numeroClient: string
  numeroLigne: string
  motif: string
}

export function ResiliationBox(data: ResiliationBoxProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const adressesOperateurs: Record<string, string> = {
    'Orange': 'Orange France - Service Résiliation\n33734 Bordeaux Cedex 9',
    'SFR': 'SFR - Service Résiliation\nTSA 73917\n62978 Arras Cedex 9',
    'Free': 'Free - Service Résiliation\n75371 Paris Cedex 08',
    'Bouygues Telecom': 'Bouygues Telecom - Service Résiliation\n60436 Noailles Cedex',
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Expéditeur */}
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{data.prenom} {data.nom}</Text>
          <Text>{data.adresse}</Text>
          <Text>{data.codePostal} {data.ville}</Text>
          <Text>N° Client : {data.numeroClient}</Text>
          <Text>N° Ligne : {data.numeroLigne}</Text>
        </View>

        {/* Destinataire */}
        <View style={styles.recipientInfo}>
          <Text>{adressesOperateurs[data.operateur] || data.operateur}</Text>
        </View>

        {/* Date et lieu */}
        <View style={styles.date}>
          <Text>{data.ville}, le {today}</Text>
        </View>

        {/* Objet */}
        <Text style={styles.subject}>Objet : Résiliation de mon abonnement internet</Text>

        {/* Corps de la lettre */}
        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>

        <View style={styles.body}>
          <Text>
            Par la présente, je vous informe de ma volonté de résilier mon abonnement internet référencé sous le numéro client {data.numeroClient} et le numéro de ligne {data.numeroLigne}.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Motif de la résiliation : {data.motif}.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Conformément à l'article L. 224-39 du Code de la consommation, je vous demande de procéder à cette résiliation dans les meilleurs délais et de m'adresser le décompte de clôture de mon compte.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Je vous prie de m'indiquer les modalités de restitution de l'éventuel matériel mis à ma disposition (box, décodeur).
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Dans l'attente de votre confirmation écrite, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenom} {data.nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>
            (Signature)
          </Text>
        </View>
      </Page>
    </Document>
  )
}

interface PreavisLogementProps {
  prenom: string
  nom: string
  adresse: string
  codePostal: string
  ville: string
  nomProprietaire: string
  adresseProprietaire: string
  dureePreavis: string
  dateDepart: string
  motif: string
}

export function PreavisLogement(data: PreavisLogementProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const dateDepartFormatted = new Date(data.dateDepart).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Expéditeur */}
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{data.prenom} {data.nom}</Text>
          <Text>{data.adresse}</Text>
          <Text>{data.codePostal} {data.ville}</Text>
        </View>

        {/* Destinataire */}
        <View style={styles.recipientInfo}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>{data.nomProprietaire}</Text>
          <Text>{data.adresseProprietaire}</Text>
        </View>

        {/* Date et lieu */}
        <View style={styles.date}>
          <Text>{data.ville}, le {today}</Text>
        </View>

        {/* Objet */}
        <Text style={styles.subject}>Objet : Congé du logement - Préavis de {data.dureePreavis}</Text>

        {/* Corps de la lettre */}
        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>

        <View style={styles.body}>
          <Text>
            Par la présente, je vous notifie mon intention de quitter le logement que j'occupe actuellement situé au {data.adresse}, {data.codePostal} {data.ville}.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Conformément à l'article 15 de la loi du 6 juillet 1989, je vous informe que mon préavis est de {data.dureePreavis}.
            {data.motif && data.motif !== 'Non applicable' ? ` Ce préavis réduit est justifié par le motif suivant : ${data.motif}.` : ''}
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Mon départ effectif du logement est prévu pour le {dateDepartFormatted}. Je me tiens à votre disposition pour convenir d'une date pour l'état des lieux de sortie.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Je vous rappelle que le dépôt de garantie devra m'être restitué dans un délai d'un mois à compter de la remise des clés, déduction faite des éventuelles sommes restant dues.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenom} {data.nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>
            (Signature)
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// === TEMPLATE RÉSILIATION FORFAIT MOBILE ===
interface ResiliationMobileProps {
  prenom: string
  nom: string
  adresse: string
  codePostal: string
  ville: string
  operateur: string
  numeroClient: string
  numeroMobile: string
  motif: string
  portabilite: string
}

export function ResiliationMobile(data: ResiliationMobileProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const adressesOperateurs: Record<string, string> = {
    'Orange': 'Orange France - Service Résiliation\n33734 Bordeaux Cedex 9',
    'SFR': 'SFR - Service Résiliation\nTSA 73917\n62978 Arras Cedex 9',
    'Free Mobile': 'Free Mobile - Service Résiliation\n75371 Paris Cedex 08',
    'Bouygues Telecom': 'Bouygues Telecom - Service Résiliation\n60436 Noailles Cedex',
    'La Poste Mobile': 'La Poste Mobile - Service Résiliation\nCP C703\n99999 La Poste',
    'RED by SFR': 'RED by SFR - Service Résiliation\nTSA 73917\n62978 Arras Cedex 9',
    'Sosh': 'Sosh - Service Résiliation\n33734 Bordeaux Cedex 9',
    'B&You': 'B&You - Service Résiliation\n60436 Noailles Cedex',
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{data.prenom} {data.nom}</Text>
          <Text>{data.adresse}</Text>
          <Text>{data.codePostal} {data.ville}</Text>
          <Text>N° Client : {data.numeroClient}</Text>
          <Text>N° Mobile : {data.numeroMobile}</Text>
        </View>

        <View style={styles.recipientInfo}>
          <Text>{adressesOperateurs[data.operateur] || data.operateur}</Text>
        </View>

        <View style={styles.date}>
          <Text>{data.ville}, le {today}</Text>
        </View>

        <Text style={styles.subject}>Objet : Résiliation de mon forfait mobile</Text>

        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>

        <View style={styles.body}>
          <Text>
            Par la présente, je vous informe de ma volonté de résilier mon forfait mobile référencé sous le numéro client {data.numeroClient} et le numéro de ligne {data.numeroMobile}.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>Motif de la résiliation : {data.motif}.</Text>
        </View>

        {data.portabilite === 'Oui, je garde mon numéro' && (
          <View style={styles.body}>
            <Text>
              Je souhaite conserver mon numéro de téléphone (portabilité). Je vous remercie de me communiquer mon RIO (Relevé d'Identité Opérateur) si ce n'est pas déjà fait.
            </Text>
          </View>
        )}

        <View style={styles.body}>
          <Text>
            Conformément à l'article L. 224-39 du Code de la consommation, je vous demande de procéder à cette résiliation dans les meilleurs délais et de m'adresser le décompte de clôture de mon compte.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Dans l'attente de votre confirmation écrite, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenom} {data.nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>(Signature)</Text>
        </View>
      </Page>
    </Document>
  )
}

// === TEMPLATE RÉSILIATION ASSURANCE ===
interface ResiliationAssuranceProps {
  prenom: string
  nom: string
  adresse: string
  codePostal: string
  ville: string
  assureur: string
  adresseAssureur: string
  typeAssurance: string
  numeroContrat: string
  motif: string
}

export function ResiliationAssurance(data: ResiliationAssuranceProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{data.prenom} {data.nom}</Text>
          <Text>{data.adresse}</Text>
          <Text>{data.codePostal} {data.ville}</Text>
          <Text>N° Contrat : {data.numeroContrat}</Text>
        </View>

        <View style={styles.recipientInfo}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>{data.assureur}</Text>
          <Text>{data.adresseAssureur}</Text>
        </View>

        <View style={styles.date}>
          <Text>{data.ville}, le {today}</Text>
        </View>

        <Text style={styles.subject}>Objet : Résiliation de mon contrat d'assurance - {data.typeAssurance}</Text>

        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>

        <View style={styles.body}>
          <Text>
            Par la présente, je vous informe de ma volonté de résilier mon contrat d'assurance {data.typeAssurance.toLowerCase()} référencé sous le numéro {data.numeroContrat}.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>Motif de la résiliation : {data.motif}.</Text>
        </View>

        {data.motif === 'Loi Hamon (après 1 an)' && (
          <View style={styles.body}>
            <Text>
              Conformément à l'article L. 113-15-2 du Code des assurances (loi Hamon), je suis en droit de résilier ce contrat à tout moment après la première année de souscription, sans frais ni pénalités.
            </Text>
          </View>
        )}

        {data.motif === 'Échéance annuelle' && (
          <View style={styles.body}>
            <Text>
              Conformément aux dispositions de l'article L. 113-12 du Code des assurances, je vous notifie ma décision de ne pas reconduire ce contrat à son échéance annuelle.
            </Text>
          </View>
        )}

        <View style={styles.body}>
          <Text>
            Je vous prie de bien vouloir m'adresser un avis de résiliation confirmant la prise en compte de ma demande, ainsi que le remboursement de la prime correspondant à la période non couverte, le cas échéant.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Dans l'attente de votre confirmation, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenom} {data.nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>(Signature)</Text>
        </View>
      </Page>
    </Document>
  )
}

// === TEMPLATE ATTESTATION SUR L'HONNEUR ===
interface AttestationHonneurProps {
  prenom: string
  nom: string
  dateNaissance: string
  lieuNaissance: string
  adresse: string
  codePostal: string
  ville: string
  objet: string
}

export function AttestationHonneur(data: AttestationHonneurProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const dateNaissanceFormatted = new Date(data.dateNaissance).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={{ ...styles.subject, marginBottom: 40, fontSize: 16 }}>ATTESTATION SUR L'HONNEUR</Text>

        <View style={styles.body}>
          <Text>
            Je soussigné(e) {data.prenom} {data.nom},
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Né(e) le {dateNaissanceFormatted} à {data.lieuNaissance},
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Demeurant au {data.adresse}, {data.codePostal} {data.ville},
          </Text>
        </View>

        <View style={{ ...styles.body, marginTop: 20 }}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>
            Atteste sur l'honneur :
          </Text>
        </View>

        <View style={{ ...styles.body, marginLeft: 20 }}>
          <Text>{data.objet}</Text>
        </View>

        <View style={{ ...styles.body, marginTop: 20 }}>
          <Text>
            Je suis informé(e) que toute fausse déclaration m'expose à des poursuites pénales conformément à l'article 441-7 du Code pénal.
          </Text>
        </View>

        <View style={{ ...styles.body, marginTop: 20 }}>
          <Text>
            Fait pour servir et valoir ce que de droit.
          </Text>
        </View>

        <View style={styles.date}>
          <Text>Fait à {data.ville}, le {today}</Text>
        </View>

        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenom} {data.nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>(Signature)</Text>
        </View>
      </Page>
    </Document>
  )
}

// === TEMPLATE ATTESTATION D'HÉBERGEMENT ===
interface AttestationHebergementProps {
  prenomHebergeur: string
  nomHebergeur: string
  dateNaissanceHebergeur: string
  lieuNaissanceHebergeur: string
  adresse: string
  codePostal: string
  ville: string
  prenomHeberge: string
  nomHeberge: string
  dateNaissanceHeberge: string
  dateDebut: string
}

export function AttestationHebergement(data: AttestationHebergementProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formatDate = (date: string) => new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={{ ...styles.subject, marginBottom: 40, fontSize: 16 }}>ATTESTATION D'HÉBERGEMENT</Text>

        <View style={styles.body}>
          <Text>
            Je soussigné(e) {data.prenomHebergeur} {data.nomHebergeur},
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Né(e) le {formatDate(data.dateNaissanceHebergeur)} à {data.lieuNaissanceHebergeur},
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Demeurant au {data.adresse}, {data.codePostal} {data.ville},
          </Text>
        </View>

        <View style={{ ...styles.body, marginTop: 20 }}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>
            Certifie sur l'honneur héberger à mon domicile :
          </Text>
        </View>

        <View style={{ ...styles.body, marginLeft: 20 }}>
          <Text>
            {data.prenomHeberge} {data.nomHeberge}, né(e) le {formatDate(data.dateNaissanceHeberge)},
          </Text>
        </View>

        <View style={{ ...styles.body, marginLeft: 20 }}>
          <Text>
            à l'adresse suivante : {data.adresse}, {data.codePostal} {data.ville},
          </Text>
        </View>

        <View style={{ ...styles.body, marginLeft: 20 }}>
          <Text>
            et ce depuis le {formatDate(data.dateDebut)}.
          </Text>
        </View>

        <View style={{ ...styles.body, marginTop: 20 }}>
          <Text>
            Cette attestation est établie pour servir et valoir ce que de droit auprès des administrations et organismes qui en feraient la demande.
          </Text>
        </View>

        <View style={{ ...styles.body, marginTop: 10 }}>
          <Text style={{ fontSize: 10, color: '#666' }}>
            Pièces à joindre : copie de la pièce d'identité de l'hébergeur et justificatif de domicile de moins de 3 mois.
          </Text>
        </View>

        <View style={styles.date}>
          <Text>Fait à {data.ville}, le {today}</Text>
        </View>

        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenomHebergeur} {data.nomHebergeur}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>(Signature de l'hébergeur)</Text>
        </View>
      </Page>
    </Document>
  )
}

// === TEMPLATE LETTRE DÉMISSION CDD ===
interface LettreDemissionCDDProps {
  prenom: string
  nom: string
  adresse: string
  codePostal: string
  ville: string
  entreprise: string
  adresseEntreprise: string
  poste: string
  motifRupture: string
  dateDepart: string
}

export function LettreDemissionCDD(data: LettreDemissionCDDProps) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const dateDepartFormatted = new Date(data.dateDepart).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{data.prenom} {data.nom}</Text>
          <Text>{data.adresse}</Text>
          <Text>{data.codePostal} {data.ville}</Text>
        </View>

        <View style={styles.recipientInfo}>
          <Text style={{ fontFamily: 'Helvetica-Bold' }}>{data.entreprise}</Text>
          <Text>{data.adresseEntreprise}</Text>
        </View>

        <View style={styles.date}>
          <Text>{data.ville}, le {today}</Text>
        </View>

        <Text style={styles.subject}>Objet : Rupture anticipée de mon CDD</Text>

        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>

        <View style={styles.body}>
          <Text>
            Par la présente, je vous informe de ma décision de mettre fin de manière anticipée à mon contrat à durée déterminée (CDD) au poste de {data.poste} au sein de votre entreprise.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Conformément à l'article L. 1243-2 du Code du travail, cette rupture anticipée est justifiée par le motif suivant : {data.motifRupture}.
          </Text>
        </View>

        {data.motifRupture === 'CDI trouvé ailleurs' && (
          <View style={styles.body}>
            <Text>
              En effet, j'ai obtenu une proposition d'embauche en contrat à durée indéterminée (CDI), ce qui constitue un motif légitime de rupture anticipée de CDD.
            </Text>
          </View>
        )}

        <View style={styles.body}>
          <Text>
            Mon départ effectif interviendra le {dateDepartFormatted}. Je reste à votre disposition pour organiser au mieux la transition de mes dossiers en cours.
          </Text>
        </View>

        <View style={styles.body}>
          <Text>
            Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </Text>
        </View>

        <View style={styles.signature}>
          <Text style={styles.signatureName}>{data.prenom} {data.nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>(Signature)</Text>
        </View>
      </Page>
    </Document>
  )
}

// Template générique pour tous les documents
interface GenericDocumentProps {
  [key: string]: string
}

export function GenericDocument(data: GenericDocumentProps, title: string) {
  const today = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Extraire les infos de base
  const prenom = data.prenom || data.prenomHebergeur || data.prenomParent || ''
  const nom = data.nom || data.nomHebergeur || data.nomParent || ''
  const adresse = data.adresse || ''
  const codePostal = data.codePostal || ''
  const ville = data.ville || ''

  // Détecter le destinataire
  const destinataire = data.destinataire || data.entreprise || data.assureur || data.salleSport || data.operateur || data.transporteur || data.nomProprietaire || ''
  const adresseDestinataire = data.adresseDestinataire || data.adresseEntreprise || data.adresseAssureur || data.adresseSalle || data.adresseProprietaire || ''

  // Formater les labels en français
  const formatLabel = (key: string): string => {
    const labels: Record<string, string> = {
      numeroClient: 'Numéro client',
      numeroContrat: 'Numéro de contrat',
      numeroAbonnement: 'Numéro d\'abonnement',
      numeroSuivi: 'Numéro de suivi',
      numeroAvis: 'Numéro d\'avis',
      numeroCommande: 'Numéro de commande',
      numeroLigne: 'Numéro de ligne',
      numeroMobile: 'Numéro de mobile',
      dateNaissance: 'Date de naissance',
      lieuNaissance: 'Lieu de naissance',
      dateAchat: 'Date d\'achat',
      dateEnvoi: 'Date d\'envoi',
      dateDebut: 'Date de début',
      dateDepart: 'Date de départ',
      datePerte: 'Date de perte/vol',
      lieuPerte: 'Lieu de perte/vol',
      typeDocument: 'Type de document',
      typeAssurance: 'Type d\'assurance',
      typeAutorisation: 'Type d\'autorisation',
      typeConge: 'Type de congé',
      perteOuVol: 'Perte ou vol',
      motif: 'Motif',
      motifRupture: 'Motif de rupture',
      motifDemande: 'Motif de la demande',
      motifContestation: 'Motif de contestation',
      explications: 'Explications',
      circonstances: 'Circonstances',
      description: 'Description',
      details: 'Détails',
      objet: 'Objet',
      montant: 'Montant',
      immatriculation: 'Immatriculation',
      situationFamiliale: 'Situation familiale',
      nombrePersonnes: 'Nombre de personnes',
      dureePreavis: 'Durée du préavis',
      duree: 'Durée',
      probleme: 'Problème',
      portabilite: 'Portabilité',
      telephone: 'Téléphone',
      email: 'Email',
    }
    return labels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  }

  // Formater les dates
  const formatValue = (key: string, value: string): string => {
    if (key.toLowerCase().includes('date') && value.includes('-')) {
      try {
        return new Date(value).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      } catch {
        return value
      }
    }
    return value
  }

  // Champs à exclure de l'affichage détaillé
  const excludedFields = ['prenom', 'nom', 'adresse', 'codePostal', 'ville', 'prenomHebergeur', 'nomHebergeur',
    'prenomParent', 'nomParent', 'destinataire', 'entreprise', 'assureur', 'salleSport', 'operateur',
    'transporteur', 'nomProprietaire', 'adresseDestinataire', 'adresseEntreprise', 'adresseAssureur',
    'adresseSalle', 'adresseProprietaire']

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Expéditeur */}
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{prenom} {nom}</Text>
          {adresse && <Text>{adresse}</Text>}
          {(codePostal || ville) && <Text>{codePostal} {ville}</Text>}
        </View>

        {/* Destinataire si présent */}
        {destinataire && (
          <View style={styles.recipientInfo}>
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>{destinataire}</Text>
            {adresseDestinataire && <Text>{adresseDestinataire}</Text>}
          </View>
        )}

        {/* Date et lieu */}
        <View style={styles.date}>
          <Text>{ville}, le {today}</Text>
        </View>

        {/* Objet */}
        <Text style={styles.subject}>Objet : {title}</Text>

        {/* Corps */}
        <View style={styles.body}>
          <Text>Madame, Monsieur,</Text>
        </View>

        <View style={styles.body}>
          <Text>
            Par la présente, je vous adresse cette demande concernant : {title.toLowerCase()}.
          </Text>
        </View>

        {/* Afficher les informations pertinentes */}
        <View style={styles.body}>
          <Text style={{ fontFamily: 'Helvetica-Bold', marginBottom: 10 }}>Informations :</Text>
          {Object.entries(data).map(([key, value]) => {
            if (value && !excludedFields.includes(key)) {
              return (
                <Text key={key} style={{ marginBottom: 5, marginLeft: 10 }}>
                  • {formatLabel(key)} : {formatValue(key, value)}
                </Text>
              )
            }
            return null
          })}
        </View>

        <View style={styles.body}>
          <Text>
            Je reste à votre disposition pour tout renseignement complémentaire et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
          </Text>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Text style={styles.signatureName}>{prenom} {nom}</Text>
          <Text style={{ marginTop: 30, fontStyle: 'italic', color: '#666' }}>
            (Signature)
          </Text>
        </View>
      </Page>
    </Document>
  )
}