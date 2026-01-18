import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Mentions légales - DocExpress.fr',
  description: 'Mentions légales du site DocExpress.fr, générateur de documents administratifs français.',
  robots: 'index, follow',
}

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/logoDOCE.png"
              alt="DocExpress.fr"
              width={180}
              height={45}
              className="h-10 w-auto"
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mentions légales</h1>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Éditeur du site</h2>
            <p className="text-gray-600 mb-4">
              Le site DocExpress.fr est édité par :<br />
              <strong>DocExpress</strong><br />
              Société par actions simplifiée (SAS)<br />
              Capital social : 1 000 euros<br />
              Siège social : France<br />
              Email : contact@docexpress.fr
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Directeur de la publication</h2>
            <p className="text-gray-600 mb-4">
              Le directeur de la publication est le représentant légal de la société DocExpress.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Hébergeur</h2>
            <p className="text-gray-600 mb-4">
              Le site est hébergé par :<br />
              <strong>Vercel Inc.</strong><br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, États-Unis<br />
              Site web : vercel.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Propriété intellectuelle</h2>
            <p className="text-gray-600 mb-4">
              L'ensemble des contenus présents sur le site DocExpress.fr (textes, images, graphismes, logo, icônes, etc.)
              est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="text-gray-600 mb-4">
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site,
              quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de DocExpress.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitation de responsabilité</h2>
            <p className="text-gray-600 mb-4">
              DocExpress ne pourra être tenu responsable des dommages directs et indirects causés au matériel de l'utilisateur,
              lors de l'accès au site DocExpress.fr.
            </p>
            <p className="text-gray-600 mb-4">
              DocExpress décline toute responsabilité quant à l'utilisation qui pourrait être faite des informations et contenus
              présents sur le site. Les documents générés sont des modèles types et ne constituent pas un conseil juridique personnalisé.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Données personnelles</h2>
            <p className="text-gray-600 mb-4">
              Pour plus d'informations sur le traitement de vos données personnelles, veuillez consulter notre{' '}
              <Link href="/confidentialite" className="text-orange-500 hover:underline">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Droit applicable</h2>
            <p className="text-gray-600 mb-4">
              Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact</h2>
            <p className="text-gray-600 mb-4">
              Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse :{' '}
              <a href="mailto:contact@docexpress.fr" className="text-orange-500 hover:underline">
                contact@docexpress.fr
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-orange-500 hover:underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © 2025 DocExpress.fr — Tous droits réservés
          </p>
        </div>
      </footer>
    </main>
  )
}
