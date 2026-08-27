"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gamepad2, Layout, Palette, Sparkles } from "lucide-react";
import { skillCategories, techBadges } from "@/data/skills";

const ICONS_MAP: Record<string, any> = {
  Gamepad2,
  Layout,
  Palette,
};

export function SkillMatrix() {
  return (
    <section id="skills" className="py-16 bg-stone-50/50 dark:bg-stone-900/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lilac/20 text-purple-700 dark:text-purple-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Toolkit</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50">
            Skills &amp; Tools
          </h2>
        </div>

        {/* 3 Focused Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {skillCategories.map((cat, idx) => {
            const Icon = ICONS_MAP[cat.icon] || Sparkles;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 shadow-craft-sm hover:shadow-craft transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200/70 dark:border-stone-700/70 text-xs font-semibold text-stone-700 dark:text-stone-200"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Core Tools */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techBadges.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-craft-sm cursor-default"
            >
              <img
                src={t.icon}
                alt={t.name}
                className="w-4 h-4 dark:invert"
              />
              <span className="text-xs font-bold text-stone-700 dark:text-stone-200">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}