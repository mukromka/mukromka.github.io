"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Maximize2, Play, X } from "lucide-react";
import type { GameItem } from "@/types";
import { sound } from "@/lib/sound";

const ease = [0.16, 1, 0.3, 1] as const;

export function GameDialog({ game, onClose }: { game: GameItem | null; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setPlaying(false);
    if (!game) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [game, onClose]);

  return (
    <AnimatePresence>
      {game && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-[#060a1c]/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-dialog-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ duration: 0.4, ease }}
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[20px] bg-panel shadow-lift ring-1 ring-line sm:rounded-[20px]"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-[#060a1c]">
              {playing && game.isPlayableWeb ? (
                <iframe
                  ref={frameRef}
                  src={game.href}
                  title={`Play ${game.title}`}
                  className="h-full w-full border-0"
                  allow="autoplay; fullscreen; gamepad"
                  allowFullScreen
                />
              ) : (
                <>
                  <img src={game.image} alt={`${game.title} key art`} className="h-full w-full object-cover" />
                  {game.isPlayableWeb && (
                    <div className="absolute inset-0 grid place-items-center bg-[#060a1c]/45">
                      <button
                        type="button"
                        onClick={() => {
                          setPlaying(true);
                          sound.playPowerUp();
                        }}
                        className="inline-flex h-14 items-center gap-2.5 rounded-full bg-cursor px-7 font-display text-base font-semibold text-cursor-ink shadow-lift transition-transform hover:scale-[1.03] active:scale-[0.98]"
                      >
                        <Play className="h-5 w-5 fill-current" />
                        Play {game.title}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-night/85 text-ink transition-colors hover:bg-night"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
              <div>
                <h3 id="game-dialog-title" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {game.title}
                </h3>
                <p className="mt-2 text-dim">
                  {game.role} <span className="text-line">/</span> {game.platform}
                </p>
                <p className="mt-5 max-w-prose leading-relaxed text-ink/90">{game.description}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
                  {game.tags.map((t) => (
                    <li key={t} className="rounded-full border border-line px-2.5 py-1 text-[13px] text-dim">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                {playing && (
                  <button
                    type="button"
                    onClick={() => frameRef.current?.requestFullscreen?.()}
                    className="inline-flex h-11 items-center gap-2 rounded-control border border-line px-4 text-sm font-semibold transition-colors hover:border-cursor hover:text-cursor"
                  >
                    <Maximize2 className="h-4 w-4" />
                    Full screen
                  </button>
                )}
                <a
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-control border border-line px-4 text-sm font-semibold transition-colors hover:border-cursor hover:text-cursor"
                >
                  {game.isPlayableWeb ? "Open in a new tab" : `Open on ${game.platform}`}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
