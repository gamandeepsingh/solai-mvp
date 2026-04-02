"use client";

import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import ParticleCanvas from "./ParticleCanvas";
import SmoothScrollProvider from "./SmoothScrollProvider";
import PartnersSection from "./PartnersSection";
import TwitterMarquee from "./TwitterMarquee";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

export default function HomeContent() {
  return (
    <SmoothScrollProvider>
      <main className="relative bg-black min-h-screen">
        <ParticleCanvas />
        <HeroSection />
        <PartnersSection />
        <TwitterMarquee />
        <section className="bg-black border-t border-white/6 py-8 px-6">
          <div className="max-w-3xl mx-auto flex items-center justify-center gap-6 text-xs text-white/40">
            <a href="/privacy" className="hover:text-white/70 transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/15">•</span>
            <a href="/term-condition" className="hover:text-white/70 transition-colors">
              Terms and Conditions
            </a>
          </div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="absolute -bottom-16 right-0  text-[11px] text-white/50 mb-20"
          >
            © {new Date().getFullYear()} SOLAI. All rights reserved.
          </motion.p>
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
