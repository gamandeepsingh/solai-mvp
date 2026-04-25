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
  metadataBase: new URL("https://solai.website"),
  title: "SOLAI Wallet — AI-powered crypto wallet | Automate DeFi with Commands",
  description:
    "SOLAI is an AI-powered Solana wallet that turns natural language commands into automated on-chain actions. Send payments, automate trades, swap tokens across DEXs, and manage DeFi with simple English commands. No technical knowledge required.",
  keywords: [
    "AI crypto wallet",
    "Solana wallet",
    "DeFi automation",
    "AI trading",
    "token swap",
    "blockchain wallet",
    "crypto automation",
    "AI wallet Solana",
    "natural language blockchain",
    "DEX swap",
    "Solana DeFi",
    "automated trading",
  ],
  authors: [{ name: "SOLAI" }],
  creator: "SOLAI",
  publisher: "SOLAI",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: "SOLAI Wallet — AI-powered crypto wallet",
    description:
      "SOLAI turns simple commands into automated on-chain actions. Send payments, automate trades, and swap tokens at the best rate across DEXs.",
    url: "https://solai.website",
    siteName: "SOLAI Wallet",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "SOLAI Wallet — AI-powered crypto wallet",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLAI Wallet — AI-powered crypto wallet",
    description:
      "SOLAI turns simple commands into automated on-chain actions. Send payments, automate trades, and swap tokens at the best rate across DEXs.",
    images: ["/preview.png"],
    creator: "@solai_wallet",
    site: "@solai_wallet",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://solai.website",
  },
  verification: {
    google: "cV5sclQT7dQSp2BzYYhkf2RNNvSyI77-5odn47QFinU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://solai.website/#organization",
      name: "SOLAI",
      url: "https://solai.website",
      logo: "https://solai.website/logo.png",
      description: "AI-powered Solana crypto wallet and DeFi automation platform",
      sameAs: ["https://twitter.com/solai_wallet"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        url: "https://solai.website",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://solai.website/#website",
      url: "https://solai.website",
      name: "SOLAI Wallet",
      description:
        "AI-powered crypto wallet that turns simple commands into automated on-chain actions on Solana.",
      inLanguage: "en-US",
      isPartOf: { "@id": "https://solai.website/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://solai.website/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://solai.website/#app",
      name: "SOLAI Wallet",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Chrome",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "SOLAI is an AI-powered Solana crypto wallet. Send payments, automate trades, and swap tokens at the best rate across DEXs using plain English commands.",
      url: "https://solai.website",
      downloadUrl:
        "https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej",
      screenshot: ["https://solai.website/preview.png"],
      keywords:
        "AI crypto wallet, Solana wallet, DeFi automation, AI trading, token swap, blockchain wallet",
      author: {
        "@type": "Organization",
        name: "SOLAI",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-site-verification" content="cV5sclQT7dQSp2BzYYhkf2RNNvSyI77-5odn47QFinU" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
