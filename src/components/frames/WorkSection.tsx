"use client";

import { ArrowUpRight, LayoutPanelTop, Play } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import type { FeaturedProject } from "@/types";
import { scrollToLayer } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Frame, Noodle, Pin, Sticky, Tag } from "@/components/workspace/primitives";

const SHAPE = {
  phone: "w-[132px] sm:w-[150px]",
  wide: "w-[260px] sm:w-[300px]",
  square: "w-[150px] sm:w-[180px]",
};

function Overview({ p, index }: { p: FeaturedProject; index: number }) {
  return (
    <Frame name={`${p.title} / Overview`} heading={p.title}>
      <div>
        <div className="relative border-b border-ink/10 bg-[#F4F4F6]">
          <img
            src={p.image}
            alt={`${p.title} screens`}
            data-layer={`Image / ${p.title}`}
            loading="lazy"
            className="block aspect-[1400/955] w-full object-cover"
          />
          <Tag className="bottom-3 left-3" tone="select">
            1400 × 955 · Fill
          </Tag>
        </div>
        <div className="relative grid gap-x-10 gap-y-6 p-5 sm:p-7 md:grid-cols-2">
          <div>
            <h3
              data-layer="H3 / Project title"
              className="font-display text-3xl font-extrabold leading-none tracking-[-0.01em] sm:text-4xl"
            >
              {p.title}
            </h3>
            <p data-layer="Subtitle" className="mt-2 text-ink-mute">
              {p.subtitle}
            </p>

            <dl data-layer="Properties" className="mt-5 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1.5 text-[14px]">
              <dt className="text-ink-faint">Role</dt>
              <dd className="font-medium">{p.role}</dd>
              <dt className="text-ink-faint">When</dt>
              <dd className="font-medium tabular">{p.timeline}</dd>
              <dt className="text-ink-faint">With</dt>
              <dd className="font-medium">{p.type}</dd>
            </dl>

            <p data-layer="Body" className="mt-5 text-[15px] leading-relaxed text-ink/85">
              {p.description}
            </p>
          </div>

          <div>
            <dl className="grid grid-cols-3 gap-2">
              {p.metrics.map((m) => (
                <div
                  key={m.label}
                  data-layer={`Metric / ${m.label}`}
                  className="flex flex-col-reverse gap-1 rounded-lg p-2.5"
                  style={{ background: `${p.tint}14` }}
                >
                  <dt className="text-[12px] leading-tight text-ink-mute">{m.label}</dt>
                  <dd
                    className="font-display text-xl font-extrabold leading-none tabular sm:text-2xl"
                    style={{ color: p.tint }}
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-5 space-y-2 text-[14px] leading-relaxed text-ink/80">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45"
                    style={{ background: p.tint }}
                  />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                data-layer="Link / External"
                className="inline-flex h-11 items-center gap-2 rounded-xl px-4 text-[14px] font-semibold text-white transition-[filter] hover:brightness-110"
                style={{ background: p.tint }}
              >
                {p.linkText}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-md bg-ink/5 px-2 py-1 text-[12px] text-ink-mute">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {index === 0 && (
            <Pin n={2} className="-top-3 right-4" align="right">
              Each project is a section: the overview frame, then the supporting screens connected the way I wire a
              prototype.
            </Pin>
          )}
        </div>
      </div>
    </Frame>
  );
}

function Flow({ p }: { p: FeaturedProject }) {
  return (
    <div className="mt-8 flex flex-wrap items-end gap-x-3 gap-y-6">
      {p.flow.map((f, i) => (
        <div key={f.name} className="contents">
          {i > 0 && <Noodle className="h-6 w-10 self-center" />}
          <figure className={cn("shrink-0", SHAPE[f.shape])}>
            <Frame name={f.name}>
              <img
                src={f.image}
                alt={`${p.title}: ${f.caption}`}
                loading="lazy"
                className="block w-full"
                data-layer={`Image / ${f.name}`}
              />
            </Frame>
            <figcaption className="mt-1.5 text-[12px] text-ink-mute">{f.caption}</figcaption>
          </figure>
        </div>
      ))}
      <Sticky className="w-[220px]" rotate={p.flow.length ? 2 : -2}>
        {p.note}
        {p.playable && (
          <button
            type="button"
            onClick={() => scrollToLayer("games")}
            className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-md bg-[#3A2E00] px-3 text-[13px] font-semibold text-[#FFE27A]"
          >
            <Play className="h-3.5 w-3.5 fill-current" /> Play them
          </button>
        )}
      </Sticky>
    </div>
  );
}

export function WorkSection() {
  return (
    <div id="work" className="scroll-mt-16">
      <h2
        data-layer="Canvas title / Work"
        className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-none tracking-[-0.02em]"
      >
        Selected work
      </h2>
      <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-ink-mute">
        Four projects with exactly what I did on each. The screens next to each overview come straight from my working
        files.
      </p>

      <div className="mt-10 space-y-14">
        {featuredProjects.map((p, i) => (
          <section
            key={p.id}
            id={`work-${p.id}`}
            aria-label={p.title}
            className="relative scroll-mt-20 rounded-xl border p-3 pt-10 sm:p-6 sm:pt-12"
            style={{ borderColor: `${p.tint}55`, background: `${p.tint}0D` }}
          >
            <span
              className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-semibold text-white sm:left-6"
              style={{ background: p.tint }}
            >
              <LayoutPanelTop className="h-3 w-3" aria-hidden />
              {p.title}
            </span>
            <Overview p={p} index={i} />
            <Flow p={p} />
          </section>
        ))}
      </div>
    </div>
  );
}
