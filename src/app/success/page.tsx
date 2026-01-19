'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type PurchaseType = 'single' | 'pack3' | null

interface PackInfo {
  packId: string
  documentsRemaining: number
  expiresAt: string
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const type = searchParams.get('type') as PurchaseType

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [packInfo, setPackInfo] = useState<PackInfo | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      setErrorMessage('Session de paiement invalide.')
      return
    }

    // Activer le pack si c'est un achat de pack
    if (type === 'pack3') {
      activatePack()
    } else {
      setStatus('success')
    }
  }, [sessionId, type])

  const activatePack = async () => {
    try {
      const response = await fetch('/api/activate-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })

      const data = await response.json()

      if (response.ok) {
        setPackInfo(data)
        setStatus('success')
        // Stocker l'info du pack dans localStorage pour accès facile
        localStorage.setItem('docexpress_pack_id', data.packId)
        localStorage.setItem('docexpress_pack_email', data.email)
      } else {
        // Le pack existe peut-être déjà
        if (data.packId) {
          setPackInfo(data)
          setStatus('success')
        } else {
          setStatus('error')
          setErrorMessage(data.error || 'Erreur lors de l\'activation du pack')
        }
      }
    } catch (error) {
      console.error('Erreur activation pack:', error)
      setStatus('error')
      setErrorMessage('Erreur de connexion. Veuillez rafraîchir la page.')
    }
  }

  const handleDownload = () => {
    if (sessionId) {
      window.open(`/api/generate-pdf?session_id=${sessionId}`, '_blank')
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {type === 'pack3' ? 'Activation de votre pack...' : 'Vérification du paiement...'}
          </p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-6">{errorMessage}</p>
          <Link href="/" className="text-orange-500 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  // Affichage pour un pack
  if (type === 'pack3' && packInfo) {
    const expiresDate = new Date(packInfo.expiresAt).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
        <header className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/img/DOCEXPRESS-LOGO.png"
                alt="DocExpress.fr"
                width={360}
                height={90}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Pack activé avec succès !
            </h1>

            <p className="text-gray-600 mb-8">
              Merci pour votre achat. Votre Pack 3 Documents est maintenant actif.
            </p>

            {/* Récapitulatif du pack */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-sm text-gray-500">Documents restants</p>
                  <p className="text-2xl font-bold text-orange-500">{packInfo.documentsRemaining}/3</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valide jusqu'au</p>
                  <p className="text-lg font-semibold text-gray-800">{expiresDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                href="/#documents"
                className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
              >
                Choisir mes documents
              </Link>

              <Link
                href="/"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Comment utiliser votre pack ?</strong><br />
                Rendez-vous sur la page d'un document, remplissez le formulaire, puis utilisez votre email pour accéder à vos documents du pack.
              </p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Affichage pour un document individuel
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Paiement réussi !
          </h1>

          <p className="text-gray-600 mb-6">
            Merci pour votre achat. Votre document est prêt à être téléchargé.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleDownload}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger le PDF
            </button>

            <Link
              href="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Retour à l'accueil
            </Link>
          </div>

          {/* Upsell vers le pack */}
          <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm text-orange-800 mb-2">
              <strong>Besoin d'autres documents ?</strong>
            </p>
            <p className="text-sm text-orange-700 mb-3">
              Économisez 22% avec le Pack 3 documents à 6,99€
            </p>
            <Link
              href="/pack"
              className="text-orange-600 hover:text-orange-800 text-sm font-medium"
            >
              Voir l'offre →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Un problème ? Contactez-nous à contact@docexpress.fr
        </p>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
