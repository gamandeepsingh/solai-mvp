"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Image from "next/image";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 mt-2 leading-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl sm:text-2xl font-semibold text-white mt-12 mb-4 pb-3 border-b border-white/8 flex items-center gap-3">
      <span className="w-1 h-5 bg-[#ABFF7A] rounded-full shrink-0" />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base sm:text-lg font-medium text-white/90 mt-7 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[14px] text-white/60 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 space-y-2 pl-5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 space-y-2 pl-5 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[14px] text-white/60 leading-relaxed list-disc marker:text-[#ABFF7A]/50">
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="text-white/90 font-semibold">{children}</strong>
  ),
  code: ({ className, children, ...props }) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <code className="text-white/80 text-[13px] font-mono">{children}</code>
      );
    }
    return (
      <code className="bg-white/6 text-[#ABFF7A] px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-white/8">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-[#0a0a0a] border border-white/8 rounded-xl p-5 overflow-x-auto mb-5 mt-2">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-white/8">
      <table className="w-full border-collapse text-[13px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/3 border-b border-white/8">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="text-left py-3 px-5 text-[11px] font-semibold tracking-[0.1em] uppercase text-white/30">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-3 px-5 text-white/55 align-top">{children}</td>
  ),
  hr: () => <hr className="border-white/8 my-10" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[#ABFF7A]/40 pl-4 my-4 text-white/45 italic">
      {children}
    </blockquote>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="text-[#ABFF7A] hover:text-[#ABFF7A]/75 underline underline-offset-2 transition-colors duration-150"
    >
      {children}
    </a>
  ),
};

export default function DocContent({ content }: { content: string }) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/6 bg-black/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
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

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#ABFF7A]/70 hidden sm:block">
              Documentation
            </span>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/75 transition-colors duration-200 font-medium"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="relative border-b border-white/6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(171,255,122,0.06), transparent)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(171,255,122,0.2), transparent)" }}
        />
        <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#ABFF7A]/60 mb-4">
            SOLAI Wallet
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Documentation
          </h1>
          <p className="text-[15px] text-white/45 max-w-xl leading-relaxed">
            Everything you need to know about SOLAI — features, architecture, security model, and the AI command interface.
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

      {/* Bottom CTA */}
      <div className="border-t border-white/6 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[13px] text-white/40 mb-1">Ready to try it?</p>
            <p className="text-[15px] text-white/70 font-medium">Install SOLAI from the Chrome Web Store</p>
          </div>
          <a
            href="https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ABFF7A] text-black text-[13px] font-semibold hover:opacity-90 transition-opacity shrink-0"
          >
            Install Free
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6H10M6 2L10 6L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
