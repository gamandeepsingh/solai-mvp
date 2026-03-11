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
  title: "SOLAI Wallet — AI-powered crypto wallet",
  description:
    "SOLAI turns simple commands into automated on-chain actions. Send payments, automate trades, and swap tokens at the best rate across DEXs.",
  keywords: ["crypto", "AI wallet", "Solana", "DeFi", "swap", "blockchain"],
  openGraph: {
    title: "SOLAI Wallet — AI-powered crypto wallet",
    description: "SOLAI turns simple commands into automated on-chain actions.",
    type: "website",
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
