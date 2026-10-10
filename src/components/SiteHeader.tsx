"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { CV_URL, SECTIONS } from "@/lib/site";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr] lg:px-10">
        <a
          href="#top"
          className="flex items-center gap-2.5 justify-self-start rounded-control py-1 pr-2"
          onClick={() => sound.playPop()}
        >
          <span className="relative shrink-0">
            <span className="block h-9 w-9 overflow-hidden rounded-full bg-raised ring-1 ring-line">
              <img
                src="/hero.webp"
                alt=""
                className="h-full w-full origin-[50%_12%] scale-[1.9] object-cover object-[50%_10%]"
              />
            </span>
            <span aria-hidden className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-go ring-2 ring-night" />
          </span>
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

        <div className="flex items-center gap-2 justify-self-end">
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
