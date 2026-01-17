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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
