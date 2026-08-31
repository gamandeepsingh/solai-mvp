"use client";

import { cn } from "@/lib/utils";
import { Reveal, RevealLine, RevealLines } from "./Reveal";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  /** Off-white ground — alternate with white to give the scroll rhythm. */
  subtle?: boolean;
  /** Soft neon ambient blob behind the content. */
  blob?: "none" | "top" | "center";
  className?: string;
  width?: "default" | "wide";
}

export default function Section({
  id,
  children,
  subtle = false,
  blob = "top",
  className,
  width = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-24 sm:py-28 px-6 overflow-hidden",
        subtle && "bg-[var(--bg-subtle)]",
        className
      )}
    >
      {blob !== "none" && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full",
            blob === "top"
              ? "-top-20 w-[720px] h-[380px]"
              : "top-1/2 -translate-y-1/2 w-[760px] h-[420px]"
          )}
          style={{
            background: "var(--accent-blob)",
            filter: "blur(170px)",
            opacity: 0.5,
          }}
        />
      )}

      <div
        className={cn(
          "relative z-10 mx-auto",
          width === "wide" ? "max-w-7xl" : "max-w-6xl"
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  /** One entry per visual line. Strings or JSX (for <Highlight>). */
  headline: React.ReactNode[];
  sub?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  headline,
  sub,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <Reveal>
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--ink-tertiary)]">
          {eyebrow}
        </p>
      </Reveal>

      <RevealLines
        className={cn(
          "text-[36px] sm:text-[46px] font-semibold tracking-[-0.035em] leading-[1.02] text-[var(--ink)]",
          align === "center" ? "text-center" : "text-left"
        )}
        delay={0.05}
      >
        {headline.map((line, i) => (
          <RevealLine key={i}>{line}</RevealLine>
        ))}
      </RevealLines>

      {sub && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "text-[15px] text-[var(--ink-secondary)] leading-relaxed",
              align === "center" ? "max-w-md mx-auto" : "max-w-md"
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
