"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

// ─── Chat Data ───────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "ai";
  text: string;
  meta?: string;
  time: string;
}

const CHAT_MESSAGES: ChatMessage[] = [
  { role: "user", text: "Send $5 to mom every day", time: "9:01 AM" },
  { role: "ai",   text: "Done. Recurring payment set up — $5 daily to mom starting tomorrow.", meta: "Scheduled · Daily at 9:00 AM", time: "9:01 AM" },
  { role: "user", text: "Buy 0.1 ETH if price drops 10%", time: "9:02 AM" },
  { role: "ai",   text: "Got it. I'll monitor ETH and place the order automatically when the condition hits.", meta: "Watching · ETH/USD", time: "9:02 AM" },
  { role: "user", text: "Swap USDC to SOL at the best rate", time: "9:03 AM" },
  { role: "ai",   text: "Checked 4 routes. Best rate is via Jupiter — saving you $2.40 vs average.", meta: "Executed · Jupiter DEX", time: "9:03 AM" },
];

// ─── Typing Dots ──────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-center gap-1.25 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-white/40"
          animate={{ opacity: [0.25, 0.85, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Chat Bubble ──────────────────────────────────────────────────────
function ChatBubble({ msg, chatKey }: { msg: ChatMessage; chatKey: number }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
      key={`${chatKey}-${msg.time}`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#161616] border border-white/8 flex items-center justify-center shrink-0 mb-0.5 overflow-hidden">
          <Image src="/solai-logo.png" width={14} height={14} alt="SOLAI" className="object-contain" />
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[76%] ${isUser ? "items-end" : "items-start"}`}>
        {/* Bubble */}
        <div
          className={`px-3.5 py-2.5 text-[13px] leading-[1.55] ${
            isUser
              ? "bg-[#202020] text-white/85 rounded-2xl rounded-br-[5px]"
              : "bg-[#141414] text-white/80 rounded-2xl rounded-bl-[5px] border border-white/6"
          }`}
        >
          {msg.text}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 px-0.5">
          <span className="text-[10px] text-white/20">{msg.time}</span>
          {msg.meta && (
            <>
              <span className="text-white/15 text-[10px]">·</span>
              <span className="text-[10px] text-[#ABFF7A]/50 flex items-center gap-1">
                <span className="w-1.25 h-1.25 rounded-full bg-[#ABFF7A]/50 inline-block" />
                {msg.meta}
              </span>
            </>
          )}
        </div>
      </div>

      {/* User avatar placeholder */}
      {isUser && (
        <div className="w-6 h-6 rounded-full bg-[#242424] border border-white/8 flex items-center justify-center shrink-0 mb-0.5 text-[9px] text-white/40 font-medium">
          U
        </div>
      )}
    </motion.div>
  );
}

// ─── Chat Demo ────────────────────────────────────────────────────────
function ChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sequential reveal
  useEffect(() => {
    if (visibleCount >= CHAT_MESSAGES.length) return;

    const isAI = CHAT_MESSAGES[visibleCount].role === "ai";
    const baseDelay = visibleCount === 0 ? 800 : 650;
    const typingMs = isAI ? 1000 : 0;

    const t1 = setTimeout(() => {
      if (isAI) setShowTyping(true);
    }, baseDelay);

    const t2 = setTimeout(() => {
      setShowTyping(false);
      setVisibleCount((c) => c + 1);
    }, baseDelay + typingMs);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visibleCount]);

  // Smooth scroll to bottom
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleCount, showTyping]);

  // Restart loop
  useEffect(() => {
    if (visibleCount < CHAT_MESSAGES.length) return;
    const t = setTimeout(() => {
      setVisibleCount(0);
      setChatKey((k) => k + 1);
    }, 3800);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Subtle glow behind */}
      <motion.div
        className="absolute -inset-8 rounded-3xl pointer-events-none"
        animate={{ opacity: [0.03, 0.09, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse at 50% 60%, #ABFF7A 0%, transparent 68%)" }}
      />

      {/* Chat window */}
      <div className="relative rounded-2xl border border-white/8 bg-[#080808] overflow-hidden"
        style={{ boxShadow: "0 32px 64px -12px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/6 bg-[#0b0b0b]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#111] border border-white/8 flex items-center justify-center overflow-hidden">
              <Image src="/solai-logo.png" width={22} height={22} alt="SOLAI" className="object-contain" />
            </div>
            <div>
              <p className="text-[13px] font-dancing-script font-semibold text-white/85 leading-none">SOLAI</p>
              <p className="text-[10px] text-white/30 mt-0.5">AI Wallet</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ABFF7A] animate-pulse" />
            <span className="text-[11px] text-white/35">Online</span>
          </div>
        </div>

        {/* ── Messages (FIXED height = no jerking) ── */}
        <div
          ref={scrollRef}
          className="flex flex-col gap-3.5 px-4 py-4 overflow-y-auto"
          style={{ height: "280px", scrollbarWidth: "none" }}
        >
          {CHAT_MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <ChatBubble key={`${chatKey}-${i}`} msg={msg} chatKey={chatKey} />
          ))}

          <AnimatePresence>
            {showTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.22 }}
                className="flex items-end gap-2 justify-start"
              >
                <div className="w-6 h-6 rounded-full bg-[#161616] border border-white/8 flex items-center justify-center shrink-0 overflow-hidden">
                  <Image src="/solai-logo.png" width={12} height={12} alt="SOLAI" className="object-contain" />
                </div>
                <div className="bg-[#141414] border border-white/6 rounded-2xl rounded-bl-[5px] px-3.5 py-2.5">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Input bar ── */}
        <div className="border-t border-white/6 px-4 py-3 bg-[#0b0b0b] flex items-center gap-2.5">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#111] border border-white/[0.07]">
            <span className="text-[13px] text-white/20 flex-1">Ask SOLAI anything...</span>
            <span className="w-0.5 h-3.5 rounded-sm bg-white/25 animate-blink shrink-0" />
          </div>
          <button className="w-8 h-8 rounded-lg bg-[#ABFF7A] flex items-center justify-center hover:brightness-110 transition-all duration-150 active:scale-95">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L12 2L7 12L6 8L2 7Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────
export default function HeroSection() {
  const heroRef   = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef    = useRef<HTMLParagraphElement>(null);
  const descRef   = useRef<HTMLParagraphElement>(null);
  const btnsRef   = useRef<HTMLDivElement>(null);
  const chatRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [headingRef.current, subRef.current, descRef.current, btnsRef.current, chatRef.current],
        { opacity: 0, y: 36 }
      );
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.9, delay: 0.1 })
        .to(subRef.current,   { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .to(descRef.current,  { opacity: 1, y: 0, duration: 0.7 }, "-=0.45")
        .to(btnsRef.current,  { opacity: 1, y: 0, duration: 0.65 }, "-=0.42")
        .to(chatRef.current,  { opacity: 1, y: 0, duration: 0.9 }, "-=0.5");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
    >
        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-175 h-125 rounded-full bg-[#ABFF7A]/4.5 blur-[160px]" />
          <div className="absolute -bottom-[10%] left-1/2 -translate-x-1/2 w-150 h-100 rounded-full bg-[#ABFF7A]/2.5 blur-[140px]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center gap-5 pt-20 pb-10">

          {/* Badge */}
          <motion.a
            href="https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="group flex items-center cursor-pointer font-medium text-[11px] px-4 py-2 text-white/70 tracking-[0.12em] rounded-full border border-white/10 bg-white/3 hover:bg-white/6 transition-colors"
          >
            <svg
              className="mr-0.75 rotate-30 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1.25 group-hover:rotate-90"
      height="16"
      width="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"></path>
    </svg>

    <span className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1.75">
      Now live on Chrome Web Store
    </span>
          </motion.a>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-[52px] sm:text-[66px] md:text-[76px] lg:text-[88px] font-bold tracking-[-0.03em] leading-[0.93]"
          >
            <span className="text-white font-dancing-script">SOLAI </span>
            <span className="text-white">Wallet</span>
          </h1>

          {/* Sub */}
          <p ref={subRef} className="text-base sm:text-lg text-white/45 font-medium">
            Your AI powered crypto wallet
          </p>

          {/* Desc */}
          <p ref={descRef} className="text-[14px] sm:text-[15px] text-white/30 leading-relaxed max-w-sm">
            Turn simple commands into automated on-chain actions.
          </p>

          {/* CTA */}
          <div ref={btnsRef} className="flex items-center justify-center gap-3 mt-1">
            <motion.a
              href="https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(171,255,122,0.3), 0 0 60px rgba(171,255,122,0.1)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ABFF7A] text-black text-sm font-semibold tracking-wide transition-all duration-200"
            >
              Install Extension
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M7 2L12 7L7 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </div>
        </div>

        {/* Chat */}
        <div ref={chatRef} className="relative z-10 w-full max-w-lg mx-auto pb-0 px-0">
          <ChatDemo />
        </div>

       
    </section>
  );
}
