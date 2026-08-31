"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import type { Components } from "react-markdown";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CHROME_URL } from "@/lib/constants";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ink)] mb-4 mt-2 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-semibold text-[var(--ink)] mt-12 mb-4 pb-3 border-b border-[var(--hairline)] flex items-center gap-3">
      <span className="w-1 h-5 bg-[var(--accent)] rounded-full shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base sm:text-lg font-medium text-[var(--ink)] mt-7 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[14px] text-[var(--ink-secondary)] leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => <ul className="mb-4 space-y-2 pl-5">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 pl-5 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[14px] text-[var(--ink-secondary)] leading-relaxed list-disc marker:text-[var(--accent-ink)]">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="text-[var(--ink)] font-semibold">{children}</strong>
  ),
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    // Code blocks keep the dark surface; inline code sits on the light page.
    if (isBlock) {
      return <code className="text-[#D4D4D8] text-[13px] font-mono">{children}</code>;
    }
    return (
      <code className="bg-[var(--accent-wash)] text-[var(--accent-ink)] px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-[rgba(46,107,18,0.16)]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-[var(--bg-code)] border border-[rgba(255,255,255,0.08)] rounded-xl p-5 overflow-x-auto mb-5 mt-2">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-[var(--hairline)]">
      <table className="w-full border-collapse text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--bg-subtle)] border-b border-[var(--hairline)]">
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-[var(--hairline-soft)] last:border-0 hover:bg-[var(--surface)] transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="text-left py-3 px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--ink-tertiary)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-3 px-5 text-[var(--ink-secondary)] align-top">{children}</td>
  ),
  hr: () => <hr className="border-[var(--hairline)] my-10" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--accent-ink)] pl-4 my-4 text-[var(--ink-secondary)] italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="text-[var(--accent-ink)] hover:opacity-75 underline underline-offset-2 transition-opacity duration-150"
    >
      {children}
    </a>
  ),
};

interface DocContentProps {
  content: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Where the header's back link points, and what it says. */
  backHref?: string;
  backLabel?: string;
  /** Sibling doc to offer at the foot of the page. */
  sibling?: { href: string; label: string; description: string };
}

export default function DocContent({
  content,
  eyebrow = "SOLAI",
  title = "Documentation",
  subtitle = "Everything you need to know about SOLAI — features, architecture, security model, and the AI command interface.",
  backHref = "/",
  backLabel = "Back to Home",
  sibling,
}: DocContentProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      {/* Header */}
      <header className="sticky top-0 z-50 nav-glass">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
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

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--accent-ink)] hidden sm:block">
              {eyebrow}
            </span>
            <Link
              href={backHref}
              className="flex items-center gap-1.5 text-[12px] text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors duration-200 font-medium"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              {backLabel}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="relative border-b border-[var(--hairline)] overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[360px] rounded-full pointer-events-none opacity-55"
          style={{ background: "var(--accent-blob)", filter: "blur(170px)" }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[var(--accent-ink)] mb-4">
            {eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--ink)] mb-4 tracking-[-0.03em]">
            {title}
          </h1>
          <p className="text-[15px] text-[var(--ink-secondary)] max-w-xl leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Markdown content */}
      <main className="max-w-4xl mx-auto px-6 py-14 pb-24">
        <article>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {content}
          </ReactMarkdown>
        </article>
      </main>

      {/* Sibling doc */}
      {sibling && (
        <div className="border-t border-[var(--hairline)] py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <Link
              href={sibling.href}
              className="group flex items-center justify-between gap-6 p-6 rounded-2xl bg-white border border-[var(--hairline)] hover:border-[rgba(10,10,10,0.18)] transition-colors duration-200"
              style={{ boxShadow: "var(--shadow-sm)" }}
            >
              <div>
                <p className="text-[13px] text-[var(--ink-tertiary)] mb-1">
                  Looking for the other one?
                </p>
                <p className="text-[15px] text-[var(--ink)] font-medium mb-1">
                  {sibling.label}
                </p>
                <p className="text-[13px] text-[var(--ink-secondary)]">
                  {sibling.description}
                </p>
              </div>
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="shrink-0 text-[var(--ink-tertiary)] group-hover:text-[var(--accent-ink)] group-hover:translate-x-0.5 transition-all duration-200"
              />
            </Link>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="border-t border-[var(--hairline)] py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[13px] text-[var(--ink-tertiary)] mb-1">
              Ready to try it?
            </p>
            <p className="text-[15px] text-[var(--ink)] font-medium">
              Install SOLAI Wallet from the Chrome Web Store
            </p>
          </div>
          <a
            href={CHROME_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-glow flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-[var(--ink)] text-[13px] font-semibold transition-all shrink-0"
          >
            Install free
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </div>
  );
}
