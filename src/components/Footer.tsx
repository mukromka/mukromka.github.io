"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-stone-200/80 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-brand-500 text-white font-display font-bold text-xs flex items-center justify-center">
            MK
          </div>
          <p className="text-xs font-bold text-stone-600 dark:text-stone-400">
            © {new Date().getFullYear()} Mukrom Karunia Azza
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-brand-500 border border-stone-200 dark:border-stone-700 shadow-craft-sm hover:scale-105 active:scale-95 transition-all"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}