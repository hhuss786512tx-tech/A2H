# Global Food Express — Design Brief

One page. Read before touching components.

## The idea: "Cinematic grocer"

A halal grocery in Fort Bend County, shot like a film. Dark, warm, editorial. The
store is the hero, the spice wall is the set, the butcher counter is the climax.
Nothing on the page should feel like a template, an app, or a marketplace.

## Palette (all tokens live in `src/app/globals.css`)

| Token | Hex | Use |
|---|---|---|
| `--base` | `#07100C` | Page background, deepest surface |
| `--base-2` | `#0D1A13` | Elevated surface (cards, nav) |
| `--base-3` | `#14241B` | Floating surface (menu, modals) |
| `--saffron` | `#E9A83A` | Primary accent, CTAs, counters |
| `--saffron-deep` | `#C9841E` | Hover / pressed saffron |
| `--chili` | `#C83A2E` | Micro-accent only: live dot, one word per section |
| `--cream` | `#F4EBDD` | Body text on dark |
| `--cream-2` | `#CFC4B2` | Secondary text |
| `--pistachio` | `#9FBF8E` | Secondary accent, "Open now", halal mark |
| `--paper` | `#F1E9DA` | Light "paper" section variant background |
| `--paper-ink` | `#14241B` | Text on paper |

No default Tailwind colors, no blue, no indigo, no purple gradients.

## Type

- **Display:** Fraunces (variable, optical size 144, soft axis). Tracking -0.03em
  at hero sizes, -0.02em at section headings. Italic for one word per headline.
- **Body:** Inter Tight. Line-height 1.7. Tracking 0.
- **Scale:** fluid `clamp()` — `--step--1` 0.9rem → `--step-6` 7.5rem.
- Both self-hosted and subset by `next/font`, `font-display: swap`.

## Motion language

- Lenis smooth scroll (lerp 0.09) feeding GSAP ScrollTrigger.
- Easing: `cubic-bezier(.22,1,.36,1)` ("out-expo-ish") for reveals; GSAP `expo.out`.
- Reveals: masked line split-text, 0.9s, 0.06s stagger. Clip-path image expansions.
- Pinned sections: horizontal aisle tour, halal timeline.
- Interactions: magnetic CTAs, custom cursor with states (view / call / directions /
  WhatsApp), tilt + glare on store cards, animated underlines, number tickers.
- Only `transform`, `opacity`, `clip-path`. No `transition-all`. No `shadow-md`.
- `prefers-reduced-motion`: everything renders in its final state. Pins unpin.
  Marquees stop. WebGL never mounts.
- WebGL (OGL fragment shader: warm "spice smoke" with cursor light) mounts only on
  pointer devices, after first paint, never on `saveData` or low-power devices.

## Depth and texture

- Three-surface system: base, elevated, floating.
- Layered multi-radial gradients tinted saffron / pistachio on `--base`.
- SVG `feTurbulence` grain overlay at 5% opacity, fixed, `mix-blend-mode: overlay`.
- Shadows: layered, color-tinted (`rgb(7 16 12 / .6)`), never neutral grey.
- Glass only on the sticky nav and the floating mobile bar.

## Section map (home)

1. Preloader: wordmark reveal + counter, curtain wipe (< 2s, skippable).
2. Hero: full-bleed image/video slot, WebGL smoke, spotlight, split headline,
   magnetic CTA, store status chips.
3. Marquee strip: product names.
4. "What's in the aisles": pinned horizontal aisle tour (Produce → Spices → Halal
   Meat → Frozen → Sweets).
5. Halal standard: calm, respectful. Counters, process timeline. Paper variant.
6. Two stores: interactive cards, open-now, call / directions / WhatsApp, map.
7. Weekly specials teaser + WhatsApp community.
8. From the blog (3 posts).
9. Footer: oversized wordmark, marquee, sitemap, NAP, socials.

## Voice

A grocer who knows their shelves. Specific products (Shan Biryani masala, Daawat
basmati, Ahmed Foods pickles), specific neighborhoods (Greatwood, Brazos Town
Center, Mission Bend, Aliana), specific aisles. Warm, short, confident. No
"welcome", no "one-stop shop", no emojis, no exclamation marks.
