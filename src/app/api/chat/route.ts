import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@/lib/openai'
import { getDocumentBySlug } from '@/data/documents'

export async function POST(request: NextRequest) {
  try {
    // Vérifier si OpenAI est configuré
    if (!openai) {
      return NextResponse.json(
        { message: 'Assistant IA non disponible pour le moment. Veuillez utiliser le formulaire.', collectedData: {}, isComplete: false },
        { status: 503 }
      )
    }

    const { messages, documentType, collectedData } = await request.json()

    const document = getDocumentBySlug(documentType)
    const fieldsDescription = document?.fields
      .map(f => `- ${f.label} (${f.name})${f.required ? ' [obligatoire]' : ''}`)
      .join('\n')

    const systemPrompt = `Tu es l'assistant DocExpress, un assistant français sympathique et professionnel qui aide les utilisateurs à remplir leurs documents administratifs.

Document à créer : ${document?.title || documentType}

Champs à collecter :
${fieldsDescription}

Données déjà collectées :
${JSON.stringify(collectedData, null, 2)}

Instructions :
1. Pose les questions une par une de manière naturelle et conversationnelle
2. Quand l'utilisateur répond, extrait l'information et passe à la question suivante
3. Si une réponse n'est pas claire, demande poliment de préciser
4. Sois encourageant et aide l'utilisateur si il hésite
5. Quand tu as collecté TOUTES les informations obligatoires, indique que c'est terminé

Format de réponse JSON :
{
  "message": "Ton message à l'utilisateur",
  "collectedData": { "nomDuChamp": "valeur" },
  "isComplete": false,
  "finalData": null
}

Quand toutes les données sont collectées :
{
  "message": "Parfait ! J'ai toutes les informations. Cliquez sur le bouton pour générer votre document.",
  "collectedData": {},
  "isComplete": true,
  "finalData": { ...toutes les données collectées }
}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const content = response.choices[0].message.content
    const parsed = JSON.parse(content || '{}')

    return NextResponse.json(parsed)
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { message: 'Une erreur est survenue. Réessayez.', collectedData: {}, isComplete: false },
      { status: 500 }
    )
  }
}