'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PackPage() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handlePurchase = async () => {
    if (!email) {
      setEmailError('Veuillez entrer votre adresse email')
      return
    }

    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse email valide')
      return
    }

    setIsLoading(true)
    setEmailError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pack3',
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
      console.error('Erreur:', error)
      alert('Erreur lors du paiement. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
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
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
              Accueil
            </Link>
            <Link href="/#documents" className="text-gray-600 hover:text-orange-500 transition-colors">
              Documents
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-2 mb-4">
            <span className="animate-pulse w-2 h-2 bg-orange-500 rounded-full"></span>
            <span className="font-medium">Offre la plus populaire</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pack 3 Documents
          </h1>
          <p className="text-xl text-gray-600">
            Générez 3 documents de votre choix parmi +30 modèles
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Carte du pack */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-orange-500">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-2xl text-gray-400 line-through">8,97€</span>
                <span className="text-5xl font-bold text-orange-500">6,99€</span>
              </div>
              <p className="text-green-600 font-medium">Économisez 22% !</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">3 documents au choix</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">+30 modèles disponibles</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Valable 1 an</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Conformes à la loi française</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Téléchargement instantané PDF</span>
              </li>
            </ul>

            {/* Formulaire email */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (emailError) setEmailError('')
                  }}
                  placeholder="votre@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 ${
                    emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600">{emailError}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Vous recevrez un email de confirmation avec accès à vos documents
                </p>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirection vers le paiement...
                  </span>
                ) : (
                  'Acheter le pack - 6,99€'
                )}
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Paiement sécurisé Stripe
              </span>
            </div>
          </div>

          {/* Info section */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">Comment ça marche ?</h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <p className="font-medium text-gray-900">Achetez le pack</p>
                    <p className="text-sm text-gray-600">Paiement sécurisé par carte bancaire</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <p className="font-medium text-gray-900">Choisissez vos documents</p>
                    <p className="text-sm text-gray-600">Parmi +30 modèles disponibles</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <p className="font-medium text-gray-900">Téléchargez instantanément</p>
                    <p className="text-sm text-gray-600">Documents PDF prêts à l'emploi</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-green-800 mb-2">Économisez vs achat unitaire</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-green-700">3 documents individuels</span>
                  <span className="text-green-700 line-through">8,97€</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-green-800">Pack 3 documents</span>
                  <span className="text-green-800">6,99€</span>
                </div>
                <div className="border-t border-green-200 pt-2 flex justify-between font-bold">
                  <span className="text-green-800">Vous économisez</span>
                  <span className="text-green-600">1,98€ (-22%)</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-800 mb-2">Besoin d'un seul document ?</h3>
              <p className="text-sm text-blue-700 mb-3">
                Vous pouvez aussi acheter des documents à l'unité pour 2,99€ chacun.
              </p>
              <Link
                href="/#documents"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Voir tous les documents →
              </Link>
            </div>
          </div>
        </div>
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
