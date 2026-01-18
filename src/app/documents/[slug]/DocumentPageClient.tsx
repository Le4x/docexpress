'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { DocumentTemplate } from '@/data/documents'
import DocumentForm from '@/components/DocumentForm'
import ChatAssistant from '@/components/ChatAssistant'

interface Props {
  document: DocumentTemplate
  slug: string
}

export default function DocumentPageClient({ document, slug }: Props) {
  const [mode, setMode] = useState<'form' | 'chat'>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [formData, setFormData] = useState<Record<string, string> | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/logoDOCE.png"
              alt="DocExpress.fr"
              width={180}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
              Accueil
            </Link>
            <Link href="/#documents" className="text-gray-600 hover:text-orange-500 transition-colors">
              Documents
            </Link>
            <Link href="/#tarifs" className="text-gray-600 hover:text-orange-500 transition-colors">
              Tarifs
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
            <Link href="/" className="block text-gray-600 hover:text-orange-500 py-2">
              Accueil
            </Link>
            <Link href="/#documents" className="block text-gray-600 hover:text-orange-500 py-2">
              Documents
            </Link>
            <Link href="/#tarifs" className="block text-gray-600 hover:text-orange-500 py-2">
              Tarifs
            </Link>
            <Link href="/#faq" className="block text-gray-600 hover:text-orange-500 py-2">
              FAQ
            </Link>
          </nav>
        )}
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Fil d'Ariane">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-orange-500">Accueil</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/#documents" className="text-gray-500 hover:text-orange-500">{document.category}</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-800">{document.title}</li>
          </ol>
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
                Formulaire
              </button>
              <button
                onClick={() => setMode('chat')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  mode === 'chat'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Assistant IA
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
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-orange-500">{document.price.toFixed(2)}€</span>
                <p className="text-sm text-gray-500 mt-1">TTC</p>
              </div>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Document PDF professionnel
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Conforme à la loi française
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Téléchargement immédiat
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Génération en {document.duration}
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Paiement sécurisé par Stripe
                </p>
              </div>
            </div>

            {/* Info box */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Besoin d'aide ?</h4>
              <p className="text-sm text-blue-700">
                Utilisez l'assistant IA pour être guidé étape par étape dans la création de votre document.
              </p>
            </div>
          </div>
        </div>

        {/* Section SEO - Contenu supplémentaire */}
        <section className="mt-16 bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            À propos de ce document : {document.title}
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-4">
              Notre modèle de <strong>{document.title.toLowerCase()}</strong> est conçu pour répondre aux exigences légales françaises.
              Il vous permet de créer rapidement un document professionnel et juridiquement valable.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Pourquoi utiliser DocExpress ?</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Formulaire guidé avec exemples et conseils</li>
              <li>Document généré en moins de {document.duration}</li>
              <li>Conforme à la législation française en vigueur</li>
              <li>Téléchargement immédiat au format PDF</li>
              <li>Assistance par chat IA disponible 24h/24</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image
              src="/img/logoDOCE.png"
              alt="DocExpress.fr"
              width={140}
              height={35}
              className="h-8 w-auto brightness-0 invert"
            />
            <div className="flex gap-6 text-sm">
              <Link href="/mentions-legales" className="hover:text-orange-400">Mentions légales</Link>
              <Link href="/cgv" className="hover:text-orange-400">CGV</Link>
              <Link href="/confidentialite" className="hover:text-orange-400">Confidentialité</Link>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            © 2025 DocExpress.fr — Tous droits réservés
          </p>
        </div>
      </footer>
    </main>
  )
}
