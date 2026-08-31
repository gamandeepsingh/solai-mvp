"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { springSnappy } from "@/lib/motion";
import { useMagnetic } from "./hooks";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const VARIANTS: Record<Variant, string> = {
  // Neon fill with black text — 17:1, the only legible way to use the neon.
  primary:
    "bg-[var(--accent)] text-[var(--ink)] font-semibold btn-glow shadow-[var(--shadow-sm)]",
  secondary:
    "bg-white text-[var(--ink)] font-medium border border-[var(--hairline)] hover:border-[rgba(10,10,10,0.18)] shadow-[var(--shadow-sm)]",
  ghost:
    "text-[var(--ink-secondary)] font-medium hover:text-[var(--ink)] hover:bg-[var(--surface)]",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-[13px] rounded-lg gap-1.5",
  md: "px-6 py-3.5 text-[14px] rounded-xl gap-2",
};

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  magnetic?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  className,
  magnetic = false,
  type = "button",
  disabled,
}: ButtonProps) {
  const mag = useMagnetic(0.25);

  const classes = cn(
    "inline-flex items-center justify-center tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
    VARIANTS[variant],
    SIZES[size],
    className
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.02 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: springSnappy,
    ...(magnetic
      ? {
          style: { x: mag.x, y: mag.y },
          onMouseMove: mag.onMouseMove,
          onMouseLeave: mag.onMouseLeave,
        }
      : {}),
  };

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          className={classes}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
