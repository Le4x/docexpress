import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SUBSCRIPTION_PLANS } from '@/config/pricing'

interface DocumentRecord {
  id: string
  type: string
  createdAt: Date
  paymentType: string
  blobUrl: string | null
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  // Récupérer les données utilisateur
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: true,
      documents: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      monthlyUsage: {
        where: {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
      },
    },
  })

  if (!user) {
    redirect('/login')
  }

  const plan = (user.subscription?.plan ?? 'free') as keyof typeof SUBSCRIPTION_PLANS
  const planConfig = SUBSCRIPTION_PLANS[plan]
  const currentUsage = user.monthlyUsage[0]?.count ?? 0
  const usageLimit = planConfig.features.documentsPerMonth

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/DOCEXPRESS-LOGO.png"
              alt="DocExpress.fr"
              width={280}
              height={70}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/#documents" className="text-gray-600 hover:text-blue-600 transition-colors">
              Documents
            </Link>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/' })
              }}
            >
              <button
                type="submit"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                Déconnexion
              </button>
            </form>
          </nav>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour{user.name ? `, ${user.name}` : ''} !
          </h1>
          <p className="text-gray-600">Bienvenue sur votre espace DocExpress</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card Abonnement */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Mon abonnement</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  plan === 'pro'
                    ? 'bg-purple-100 text-purple-700'
                    : plan === 'pass'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                }`}
              >
                {planConfig.name}
              </span>
            </div>

            <div className="space-y-3">
              {usageLimit === -1 ? (
                <p className="text-gray-600">
                  <span className="text-2xl font-bold text-green-600">Illimité</span>
                </p>
              ) : (
                <div>
                  <p className="text-sm text-gray-500">Documents ce mois</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">{currentUsage}</span>
                    <span className="text-gray-500">/ {usageLimit}</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        currentUsage >= usageLimit ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(100, (currentUsage / usageLimit) * 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {plan === 'free' && (
                <Link
                  href="/pricing"
                  className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4"
                >
                  Passer à l'illimité
                </Link>
              )}
            </div>
          </div>

          {/* Card Actions rapides */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <Link
                href="/#documents"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Nouveau document</p>
                  <p className="text-sm text-gray-500">Générer un document</p>
                </div>
              </Link>

              {user.stripeCustomerId && (
                <Link
                  href="/api/stripe/portal"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Gérer mon abonnement</p>
                    <p className="text-sm text-gray-500">Facturation, annulation</p>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Card Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">Statistiques</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Documents générés (total)</p>
                <p className="text-2xl font-bold text-gray-900">{user.documents.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Membre depuis</p>
                <p className="text-lg font-medium text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents récents */}
        {user.documents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Documents récents</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(user.documents as DocumentRecord[]).map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="font-medium text-gray-900">{doc.type}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(doc.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            doc.paymentType === 'subscription'
                              ? 'bg-blue-100 text-blue-700'
                              : doc.paymentType === 'free'
                                ? 'bg-gray-100 text-gray-700'
                                : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {doc.paymentType === 'subscription'
                            ? 'Abonnement'
                            : doc.paymentType === 'free'
                              ? 'Gratuit'
                              : 'Achat'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        {doc.blobUrl && (
                          <a
                            href={doc.blobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Télécharger
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty state */}
        {user.documents.length === 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document</h3>
            <p className="text-gray-500 mb-6">
              Vous n'avez pas encore généré de document. Commencez dès maintenant !
            </p>
            <Link
              href="/#documents"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Créer mon premier document
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
