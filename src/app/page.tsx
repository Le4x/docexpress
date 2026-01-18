'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { documents, getAllCategories, getPopularDocuments, searchDocuments } from '@/data/documents'

export default function Home() {
  const router = useRouter()
  const categories = getAllCategories()
  const popularDocuments = getPopularDocuments()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof documents>([])
  const [showResults, setShowResults] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 1) {
      const results = searchDocuments(query)
      setSearchResults(results)
      setShowResults(true)
    } else {
      setShowResults(false)
    }
  }

  const faqs = [
    {
      question: "Est-ce légal ?",
      answer: "Oui, tous nos documents sont rédigés conformément à la législation française en vigueur. Ils sont juridiquement valables et acceptés par les employeurs, bailleurs, opérateurs et administrations."
    },
    {
      question: "Est-ce que c'est accepté partout ?",
      answer: "Nos modèles sont conformes aux normes françaises et sont acceptés par tous les organismes : employeurs, propriétaires, opérateurs télécom, assurances, administrations publiques, etc."
    },
    {
      question: "Puis-je modifier après génération ?",
      answer: "Le document PDF généré est prêt à l'emploi. Si vous avez fait une erreur, vous pouvez générer un nouveau document. Nous vous conseillons de bien vérifier vos informations avant de valider."
    },
    {
      question: "Mes données sont-elles conservées ?",
      answer: "Non, vos données personnelles sont utilisées uniquement pour générer votre document. Elles ne sont jamais stockées sur nos serveurs ni partagées avec des tiers. Votre vie privée est notre priorité."
    },
    {
      question: "Je ne reçois pas mon document, que faire ?",
      answer: "Le téléchargement est immédiat après le paiement. Si vous rencontrez un problème, vérifiez votre dossier de téléchargements. En cas de souci persistant, contactez-nous à contact@docexpress.fr avec votre numéro de commande."
    }
  ]

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
            <Link href="#documents" className="text-gray-600 hover:text-orange-500 transition-colors">
              Documents
            </Link>
            <Link href="#tarifs" className="text-gray-600 hover:text-orange-500 transition-colors">
              Tarifs
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-orange-500 transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section avec barre de recherche */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Vos documents administratifs <br />
            <span className="text-orange-400">en 2 minutes</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Lettres de démission, résiliations, préavis... Générez des documents professionnels et conformes à la législation française.
          </p>
          
          {/* Barre de recherche */}
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un document (ex: démission, résiliation, attestation...)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                className="w-full px-6 py-4 pl-14 text-gray-800 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-300 text-lg"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Résultats de recherche */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                {searchResults.slice(0, 5).map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/documents/${doc.slug}`}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    onClick={() => setShowResults(false)}
                  >
                    <span className="text-2xl">{doc.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-gray-800">{doc.title}</div>
                      <div className="text-sm text-gray-500">{doc.shortDescription}</div>
                    </div>
                    <span className="ml-auto text-orange-500 font-semibold">{doc.price.toFixed(2)}€</span>
                  </Link>
                ))}
              </div>
            )}
            
            {showResults && searchResults.length === 0 && searchQuery.length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-6 text-center text-gray-500">
                Aucun document trouvé pour "{searchQuery}"
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{documents.length}+</div>
              <div className="text-blue-200 text-sm">Documents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">2 min</div>
              <div className="text-blue-200 text-sm">Temps moyen</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">100%</div>
              <div className="text-blue-200 text-sm">Conformes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents populaires */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Les documents les plus demandés
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Nos modèles les plus utilisés par nos clients
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {popularDocuments.slice(0, 8).map((doc) => (
              <Link
                key={doc.slug}
                href={`/documents/${doc.slug}`}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all border border-gray-200 hover:border-orange-300 group"
              >
                <div className="text-4xl mb-3">{doc.icon}</div>
                <h3 className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors text-sm md:text-base mb-2">
                  {doc.title}
                </h3>
                <div className="text-xs text-gray-500">{doc.duration}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            Comment ça marche ?
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
            <div className="text-center flex-1">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">1) Vous remplissez</h3>
              <p className="text-sm text-gray-600">Champs guidés, exemples, erreurs évitées.</p>
            </div>
            
            <div className="hidden md:block text-4xl text-gray-300">→</div>
            
            <div className="text-center flex-1">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">2) On génère</h3>
              <p className="text-sm text-gray-600">Mise en page propre, texte conforme, mentions utiles.</p>
            </div>
            
            <div className="hidden md:block text-4xl text-gray-300">→</div>
            
            <div className="text-center flex-1">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">3) Vous téléchargez</h3>
              <p className="text-sm text-gray-600">PDF instantané. Option : Word/signature.</p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link 
              href="#documents"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg"
            >
              Je génère mon document
            </Link>
          </div>
        </div>
      </section>

      {/* Fini les modèles foireux */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Fini les modèles foireux copiés sur internet.
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Guidé</h3>
              </div>
              <p className="text-sm text-gray-600">On te pose les bonnes questions (pas 15 cases inutiles)</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Pro</h3>
              </div>
              <p className="text-sm text-gray-600">Mise en page claire, prête à imprimer / envoyer</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">Rapide</h3>
              </div>
              <p className="text-sm text-gray-600">Document en 2 minutes, sans prise de tête</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg text-gray-700 mb-4">
            <span className="font-semibold">Un service fiable et sécurisé,</span> utilisé par plus de <span className="font-bold text-orange-500">12,750 utilisateurs</span>
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex text-yellow-400 text-xl">★★★★★</div>
            <span className="text-gray-600 text-sm">4.8/5 - 1,357 avis vérifiés</span>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Nos tarifs
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Choisissez l'offre qui vous convient
          </p>
          
          <div className="grid md:grid-cols-4 gap-4">
            {/* Gratuit */}
            <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-gray-300 transition-colors">
              <div className="bg-gray-700 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mb-6">
                Gratuit
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">📄</div>
                <p className="text-sm text-gray-600">Aperçu PDF</p>
                <p className="text-xs text-gray-500">Vérification basique</p>
              </div>
              <Link 
                href="#documents"
                className="block w-full bg-gray-700 hover:bg-gray-800 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Choisir →
              </Link>
            </div>

            {/* À l'unité */}
            <div className="bg-white rounded-xl p-6 border-2 border-orange-300 hover:border-orange-400 transition-colors relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Populaire
              </div>
              <div className="bg-orange-500 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mb-6">
                À l'unité
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800">2,99<span className="text-lg">€</span></div>
                <p className="text-sm text-gray-600">Document PDF Final</p>
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Téléchargement
                </p>
              </div>
              <Link 
                href="#documents"
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Choisir →
              </Link>
            </div>

            {/* Pack économique */}
            <div className="bg-white rounded-xl p-6 border-2 border-green-300 hover:border-green-400 transition-colors">
              <div className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mb-6">
                Pack économique
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800">6,99<span className="text-lg">€</span></div>
                <p className="text-sm text-gray-600">3 documents, PDF</p>
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1 mt-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Immuables
                </p>
              </div>
              <button 
                className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-medium transition-colors opacity-50 cursor-not-allowed"
                disabled
                title="Bientôt disponible"
              >
                Bientôt →
              </button>
            </div>

            {/* Premium */}
            <div className="bg-white rounded-xl p-6 border-2 border-orange-200 hover:border-orange-300 transition-colors">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center mb-6">
                Premium
              </div>
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-800">4,99<span className="text-lg">€/mois</span></div>
                <p className="text-sm text-gray-600">Documents illimités</p>
                <p className="text-xs text-gray-500 mt-2">
                  <span className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Accès à tout
                  </span>
                  <span className="flex items-center justify-center gap-1">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Support prioritaire
                  </span>
                </p>
              </div>
              <button 
                className="block w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-center py-3 rounded-lg font-medium transition-colors opacity-50 cursor-not-allowed"
                disabled
                title="Bientôt disponible"
              >
                Bientôt →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tous les documents */}
      <section id="documents" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-4">
            Tous nos documents
          </h2>
          <p className="text-center text-gray-600 mb-10">
            {documents.length} modèles conformes à la législation française
          </p>
          
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-3">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                {category}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents
                  .filter(doc => doc.category === category)
                  .map((doc) => (
                    <Link
                      key={doc.slug}
                      href={`/documents/${doc.slug}`}
                      className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-orange-300 transition-all group flex items-start gap-4"
                    >
                      <span className="text-3xl">{doc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-800 group-hover:text-orange-500 transition-colors mb-1">
                          {doc.title}
                        </h4>
                        <p className="text-gray-500 text-sm truncate mb-2">
                          {doc.shortDescription}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{doc.duration}</span>
                          <span className="text-orange-500 font-semibold">{doc.price.toFixed(2)}€</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
            Questions fréquentes
          </h2>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Prêt à générer votre document ?
          </h2>
          <p className="text-orange-100 mb-8">
            Rejoignez des milliers d'utilisateurs satisfaits
          </p>
          <Link 
            href="#documents"
            className="inline-block bg-white text-orange-500 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Image
                  src="/img/logoDOCE.png"
                  alt="DocExpress.fr"
                  width={160}
                  height={40}
                  className="h-9 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Générateur de documents administratifs français. Rapide, fiable et conforme à la législation.
              </p>
              <p className="text-xs text-gray-500">
                © 2025 DocExpress.fr — Tous droits réservés
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Documents</h4>
              <ul className="space-y-2 text-sm">
                {documents.slice(0, 5).map((doc) => (
                  <li key={doc.slug}>
                    <Link href={`/documents/${doc.slug}`} className="hover:text-orange-400 transition-colors">
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Informations</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mentions-legales" className="hover:text-orange-400 transition-colors">Mentions légales</Link></li>
                <li><Link href="/cgv" className="hover:text-orange-400 transition-colors">CGV</Link></li>
                <li><Link href="/confidentialite" className="hover:text-orange-400 transition-colors">Confidentialité</Link></li>
                <li><a href="mailto:contact@docexpress.fr" className="hover:text-orange-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>🔒 Paiement sécurisé par</span>
              <span className="font-semibold text-white">Stripe</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Moyens de paiement :</span>
              <div className="flex gap-2">
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">VISA</span>
                <span className="bg-gray-800 px-2 py-1 rounded text-xs">Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}