"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CHROME_URL, INSTALL_LABEL } from "@/lib/constants";
import { springSoft } from "@/lib/motion";
import Button from "./ui/Button";

const NAV_LINKS = [
  { label: "SDK", href: "/sdk" },
  { label: "Guardrails", href: "#guardrails" },
  { label: "Wallet", href: "#wallet" },
];

interface NavbarProps {
  onOpenWaitlist: () => void;
  /** On /sdk the anchors live on the homepage, so link across instead. */
  anchorPrefix?: string;
}

const LINK_CLASS =
  "relative px-3 py-1.5 text-[13px] text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors duration-200 font-medium";

const MOBILE_LINK_CLASS =
  "text-[14px] text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors text-left font-medium";

/** A route (`/sdk`) navigates; an anchor (`#guardrails`) scrolls. */
function isRoute(href: string) {
  return href.startsWith("/");
}

/** Anchors only need the prefix when their section lives on another page. */
function resolveHref(href: string, anchorPrefix: string) {
  return isRoute(href) ? href : `${anchorPrefix}${href}`;
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  window.scrollTo({
    top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 56,
    behavior: "smooth",
  });
}

export default function Navbar({ onOpenWaitlist, anchorPrefix = "" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

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
          <div className="w-7 h-7 rounded-lg bg-white border border-[var(--hairline)] flex items-center justify-center overflow-hidden group-hover:border-[var(--accent-ink)]/30 transition-colors duration-300">
            <Image
              src="/solai-logo.png"
              width={18}
              height={18}
              alt="SOLAI"
              className="object-contain"
            />
          </div>
          <span className="text-[15px] font-dancing-script font-semibold text-[var(--ink)]">
            SOLAI
          </span>
        </Link>

        {/* Center links — a shared neon underline slides between them */}
        <div
          className="hidden md:flex items-center gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          {[...NAV_LINKS, { label: "Docs", href: "/doc" }].map((link) => {
            const marker = hovered === link.href && (
              <motion.span
                layoutId="nav-underline"
                transition={springSoft}
                className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-[var(--accent)]"
              />
            );

            // Route links navigate; anchors scroll on the page that owns them.
            if (isRoute(link.href) || anchorPrefix) {
              return (
                <Link
                  key={link.href}
                  href={resolveHref(link.href, anchorPrefix)}
                  onMouseEnter={() => setHovered(link.href)}
                  className={LINK_CLASS}
                >
                  {marker}
                  {link.label}
                </Link>
              );
            }

            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                onMouseEnter={() => setHovered(link.href)}
                className={LINK_CLASS}
              >
                {marker}
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-2.5">
          <a
            href={CHROME_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-[12px] text-[var(--ink-secondary)] hover:text-[var(--ink)] font-medium px-3.5 py-1.5 rounded-lg border border-[var(--hairline)] hover:border-[rgba(10,10,10,0.18)] transition-all duration-200"
          >
            {INSTALL_LABEL}
            <ArrowUpRight size={12} strokeWidth={2} />
          </a>

          <Button onClick={onOpenWaitlist} size="sm">
            Get early access
          </Button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`w-4.5 h-px bg-[var(--ink)] rounded-full transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`w-4.5 h-px bg-[var(--ink)] rounded-full transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-4.5 h-px bg-[var(--ink)] rounded-full transition-all duration-200 ${
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
            className="md:hidden border-t border-[var(--hairline)] bg-white/95 backdrop-blur-xl px-6 py-5 flex flex-col gap-4"
          >
            {[...NAV_LINKS, { label: "Docs", href: "/doc" }].map((link) =>
              isRoute(link.href) || anchorPrefix ? (
                <Link
                  key={link.href}
                  href={resolveHref(link.href, anchorPrefix)}
                  onClick={() => setMenuOpen(false)}
                  className={MOBILE_LINK_CLASS}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.href}
                  onClick={() => {
                    scrollTo(link.href);
                    setMenuOpen(false);
                  }}
                  className={MOBILE_LINK_CLASS}
                >
                  {link.label}
                </button>
              )
            )}
            <div className="flex flex-col gap-2.5 pt-2 border-t border-[var(--hairline)]">
              <a
                href={CHROME_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 text-[13px] text-[var(--ink-secondary)] hover:text-[var(--ink)] font-medium py-2.5 rounded-lg border border-[var(--hairline)] transition-all duration-200"
              >
                {INSTALL_LABEL}
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
              <button
                onClick={() => {
                  onOpenWaitlist();
                  setMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-[var(--accent)] text-[var(--ink)] text-[13px] font-semibold"
              >
                Get early access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
