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
  description: 'AI receptionist and CRM for Texas businesses, with hand-coded custom websites available as an upgrade.',
  areaServed: { '@type': 'State', name: 'Texas' },
  serviceType: ['AI Receptionist', 'CRM Software', 'Website Design', 'Website Development', 'Google Business Profile Setup'],
  knowsAbout: ['AI receptionist', 'CRM', 'Web design', 'Local SEO', 'Google Business Profile', 'Conversion optimization'],
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
    price: '1500',
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '1500',
      maxPrice: '2000',
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

const hero = ({ eyebrow, h1, sub, primary = 'Book A Free Setup Call', primaryHref = 'book-a-call.html', secondary = null }) => `<section class="relative glow-copper pt-36 pb-20 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-4xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">${eyebrow}</p>
    <h1 class="reveal font-display text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-6">${h1}</h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto mb-10">${sub}</p>
    <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
      <span class="cta-ring rounded-full p-[2px] inline-block">
        <a href="${primaryHref}" class="btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-7 py-3.5 rounded-full text-[15px] block">${primary}</a>
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
  description: 'Live sites and builds by A2H: Solid State Construction and CareMedBill. See what we ship as part of the AI Receptionist + CRM + Custom Website tier.',
  jsonLd: [ORG],
  body: [
    hero({
      eyebrow: 'Selected Work',
      h1: 'Every build, <span class="italic text-copper-light">start to launch.</span>',
      sub: 'Builds across construction and medical billing, shown here as part of the AI Receptionist + CRM + Custom Website tier. One is live on a client domain; one is a complete build hosted on our own account. Every one is hand-coded — no page builders anywhere.',
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
  ['How does payment work?', 'Both tiers have a one-time setup fee, then a flat monthly rate — the scope is fixed in writing before any money changes hands, so the number you are quoted is the number you pay. Cancel the monthly plan at any time.'],
  ['What is the difference between the two tiers?', 'AI Receptionist + CRM ($1,500 setup, $397/mo) answers and books every call and logs it in your own CRM — no website required. AI Receptionist + CRM + Custom Website ($2,000 setup, $400/mo) adds a hand-coded website built around that same system, so the calls and the site work together from day one.'],
  ['What does "per extra team seat" mean?', 'Each tier includes CRM access for your core team. If more staff need their own CRM login to see and manage leads, each additional seat is $99/mo.'],
  ['Do I need a website to use the AI Receptionist?', 'No. AI Receptionist + CRM stands on its own — it plugs into your existing phone number and calendar. The website is only part of the higher tier, for businesses that want both built together.'],
  ['Do I own the site if I choose the higher tier?', 'Yes, completely. It is hand-coded static files — there is no proprietary platform to be locked into, and you get a walkthrough at handoff so you are never dependent on us to make a change.'],
  ['What is the Care Plan?', 'Hosting, maintenance and monthly content edits for your website, included with the Custom Website tier, then continuing at $249/mo. You can cancel it at any time and keep your site.'],
  ['Can I add a custom website later if I start with just the receptionist?', 'Yes. Start with AI Receptionist + CRM and upgrade to add the custom website whenever you are ready — you only pay the difference in setup fee at that point.'],
];

PAGES.push({
  slug: 'pricing.html',
  title: 'Pricing — AI Receptionist + CRM from $1,500 | A2H',
  description: 'Transparent pricing for Texas businesses: AI Receptionist + CRM from $1,500 setup + $397/mo, or add a custom hand-coded website for $2,000 setup + $400/mo.',
  jsonLd: [ORG, faqLd(PRICING_FAQ)],
  body: [
    hero({
      eyebrow: 'Transparent Pricing',
      h1: 'Two tiers. <span class="italic text-copper-light">No sales call required.</span>',
      sub: 'Published openly, fixed in writing before work starts. Start with the AI Receptionist + CRM, or add a custom website built around it.',
      secondary: ['See Our Work', 'work.html'],
    }),
    B.pricingTable({ heading: 'Pick the tier that fits' }),
    `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-4xl mx-auto">
    <div class="reveal text-center mb-10">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Add-Ons</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">For the Custom Website tier</h2>
      <p class="text-fog text-sm mt-3">Available on AI Receptionist + CRM + Custom Website</p>
    </div>
    <div class="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8">
        <h3 class="text-sand font-semibold text-lg mb-2">AI Website Chatbot</h3>
        <p class="text-sm text-fog leading-[1.7] mb-5">Trained on your business — answers FAQs, qualifies visitors and captures leads 24/7, even after hours.</p>
        <div class="flex items-baseline gap-2">
          <p class="font-display text-2xl text-copper-light">+$99</p>
          <p class="text-xs text-fog uppercase tracking-wider">per month</p>
        </div>
      </div>
      <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8">
        <h3 class="text-sand font-semibold text-lg mb-2">3D Company Card</h3>
        <p class="text-sm text-fog leading-[1.7] mb-5">An interactive business card built from your real card artwork — flips, tilts and tracks the cursor.</p>
        <div class="flex items-baseline gap-2">
          <p class="font-display text-2xl text-copper-light">+$99</p>
          <p class="text-xs text-fog uppercase tracking-wider">one-time</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
    faqSection(PRICING_FAQ),
    B.ctaBand({ heading: 'Not sure which tier <span class="italic">you need?</span>', sub: 'Book a free setup call and we will walk through both — no obligation either way.' }),
  ].join('\n\n'),
});

