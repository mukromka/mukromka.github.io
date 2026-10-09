# Design — Azza portfolio v3

Rebuild of the portfolio from scratch, keeping the existing content in `src/data/`.

## Research that shaped it

- **Game developer portfolios that get people hired** put the work first: playable or watchable
  builds, and an exact credit (role, platform, tools) on every title. Dean Tate's level design
  site and the 2026 Colorlib round-up of game dev portfolios both lean on this.
- **Interactive game-flavoured portfolios** (Bruno Simon's drivable site, Hugo Peters' animated
  characters, Cherri Hartigan's minigame on Awwwards, the Kaido "world map" template) show that
  the site itself can prove the skill, as long as the content stays one click away.
- **Game UI references** (Game UI Database, HUDS+GUIS): good menus are readable, contextual and
  show one clear selection state.
- **Skills used:** `frontend-design` (Anthropic), `ui-ux-pro-max` (design-system search: suggested
  a scroll-storytelling page with bold asymmetric layout), `impeccable` (craft floor + motion
  rules). They live in `.claude/skills/`.

The previous design (cream paper, vermilion, Space Mono labels, offset shadows) is exactly the
look the `frontend-design` skill lists as an AI default, so it was dropped rather than polished.

## Concept: the site is a game's front end

Azza designs game UI for a living, so the page behaves like one:

| Section | Game-UI pattern | Why |
| --- | --- | --- |
| Hero | **Title screen** with a real keyboard-driven menu (↑ ↓ Enter) over a drifting mosaic of his game art | First proof of UI craft, before reading a word |
| Featured work | **Level select**: ARIA tabs, ← → to switch, art wipes in with a clip-path | Four deep projects, one in focus at a time |
| Game library | **Library grid** with filter tabs and FLIP re-layout; web builds play in a dialog | 14 titles, 4 playable without leaving the page |
| Career | Timeline whose line fills as you scroll | Real sequence, so the progress line carries meaning |
| About | Plain reading layout: bio, pull quote, skills | The quiet part of the page |
| Contact | One big line and the channels | One job |

## Tokens

| Token | Hex | Role |
| --- | --- | --- |
| `night` | `#0F1631` | Page background, a cobalt night that makes saturated game art pop |
| `panel` | `#172046` | Raised surfaces |
| `line` | `#2C3A78` | Hairlines and outlines |
| `ink` | `#EEF0FF` | Text |
| `dim` | `#A9B1DB` | Secondary text (≈8:1 on `night`) |
| `cursor` | `#FFC93C` | **Only** for selection, focus and the primary action — the menu cursor colour |
| `go` | `#5EE6B0` | "Plays in browser" status |

- **Type:** Unbounded (display, wide and logo-like) + Onest (body). No monospace costume.
- **Shape:** 14px radius on media, 10px on controls; soft offset shadows only.
- **Motion:** one authored moment (title-screen boot sequence). Everything else answers input:
  cursor slides, tab wipes, FLIP filtering, dialog open. `MotionConfig reducedMotion="user"`
  plus a CSS fallback stops the mosaic drift and parallax.
- **Sound:** optional 8-bit blips on menu moves, off by default.
