"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { springSoft } from "@/lib/motion";
import Section from "./ui/Section";
import { Highlight, Reveal, RevealLine, RevealLines } from "./ui/Reveal";

type FormState = "idle" | "loading" | "success" | "error";

/** Counts up to the final position so the number lands rather than appears. */
function CountUp({ to }: { to: number }) {
  const reduced = useReducedMotion();
  // Seeded from `reduced` so the RAF below is the only thing that ever
  // setStates — a synchronous setState in the effect body would cascade.
  const [value, setValue] = useState(() => (reduced ? to : 0));

  useEffect(() => {
    if (reduced) return;

    const duration = 700;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, reduced]);

  return <>{value}</>;
}

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState<number | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "loading" || state === "success") return;

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
        setPosition(typeof data.position === "number" ? data.position : null);
        setMessage(data.position ? "" : "You're on the list.");
      } else {
        setState("error");
        // The API returns failures under `error`, not `message`.
        setMessage(data.error || "Something went wrong. Try again.");
        setTimeout(() => setState("idle"), 3500);
      }
    } catch {
      setState("error");
      setMessage("Network error. Please try again.");
      setTimeout(() => setState("idle"), 3500);
    }
  }

  return (
    <Section id="early-access" subtle blob="center">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-8">
        <div className="flex flex-col gap-4">
          <Reveal>
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--ink-tertiary)]">
              Early access
            </p>
          </Reveal>

          <RevealLines
            className="text-[40px] sm:text-[52px] font-semibold tracking-[-0.04em] leading-[0.96] text-[var(--ink)]"
            delay={0.05}
          >
            <RevealLine>Build the first</RevealLine>
            <RevealLine>
              agent that <Highlight>behaves.</Highlight>
            </RevealLine>
          </RevealLines>

          <Reveal delay={0.12}>
            <p className="text-[15px] text-[var(--ink-secondary)] max-w-md mx-auto leading-relaxed">
              SDK early access opens soon. Get the docs, the private npm tag, and a
              direct line to the team.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={springSoft}
                className="flex flex-col items-center gap-3 py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 6px 20px rgba(171,255,122,0.5)",
                  }}
                >
                  <Check size={22} strokeWidth={2.5} className="text-[var(--ink)]" />
                </motion.div>

                <p className="text-[16px] font-semibold text-[var(--ink)]">
                  {position !== null ? (
                    <>
                      You&apos;re #<CountUp to={position} /> on the list
                    </>
                  ) : (
                    message
                  )}
                </p>
                <p className="text-[13px] text-[var(--ink-secondary)]">
                  We&apos;ll reach out when the beta opens.
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
                    className="w-full px-4 py-3.5 rounded-xl bg-white border border-[var(--hairline)] text-[14px] text-[var(--ink)] placeholder-[var(--ink-tertiary)] outline-none focus:border-[var(--accent-ink)] transition-colors duration-200 disabled:opacity-50"
                    style={{ boxShadow: "var(--shadow-sm)" }}
                  />
                  <AnimatePresence>
                    {state === "error" && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute -bottom-5 left-1 text-[11px] text-[var(--danger)]"
                      >
                        {message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="submit"
                  disabled={state === "loading" || !email}
                  whileHover={state === "idle" && email ? { scale: 1.03 } : {}}
                  whileTap={{ scale: 0.97 }}
                  className="btn-glow flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-[var(--ink)] text-[14px] font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-200 shrink-0"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 size={14} strokeWidth={2.5} className="animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Get early access
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="text-[12px] text-[var(--ink-tertiary)]">
            No spam. Unsubscribe at any time.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
