'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getDocumentBySlug } from '@/data/documents'
import DocumentForm from '@/components/DocumentForm'
import ChatAssistant from '@/components/ChatAssistant'

export default function DocumentPage() {
  const params = useParams()
  const slug = params.slug as string
  const document = getDocumentBySlug(slug)
  
  const [mode, setMode] = useState<'form' | 'chat'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [formData, setFormData] = useState<Record<string, string> | null>(null)

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Document non trouvé</h1>
          <Link href="/" className="text-orange-500 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  const handleFormSubmit = (data: Record<string, string>) => {
    setFormData(data)
  }

  const handleChatComplete = (data: Record<string, string>) => {
    setFormData(data)
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError && validateEmail(value)) {
      setEmailError('')
    }
  }

  const handlePayment = async () => {
    if (!formData) return
    
    // Validation email
    if (!email) {
      setEmailError('Veuillez entrer votre adresse email')
      return
    }
    
    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse email valide (ex: nom@exemple.fr)')
      return
    }

    setEmailError('')
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentSlug: slug,
          formData,
          email
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du paiement')
      }
      
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Payment error:', error)
      alert('Erreur lors du paiement. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-blue-900">Doc</span>
            <span className="text-2xl font-bold text-orange-500">Express</span>
            <span className="text-2xl font-bold text-green-600">.fr</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <Link href="/" className="text-gray-500 hover:text-orange-500">Accueil</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-800">{document.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{document.title}</h1>
            <p className="text-gray-600 mb-8">{document.description}</p>

            {/* Toggle mode */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode('form')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'form' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📝 Formulaire
              </button>
              <button
                onClick={() => setMode('chat')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'chat' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🤖 Assistant IA
              </button>
            </div>

            {/* Formulaire ou Chat */}
            {!formData ? (
              mode === 'form' ? (
                <DocumentForm document={document} onSubmit={handleFormSubmit} />
              ) : (
                <ChatAssistant documentType={slug} onComplete={handleChatComplete} />
              )
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Informations complètes !
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Votre email (pour recevoir le document)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="votre@email.com"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 text-gray-900 ${
                      emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Redirection...' : `Payer ${document.price.toFixed(2)}€ et télécharger`}
                </button>

                <button
                  onClick={() => setFormData(null)}
                  className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm"
                >
                  ← Modifier les informations
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-orange-500">{document.price.toFixed(2)}€</span>
              </div>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Document PDF professionnel
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Conforme à la loi française
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Téléchargement immédiat
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Envoi par email inclus
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  🔒 Paiement sécurisé par Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}