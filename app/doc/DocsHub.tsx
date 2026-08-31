"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, Wallet } from "lucide-react";
import { staggerChild, staggerParent, springSoft } from "@/lib/motion";
import { Highlight, Reveal, RevealLine, RevealLines } from "../components/ui/Reveal";

const DOCS = [
  {
    href: "/doc/sdk",
    Icon: BookOpen,
    tag: "Private beta",
    title: "SDK Documentation",
    body: "Create agents, write the guardrail policy, run swaps and payments, and send privately with Umbra stealth addresses. Includes the full policy reference and the security model.",
    topics: [
      "Quickstart & installation",
      "Guardrail policy reference",
      "Agents, swaps & payments",
      "Stealth addresses & x402",
    ],
  },
  {
    href: "/doc/wallet",
    Icon: Wallet,
    tag: "Live on Chrome",
    title: "Wallet Documentation",
    body: "The shipped Chrome extension built on the SDK — agent wallets, ECDH stealth addresses, AI commands, dApp connectivity, architecture, and installation.",
    topics: [
      "Core features & AI commands",
      "Agent wallet API",
      "Stealth address protocol",
      "Architecture & security",
    ],
  },
];

export default function DocsHub() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Header */}
      <header className="sticky top-0 z-50 nav-glass">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-white border border-[var(--hairline)] flex items-center justify-center overflow-hidden group-hover:border-[var(--accent-ink)]/30 transition-colors duration-300">
              <Image
                src="/solai-logo.png"
                width={18}
                height={18}
                alt="SOLAI"
                className="object-contain"
              />
            </div>
            <span className="text-[15px] font-dancing-script font-semibold text-[var(--ink)]">
              SOLAI
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--accent-ink)] hidden sm:block">
              Docs
            </span>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[12px] text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors duration-200 font-medium"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="relative border-b border-[var(--hairline)] overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full pointer-events-none opacity-55"
          style={{ background: "var(--accent-blob)", filter: "blur(170px)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-ink)] mb-4">
              SOLAI
            </p>
          </Reveal>

          <RevealLines
            className="text-4xl sm:text-5xl font-semibold text-[var(--ink)] mb-4 tracking-[-0.035em] leading-[1.02]"
            delay={0.05}
          >
            <RevealLine>
              <Highlight>Two</Highlight> sets of docs
            </RevealLine>
          </RevealLines>

          <Reveal delay={0.12}>
            <p className="text-[15px] text-[var(--ink-secondary)] max-w-xl leading-relaxed">
              One for the SDK you build on, one for the wallet we built with it. Start
              with whichever you&apos;re here for.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Cards */}
      <main className="max-w-4xl mx-auto px-6 py-14 pb-24">
        <motion.div
          variants={staggerParent}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {DOCS.map(({ href, Icon, tag, title, body, topics }) => (
            <motion.div key={href} variants={staggerChild}>
              <motion.div whileHover={{ y: -4 }} transition={springSoft}>
                <Link
                  href={href}
                  className="group flex flex-col gap-5 h-full p-6 rounded-2xl bg-white border border-[var(--hairline)] hover:border-[rgba(10,10,10,0.18)] transition-colors duration-200"
                  style={{ boxShadow: "var(--shadow-md)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-rotate-6"
                      style={{
                        background: "var(--accent-wash)",
                        border: "1px solid rgba(46,107,18,0.18)",
                      }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        className="text-[var(--accent-ink)]"
                      />
                    </div>
                    <span className="text-[10px] font-semibold tracking-[0.14em] uppercase px-2 py-1 rounded-md bg-[var(--accent-wash)] text-[var(--accent-ink)]">
                      {tag}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-[20px] font-semibold text-[var(--ink)] tracking-[-0.02em]">
                      {title}
                    </h2>
                    <p className="text-[14px] text-[var(--ink-secondary)] leading-relaxed">
                      {body}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-4 border-t border-[var(--hairline-soft)]">
                    {topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2 text-[12.5px] text-[var(--ink-secondary)]"
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--accent-ink)] shrink-0" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  <span className="mt-auto pt-2 flex items-center gap-1.5 text-[13px] font-semibold text-[var(--accent-ink)]">
                    Read the docs
                    <ArrowRight
                      size={14}
                      strokeWidth={2.2}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
