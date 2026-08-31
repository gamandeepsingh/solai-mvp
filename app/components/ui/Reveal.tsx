"use client";

import { motion, useReducedMotion } from "framer-motion";
import { maskParent, maskReveal, springSoft } from "@/lib/motion";

/**
 * Masked line reveal — each child slides up from behind its own clip.
 * Use one <RevealLine> per visual line of a headline.
 */
export function RevealLines({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={maskParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealLine({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <span className="block">{children}</span>;

  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span className="block" variants={maskReveal}>
        {children}
      </motion.span>
    </span>
  );
}

/** Simple fade-and-rise for non-headline content. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Neon swipe that paints in behind a headline word when it enters view.
 * Drives the `--swipe` custom property consumed by `.text-highlight`.
 */
export function Highlight({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className="text-highlight"
      initial={reduced ? false : ({ "--swipe": 0 } as never)}
      whileInView={{ "--swipe": 1 } as never}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1], delay: 0.25 }}
    >
      {children}
    </motion.span>
  );
}
