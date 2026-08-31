"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Lenis takes over scrolling after the browser has already handled any
    // load-time fragment, which leaves cross-page anchors (/#guardrails from
    // /sdk, the footer links) sitting at the top. Re-apply the hash once
    // Lenis is driving, and keep handling hash changes while mounted.
    const scrollToHash = (immediate: boolean) => {
      const { hash } = window.location;
      if (!hash || hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      lenis.scrollTo(target as HTMLElement, { offset: -56, immediate });
    };

    const initialScroll = requestAnimationFrame(() => scrollToHash(true));
    const onHashChange = () => scrollToHash(false);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(initialScroll);
      window.removeEventListener("hashchange", onHashChange);
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user" drops transform animations for anyone who asks for
  // reduced motion, so the shared stagger/mask variants land in their end
  // state instead of sliding. Opacity fades are kept — they are safe.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
