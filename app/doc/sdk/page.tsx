import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import DocContent from "../DocContent";

export const metadata: Metadata = {
  title: "SOLAI SDK Documentation — Agents, guardrails & stealth payments",
  description:
    "SOLAI SDK documentation: creating agents, the guardrail policy surface (spending limits, token and protocol allowlists), swaps, payments, Umbra stealth addresses, x402 micropayments, and the security model.",
  keywords: [
    "SOLAI SDK documentation",
    "Solana DeFi SDK",
    "agent guardrails",
    "policy reference",
    "stealth addresses",
    "Umbra",
    "x402 micropayments",
    "non-custodial SDK",
  ],
  openGraph: {
    title: "SOLAI SDK Documentation",
    description:
      "Creating agents, the guardrail policy surface, swaps, payments, Umbra stealth addresses, and the security model.",
    url: "https://solai.website/doc/sdk",
    type: "website",
  },
  alternates: {
    canonical: "https://solai.website/doc/sdk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function SdkDocPage() {
  const content = readFileSync(
    path.join(process.cwd(), "app/doc/sdk-docs.md"),
    "utf-8"
  );

  return (
    <DocContent
      content={content}
      eyebrow="SDK Docs"
      title="SDK Documentation"
      subtitle="Creating agents, the guardrail policy surface, swaps and payments, Umbra stealth addresses, and the security model."
      backHref="/doc"
      backLabel="All docs"
      sibling={{
        href: "/doc/wallet",
        label: "SOLAI Wallet documentation",
        description:
          "The shipped Chrome extension — features, architecture, and security model.",
      }}
    />
  );
}
