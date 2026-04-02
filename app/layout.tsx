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
  metadataBase: new URL("https://solai.gamandeep.xyz"),
  title: "SOLAI Wallet — AI-powered crypto wallet",
  description:
    "SOLAI turns simple commands into automated on-chain actions. Send payments, automate trades, and swap tokens at the best rate across DEXs.",
  keywords: ["crypto", "AI wallet", "Solana", "DeFi", "swap", "blockchain", "SOLAI"],
  authors: [{ name: "SOLAI" }],
  creator: "SOLAI",
  openGraph: {
    title: "SOLAI Wallet — AI-powered crypto wallet",
    description:
      "SOLAI turns simple commands into automated on-chain actions. Send payments, automate trades, and swap tokens at the best rate across DEXs.",
    url: "https://solai.gamandeep.xyz",
    siteName: "SOLAI Wallet",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "SOLAI Wallet — AI-powered crypto wallet",
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://solai.gamandeep.xyz",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://solai.gamandeep.xyz/#website",
      url: "https://solai.gamandeep.xyz",
      name: "SOLAI Wallet",
      description:
        "AI-powered crypto wallet that turns simple commands into automated on-chain actions on Solana.",
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://solai.gamandeep.xyz/#app",
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
      url: "https://solai.gamandeep.xyz",
      downloadUrl:
        "https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej",
      screenshot: "https://solai.gamandeep.xyz/preview.png",
      keywords:
        "AI crypto wallet, Solana wallet, DeFi automation, AI trading, token swap, blockchain wallet",
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
        <meta name="google-site-verification" content="cV5sclQT7dQSp2BzYYhkf2RNNvSyI77-5odn47QFinU" />
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
