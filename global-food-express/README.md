# Global Food Express — website

Indo-Pak and Mediterranean halal grocery, two stores in Fort Bend County, TX.
Next.js 15 (App Router) + TypeScript + Tailwind v4, statically generated,
deployed on Vercel. Motion: CSS entrances, GSAP + ScrollTrigger + Lenis loaded
after first paint, OGL WebGL shader behind the hero on pointer devices only.

- Design brief: `docs/DESIGN_BRIEF.md`
- Unverified facts the owner must confirm: `TODO_CLIENT.md`
- Photo brief: `PHOTO_SHOTLIST.md`
- Local SEO / GBP / citations: `SEO_CHECKLIST.md`
- Lighthouse numbers: `LIGHTHOUSE.md`

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build (also lints + typechecks)
node serve.mjs         # serve the production build
node screenshot.mjs http://localhost:3000   # full-page shots at 375/768/1024/1440 → ./screenshots
node scripts/qa.mjs    # link crawl, keyboard menu, API validation, reduced-motion, tap targets
```

## Editing content (no component changes needed)

| What | File |
|---|---|
| Hours (per weekday, 24h) | `src/config/hours.ts` — fill both stores; "Open now", footer, schema update automatically |
| Addresses, phones, WhatsApp invite links, map pins, neighborhoods, parking | `src/config/locations.ts` |
| Email, social links, GA id, hero video, nav | `src/config/site.ts` |
| Weekly specials | `src/config/specials.ts` — edit rows, set `example: false`; empty the array for "no specials" |
| Aisles / categories, product lists, FAQs, SEO titles | `src/config/products.ts` |
| Images and alt text | `src/config/images.ts` + files in `public/images/` (same filename + aspect ratio) |
| Location page long copy + FAQs | `src/content/locations.ts` |
| Blog posts | `src/content/blog.ts` (lite-markdown: `##`, `>` answer paragraph, `-` lists, `**bold**`, `[links](/path)`) |
| Design tokens (colors, type scale, easing) | `src/app/globals.css` `:root` |

Hours example:

```ts
rosenberg: [
  { open: "10:00", close: "20:00" }, // Sunday
  { open: "09:00", close: "21:00" }, // Monday
  ... // through Saturday
],
```

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | GA4 measurement id (`G-XXXX`). Events: `phone_click`, `directions_click`, `whatsapp_click`, `form_submit`, `preorder_submit`. |
| `RESEND_API_KEY` | Resend API key for the pre-order / contact form |
| `PREORDER_TO_EMAIL` | Store inbox (comma-separate for several) |
| `PREORDER_FROM_EMAIL` | Verified sender, e.g. `Global Food Express <orders@globalfoodexpress.com>` |

Until the three mail variables are set, the form returns a "call the store"
message instead of sending. Spam protection: hidden honeypot field, a 3-second
render-to-submit floor, zod validation and a per-IP rate limit.

## Deploy to Vercel

This app lives in the `global-food-express/` folder of the A2H repo. Create a
**new Vercel project** from the repo and set **Root Directory** to
`global-food-express`. Framework preset: Next.js. Add the env vars above. Point
`globalfoodexpress.com` at the project. `SITE.url` in `src/config/site.ts`
must match the production domain (it drives canonicals, sitemap and schema).

Check before going live: repo visibility (this repo also holds the agency's
own site), that no API keys are committed (`.env*` is ignored), and that the
form's `PREORDER_TO_EMAIL` is a real inbox.

## Structure

```
src/app            routes (+ opengraph-image.tsx per route, sitemap.ts, robots.ts)
src/components     layout/ (nav, menu, footer, mobile bar) · motion/ · sections/ · ui/
src/config         typed data the owner edits
src/content        long-form copy (blog, location pages)
src/lib            hours logic, schema builders, SEO helpers, motion loader, lite-markdown
scripts            placeholder generator, QA
public/images      photography (placeholders until real shots arrive)
```

## Motion and accessibility rules baked in

- Only `transform`, `opacity` and `clip-path` animate. No `transition-all`, no default shadows.
- `prefers-reduced-motion`: no preloader, no cursor, no pins, no marquee; everything renders in its final state.
- WebGL mounts only on fine-pointer devices with ≥4 cores and no data-saver, after idle.
- Skip link, visible focus ring, 44px+ tap targets, focus-trapped menu with Escape, `inert` on the closed overlay.
- No emoji in the UI. No reviews/ratings schema (none are verifiable).
