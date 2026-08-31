import type { Metadata } from "next";
import SdkContent from "../components/SdkContent";

export const metadata: Metadata = {
  title: "SOLAI SDK — Non-custodial DeFi agents on Solana",
  description:
    "A non-custodial DeFi SDK on Solana. Create AI agents that handle swaps and payments on your users' behalf, bounded by guardrails they set — spending limits, token and protocol allowlists — with Umbra-based stealth addresses for private payments.",
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
    "Solana agent wallet",
  ],
  openGraph: {
    title: "SOLAI SDK — Non-custodial DeFi agents on Solana",
    description:
      "Ship AI agents that swap and pay on your users' behalf — inside spending limits, token allowlists, and protocol allowlists they set themselves.",
    url: "https://solai.website/sdk",
    type: "website",
    images: [
      {
        url: "https://solai.website/preview.png",
        width: 1200,
        height: 630,
        alt: "SOLAI SDK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLAI SDK — Non-custodial DeFi agents on Solana",
    description:
      "Ship AI agents that swap and pay on your users' behalf, bounded by guardrails they set.",
    images: ["https://solai.website/preview.png"],
  },
  alternates: {
    canonical: "https://solai.website/sdk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function SdkPage() {
  return <SdkContent />;
}
