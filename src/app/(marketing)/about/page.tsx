import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos de DocExpress - Votre partenaire documents administratifs',
  description:
    'Découvrez DocExpress, le service français de génération de documents administratifs. Notre mission : simplifier vos démarches.',
}

export default function AboutPage() {
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
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Tarifs
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

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">À propos de DocExpress</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            DocExpress est né d'un constat simple : générer un document administratif ne devrait pas
            prendre des heures ni nécessiter un diplôme en droit.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Notre mission</h2>
          <p className="text-gray-600">
            Rendre les démarches administratives accessibles à tous en proposant des documents
            conformes, personnalisés, et générés en quelques minutes. Nous croyons que chacun
            devrait pouvoir créer facilement les documents dont il a besoin, sans stress ni
            complication.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Qui sommes-nous ?</h2>
          <p className="text-gray-600">
            DocExpress est édité par <strong>EvoluDream</strong>, entreprise française basée dans
            les Hauts-de-France. Nous développons des outils numériques pour simplifier le quotidien
            des particuliers et des entreprises.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-4">Nos engagements</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong>Conformité</strong> : Nos modèles sont basés sur les documents officiels et
                mis à jour régulièrement selon l'évolution de la législation.
              </div>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong>Transparence</strong> : Tarifs clairs affichés, pas de frais cachés, pas
                d'abonnement imposé.
              </div>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong>Protection des données</strong> : Vos informations personnelles sont
                chiffrées et supprimées automatiquement après 30 jours (conformité RGPD).
              </div>
            </li>
            <li className="flex gap-3">
              <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <strong>Support réactif</strong> : Une question ? Notre équipe répond sous 24h
                maximum.
              </div>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-4">Contact</h2>
          <p className="text-gray-600">
            Une question, une suggestion, un problème ? Contactez-nous à{' '}
            <a href="mailto:contact@docexpress.fr" className="text-blue-600 hover:underline">
              contact@docexpress.fr
            </a>
          </p>
        </div>

        {/* Infos légales */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-900 mb-4">Informations légales</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Raison sociale :</strong> EvoluDream
              </p>
              <p>
                <strong>Forme juridique :</strong> Auto-entreprise
              </p>
            </div>
            <div>
              <p>
                <strong>Responsable publication :</strong> Manuel Perales
              </p>
              <p>
                <strong>Hébergeur :</strong> Vercel Inc.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#documents"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Découvrir nos documents
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
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
