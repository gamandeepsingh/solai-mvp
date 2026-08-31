"use client";

import { motion } from "framer-motion";
import { Bot, EyeOff, ShieldCheck, type LucideIcon } from "lucide-react";
import { cardHover, staggerChild, staggerParent } from "@/lib/motion";
import Section, { SectionHeader } from "./ui/Section";
import { Highlight, Reveal } from "./ui/Reveal";

interface Pillar {
  Icon: LucideIcon;
  tag: string;
  headline: string;
  body: string;
  points: string[];
}

const PILLARS: Pillar[] = [
  {
    Icon: Bot,
    tag: "Autonomous execution",
    headline: "Agents that act",
    body: "Describe intent, not transactions. Agents route swaps, settle payments, and run recurring transfers on your users' behalf — no manual signing loop.",
    points: ["agent.swap()", "agent.pay()", "agent.schedule()"],
  },
  {
    Icon: ShieldCheck,
    tag: "Guardrails",
    headline: "Permission, not trust",
    body: "Every agent runs inside a policy the user writes. Spending limits, token allowlists, protocol allowlists. Anything outside the policy is refused at the SDK, not after the fact.",
    points: ["Daily & per-tx limits", "Token allowlists", "Protocol allowlists"],
  },
  {
    Icon: EyeOff,
    tag: "Stealth payments",
    headline: "Private by construction",
    body: "Umbra-based stealth addresses generate a fresh, unlinkable address for every payment. Users transact without exposing their main wallet on-chain.",
    points: ["One-time addresses", "Auto-discovery", "Sweep to main wallet"],
  },
];

function PillarCard({ pillar }: { pillar: Pillar }) {
  const { Icon } = pillar;

  return (
    <motion.div
      variants={staggerChild}
      whileHover={cardHover}
      className="group relative flex flex-col gap-5 p-6 rounded-2xl bg-white border border-[var(--hairline)] cursor-default overflow-hidden"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      {/* Neon wash sweeps in on hover */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% -30%, var(--accent-wash) 0%, transparent 65%)",
        }}
      />

      {/* Icon tile */}
      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-rotate-6"
        style={{
          background: "var(--accent-wash)",
          border: "1px solid rgba(46,107,18,0.18)",
        }}
      >
        <Icon size={18} strokeWidth={1.8} className="text-[var(--accent-ink)]" />
      </div>

      <span className="relative z-10 text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-ink)]">
        {pillar.tag}
      </span>

      <div className="relative z-10 flex flex-col gap-2 -mt-2">
        <h3 className="text-[20px] font-semibold text-[var(--ink)] tracking-[-0.02em] leading-snug">
          {pillar.headline}
        </h3>
        <p className="text-[14px] text-[var(--ink-secondary)] leading-relaxed">
          {pillar.body}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-2 mt-auto pt-4 border-t border-[var(--hairline-soft)]">
        {pillar.points.map((point) => (
          <div
            key={point}
            className="flex items-center gap-2 text-[12px] text-[var(--ink-secondary)]"
          >
            <span className="w-1 h-1 rounded-full bg-[var(--accent-ink)] shrink-0" />
            {point}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PillarsSection() {
  return (
    <Section id="sdk" blob="top">
      <div className="flex flex-col gap-16">
        <SectionHeader
          eyebrow="The SDK"
          headline={[
            <>
              Autonomous. <Highlight>Bounded.</Highlight>
            </>,
            "Private.",
          ]}
          sub="Three primitives. One non-custodial SDK."
        />

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {PILLARS.map((pillar) => (
            <PillarCard key={pillar.tag} pillar={pillar} />
          ))}
        </motion.div>

        <Reveal className="text-center">
          <p className="text-[14px] text-[var(--ink-tertiary)]">
            Non-custodial throughout — keys never leave the user&apos;s device.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
