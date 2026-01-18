import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - DocExpress.fr',
  description: 'Conditions générales de vente du site DocExpress.fr, générateur de documents administratifs français.',
  robots: 'index, follow',
}

export default function CGV() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/img/DOCEXPRESS-LOGO.png"
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Conditions Générales de Vente</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6 italic">
            Dernière mise à jour : Janvier 2025
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 1 - Objet</h2>
            <p className="text-gray-600 mb-4">
              Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre DocExpress
              et tout utilisateur souhaitant utiliser les services de génération de documents administratifs proposés sur le site DocExpress.fr.
            </p>
            <p className="text-gray-600 mb-4">
              Toute commande implique l'acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 2 - Services proposés</h2>
            <p className="text-gray-600 mb-4">
              DocExpress propose un service de génération de documents administratifs en ligne. Les services comprennent :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>La génération de documents PDF personnalisés (lettres de démission, résiliations, attestations, etc.)</li>
              <li>L'assistance par chat IA pour remplir les formulaires</li>
              <li>Le téléchargement immédiat des documents après paiement</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 3 - Prix et paiement</h2>
            <p className="text-gray-600 mb-4">
              Les prix sont indiqués en euros TTC. DocExpress se réserve le droit de modifier ses prix à tout moment,
              étant entendu que le prix figurant sur le site le jour de la commande sera le seul applicable.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Tarifs en vigueur :</strong>
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Document à l'unité : 2,99 € TTC</li>
              <li>Pack 3 documents : 6,99 € TTC (bientôt disponible)</li>
              <li>Abonnement Premium : 4,99 €/mois (bientôt disponible)</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Le paiement s'effectue en ligne par carte bancaire via notre prestataire sécurisé Stripe.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 4 - Livraison</h2>
            <p className="text-gray-600 mb-4">
              Les documents sont délivrés par téléchargement immédiat après validation du paiement.
              Un lien de téléchargement est fourni sur la page de confirmation.
            </p>
            <p className="text-gray-600 mb-4">
              En cas de problème technique empêchant le téléchargement, l'utilisateur peut contacter le support
              à contact@docexpress.fr avec son numéro de commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 5 - Droit de rétractation</h2>
            <p className="text-gray-600 mb-4">
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé
              pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution
              a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
            </p>
            <p className="text-gray-600 mb-4">
              En validant le paiement, l'utilisateur accepte expressément que la fourniture du document commence immédiatement
              et renonce à son droit de rétractation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 6 - Responsabilité</h2>
            <p className="text-gray-600 mb-4">
              Les documents générés par DocExpress sont des modèles types conformes à la législation française en vigueur.
              Ils ne constituent pas un conseil juridique personnalisé.
            </p>
            <p className="text-gray-600 mb-4">
              L'utilisateur est seul responsable de la vérification et de l'exactitude des informations qu'il fournit
              pour la génération du document.
            </p>
            <p className="text-gray-600 mb-4">
              DocExpress ne saurait être tenu responsable des conséquences liées à l'utilisation des documents générés.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 7 - Propriété intellectuelle</h2>
            <p className="text-gray-600 mb-4">
              L'utilisateur acquiert un droit d'usage personnel et non exclusif sur le document généré.
              Ce droit est limité à l'utilisation pour laquelle le document a été conçu.
            </p>
            <p className="text-gray-600 mb-4">
              Toute revente, redistribution ou utilisation commerciale des modèles de documents est interdite.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 8 - Protection des données</h2>
            <p className="text-gray-600 mb-4">
              Les données personnelles collectées lors de l'utilisation du service sont traitées conformément
              au Règlement Général sur la Protection des Données (RGPD).
            </p>
            <p className="text-gray-600 mb-4">
              Pour plus d'informations, consultez notre{' '}
              <Link href="/confidentialite" className="text-orange-500 hover:underline">
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 9 - Service client</h2>
            <p className="text-gray-600 mb-4">
              Pour toute question ou réclamation, vous pouvez contacter notre service client :
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Par email : contact@docexpress.fr</li>
              <li>Délai de réponse : 48 heures ouvrées</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Article 10 - Droit applicable et litiges</h2>
            <p className="text-gray-600 mb-4">
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée
              avant toute action judiciaire.
            </p>
            <p className="text-gray-600 mb-4">
              Conformément aux articles L.616-1 et R.616-1 du Code de la consommation, le consommateur peut recourir
              gratuitement au service de médiation de la consommation.
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
