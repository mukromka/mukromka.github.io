"use client";

import { FileText, MessageSquareText, PanelLeft, Play } from "lucide-react";
import { useWorkspace } from "@/lib/workspace";
import { CV_URL, scrollToLayer } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Toolbar({ onOpenLayers }: { onOpenLayers: () => void }) {
  const { annotations, setAnnotations } = useWorkspace();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-12 items-center justify-between gap-3 border-b border-black/40 bg-chrome px-2 text-chrome-text sm:px-3">
      <div className="flex min-w-0 items-center gap-1">
        <button
          type="button"
          onClick={onOpenLayers}
          aria-label="Open layers"
          className="grid h-9 w-9 place-items-center rounded-md text-chrome-dim hover:bg-chrome-raised hover:text-chrome-text lg:hidden"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
        <a href="#cover" className="flex items-center gap-2.5 rounded-md px-1.5 py-1 hover:bg-chrome-raised">
          <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" aria-hidden>
            <rect width="24" height="24" rx="6" fill="#E8743B" />
            <path d="M7 5.5l11 6-4.8 1.1-2.2 4.9z" fill="#fff" />
          </svg>
          <span className="truncate text-[13px]">
            <span className="text-chrome-dim">Azza / </span>
            <span className="font-medium">Portfolio 2026</span>
          </span>
        </a>
      </div>

      <div className="flex items-center gap-1 rounded-lg bg-black/20 p-1">
        <button
          type="button"
          onClick={() => setAnnotations(!annotations)}
          aria-pressed={annotations}
          title="Show or hide design notes (A)"
          className={cn(
            "inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-[13px] font-medium transition-colors",
            annotations ? "bg-select text-white" : "text-chrome-dim hover:bg-chrome-raised hover:text-chrome-text",
          )}
        >
          <MessageSquareText className="h-4 w-4" />
          <span className="hidden sm:inline">Notes</span>
          <kbd
            className={cn(
              "hidden rounded px-1 font-mono text-[10px] md:inline",
              annotations ? "bg-white/20" : "bg-chrome-raised",
            )}
          >
            A
          </kbd>
        </button>
        <button
          type="button"
          onClick={() => scrollToLayer("games")}
          className="inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-[13px] font-medium text-chrome-dim transition-colors hover:bg-chrome-raised hover:text-chrome-text"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span className="hidden sm:inline">Play games</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="relative hidden sm:block" title="Azza is in this file">
          <img
            src="/hero.webp"
            alt=""
            className="h-8 w-8 rounded-full bg-azza object-cover object-[50%_18%] ring-2 ring-azza"
          />
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-chrome" />
        </span>
        <a
          href={CV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 items-center gap-2 rounded-md bg-select px-3 text-[13px] font-semibold text-white transition-[filter] hover:brightness-110"
        >
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">View CV</span>
          <span className="sm:hidden">CV</span>
        </a>
      </div>
    </header>
  );
}
