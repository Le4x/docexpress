'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ConversionPopupProps {
  delay?: number // Délai avant affichage (ms)
  trigger?: 'scroll' | 'exit' | 'time' // Type de déclencheur
}

export default function ConversionPopup({ delay = 30000, trigger = 'time' }: ConversionPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Vérifier si déjà fermé dans cette session
    const dismissed = sessionStorage.getItem('docexpress_popup_dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    // Vérifier si l'utilisateur a déjà acheté ou utilisé le gratuit
    const hasPurchased = localStorage.getItem('docexpress_purchased')
    if (hasPurchased) {
      setIsDismissed(true)
      return
    }

    if (trigger === 'time') {
      // Afficher après un délai
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay)
      return () => clearTimeout(timer)
    }

    if (trigger === 'scroll') {
      // Afficher après scroll à 50% de la page
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        if (scrollPercent > 50) {
          setIsVisible(true)
          window.removeEventListener('scroll', handleScroll)
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    if (trigger === 'exit') {
      // Afficher quand la souris quitte la fenêtre (exit intent)
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true)
          document.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [delay, trigger])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem('docexpress_popup_dismissed', 'true')
  }

  if (isDismissed || !isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        {/* Bouton fermer */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
          aria-label="Fermer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
            <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>
            <span className="text-white text-sm font-medium">Offre limitée</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Pack 3 Documents
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-white/70 text-xl line-through">8,97€</span>
            <span className="text-4xl font-bold text-white">6,99€</span>
          </div>
          <p className="text-orange-100 text-sm mt-2">Économisez 22% !</p>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>3 documents au choix parmi +30 modèles</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Valable 1 an, sans engagement</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Conformes à la législation française</span>
            </li>
            <li className="flex items-center gap-3 text-gray-700">
              <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Téléchargement instantané en PDF</span>
            </li>
          </ul>

          <Link
            href="/pack"
            onClick={handleDismiss}
            className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 px-6 rounded-xl text-center hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
          >
            Acheter le pack - 6,99€
          </Link>

          <button
            onClick={handleDismiss}
            className="block w-full text-center text-gray-500 hover:text-gray-700 text-sm mt-4"
          >
            Non merci, peut-être plus tard
          </button>
        </div>

        {/* Badge de confiance */}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Paiement sécurisé
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Satisfait ou remboursé
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
