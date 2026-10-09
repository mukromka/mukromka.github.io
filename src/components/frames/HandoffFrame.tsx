"use client";

import { useState } from "react";
import { Check, Copy, FileText, Mail, MessageCircle } from "lucide-react";
import { CV_URL, EMAIL, LINKEDIN_URL, WHATSAPP_URL } from "@/lib/site";
import { Frame, Pin } from "@/components/workspace/primitives";

export function HandoffFrame() {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
    setTimeout(() => setCopied("idle"), 2400);
  };

  return (
    <Frame id="contact" name="Handoff" heading="Contact">
      <div className="relative grid gap-10 p-5 sm:p-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2
            data-layer="H2 / Closing"
            className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.02em]"
          >
            Let&apos;s build something people want to play.
          </h2>
          <p data-layer="Body" className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-mute">
            Hiring for game UI, UI/UX or a Unity developer, or looking for a creative collaborator? Send me a message.
          </p>
        </div>

        {/* Share dialog */}
        <div
          data-layer="Dialog / Share"
          className="rounded-2xl bg-white p-5 shadow-float ring-1 ring-black/5 lg:col-span-6 sm:p-6"
        >
          <p className="text-[15px] font-semibold">Invite Azza to your project</p>
          <div className="mt-4 flex gap-2">
            <label htmlFor="handoff-email" className="sr-only">
              Email address
            </label>
            <input
              id="handoff-email"
              readOnly
              value={EMAIL}
              onFocus={(e) => e.currentTarget.select()}
              className="h-11 min-w-0 flex-1 rounded-lg bg-ink/5 px-3 font-mono text-[13px] text-ink ring-1 ring-inset ring-ink/10 focus:outline-none focus:ring-2 focus:ring-select"
            />
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-ink px-4 text-[14px] font-semibold text-white hover:bg-ink/85"
            >
              {copied === "done" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied === "done" ? "Copied" : "Copy"}
            </button>
          </div>
          <p role="status" className="mt-2 h-5 text-[13px] text-ink-mute">
            {copied === "failed" && "Couldn't copy. Select the address and copy it manually."}
          </p>

          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-azza font-semibold text-white shadow-[0_4px_0_#B9521F] transition-[transform,box-shadow] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none sm:col-span-2"
            >
              <Mail className="h-4 w-4" />
              Email me
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl font-semibold ring-1 ring-ink/15 hover:bg-ink/5"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl font-semibold ring-1 ring-ink/15 hover:bg-ink/5"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.9 0-1.63.73-1.63 1.63a1.63 1.63 0 0 0 1.63 1.63c.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63Z" />
              </svg>
              LinkedIn
            </a>
          </div>
          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-select hover:underline"
          >
            <FileText className="h-4 w-4" />
            Download CV (PDF)
          </a>
        </div>

        <Pin n={6} className="right-4 top-4" align="right">
          Last frame of the file, so it&apos;s the handoff: everything you need to reach me, in one dialog.
        </Pin>
      </div>
    </Frame>
  );
}
