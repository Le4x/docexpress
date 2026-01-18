import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocumentBySlug, documents } from '@/data/documents'
import DocumentPageClient from './DocumentPageClient'

interface Props {
  params: Promise<{ slug: string }>
}

// Générer les pages statiques pour tous les documents
export async function generateStaticParams() {
  return documents.map((doc) => ({
    slug: doc.slug,
  }))
}

// Métadonnées SEO dynamiques
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const document = getDocumentBySlug(slug)

  if (!document) {
    return {
      title: 'Document non trouvé - DocExpress.fr',
    }
  }

  const title = `${document.title} - Modèle PDF gratuit | DocExpress.fr`
  const description = `${document.description} Générez votre ${document.title.toLowerCase()} en ligne en 2 minutes. Document PDF conforme à la législation française.`

  return {
    title,
    description,
    keywords: [...document.seoKeywords, 'document administratif', 'PDF', 'modèle gratuit', 'France'],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'DocExpress.fr',
      url: `https://docexpress.fr/documents/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://docexpress.fr/documents/${slug}`,
    },
  }
}

export default async function DocumentPage({ params }: Props) {
  const { slug } = await params
  const document = getDocumentBySlug(slug)

  if (!document) {
    notFound()
  }

  // JSON-LD Schema.org pour le SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: document.title,
    description: document.description,
    image: 'https://docexpress.fr/img/logoDOCE.png',
    brand: {
      '@type': 'Brand',
      name: 'DocExpress.fr',
    },
    offers: {
      '@type': 'Offer',
      price: document.price.toFixed(2),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'DocExpress.fr',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1357',
    },
  }

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: 'https://docexpress.fr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: document.category,
        item: `https://docexpress.fr/#documents`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: document.title,
        item: `https://docexpress.fr/documents/${slug}`,
      },
    ],
  }

  // JSON-LD FAQPage pour les questions fréquentes
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Comment générer une ${document.title.toLowerCase()} ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Pour générer votre ${document.title.toLowerCase()}, remplissez simplement le formulaire avec vos informations personnelles. Le document PDF sera généré automatiquement et disponible au téléchargement après paiement.`,
        },
      },
      {
        '@type': 'Question',
        name: `Cette ${document.title.toLowerCase()} est-elle valide juridiquement ?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Oui, tous nos modèles sont rédigés conformément à la législation française en vigueur et sont acceptés par les employeurs, bailleurs, opérateurs et administrations.`,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <DocumentPageClient document={document} slug={slug} />
    </>
  )
}
