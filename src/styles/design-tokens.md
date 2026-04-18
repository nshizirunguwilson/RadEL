# RadEl Design Tokens — Reference

> Source of truth: `src/styles/globals.css` — this doc mirrors the `@theme` block. Change the CSS first, then update this doc.

## Colour

| Token | OKLCH | Hex (approx) | Role |
|---|---|---|---|
| `bg` | `oklch(97.5% 0.012 85)` | `#FAF8F3` | Primary page background |
| `surface` | `oklch(94% 0.02 82)` | `#F1ECDF` | Secondary surface — card backs, filter sidebar |
| `divider` | `oklch(82% 0.012 78)` | `#C9C3B7` | Hairline borders, dividers |
| `meta` | `oklch(62% 0.016 78)` | `#8C8579` | Meta text, placeholders, disabled |
| `ink` | `oklch(25% 0.035 215)` | `#123543` | Primary text (brand teal) |
| `ink-strong` | `oklch(16% 0.015 215)` | `#0A1F28` | H1, high-emphasis text |
| `accent` | `oklch(76% 0.155 65)` | `#F5A23A` | Amber — CTAs, active, focus |
| `accent-ink` | `oklch(22% 0.035 215)` | `#0F2D3A` | Teal used as text on amber |
| `sale` | `oklch(54% 0.14 25)` | `#B23C2C` | Sale / error — muted red |
| `success` | `oklch(58% 0.1 150)` | `#478B54` | Success — muted green |
| `focus` | `oklch(76% 0.155 65)` | `#F5A23A` | Focus ring — amber, 2px + 2px offset |

### 60/30/10 split
- **60%** `bg` + `surface`
- **30%** `ink` + `ink-strong` + `divider`
- **10%** `accent` + `sale` / `success`

### Contrast (WCAG 2.1)

| Pair | Ratio | Verdict |
|---|---|---|
| `ink-strong` on `bg` | 14.9 : 1 | AAA |
| `ink` on `bg` | 11.4 : 1 | AAA |
| `ink` on `surface` | 9.8 : 1 | AAA |
| `meta` on `bg` | 4.6 : 1 | AA |
| `accent-ink` on `accent` | 7.1 : 1 | AAA (for buttons) |
| `bg` on `ink-strong` | 14.9 : 1 | AAA |
| `accent` on `bg` | 2.4 : 1 | ❌ Do not use for body text. Display/large only, or icons. |
| `accent` on `ink-strong` | 6.2 : 1 | AA Large. Use sparingly for micro-labels. |

Rule: never put `accent` on `bg` for text smaller than 24px. Use `accent-ink` on `accent`, or `ink-strong` with an `accent` underline.

## Radius

| Token | Value | Role |
|---|---|---|
| `--radius-sm` | `0.375rem` | Buttons, inputs |
| `--radius-md` | `0.625rem` | Cards |
| `--radius-lg` | `1rem` | Hero cards, modals |
| `--radius-xl` | `1.5rem` | Full-bleed editorial sections |

Mixing radii in one view is a rule violation — stick to one scale per component family.

## Typography

| Token | Family | Role |
|---|---|---|
| `--font-display` | Fraunces (variable, `opsz` + `SOFT`) | H1–H4, editorial headings, pull quotes, blog article titles |
| `--font-body` | Poppins | UI, body, labels, nav, prices |

Fraunces `SOFT` defaults to 40 (softer, more editorial), `WONK` 0 (classical), weight ~450. Don't go bold — Fraunces works best between 300 and 500.

## Motion

| Token | Value | Role |
|---|---|---|
| `--dur-fast` | 150ms | Hover, focus, small state changes |
| `--dur-base` | 250ms | Drawer/modal inner content |
| `--dur-mid` | 400ms | Page section entrances |
| `--dur-slow` | 600ms | Hero reveal, route transitions |
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrances (default) |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Fast, dramatic entrances |
| `--ease-in-out-quint` | `cubic-bezier(0.83, 0, 0.17, 1)` | Reversible state (accordion, tabs) |

All motion respects `prefers-reduced-motion: reduce` via the global base layer.

## Spacing rhythm

8-point scale. Default section vertical rhythm: `py-20 md:py-28 lg:py-36`. Content rhythm within: `gap-6 md:gap-8`. Card inner padding: `p-5 md:p-6`. Fine jewelry wants air — don't cram.

## The AI-slop don't list

- No gradients, no glassmorphism, no blur-as-decoration, no glowing borders
- No icon-chip-over-heading templating
- No purple-to-pink, no cyan-on-dark
- No emojis, anywhere
- No centered-hero-with-giant-CTA-and-nothing-else
- No identical card grids repeating forever
