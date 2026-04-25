import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import DocContent from "./DocContent";

export const metadata: Metadata = {
  title: "SOLAI Wallet Documentation — Complete Guide to AI Crypto Commands",
  description:
    "Complete SOLAI Wallet documentation: features, AI commands, stealth addresses, agent wallets, security model, architecture, and tutorials for automating DeFi.",
  keywords: [
    "SOLAI documentation",
    "crypto wallet tutorial",
    "AI commands",
    "Solana DeFi",
    "stealth addresses",
    "automated trading guide",
  ],
  openGraph: {
    title: "SOLAI Wallet Documentation",
    description:
      "SOLAI Wallet documentation: features, AI commands, stealth addresses, agent wallets, security model, and architecture.",
    url: "https://solai.website/doc",
    type: "website",
  },
  alternates: {
    canonical: "https://solai.website/doc",
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

export default function DocPage() {
  const content = readFileSync(
    path.join(process.cwd(), "app/doc/solai-docs.md"),
    "utf-8"
  );
  return <DocContent content={content} />;
}
