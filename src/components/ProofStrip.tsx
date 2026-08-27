"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Gamepad2, Download, Eye, Sparkles } from "lucide-react";

const STATS = [
  {
    value: "3+",
    unit: "Years",
    label: "Game & UI/UX Experience",
    icon: Award,
    color: "from-brand-500 to-orange-500",
    bgColor: "bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20",
  },
  {
    value: "15+",
    unit: "Titles",
    label: "Shipped Across Mobile & Web",
    icon: Gamepad2,
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    value: "80K+",
    unit: "Downloads",
    label: "Mie Ayam Simulator (Google Play)",
    icon: Download,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    value: "13.4M",
    unit: "Reads",
    label: "Moon Flower (LINE Webtoon)",
    icon: Eye,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
];

export function ProofStrip() {
  return (
    <section className="py-8 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="relative group p-5 sm:p-6 rounded-3xl bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-2 border-stone-200/80 dark:border-stone-800/80 shadow-craft-sm hover:shadow-craft transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center border ${stat.bgColor} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <Sparkles className="w-4 h-4 text-stone-300 dark:text-stone-700 group-hover:text-amber-400 transition-colors" />
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-black text-3xl sm:text-4xl text-stone-900 dark:text-stone-50 tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {stat.unit}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mt-1">
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
