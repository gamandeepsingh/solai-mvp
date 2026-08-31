"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { CHROME_URL } from "@/lib/constants";
import { HERO_SNIPPET, HERO_SNIPPET_RAW } from "@/lib/snippets";
import { springSoft, staggerChild, staggerParent } from "@/lib/motion";
import Button from "./ui/Button";
import CodeBlock from "./ui/CodeBlock";
import { Highlight } from "./ui/Reveal";

interface HeroSectionProps {
  onOpenWaitlist: () => void;
}

export default function HeroSection({ onOpenWaitlist }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const codeY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden px-6"
    >
      {/* Ambient neon */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: blobY, background: "var(--accent-blob)", filter: "blur(170px)" }}
          className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[760px] h-[460px] rounded-full opacity-70"
        />
        <motion.div
          style={{ y: blobY, background: "var(--accent-blob)", filter: "blur(150px)" }}
          className="absolute top-[25%] right-[-8%] w-[420px] h-[420px] rounded-full opacity-50 hidden lg:block"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center pt-32 pb-20">
        {/* ── Left: the pitch ── */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div variants={staggerChild}>
            <Link
              href="/sdk"
              className="group inline-flex items-center gap-2 font-medium text-[11px] px-3.5 py-2 tracking-[0.1em] uppercase rounded-full border border-[var(--hairline)] bg-[var(--accent-wash)] text-[var(--accent-ink)] hover:border-[var(--accent-ink)]/30 transition-colors duration-200"
            >
              <Sparkles size={13} strokeWidth={2} />
              SOLAI SDK · Private beta
              <ArrowRight
                size={12}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[52px] sm:text-[64px] lg:text-[72px] xl:text-[88px] font-semibold tracking-[-0.04em] leading-[0.88] text-[var(--ink)]">
            <motion.span variants={staggerChild} className="block">
              DeFi agents.
            </motion.span>
            <motion.span variants={staggerChild} className="block">
              On <Highlight>your</Highlight> rails.
            </motion.span>
          </h1>

          {/* Sub */}
          <motion.p
            variants={staggerChild}
            className="text-[16px] sm:text-[17px] text-[var(--ink-secondary)] leading-relaxed max-w-md"
          >
            A non-custodial DeFi SDK on Solana. Ship AI agents that swap and pay on
            your users&apos; behalf — inside spending limits, token allowlists, and
            protocol allowlists they set themselves.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerChild}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mt-1"
          >
            <Button onClick={onOpenWaitlist} magnetic>
              Get early access
              <ArrowRight size={15} strokeWidth={2.2} />
            </Button>

            <Button href="/sdk" variant="secondary" className="group">
              Explore the SDK
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Button>
          </motion.div>

          {/* Shipped-product proof */}
          <motion.a
            variants={staggerChild}
            href={CHROME_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[13px] text-[var(--ink-tertiary)] hover:text-[var(--ink-secondary)] transition-colors duration-200 mt-2"
          >
            <span className="relative flex w-1.5 h-1.5 shrink-0">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--accent-ink)] opacity-60 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-[var(--accent-ink)]" />
            </span>
            SOLAI Wallet is live on Chrome — built on this SDK.
            <ArrowUpRight
              size={13}
              strokeWidth={2}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </motion.div>

        {/* ── Right: the code ── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 36, x: 16 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ ...springSoft, delay: 0.25 }}
          style={{ y: codeY }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          <motion.div
            style={{ perspective: 1200 }}
            whileHover={reduced ? undefined : { rotateY: -3, rotateX: 2 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full max-w-[500px]"
          >
            <CodeBlock
              filename="agent.ts"
              lines={HERO_SNIPPET}
              copyText={HERO_SNIPPET_RAW}
              typewriter
              height={272}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
