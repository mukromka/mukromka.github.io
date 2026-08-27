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
    <section id="skills" className="py-16 bg-ink/[0.02] dark:bg-paper/[0.02] relative border-y-2 border-ink/10 dark:border-paper/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-craft-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Toolkit</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-paper">
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
                className="p-5 rounded-xl bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm hover:shadow-craft transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2.5 mb-3.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-500 text-white flex items-center justify-center border-2 border-ink dark:border-paper">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-base text-ink dark:text-paper tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className="px-2.5 py-1 rounded-lg bg-ink/5 dark:bg-paper/10 border border-ink/10 dark:border-paper/20 text-xs font-semibold text-ink/70 dark:text-paper/70"
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
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm cursor-default"
            >
              <img
                src={t.icon}
                alt={t.name}
                className="w-4 h-4 dark:invert"
              />
              <span className="text-xs font-bold text-ink/70 dark:text-paper/70">
                {t.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
