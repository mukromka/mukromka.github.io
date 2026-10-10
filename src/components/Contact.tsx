"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail, MessageCircle } from "lucide-react";
import { sound } from "@/lib/sound";
import { GameMosaic } from "./GameMosaic";
import { CV_URL, EMAIL, LINKEDIN_URL, WHATSAPP_URL } from "@/lib/site";

export function Contact() {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied("done");
      sound.playCoin();
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2400);
  };

  return (
    <>
      <section id="contact" className="relative isolate overflow-hidden py-28 sm:py-40">
        <GameMosaic fade="top" />
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <h2 className="font-display text-[clamp(2.25rem,6.4vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            Let&apos;s make something people want to play.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-dim">
            Hiring a game developer or UI/UX designer, or looking for a creative collaborator? Reach out anytime.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => sound.playPowerUp()}
              className="inline-flex h-14 items-center gap-2.5 rounded-control bg-cursor px-7 font-display text-base font-semibold text-cursor-ink transition-[filter,transform] hover:brightness-105 active:translate-y-px sm:text-lg"
            >
              <Mail className="h-5 w-5" />
              Email me
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex min-h-11 items-center gap-2 rounded-control px-3 text-dim transition-colors hover:text-ink"
            >
              <span className="break-all">{EMAIL}</span>
              <span className="relative grid h-5 w-5 place-items-center">
                <AnimatePresence mode="wait" initial={false}>
                  {copied === "done" ? (
                    <motion.span key="ok" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                      <Check className="h-4 w-4 text-go" />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Copy className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>
            <p role="status" className="h-5 text-sm">
              {copied === "done" && <span className="text-go">Email address copied</span>}
              {copied === "failed" && <span className="text-dim">Couldn&apos;t copy. Select the address above instead.</span>}
            </p>
          </div>

          <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-3">
            <li>
              <ChannelLink href={WHATSAPP_URL} icon={<MessageCircle className="h-4 w-4" />}>
                WhatsApp
              </ChannelLink>
            </li>
            <li>
              <ChannelLink href={LINKEDIN_URL} icon={<LinkedInIcon className="h-4 w-4" />}>
                LinkedIn
              </ChannelLink>
            </li>
            <li>
              <ChannelLink href={CV_URL} icon={<ArrowUpRight className="h-4 w-4" />}>
                CV (PDF)
              </ChannelLink>
            </li>
          </ul>
        </div>
      </section>

      <footer className="border-t border-line/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-dim sm:flex-row sm:px-6 lg:px-10">
          <p>© {new Date().getFullYear()} Mukrom Karunia Azza. Built with Next.js and Framer Motion.</p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-1.5 rounded-control px-2 transition-colors hover:text-ink">
            Back to the title screen
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </footer>
    </>
  );
}

function ChannelLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => sound.playPop()}
      className="inline-flex h-11 items-center gap-2 rounded-control border border-line px-4 font-medium transition-colors hover:border-cursor hover:text-cursor"
    >
      {icon}
      {children}
    </a>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 0 0 1.63 1.63c.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
    </svg>
  );
}
