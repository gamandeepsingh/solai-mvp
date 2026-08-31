"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock,
  EyeOff,
  Radio,
  Repeat,
  Send,
  Sparkles,
  Timer,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { NPM_PKG } from "@/lib/constants";
import { QUICKSTART_SNIPPET, QUICKSTART_RAW } from "@/lib/snippets";
import { springSoft, staggerChild, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WaitlistModal from "./WaitlistModal";
import WaitlistCTA from "./WaitlistCTA";
import StealthSection from "./StealthSection";
import ParticleCanvas from "./ParticleCanvas";
import SmoothScrollProvider from "./SmoothScrollProvider";
import Section, { SectionHeader } from "./ui/Section";
import Button from "./ui/Button";
import CodeBlock from "./ui/CodeBlock";
import { Highlight, Reveal, RevealLine, RevealLines } from "./ui/Reveal";

// ─── Policy surface ───────────────────────────────────────────────────
const POLICY_FIELDS = [
  {
    name: "dailyLimit",
    type: "string",
    desc: "Total value the agent may move in a rolling 24 hours.",
  },
  {
    name: "perTxLimit",
    type: "string",
    desc: "Ceiling on any single transaction the agent builds.",
  },
  {
    name: "tokens",
    type: "string[]",
    desc: "Mints the agent may hold, send, or swap. Everything else is refused.",
  },
  {
    name: "protocols",
    type: "string[]",
    desc: "Venues the agent may route through — Jupiter, Kamino, your own program.",
  },
  {
    name: "expiresAt",
    type: "Date",
    desc: "Hard expiry. After this the policy stops authorising anything.",
  },
  {
    name: "revocable",
    type: "boolean",
    desc: "Whether the user can tear the agent's authority down instantly.",
  },
];

// ─── Capabilities ─────────────────────────────────────────────────────
const CAPABILITIES: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: Zap, title: "Swaps", body: "Best-rate routing across Solana DEXs." },
  { Icon: Send, title: "Payments", body: "One-off transfers to wallets or handles." },
  { Icon: Repeat, title: "Recurring", body: "Scheduled transfers on any cadence." },
  { Icon: Timer, title: "Conditional orders", body: "Execute when a price condition hits." },
  { Icon: EyeOff, title: "Stealth addresses", body: "Umbra-derived, fresh every payment." },
  { Icon: Radio, title: "x402 micropayments", body: "Machine-scale payments over HTTP." },
];

// ─── Roadmap ──────────────────────────────────────────────────────────
const ROADMAP = [
  { label: "Wallet live on Chrome", state: "done" as const },
  { label: "SDK private beta", state: "current" as const },
  { label: "Public release", state: "next" as const },
  { label: "Open-source core", state: "next" as const },
];

// ─── FAQ ──────────────────────────────────────────────────────────────
const FAQ = [
  {
    q: "Is it really non-custodial?",
    a: "Yes. Keys stay on the user's device and never reach your servers or ours. The SDK builds transactions and asks the user's wallet to sign them — an agent acts under a policy the user signed, not under a key we hold.",
  },
  {
    q: "What happens if an agent exceeds its policy?",
    a: "The call is refused before a transaction is built. Guardrails are enforced at the SDK boundary rather than reconciled afterwards, so an over-limit swap or a token outside the allowlist never reaches the chain and never costs a fee.",
  },
  {
    q: "Which chains are supported?",
    a: "Solana at launch. The policy model and the agent interface are chain-agnostic by design, so additional chains are on the roadmap after the public release.",
  },
  {
    q: "What is Umbra?",
    a: "Umbra is the stealth-address scheme the SDK uses for private payments. The sender derives a fresh one-time address from the recipient's published meta-address, so each payment lands somewhere new and nothing links back to the recipient's main wallet on-chain.",
  },
  {
    q: "When does the beta open?",
    a: "We're onboarding in batches from the early-access list. Join it and we'll send your private npm tag and the docs when your batch opens.",
  },
];

