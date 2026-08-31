import type { Transition, Variants } from "framer-motion";

/** Hover / tap — quick and tight. */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

/** Layout and shared-element transitions — softer settle. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 200,
  damping: 26,
};

/** Standard section entrance. */
export const revealUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: springSoft,
};

/** Parent of a staggered group. Pair with `staggerChild` on each item. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: springSoft },
};

/**
 * Signature headline entrance: each line lives in an `overflow-hidden`
 * wrapper and slides up from below its own mask.
 */
export const maskReveal: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { type: "spring", stiffness: 180, damping: 24 },
  },
};

export const maskParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/** Card lift used across every grid. */
export const cardHover = {
  y: -4,
  transition: springSnappy,
};
