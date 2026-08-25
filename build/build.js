#!/usr/bin/env node
// Generates every page except index.html, which stays hand-maintained.
// Run:  node build/build.js      (or: npm run build:pages)

const fs = require('fs');
const path = require('path');
const { page, SITE, EMAIL } = require('./partials');
const B = require('./blocks');

const OUT = path.join(__dirname, '..');

// Structured data. Address and telephone are deliberately absent rather than
// invented — Google penalises NAP data that disagrees with the Business
// Profile, so these get added once the real values are confirmed.
const ORG = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': SITE + '/#organization',
  name: 'A2H Agency',
  url: SITE + '/',
  email: EMAIL,
  description: 'Hand-coded websites and Google Business Profile setup for Texas businesses.',
  areaServed: { '@type': 'State', name: 'Texas' },
  serviceType: ['Website Design', 'Website Development', 'Local SEO', 'Google Business Profile Setup'],
  knowsAbout: ['Web design', 'Local SEO', 'Google Business Profile', 'Conversion optimization'],
};

const serviceLd = (name, description, audience) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  provider: { '@id': SITE + '/#organization' },
  areaServed: { '@type': 'State', name: 'Texas' },
  audience: { '@type': 'Audience', audienceType: audience },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '1497',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '1497',
      maxPrice: '4997',
      priceCurrency: 'USD',
    },
  },
});

