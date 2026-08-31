import type { Metadata } from "next";
import DocsHub from "./DocsHub";

export const metadata: Metadata = {
  title: "SOLAI Documentation — SDK and Wallet guides",
  description:
    "SOLAI documentation. The SDK guide covers agents, guardrail policies, swaps, payments, and stealth addresses. The Wallet guide covers the shipped Chrome extension — features, architecture, and security model.",
  keywords: [
    "SOLAI documentation",
    "SOLAI SDK docs",
    "SOLAI Wallet docs",
    "Solana DeFi SDK",
    "agent guardrails",
    "stealth addresses",
  ],
  openGraph: {
    title: "SOLAI Documentation",
    description:
      "Two sets of docs — one for the SDK you build on, one for the wallet we built with it.",
    url: "https://solai.website/doc",
    type: "website",
  },
  alternates: {
    canonical: "https://solai.website/doc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function DocPage() {
  return <DocsHub />;
}
