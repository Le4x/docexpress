import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocExpress.fr - Générateur de documents administratifs français",
  description: "Générez vos documents administratifs en 2 minutes : lettres de démission, résiliations, attestations, préavis. Documents conformes à la législation française.",
  keywords: ["documents administratifs", "lettre de démission", "résiliation", "attestation", "préavis", "générateur PDF", "France"],
  authors: [{ name: "DocExpress.fr" }],
  openGraph: {
    title: "DocExpress.fr - Documents administratifs en 2 minutes",
    description: "Générez vos documents administratifs conformes à la législation française. Rapide, fiable et professionnel.",
    url: "https://docexpress.fr",
    siteName: "DocExpress.fr",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DocExpress.fr - Documents administratifs en 2 minutes",
    description: "Générez vos documents administratifs conformes à la législation française.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD pour l'organisation
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DocExpress.fr',
  url: 'https://docexpress.fr',
  logo: 'https://docexpress.fr/img/DOCEXPRESS-LOGO.png',
  description: 'Générateur de documents administratifs français en ligne',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@docexpress.fr',
    contactType: 'customer service',
    availableLanguage: 'French',
  },
  sameAs: [],
}

// JSON-LD pour le site web
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DocExpress.fr',
  url: 'https://docexpress.fr',
  description: 'Générez vos documents administratifs en 2 minutes',
  publisher: {
    '@type': 'Organization',
    name: 'DocExpress.fr',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://docexpress.fr/?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
