"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Download, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";

const NAV_LINKS = [
  { name: "Featured", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "Game Arcade", href: "#games" },
  { name: "Skills", href: "#skills" },
  { name: "About", href: "#about" },
];

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    setMounted(true);
    setSoundEnabled(sound.enabled);

    const handleScroll = () => {
      const sections = ["work", "experience", "games", "skills", "about", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    sound.playBlip(600);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const toggleSound = () => {
    const newState = sound.toggle();
    setSoundEnabled(newState);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:py-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Wordmark */}
        <a
          href="#top"
          onClick={() => sound.playPop()}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm hover:shadow-craft transition-all"
          aria-label="Mukrom Karunia Azza home"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white font-display font-bold text-sm shadow-sm group-hover:rotate-12 transition-transform border-2 border-ink dark:border-paper">
            MK
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-ink dark:text-paper text-sm leading-tight flex items-center gap-1.5">
              Azza
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-ink/50 dark:text-paper/50 -mt-0.5 uppercase tracking-wider">
              Game Dev & UI/UX
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-lg bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sound.playBlip(520)}
                className={cn(
                  "relative px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all",
                  isActive
                    ? "text-white bg-ink dark:bg-paper dark:text-ink shadow-sm"
                    : "text-ink/60 dark:text-paper/60 hover:text-brand-500 dark:hover:text-brand-400 hover:bg-ink/5 dark:hover:bg-paper/5"
                )}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Sound FX Toggle */}
          {mounted && (
            <button
              onClick={toggleSound}
              type="button"
              title={soundEnabled ? "Mute Retro Sound FX" : "Enable Retro Sound FX"}
              aria-label="Toggle retro sound effects"
              className={cn(
                "w-9 h-9 rounded-lg border-2 border-ink dark:border-paper shadow-craft-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95",
                soundEnabled
                  ? "bg-brand-500 text-white"
                  : "bg-white dark:bg-ink text-ink/40 dark:text-paper/40 hover:text-ink dark:hover:text-paper"
              )}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 animate-bounce-subtle" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle dark/light theme"
              className="w-9 h-9 rounded-lg bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm flex items-center justify-center text-ink dark:text-paper hover:text-brand-500 hover:scale-105 active:scale-95 transition-all"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-brand-500" />
              )}
            </button>
          )}

          {/* Download CV Primary CTA */}
          <a
            href="/CV%20Mukrom%20Karunia%20Azza_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playPowerUp()}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-500 hover:bg-brand-600 text-white shadow-craft-sm hover:shadow-craft active:translate-x-0.5 active:translate-y-0.5 transition-all border-2 border-ink dark:border-paper"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playPop();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            type="button"
            aria-label="Open mobile navigation menu"
            className="md:hidden w-9 h-9 rounded-lg bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm flex items-center justify-center text-ink dark:text-paper"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="md:hidden mt-2 max-w-sm mx-auto p-4 rounded-xl bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft pointer-events-auto flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playBlip(520);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-ink dark:text-paper hover:bg-brand-500 hover:text-white transition-colors border-2 border-transparent hover:border-ink dark:hover:border-paper"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t-2 border-ink/10 dark:border-paper/10 flex flex-col gap-2">
              <a
                href="/CV%20Mukrom%20Karunia%20Azza_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playPowerUp()}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-brand-500 text-sm font-bold uppercase tracking-wider text-white shadow-craft-sm border-2 border-ink dark:border-paper"
              >
                <Download className="w-4 h-4" />
                <span>Download CV (PDF)</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
