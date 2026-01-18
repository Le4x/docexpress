'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { documents, getAllCategories, getPopularDocuments, searchDocuments } from '@/data/documents'

export default function Home() {
  const categories = getAllCategories()
  const popularDocuments = getPopularDocuments()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof documents>([])
  const [showResults, setShowResults] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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
      question: "Est-ce que ces documents sont légaux et valides ?",
      answer: "Oui, tous nos documents sont rédigés par des experts juridiques et sont conformes à la législation française en vigueur. Ils sont acceptés par les employeurs, bailleurs, opérateurs télécom et toutes les administrations."
    },
    {
      question: "Combien de temps faut-il pour générer un document ?",
      answer: "Moins de 2 minutes ! Remplissez le formulaire guidé ou utilisez notre assistant IA, et votre document PDF est prêt instantanément."
    },
    {
      question: "Mes données personnelles sont-elles protégées ?",
      answer: "Absolument. Vos données sont utilisées uniquement pour générer votre document et ne sont jamais stockées sur nos serveurs. Nous respectons le RGPD et votre vie privée."
    },
    {
      question: "Puis-je obtenir un remboursement ?",
      answer: "Le téléchargement étant immédiat après paiement, nous ne proposons pas de remboursement. Cependant, notre support est disponible pour résoudre tout problème technique."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les cartes Visa, Mastercard et American Express via notre partenaire sécurisé Stripe. Vos données bancaires ne transitent jamais par nos serveurs."
    }
  ]

  const filteredDocuments = activeCategory
    ? documents.filter(doc => doc.category === activeCategory)
    : documents

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Pro */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/img/DOCEXPRESS-LOGO.png"
                alt="DocExpress.fr - Générateur de documents administratifs"
                width={220}
                height={55}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="#fonctionnement" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Comment ça marche
              </Link>
              <Link href="#documents" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Documents
              </Link>
              <Link href="#tarifs" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                Tarifs
              </Link>
              <Link href="#faq" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                FAQ
              </Link>
              <Link
                href="#documents"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Créer un document
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-2 shadow-lg">
            <Link href="#fonctionnement" className="block py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Comment ça marche
            </Link>
            <Link href="#documents" className="block py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Documents
            </Link>
            <Link href="#tarifs" className="block py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              Tarifs
            </Link>
            <Link href="#faq" className="block py-3 px-4 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            <Link
              href="#documents"
              className="block py-3 px-4 bg-blue-600 text-white text-center rounded-lg font-semibold mt-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Créer un document
            </Link>
          </nav>
        )}
      </header>

      {/* Hero Section Pro */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-blue-100 text-sm font-medium">+12 750 documents générés ce mois</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Vos documents<br />
                administratifs<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">en 2 minutes</span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 max-w-xl">
                Lettres de démission, résiliations, attestations... Générez des documents <strong className="text-white">conformes à la loi française</strong>, prêts à envoyer.
              </p>

              {/* Search Bar Pro */}
              <div className="relative max-w-xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher un document..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => searchQuery.length > 1 && setShowResults(true)}
                    className="w-full px-6 py-4 pl-14 text-slate-800 bg-white rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/30 text-lg placeholder:text-slate-400"
                  />
                  <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Search Results */}
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
                    {searchResults.slice(0, 6).map((doc) => (
                      <Link
                        key={doc.slug}
                        href={`/documents/${doc.slug}`}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                        onClick={() => setShowResults(false)}
                      >
                        <span className="text-3xl">{doc.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-slate-800">{doc.title}</div>
                          <div className="text-sm text-slate-500 truncate">{doc.shortDescription}</div>
                        </div>
                        <span className="text-blue-600 font-bold">{doc.price.toFixed(2)}€</span>
                      </Link>
                    ))}
                  </div>
                )}

                {showResults && searchResults.length === 0 && searchQuery.length > 1 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 text-center text-slate-500">
                    Aucun document trouvé pour "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-slate-400 text-sm py-2">Populaires :</span>
                {popularDocuments.slice(0, 4).map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/documents/${doc.slug}`}
                    className="text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors border border-white/20"
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-4xl font-bold text-white mb-2">{documents.length}+</div>
                <div className="text-slate-300">Documents disponibles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-4xl font-bold text-white mb-2">2 min</div>
                <div className="text-slate-300">Temps de génération</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-slate-300">Conformes à la loi</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl p-6">
                <div className="flex items-center gap-1 text-white mb-2">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-2xl">★</span>)}
                </div>
                <div className="text-white font-medium">4.8/5 sur 1357 avis</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-slate-50 py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Paiement sécurisé Stripe</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Conforme RGPD</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-medium">4.8/5 avis clients</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Téléchargement instantané</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="fonctionnement" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Simple et rapide</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Générez votre document en 3 étapes simples, sans inscription.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="relative text-center group">
              <div className="absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden md:block"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Choisissez votre document</h3>
              <p className="text-slate-600">Parcourez notre catalogue de {documents.length}+ modèles ou utilisez la recherche.</p>
            </div>

            <div className="relative text-center group">
              <div className="relative w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Remplissez le formulaire</h3>
              <p className="text-slate-600">Formulaire guidé avec exemples ou assistant IA pour vous aider.</p>
            </div>

            <div className="relative text-center group">
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30 group-hover:scale-110 transition-transform">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Téléchargez votre PDF</h3>
              <p className="text-slate-600">Document professionnel prêt à imprimer ou envoyer par email.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="#documents"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Commencer maintenant
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Documents */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Les plus demandés</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Documents populaires
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {popularDocuments.slice(0, 8).map((doc) => (
              <Link
                key={doc.slug}
                href={`/documents/${doc.slug}`}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all border border-slate-200 hover:border-blue-300 group hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{doc.icon}</div>
                <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                  {doc.title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-slate-400">{doc.duration}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-blue-600 font-bold">{doc.price.toFixed(2)}€</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Documents with Filters */}
      <section id="documents" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Catalogue complet</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Tous nos documents
            </h2>
            <p className="text-xl text-slate-600">
              {documents.length} modèles conformes à la législation française
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                activeCategory === null
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tous ({documents.length})
            </button>
            {categories.map((category) => {
              const count = documents.filter(d => d.category === category).length
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category} ({count})
                </button>
              )
            })}
          </div>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {filteredDocuments.map((doc) => (
              <Link
                key={doc.slug}
                href={`/documents/${doc.slug}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all group hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl group-hover:scale-110 transition-transform">{doc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                      <span className="text-blue-600 font-bold whitespace-nowrap">{doc.price.toFixed(2)}€</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">
                      {doc.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {doc.duration}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full">{doc.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-white/10 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Tarifs transparents</span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Un prix simple, sans surprise
            </h2>
            <p className="text-xl text-slate-300">
              Payez uniquement ce que vous utilisez, sans abonnement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="text-slate-300 font-medium mb-2">Aperçu</div>
              <div className="text-4xl font-bold mb-4">Gratuit</div>
              <p className="text-slate-400 mb-6">Visualisez votre document avant achat</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Formulaire guidé
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Assistant IA
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Téléchargement PDF
                </li>
              </ul>
              <Link href="#documents" className="block w-full py-3 text-center border border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-colors">
                Essayer
              </Link>
            </div>

            {/* Standard */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl p-8 relative transform md:scale-105 shadow-2xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-orange-600 text-sm font-bold px-4 py-1 rounded-full">
                Le plus populaire
              </div>
              <div className="text-white/80 font-medium mb-2">À l'unité</div>
              <div className="text-4xl font-bold mb-1">2,99€</div>
              <div className="text-white/70 text-sm mb-4">par document</div>
              <p className="text-white/90 mb-6">Document PDF complet et conforme</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  PDF professionnel
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Conforme à la loi
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Téléchargement immédiat
                </li>
                <li className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Support email
                </li>
              </ul>
              <Link href="#documents" className="block w-full py-3 text-center bg-white text-orange-600 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                Créer mon document
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              <div className="text-slate-300 font-medium mb-2">Pack Pro</div>
              <div className="text-4xl font-bold mb-1">6,99€</div>
              <div className="text-slate-400 text-sm mb-4">3 documents</div>
              <p className="text-slate-400 mb-6">Économisez sur vos démarches</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  3 documents au choix
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Économie de 22%
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Validité 1 an
                </li>
              </ul>
              <button disabled className="block w-full py-3 text-center border border-white/30 rounded-xl font-semibold opacity-50 cursor-not-allowed">
                Bientôt disponible
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">FAQ</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-800 pr-4">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Prêt à créer votre document ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez plus de 12 000 utilisateurs satisfaits
          </p>
          <Link
            href="#documents"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-xl"
          >
            Commencer maintenant
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer Pro */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Image
                src="/img/DOCEXPRESS-LOGO.png"
                alt="DocExpress.fr"
                width={180}
                height={45}
                className="h-12 w-auto mb-4"
              />
              <p className="text-slate-500 text-sm mb-4">
                Générateur de documents administratifs français. Rapide, fiable et conforme à la législation.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
                </div>
                <span className="text-sm">4.8/5</span>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h4 className="font-semibold text-white mb-4">Documents populaires</h4>
              <ul className="space-y-2 text-sm">
                {popularDocuments.slice(0, 5).map((doc) => (
                  <li key={doc.slug}>
                    <Link href={`/documents/${doc.slug}`} className="hover:text-white transition-colors">
                      {doc.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-semibold text-white mb-4">Catégories</h4>
              <ul className="space-y-2 text-sm">
                {categories.map((category) => (
                  <li key={category}>
                    <Link href="#documents" className="hover:text-white transition-colors">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4">Informations</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
                <li><Link href="/cgv" className="hover:text-white transition-colors">Conditions générales</Link></li>
                <li><Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
                <li><a href="mailto:contact@docexpress.fr" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              © 2025 DocExpress.fr — Tous droits réservés
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Paiement sécurisé
              </div>
              <div className="flex gap-2">
                <span className="bg-slate-800 px-3 py-1 rounded text-xs font-medium">VISA</span>
                <span className="bg-slate-800 px-3 py-1 rounded text-xs font-medium">Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
