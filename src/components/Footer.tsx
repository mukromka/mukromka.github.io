"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t-2 border-ink/10 dark:border-paper/10 bg-ink/[0.02] dark:bg-paper/[0.02]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-500 text-white font-display font-bold text-xs flex items-center justify-center border-2 border-ink dark:border-paper">
            MK
          </div>
          <p className="text-xs font-bold text-ink/60 dark:text-paper/60">
            © {new Date().getFullYear()} Mukrom Karunia Azza
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-ink/5 dark:bg-paper/10 text-ink/70 dark:text-paper/70 hover:text-brand-500 border-2 border-ink/10 dark:border-paper/10 shadow-craft-sm hover:scale-105 active:scale-95 transition-all"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
