"use client";

import { motion } from "framer-motion";
import { revealUp, springSoft } from "@/lib/motion";

const fadeUp = revealUp;

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
        fill="currentColor"
      />
      <path
        d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1L333.1 73.8c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z"
        fill="currentColor"
      />
      <path
        d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Superteam Logo (wordmark, white) ────────────────────────────────
function SuperteamLogo({ className }: { className?: string }) {
  return (
    <svg className={className} width="42" height="32" viewBox="0 0 42 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><defs><clipPath id="clip0">
              <polygon points="0 0, 20 0, 20 16, 0 16"></polygon>
              <polygon points="0 16, 20 16, 20 32, 0 32"></polygon>
              <polygon points="20 0, 42 0, 42 32, 20 32"></polygon>
            </clipPath></defs><path  d="M32.6944 4.90892H41.4468V8.28973C41.4468 12.8741 37.742 16.5795 33.1571 16.5795H32.6938L32.6944 4.90892ZM20.2372 0H32.6944V31.9071H31.2127C22.1822 31.9071 20.3765 25.6088 20.3765 20.0055L20.2372 0ZM0 7.22433C0 12.9205 4.07522 15.0043 8.61369 15.6993H0V32H8.28973C16.6252 32 17.5978 28.2952 17.5978 24.7757C17.5978 20.4688 14.6338 17.459 10.0495 16.3007H17.5978V0H9.30807C0.972554 0 0 3.70477 0 7.22433Z" fill="currentColor"></path></svg>
  );
}

export default function PartnersSection() {
  return (
    <section className="relative border-t border-[var(--hairline)] py-24 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-10">
        {/* Heading */}
        <motion.div {...fadeUp} className="flex flex-col items-center gap-2">
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--ink-tertiary)]">
            Built within the ecosystem
          </p>
          <h2 className="text-[26px] sm:text-[30px] font-semibold text-[var(--ink)] tracking-[-0.02em]">
            Built on Solana
          </h2>
          <p className="text-[13px] text-[var(--ink-secondary)] mt-1">
            In the Superteam ecosystem
          </p>
        </motion.div>

        {/* Logos */}
        <motion.div
          {...fadeUp}
          transition={{ ...springSoft, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          <div className="group">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[var(--hairline)] text-[var(--ink)] opacity-55 group-hover:opacity-100 transition-opacity duration-300">
              <SolanaLogo className="h-6 w-auto" />
              <span className="text-[18px] font-bold tracking-tight">Solana</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-[var(--hairline)]" />
          <div className="sm:hidden w-8 h-px bg-[var(--hairline)]" />

          <div className="group">
            <div className="flex items-center justify-center px-5 py-3 rounded-2xl bg-white border border-[var(--hairline)] text-[var(--ink)] opacity-55 group-hover:opacity-100 transition-opacity duration-300">
              <SuperteamLogo className="h-7 w-auto" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
