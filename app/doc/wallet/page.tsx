import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import DocContent from "../DocContent";

export const metadata: Metadata = {
  title: "SOLAI Wallet Documentation — Features, architecture & security",
  description:
    "SOLAI Wallet documentation: agent wallets, ECDH stealth addresses, AI commands, dApp connectivity, architecture, security model, and installation for the Chrome extension.",
  keywords: [
    "SOLAI Wallet documentation",
    "crypto wallet tutorial",
    "AI commands",
    "Solana DeFi",
    "stealth addresses",
    "agent wallets",
    "Chrome extension wallet",
  ],
  openGraph: {
    title: "SOLAI Wallet Documentation",
    description:
      "Agent wallets, ECDH stealth addresses, AI commands, architecture, and the security model.",
    url: "https://solai.website/doc/wallet",
    type: "website",
  },
  alternates: {
    canonical: "https://solai.website/doc/wallet",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function WalletDocPage() {
  const content = readFileSync(
    path.join(process.cwd(), "app/doc/wallet-docs.md"),
    "utf-8"
  );

  return (
    <DocContent
      content={content}
      eyebrow="Wallet Docs"
      title="Wallet Documentation"
      subtitle="The shipped Chrome extension — features, agent wallets, stealth addresses, architecture, and the security model."
      backHref="/doc"
      backLabel="All docs"
      sibling={{
        href: "/doc/sdk",
        label: "SOLAI SDK documentation",
        description:
          "Build your own agents — guardrails, swaps, payments, and stealth addresses.",
      }}
    />
  );
}