const faqLd = (qas) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qas.map(([q, a]) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

const hero = ({ eyebrow, h1, sub, primary = 'Get My Free Score', secondary = null }) => `<section class="relative glow-copper pt-36 pb-20 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-4xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">${eyebrow}</p>
    <h1 class="reveal font-display text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-6">${h1}</h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto mb-10">${sub}</p>
    <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
      <span class="cta-ring rounded-full p-[2px] inline-block">
        <a href="#" class="score-trigger btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-7 py-3.5 rounded-full text-[15px] block">${primary}</a>
      </span>
${secondary ? `      <a href="${secondary[1]}" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">${secondary[0]}</a>\n` : ''}    </div>
  </div>
</section>`;

const cards = (eyebrow, heading, items, cols = 2) => `<section class="py-20 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="reveal mb-12 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">${eyebrow}</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">${heading}</h2>
    </div>
    <div class="grid sm:grid-cols-${cols} gap-5">
${items.map((it, i) => `      <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-7" style="transition-delay:${i * 70}ms">
        <p class="text-copper-light text-sm font-semibold mb-2">${String(i + 1).padStart(2, '0')} — ${it.tag}</p>
        <h3 class="font-display text-xl text-sand mb-2">${it.h}</h3>
        <p class="text-fog text-sm leading-[1.7]">${it.p}</p>
      </div>`).join('\n')}
    </div>
  </div>
</section>`;

const faqSection = (qas) => `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-3xl mx-auto">
    <h2 class="reveal font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-10 text-center">Common questions</h2>
    <div class="space-y-4">
${qas.map(([q, a]) => `      <details class="reveal group rounded-2xl bg-elevated border border-white/5 px-6 py-5">
        <summary class="flex items-center justify-between cursor-pointer list-none text-sand font-semibold text-sm">
          <span>${q}</span>
          <svg class="shrink-0 ml-4 transition-transform duration-200 group-open:rotate-45 text-copper-light" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </summary>
        <p class="text-fog text-sm leading-[1.8] mt-4">${a}</p>
      </details>`).join('\n')}
    </div>
  </div>
</section>`;

// ============================================================== the pages ===

const PAGES = [];

// ---- work.html
PAGES.push({
  slug: 'work.html',
  title: 'Our Work — Websites Built for Texas Businesses | A2H',
  description: 'Live sites and builds by A2H: Solid State Construction, Azul Bio Research, Quality Halal Market and CareMedBill. See what we ship and how it performs.',
  jsonLd: [ORG],
  body: [
    hero({
      eyebrow: 'Selected Work',
      h1: 'Every build, <span class="italic text-copper-light">start to launch.</span>',
      sub: 'Four builds across construction, biotech, retail and medical billing. Two are live on client domains; two are complete builds hosted on our own account. Every one is hand-coded — no page builders anywhere.',
      secondary: ['See Pricing', 'pricing.html'],
    }),
    B.portfolioGrid({
      heading: 'Real businesses, <span class="italic text-copper-light">real launches.</span>',
      sub: 'Click any card to open the live build in a new tab.',
    }),
    cards('What Every Build Includes', 'The same standard on every project', [
      { tag: 'Hand-coded', h: 'No page builders', p: 'No Divi, no Elementor, no WordPress theme bloat. Clean HTML, CSS and JavaScript you actually own and can hand to anyone.' },
      { tag: 'Mobile-first', h: 'Built for the small screen first', p: 'Most local searches happen on a phone. Every layout is designed at 390px before it is designed at 1440px, not squeezed down afterwards.' },
      { tag: 'Found on Maps', h: 'Google Business Profile setup', p: 'Your profile claimed, categorised and wired to the site, so you appear where customers are already searching.' },
      { tag: 'Fast', h: '90+ PageSpeed target', p: 'Compressed modern image formats, lazy loading, and an ahead-of-time CSS build. Speed is a ranking factor and a conversion factor.' },
    ]),
    B.ctaBand({ heading: 'Want yours in <span class="italic">this list?</span>' }),
  ].join('\n\n'),
});

// ---- pricing.html
const PRICING_FAQ = [
  ['How does payment work?', 'Starter is billed 50% to start and 50% at launch. Professional and Premium can be paid in full up front, or spread over 4 monthly payments instead — the scope is fixed in writing before any money changes hands either way, so the number you are quoted is the number you pay.'],
  ['Can I pay monthly instead of all at once?', 'Yes, on Professional and Premium. Professional is $568.75/mo for 4 months ($2,275 total) instead of $3,000 in full; Premium is $875/mo for 4 months ($3,500 total) instead of $5,000 in full. Spreading it out is the cheaper route on those two tiers — Starter does not have a monthly option, but its 50/50 split already means you are never paying it all at once.'],
  ['What is the Care Plan?', 'Hosting, maintenance and monthly content edits. It is included free for 2, 6 or 12 months depending on your tier, then continues at $249/mo. You can cancel it at any time and keep your site.'],
  ['Do I own the site?', 'Yes, completely. It is hand-coded static files — there is no proprietary platform to be locked into, and you get a walkthrough at handoff so you are never dependent on us to make a change.'],
  ['How fast is "2–3 days"?', 'That is the build-and-launch window once we have your content, photos and brand assets in hand. Gathering those from you is usually the longer part, which is why the free score comes first.'],
  ['What if I do not have a website yet?', 'That is the most common case. Leave the URL field blank on the score form and we will score your Google Business Profile and local search position instead.'],
  ['Is the AI chatbot really $99/mo?', 'Yes, on Starter and Professional. It is trained on your business, answers FAQs and captures leads around the clock. It is included at no extra cost on Premium.'],
];

PAGES.push({
  slug: 'pricing.html',
  title: 'Pricing — Flat-Rate Websites from $1,500 | A2H',
  description: 'Transparent flat-rate website pricing for Texas businesses: $1,500 Starter, $3,000 Professional, $5,000 Premium. Care Plan included, no long-term contract.',
  jsonLd: [ORG, faqLd(PRICING_FAQ)],
  body: [
    hero({
      eyebrow: 'Transparent Pricing',
      h1: 'One flat price. <span class="italic text-copper-light">No sales call required.</span>',
      sub: 'Three tiers, published openly, fixed in writing before the work starts. Every tier includes Google Business Profile setup and a Care Plan.',
      secondary: ['See Our Work', 'work.html'],
    }),
    B.pricingTable({ heading: 'Pick the tier that fits' }),
    `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-4xl mx-auto">
    <div class="reveal text-center mb-10">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Add-Ons</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">Two upgrades, priced plainly</h2>
    </div>
    <div class="grid sm:grid-cols-2 gap-6">
      <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8">
        <h3 class="text-sand font-semibold text-lg mb-2">AI Website Chatbot</h3>
        <p class="text-sm text-fog leading-[1.7] mb-5">Trained on your business — answers FAQs, qualifies visitors and captures leads 24/7, even after hours. Add it to any plan.</p>
        <div class="flex items-baseline gap-2">
          <p class="font-display text-2xl text-copper-light">+$99</p>
          <p class="text-xs text-fog uppercase tracking-wider">per month · included on Premium</p>
        </div>
      </div>
      <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8">
        <h3 class="text-sand font-semibold text-lg mb-2">3D Company Card</h3>
        <p class="text-sm text-fog leading-[1.7] mb-5">An interactive business card built from your real card artwork — flips, tilts and tracks the cursor. A memorable thing to send a prospect.</p>
        <div class="flex items-baseline gap-2">
          <p class="font-display text-2xl text-copper-light">+$99</p>
          <p class="text-xs text-fog uppercase tracking-wider">one-time · included on Professional &amp; Premium</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
    faqSection(PRICING_FAQ),
    B.ctaBand({ heading: 'Not sure which tier <span class="italic">you need?</span>', sub: 'The free score tells you — no obligation either way.' }),
  ].join('\n\n'),
});

