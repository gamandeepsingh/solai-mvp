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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
