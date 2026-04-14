"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CHROME_URL =
  "https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Commands", href: "#commands" },
];

interface NavbarProps {
  onOpenWaitlist: () => void;
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  window.scrollTo({
    top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 56,
    behavior: "smooth",
  });
}

export default function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll-aware glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cursor glow (global, injected once)
  useEffect(() => {
    const el = document.createElement("div");
    el.className = "cursor-glow";
    document.body.appendChild(el);
    const move = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      el.remove();
    };
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener("scroll", close, { once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#111] border border-white/8 flex items-center justify-center overflow-hidden group-hover:border-[#ABFF7A]/25 transition-colors duration-300">
            <Image
              src="/solai-logo.png"
              width={18}
              height={18}
              alt="SOLAI"
              className="object-contain"
            />
          </div>
          <span className="text-[15px] font-dancing-script font-semibold text-white/90">
            SOLAI
          </span>
        </Link>

        {/* Center nav links (desktop) */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[13px] text-white/40 hover:text-white/80 transition-colors duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Join Waitlist — desktop only */}
          <button
            onClick={onOpenWaitlist}
            className="hidden sm:flex items-center gap-1.5 text-[12px] text-white/45 hover:text-white/75 font-medium px-3.5 py-1.5 rounded-lg border border-white/8 hover:border-white/18 transition-all duration-200"
          >
            Join Waitlist
          </button>

          {/* Install — always visible */}
          <motion.a
            href={CHROME_URL}
            target="_blank"
            rel="noreferrer"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 16px rgba(171,255,122,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ABFF7A] text-black text-[12px] font-semibold tracking-wide"
          >
            Install Beta
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 6H10M6 2L10 6L6 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-4.5 h-px bg-white/60 rounded-full transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-4.5 h-px bg-white/60 rounded-full transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-4.5 h-px bg-white/60 rounded-full transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden border-t border-white/6 bg-black/90 backdrop-blur-xl px-6 py-5 flex flex-col gap-4"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  scrollTo(link.href);
                  setMenuOpen(false);
                }}
                className="text-[14px] text-white/55 hover:text-white/85 transition-colors text-left font-medium"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-white/6">
              <button
                onClick={() => {
                  onOpenWaitlist();
                  setMenuOpen(false);
                }}
                className="w-full text-[13px] text-white/55 hover:text-white/80 font-medium py-2.5 rounded-lg border border-white/8 hover:border-white/18 transition-all duration-200"
              >
                Join Waitlist
              </button>
              <a
                href={CHROME_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#ABFF7A] text-black text-[13px] font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                Install Free
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
