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
  title:
    "SOLAI SDK — Non-custodial DeFi agents on Solana | Guardrails & stealth payments",
  description:
    "SOLAI is a non-custodial DeFi SDK on Solana for building AI agents that handle swaps and payments on your users' behalf. Agents run inside guardrails users set — spending limits, token and protocol allowlists — with Umbra-based stealth addresses for private payments.",
  keywords: [
    "Solana DeFi SDK",
    "AI agents Solana",
    "agent guardrails",
    "spending limits",
    "token allowlist",
    "protocol allowlist",
    "stealth addresses",
    "Umbra stealth addresses",
    "non-custodial SDK",
    "x402 micropayments",
    "autonomous DeFi",
    "AI crypto wallet",
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
    title: "SOLAI SDK — Non-custodial DeFi agents on Solana",
    description:
      "Ship AI agents that swap and pay on your users' behalf — inside spending limits, token allowlists, and protocol allowlists they set themselves.",
    url: "https://solai.website",
    siteName: "SOLAI",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "SOLAI SDK — Non-custodial DeFi agents on Solana",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLAI SDK — Non-custodial DeFi agents on Solana",
    description:
      "Ship AI agents that swap and pay on your users' behalf — bounded by guardrails they set.",
    images: ["/preview.png"],
    creator: "@solaiwallet",
    site: "@solaiwallet",
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
      description:
        "Non-custodial DeFi SDK and AI-powered wallet for Solana",
      sameAs: ["https://x.com/solaiwallet"],
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
      name: "SOLAI",
      description:
        "Non-custodial DeFi SDK on Solana for building AI agents bounded by user-set guardrails.",
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
      "@id": "https://solai.website/#sdk",
      name: "SOLAI SDK",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web, Node.js",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "A non-custodial DeFi SDK on Solana for creating AI agents that handle swaps and payments on a user's behalf, bounded by user-set guardrails — spending limits, token and protocol allowlists — with Umbra-based stealth addresses for private payments.",
      url: "https://solai.website/sdk",
      screenshot: ["https://solai.website/preview.png"],
      keywords:
        "Solana DeFi SDK, AI agents, agent guardrails, spending limits, token allowlist, stealth addresses, Umbra, non-custodial",
      author: {
        "@type": "Organization",
        name: "SOLAI",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://solai.website/#wallet",
      name: "SOLAI Wallet",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Chrome",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "The reference wallet built on the SOLAI SDK. Send payments, automate trades, and swap tokens at the best rate across DEXs using plain English commands.",
      url: "https://solai.website/#wallet",
      downloadUrl:
        "https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej",
      screenshot: ["https://solai.website/preview.png"],
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
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg)] text-[var(--ink)]`}
      >
        {children}
      </body>
    </html>
  );
}
