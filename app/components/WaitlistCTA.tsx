"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sectionFade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, ease: "easeOut" as const },
};

type FormState = "idle" | "loading" | "success" | "error";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading" || state === "success") return;

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
        setMessage(
          data.position
            ? `You're #${data.position} on the list!`
            : "You're on the list!"
        );
      } else {
        setState("error");
        setMessage(data.message || "Something went wrong. Try again.");
        setTimeout(() => setState("idle"), 3500);
      }
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
      setTimeout(() => setState("idle"), 3500);
    }
  }

  return (
    <section className="relative py-28 px-6 overflow-hidden">
      {/* Large ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(171,255,122,0.055)", filter: "blur(180px)" }}
      />
      {/* Top border line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(171,255,122,0.2), transparent)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Header */}
        <motion.div {...sectionFade} className="flex flex-col gap-4">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/25">
            Early Access
          </p>
          <h2 className="text-[44px] sm:text-[52px] font-bold tracking-[-0.03em] text-white leading-[0.92]">
            Be first.{" "}
            <span className="text-shimmer">Own</span> the future.
          </h2>
        </motion.div>

        {/* Form */}
        <motion.div
          {...sectionFade}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center gap-3 py-6"
              >
                {/* Checkmark */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                    delay: 0.1,
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(171,255,122,0.12)",
                    border: "1px solid rgba(171,255,122,0.3)",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ABFF7A"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                    />
                  </svg>
                </motion.div>
                <p className="text-[16px] font-semibold text-white/85">
                  {message}
                </p>
                <p className="text-[13px] text-white/35">
                  We&apos;ll reach out when you&apos;re up.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2.5"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={state === "loading"}
                    className="w-full px-4 py-3.5 rounded-xl glass border border-white/8 text-[14px] text-white/80 placeholder-white/25 outline-none focus:border-[#ABFF7A]/30 transition-colors duration-200 bg-transparent disabled:opacity-50"
                    style={{ backdropFilter: "blur(12px)" }}
                  />
                  {/* Error message */}
                  <AnimatePresence>
                    {state === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-5 left-1 text-[11px] text-red-400/80"
                      >
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={state === "loading" || !email}
                  whileHover={
                    state === "idle" && email
                      ? {
                          scale: 1.03,
                          boxShadow: "0 0 24px rgba(171,255,122,0.35)",
                        }
                      : {}
                  }
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3.5 rounded-xl bg-[#ABFF7A] text-black text-[14px] font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 shrink-0"
                >
                  {state === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Joining...
                    </span>
                  ) : (
                    "Join Waitlist"
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust note */}
        <motion.p
          {...sectionFade}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-[12px] text-white/20"
        >
          No spam. Unsubscribe at any time.
        </motion.p>
      </div>
    </section>
  );
}
