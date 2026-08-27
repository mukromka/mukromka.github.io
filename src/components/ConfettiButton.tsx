"use client";

import React from "react";
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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  const variants = {
    primary:
      "bg-brand-500 hover:bg-brand-600 text-white shadow-craft hover:shadow-craft-hover active:translate-x-1 active:translate-y-1 active:shadow-none border-2 border-ink dark:border-paper",
    secondary:
      "bg-ink dark:bg-paper text-paper dark:text-ink shadow-craft hover:shadow-craft-hover active:translate-x-1 active:translate-y-1 active:shadow-none border-2 border-ink dark:border-paper",
    outline:
      "bg-transparent hover:bg-brand-500/10 text-ink dark:text-paper border-2 border-ink dark:border-paper shadow-craft-sm hover:border-brand-500",
    ghost: "hover:bg-brand-500/10 text-brand-600 dark:text-brand-400",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-base transition-colors cursor-pointer select-none uppercase tracking-wide text-sm",
        variants[variant],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
