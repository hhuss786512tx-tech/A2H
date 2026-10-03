# TODO_CLIENT — facts the owner must confirm before launch

Nothing on this list has been invented. Each item is either missing from the
current site and public listings, or could not be verified. The site ships in a
safe state for every item (no "Open now", no certifier named, no email shown).

## Blocking for launch

| # | Item | Where to set it | Why it matters |
|---|------|-----------------|----------------|
| 1 | **Store hours, both locations** (per weekday, open/close) | `src/config/hours.ts` | Powers the "Open now / Closes at" badge, the footer, the location pages and `openingHoursSpecification` in the GroceryStore schema. Until set, the site says "Hours: call to confirm". |
| 2 | **A public email address** | `src/config/site.ts` → `email` | Shown in footer/contact and in the schema. Also needed as the inbox for the pre-order form (`PREORDER_TO_EMAIL`). |
| 3 | **Pre-order form delivery** | Vercel env: `RESEND_API_KEY`, `PREORDER_TO_EMAIL`, `PREORDER_FROM_EMAIL` (a verified sender on your domain) | Until set, the form returns a friendly "call the store" message instead of sending. |
| 4 | **WhatsApp community invite links** (one per store) | `src/config/locations.ts` → `whatsappInvite` | The in-store QR codes point at these. Until set, WhatsApp buttons open a direct chat with the store phone. Also export each QR as `public/images/whatsapp-qr-rosenberg.jpg` / `-sugar-land.jpg` (800×800). |
| 5 | **Real photography** | `public/images/` per `PHOTO_SHOTLIST.md` | Every image is a labeled placeholder. The design depends on real shots; even 10–15 phone photos in good light will transform it. |
| 6 | **Weekly specials** | `src/config/specials.ts` | Example rows with `price: "TODO"` are shown as a layout preview. Replace them and set `example: false`, or empty the list. |

## Confirm or correct

| # | Item | Current state | Where |
|---|------|---------------|-------|
| 7 | Street spelling **"Minonite Rd"** | Kept as the business spells it. It matches Google's index and neighbouring listings on the same road (e.g. 503 Minonite Rd). It is a real Rosenberg street name, not a typo for "Mennonite". Confirm the Google Business Profile uses the same spelling. | `src/config/locations.ts` |
| 8 | **Sugar Land store public name** | Yelp lists 10560 Synott Rd, (281) 879-4261 as "World Food Express" (international grocery). If that is the same business, decide on one public name and make every listing match (NAP consistency). | `TODO_CLIENT` FAQ on the Sugar Land page; `SEO_CHECKLIST.md` |
| 9 | **Map pins / coordinates** | Approximate lat/lng entered from public map data. Confirm against the GBP pin. | `src/config/locations.ts` → `geo` |
| 10 | **Halal certifier / supplier name** | Not published anywhere. Left `null`; the halal page FAQ answer is marked TODO and excluded from schema. Never claim a certifier that cannot be shown on a document. | `src/config/site.ts` → `halalCertifier`, `src/app/halal/page.tsx` FAQ |
| 11 | **Founding year / legal entity name** | Unknown. About page copy avoids a date; footer uses "Global Food Express". | `src/config/site.ts` |
| 12 | **Social profiles** (Facebook, Instagram, TikTok, Yelp, GBP URL) | None found. Empty entries are not rendered. | `src/config/site.ts` → `social` |
| 13 | **Qurbani / Udhiya orders** | FAQ answer marked TODO (hidden from schema). | `src/config/products.ts` (halal-meat FAQ) |
| 14 | **Produce delivery days, paratha brands, basmati brands, fresh mithai supplier** | Marked TODO in category FAQs; the public text is trimmed to what is safe. | `src/config/products.ts` |
| 15 | **Brand/product list accuracy** | Category product lists name common Indo-Pak and Mediterranean brands. Remove anything not actually stocked. | `src/config/products.ts` |
| 16 | **Parking and directions text** | Written from public map data. Walk it once and correct. | `src/config/locations.ts`, `src/content/locations.ts` |
| 17 | **Legal pages** | Privacy and Terms are plain drafts. Have them reviewed. | `src/app/privacy`, `src/app/terms` |
| 18 | **GA4 measurement ID** | Not set. Events (`phone_click`, `directions_click`, `whatsapp_click`, `form_submit`, `preorder_submit`) fire once `NEXT_PUBLIC_GA_ID` is set. | Vercel env |
| 19 | **Domain** | Code assumes `https://globalfoodexpress.com` for canonicals, sitemap and schema. | `src/config/site.ts` → `url` |

## Not done in this environment (network policy)

- The live site, Google Maps, Yelp and image hosts were blocked by the build
  environment's egress policy, so **no photos could be copied from the current
  site** and **no Lighthouse baseline of the current site** could be recorded.
  Run `npx lighthouse https://globalfoodexpress.com --preset=perf` once to
  capture the "before" numbers (see `LIGHTHOUSE.md`).
- Rich Results Test could not be reached; schema was validated locally for
  required fields. Paste each URL into https://search.google.com/test/rich-results after deploy.
