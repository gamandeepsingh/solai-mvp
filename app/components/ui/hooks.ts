"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Cursor-tracked translate that releases back to center on leave.
 * Returns props to spread onto the element plus the x/y springs.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 300, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 300, damping: 22, mass: 0.4 });

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    rawY.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { ref, x, y, onMouseMove, onMouseLeave };
}
