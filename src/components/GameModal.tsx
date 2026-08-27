"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play, Image as ImageIcon, Sparkles, Gamepad2, Info } from "lucide-react";
import { GameItem } from "@/types";

interface GameModalProps {
  game: GameItem | null;
  onClose: () => void;
}

export function GameModal({ game, onClose }: GameModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Reset play mode when game changes
    setIsPlaying(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (game) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [game, onClose]);

  if (!game) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl rounded-4xl bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 shadow-craft-hover overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100 leading-tight">
                  {game.title}
                </h3>
                <p className="text-[11px] font-bold text-brand-600 dark:text-brand-400">
                  {game.role} • {game.platform}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {game.isPlayableWeb && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-sun text-stone-900 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  {isPlaying ? (
                    <>
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Show Screenshot</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play in Modal</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Media / Play Area */}
          <div className="relative aspect-video w-full bg-stone-950 overflow-hidden flex items-center justify-center">
            {isPlaying && game.isPlayableWeb ? (
              <iframe
                src={game.href}
                title={game.title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; gamepad"
              />
            ) : (
              <div className="relative w-full h-full group">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-contain"
                />
                {game.isPlayableWeb && (
                  <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px] flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-base bg-brand-500 text-white shadow-craft hover:scale-105 active:scale-95 transition-all"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>Start Web Game</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8">
            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed mb-6 font-medium">
              {game.description ||
                "A featured title created and refined with responsive game design, clean mechanics, and engaging visual aesthetics."}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold border border-stone-200 dark:border-stone-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-stone-800">
              <span className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-500" />
                Target Platform: {game.platform}
              </span>

              <a
                href={game.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm bg-brand-500 hover:bg-brand-600 text-white shadow-craft-sm hover:shadow-craft active:translate-y-0.5 transition-all"
              >
                <span>Launch External Page</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
