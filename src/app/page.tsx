import Link from 'next/link'
import { documents, getAllCategories } from '@/data/documents'

export default function Home() {
  const categories = getAllCategories()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-900">Doc</span>
            <span className="text-2xl font-bold text-orange-500">Express</span>
            <span className="text-2xl font-bold text-green-600">.fr</span>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
              Accueil
            </Link>
            <Link href="#documents" className="text-gray-600 hover:text-orange-500 transition-colors">
              Documents
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Vos documents administratifs <span className="text-orange-400">en 2 minutes</span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Lettres de démission, résiliations, préavis... Générez des documents professionnels et conformes à la législation française.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#documents"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Voir les documents
            </Link>
            <div className="flex items-center justify-center gap-2 text-blue-100">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Conforme ou remboursé</span>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Rapide</h3>
              <p className="text-gray-600">Document prêt en 2 minutes chrono</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Conforme</h3>
              <p className="text-gray-600">Documents validés par des experts juridiques</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Assistant IA</h3>
              <p className="text-gray-600">Un chatbot vous guide étape par étape</p>
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section id="documents" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Nos documents
          </h2>
          
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                {category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents
                  .filter(doc => doc.category === category)
                  .map((doc) => (
                    <Link
                      key={doc.slug}
                      href={`/documents/${doc.slug}`}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-orange-300 transition-all group"
                    >
                      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-orange-500 transition-colors mb-2">
                        {doc.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4">
                        {doc.shortDescription}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-orange-500">
                          {doc.price.toFixed(2)}€
                        </span>
                        <span className="text-sm text-gray-500 group-hover:text-orange-500 transition-colors">
                          Générer →
                        </span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-1 mb-4">
                <span className="text-xl font-bold text-white">Doc</span>
                <span className="text-xl font-bold text-orange-500">Express</span>
                <span className="text-xl font-bold text-green-500">.fr</span>
              </div>
              <p className="text-sm">
                Documents administratifs français, rapides et conformes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#documents" className="hover:text-orange-400">Nos documents</Link></li>
                <li><Link href="/mentions-legales" className="hover:text-orange-400">Mentions légales</Link></li>
                <li><Link href="/cgv" className="hover:text-orange-400">CGV</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <p className="text-sm">contact@docexpress.fr</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            © 2025 DocExpress.fr — Tous droits réservés
          </div>
        </div>
      </footer>
    </main>
  )
}