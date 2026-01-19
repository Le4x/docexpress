'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

function LoginContent() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  const plan = searchParams.get('plan')

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('resend', {
        email,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setError('Une erreur est survenue. Veuillez réessayer.')
      } else {
        setEmailSent(true)
      }
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    await signIn('google', { callbackUrl })
  }

  if (emailSent) {
    return (
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vérifiez votre email</h1>

          <p className="text-gray-600 mb-6">
            Un lien de connexion a été envoyé à <strong>{email}</strong>. Cliquez sur le lien dans
            l'email pour vous connecter.
          </p>

          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
            <p>
              <strong>Pas reçu l'email ?</strong> Vérifiez votre dossier spam ou{' '}
              <button
                onClick={() => setEmailSent(false)}
                className="underline font-medium"
              >
                réessayez avec une autre adresse
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md w-full">
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/">
          <Image
            src="/img/DOCEXPRESS-LOGO.png"
            alt="DocExpress.fr"
            width={280}
            height={70}
            className="h-16 w-auto mx-auto"
            priority
          />
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {plan === 'pass' || plan === 'pro' ? 'Créez votre compte' : 'Connexion'}
        </h1>
        <p className="text-gray-600 text-center mb-8">
          {plan === 'pass'
            ? 'Inscrivez-vous pour accéder au Pass Mensuel'
            : plan === 'pro'
              ? 'Inscrivez-vous pour accéder au Plan Pro'
              : 'Connectez-vous pour accéder à vos documents'}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuer avec Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">ou par email</span>
          </div>
        </div>

        {/* Email Login */}
        <form onSubmit={handleEmailLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Envoi en cours...' : 'Recevoir un lien de connexion'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          En vous connectant, vous acceptez nos{' '}
          <Link href="/cgv" className="underline">
            conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/confidentialite" className="underline">
            politique de confidentialité
          </Link>
          .
        </p>
      </div>

      <p className="text-center text-gray-600 mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Retour à l'accueil
        </Link>
      </p>
    </div>
  )
}

function LoginFallback() {
  return (
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <div className="h-16 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-48 mx-auto" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-8 w-64 mx-auto" />
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse mb-4" />
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Suspense fallback={<LoginFallback />}>
        <LoginContent />
      </Suspense>
    </main>
  )
}
