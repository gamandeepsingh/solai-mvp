import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — SOLAI Wallet | Non-Custodial Crypto Wallet",
  description:
    "Read the SOLAI Wallet privacy policy. We are a non-custodial crypto wallet — your private keys and funds are always yours. Learn how we protect your data.",
  openGraph: {
    title: "Privacy Policy — SOLAI Wallet",
    description:
      "Read the SOLAI Wallet privacy policy. We are a non-custodial crypto wallet — your private keys and funds are always yours.",
    url: "https://solai.website/privacy",
    type: "website",
  },
  alternates: {
    canonical: "https://solai.website/privacy",
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

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3">
          <p className="text-xs tracking-[0.2em] uppercase text-white/40">Privacy Policy</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Privacy Policy — SOLAI Wallet</h1>
          <p className="text-sm text-white/50">Last Updated: 20 Mar 2026</p>
        </header>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">1. Introduction</h2>
          <p>
            SOLAI Wallet (“we”, “our”, “us”) is a non-custodial crypto wallet designed to help users
            interact with blockchain networks using a simple interface.
          </p>
          <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">2. Information We Collect</h2>
          <div className="space-y-2">
            <p className="text-white/80">a. Information You Provide</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Wallet name or profile details (optional)</li>
              <li>Contacts (names mapped to wallet addresses)</li>
              <li>AI prompts entered by you</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="text-white/80">b. Automatically Collected Information</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Basic usage data (app interactions, errors)</li>
              <li>Device/browser type (for performance and debugging)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">3. What We Do NOT Collect</h2>
          <p>We do not collect or store:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Private keys or seed phrases</li>
            <li>Your wallet funds</li>
            <li>Your OpenAI API key (if used locally)</li>
            <li>Sensitive financial data</li>
          </ul>
          <p>All wallet credentials are stored locally on your device.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">4. How We Use Your Data</h2>
          <p>We use data to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide core wallet functionality</li>
            <li>Improve user experience</li>
            <li>Process AI commands (if enabled)</li>
            <li>Fix bugs and improve performance</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">5. AI and Third-Party Services</h2>
          <p>SOLAI Wallet may interact with third-party services:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>OpenAI (for AI processing)</li>
            <li>Blockchain RPC providers</li>
            <li>DEX aggregators (e.g., Jupiter, 1inch)</li>
          </ul>
          <p>When using AI features, your prompts may be sent to these services.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">6. Data Storage</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Most data is stored locally in your browser or extension</li>
            <li>Some non-sensitive data (e.g., automation rules) may be stored securely on our servers</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">7. Security</h2>
          <p>We implement reasonable security measures, but:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You are responsible for keeping your device secure</li>
            <li>Never share your private keys or recovery phrases</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">8. Your Responsibility</h2>
          <p>As a non-custodial wallet:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You fully control your funds</li>
            <li>We cannot recover lost keys or funds</li>
            <li>Transactions are irreversible</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">9. Children’s Privacy</h2>
          <p>SOLAI Wallet is not intended for users under 18.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">10. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Updates will be reflected with a new “Last Updated” date.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">11. Contact</h2>
          <p>For questions, contact:</p>
          <p>solaiwallet@gmail.com</p>
        </section>
      </div>
    </main>
  );
}
