"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle } from "lucide-react";
import { experiencesData } from "@/data/experiences";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-16 bg-ink/[0.02] dark:bg-paper/[0.02] relative border-y-2 border-ink/10 dark:border-paper/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-craft-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-paper">
            Work History
          </h2>
          <p className="text-ink/60 dark:text-paper/60 text-sm sm:text-base max-w-md mt-2">
            Roles across production, design, art, and narrative.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-ink dark:border-paper ml-3 sm:ml-6 pl-5 sm:pl-8 space-y-8">
          {experiencesData.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="relative group"
            >
              {/* Dot */}
              <div className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-brand-500 border-2 border-ink dark:border-paper shadow-sm" />

              {/* Card */}
              <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm hover:shadow-craft transition-all">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1 uppercase tracking-wider">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-ink/60 dark:text-paper/70 uppercase">{exp.company}</span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-ink dark:text-paper mb-3 tracking-tight">
                  {exp.role}
                </h3>

                <ul className="space-y-1.5 mb-3">
                  {exp.achievements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-ink/70 dark:text-paper/70 font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1 pt-2 border-t-2 border-ink/10 dark:border-paper/10">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-ink/5 dark:bg-paper/10 text-ink/60 dark:text-paper/60 text-[10px] font-mono font-bold uppercase"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
