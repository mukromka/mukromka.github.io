# Design — Azza portfolio v4: "the portfolio is a design file"

Rebuild of v3 after feedback: the About page and the copy read as templates and didn't prove UI/UX skill.

## Decisions confirmed with Azza

- Concept: **designer's canvas**. The whole site behaves like a design tool file.
- Numbers: **Mie Ayam Simulator 80K+ downloads**, **Bos Gabut 10K+ users within two months** of the new FTUE.
  The old "4.5★" rating was removed: the Play Store screenshot in the portfolio PDF shows 3.8★.
- Language: English.
- Extra CV material (awards, certifications, community) only as a glimpse, not as new sections.

## Sources used for content

`CV Mukrom Karunia Azza_2026.pdf`, `MukromKaruniaAzza_CV_GamesInstitut2026.pdf`,
`MukromKaruniaAzza_Portfolio_Academy.pdf` and `MukromKaruniaAzza_Portfolio_GamesInstitut2026.pdf`.
Case-study images in `public/case/` are crops of the GamesInstitut portfolio pages
(Bos Gabut FTUE and 1.0 vs 2.0, Mie Ayam screens, Moon Flower colouring process).

## How the concept shows UI/UX skill

| Part | Design-tool pattern | What it proves |
| --- | --- | --- |
| Toolbar | Notes toggle (key `A`), Play, live presence avatar | Working controls only, no fake chrome |
| Layers panel | Frame tree with scroll-synced selection | Navigation as information architecture |
| Inspector | Reads size, font and colour of whatever you hover, live from the DOM | Handoff literacy |
| Cover | Azza's cursor draws a selection around the headline on load; photo selected with handles and spec tags | One authored intro moment |
| Work | Each project is a section: overview frame plus real screens wired with prototype noodles and a sticky note | Process, not just mockups |
| Games | Cards are one component with Playable/Store variants; WebGL builds play in a dialog | Component thinking + playable proof |
| Career | Gantt bars on a real year axis, select to expand | Data shown in the right form |
| About | Azza as a **main component with a Role variant** (UI/UX, game dev, 2D art & writer) and a properties panel | The signature interaction |
| Handoff | Contact as a share dialog | Clear last step |

Redlines (`Gap`) measure their own rendered height; frame sizes are live (`ResizeObserver`).

## Tokens

Chrome `#2C2C31`, canvas `#E6E6EB` with 24px dots, ink `#16161B`, Azza orange `#E8743B`
(from Azza's own portfolio PDF), selection `#2F6BFF`, redline `#EC2F68`, component `#8B5CF6`.
Type: Baloo 2 (display, matches Azza's PDF), Inter (tool chrome and body), JetBrains Mono (measurements only).

## Skills used

`frontend-design`, `ui-ux-pro-max`, `impeccable` in `.claude/skills/`.
