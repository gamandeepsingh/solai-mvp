import type { Metadata } from "next";
import { readFileSync } from "fs";
import path from "path";
import DocContent from "./DocContent";

export const metadata: Metadata = {
  title: "Documentation — SOLAI Wallet",
  description:
    "SOLAI Wallet documentation: features, AI commands, stealth addresses, agent wallets, security model, and architecture.",
  alternates: {
    canonical: "https://solai.gamandeep.xyz/doc",
  },
  robots: { index: true, follow: true },
};

export default function DocPage() {
  const content = readFileSync(
    path.join(process.cwd(), "app/doc/solai-docs.md"),
    "utf-8"
  );
  return <DocContent content={content} />;
}
