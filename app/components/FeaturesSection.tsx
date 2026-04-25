"use client";

import { motion } from "framer-motion";

interface Feature {
  icon: React.ReactNode;
  tag: string;
  headline: string;
  body: string;
  demo: string[];
}

const FEATURES: Feature[] = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ABFF7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        <path d="M6.5 9.5C4 10 2 12 2 15h4" />
        <path d="M17.5 9.5C20 10 22 12 22 15h-4" />
        <circle cx="12" cy="13" r="1" fill="#ABFF7A" />
      </svg>
    ),
    tag: "AI Commands",
    headline: "Talk to your wallet",
    body: "Type plain English. SOLAI parses intent, finds optimal routes via Jupiter DEX, and executes — no gas math, no menus, just results.",
    demo: ["Send $5 to Alice every day", "Buy SOL if price drops 10%", "Swap USDC at best rate"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ABFF7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="9" y1="12" x2="9.01" y2="12" strokeWidth="2.5" />
        <line x1="12" y1="12" x2="12.01" y2="12" strokeWidth="2.5" />
        <line x1="15" y1="12" x2="15.01" y2="12" strokeWidth="2.5" />
      </svg>
    ),
    tag: "Stealth Addresses",
    headline: "Privacy by default",
    body: "ECDH-based one-time addresses. Every send creates a fresh, unlinkable address — no on-chain history, no address reuse, true privacy.",
    demo: ["Generate shareable meta-address", "Auto-discover incoming payments", "Sweep to main wallet with one tap"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ABFF7A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    tag: "Agent Wallets",
    headline: "Wallets that work for you",
    body: "Programmable sub-wallets that auto-sign payments within guardrails. Perfect for subscriptions, gaming, x402 micropayments, and DeFi bots.",
    demo: ["Daily/per-tx spend limits", "x402 micropayment protocol", "Auto-refill & conditional orders"],
  },
];

const sectionFade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
        delay: index * 0.12,
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="group relative flex flex-col gap-5 p-6 rounded-2xl glass card-border-gradient cursor-default"
      style={{ boxShadow: "0 24px 48px -16px rgba(0,0,0,0.6)" }}
    >
      {/* Hover glow overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% -20%, rgba(171,255,122,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Icon pill */}
      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: "rgba(171,255,122,0.08)",
          border: "1px solid rgba(171,255,122,0.15)",
        }}
      >
        {feature.icon}
      </div>

      {/* Tag */}
      <span className="relative z-10 text-[10px] font-semibold tracking-[0.18em] uppercase text-[#ABFF7A]/60">
        {feature.tag}
      </span>

      {/* Headline + body */}
      <div className="relative z-10 flex flex-col gap-2 -mt-2">
        <h3 className="text-[20px] font-semibold text-white/90 tracking-tight leading-snug">
          {feature.headline}
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed">{feature.body}</p>
      </div>

      {/* Demo list */}
      <div className="relative z-10 flex flex-col gap-2 mt-auto pt-4 border-t border-white/5">
        {feature.demo.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-[12px] text-white/30">
            <span className="w-1 h-1 rounded-full bg-[#ABFF7A]/40 shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-6 overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(171,255,122,0.2), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Section header */}
        <motion.div
          {...sectionFade}
          className="flex flex-col items-center text-center gap-3"
        >
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/25">
            Capabilities
          </p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-[-0.025em] text-white leading-tight">
            Everything you need,
            <br />
            <span className="text-shimmer">nothing you don&apos;t</span>
          </h2>
          <p className="text-[15px] text-white/40 max-w-sm leading-relaxed">
            Three breakthrough features. One wallet.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
