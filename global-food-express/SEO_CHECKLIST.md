# SEO checklist — Global Food Express

Target: rank for "halal grocery Rosenberg TX", "halal grocery Sugar Land",
"halal meat Rosenberg / Fort Bend County", "Indian grocery store near me"
(Rosenberg, Sugar Land, Richmond, Missouri City), "Pakistani grocery Houston",
"Mediterranean grocery Sugar Land", "zabiha halal butcher near me", plus
product terms (desi spices and masalas, basmati rice).

## 1. Google Business Profile (one profile per store)

Both profiles must carry **identical NAP** to the website:

- Global Food Express — 235 Minonite Rd, Ste 120, Rosenberg, TX 77469 — (832) 451-6217
- Global Food Express — 10560 Synott Rd, Sugar Land, TX 77498 — (281) 879-4261

Resolve the "World Food Express" naming on Synott Rd first (see TODO_CLIENT #8).

- [ ] Primary category: **Grocery store**. Secondary: Halal restaurant? No. Use: *Indian grocery store*, *Pakistani restaurant*? No. Use: **Indian grocery store**, **Butcher shop**, **Mediterranean grocery**? (pick from available: "Asian grocery store", "Butcher shop", "Middle Eastern grocery store", "Produce market").
- [ ] Attributes: Halal (where offered under "Offerings"), Wheelchair accessible entrance/parking, In-store shopping, In-store pickup (once pre-orders run), Debit/credit cards, NFC payments.
- [ ] Hours, including Ramadan/Eid special hours as "Special hours".
- [ ] Website link: Rosenberg → `/locations/rosenberg-tx`; Sugar Land → `/locations/sugar-land-tx` (UTM: `?utm_source=gbp&utm_medium=organic`).
- [ ] Phone: the store's own number on each profile.
- [ ] Description (750 chars max): lead with "zabiha halal", "Indo-Pak and Mediterranean grocery", city names, 3–4 named products.
- [ ] Photos: 20+ per store at launch: storefront, sign, interior aisles, butcher counter, produce, spice wall, team. Add 2–4 new photos monthly. Use the same shots as `PHOTO_SHOTLIST.md`.
- [ ] Products section: add 10–20 items per store (goat curry cut, basmati 20 lb, Shan masalas, dates, parathas) with photos; prices optional.
- [ ] Services: Custom meat cuts, Pre-orders, Bulk/catering orders.
- [ ] Q&A: seed 6 questions per store (Is all meat zabiha? Do you take pre-orders? Parking? Mediterranean items? Hours during Ramadan? Where exactly is Suite 120?). Answer from the owner account.
- [ ] Posts: weekly "Specials" post (same content as `/weekly-specials`), Eid/Ramadan hours post, new arrivals.
- [ ] Reviews: ask at checkout with a QR to the review link; reply to every review within 48 hours. **Never add review schema to the site**; Google reads reviews from the profile.
- [ ] Messaging: turn on and route to the WhatsApp-staffed phone.

## 2. Citations (same NAP everywhere, same spelling "Minonite Rd")

Create or claim, in this order:

- [ ] Apple Business Connect (Apple Maps) — both stores
- [ ] Bing Places — import from GBP
- [ ] Yelp — claim both; fix the Synott Rd name
- [ ] Facebook Page — one page, two locations (Locations feature)
- [ ] Instagram — business account linked to the FB page
- [ ] Nextdoor Business — Rosenberg and Sugar Land
- [ ] Yellow Pages / yp.com
- [ ] Zabihah.com — halal grocery listing for each store (category: Grocery / Butcher)
- [ ] HalalTrip / Halal Navi (optional)
- [ ] Houston-area desi directories: Houston Pakistani community groups, ISGH-area mosque newsletters (Masjid Al-Mustafa Rosenberg, Sugar Land masjids) — ask for a "where to buy halal" mention
- [ ] Fort Bend Chamber of Commerce (Rosenberg-Richmond) — member listing
- [ ] Foursquare, MapQuest, Here (data aggregators pick these up)

Add every live profile URL to `SITE.social` in `src/config/site.ts` so they appear in `sameAs` schema and the footer.

## 3. Google Search Console + sitemap

- [ ] Verify the domain property (DNS TXT) in Search Console.
- [ ] Submit `https://globalfoodexpress.com/sitemap.xml` (auto-generated; 25 URLs).
- [ ] Submit the same sitemap in Bing Webmaster Tools.
- [ ] Request indexing for `/`, both location pages, `/halal`, `/products/halal-meat`.
- [ ] After 2 weeks: check Coverage for errors, Enhancements → FAQ / Breadcrumb / Article reports.
- [ ] Set up GA4 (`NEXT_PUBLIC_GA_ID`) and link it to Search Console. Mark `phone_click`, `directions_click`, `whatsapp_click`, `preorder_submit` as key events.

## 4. On-page (already built; verify after each content edit)

- [x] One H1 per page; H2/H3 hierarchy
- [x] Unique `<title>` ≤ 60 chars, meta description ≤ 155 chars, canonical on every page
- [x] OG + Twitter cards with a generated 1200×630 image per route
- [x] `sitemap.xml`, `robots.txt`, `llms.txt`
- [x] JSON-LD: Organization, WebSite, GroceryStore ×2 (with geo, areaServed, hasMap, priceRange; hours appear once configured), BreadcrumbList on inner pages, FAQPage on category/location/halal pages, Article on posts, ItemList on hubs
- [x] Descriptive alt text on every image (update when real photos land)
- [x] 400+ words of unique copy on each location page; 700+ words per article
- [ ] Validate each template URL in the Rich Results Test after deploy
- [ ] Internal links: when writing new posts, link to at least one category page and one location page

## 5. Content calendar (first 90 days)

1. Launch: 6 articles live (done).
2. Month 1: "Ramadan hours and what to buy first" seasonal update; "Where to park at the Rosenberg store" micro-post with photos.
3. Month 2: "Goat vs lamb for biryani"; "Our Sugar Land Mediterranean aisle, item by item".
4. Month 3: "Mango season at Global Food Express"; customer FAQ roundup.
Each post: 700+ words, answer-first opening paragraph, 3+ internal links, one real photo.

## 6. GEO / AI-search readiness (done)

- Answer-first paragraphs (`>` blocks) at the top of every article and location page
- Clear definitions (zabiha, sella, za'atar) in plain sentences
- FAQ blocks with schema on category, location and halal pages
- `public/llms.txt` summarising the business and page map
