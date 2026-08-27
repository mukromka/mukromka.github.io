"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Check, Copy, Sparkles, MessageCircle } from "lucide-react";
import { sound } from "@/lib/sound";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 0 0 1.63 1.63c.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
    </svg>
  );
}

export function ContactCTA() {
  const [copied, setCopied] = useState(false);
  const email = "mukrom.karunia24@gmail.com";

  const handleCopyEmail = () => {
    sound.playCoin();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-7 sm:p-10 md:p-12 rounded-4xl bg-white dark:bg-stone-900 border-2 border-brand-500/30 shadow-craft text-center overflow-hidden"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-xs font-bold shadow-sm mb-4">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Got an exciting project?</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-50 max-w-lg mx-auto mb-3">
            Let&apos;s work together!
          </h2>

          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base max-w-md mx-auto mb-8">
            Looking for a Game Developer, UI/UX Designer, or creative collaborator? Reach out anytime.
          </p>

          {/* Quick Channels */}
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto mb-6">
            <a
              href="https://wa.me/6282135782644?text=Hi%20Azza%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playPowerUp()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white shadow-craft-sm hover:shadow-craft active:translate-y-0.5 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`mailto:${email}`}
              onClick={() => sound.playPowerUp()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-brand-500 hover:bg-brand-600 text-white shadow-craft-sm hover:shadow-craft active:translate-y-0.5 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full font-bold text-xs sm:text-sm bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Social Link (LinkedIn) */}
          <div className="flex items-center justify-center pt-5 border-t border-stone-100 dark:border-stone-800">
            <a
              href="https://www.linkedin.com/in/mukrom-karunia-azza/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 hover:text-brand-500 transition-colors shadow-sm"
            >
              <LinkedInIcon className="w-4 h-4 text-sky-600" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}