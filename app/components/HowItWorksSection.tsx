"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { staggerChild, staggerParent } from "@/lib/motion";
import Section, { SectionHeader } from "./ui/Section";
import { Highlight } from "./ui/Reveal";

interface Step {
  number: string;
  headline: string;
  body: string;
  cta?: { label: string };
}

const STEPS: Step[] = [
  {
    number: "01",
    headline: "Install the SDK",
    body: "npm i @solai/sdk, then connect a Solana wallet provider. Non-custodial from line one — keys never touch your servers.",
    cta: { label: "Get early access" },
  },
  {
    number: "02",
    headline: "Define the policy",
    body: "The user signs a policy: daily and per-transaction limits, which tokens, which protocols. That policy is the agent's entire authority.",
  },
  {
    number: "03",
    headline: "Let the agent act",
    body: "Call agent.swap(), agent.pay(), or agent.schedule(). Routes are found automatically, and every call is checked against the policy before it is signed.",
  },
  {
    number: "04",
    headline: "Stay in control",
    body: "Users watch every action, tighten limits, or revoke the agent instantly. Payments can route through stealth addresses so nothing links back to their main wallet.",
  },
];

function StepCard({
  step,
  index,
  onOpenWaitlist,
}: {
  step: Step;
  index: number;
  onOpenWaitlist: () => void;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      variants={staggerChild}
      className="relative flex flex-col gap-4 p-6 rounded-2xl bg-white border border-[var(--hairline)]"
      style={{ boxShadow: "var(--shadow-sm)" }}
    >
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "var(--accent-wash)",
          border: "1px solid rgba(46,107,18,0.22)",
        }}
      >
        <span className="text-[13px] font-bold text-[var(--accent-ink)] font-mono tracking-tight">
          {step.number}
        </span>

        {index === 0 && !reduced && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(46,107,18,0.3)" }}
            animate={{ scale: [1, 1.65], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[18px] font-semibold text-[var(--ink)] tracking-[-0.015em]">
          {step.headline}
        </h3>
        <p className="text-[14px] text-[var(--ink-secondary)] leading-relaxed">
          {step.body}
        </p>
      </div>

      {step.cta && (
        <motion.button
          onClick={onOpenWaitlist}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          className="self-start flex items-center gap-1.5 text-[12px] font-semibold text-[var(--accent-ink)] mt-1 group"
        >
          {step.cta.label}
          <ArrowRight
            size={12}
            strokeWidth={2.2}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </motion.button>
      )}
    </motion.div>
  );
}

interface HowItWorksSectionProps {
  onOpenWaitlist: () => void;
}

export default function HowItWorksSection({ onOpenWaitlist }: HowItWorksSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 0.85", "end 0.6"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="how-it-works" subtle blob="center">
      <div className="flex flex-col gap-16">
        <SectionHeader
          eyebrow="How it works"
          headline={[
            "Four steps to",
            <>
              an <Highlight>agent that ships</Highlight>
            </>,
          ]}
        />

        <div ref={gridRef} className="relative">
          {/* Scroll-linked progress rail */}
          <div
            aria-hidden
            className="absolute top-9 hidden lg:block pointer-events-none h-px"
            style={{
              left: "calc(100% / 8)",
              right: "calc(100% / 8)",
              background: "var(--hairline)",
            }}
          >
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: reduced ? 1 : railScale,
                background:
                  "linear-gradient(90deg, var(--accent-ink), var(--accent))",
              }}
            />
          </div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {STEPS.map((step, i) => (
              <StepCard
                key={step.number}
                step={step}
                index={i}
                onOpenWaitlist={onOpenWaitlist}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
