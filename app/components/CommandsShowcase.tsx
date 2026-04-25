"use client";

import { motion } from "framer-motion";

interface Command {
  text: string;
  accent?: boolean; // shows green dot
}

const COMMAND_ROWS: Command[][] = [
  [
    { text: "Send $5 to mom every day", accent: true },
    { text: "Buy SOL if price drops 10%", accent: true },
    { text: "Swap USDC at best rate across DEXs", accent: true },
  ],
  [
    { text: "Create an agent wallet for subscriptions", accent: true },
    { text: "Send privately using stealth address" },
    { text: "Generate one-time payment address", accent: true },
  ],
  [
    { text: "Set auto-payment to Alice every Monday" },
    { text: "What's my portfolio worth?" },
    { text: "Sign with my Ledger device" },
    { text: "Export all my agent configurations" },
  ],
  [
    { text: "Pay via x402 micropayment protocol", accent: true },
    { text: "Enable notifications for large transactions" },
    { text: "Sweep all dust tokens to USDC" },
    { text: "Revoke dApp permissions for Uniswap" },
  ],
  [
    { text: "Monitor my spending heatmap" },
    { text: "Create a DCA bot for SOL", accent: true },
    { text: "Collect my stealth payments" },
  ],
];

const sectionFade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

function CommandPill({
  cmd,
  delay,
}: {
  cmd: Command;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1], delay }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.18 },
      }}
      className="group flex items-center gap-2 px-4 py-2.5 rounded-full glass cursor-default select-none"
      style={{
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {cmd.accent && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#ABFF7A]/60 shrink-0 group-hover:bg-[#ABFF7A] transition-colors duration-200" />
      )}
      <span className="text-[13px] text-white/55 group-hover:text-white/75 transition-colors duration-200 whitespace-nowrap">
        {cmd.text}
      </span>
    </motion.div>
  );
}

export default function CommandsShowcase() {
  return (
    <section id="commands" className="relative py-24 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "rgba(171,255,122,0.025)", filter: "blur(180px)" }}
      />

      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        {/* Section header */}
        <motion.div
          {...sectionFade}
          className="flex flex-col items-center text-center gap-3"
        >
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/25">
            AI Commands
          </p>
          <h2 className="text-[36px] sm:text-[44px] font-bold tracking-[-0.025em] text-white">
            Say anything.
            <br />
            <span className="text-shimmer">SOLAI gets it.</span>
          </h2>
          <p className="text-[15px] text-white/40 max-w-sm leading-relaxed">
            No forms, no menus. Just type what you want — in plain English.
          </p>
        </motion.div>

        {/* Command pill rows */}
        <div className="flex flex-col gap-3">
          {COMMAND_ROWS.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center gap-3"
            >
              {row.map((cmd, cmdIndex) => (
                <CommandPill
                  key={cmdIndex}
                  cmd={cmd}
                  delay={rowIndex * 0.08 + cmdIndex * 0.04}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom hint */}
        <motion.p
          {...sectionFade}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="text-center text-[12px] text-white/20"
        >
          And hundreds more — if you can describe it, SOLAI can do it.
        </motion.p>
      </div>
    </section>
  );
}