// ---- process.html
PAGES.push({
  slug: 'process.html',
  title: 'How We Work — From Free Score to Launch in 2–3 Days | A2H',
  description: 'The A2H process: free website score, hand-coded build, launch and handoff, then proof with real data. Fixed scope, fixed price, no long-term contract.',
  jsonLd: [ORG, {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How A2H builds and launches a website',
    description: 'A four-step process from free website score to launch and reporting.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Free website score', text: 'We score your current site and Google Business Profile out of 100 and show you what is costing you customers.' },
      { '@type': 'HowToStep', position: 2, name: 'Hand-coded build', text: 'A conversion-first site is built by hand, wired to real lead capture from day one.' },
      { '@type': 'HowToStep', position: 3, name: 'Launch and handoff', text: 'Fully tested, live on your domain, with a walkthrough so you are never locked out of your own site.' },
      { '@type': 'HowToStep', position: 4, name: 'Prove it with data', text: 'Real performance numbers after launch, not projections.' },
    ],
  }],
  body: [
    hero({
      eyebrow: 'The Blueprint',
      h1: 'From first look to live site, <span class="italic text-copper-light">in days.</span>',
      sub: 'No discovery-call theatre, no six-week timeline, no invoice that grows after you sign. Four steps, fixed scope, and you own everything at the end.',
      secondary: ['See Pricing', 'pricing.html'],
    }),
    cards('The Process', 'Four steps, start to finish', [
      { tag: 'Free, no obligation', h: 'We score what you have', p: 'We look at your current site, your Google Business Profile and what your competitors rank for, then hand you a score out of 100 and show you specifically what is losing you customers. If the answer is "nothing, you are fine", we say that.' },
      { tag: 'Hand-coded', h: 'We build it properly', p: 'No page builders, no templates. A conversion-first site wired to real lead capture from day one, built mobile-first and tested on real devices before you ever see it.' },
      { tag: 'Yours to keep', h: 'We launch and hand it off', p: 'Fully tested, live on your domain, plus a walkthrough so you are never locked out of your own site. Static files you own outright — no proprietary platform, no hostage situation.' },
      { tag: 'Real numbers', h: 'We prove it with data', p: 'A $200 Google Ads test on Solid State Construction\'s new site returned 270+ clicks in 14 days at $0.74 per click. Measured results after launch, never projections before it.' },
    ]),
    `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Why It Is Fast</p>
    <h2 class="reveal font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-6">Because we cut the parts that do not build your site</h2>
    <p class="reveal text-fog leading-[1.8]">Most agencies spend weeks on discovery decks, stakeholder workshops and revision rounds that exist to justify a retainer. We publish our prices, fix the scope in writing, and start building. The score is the discovery. The build takes 2–3 days once your content is in hand — gathering that from you is usually the longest part of the whole project.</p>
  </div>
</section>`,
    B.ctaBand({ heading: 'Start with <span class="italic">your score.</span>', sub: 'It is free, it takes seconds, and there is no obligation attached to it.' }),
  ].join('\n\n'),
});

