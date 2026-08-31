"use client";

import { motion, useReducedMotion } from "framer-motion";
import { KeyRound, Send, ShieldOff, Wallet } from "lucide-react";
import { staggerChild, staggerParent } from "@/lib/motion";
import Section, { SectionHeader } from "./ui/Section";
import { Reveal } from "./ui/Reveal";
import { Highlight } from "./ui/Reveal";

const STATS = [
  { value: "Fresh address", label: "per payment" },
  { value: "Zero", label: "address reuse" },
];

function Node({
  Icon,
  title,
  caption,
  muted = false,
}: {
  Icon: typeof Send;
  title: string;
  caption: string;
  muted?: boolean;
}) {
  return (
    <motion.div
      variants={staggerChild}
      className="flex flex-col items-center gap-3 text-center w-[150px] shrink-0"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={
          muted
            ? {
                background: "var(--surface)",
                border: "1px dashed rgba(10,10,10,0.16)",
              }
            : {
                background: "var(--accent-wash)",
                border: "1px solid rgba(46,107,18,0.2)",
              }
        }
      >
        <Icon
          size={19}
          strokeWidth={1.8}
          className={muted ? "text-[var(--ink-tertiary)]" : "text-[var(--accent-ink)]"}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p
          className={
            muted
              ? "text-[13px] font-medium text-[var(--ink-tertiary)]"
              : "text-[13px] font-semibold text-[var(--ink)]"
          }
        >
          {title}
        </p>
        <p className="text-[11.5px] text-[var(--ink-tertiary)] leading-snug">{caption}</p>
      </div>
    </motion.div>
  );
}

function Connector({ label }: { label: string }) {
  const reduced = useReducedMotion();

  return (
    <div className="hidden md:flex flex-col items-center gap-2 flex-1 min-w-[80px] pb-10">
      <span className="text-[10px] font-mono text-[var(--ink-tertiary)] whitespace-nowrap">
        {label}
      </span>
      <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none">
        <motion.line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="var(--accent-ink)"
          strokeWidth="1.5"
          strokeDasharray="0 1"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
    </div>
  );
}

export default function StealthSection() {
  const reduced = useReducedMotion();

  return (
    <Section id="privacy" blob="top">
      <div className="flex flex-col gap-16">
        <SectionHeader
          eyebrow="Privacy"
          headline={[
            "Paid in public.",
            <>
              <Highlight>Private</Highlight> on-chain.
            </>,
          ]}
          sub="Umbra-based stealth addresses derive a fresh, unlinkable address for every payment your agent sends."
        />

        {/* Flow diagram */}
        <Reveal>
          <div
            className="relative rounded-2xl bg-white border border-[var(--hairline)] px-6 sm:px-10 py-10"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0"
            >
              <Node
                Icon={Send}
                title="Sender"
                caption="Agent initiates a payment"
              />
              <Connector label="derives one-time address" />
              <Node
                Icon={KeyRound}
                title="Stealth address"
                caption="Fresh, unlinkable, single use"
              />
              <Connector label="funds settle" />
              <Node
                Icon={ShieldOff}
                title="Recipient scans"
                caption="Auto-discovers and sweeps"
              />
            </motion.div>

            {/* The disconnection is the point */}
            <div className="mt-10 pt-8 border-t border-dashed border-[var(--hairline)] flex flex-col items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--ink-tertiary)]">
                never linked on-chain
              </span>
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-dashed border-[rgba(10,10,10,0.16)]"
              >
                <Wallet size={16} strokeWidth={1.8} className="text-[var(--ink-tertiary)]" />
                <span className="text-[13px] text-[var(--ink-tertiary)]">
                  Recipient&apos;s main wallet
                </span>
              </motion.div>
            </div>
          </div>
        </Reveal>

        {/* Stats */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerChild}
              className="flex flex-col items-center gap-1 py-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--hairline)]"
            >
              <p className="text-[22px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                {stat.value}
              </p>
              <p className="text-[13px] text-[var(--ink-secondary)]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
