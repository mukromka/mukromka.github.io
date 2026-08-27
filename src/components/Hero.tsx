"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ConfettiButton } from "./ConfettiButton";
import { sound } from "@/lib/sound";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[85vh] pt-28 pb-12 md:pt-36 md:pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-gradient-to-r from-brand-500/10 via-sun/15 to-mint/10 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Hero Typography & Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Projects</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-stone-900 dark:text-stone-50 leading-[1.1] mb-5 tracking-tight">
            I make games that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-amber-500">
              feel good to play
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-medium max-w-lg mb-8 leading-relaxed">
            I&apos;m <strong className="text-stone-900 dark:text-stone-100 font-bold">Azza</strong>, a Unity Game Developer and UI/UX Designer creating cheerful mobile and web experiences from concept to launch.
          </p>

          {/* Single Focused CTA Button */}
          <div className="flex items-center justify-center lg:justify-start w-full">
            <ConfettiButton
              variant="primary"
              onClick={() => {
                sound.playPowerUp();
                const el = document.getElementById("work");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>View Work</span>
              <ArrowRight className="w-4 h-4" />
            </ConfettiButton>
          </div>
        </motion.div>

        {/* Right Column: Character Showcase (Larger Transparent Cutout) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-6 flex justify-center relative select-none"
        >
          <div className="relative w-72 sm:w-84 md:w-96 lg:w-[440px] flex items-center justify-center">
            {/* Subtle Circular Glow behind avatar */}
            <div className="absolute inset-0 m-auto w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-tr from-brand-500/20 to-amber-400/20 rounded-full blur-3xl -z-10" />

            {/* Transparent Avatar Image */}
            <img
              src="/hero.webp"
              alt="Mukrom Karunia Azza"
              className="w-full h-auto object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500"
            />

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 -left-3 sm:-left-6 px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-craft-sm flex items-center gap-1.5 text-xs sm:text-sm font-bold"
            >
              <span>🎮</span>
              <span>15+ Games</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute top-1/2 -right-3 sm:-right-6 px-3.5 py-1.5 rounded-2xl bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-craft-sm flex items-center gap-1.5 text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400"
            >
              <span>🌸</span>
              <span>13.4M Reads</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}