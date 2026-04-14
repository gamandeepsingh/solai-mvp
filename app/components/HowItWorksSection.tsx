"use client";

import { motion } from "framer-motion";

const CHROME_URL =
  "https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej";

interface Step {
  number: string;
  headline: string;
  body: string;
  cta?: { label: string; href: string };
}

const STEPS: Step[] = [
  {
    number: "01",
    headline: "Install the extension",
    body: "Add SOLAI to Chrome in one click. Your wallet is created instantly — no lengthy setup, no seed phrase drama.",
    cta: { label: "Add to Chrome", href: CHROME_URL },
  },
  {
    number: "02",
    headline: "Type what you want",
    body: 'Say "Send 10 USDC to Alice" or "Buy SOL if it drops below $120". SOLAI parses your intent and finds the optimal path.',
  },
  {
    number: "03",
    headline: "Confirm and done",
    body: "Review the plain-language summary. One tap to sign. Transaction executes, receipt appears — that's it.",
  },
];

const sectionFade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.55,
        ease: [0.25, 1, 0.5, 1],
        delay: index * 0.15,
      }}
      className="relative flex flex-col gap-4 p-6 rounded-2xl"
    >
      {/* Number circle */}
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "rgba(171,255,122,0.06)",
          border: "1px solid rgba(171,255,122,0.22)",
        }}
      >
        <span className="text-[13px] font-bold text-[#ABFF7A] font-mono tracking-tight">
          {step.number}
        </span>

        {/* Pulse ring on first step only */}
        {index === 0 && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(171,255,122,0.2)" }}
            animate={{ scale: [1, 1.65], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[18px] font-semibold text-white/90 tracking-tight">
          {step.headline}
        </h3>
        <p className="text-[14px] text-white/40 leading-relaxed">{step.body}</p>
      </div>

      {/* Optional CTA */}
      {step.cta && (
        <motion.a
          href={step.cta.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="self-start flex items-center gap-1.5 text-[12px] font-semibold text-[#ABFF7A] mt-1 group"
        >
          {step.cta.label}
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            <path
              d="M2 6H10M6 2L10 6L6 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      )}
    </motion.div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 px-6 overflow-hidden">
      {/* Ambient center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(171,255,122,0.03)", filter: "blur(160px)" }}
      />

      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        {/* Section header */}
        <motion.div
          {...sectionFade}
          className="flex flex-col items-center text-center gap-3"
        >
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/25">
            How It Works
          </p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-[-0.025em] text-white">
            Three steps to
            <br />
            <span className="text-shimmer">on-chain anything</span>
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6">
          {/* Desktop connector line */}
          <div
            className="absolute top-9 hidden md:block pointer-events-none"
            style={{
              left: "calc(100% / 6)",
              right: "calc(100% / 6)",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(171,255,122,0.2) 20%, rgba(171,255,122,0.2) 80%, transparent)",
            }}
          />

          {STEPS.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