// ---- industries.html (hub)
PAGES.push({
  slug: 'industries.html',
  title: 'Industries We Build For — Texas Contractors, Clinics & Retail | A2H',
  description: 'Websites and Google Maps setup tailored to Texas contractors, medical practices and local retail. See the approach for your industry.',
  jsonLd: [ORG],
  body: [
    hero({
      eyebrow: 'Industries',
      h1: 'Built around <span class="italic text-copper-light">how you actually get customers.</span>',
      sub: 'A roofing company and a dental practice do not win business the same way. The build changes to match — what goes above the fold, what the form asks, and what we set up on Google.',
    }),
    `<section class="py-16 px-6">
  <div class="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
    <a href="construction.html" class="reveal group rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col">
      <p class="text-xs uppercase tracking-wider text-copper-light font-semibold mb-3">Contractors</p>
      <h2 class="font-display text-2xl text-sand mb-3">Construction &amp; trades</h2>
      <p class="text-sm text-fog leading-[1.7] flex-1">Quote-request forms above the fold, fast mobile pages, and instant lead response — because the contractor who replies first usually books the job.</p>
      <span class="link-underline text-copper-light text-sm font-semibold mt-5">See the contractor build →</span>
    </a>
    <a href="medical.html" class="reveal group rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col" style="transition-delay:80ms">
      <p class="text-xs uppercase tracking-wider text-copper-light font-semibold mb-3">Medical</p>
      <h2 class="font-display text-2xl text-sand mb-3">Practices &amp; clinics</h2>
      <p class="text-sm text-fog leading-[1.7] flex-1">Credibility first — credentials, services and insurance answered before the fold, with booking or call-now never more than one tap away.</p>
      <span class="link-underline text-copper-light text-sm font-semibold mt-5">See the practice build →</span>
    </a>
    <a href="retail.html" class="reveal group rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col" style="transition-delay:160ms">
      <p class="text-xs uppercase tracking-wider text-copper-light font-semibold mb-3">Local Retail</p>
      <h2 class="font-display text-2xl text-sand mb-3">Shops &amp; markets</h2>
      <p class="text-sm text-fog leading-[1.7] flex-1">Hours, directions and stock answered instantly, plus a Google Business Profile tuned so you turn up in the "near me" search that was going to your competitor.</p>
      <span class="link-underline text-copper-light text-sm font-semibold mt-5">See the retail build →</span>
    </a>
  </div>
</section>`,
    B.portfolioGrid({ heading: 'Work across all three.' }),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- book-a-call.html
PAGES.push({
  slug: 'book-a-call.html',
  noPopup: true,
  title: 'Book A Call — Schedule Time With A2H | A2H',
  description: 'Pick a time to talk through your free website score and what a hand-coded build would look like for your business. No forms, no phone tag.',
  jsonLd: [ORG],
  body: [
    `<section class="relative glow-copper pt-36 pb-16 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-3xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">Book A Call</p>
    <h1 class="reveal font-display text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-6">Let's talk about <span class="italic text-copper-light">your site.</span></h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto">Pick a time that works for you — no forms, no phone tag. 30 minutes to walk through your free score and what a build would look like for your business.</p>
  </div>
</section>`,
    `<section class="px-6 pb-24">
  <div class="max-w-3xl mx-auto reveal">
    <div class="rounded-2xl bg-elevated border border-white/5 shadow-elevated overflow-hidden">
      <div class="calendly-inline-widget" data-url="https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=231c18&text_color=e9dfd2&primary_color=c9702f" style="min-width:280px;height:700px;"></div>
    </div>
    <p class="reveal text-center text-xs text-fog mt-6">Prefer email instead? Reach us at <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.</p>
  </div>
</section>`,
  ].join('\n\n'),
  extraScripts: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`,
});

// ---- mockup.html — where the lead popup (partials.js leadPopup) sends
// someone right after they submit their info.
PAGES.push({
  slug: 'mockup.html',
  noPopup: true,
  title: "Let's Build Your Free Mockup — A2H",
  description: "You're in. Pick a time and we'll show up with a real homepage mockup built for your business — free, no obligation.",
  jsonLd: [ORG],
  body: [
    `<section class="relative glow-copper pt-36 pb-16 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-3xl mx-auto text-center relative">
    <div class="reveal mx-auto mb-7 h-14 w-14 rounded-full bg-live/15 border border-live/30 flex items-center justify-center">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="#7fb88a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">You're In</p>
    <h1 class="reveal font-display text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-6">Let's build a free <span class="italic text-copper-light">website mockup</span> for you.</h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto">Pick a time below. We'll spend the next 2–3 days building a real homepage mockup for your business, then walk you through it live — no charge, no obligation either way.</p>
  </div>
</section>`,
    `<section class="px-6 pb-24">
  <div class="max-w-3xl mx-auto reveal">
    <div class="rounded-2xl bg-elevated border border-white/5 shadow-elevated overflow-hidden">
      <div class="calendly-inline-widget" data-url="https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=231c18&text_color=e9dfd2&primary_color=c9702f" style="min-width:280px;height:700px;"></div>
    </div>
    <p class="reveal text-center text-xs text-fog mt-6">Prefer email instead? Reach us at <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.</p>
  </div>
</section>`,
  ].join('\n\n'),
  extraScripts: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`,
});

// ---- construction.html (rebuilt on the shared chrome)
const CONSTRUCTION_FAQ = [
  ['Do I have to run ads to work with you?', 'No. The website build stands on its own and includes Google Business Profile setup, which brings in calls without any ad spend. Ad management is a separate service you can add if you want to accelerate.'],
  ['How fast do leads get answered?', 'Every form submission triggers a reply within minutes, day or night. In trades that single detail decides most jobs — the customer usually books whoever gets back to them first.'],
  ['What does a contractor site actually need?', 'A quote-request form above the fold, proof of past work, service areas stated plainly, and a phone number that is one tap away on mobile. Most contractor sites bury at least two of those.'],
];

PAGES.push({
  slug: 'construction.html',
  title: 'Websites for Texas Contractors — More Calls, Faster Follow-Up | A2H',
  description: 'Hand-coded websites, Google Business Profile setup and instant lead response for Central Texas contractors. Built by the team behind Solid State Construction.',
  jsonLd: [ORG, serviceLd('Website design for contractors', 'Hand-coded websites, Google Business Profile setup and instant lead response for Texas construction businesses.', 'Construction contractors'), faqLd(CONSTRUCTION_FAQ)],
  body: [
    hero({
      eyebrow: 'For Central Texas Contractors',
      h1: 'More calls. Faster follow-up. <span class="italic text-copper-light">Nothing wasted.</span>',
      sub: 'A done-for-you site with quote capture built in, a Google Business Profile that puts you on the map, and instant lead response — the same system already running live for <a href="https://solidstatesconstruction.com" target="_blank" rel="noopener" class="link-underline text-copper-light">Solid State Construction</a>.',
      secondary: ['See the build', '#work'],
    }),
    `<section class="py-12 px-6 border-y border-white/5 bg-surface/40">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-sm text-fog leading-[1.8]">
      A <span class="text-sand font-semibold">$200 Google Ads test</span> on a Central Texas contractor's new site delivered
      <span class="text-sand font-semibold">270+ clicks in 14 days at $0.74 per click</span> — nearly 2× the industry projection.
      That is what a fast, mobile-first page does to your cost per click before a single lead is even followed up.
    </p>
  </div>
</section>`,
    cards('The System', 'Everything between a search and a booked job', [
      { tag: 'Built to convert', h: 'Site or landing page', p: 'Hand-coded, mobile-first, quote-request form above the fold. No page-builder bloat dragging down your load time or your ad quality score.' },
      { tag: 'Found without ads', h: 'Google Business Profile', p: 'Claimed, categorised, and wired to your site so you show up in the Maps pack when someone searches your trade plus your city.' },
      { tag: 'Answered in minutes', h: 'Instant lead response', p: 'Every form submission gets a reply in under five minutes, day or night, before the customer calls the next contractor on their list.' },
      { tag: 'Compounds after', h: 'Local SEO foundation', p: 'Schema markup, service-area pages and a profile that keeps earning calls long after any ad budget stops.' },
    ]),
    B.portfolioGrid({ heading: 'Contractor work, <span class="italic text-copper-light">live right now.</span>', only: ['ssc'] }),
    B.pricingTable({ heading: 'Same flat pricing, no trade surcharge' }),
    faqSection(CONSTRUCTION_FAQ),
  ].join('\n\n'),
});

// ---- medical.html
const MEDICAL_FAQ = [
  ['Can you handle patient privacy requirements?', 'The sites we build are marketing sites — they do not store patient records or handle PHI. Contact forms collect only a name, email and phone so a member of your staff can call back. If you need a patient portal or intake that touches PHI, that belongs in dedicated HIPAA-compliant software, and we will integrate a link to it rather than rebuild it.'],
  ['Do you set up online booking?', 'Yes. We integrate whatever scheduling tool you already use, or add booking as custom functionality on the Premium tier.'],
  ['How do patients find the practice?', 'Google Business Profile is the single biggest lever for a local practice — it drives the map result and the reviews people read before they call. It is set up on every tier.'],
];

PAGES.push({
  slug: 'medical.html',
  title: 'Websites for Texas Medical Practices & Clinics | A2H',
  description: 'Credibility-first websites and Google Business Profile setup for Texas medical practices, dental offices and clinics. Flat pricing from $1,500.',
  jsonLd: [ORG, serviceLd('Website design for medical practices', 'Credibility-first websites and Google Business Profile setup for Texas medical and dental practices.', 'Medical practices and clinics'), faqLd(MEDICAL_FAQ)],
  body: [
    hero({
      eyebrow: 'For Medical &amp; Dental Practices',
      h1: 'A site patients trust <span class="italic text-copper-light">before they call.</span>',
      sub: 'Patients decide in seconds whether a practice looks legitimate. Credentials, services and insurance answered up front, with booking or call-now never more than one tap away.',
      secondary: ['See the build', '#work'],
    }),
    cards('What Changes For A Practice', 'Built around how patients actually choose', [
      { tag: 'Trust first', h: 'Credentials above the fold', p: 'Names, qualifications, board certifications and years in practice — the things a patient scans for before anything else. Buried credentials cost you the call.' },
      { tag: 'Answered up front', h: 'Insurance and services', p: '"Do you take my insurance?" is the question that decides whether they phone you or the next result. It gets answered on the page, not on hold.' },
      { tag: 'One tap', h: 'Call or book instantly', p: 'A tap-to-call number fixed on mobile and booking wired to whatever scheduler you already run. No contact form as the only route in.' },
      { tag: 'Found locally', h: 'Maps and reviews', p: 'Google Business Profile claimed and tuned, because the map pack and its review stars are what most patients see before your site.' },
    ]),
    B.portfolioGrid({ heading: 'Medical work.', only: ['caremedbill'] }),
    B.pricingTable({ heading: 'Flat pricing, published openly' }),
    faqSection(MEDICAL_FAQ),
  ].join('\n\n'),
});

// ---- retail.html
const RETAIL_FAQ = [
  ['Do I need an online store?', 'Often not. For most local shops the site\'s job is to get someone through the door — hours, directions, stock and a phone number. We add a cart when you actually sell online, not by default.'],
  ['What matters most for a local shop?', 'Your Google Business Profile. Most "near me" searches never reach a website at all — they end at the map result. That gets set up on every tier.'],
  ['Can you show products without a full catalog?', 'Yes. A simple browsable product or menu section covers most shops, and it is far cheaper to maintain than a full e-commerce build.'],
];

PAGES.push({
  slug: 'retail.html',
  title: 'Websites for Texas Local Retail, Shops & Markets | A2H',
  description: 'Websites and Google Maps setup for Texas shops, markets and local retail. Show hours, stock and directions, and win the "near me" search. From $1,500.',
  jsonLd: [ORG, serviceLd('Website design for local retail', 'Websites and Google Business Profile setup for Texas shops, markets and local retail businesses.', 'Local retail businesses'), faqLd(RETAIL_FAQ)],
  body: [
    hero({
      eyebrow: 'For Shops, Markets &amp; Local Retail',
      h1: 'Win the <span class="italic text-copper-light">"near me"</span> search.',
      sub: 'Someone half a mile away is searching for what you sell right now. Whether they walk into your shop or your competitor\'s comes down to hours, directions and whether Google knows you exist.',
      secondary: ['See the build', '#work'],
    }),
    cards('What Changes For Retail', 'Built for foot traffic, not page views', [
      { tag: 'Instant answers', h: 'Hours and directions first', p: 'The two things every local searcher wants, visible without scrolling and correct on the day. Wrong hours on Google is the most expensive small error a shop makes.' },
      { tag: 'Show the goods', h: 'Products or menu', p: 'A browsable section so people know what you stock before they drive over — without the cost and upkeep of a full e-commerce build you may not need.' },
      { tag: 'Map pack', h: 'Google Business Profile', p: 'Claimed, categorised, photographed and tuned. Most "near me" searches end at the map result and never reach a website at all.' },
      { tag: 'Sell online too', h: 'Cart when you want it', p: 'Full catalog, cart and mobile checkout available on the Premium tier — like the Quality Halal Market build — if you are ready to sell beyond the counter.' },
    ]),
    B.portfolioGrid({ heading: 'Retail work.', only: ['qhm'] }),
    B.pricingTable({ heading: 'Flat pricing, published openly' }),
    faqSection(RETAIL_FAQ),
  ].join('\n\n'),
});

// ---- privacy.html
PAGES.push({
  slug: 'privacy.html',
  noPopup: true,
  title: 'Privacy Policy | A2H Agency',
  description: 'How A2H Agency collects, uses and protects the information you submit through this website.',
  jsonLd: [ORG],
  body: B.legalShell({
    title: 'Privacy Policy',
    updated: 'August 19, 2026',
    sections: [
      { h: 'Who we are', p: [`A2H Agency ("A2H", "we", "us") builds websites for businesses in Texas. This policy explains what we collect through a2h.info and what we do with it. You can reach us any time at <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.`] },
      { h: 'What we collect', p: [
        'When you submit the free website score form we collect the name, business name, email address, website URL and phone number you enter, plus whether you have claimed your Google Business Profile. All of these except the URL and phone number are required to respond to you.',
        'If you provide a website URL, our server fetches the public homepage of that URL to check for basic signals like a mobile-friendly tag and a lead-capture form. We do not store the fetched page content beyond calculating your score.',
        'If you use the AI chat widget, the messages you type are processed so the assistant can answer them. Do not enter sensitive personal, medical or financial information into the chat.',
        'We use Google Analytics 4, which sets cookies and records standard analytics data such as pages viewed, approximate location derived from IP address, referring site and device type. If you arrive from an advertisement we also record the campaign parameters in the link (for example utm_source or gclid) so we can tell which campaigns work.',
      ] },
      { h: 'How we use it', p: [
        'Form submissions are used to calculate and send your free website score and to follow up about your enquiry. Analytics data is used in aggregate to understand how the site performs.',
        'We do not sell your information, rent it, or add you to a marketing list you did not ask for. We do not share it with third parties except the service providers that operate this site — currently Vercel for hosting and Google for analytics — who process it only on our behalf.',
      ] },
      { h: 'How long we keep it', p: ['Enquiry details are kept for as long as needed to respond and for our business records. Google Analytics data is retained according to the retention period configured in that product. You can ask us to delete your enquiry at any time.'] },
      { h: 'Your choices', p: [
        `You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by emailing <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>. We will respond within 30 days.`,
        'You can block cookies in your browser settings, and you can opt out of Google Analytics using Google\'s browser add-on. The site works with cookies disabled.',
        'If you are a Texas resident, the Texas Data Privacy and Security Act gives you rights to access, correct, delete and obtain a copy of your personal data, and to opt out of targeted advertising. Use the email above to exercise any of them.',
      ] },
      { h: 'Children', p: ['This site is intended for business owners and is not directed at children under 13. We do not knowingly collect information from children.'] },
      { h: 'Changes', p: ['If this policy changes we will update the date at the top of this page. Material changes will be noted on the site.'] },
    ],
  }),
});

// ---- terms.html
PAGES.push({
  slug: 'terms.html',
  noPopup: true,
  title: 'Terms of Service | A2H Agency',
  description: 'The terms that apply to using the A2H Agency website and engaging A2H for website design and development work.',
  jsonLd: [ORG],
  body: B.legalShell({
    title: 'Terms of Service',
    updated: 'August 19, 2026',
    sections: [
      { h: 'Using this site', p: ['By using a2h.info you agree to these terms. If you do not agree, please do not use the site. We may update these terms; the date at the top shows the current version.'] },
      { h: 'What this site is', p: ['This site describes services A2H Agency offers and lets you get a free website score. Nothing here is a binding offer or a contract for work. A project only begins once we have agreed scope, price and timeline with you in writing.'] },
      { h: 'Pricing', p: ['Prices shown are current at the time of publication and apply to the scope described. The price for your project is the one stated in your written scope agreement, which takes precedence over anything on this page. Prices may change for new projects without notice.'] },
      { h: 'Work and payment', p: [
        'Projects are billed 50% before work starts and 50% on launch, unless you choose the monthly payment plan offered on the Professional and Premium tiers, in which case the total is billed in 4 equal monthly installments starting when work begins. Scope is fixed in writing beforehand; changes to scope after that are quoted separately before any additional work is done.',
        'The Care Plan is a month-to-month service you can cancel at any time. Cancelling it does not affect your ownership of the delivered site.',
      ] },
      { h: 'Ownership', p: [
        'On final payment, you own the website files we deliver and may host, modify or move them anywhere you like. We keep ownership of any general-purpose tooling, libraries or techniques used to build it, none of which restrict your use of your site.',
        'You are responsible for having the rights to any content, logos, photographs or copy you supply to us, and confirm that supplying them to us does not infringe anyone else\'s rights.',
      ] },
      { h: 'Results', p: ['Performance figures shown on this site describe results achieved for specific clients under specific conditions. They are examples, not guarantees. Search rankings, traffic and conversion depend on factors outside our control, including your market, competitors and Google\'s own systems.'] },
      { h: 'Third-party services', p: ['Sites we build may connect to third-party services such as Google Business Profile, analytics providers or hosting platforms. Those services have their own terms, and we are not responsible for their availability, pricing or policies.'] },
      { h: 'Liability', p: ['To the extent permitted by law, A2H\'s total liability arising from a project is limited to the amount you paid us for that project. We are not liable for indirect or consequential losses, including lost profits or lost business.'] },
      { h: 'Governing law', p: ['These terms are governed by the laws of the State of Texas.'] },
      { h: 'Contact', p: [`Questions about these terms: <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.`] },
    ],
  }),
});

// ---- thank-you.html
PAGES.push({
  slug: 'thank-you.html',
  noPopup: true,
  title: 'Thank You — Your Free Score Request Is In | A2H',
  description: 'Your free website score request has been received. We follow up within 24 hours.',
  jsonLd: [],
  body: `<section class="relative glow-copper pt-40 pb-24 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-2xl mx-auto text-center relative">
    <div class="mx-auto mb-7 h-16 w-16 rounded-full bg-live/15 border border-live/30 flex items-center justify-center">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="#7fb88a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <h1 class="font-display text-4xl sm:text-5xl tracking-[-0.03em] text-sand mb-5">Thank you.</h1>
    <p class="text-lg text-fog leading-[1.7] mb-10">Your request is in. Check your inbox for a confirmation — we'll follow up with your free website score within 24 hours.</p>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a href="work.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">See Our Work</a>
      <a href="pricing.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">See Pricing</a>
    </div>
  </div>
</section>`,
});

// ================================================================= write ===

let written = 0;
PAGES.forEach((p) => {
  const html = page(p);
  fs.writeFileSync(path.join(OUT, p.slug), html);
  console.log(`  ${p.slug.padEnd(22)} ${(html.length / 1024).toFixed(1)} KB`);
  written++;
});

// Stamp a content hash onto the stylesheet links, in generated pages and in
// the hand-maintained index.html alike. Without it a returning visitor keeps
// whatever assets/site.css their browser cached, so a deploy that changes the
// CSS can leave them on a stale stylesheet indefinitely.
const crypto = require('crypto');
const hashOf = (rel) =>
  crypto.createHash('sha1').update(fs.readFileSync(path.join(OUT, rel))).digest('hex').slice(0, 8);

const cssHashes = {
  'assets/tailwind.css': hashOf('assets/tailwind.css'),
  'assets/site.css': hashOf('assets/site.css'),
};

fs.readdirSync(OUT)
  .filter((f) => f.endsWith('.html'))
  .forEach((f) => {
    const p = path.join(OUT, f);
    let s = fs.readFileSync(p, 'utf8');
    let touched = false;
    Object.entries(cssHashes).forEach(([rel, hash]) => {
      const re = new RegExp(`(href=")${rel.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}(\\?v=[a-f0-9]+)?(")`, 'g');
      const next = s.replace(re, `$1${rel}?v=${hash}$3`);
      if (next !== s) { s = next; touched = true; }
    });
    if (touched) fs.writeFileSync(p, s);
  });
console.log(`\n  stylesheet cache-busting: site.css?v=${cssHashes['assets/site.css']}  tailwind.css?v=${cssHashes['assets/tailwind.css']}`);

// robots.txt + sitemap.xml
const urls = ['index.html', ...PAGES.map((p) => p.slug)].filter((s) => s !== 'thank-you.html' && s !== 'mockup.html');
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((s) => {
  const loc = s === 'index.html' ? SITE + '/' : `${SITE}/${s}`;
  const priority = s === 'index.html' ? '1.0' : (s === 'privacy.html' || s === 'terms.html') ? '0.3' : '0.8';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
}).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);

fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /thank-you.html
Disallow: /mockup.html

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`\n  ${written} pages + sitemap.xml + robots.txt written.`);
