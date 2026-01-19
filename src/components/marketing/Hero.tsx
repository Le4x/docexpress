'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge de confiance */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>+50 000 documents générés</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Vos documents administratifs
            <span className="text-blue-600"> prêts en 2 minutes</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Lettres de démission, résiliations, attestations... Générez des documents{' '}
            <strong>conformes</strong> et <strong>personnalisés</strong>, sans vous prendre la tête
            avec la mise en forme.
          </p>

          {/* Value proposition rapide */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Plus rapide que les sites officiels</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Conformes à la législation 2026</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                  clipRule="evenodd"
                />
                <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
              </svg>
              <span>1er document gratuit</span>
            </div>
          </div>

          {/* CTA principal */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#documents"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors shadow-lg"
            >
              Créer mon document gratuitement
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-8 rounded-xl border border-gray-300 transition-colors"
            >
              Voir les tarifs
            </Link>
          </div>

          {/* Micro-social proof */}
          <p className="mt-6 text-sm text-gray-500">
            Pas de carte bancaire requise • Résultat immédiat
          </p>
        </div>
      </div>
    </section>
  )
}
