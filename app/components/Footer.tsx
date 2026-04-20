"use client";

import Image from "next/image";

const CHROME_URL = "https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej";

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="text-[13px] text-white/35 hover:text-white/70 transition-colors duration-200 w-fit"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 pt-16 pb-10 px-6 overflow-hidden">
      {/* Top accent glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(171,255,122,0.15), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2.5 w-fit group">
              <div className="w-8 h-8 rounded-xl bg-[#111] border border-white/8 flex items-center justify-center overflow-hidden group-hover:border-[#ABFF7A]/20 transition-colors duration-300">
                <Image
                  src="/solai-logo.png"
                  width={20}
                  height={20}
                  alt="SOLAI"
                  className="object-contain"
                />
              </div>
              <span className="text-[16px] font-dancing-script font-semibold text-white/90">
                SOLAI
              </span>
            </a>
            <p className="text-[13px] text-white/30 leading-relaxed max-w-[200px]">
              The AI-powered Solana wallet. Plain English → on-chain actions.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-1">
              {/* X / Twitter */}
              <a
                href="https://x.com/solaiwallet"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/6 transition-all duration-200"
                aria-label="SOLAI on X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Chrome */}
              <a
                href={CHROME_URL}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/30 hover:text-white/70 hover:bg-white/6 transition-all duration-200"
                aria-label="Install SOLAI on Chrome"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                  <line x1="21.17" y1="8" x2="12" y2="8" />
                  <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
                  <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-1">
              Product
            </p>
            <FooterLink href="#features">Features</FooterLink>
            <FooterLink href="#how-it-works">How It Works</FooterLink>
            <FooterLink href="/doc">Documentation</FooterLink>
            <FooterLink href={CHROME_URL} external>
              Install Extension
            </FooterLink>
          </div>

          {/* Community */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-1">
              Community
            </p>
            <FooterLink href="https://x.com/solaiwallet" external>
              Twitter / X
            </FooterLink>
            <FooterLink href="#commands">Command Gallery</FooterLink>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/25 mb-1">
              Legal
            </p>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/term-condition">Terms of Service</FooterLink>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/5" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-white/25">
            © {new Date().getFullYear()} SOLAI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-[12px] text-white/25">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ABFF7A] animate-pulse" />
            Built on Solana
          </div>
        </div>
      </div>
    </footer>
  );
}
