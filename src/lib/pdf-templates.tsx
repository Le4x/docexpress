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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Expéditeur */}
        <View style={styles.senderInfo}>
          <Text style={styles.senderName}>{prenom} {nom}</Text>
          {adresse && <Text>{adresse}</Text>}
          {(codePostal || ville) && <Text>{codePostal} {ville}</Text>}
        </View>

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
            Par la présente, je vous adresse ce document concernant : {title.toLowerCase()}.
          </Text>
        </View>

        {/* Afficher toutes les données du formulaire */}
        <View style={styles.body}>
          {Object.entries(data).map(([key, value]) => {
            if (value && !['prenom', 'nom', 'adresse', 'codePostal', 'ville'].includes(key)) {
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
              return (
                <Text key={key} style={{ marginBottom: 5 }}>
                  • {label} : {value}
                </Text>
              )
            }
            return null
          })}
        </View>

        <View style={styles.body}>
          <Text>
            Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.
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