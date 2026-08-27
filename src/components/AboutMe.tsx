"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, GraduationCap, Users, FileText } from "lucide-react";
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-craft-sm">
              <User className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-paper leading-tight tracking-tight">
              Designing games with purpose &amp; playfulness.
            </h2>

            <p className="text-ink/70 dark:text-paper/70 text-sm sm:text-base leading-relaxed">
              Hi! I&apos;m <strong className="text-ink dark:text-paper">Azza</strong>, a Game Developer and UI/UX Designer with 3+ years in the game industry. I&apos;ve shipped 15+ titles across mobile and web, wearing multiple hats as developer, UI designer, and 2D artist.
            </p>

            {/* Vision Quote Block */}
            <div className="p-4 sm:p-5 rounded-xl bg-brand-500/10 border-l-4 border-brand-500 my-4">
              <blockquote className="font-display font-medium text-sm sm:text-base text-ink dark:text-paper italic leading-snug">
                &ldquo;My vision is to create games that are meaningful and beneficial for as many people as possible — educating, inspiring, and bringing joy beyond entertainment.&rdquo;
              </blockquote>
            </div>

            <p className="text-ink/70 dark:text-paper/70 text-sm leading-relaxed">
              Beyond game development, I love <strong className="text-ink dark:text-paper">mentoring junior artists and interns</strong> to help them grow and ship their own projects.
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
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center mb-2 border-2 border-ink dark:border-paper">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-base text-ink dark:text-paper mb-1 tracking-tight">
                Mentorship
              </h3>
              <p className="text-xs text-ink/60 dark:text-paper/60">
                Guiding junior artists on sprite workflows, UI standards, and game design.
              </p>
            </div>

            {/* Education Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-ink border-2 border-ink dark:border-paper shadow-craft-sm">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center mb-2 border-2 border-ink dark:border-paper">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-base text-ink dark:text-paper mb-0.5 tracking-tight">
                Politeknik Elektronika Negeri Surabaya
              </h3>
              <p className="text-xs text-ink/60 dark:text-paper/60">PENS Alumni • Game Technology</p>
            </div>

            {/* Resume Download CTA */}
            <a
              href="/CV%20Mukrom%20Karunia%20Azza_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playPop()}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-bold text-sm uppercase tracking-wider bg-brand-500 text-white shadow-craft-sm hover:shadow-craft hover:bg-brand-600 active:translate-x-0.5 active:translate-y-0.5 transition-all border-2 border-ink dark:border-paper"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume (PDF)</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
