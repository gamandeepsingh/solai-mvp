"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import Image from "next/image";
import { Check, Loader2, X } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalState = "idle" | "loading" | "success" | "error";

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ModalState>("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/waitlist")
        .then((r) => r.json())
        .then((d) => setTotalCount(d.count))
        .catch(() => {});
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setTimeout(() => {
        setEmail("");
        setState("idle");
        setMessage("");
        setPosition(null);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    const update = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!showConfetti) return;
    const t = setTimeout(() => setShowConfetti(false), 10000);
    return () => clearTimeout(t);
  }, [showConfetti]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || state === "loading") return;

    setState("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "sdk" }),
      });
      const data = await res.json();

      if (res.ok) {
        setState("success");
        setPosition(data.position);
        setMessage(data.message);
        setShowConfetti(true);
      } else {
        setState("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {showConfetti && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={220}
              recycle={false}
              gravity={0.22}
              // Retuned for a light backdrop — pale lime vanishes on white.
              colors={["#ABFF7A", "#2E6B12", "#0A0A0A", "#7BD94A", "#4E9E24"]}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 100,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[rgba(10,10,10,0.4)] backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-100 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative bg-white rounded-2xl border border-[var(--hairline)] overflow-hidden"
                style={{ boxShadow: "0 32px 64px -16px rgba(10,10,10,0.28)" }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--surface)] hover:bg-[rgba(10,10,10,0.06)] transition-colors text-[var(--ink-tertiary)] hover:text-[var(--ink)]"
                  aria-label="Close modal"
                >
                  <X size={13} strokeWidth={2} />
                </button>

                <AnimatePresence mode="wait">
                  {state !== "success" ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="p-7"
                    >
                      <div className="mb-6 pr-6">
                        <h2 className="text-[17px] font-semibold text-[var(--ink)] leading-snug mb-1.5">
                          Get SDK early access
                        </h2>
                        <p className="text-[13px] text-[var(--ink-secondary)] leading-relaxed">
                          Join the list. We&apos;ll send you the docs and your private
                          npm tag when the beta opens.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 mb-5">
                        <div className="flex -space-x-2">
                          {totalCount !== null
                            ? ["12", "32", "15"].map((img) => (
                                <Image
                                  key={img}
                                  src={`https://i.pravatar.cc/40?img=${img}`}
                                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white"
                                  alt=""
                                  width={24}
                                  height={24}
                                />
                              ))
                            : [0, 1, 2].map((i) => (
                                <div
                                  key={i}
                                  className="w-7 h-7 rounded-full bg-[rgba(10,10,10,0.06)] ring-2 ring-white animate-pulse"
                                />
                              ))}
                        </div>

                        {totalCount !== null ? (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-[13px] text-[var(--ink-secondary)]"
                          >
                            <span className="text-[var(--ink)] font-medium">
                              {totalCount.toLocaleString()}+
                            </span>{" "}
                            already joined, when&apos;s your turn?
                          </motion.p>
                        ) : (
                          <div className="h-4 w-40 rounded-md bg-[rgba(10,10,10,0.06)] animate-pulse" />
                        )}
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-2.5">
                        <input
                          ref={inputRef}
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (state === "error") setState("idle");
                          }}
                          placeholder="name@email.com"
                          required
                          disabled={state === "loading"}
                          className={`w-full px-3.5 py-3 rounded-xl bg-white border text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-tertiary)] focus:outline-none transition-colors duration-150
                            ${
                              state === "error"
                                ? "border-[var(--danger)]/50 focus:border-[var(--danger)]"
                                : "border-[var(--hairline)] focus:border-[var(--accent-ink)]"
                            }`}
                        />

                        <AnimatePresence>
                          {state === "error" && message && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-[11px] text-[var(--danger)] pl-0.5 pb-0.5"
                            >
                              {message}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button
                          type="submit"
                          disabled={state === "loading" || !email}
                          className="w-full py-3 rounded-xl bg-[var(--accent)] text-[var(--ink)] text-[13px] font-semibold tracking-wide hover:brightness-105 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2"
                        >
                          {state === "loading" ? (
                            <>
                              <Loader2
                                size={14}
                                strokeWidth={2.5}
                                className="animate-spin"
                              />
                              Joining...
                            </>
                          ) : (
                            "Get early access"
                          )}
                        </button>
                      </form>

                      <p className="mt-4 text-[11px] text-[var(--ink-tertiary)] text-center">
                        No spam · Unsubscribe anytime
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="p-7"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.05,
                          type: "spring",
                          stiffness: 240,
                          damping: 18,
                        }}
                        className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-5"
                        style={{ boxShadow: "0 6px 18px rgba(171,255,122,0.5)" }}
                      >
                        <Check size={18} strokeWidth={2.5} className="text-[var(--ink)]" />
                      </motion.div>

                      <h2 className="text-[17px] font-semibold text-[var(--ink)] mb-1.5">
                        You&apos;re on the list
                      </h2>
                      <p className="text-[13px] text-[var(--ink-secondary)] leading-relaxed mb-5">
                        We&apos;ll email you when the beta opens. Check your inbox for
                        confirmation.
                      </p>

                      {position !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--hairline)] mb-5"
                        >
                          <span className="text-[12px] text-[var(--ink-secondary)]">
                            Your position
                          </span>
                          <span className="text-[13px] font-semibold text-[var(--accent-ink)]">
                            #{position}
                          </span>
                        </motion.div>
                      )}

                      <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-xl border border-[var(--hairline)] text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:border-[rgba(10,10,10,0.18)] text-[13px] transition-all duration-150"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
