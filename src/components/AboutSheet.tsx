import { FileText, GraduationCap, Users } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { CV_URL } from "@/lib/site";

const TOOLS = ["Unity", "C#", "Unity WebGL", "Figma", "GitHub"];

export function AboutSheet() {
  return (
    <section id="about" className="border-y border-line/60 bg-panel/40 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
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

          <div className="mt-8 max-w-[62ch] space-y-5 text-lg leading-relaxed text-ink/90">
            <p>
              I&apos;m Azza, a game developer and UI/UX designer with 3+ years in the games industry. I&apos;ve shipped
              15+ titles across mobile and web, switching between developer, UI designer and 2D artist depending on
              what the team needs.
            </p>
            <p className="text-dim">
              That mix is the point: I design a HUD knowing how it will be built in Unity, and I write the C# knowing
              what the player is supposed to feel when they tap.
            </p>
          </div>

          <figure className="mt-12 max-w-[36rem]">
            <blockquote className="font-display text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              <span aria-hidden className="text-cursor">“</span>My vision is to create games that are meaningful and
              beneficial for as many people as possible: educating, inspiring and bringing joy beyond entertainment.
              <span aria-hidden className="text-cursor">”</span>
            </blockquote>
          </figure>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-4">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-cursor" aria-hidden />
              <div>
                <dt className="font-semibold">Politeknik Elektronika Negeri Surabaya</dt>
                <dd className="mt-1 text-dim">PENS alumni, Game Technology</dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-cursor" aria-hidden />
              <div>
                <dt className="font-semibold">Mentoring</dt>
                <dd className="mt-1 text-dim">Guiding junior artists and interns on sprite workflows, UI standards and game design.</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-display text-xl font-semibold tracking-tight">What I bring to a team</h3>
          <div className="mt-6 divide-y divide-line/70 border-y border-line/70">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="grid grid-cols-[9.5rem_1fr] gap-4 py-5 sm:grid-cols-[11rem_1fr]">
                <h4 className="font-semibold">{cat.title}</h4>
                <ul className="space-y-1.5 text-dim">
                  {cat.skills.map((s) => (
                    <li key={s.name}>{s.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="mt-10 font-display text-xl font-semibold tracking-tight">Daily tools</h3>
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
            className="mt-10 inline-flex h-12 items-center gap-2 rounded-control border border-line px-5 font-semibold transition-colors hover:border-cursor hover:text-cursor"
          >
            <FileText className="h-4 w-4" />
            Read the full CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
