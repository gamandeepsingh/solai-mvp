import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions — SOLAI Wallet | Legal Agreement",
  description:
    "Read the SOLAI Wallet terms and conditions. Understand your rights and responsibilities when using our AI-powered Solana crypto wallet. Important legal information.",
  openGraph: {
    title: "Terms and Conditions — SOLAI Wallet",
    description:
      "Read the SOLAI Wallet terms and conditions. Understand your rights and responsibilities when using our AI-powered Solana crypto wallet.",
    url: "https://solai.website/term-condition",
    type: "website",
  },
  alternates: {
    canonical: "https://solai.website/term-condition",
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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="space-y-3">
          <p className="text-xs tracking-[0.2em] uppercase text-white/40">Terms and Conditions</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Terms and Conditions — SOLAI Wallet</h1>
          <p className="text-sm text-white/50">Last Updated: 20 Mar 2026</p>
        </header>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">1. Acceptance of Terms</h2>
          <p>By using SOLAI Wallet, you agree to these Terms. If you do not agree, do not use the product.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">2. Nature of the Product</h2>
          <p>SOLAI Wallet is:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A non-custodial crypto wallet</li>
            <li>A tool for interacting with blockchain networks</li>
            <li>An experimental AI-assisted financial interface</li>
          </ul>
          <p>We do not hold or control your funds.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">3. User Responsibilities</h2>
          <p>You agree that:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>You are responsible for your wallet security</li>
            <li>You will not share your private keys</li>
            <li>You understand blockchain transactions are irreversible</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">4. No Financial Advice</h2>
          <p>SOLAI Wallet does not provide financial advice.</p>
          <p>All actions (trading, swapping, transfers) are executed at your own risk.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">5. AI Limitations</h2>
          <p>AI-generated actions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>May be incorrect or incomplete</li>
            <li>Require your review before execution</li>
            <li>Should not be blindly trusted</li>
          </ul>
          <p>You are responsible for verifying all actions.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">6. Transactions</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>All transactions occur on blockchain networks</li>
            <li>We do not guarantee execution speed or success</li>
            <li>Fees (gas, network fees) may apply</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">7. Third-Party Services</h2>
          <p>SOLAI Wallet integrates with third-party services:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>DEX aggregators</li>
            <li>RPC providers</li>
            <li>AI providers</li>
          </ul>
          <p>We are not responsible for their performance or failures.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We are not liable for loss of funds</li>
            <li>We are not liable for failed transactions</li>
            <li>We are not liable for third-party issues</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">9. Termination</h2>
          <p>We may suspend or terminate access if:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Terms are violated</li>
            <li>Security risks are detected</li>
          </ul>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">10. Changes to Terms</h2>
          <p>We may update these Terms at any time.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">11. Governing Law</h2>
          <p>These Terms are governed by applicable laws in your jurisdiction.</p>
        </section>

        <section className="space-y-4 text-sm text-white/70 leading-relaxed">
          <h2 className="text-lg text-white font-medium">12. Contact</h2>
          <p>solaiwallet@gmail.com</p>
        </section>
      </div>
    </main>
  );
}
