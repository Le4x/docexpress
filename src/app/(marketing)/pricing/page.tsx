import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { PricingTable } from '@/components/marketing/PricingTable'

export const metadata: Metadata = {
  title: 'Tarifs DocExpress - Documents administratifs à partir de 0€',
  description:
    'Découvrez nos tarifs simples et transparents. 1er document gratuit, puis à partir de 1,99€. Pass illimité à 4,99€/mois.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/DOCEXPRESS-LOGO.png"
              alt="DocExpress.fr"
              width={280}
              height={70}
              className="h-14 w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            <Link href="/#documents" className="text-gray-600 hover:text-blue-600 transition-colors">
              Documents
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              À propos
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Connexion
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Des tarifs simples et transparents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Commencez gratuitement avec 1 document par mois. Passez à l'illimité quand vous en avez
            besoin.
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <PricingTable />

      {/* FAQ Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Questions fréquentes</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Puis-je annuler mon abonnement à tout moment ?
              </h3>
              <p className="text-gray-600">
                Oui, absolument. Le Pass Mensuel et le Plan Pro sont sans engagement. Vous pouvez
                annuler à tout moment depuis votre espace client, et vous conservez l'accès jusqu'à
                la fin de la période payée.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Que se passe-t-il après mon document gratuit ?
              </h3>
              <p className="text-gray-600">
                Votre quota se renouvelle chaque mois. Si vous avez besoin de plus d'un document par
                mois, vous pouvez acheter à l'unité ou passer au Pass Mensuel pour un accès
                illimité.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Le bandeau "DocExpress" est-il visible sur le document ?
              </h3>
              <p className="text-gray-600">
                Le bandeau n'apparaît que sur les documents générés avec le plan gratuit. Il est
                discret et placé en bas de page. Les plans payants génèrent des documents sans
                aucune mention.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Combien de temps mes documents sont-ils conservés ?
              </h3>
              <p className="text-gray-600">
                Pour le plan gratuit, les documents sont téléchargeables immédiatement mais ne sont
                pas sauvegardés. Avec le Pass ou le Pro, votre historique est conservé pendant 1 an
                dans votre espace client.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Le Pass Mensuel est-il vraiment rentable ?
              </h3>
              <p className="text-gray-600">
                Si vous générez 2 documents ou plus par mois, le Pass est plus avantageux que
                l'achat à l'unité. Et avec l'accès illimité, vous pouvez générer autant de documents
                que nécessaire sans vous soucier du coût.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à simplifier vos démarches ?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Créez votre premier document gratuitement en moins de 2 minutes.
          </p>
          <Link
            href="/#documents"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-8 rounded-xl transition-colors"
          >
            Commencer gratuitement
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Image
              src="/img/DOCEXPRESS-LOGO.png"
              alt="DocExpress.fr"
              width={200}
              height={50}
              className="h-12 w-auto brightness-200"
            />
            <div className="flex gap-6 text-sm">
              <Link href="/mentions-legales" className="hover:text-white">
                Mentions légales
              </Link>
              <Link href="/cgv" className="hover:text-white">
                CGV
              </Link>
              <Link href="/confidentialite" className="hover:text-white">
                Confidentialité
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-6">
            © 2026 DocExpress.fr — Tous droits réservés
          </p>
        </div>
      </footer>
    </main>
  )
}
