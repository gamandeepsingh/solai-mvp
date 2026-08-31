"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Coins, Layers, Wallet, X, type LucideIcon } from "lucide-react";
import { springSoft, staggerChild, staggerParent } from "@/lib/motion";
import Section from "./ui/Section";
import { Highlight, Reveal, RevealLine, RevealLines } from "./ui/Reveal";
import { cn } from "@/lib/utils";

interface Spec {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const SPECS: Spec[] = [
  {
    Icon: Wallet,
    title: "Spending limits",
    body: "A daily ceiling and a per-transaction cap. The agent cannot move more than the user budgeted, ever.",
  },
  {
    Icon: Coins,
    title: "Token allowlist",
    body: "Name the tokens the agent may touch. Everything else is refused before a signature is requested.",
  },
  {
    Icon: Layers,
    title: "Protocol allowlist",
    body: "Pin execution to the venues you trust — Jupiter, Kamino, your own program. Nothing routes elsewhere.",
  },
];

interface Request {
  action: string;
  allowed: boolean;
  reason: string;
}

const REQUESTS: Request[] = [
  { action: "swap 50 USDC → SOL via Jupiter", allowed: true, reason: "allowed" },
  { action: "pay 12 USDC to alice.sol", allowed: true, reason: "allowed" },
  { action: "send 900 USDC", allowed: false, reason: "exceeds dailyLimit (500)" },
  { action: "swap SOL → BONK", allowed: false, reason: "token not in allowlist" },
];

const POLICY_ROWS = [
  { key: "dailyLimit", value: "500 USDC" },
  { key: "perTxLimit", value: "100 USDC" },
];

const POLICY_CHIPS = [
  { key: "tokens", values: ["SOL", "USDC", "JUP"] },
  { key: "protocols", values: ["jupiter", "kamino"] },
];

function PolicySheet() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative rounded-2xl bg-white border border-[var(--hairline)] overflow-hidden"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      {/* Evaluation sweep */}
      {!reduced && (
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-px animate-scan"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }}
          />
        </div>
      )}

      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--hairline)] bg-[var(--bg-subtle)]">
        <span className="text-[12px] font-mono text-[var(--ink-secondary)]">
          treasury-bot · policy
        </span>
        <span className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--accent-ink)] px-2 py-1 rounded-md bg-[var(--accent-wash)]">
          Signed by user
        </span>
      </div>

      <div className="flex flex-col divide-y divide-[var(--hairline-soft)]">
        {POLICY_ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between px-5 py-3.5">
            <span className="text-[13px] font-mono text-[var(--ink-secondary)]">
              {row.key}
            </span>
            <span className="text-[13px] font-mono font-medium text-[var(--ink)]">
              {row.value}
            </span>
          </div>
        ))}

        {POLICY_CHIPS.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between gap-3 px-5 py-3.5"
          >
            <span className="text-[13px] font-mono text-[var(--ink-secondary)] shrink-0">
              {row.key}
            </span>
            <div className="flex flex-wrap justify-end gap-1.5">
              {row.values.map((value) => (
                <span
                  key={value}
                  className="text-[11px] font-mono px-2 py-1 rounded-md bg-[var(--accent-wash)] text-[var(--accent-ink)] border border-[rgba(46,107,18,0.14)]"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestLedger() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % REQUESTS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div
      className="rounded-2xl bg-white border border-[var(--hairline)] overflow-hidden"
      style={{ boxShadow: "var(--shadow-md)" }}
    >
      <div className="px-5 py-3 border-b border-[var(--hairline)] bg-[var(--bg-subtle)]">
        <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--ink-tertiary)]">
          Agent requests
        </span>
      </div>

      <div className="flex flex-col">
        {REQUESTS.map((req, i) => {
          const isActive = reduced || i === active;

          return (
            <div
              key={req.action}
              className={cn(
                "relative flex items-center justify-between gap-3 px-5 py-3.5 transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-35"
              )}
            >
              {/* Shared neon bar slides to the row under evaluation */}
              {!reduced && i === active && (
                <motion.span
                  layoutId="ledger-marker"
                  transition={springSoft}
                  className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-[var(--accent)]"
                />
              )}

              <span className="text-[12.5px] font-mono text-[var(--ink)] truncate">
                {req.action}
              </span>

              <span
                className={cn(
                  "flex items-center gap-1.5 shrink-0 text-[11px] font-medium px-2 py-1 rounded-md",
                  req.allowed
                    ? "text-[var(--accent-ink)] bg-[var(--accent-wash)]"
                    : "text-[var(--danger)] bg-[var(--danger-wash)]"
                )}
              >
                {req.allowed ? (
                  <Check size={12} strokeWidth={2.5} />
                ) : (
                  <X size={12} strokeWidth={2.5} />
                )}
                {req.reason}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GuardrailsSection() {
  return (
    <Section id="guardrails" subtle blob="center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        {/* Left — the argument */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--ink-tertiary)]">
                Guardrails
              </p>
            </Reveal>

            <RevealLines
              className="text-[36px] sm:text-[46px] font-semibold tracking-[-0.035em] leading-[1.02] text-[var(--ink)]"
              delay={0.05}
            >
              <RevealLine>Agents get keys.</RevealLine>
              <RevealLine>
                Never a <Highlight>blank cheque.</Highlight>
              </RevealLine>
            </RevealLines>

            <Reveal delay={0.12}>
              <p className="text-[15px] text-[var(--ink-secondary)] leading-relaxed max-w-md">
                An autonomous agent with unlimited authority is just a hot wallet with
                extra steps. In SOLAI, the user writes the policy and signs it — and the
                SDK refuses anything outside it before a transaction is ever built.
              </p>
            </Reveal>
          </div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-5"
          >
            {SPECS.map(({ Icon, title, body }) => (
              <motion.div key={title} variants={staggerChild} className="flex gap-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "var(--accent-wash)",
                    border: "1px solid rgba(46,107,18,0.18)",
                  }}
                >
                  <Icon size={16} strokeWidth={1.8} className="text-[var(--accent-ink)]" />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-semibold text-[var(--ink)] tracking-[-0.01em]">
                    {title}
                  </h3>
                  <p className="text-[13.5px] text-[var(--ink-secondary)] leading-relaxed">
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right — the policy, and it being enforced */}
        <Reveal delay={0.1} className="flex flex-col gap-4">
          <PolicySheet />
          <RequestLedger />
        </Reveal>
      </div>
    </Section>
  );
}
