"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, Volume2, VolumeX, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { CV_URL, SECTIONS } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    setSoundOn(sound.enabled);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const top = document.getElementById("top");
    if (top) observer.observe(top);
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-line/70 bg-night" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <a
          href="#top"
          className="group flex items-center gap-2.5 rounded-control py-1 pr-2"
          onClick={() => sound.playPop()}
        >
          <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
            <rect width="32" height="32" rx="9" className="fill-panel" />
            <path
              d="M11 9l13 7-13 7z"
              className="fill-cursor transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </svg>
          <span className="font-display text-[15px] font-semibold tracking-tight">Azza</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => sound.playBlip(520)}
              aria-current={active === id ? "true" : undefined}
              className={cn(
                "relative rounded-control px-3.5 py-2 text-sm font-medium transition-colors",
                active === id ? "text-ink" : "text-dim hover:text-ink"
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-cursor"
                  className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-cursor"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundOn(sound.toggle())}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Turn interface sounds off" : "Turn interface sounds on"}
            title={soundOn ? "Interface sounds on" : "Interface sounds off"}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-control border transition-colors",
              soundOn
                ? "border-cursor/60 bg-cursor/10 text-cursor"
                : "border-line text-dim hover:border-dim hover:text-ink"
            )}
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-10 items-center gap-2 rounded-control bg-cursor px-4 text-sm font-semibold text-cursor-ink transition-[filter] hover:brightness-105 sm:inline-flex"
          >
            <FileText className="h-4 w-4" />
            View CV
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-control border border-line text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Sections"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line/70 bg-night px-4 pb-6 pt-2 md:hidden"
          >
            <ul className="flex flex-col">
              {SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-line/60 py-4 font-display text-lg font-semibold"
                  >
                    {label}
                    {active === id && <span className="h-2 w-2 rounded-full bg-cursor" aria-hidden />}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex h-12 items-center justify-center gap-2 rounded-control bg-cursor font-semibold text-cursor-ink"
            >
              <FileText className="h-4 w-4" />
              View CV (PDF)
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
