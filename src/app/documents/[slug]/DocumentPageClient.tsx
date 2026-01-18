'use client'

import { useState, useEffect } from 'react'
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

  // États pour l'offre gratuite
  const [isEligibleForFree, setIsEligibleForFree] = useState<boolean | null>(null)
  const [checkingEligibility, setCheckingEligibility] = useState(false)
  const [freeDocumentUsed, setFreeDocumentUsed] = useState(false)

  // Vérifier dans localStorage si l'utilisateur a déjà utilisé son document gratuit
  useEffect(() => {
    const usedFree = localStorage.getItem('docexpress_free_used')
    if (usedFree) {
      setFreeDocumentUsed(true)
      setIsEligibleForFree(false)
    }
  }, [])

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

  const handleEmailChange = async (value: string) => {
    setEmail(value)
    if (emailError && validateEmail(value)) {
      setEmailError('')
    }

    // Vérifier l'éligibilité quand l'email est valide
    if (validateEmail(value) && !freeDocumentUsed) {
      setCheckingEligibility(true)
      try {
        const response = await fetch(`/api/free-document?email=${encodeURIComponent(value)}`)
        const data = await response.json()
        setIsEligibleForFree(data.eligible)
      } catch (error) {
        console.error('Erreur vérification éligibilité:', error)
        setIsEligibleForFree(false)
      } finally {
        setCheckingEligibility(false)
      }
    }
  }

  const handleFreeDownload = async () => {
    if (!formData || !email) return

    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse email valide')
      return
    }

    setIsLoading(true)
    setEmailError('')

    try {
      const response = await fetch('/api/free-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          documentSlug: slug,
          formData
        })
      })

      if (response.ok) {
        // Télécharger le PDF
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = window.document.createElement('a')
        a.href = url
        a.download = `${slug}.pdf`
        window.document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        a.remove()

        // Marquer comme utilisé dans localStorage
        localStorage.setItem('docexpress_free_used', 'true')
        localStorage.setItem('docexpress_free_email', email)
        setFreeDocumentUsed(true)
        setIsEligibleForFree(false)

        alert('Votre document gratuit a été téléchargé ! Une copie a également été envoyée à votre email.')
      } else {
        const data = await response.json()
        if (data.requirePayment) {
          setIsEligibleForFree(false)
          setFreeDocumentUsed(true)
          localStorage.setItem('docexpress_free_used', 'true')
          alert('Vous avez déjà utilisé votre document gratuit. Veuillez procéder au paiement.')
        } else {
          throw new Error(data.error || 'Erreur lors de la génération')
        }
      }
    } catch (error) {
      console.error('Erreur téléchargement gratuit:', error)
      alert('Erreur lors du téléchargement. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
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
              src="/img/DOCEXPRESS-LOGO.png"
              alt="DocExpress.fr"
              width={360}
              height={90}
              className="h-20 w-auto"
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

                  {/* Indicateur d'éligibilité */}
                  {checkingEligibility && (
                    <p className="mt-2 text-sm text-gray-500">Vérification de votre éligibilité...</p>
                  )}
                  {!checkingEligibility && isEligibleForFree === true && (
                    <p className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Vous êtes éligible au document gratuit !
                    </p>
                  )}
                  {!checkingEligibility && isEligibleForFree === false && freeDocumentUsed && (
                    <p className="mt-2 text-sm text-orange-600">
                      Vous avez déjà utilisé votre document gratuit.
                    </p>
                  )}
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3">
                  {/* Bouton gratuit si éligible */}
                  {isEligibleForFree === true && (
                    <button
                      onClick={handleFreeDownload}
                      disabled={isLoading}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        'Génération en cours...'
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                          </svg>
                          Télécharger GRATUITEMENT
                        </>
                      )}
                    </button>
                  )}

                  {/* Bouton payant */}
                  <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className={`w-full font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 ${
                      isEligibleForFree === true
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    {isLoading ? 'Redirection...' : `Payer ${document.price.toFixed(2)}€ et télécharger`}
                  </button>
                </div>

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
              {/* Offre gratuite si éligible */}
              {!freeDocumentUsed && (
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-4 mb-4 -mt-2 -mx-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">🎁</span>
                    <span className="font-bold">1er document OFFERT</span>
                  </div>
                  <p className="text-sm text-green-100">Entrez votre email pour en profiter !</p>
                </div>
              )}

              <div className="text-center mb-6">
                {!freeDocumentUsed ? (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-green-500">0€</span>
                      <span className="text-xl text-gray-400 line-through">{document.price.toFixed(2)}€</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium mt-1">1er document gratuit !</p>
                  </>
                ) : (
                  <>
                    <span className="text-4xl font-bold text-orange-500">{document.price.toFixed(2)}€</span>
                    <p className="text-sm text-gray-500 mt-1">TTC</p>
                  </>
                )}
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
                <li className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Sans filigrane
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
              src="/img/DOCEXPRESS-LOGO.png"
              alt="DocExpress.fr"
              width={320}
              height={80}
              className="h-16 w-auto"
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
