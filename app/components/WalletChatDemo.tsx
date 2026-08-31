"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
  meta?: string;
  time: string;
}

const CHAT_MESSAGES: ChatMessage[] = [
  { role: "user", text: "Send $5 to mom every day", time: "9:01 AM" },
  {
    role: "ai",
    text: "Done. Recurring payment set up — $5 daily to mom starting tomorrow.",
    meta: "Scheduled · Daily at 9:00 AM",
    time: "9:01 AM",
  },
  { role: "user", text: "Buy 0.1 ETH if price drops 10%", time: "9:02 AM" },
  {
    role: "ai",
    text: "Got it. I'll monitor ETH and place the order automatically when the condition hits.",
    meta: "Watching · ETH/USD",
    time: "9:02 AM",
  },
  { role: "user", text: "Swap USDC to SOL at the best rate", time: "9:03 AM" },
  {
    role: "ai",
    text: "Checked 4 routes. Best rate is via Jupiter — saving you $2.40 vs average.",
    meta: "Executed · Jupiter DEX",
    time: "9:03 AM",
  },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.25 py-0.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[var(--ink-tertiary)]"
          animate={{ opacity: [0.25, 0.85, 0.25], y: [0, -3, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

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
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-white border border-[var(--hairline)] flex items-center justify-center shrink-0 mb-0.5 overflow-hidden">
          <Image
            src="/solai-logo.png"
            width={14}
            height={14}
            alt="SOLAI"
            className="object-contain"
          />
        </div>
      )}

      <div
        className={`flex flex-col gap-1 max-w-[76%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-3.5 py-2.5 text-[13px] leading-[1.55] ${
            isUser
              ? "bg-[var(--ink)] text-white rounded-2xl rounded-br-[5px]"
              : "bg-[var(--bg-subtle)] text-[var(--ink)] rounded-2xl rounded-bl-[5px] border border-[var(--hairline)]"
          }`}
        >
          {msg.text}
        </div>

        <div className="flex items-center gap-2 px-0.5">
          <span className="text-[10px] text-[var(--ink-tertiary)]">{msg.time}</span>
          {msg.meta && (
            <>
              <span className="text-[var(--ink-tertiary)] text-[10px]">·</span>
              <span className="text-[10px] text-[var(--accent-ink)] flex items-center gap-1">
                <span className="w-1.25 h-1.25 rounded-full bg-[var(--accent-ink)] inline-block" />
                {msg.meta}
              </span>
            </>
          )}
        </div>
      </div>

      {isUser && (
        <div className="w-6 h-6 rounded-full bg-[var(--bg-subtle)] border border-[var(--hairline)] flex items-center justify-center shrink-0 mb-0.5 text-[9px] text-[var(--ink-secondary)] font-medium">
          U
        </div>
      )}
    </motion.div>
  );
}

export default function WalletChatDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [chatKey, setChatKey] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visibleCount]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visibleCount, showTyping]);

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
      <div
        className="relative rounded-2xl border border-[var(--hairline)] bg-white overflow-hidden"
        style={{ boxShadow: "var(--shadow-lg)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--hairline)] bg-[var(--bg-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white border border-[var(--hairline)] flex items-center justify-center overflow-hidden">
              <Image
                src="/solai-logo.png"
                width={22}
                height={22}
                alt="SOLAI"
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-[13px] font-dancing-script font-semibold text-[var(--ink)] leading-none">
                SOLAI
              </p>
              <p className="text-[10px] text-[var(--ink-tertiary)] mt-0.5">AI Wallet</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-ink)] animate-pulse" />
            <span className="text-[11px] text-[var(--ink-secondary)]">Online</span>
          </div>
        </div>

        {/* Messages — fixed height so the loop cannot shift layout */}
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
                <div className="w-6 h-6 rounded-full bg-white border border-[var(--hairline)] flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src="/solai-logo.png"
                    width={12}
                    height={12}
                    alt="SOLAI"
                    className="object-contain"
                  />
                </div>
                <div className="bg-[var(--bg-subtle)] border border-[var(--hairline)] rounded-2xl rounded-bl-[5px] px-3.5 py-2.5">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="border-t border-[var(--hairline)] px-4 py-3 bg-[var(--bg-subtle)] flex items-center gap-2.5">
          <div className="relative flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-[var(--hairline)]">
            <span className="text-[13px] text-[var(--ink-tertiary)] flex-1">
              Ask SOLAI anything...
            </span>
            <span className="absolute left-3.5 w-0.5 h-3.5 rounded-sm bg-[var(--ink-tertiary)] animate-blink shrink-0" />
          </div>
          <button
            aria-label="Send"
            className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center hover:brightness-105 transition-all duration-150 active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7L12 2L7 12L6 8L2 7Z" fill="#0A0A0A" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
