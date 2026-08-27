"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Users, Download } from "lucide-react";
import { sound } from "@/lib/sound";

export function AboutMe() {
  return (
    <section id="about" className="py-16 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold">
              <User className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50 leading-tight">
              Designing games with purpose &amp; playfulness.
            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
              Hi! I&apos;m <strong className="text-stone-900 dark:text-stone-100">Azza</strong>, a Game Developer and UI/UX Designer with 3+ years in the game industry. I&apos;ve shipped 15+ titles across mobile and web, wearing multiple hats as developer, UI designer, and 2D artist.
            </p>

            {/* Vision Quote Block */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-500/10 via-amber-500/10 to-transparent border-l-3 border-brand-500 my-4">
              <blockquote className="font-display font-medium text-sm sm:text-base text-stone-800 dark:text-stone-200 italic leading-snug">
                &ldquo;My vision is to create games that are meaningful and beneficial for as many people as possible — educating, inspiring, and bringing joy beyond entertainment.&rdquo;
              </blockquote>
            </div>

            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
              Beyond game development, I love <strong className="text-stone-900 dark:text-stone-100">mentoring junior artists and interns</strong> to help them grow and ship their own projects.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-3.5"
          >
            {/* Mentorship Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 shadow-craft-sm">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 mb-1">
                Mentorship
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Guiding junior artists on sprite workflows, UI standards, and game design.
              </p>
            </div>

            {/* Education Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 shadow-craft-sm">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-2">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 mb-0.5">
                Politeknik Elektronika Negeri Surabaya
              </h3>
              <p className="text-xs text-stone-500">PENS Alumni • Game Technology</p>
            </div>

            {/* Resume Download CTA */}
            <a
              href="/CV%20Mukrom%20Karunia%20Azza_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playPop()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm bg-brand-500 text-white shadow-craft-sm hover:bg-brand-600 hover:shadow-craft active:translate-y-0.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume (PDF)</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}