function FaqItem({ item, index }: { item: (typeof FAQ)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={staggerChild}
      className="border-b border-[var(--hairline)] last:border-b-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[15px] font-medium text-[var(--ink)] group-hover:text-[var(--accent-ink)] transition-colors duration-200">
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={springSoft}
          className="shrink-0 text-[var(--ink-tertiary)]"
        >
          <ChevronDown size={17} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key={`faq-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-10 text-[14px] text-[var(--ink-secondary)] leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SdkContent() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);
  const reduced = useReducedMotion();

  return (
    <SmoothScrollProvider>
      <main className="relative bg-[var(--bg)] min-h-screen">
        <ParticleCanvas />
        <Navbar onOpenWaitlist={openWaitlist} anchorPrefix="/" />

        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-6 pt-36 pb-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[780px] h-[440px] rounded-full opacity-60"
            style={{ background: "var(--accent-blob)", filter: "blur(170px)" }}
          />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 font-medium text-[11px] px-3.5 py-2 tracking-[0.1em] uppercase rounded-full border border-[var(--hairline)] bg-[var(--accent-wash)] text-[var(--accent-ink)]">
                <Sparkles size={13} strokeWidth={2} />
                Private beta
              </span>
            </Reveal>

            <RevealLines
              className="text-[52px] sm:text-[68px] lg:text-[76px] font-semibold tracking-[-0.04em] leading-[0.9] text-[var(--ink)]"
              delay={0.05}
            >
              <RevealLine>SOLAI SDK</RevealLine>
            </RevealLines>

            <Reveal delay={0.12}>
              <p className="text-[17px] text-[var(--ink-secondary)] leading-relaxed max-w-xl">
                A non-custodial DeFi SDK on Solana that lets you create AI agents to
                handle swaps and payments on your users&apos; behalf. Agents don&apos;t
                get unlimited access — users set guardrails like spending limits, token
                and protocol allowlists, so an agent can only do what its user allows.
                Umbra-based stealth addresses keep payments private, so nobody has to
                expose their main wallet.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <Button onClick={openWaitlist} magnetic>
                  Get early access
                  <ArrowRight size={15} strokeWidth={2.2} />
                </Button>
                <Button href="/doc/sdk" variant="secondary">
                  <BookOpen size={15} strokeWidth={2} />
                  Read the docs
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Quickstart ── */}
        <Section id="quickstart" subtle blob="none">
          <div className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="Quickstart"
              headline={[
                <>
                  From install to <Highlight>bounded agent</Highlight>
                </>,
              ]}
              sub="Five steps, one file. This is the whole surface you need to ship."
            />

            <Reveal className="flex flex-col gap-4 max-w-3xl mx-auto w-full">
              <CodeBlock
                filename="terminal"
                lines={[[{ t: "npm i ", c: "plain" }, { t: NPM_PKG, c: "kw" }]]}
                copyText={QUICKSTART_RAW}
              />
              <CodeBlock filename="agent.ts" lines={QUICKSTART_SNIPPET} />
            </Reveal>
          </div>
        </Section>

        {/* ── Guardrails reference ── */}
        <Section id="guardrails-reference" blob="top">
          <div className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="Guardrails reference"
              headline={[
                "The policy is the",
                <>
                  agent&apos;s <Highlight>entire authority</Highlight>
                </>,
              ]}
              sub="Everything an agent may do is declared here, signed by the user, and enforced before a transaction is built."
            />

            <Reveal className="max-w-3xl mx-auto w-full">
              <div
                className="rounded-2xl bg-white border border-[var(--hairline)] overflow-hidden"
                style={{ boxShadow: "var(--shadow-md)" }}
              >
                <div className="hidden sm:grid grid-cols-[180px_100px_1fr] gap-4 px-6 py-3 border-b border-[var(--hairline)] bg-[var(--bg-subtle)]">
                  {["Field", "Type", "Description"].map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--ink-tertiary)]"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                <motion.div
                  variants={staggerParent}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className="divide-y divide-[var(--hairline-soft)]"
                >
                  {POLICY_FIELDS.map((field) => (
                    <motion.div
                      key={field.name}
                      variants={staggerChild}
                      className="grid grid-cols-1 sm:grid-cols-[180px_100px_1fr] gap-1 sm:gap-4 px-6 py-4"
                    >
                      <code className="text-[13px] font-mono font-medium text-[var(--accent-ink)]">
                        {field.name}
                      </code>
                      <code className="text-[12.5px] font-mono text-[var(--ink-tertiary)]">
                        {field.type}
                      </code>
                      <span className="text-[13.5px] text-[var(--ink-secondary)] leading-relaxed">
                        {field.desc}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <p className="mt-4 text-center text-[12px] text-[var(--ink-tertiary)]">
                Preview of the planned API — surface may change before public release.
              </p>
            </Reveal>
          </div>
        </Section>

        {/* ── Stealth deep dive (shared with the homepage) ── */}
        <StealthSection />

        {/* ── Capabilities ── */}
        <Section id="capabilities" subtle blob="top">
          <div className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="Capabilities"
              headline={[
                <>
                  What an agent <Highlight>can do</Highlight>
                </>,
              ]}
            />

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {CAPABILITIES.map(({ Icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={staggerChild}
                  whileHover={{ y: -3 }}
                  transition={springSoft}
                  className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-[var(--hairline)]"
                  style={{ boxShadow: "var(--shadow-sm)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      background: "var(--accent-wash)",
                      border: "1px solid rgba(46,107,18,0.18)",
                    }}
                  >
                    <Icon size={16} strokeWidth={1.8} className="text-[var(--accent-ink)]" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                    {title}
                  </h3>
                  <p className="text-[13.5px] text-[var(--ink-secondary)] leading-relaxed">
                    {body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Section>

        {/* ── Roadmap ── */}
        <Section id="roadmap" blob="center">
          <div className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="Roadmap"
              headline={[
                <>
                  Shipped, shipping, <Highlight>next</Highlight>
                </>,
              ]}
            />

            <motion.ol
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="relative max-w-lg mx-auto w-full flex flex-col"
            >
              {/* Rail */}
              <span
                aria-hidden
                className="absolute left-[13px] top-3 bottom-3 w-px bg-[var(--hairline)]"
              />

              {ROADMAP.map((item) => (
                <motion.li
                  key={item.label}
                  variants={staggerChild}
                  className="relative flex items-center gap-4 py-4 pl-0"
                >
                  <span
                    className={cn(
                      "relative z-10 w-[27px] h-[27px] rounded-full flex items-center justify-center shrink-0 bg-white",
                      item.state === "next" && "border border-dashed border-[var(--hairline)]"
                    )}
                    style={
                      item.state === "done"
                        ? { background: "var(--accent)" }
                        : item.state === "current"
                          ? {
                              background: "var(--accent-wash)",
                              border: "1.5px solid var(--accent-ink)",
                            }
                          : undefined
                    }
                  >
                    {item.state === "done" && (
                      <Check size={14} strokeWidth={2.6} className="text-[var(--ink)]" />
                    )}
                    {item.state === "current" && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[var(--accent-ink)]" />
                        {!reduced && (
                          <motion.span
                            className="absolute inset-0 rounded-full border border-[var(--accent-ink)]"
                            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                      </>
                    )}
                    {item.state === "next" && (
                      <Clock size={12} strokeWidth={2} className="text-[var(--ink-tertiary)]" />
                    )}
                  </span>

                  <span
                    className={cn(
                      "text-[15px]",
                      item.state === "next"
                        ? "text-[var(--ink-tertiary)]"
                        : "text-[var(--ink)] font-medium"
                    )}
                  >
                    {item.label}
                  </span>

                  {item.state === "current" && (
                    <span className="ml-auto text-[10px] font-semibold tracking-[0.14em] uppercase px-2 py-1 rounded-md bg-[var(--accent-wash)] text-[var(--accent-ink)]">
                      Now
                    </span>
                  )}
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </Section>

        {/* ── FAQ ── */}
        <Section id="faq" subtle blob="none">
          <div className="flex flex-col gap-12">
            <SectionHeader
              eyebrow="FAQ"
              headline={[
                <>
                  Questions worth <Highlight>asking</Highlight>
                </>,
              ]}
            />

            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="max-w-2xl mx-auto w-full rounded-2xl bg-white border border-[var(--hairline)] px-6"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              {FAQ.map((item, i) => (
                <FaqItem key={item.q} item={item} index={i} />
              ))}
            </motion.div>
          </div>
        </Section>

        <WaitlistCTA />
        <Footer />
        <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      </main>
    </SmoothScrollProvider>
  );
}
