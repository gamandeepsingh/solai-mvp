"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

// ─── Solana Logo (white) ──────────────────────────────────────────────
function SolanaLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 397 311"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Solana"
    >
      <path
        d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z"
        fill="white"
      />
      <path
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1L333.1 73.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
        fill="white"
      />
      <path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
        fill="white"
      />
    </svg>
  );
}

// ─── Superteam Logo (wordmark, white) ────────────────────────────────
function SuperteamLogo({ className }: { className?: string }) {
  return (
    <svg className={className} width="42" height="32" viewBox="0 0 42 32" fill="white" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="clip0">
              <polygon points="0 0, 20 0, 20 16, 0 16"></polygon>
              <polygon points="0 16, 20 16, 20 32, 0 32"></polygon>
              <polygon points="20 0, 42 0, 42 32, 20 32"></polygon>
            </clipPath></defs><path  d="M32.6944 4.90892H41.4468V8.28973C41.4468 12.8741 37.742 16.5795 33.1571 16.5795H32.6938L32.6944 4.90892ZM20.2372 0H32.6944V31.9071H31.2127C22.1822 31.9071 20.3765 25.6088 20.3765 20.0055L20.2372 0ZM0 7.22433C0 12.9205 4.07522 15.0043 8.61369 15.6993H0V32H8.28973C16.6252 32 17.5978 28.2952 17.5978 24.7757C17.5978 20.4688 14.6338 17.459 10.0495 16.3007H17.5978V0H9.30807C0.972554 0 0 3.70477 0 7.22433Z" fill="white"></path></svg>
  );
}

export default function PartnersSection() {
  return (
    <section className="relative border-t border-white/6 py-20 px-6 overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-white/6" />

      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-10">

        {/* Heading */}
        <motion.div {...fadeUp} className="flex flex-col items-center gap-2">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-white/25">
            Built within the ecosystem
          </p>
          <h2 className="text-[22px] sm:text-[26px] font-semibold text-white/80 tracking-tight">
            On Solana
          </h2>
        </motion.div>

        {/* Logos */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16"
        >
          {/* Solana */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="flex items-center gap-3 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
              <SolanaLogo className="h-7 w-auto" />
              <span className="text-white text-xl font-bold tracking-tight">Solana</span>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div className="sm:hidden w-8 h-px bg-white/10" />

          {/* Superteam */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="opacity-50 group-hover:opacity-80 transition-opacity duration-300">
              <SuperteamLogo className="h-7 w-auto" />
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-[11px] text-white/20"
        >
          © {new Date().getFullYear()} SOLAI. All rights reserved.
        </motion.p>

      </div>
    </section>
  );
}
