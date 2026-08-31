"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Token kinds, tinted by hand — the snippets are short and fixed, so no
 *  syntax-highlighting library ships to the client. */
export type TokenKind = "kw" | "str" | "com" | "fn" | "num" | "prop" | "plain";

export interface Token {
  t: string;
  c?: TokenKind;
}

export type CodeLine = Token[];

/** Neon runs at full 17:1 strength here — this is the one dark surface. */
const TINT: Record<TokenKind, string> = {
  kw: "#ABFF7A",
  str: "#E4E4E7",
  com: "#52525B",
  fn: "#C7F5A8",
  num: "#E4E4E7",
  prop: "#A1A1AA",
  plain: "#D4D4D8",
};

/**
 * Absolute character offset at which each token starts, counting one extra
 * character per line break. Module scope so the accumulator is not a
 * reassignment inside render.
 */
function buildTokenOffsets(lines: CodeLine[]): number[][] {
  const offsets: number[][] = [];
  let n = 0;

  for (const line of lines) {
    const lineOffsets: number[] = [];
    for (const token of line) {
      lineOffsets.push(n);
      n += token.t.length;
    }
    offsets.push(lineOffsets);
    n += 1; // newline
  }

  return offsets;
}

interface CodeBlockProps {
  filename?: string;
  lines: CodeLine[];
  /** Character-by-character reveal, looping. */
  typewriter?: boolean;
  /** Fixed content height so a looping reveal cannot shift layout. */
  height?: number;
  /** Raw text for the copy button. Omit to hide the button. */
  copyText?: string;
  footer?: React.ReactNode;
  className?: string;
}

export default function CodeBlock({
  filename,
  lines,
  typewriter = false,
  height,
  copyText,
  footer,
  className,
}: CodeBlockProps) {
  const reduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const totalChars = useMemo(
    () => lines.reduce((n, line) => n + line.reduce((m, t) => m + t.t.length, 0) + 1, 0),
    [lines]
  );

  const animate = typewriter && !reduced;
  const [progress, setProgress] = useState(0);
  // Derived rather than synced, so the effect never setStates synchronously.
  const revealed = animate ? progress : totalChars;

  useEffect(() => {
    if (!animate) return;

    let frame: number;
    let timeout: ReturnType<typeof setTimeout>;
    let count = 0;

    const tick = () => {
      count += 2;
      setProgress(count);
      if (count < totalChars) {
        timeout = setTimeout(() => {
          frame = requestAnimationFrame(tick);
        }, 16);
      } else {
        // Hold on the finished snippet, then restart.
        timeout = setTimeout(() => {
          count = 0;
          setProgress(0);
          frame = requestAnimationFrame(tick);
        }, 3200);
      }
    };

    timeout = setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, 600);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
    };
  }, [animate, totalChars]);

  async function handleCopy() {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — nothing useful to show */
    }
  }

  const offsets = useMemo(() => buildTokenOffsets(lines), [lines]);

  // Emit only the portion of each token revealed so far.
  const rendered = useMemo(
    () =>
      lines.map((line, li) => (
        <div key={li} className="min-h-[1.55em] whitespace-pre">
          {line.map((token, ti) => {
            const visible = Math.max(
              0,
              Math.min(token.t.length, revealed - offsets[li][ti])
            );
            if (visible <= 0) return null;
            return (
              <span key={ti} style={{ color: TINT[token.c ?? "plain"] }}>
                {token.t.slice(0, visible)}
              </span>
            );
          })}
        </div>
      )),
    [lines, offsets, revealed]
  );

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)]",
        className
      )}
      style={{
        background: "var(--bg-code)",
        boxShadow: "0 24px 56px -20px rgba(10,10,10,0.45), 0 2px 8px rgba(10,10,10,0.08)",
      }}
    >
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[rgba(255,255,255,0.07)] bg-[#0F0F0F]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ABFF7A]" />
            <span className="text-[12px] text-[#A1A1AA] font-mono">{filename}</span>
          </div>
          {copyText && (
            <button
              onClick={handleCopy}
              aria-label="Copy code"
              className="flex items-center gap-1.5 text-[11px] text-[#A1A1AA] hover:text-white transition-colors duration-150 px-2 py-1 rounded-md hover:bg-white/5"
            >
              {copied ? (
                <>
                  <Check size={12} strokeWidth={2} className="text-[#ABFF7A]" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={12} strokeWidth={2} />
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      )}

      <motion.div
        className="px-4 sm:px-5 py-4 font-mono text-[12.5px] sm:text-[13px] leading-[1.55] overflow-x-auto"
        style={height ? { height } : undefined}
      >
        {rendered}
      </motion.div>

      {footer && (
        <div className="px-4 sm:px-5 py-3 border-t border-[rgba(255,255,255,0.07)] bg-[#0F0F0F]">
          {footer}
        </div>
      )}
    </div>
  );
}
