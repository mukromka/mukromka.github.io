"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, ChevronLeft, ChevronRight } from "lucide-react";
import { gamesData } from "@/data/games";
import { GameItem } from "@/types";
import { GameModal } from "./GameModal";
import { sound } from "@/lib/sound";

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Game Dev", value: "gamedev" },
  { label: "UI/UX", value: "uiux" },
  { label: "2D Art", value: "art" },
];

export function GameArchive() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredGames = gamesData.filter((game) => {
    if (activeCategory === "all") return true;
    return game.categories.includes(activeCategory as any);
  });

  const scroll = (direction: "left" | "right") => {
    sound.playBlip(620);
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="games" className="py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sun/15 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Archive</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50">
              Game Archive
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base mt-1">
              Games I built, designed, or illustrated.
            </p>
          </div>

          {/* Right Side: Category Filter & Slider Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-craft-sm">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      sound.playBlip(560);
                      setActiveCategory(cat.value);
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-brand-500 text-white shadow-sm"
                        : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Slider Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll("left")}
                aria-label="Previous games"
                className="w-8 h-8 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-craft-sm flex items-center justify-center text-stone-700 dark:text-stone-200 hover:text-brand-500 hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                aria-label="Next games"
                className="w-8 h-8 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-craft-sm flex items-center justify-center text-stone-700 dark:text-stone-200 hover:text-brand-500 hover:scale-105 active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Carousel (3 items on desktop) */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -6 }}
                onClick={() => {
                  sound.playPop();
                  setSelectedGame(game);
                }}
                className="snap-start flex-none w-[82vw] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 p-4 shadow-craft-sm hover:shadow-craft transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail (Clean, no playable badge) */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 mb-3.5 border border-stone-200 dark:border-stone-700/80">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-50 line-clamp-1 mb-0.5">
                    {game.title}
                  </h3>
                  <p className="text-xs font-bold text-brand-600 dark:text-brand-400 mb-2">
                    {game.role}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed font-medium">
                    {game.description}
                  </p>
                </div>

                <div className="pt-3 mt-3.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-tight">
                    {game.platform}
                  </span>
                  <span className="text-xs font-bold text-brand-500 flex items-center gap-0.5">
                    <span>Details</span>
                    <span>→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </section>
  );
}