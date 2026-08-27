"use client";

import React from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
}

export function ConfettiButton({
  children,
  className,
  variant = "primary",
  onClick,
  ...props
}: ConfettiButtonProps) {
  const triggerConfetti = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { x, y },
      colors: ["#ff5733", "#f59e0b", "#10b981", "#0ea5e9", "#a855f7"],
      disableForReducedMotion: true,
    });

    if (onClick) {
      onClick(e);
    }
  };

  const variants = {
    primary:
      "bg-brand-500 hover:bg-brand-600 text-white shadow-craft hover:shadow-craft-hover active:translate-y-1 active:shadow-none border-2 border-brand-600",
    secondary:
      "bg-sun text-slate-900 hover:bg-amber-400 shadow-craft hover:shadow-craft-hover active:translate-y-1 active:shadow-none border-2 border-amber-600",
    outline:
      "bg-white/80 dark:bg-stone-900/80 hover:bg-brand-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-100 border-2 border-stone-300 dark:border-stone-700 shadow-craft-sm hover:border-brand-500",
    ghost: "hover:bg-brand-500/10 text-brand-600 dark:text-brand-400",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={triggerConfetti}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-base transition-colors cursor-pointer select-none",
        variants[variant],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
