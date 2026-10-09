"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Maximize2, Play, X } from "lucide-react";
import type { GameItem } from "@/types";

const ease = [0.16, 1, 0.3, 1] as const;

export function GameDialog({ game, onClose }: { game: GameItem | null; onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setPlaying(false);
    if (!game) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), iframe");
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
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
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [game, onClose]);

  return (
    <AnimatePresence>
      {game && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-[#16161B]/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-dialog-title"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.16 } }}
            transition={{ duration: 0.38, ease }}
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-float sm:rounded-2xl"
          >
            <div className="flex h-11 items-center justify-between border-b border-ink/10 px-4 text-[12px] text-ink-mute">
              <span>
                Prototype <span className="text-ink-faint">/</span> {game.title}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 grid h-9 w-9 place-items-center rounded-md text-ink hover:bg-ink/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-[#16161B]">
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
                    <div className="absolute inset-0 grid place-items-center bg-black/35">
                      <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        className="inline-flex h-14 items-center gap-2.5 rounded-xl bg-azza px-6 font-display text-lg font-bold text-white shadow-[0_4px_0_#B9521F] transition-transform hover:-translate-y-0.5 active:translate-y-1"
                      >
                        <Play className="h-5 w-5 fill-current" />
                        Play {game.title}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
              <div>
                <h3 id="game-dialog-title" className="font-display text-3xl font-extrabold leading-none">
                  {game.title}
                </h3>
                <p className="mt-2 text-ink-mute">
                  {game.role}, {game.platform}
                </p>
                <p className="mt-4 max-w-prose leading-relaxed">{game.description}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                  {game.tags.map((t) => (
                    <li key={t} className="rounded-md bg-ink/5 px-2 py-1 text-[12px] text-ink-mute">
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
                    className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-[14px] font-semibold ring-1 ring-ink/15 hover:bg-ink/5"
                  >
                    <Maximize2 className="h-4 w-4" />
                    Full screen
                  </button>
                )}
                <a
                  href={game.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-[14px] font-semibold ring-1 ring-ink/15 hover:bg-ink/5"
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
