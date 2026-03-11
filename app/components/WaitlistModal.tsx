"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import Image from "next/image";

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

  // Fetch current waitlist count when modal opens
  useEffect(() => {
    if (isOpen) {
      fetch("/api/waitlist")
        .then((r) => r.json())
        .then((d) => setTotalCount(d.count))
        .catch(() => {});
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      // Reset state when closing
      setTimeout(() => {
        setEmail("");
        setState("idle");
        setMessage("");
        setPosition(null);
      }, 300);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Track window size for confetti
  useEffect(() => {
    const update = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-stop confetti after 4s
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
        body: JSON.stringify({ email }),
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
          {/* Confetti */}
          {showConfetti && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              numberOfPieces={220}
              recycle={false}
              gravity={0.22}
              colors={["#ABFF7A", "#ffffff", "#d4ffb0", "#e8ffe0", "#7aff9e"]}
              style={{ position: "fixed", top: 0, left: 0, zIndex: 100, pointerEvents: "none" }}
            />
          )}

          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
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
              {/* Card */}
              <div className="relative bg-[#0e0e0e] rounded-2xl border border-white/8 overflow-hidden"
                style={{ boxShadow: "0 24px 48px -8px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)" }}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg bg-white/4 hover:bg-white/8 transition-colors text-white/30 hover:text-white/60"
                  aria-label="Close modal"
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M1 1L10 10M10 1L1 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
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
                      {/* Header */}
                      <div className="mb-6 pr-6">
                        <h2 className="text-[17px] font-semibold text-white leading-snug mb-1.5">
                          Get early access
                        </h2>
                        <p className="text-[13px] text-white/40 leading-relaxed">
                          Join the waitlist. We&apos;ll let you know when your spot is ready.
                        </p>
                      </div>

                      {/* Waitlist count */}
                      <div className="flex items-center gap-3 mb-5">
                        {/* Avatars */}
                        <div className="flex -space-x-2">
                          {totalCount !== null ? (
                            <>
                              {["12", "32", "15"].map((img) => (
                                <Image
                                  key={img}
                                  src={`https://i.pravatar.cc/40?img=${img}`}
                                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[#0B0B0B]"
                                  alt=""
                                  width={24}
                                  height={24}
                                />
                              ))}
                            </>
                          ) : (
                            <>
                              {[0, 1, 2].map((i) => (
                                <div
                                  key={i}
                                  className="w-7 h-7 rounded-full bg-white/8 ring-2 ring-[#0B0B0B] animate-pulse"
                                />
                              ))}
                            </>
                          )}
                        </div>

                        {/* Text */}
                        {totalCount !== null ? (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-[13px] text-white/50"
                          >
                            <span className="text-white font-medium">{totalCount.toLocaleString()}+</span>{" "}
                            people joined, when&apos;s your turn?
                          </motion.p>
                        ) : (
                          <div className="h-4 w-40 rounded-md bg-white/8 animate-pulse" />
                        )}
                      </div>

                      {/* Form */}
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
                          className={`w-full px-3.5 py-3 rounded-xl bg-white/4 border text-[13px] text-white placeholder:text-white/20 focus:outline-none transition-colors duration-150
                            ${state === "error"
                              ? "border-red-500/40 focus:border-red-500/60"
                              : "border-white/8 focus:border-white/20"
                            }`}
                        />

                        <AnimatePresence>
                          {state === "error" && message && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="text-[11px] text-red-400/80 pl-0.5 pb-0.5"
                            >
                              {message}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        <button
                          type="submit"
                          disabled={state === "loading" || !email}
                          className="w-full py-3 rounded-xl bg-[#ABFF7A] text-black text-[13px] font-semibold tracking-wide hover:brightness-105 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2"
                        >
                          {state === "loading" ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.75, repeat: Infinity, ease: "linear" }}
                                className="w-3.5 h-3.5 border-[1.5px] border-black/25 border-t-black rounded-full block"
                              />
                              Joining...
                            </>
                          ) : (
                            "Join waitlist"
                          )}
                        </button>
                      </form>

                      <p className="mt-4 text-[11px] text-white/20 text-center">
                        No spam · Unsubscribe anytime
                      </p>
                    </motion.div>
                  ) : (
                    /* Success */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="p-7"
                    >
                      {/* Icon */}
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.05, type: "spring", stiffness: 240, damping: 18 }}
                        className="w-10 h-10 rounded-xl bg-[#ABFF7A]/10 border border-[#ABFF7A]/20 flex items-center justify-center mb-5"
                      >
                        <motion.svg
                          width="18" height="18" viewBox="0 0 18 18" fill="none"
                        >
                          <motion.path
                            d="M3.5 9L7.5 13L14.5 5.5"
                            stroke="#ABFF7A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.15, duration: 0.4, ease: "easeOut" }}
                          />
                        </motion.svg>
                      </motion.div>

                      <h2 className="text-[17px] font-semibold text-white mb-1.5">You&apos;re on the list</h2>
                      <p className="text-[13px] text-white/40 leading-relaxed mb-5">
                        We&apos;ll email you when your spot is ready. Check your inbox for confirmation.
                      </p>

                      {position !== null && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/3 border border-white/6 mb-5"
                        >
                          <span className="text-[12px] text-white/35">Your position</span>
                          <span className="text-[13px] font-semibold text-[#ABFF7A]">#{position}</span>
                        </motion.div>
                      )}

                      <button
                        onClick={onClose}
                        className="w-full py-2.5 rounded-xl border border-white/8 text-white/50 hover:text-white/80 hover:border-white/15 text-[13px] transition-all duration-150"
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
