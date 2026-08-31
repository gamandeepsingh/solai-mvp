"use client";

import Image from "next/image";
import Link from "next/link";
import { CHROME_URL, X_URL } from "@/lib/constants";

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "text-[13px] text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors duration-200 w-fit";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--ink-tertiary)] mb-1">
      {children}
    </p>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--hairline)] pt-16 pb-10 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 rounded-xl bg-white border border-[var(--hairline)] flex items-center justify-center overflow-hidden group-hover:border-[var(--accent-ink)]/30 transition-colors duration-300">
                <Image
                  src="/solai-logo.png"
                  width={20}
                  height={20}
                  alt="SOLAI"
                  className="object-contain"
                />
              </div>
              <span className="text-[16px] font-dancing-script font-semibold text-[var(--ink)]">
                SOLAI
              </span>
            </Link>
            <p className="text-[13px] text-[var(--ink-secondary)] leading-relaxed max-w-[220px]">
              Non-custodial DeFi agents on Solana. Guardrails included.
            </p>

            <div className="flex items-center gap-2 mt-1">
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[var(--hairline)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[rgba(10,10,10,0.18)] transition-all duration-200"
                aria-label="SOLAI on X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={CHROME_URL}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white border border-[var(--hairline)] flex items-center justify-center text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[rgba(10,10,10,0.18)] transition-all duration-200"
                aria-label="Install SOLAI on Chrome"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Developers */}
          <div className="flex flex-col gap-3">
            <ColumnHeading>Developers</ColumnHeading>
            <FooterLink href="/sdk">SOLAI SDK</FooterLink>
            <FooterLink href="/doc/sdk">SDK documentation</FooterLink>
            <FooterLink href="/sdk#guardrails-reference">Guardrails</FooterLink>
            <FooterLink href="/sdk#early-access">Early access</FooterLink>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <ColumnHeading>Product</ColumnHeading>
            <FooterLink href="/#wallet">SOLAI Wallet</FooterLink>
            <FooterLink href="/doc/wallet">Wallet documentation</FooterLink>
            <FooterLink href="/#how-it-works">How it works</FooterLink>
            <FooterLink href={CHROME_URL} external>
              Chrome extension
            </FooterLink>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <ColumnHeading>Legal</ColumnHeading>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/term-condition">Terms of Service</FooterLink>
          </div>
        </div>

        <div className="w-full h-px bg-[var(--hairline)]" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--ink-tertiary)]">
            © {new Date().getFullYear()} SOLAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-[var(--ink-tertiary)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ink)] animate-pulse" />
            Built on Solana
          </div>
        </div>
      </div>
    </footer>
  );
}
