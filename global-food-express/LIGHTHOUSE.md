# Lighthouse — before and after

Mobile, Lighthouse 12, simulated 4G + 4× CPU slowdown, headless Chromium 143,
run against the local production build (`npm run build && node serve.mjs`).

## Before (current site, globalfoodexpress.com)

Could not be measured from the build environment: the domain is blocked by the
environment's network policy. Record it once from any machine:

```
npx lighthouse https://globalfoodexpress.com --form-factor=mobile --screenEmulation.mobile --output=html --output-path=before.html
```

Paste the four scores here.

| Metric | Before |
|---|---|
| Performance | _TODO_ |
| Accessibility | _TODO_ |
| Best Practices | _TODO_ |
| SEO | _TODO_ |

## After (this build)

See the table at the bottom of this file; it is appended by the final QA run.

### Mobile (13 pages)

| Page | Perf | A11y | Best Practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 95 | 100 | 100 | 100 | 2.8 s | 0 | 30 ms |
| `/locations/rosenberg-tx` | 97 | 100 | 100 | 100 | 2.5 s | 0.018 | 40 ms |
| `/locations/sugar-land-tx` | 97 | 100 | 100 | 100 | 2.5 s | 0 | 30 ms |
| `/products` | 99 | 100 | 100 | 100 | 2.1 s | 0 | 50 ms |
| `/products/halal-meat` | 94 | 100 | 100 | 100 | 2.9 s | 0.007 | 60 ms |
| `/products/spices-masalas` | 94 | 100 | 100 | 100 | 3.0 s | 0.007 | 70 ms |
| `/blog` | 97 | 98 | 100 | 100 | 2.4 s | 0 | 30 ms |
| `/blog/what-zabiha-halal-means` | 93 | 100 | 100 | 100 | 3.1 s | 0.007 | 60 ms |
| `/halal` | 94 | 100 | 100 | 100 | 3.0 s | 0.009 | 70 ms |
| `/about` | 94 | 100 | 100 | 100 | 3.0 s | 0.014 | 50 ms |
| `/contact` | 98 | 100 | 100 | 100 | 2.4 s | 0 | 60 ms |
| `/weekly-specials` | 98 | 100 | 100 | 100 | 2.4 s | 0 | 60 ms |
| `/whatsapp` | 98 | 100 | 100 | 100 | 2.4 s | 0.012 | 50 ms |

### Desktop

| Page (desktop) | Perf | A11y | BP | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| `/` | 98 | 100 | 100 | 100 | 0.6 s | 0.008 | 0 ms |
| `/locations/rosenberg-tx` | 100 | 100 | 100 | 100 | 0.7 s | 0.005 | 0 ms |

Notes: LCP values are Lighthouse's simulated 4G figures, which model every request started before paint; observed LCP on an unthrottled run is 0.2–0.3 s. CLS values under 0.02 come from the body font swap (next/font applies size-adjusted fallbacks). The first-load JS on the home page is 127 kB (103 kB shared React/Next); GSAP, ScrollTrigger, Lenis and OGL load after first paint.
