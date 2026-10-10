import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import AppProviders from "./components/AppProviders";
import Footer from "./components/Footer";

import { siteConfig } from "./siteConfig";
const siteUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Ömer Öztürk'ün yazılım mühendisliği, web ve mobil geliştirme projeleri, deneyimleri ve teknik yazıları.",
  applicationName: "Ömer Öztürk Portfolio",
  authors: [{ name: "Ömer Öztürk", url: siteUrl }],
  creator: "Ömer Öztürk",
  keywords: [
    "Ömer Öztürk",
    "yazılım mühendisi",
    "web geliştirici",
    "mobil uygulama geliştirici",
    "portfolio",
    "projeler",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Ömer Öztürk",
    title: "Ömer Öztürk | Yazılım Mühendisi",
    description:
      "Yazılım projeleri, deneyimler, yetkinlikler ve teknik yazılar.",
    images: [{ url: "/ozturkomer.webp", alt: "Ömer Öztürk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ömer Öztürk | Yazılım Mühendisi",
    description:
      "Yazılım projeleri, deneyimler, yetkinlikler ve teknik yazılar.",
    images: ["/ozturkomer.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
  },
  verification: {
    google: "lkmYNOjBeWUoeKPA601lyVpARgj2vCbJPq55a8hvL0k",
  },
};

const themeInitialization = `
  try {
    var savedTheme = localStorage.getItem('portfolio-theme');
    var preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.dataset.theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : preferredTheme;
  } catch (_) {
    document.documentElement.dataset.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Ömer Öztürk",
      url: siteUrl,
      image: `${siteUrl}/ozturkomer.webp`,
      jobTitle: "Yazılım Mühendisi",
    },
    {
      "@type": "WebSite",
      name: "Ömer Öztürk",
      url: siteUrl,
      inLanguage: "tr-TR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitialization }} />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E17H5FDP93"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-E17H5FDP93');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div id="top" />
        <AppProviders publicFooter={<Footer />}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
