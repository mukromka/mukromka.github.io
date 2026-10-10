import { Award, BadgeCheck, FileText } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { CV_URL } from "@/lib/site";

const TOOLS = ["Unity", "C#", "Figma", "Photoshop", "Illustrator", "Clip Studio Paint", "CorelDraw", "GitHub"];

const FACTS = [
  { label: "Now", value: "UI/UX Designer & Game Developer at PT. Kreatif Maju Bersama" },
  { label: "Education", value: "Applied Bachelor in Game Technology, PENS (2019 to 2023)" },
  { label: "Community", value: "Helping organize Global Game Jam Surabaya since 2023" },
];

const RECOGNITION = [
  { icon: BadgeCheck, title: "Certified Unity Developer", detail: "Google Play x Unity, 2024" },
  { icon: Award, title: "Best Booth", detail: "KMIPN, 2021" },
  { icon: Award, title: "3rd place, mobile game category", detail: "IMETC, 2020" },
  { icon: Award, title: "Top 5 Favorite", detail: "LINE Creativate, 2018" },
];

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
              I&apos;m Azza, a game developer and UI/UX designer from Indonesia. I studied Game Technology at
              Politeknik Elektronika Negeri Surabaya, and since December 2023 I&apos;ve worked at PT. Kreatif Maju
              Bersama, designing game UI and building web games in Unity.
            </p>
            <p>
              My first job in the creative industry was writing scripts and doing base colours for Moon Flower on LINE
              Webtoon. I then joined Eternal Clover Studio as a 2D artist and worked on the UI and art for Mie Ayam
              Simulator, my first published game. The Gameseed incubation taught me how much a game&apos;s first few
              minutes matter, and I used that later when redesigning the onboarding for Bos Gabut.
            </p>
            <p>
              Outside work I help organize Global Game Jam Surabaya and have joined several game jams. At Eternal Clover I
              also mentored 2D art interns.
            </p>
          </div>

          <dl className="mt-10 max-w-[62ch] divide-y divide-line/70 border-y border-line/70">
            {FACTS.map((f) => (
              <div key={f.label} className="grid gap-1 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                <dt className="text-sm font-medium text-dim">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-display text-xl font-semibold tracking-tight">Skills</h3>
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

          <h3 className="mt-10 font-display text-xl font-semibold tracking-tight">Tools</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <li key={t} className="rounded-control bg-raised px-3 py-1.5 text-sm font-medium">
                {t}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-xl font-semibold tracking-tight">Awards &amp; certification</h3>
          <ul className="mt-4 space-y-3">
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
