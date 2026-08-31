"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { CHROME_URL } from "@/lib/constants";
import { springSnappy, staggerChild, staggerParent } from "@/lib/motion";
import Section from "./ui/Section";
import Button from "./ui/Button";
import WalletChatDemo from "./WalletChatDemo";
import { Highlight, Reveal, RevealLine, RevealLines } from "./ui/Reveal";

/** The strongest of the original command set — evidence, not a feature list. */
const COMMANDS = [
  "Send $5 to mom every day",
  "Buy SOL if price drops 10%",
  "Swap USDC at best rate across DEXs",
  "Create an agent wallet for subscriptions",
  "Send privately using stealth address",
  "Generate one-time payment address",
  "Pay via x402 micropayment protocol",
  "Create a DCA bot for SOL",
  "Collect my stealth payments",
];

export default function WalletSection() {
  return (
    <Section id="wallet" blob="top">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        {/* Left — the claim */}
        <div className="flex flex-col gap-7">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full bg-[var(--accent-wash)] text-[var(--accent-ink)] border border-[rgba(46,107,18,0.16)]">
              <Check size={12} strokeWidth={2.5} />
              Already shipping
            </span>
          </Reveal>

          <RevealLines
            className="text-[36px] sm:text-[46px] font-semibold tracking-[-0.035em] leading-[1.02] text-[var(--ink)]"
            delay={0.05}
          >
            <RevealLine>The wallet we built</RevealLine>
            <RevealLine>
              on <Highlight>our own SDK</Highlight>
            </RevealLine>
          </RevealLines>

          <Reveal delay={0.12}>
            <p className="text-[15px] text-[var(--ink-secondary)] leading-relaxed max-w-md">
              SOLAI Wallet is live on the Chrome Web Store. Every feature in it — agent
              wallets, stealth payments, best-rate swaps — runs on the SDK you&apos;re
              about to get.
            </p>
          </Reveal>

          {/* Command evidence */}
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap gap-2"
          >
            {COMMANDS.map((cmd) => (
              <motion.span
                key={cmd}
                variants={staggerChild}
                whileHover={{ y: -2 }}
                transition={springSnappy}
                className="text-[12.5px] px-3 py-2 rounded-lg bg-white border border-[var(--hairline)] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[rgba(10,10,10,0.18)] transition-colors duration-200 cursor-default"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                {cmd}
              </motion.span>
            ))}
          </motion.div>

          <Reveal delay={0.15}>
            <Button href={CHROME_URL} external variant="secondary" className="group">
              Add to Chrome — free
              <ArrowUpRight
                size={15}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Button>
          </Reveal>
        </div>

        {/* Right — the product itself */}
        <Reveal delay={0.1}>
          <WalletChatDemo />
        </Reveal>
      </div>
    </Section>
  );
}
