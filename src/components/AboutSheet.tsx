import { Award, BadgeCheck, FileText } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { CV_URL } from "@/lib/site";

const TOOLS = ["Unity", "C#", "Figma", "Photoshop", "Illustrator", "Clip Studio Paint", "CorelDraw", "GitHub"];

const RECOGNITION = [
  { icon: BadgeCheck, title: "Certified Unity Developer", detail: "Google Play x Unity, 2024" },
  { icon: Award, title: "Best Booth", detail: "KMIPN, 2021" },
  { icon: Award, title: "3rd place, mobile game category", detail: "IMETC, 2020" },
  { icon: Award, title: "Top 5 Favorite", detail: "LINE Creativate, 2018" },
];

export function AboutSheet() {
  return (
    <section id="about" className="border-y border-line/60 bg-panel/40 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
        <div className="lg:col-span-7">
          <div className="flex items-end gap-5">
            <img
              src="/hero.webp"
              alt="Portrait of Mukrom Karunia Azza"
              className="h-28 w-28 shrink-0 rounded-full bg-raised object-cover object-top ring-2 ring-line lg:hidden"
            />
            <h2 className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
              About me
            </h2>
          </div>

          <div className="mt-6 max-w-[60ch] space-y-4 text-lg leading-relaxed text-ink/90">
            <p>
              I&apos;m Azza, a game developer and UI/UX designer from Indonesia with a Game Technology degree from
              PENS. Since December 2023 I&apos;ve been at PT. Kreatif Maju Bersama, designing game UI and building web
              games in Unity.
            </p>
            <p className="text-dim">
              I started in webtoons, writing scripts and base colours for Moon Flower, then drew the UI and art for Mie
              Ayam Simulator at Eternal Clover Studio. Outside work I help organize Global Game Jam Surabaya.
            </p>
          </div>

          <h3 className="mt-10 font-display text-lg font-semibold tracking-tight">Awards &amp; certification</h3>
          <ul className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {RECOGNITION.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-cursor" aria-hidden />
                <span>
                  <span className="font-medium">{title}</span>
                  <span className="block text-sm text-dim">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-display text-lg font-semibold tracking-tight">Skills</h3>
          <dl className="mt-4 divide-y divide-line/70 border-y border-line/70">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="py-3.5">
                <dt className="font-semibold">{cat.title}</dt>
                <dd className="mt-1 text-dim">{cat.skills.map((sk) => sk.name).join(", ")}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 font-display text-lg font-semibold tracking-tight">Tools</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <li key={t} className="rounded-control bg-raised px-3 py-1.5 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>

          <a
            href={CV_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center gap-2 rounded-control border border-line px-5 font-semibold transition-colors hover:border-cursor hover:text-cursor"
          >
            <FileText className="h-4 w-4" />
            Read the full CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
