"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Trophy } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { sound } from "@/lib/sound";

export function FeaturedWork() {
  return (
    <section id="work" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-craft-sm">
            <Trophy className="w-3.5 h-3.5" />
            <span>Selected Work</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-paper">
            Featured Projects
          </h2>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {featuredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45 }}
                className="group rounded-xl bg-white dark:bg-ink border-2 border-ink dark:border-paper p-5 sm:p-7 shadow-craft-sm hover:shadow-craft transition-all overflow-hidden"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Media */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-ink dark:border-paper shadow-sm">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-5 flex flex-col justify-between ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <div>
                      {/* Meta Pill */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="px-2.5 py-1 rounded-md bg-brand-500/10 text-brand-600 dark:text-brand-400 text-[10px] font-mono font-bold uppercase tracking-widest border border-brand-500/30">
                          {project.role}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-ink/40 dark:text-paper/40 uppercase">
                          {project.timeline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-ink dark:text-paper mb-2 tracking-tight">
                        {project.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-ink/70 dark:text-paper/70 text-sm leading-relaxed mb-5 font-medium">
                        {project.description}
                      </p>

                      {/* Metrics */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-ink/80 border-2 border-ink/10 dark:border-paper/20 flex items-baseline gap-1.5"
                          >
                            <span className="font-display font-bold text-sm text-ink dark:text-paper">
                              {m.value}
                            </span>
                            <span className="text-[9px] font-mono font-bold text-ink/50 dark:text-paper/50 uppercase">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playPop()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider bg-brand-500 hover:bg-brand-600 text-white shadow-craft-sm hover:shadow-craft active:translate-x-0.5 active:translate-y-0.5 transition-all border-2 border-ink dark:border-paper"
                      >
                        <span>{project.linkText}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