// ---- process.html
PAGES.push({
  slug: 'process.html',
  title: 'How We Work — From Free Mockup to Launch in 2–3 Days | A2H',
  description: 'The A2H process: free website mockup, hand-coded build, launch and handoff, then proof with real data. Fixed scope, fixed price, no long-term contract.',
  jsonLd: [ORG, {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How A2H builds and launches a website',
    description: 'A four-step process from free website mockup to launch and reporting.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Free website mockup', text: 'Tell us your niche, your color scheme and what you want, and we design a free homepage mockup made specifically for your business.' },
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
      { tag: 'Free, no obligation', h: 'We build you a mockup', p: 'Tell us your niche, your color scheme and a site you like the look of — we design a free homepage mockup made specifically for your business, no charge, no obligation. If you love it, we build the rest.' },
      { tag: 'Hand-coded', h: 'We build it properly', p: 'No page builders, no templates. A conversion-first site wired to real lead capture from day one, built mobile-first and tested on real devices before you ever see it.' },
      { tag: 'Yours to keep', h: 'We launch and hand it off', p: 'Fully tested, live on your domain, plus a walkthrough so you are never locked out of your own site. Static files you own outright — no proprietary platform, no hostage situation.' },
      { tag: 'Real numbers', h: 'We prove it with data', p: 'A $200 Google Ads test on Solid State Construction\'s new site returned 270+ clicks in 14 days at $0.74 per click. Measured results after launch, never projections before it.' },
    ]),
    `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Why It Is Fast</p>
    <h2 class="reveal font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-6">Because we cut the parts that do not build your site</h2>
    <p class="reveal text-fog leading-[1.8]">Most agencies spend weeks on discovery decks, stakeholder workshops and revision rounds that exist to justify a retainer. We publish our prices, fix the scope in writing, and start building. The mockup is the discovery. The build takes 2–3 days once your content is in hand — gathering that from you is usually the longest part of the whole project.</p>
  </div>
</section>`,
    B.ctaBand({ heading: 'Ready to <span class="italic">get started?</span>', sub: 'Book a free setup call — it takes a few minutes, and there is no obligation attached to it.' }),
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
  description: 'Pick a time to talk through your free website mockup and what a hand-coded build would look like for your business. No forms, no phone tag.',
  jsonLd: [ORG],
  body: [
    `<section class="relative glow-copper pt-36 pb-16 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-3xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">Book A Call</p>
    <h1 class="reveal font-display text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-6">Let's talk about <span class="italic text-copper-light">your site.</span></h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto">Pick a time that works for you — no forms, no phone tag. 30 minutes to walk through your free mockup and what a build would look like for your business.</p>
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
  ['Does the AI actually book the job, not just reply?', 'Yes. It answers every call and text, asks what the job is and how urgent it is, and books an estimate straight onto your calendar — then alerts you the moment it books, or the moment it hits something only you should decide.'],
  ['How fast do leads get answered?', 'Instantly — the AI Receptionist answers every call and text in real time, day or night. In trades that single detail decides most jobs — the customer usually books whoever gets back to them first.'],
  ['Do I have to run ads to work with you?', 'No. AI Receptionist + CRM stands on its own. If you add the Custom Website tier it includes Google Business Profile setup too, which brings in calls without any ad spend.'],
  ['What does a contractor site actually need?', 'A quote-request form above the fold, proof of past work, service areas stated plainly, and a phone number that is one tap away on mobile. That is what the Custom Website tier is built around — most contractor sites bury at least two of those.'],
];

PAGES.push({
  slug: 'construction.html',
  title: 'AI Receptionist for Texas Contractors — More Calls Booked | A2H',
  description: 'AI Receptionist + CRM for Central Texas contractors — every call answered and booked, day or night. Optional hand-coded website add-on. Built by the team behind Solid State Construction.',
  jsonLd: [ORG, serviceLd('AI receptionist for contractors', 'AI Receptionist + CRM and optional hand-coded websites for Texas construction businesses.', 'Construction contractors'), faqLd(CONSTRUCTION_FAQ)],
  body: [
    hero({
      eyebrow: 'For Central Texas Contractors',
      h1: 'More calls answered. Faster follow-up. <span class="italic text-copper-light">Nothing wasted.</span>',
      sub: 'The AI Receptionist answers every call and text, books estimates straight onto your calendar, and logs every job in your own CRM — the same system already running live for <a href="https://solidstatesconstruction.com" target="_blank" rel="noopener" class="link-underline text-copper-light">Solid State Construction</a>.',
      secondary: ['See the build', '#work'],
    }),
    `<section class="py-12 px-6 border-y border-white/5 bg-surface/40">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-sm text-fog leading-[1.8]">
      A <span class="text-sand font-semibold">$200 Google Ads test</span> on a Central Texas contractor's new site (Custom Website tier) delivered
      <span class="text-sand font-semibold">270+ clicks in 14 days at $0.74 per click</span> — nearly 2× the industry projection.
      That is what a fast, mobile-first page does to your cost per click before a single lead is even followed up.
    </p>
  </div>
</section>`,
    cards('The System', 'Everything between a ringing phone and a booked job', [
      { tag: 'Answered in seconds', h: 'AI Receptionist', p: 'Every call and text answered instantly, day or night, before the customer calls the next contractor on their list. Warm-transfers to a real person when it should.' },
      { tag: 'Nothing falls through', h: 'CRM &amp; pipeline board', p: 'Every job logged automatically — see every lead\'s stage at a glance instead of digging through call logs and sticky notes.' },
      { tag: 'Found without ads', h: 'Google Business Profile', p: 'On the Custom Website tier, your profile is claimed, categorised, and wired to your site so you show up in the Maps pack when someone searches your trade plus your city.' },
      { tag: 'Built to convert', h: 'Site or landing page', p: 'Hand-coded, mobile-first, quote-request form above the fold — available on the Custom Website tier. No page-builder bloat dragging down your load time.' },
    ]),
    B.portfolioGrid({ heading: 'Contractor work, <span class="italic text-copper-light">live right now.</span>', sub: 'Built as part of the Custom Website tier.', only: ['ssc'] }),
    B.pricingTable({ heading: 'Same flat pricing, no trade surcharge' }),
    faqSection(CONSTRUCTION_FAQ),
  ].join('\n\n'),
});

// ---- medical.html
const MEDICAL_FAQ = [
  ['Can you handle patient privacy requirements?', 'The AI Receptionist and CRM handle scheduling, not clinical data — calls collect only a name, reason for the call and callback info so your staff can follow up. If you need a patient portal or intake that touches PHI, that belongs in dedicated HIPAA-compliant software, and we will integrate a link to it rather than rebuild it.'],
  ['Do you set up online booking?', 'Yes. The AI Receptionist books straight onto your calendar, and we integrate whatever scheduling tool you already use.'],
  ['How do patients find the practice?', 'Google Business Profile is the single biggest lever for a local practice — it drives the map result and the reviews people read before they call. It is included with the Custom Website tier.'],
  ['What happens after hours?', 'The AI Receptionist still answers, takes the request, and books or flags it for your staff the next morning — instead of going to voicemail.'],
];

PAGES.push({
  slug: 'medical.html',
  title: 'AI Receptionist for Texas Medical Practices & Clinics | A2H',
  description: 'AI Receptionist + CRM for Texas medical practices, dental offices and clinics — every patient call answered and booked. Optional hand-coded website add-on.',
  jsonLd: [ORG, serviceLd('AI receptionist for medical practices', 'AI Receptionist + CRM and optional hand-coded websites for Texas medical and dental practices.', 'Medical practices and clinics'), faqLd(MEDICAL_FAQ)],
  body: [
    hero({
      eyebrow: 'For Medical &amp; Dental Practices',
      h1: 'Every patient call answered. <span class="italic text-copper-light">Every time.</span>',
      sub: 'A missed call is a patient calling the next practice on the list. The AI Receptionist answers day or night, books straight onto your calendar, and logs every patient contact in your own CRM.',
      secondary: ['See the build', '#work'],
    }),
    cards('What Changes For A Practice', 'Built around how patients actually choose', [
      { tag: 'Never voicemail', h: 'Answered around the clock', p: 'Every call answered instantly, day or night — no patient sent to voicemail because it was after hours or the front desk was on another line.' },
      { tag: 'Booked, not just noted', h: 'Straight onto your calendar', p: 'The AI Receptionist books the appointment directly, and warm-transfers to a real person when the call needs one.' },
      { tag: 'Nothing lost', h: 'Every contact logged', p: 'Names, reasons for calling, and follow-ups tracked automatically in your own CRM pipeline board — nothing relies on a sticky note.' },
      { tag: 'Found locally', h: 'Maps and reviews', p: 'On the Custom Website tier, Google Business Profile is claimed and tuned, because the map pack and its review stars are what most patients see before your site.' },
    ]),
    B.portfolioGrid({ heading: 'Medical work.', sub: 'Built as part of the Custom Website tier.', only: ['caremedbill'] }),
    B.pricingTable({ heading: 'Flat pricing, published openly' }),
    faqSection(MEDICAL_FAQ),
  ].join('\n\n'),
});

// ---- retail.html
const RETAIL_FAQ = [
  ['What kind of calls does the AI Receptionist handle for a shop?', '"Are you open," "do you have X in stock," "where are you located" — the questions that otherwise interrupt whoever is working the counter. It answers instantly and logs the contact in your CRM.'],
  ['Do I need an online store?', 'Often not. For most local shops the priority is getting someone through the door — hours, directions, stock and a phone number that always gets answered. A catalog or cart is available as part of the Custom Website tier if you are ready to sell online.'],
  ['What matters most for a local shop?', 'Your Google Business Profile, included with the Custom Website tier. Most "near me" searches never reach a website at all — they end at the map result.'],
  ['Can you show products without a full catalog?', 'Yes. A simple browsable product or menu section covers most shops on the Custom Website tier, and it is far cheaper to maintain than a full e-commerce build.'],
];

PAGES.push({
  slug: 'retail.html',
  title: 'AI Receptionist for Texas Local Retail, Shops & Markets | A2H',
  description: 'AI Receptionist + CRM for Texas shops, markets and local retail — every call about hours and stock answered instantly. Optional hand-coded website with Google Maps setup.',
  jsonLd: [ORG, serviceLd('AI receptionist for local retail', 'AI Receptionist + CRM and optional hand-coded websites for Texas shops, markets and local retail businesses.', 'Local retail businesses'), faqLd(RETAIL_FAQ)],
  body: [
    hero({
      eyebrow: 'For Shops, Markets &amp; Local Retail',
      h1: 'Every call about hours and stock, <span class="italic text-copper-light">answered instantly.</span>',
      sub: 'Someone calling to ask if you\'re open or if you have something in stock does not want to wait on hold. The AI Receptionist answers every call day or night, and a Custom Website wins the "near me" search before they even pick up the phone.',
      secondary: ['See our work', 'work.html'],
    }),
    cards('What Changes For Retail', 'Built for foot traffic, not page views', [
      { tag: 'Never on hold', h: 'AI Receptionist', p: 'Answers "are you open," "do you carry X," and "where are you" instantly, day or night, without pulling staff off the floor.' },
      { tag: 'Logged automatically', h: 'CRM &amp; pipeline board', p: 'Every caller and their question logged, so nothing about a regular customer or a big order gets forgotten.' },
      { tag: 'Instant answers', h: 'Hours and directions first', p: 'On the Custom Website tier, the two things every local searcher wants are visible without scrolling and correct on the day.' },
      { tag: 'Map pack', h: 'Google Business Profile', p: 'Included with the Custom Website tier — claimed, categorised, photographed and tuned. Most "near me" searches end at the map result and never reach a website at all.' },
    ]),
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
        'When you submit the free website mockup form we collect the name, business name, email address and phone number you enter, plus details about the website you want — your niche/industry, how many pages, color scheme preferences, any example sites you like, and any other notes you provide. All of these except phone number and the optional detail fields are required to respond to you.',
        'If you use the AI chat widget, the messages you type are processed so the assistant can answer them. Do not enter sensitive personal, medical or financial information into the chat.',
        'We use Google Analytics 4, which sets cookies and records standard analytics data such as pages viewed, approximate location derived from IP address, referring site and device type. If you arrive from an advertisement we also record the campaign parameters in the link (for example utm_source or gclid) so we can tell which campaigns work.',
      ] },
      { h: 'SMS messaging', p: [
        'If you provide your phone number on the free mockup form, you agree to receive SMS messages from A2H about your mockup request and project — this includes automated follow-up reminders and, if you reply, a live conversation (in part AI-assisted) to help scope your project and schedule a call. Message frequency varies; message and data rates may apply.',
        'Reply STOP at any time to opt out, or HELP for help. We do not sell or share your phone number with third parties for their own marketing purposes.',
      ] },
      { h: 'How we use it', p: [
        'Form submissions are used to build and send your free website mockup and to follow up about your enquiry, including by SMS as described above. Analytics data is used in aggregate to understand how the site performs.',
        'We do not sell your information, rent it, or add you to a marketing list you did not ask for. We do not share it with third parties except the service providers that operate this site — currently Vercel for hosting, Twilio for SMS delivery, Google for analytics and AI replies, and Resend for email — who process it only on our behalf.',
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
      { h: 'What this site is', p: ['This site describes services A2H Agency offers and lets you get a free website mockup. Nothing here is a binding offer or a contract for work. A project only begins once we have agreed scope, price and timeline with you in writing.'] },
      { h: 'Pricing', p: ['Prices shown are current at the time of publication and apply to the scope described. The price for your project is the one stated in your written scope agreement, which takes precedence over anything on this page. Prices may change for new projects without notice.'] },
      { h: 'Work and payment', p: [
        'Projects can be paid in full up front, or spread over 4 equal monthly installments starting when work begins — either way, scope is fixed in writing beforehand; changes to scope after that are quoted separately before any additional work is done.',
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
  title: 'Thank You — Your Free Mockup Request Is In | A2H',
  description: 'Your free website mockup request has been received. We follow up within 24 hours.',
  jsonLd: [],
  body: `<section class="relative glow-copper pt-40 pb-24 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-2xl mx-auto text-center relative">
    <div class="mx-auto mb-7 h-16 w-16 rounded-full bg-live/15 border border-live/30 flex items-center justify-center">
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="#7fb88a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <h1 class="font-display text-4xl sm:text-5xl tracking-[-0.03em] text-sand mb-5">Thank you.</h1>
    <p class="text-lg text-fog leading-[1.7] mb-10">Your request is in. Check your inbox for a confirmation — we'll follow up with your free website mockup within 2–3 days.</p>
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
