"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle } from "lucide-react";
import { experiencesData } from "@/data/experiences";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-16 bg-stone-50/50 dark:bg-stone-900/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Experience</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50">
            Work History
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base max-w-md mt-2">
            Roles across production, design, art, and narrative.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-brand-500/30 ml-3 sm:ml-6 pl-5 sm:pl-8 space-y-8">
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
              <div className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-white dark:bg-stone-900 border-3 border-brand-500 shadow-sm" />

              {/* Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 shadow-craft-sm hover:shadow-craft transition-all">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-400">{exp.company}</span>
                </div>

                <h3 className="font-display font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-50 mb-3">
                  {exp.role}
                </h3>

                <ul className="space-y-1.5 mb-3">
                  {exp.achievements.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-stone-100 dark:border-stone-800">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-semibold"
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