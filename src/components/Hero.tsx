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
      className="relative min-h-[82vh] pt-28 pb-12 md:pt-36 md:pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #131313 1px, transparent 1px), linear-gradient(to bottom, #131313 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Hero Typography & Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider mb-5 shadow-craft-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Available for Projects</span>
          </motion.div>

          {/* Main Title */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink dark:text-paper leading-[1.05] mb-5 tracking-tight">
            I make games that{" "}
            <span className="text-brand-500 underline decoration-4 decoration-brand-500/30 underline-offset-4">
              feel good to play
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-ink/70 dark:text-paper/70 font-medium max-w-lg mb-8 leading-relaxed">
            I&apos;m <strong className="text-ink dark:text-paper font-bold">Azza</strong>, a Unity Game Developer and UI/UX Designer creating cheerful mobile and web experiences from concept to launch.
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

        {/* Right Column: Character Showcase (Transparent Cutout) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 flex justify-center relative select-none"
        >
          <div className="relative w-72 sm:w-84 md:w-96 lg:w-[440px] flex items-center justify-center">
            {/* Circular Frame behind avatar */}
            <div className="absolute inset-0 m-auto w-64 h-64 sm:w-80 sm:h-80 border-[3px] border-ink dark:border-paper rounded-full -z-10" />
            <div className="absolute inset-0 m-auto w-64 h-64 sm:w-80 sm:h-80 bg-brand-500/10 rounded-full blur-xl -z-20" />

            {/* Transparent Avatar Image */}
            <img
              src="/hero.webp"
              alt="Mukrom Karunia Azza"
              className="w-full h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500"
            />

            {/* Floating Labels — Mono Indexed */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 -left-4 px-2.5 py-1.5 rounded-lg bg-ink dark:bg-paper text-paper dark:text-ink text-[10px] font-mono font-bold uppercase tracking-widest shadow-craft-sm"
            >
              (01) 15+ Games
            </motion.div>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute bottom-2 -left-2 px-2.5 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-craft-sm"
            >
              (02) 15+ Titles
            </motion.div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              className="absolute top-1/2 -right-4 px-2.5 py-1.5 rounded-lg bg-brand-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest shadow-craft-sm"
            >
              (03) 13.4M Reads
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
