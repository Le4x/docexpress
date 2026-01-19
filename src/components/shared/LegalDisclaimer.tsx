'use client'

import Link from 'next/link'

interface Props {
  variant?: 'default' | 'compact'
}

export function LegalDisclaimer({ variant = 'default' }: Props) {
  if (variant === 'compact') {
    return (
      <p className="text-xs text-gray-400 mt-4">
        Les documents générés sont fournis à titre informatif et ne constituent pas un conseil
        juridique.{' '}
        <Link href="/mentions-legales" className="underline">
          En savoir plus
        </Link>
      </p>
    )
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
      <div className="flex gap-3">
        <svg
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <div>
          <p className="font-medium mb-1">Information importante</p>
          <p>
            Les documents générés par DocExpress sont fournis à titre informatif et ne constituent
            pas un conseil juridique. Ils sont basés sur les modèles officiels et la législation en
            vigueur, mais chaque situation étant unique, nous vous recommandons de consulter un
            professionnel du droit pour toute question spécifique.
          </p>
        </div>
      </div>
    </div>
  )
}
