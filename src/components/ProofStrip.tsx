"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Gamepad2, Eye, Sparkles } from "lucide-react";

const STATS = [
  {
    value: "3+",
    unit: "Years",
    label: "Game & UI/UX Experience",
    icon: Award,
  },
  {
    value: "15+",
    unit: "Titles",
    label: "Shipped Across Mobile & Web",
    icon: Gamepad2,
  },
  {
    value: "13.4M",
    unit: "Reads",
    label: "Moon Flower (LINE Webtoon)",
    icon: Eye,
  },
];

export function ProofStrip() {
  return (
    <section className="py-8 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ x: -2, y: -2 }}
                className="relative group p-5 sm:p-6 rounded-xl bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm hover:shadow-craft transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-lg bg-brand-500 text-white flex items-center justify-center border-2 border-ink dark:border-paper group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </span>
                  <Sparkles className="w-4 h-4 text-ink/20 dark:text-paper/20 group-hover:text-brand-500 transition-colors" />
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-paper tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-mono font-bold text-ink/50 dark:text-paper/50 uppercase tracking-wider">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-ink/60 dark:text-paper/60 mt-1">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
