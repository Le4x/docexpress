import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - DocExpress.fr',
  description: 'Politique de confidentialité et protection des données personnelles du site DocExpress.fr.',
  robots: 'index, follow',
}

export default function Confidentialite() {
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Politique de confidentialité</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6 italic">
            Dernière mise à jour : Janvier 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Chez DocExpress, nous accordons une importance primordiale à la protection de vos données personnelles.
              Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations
              conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Responsable du traitement</h2>
            <p className="text-gray-600 mb-4">
              Le responsable du traitement des données est :<br />
              <strong>DocExpress SAS</strong><br />
              Email : contact@docexpress.fr
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Données collectées</h2>
            <p className="text-gray-600 mb-4">
              Nous collectons uniquement les données strictement nécessaires à la fourniture de nos services :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Données d'identification :</strong> nom, prénom, adresse email</li>
              <li><strong>Données pour les documents :</strong> informations que vous saisissez dans les formulaires (adresse, employeur, etc.)</li>
              <li><strong>Données de paiement :</strong> traitées directement par Stripe, nous ne stockons pas vos données bancaires</li>
              <li><strong>Données de navigation :</strong> adresse IP, type de navigateur (à des fins de sécurité et statistiques)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Finalités du traitement</h2>
            <p className="text-gray-600 mb-4">
              Vos données sont utilisées pour :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Générer les documents que vous commandez</li>
              <li>Traiter vos paiements</li>
              <li>Vous envoyer votre document par email (si cette option est activée)</li>
              <li>Répondre à vos demandes de support</li>
              <li>Améliorer nos services et notre site web</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Base légale du traitement</h2>
            <p className="text-gray-600 mb-4">
              Le traitement de vos données repose sur :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>L'exécution du contrat :</strong> pour la génération et la livraison de vos documents</li>
              <li><strong>L'intérêt légitime :</strong> pour l'amélioration de nos services et la sécurité du site</li>
              <li><strong>Le consentement :</strong> pour l'envoi de communications marketing (le cas échéant)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Conservation des données</h2>
            <p className="text-gray-600 mb-4">
              <strong>Données des formulaires :</strong> Les informations saisies pour générer un document ne sont PAS stockées sur nos serveurs.
              Elles sont utilisées uniquement pendant la session de génération puis supprimées.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Données de transaction :</strong> Conservées pendant la durée légale requise (10 ans pour les obligations comptables).
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Données de contact :</strong> Conservées pendant 3 ans après le dernier contact.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Partage des données</h2>
            <p className="text-gray-600 mb-4">
              Vos données peuvent être partagées avec :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Stripe :</strong> pour le traitement sécurisé des paiements</li>
              <li><strong>Vercel :</strong> pour l'hébergement du site</li>
              <li><strong>OpenAI :</strong> pour l'assistant IA (données anonymisées)</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Sécurité des données</h2>
            <p className="text-gray-600 mb-4">
              Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Chiffrement SSL/TLS pour toutes les communications</li>
              <li>Paiements sécurisés via Stripe (certifié PCI-DSS)</li>
              <li>Aucun stockage de données sensibles sur nos serveurs</li>
              <li>Accès restreint aux données</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Vos droits</h2>
            <p className="text-gray-600 mb-4">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@docexpress.fr" className="text-orange-500 hover:underline">contact@docexpress.fr</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Cookies</h2>
            <p className="text-gray-600 mb-4">
              Notre site utilise des cookies essentiels au fonctionnement du service. Nous n'utilisons pas de cookies publicitaires ou de tracking tiers.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Cookies essentiels :</strong> session, préférences utilisateur</li>
              <li><strong>Cookies analytiques :</strong> statistiques anonymes de fréquentation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Réclamation</h2>
            <p className="text-gray-600 mb-4">
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :
            </p>
            <p className="text-gray-600 mb-4">
              Commission Nationale de l'Informatique et des Libertés<br />
              3 Place de Fontenoy, TSA 80715<br />
              75334 PARIS CEDEX 07<br />
              Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">www.cnil.fr</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">12. Modifications</h2>
            <p className="text-gray-600 mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
              Les modifications entreront en vigueur dès leur publication sur cette page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">13. Contact</h2>
            <p className="text-gray-600 mb-4">
              Pour toute question concernant cette politique de confidentialité :<br />
              Email : <a href="mailto:contact@docexpress.fr" className="text-orange-500 hover:underline">contact@docexpress.fr</a>
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
