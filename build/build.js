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
  name: 'A2H',
  alternateName: ['A2H AI Consulting', 'A2H Agency'],
  url: SITE + '/',
  email: EMAIL,
  founder: { '@type': 'Person', name: 'Abbas Hussain', jobTitle: 'Founder and AI Consultant', sameAs: ['https://www.linkedin.com/in/abbas-hussain-1bb46b432/'] },
  description: 'A2H is an AI consulting studio in Houston, Texas, founded by Abbas Hussain. It builds websites with an AI chat and a CRM lead list for small Texas trade businesses, mainly foundation repair, water damage restoration and garage door companies. Abbas Hussain is an accepted developer on AI Frontrunners.',
  areaServed: { '@type': 'State', name: 'Texas' },
  serviceType: ['Website Design', 'Website Development', 'AI Chatbot', 'CRM Setup', 'AI Receptionist'],
  knowsAbout: ['Websites for contractors', 'AI website chat', 'CRM lead management', 'Foundation repair marketing', 'Water damage restoration marketing', 'Garage door company marketing'],
  award: 'Accepted developer, AI Frontrunners (October 2026)',
  sameAs: ['https://www.linkedin.com/in/abbas-hussain-1bb46b432/', 'https://www.instagram.com/constructionsresponse/', 'https://www.tiktok.com/@a2h.info'],
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
    priceSpecification: {
      '@type': 'PriceSpecification',
      minPrice: '800',
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

const hero = ({ eyebrow, h1, sub, primary = 'Get A Free Sample Site', primaryHref = 'book-a-call.html', secondary = null }) => `<section class="relative glow-copper pt-36 pb-20 px-6 overflow-hidden">
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

// Niche guide pages (pet groomers, dental, home care): generated in build/niche_pages.js
const NP = require('./niche_pages')({ SITE, ORG, faqLd, hero, cards, faqSection, B });

// Trade pages (current ICP: foundation repair, restoration, garage door): build/trades.js
PAGES.push(...require('./trades')({ SITE, ORG, faqLd, hero, cards, faqSection, B }));

// ---- work.html
PAGES.push({
  slug: 'work.html',
  title: 'Our Work — Websites Built for Texas Businesses | A2H',
  description: 'Live sites built by A2H for Texas businesses: H&A Healthcare Consulting (website, AI chat and CRM), CareMedBill, Azul Bio and Solid State Construction.',
  jsonLd: [ORG],
  body: [
    hero({
      eyebrow: 'Selected Work',
      h1: 'Every build, <span class="italic text-copper-light">start to launch.</span>',
      sub: 'Websites we have built for Texas businesses, from construction to healthcare consulting. Every one is hand-coded, with no page builders anywhere.',
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
  ['How much does a website cost?', 'A2H websites are $800 to $2,000 one time, depending on the number of pages and features. Every build includes the AI chat and the CRM lead list. Hosting and monthly upkeep are quoted on the call.'],
  ['Do I see anything before I pay?', 'Yes. We build a free sample site with your company name, trade and service area, then walk you through it on a 15-minute call. If you do not want it, you do not pay.'],
  ['What does the AI chat do?', 'It answers common questions using the information you give us (services, service area, hours, how to reach you), takes the visitor\'s name, number and what they need, and saves it to your CRM. Anything it cannot answer goes to you.'],
  ['What is in the CRM?', 'One lead list where every chat and form lands, with each lead tagged by how urgent it is and moved through stages: new, contacted, scheduled, booked. Spam form fills are filtered out.'],
  ['Do you offer an AI phone receptionist?', 'Yes, as an add-on. It answers calls when you cannot, takes the caller\'s details and logs them to the same CRM. Pricing is quoted on the call.'],
  ['Do I own the site?', 'Yes. It is hand-coded static files with no proprietary platform to be locked into, and you get a walkthrough at handoff.'],
];

PAGES.push({
  slug: 'pricing.html',
  title: 'Pricing: Websites with AI Chat and CRM from $800 | A2H',
  description: 'A2H websites with an AI chat and a CRM lead list are $800 to $2,000 one time. Free sample site first. AI phone receptionist and hosting available as add-ons.',
  jsonLd: [ORG, faqLd(PRICING_FAQ)],
  body: [
    hero({
      eyebrow: 'Pricing',
      h1: 'One-time price. <span class="italic text-copper-light">Free sample first.</span>',
      sub: 'We build a sample site for your company before you pay anything. If you keep it, it is a one-time price based on size. Add-ons are quoted on the call.',
      secondary: ['See Our Work', 'work.html'],
    }),
    B.pricingTable({ heading: 'What it costs' }),
    `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-4xl mx-auto">
    <div class="reveal text-center mb-10">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Add-On</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">3D Company Card</h2>
    </div>
    <div class="grid gap-6 max-w-md mx-auto">
      <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8">
        <p class="text-sm text-fog leading-[1.7] mb-5">An interactive business card built from your real card artwork. It flips, tilts and tracks the cursor.</p>
        <div class="flex items-baseline gap-2">
          <p class="font-display text-2xl text-copper-light">+$99</p>
          <p class="text-xs text-fog uppercase tracking-wider">one-time</p>
        </div>
      </div>
    </div>
  </div>
</section>`,
    faqSection(PRICING_FAQ),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- process.html
// ---- shared by process.html and book-a-call.html (every answer is a documented fact)
const SETUP_FAQ = [
  ['How much does it cost?', 'A website with the AI chat and CRM lead list is $800 to $2,000 one time, depending on size. Hosting, upkeep and the AI phone receptionist add-on are quoted on the call.'],
  ['What happens on the 15-minute call?', 'We show you the sample site we built for your company, walk through the chat and the lead list, and answer your questions. No obligation.'],
  ['What do you need from me?', 'Your company name, the services you offer, your service area and how customers should reach you. A logo and photos help, but we can start without them.'],
  ['Do I have to change my phone number?', 'No. Your number stays the same and goes at the top of the site, tappable on a phone.'],
];

PAGES.push({
  slug: 'process.html',
  title: 'How It Works: Free Sample Site, Then Launch | A2H',
  description: 'How A2H builds a website with an AI chat and CRM for Texas trade businesses: a free sample site first, a 15-minute walkthrough, then launch on your domain.',
  jsonLd: [ORG, {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How A2H builds and launches a website',
    description: 'Four steps from a free sample site to launch.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Free sample site', text: 'A2H builds a sample site with your company name, trade and service area, with the AI chat working, before you pay.' },
      { '@type': 'HowToStep', position: 2, name: '15-minute walkthrough', text: 'You see the site, the chat and the CRM lead list on a short call, then decide whether to keep it.' },
      { '@type': 'HowToStep', position: 3, name: 'Launch and handoff', text: 'Fully tested, live on your domain, with a walkthrough so you are never locked out of your own site.' },
      { '@type': 'HowToStep', position: 4, name: 'Measure it', text: 'Real performance numbers after launch, not projections.' },
    ],
  }, faqLd(SETUP_FAQ)],
  body: [
    hero({
      eyebrow: 'How It Works',
      h1: 'Sample site first. <span class="italic text-copper-light">Then you decide.</span>',
      sub: 'We build a sample site for your company before you pay, show it to you on a 15-minute call, and launch it on your domain if you keep it.',
      secondary: ['See Pricing', 'pricing.html'],
    }),
    cards('The process', 'Four steps, start to finish', [
      { tag: 'Free', h: 'We build your sample site', p: 'Your company name, trade and service area on a real site, with the AI chat working, before you pay anything.' },
      { tag: '15 minutes', h: 'You see it on a call', p: 'We walk you through the site, the chat and the lead list. Keep it or walk away.' },
      { tag: 'Yours to keep', h: 'We launch and hand it off', p: 'Fully tested, live on your domain, plus a walkthrough so you are never locked out of your own site. Static files you own outright.' },
      { tag: 'Real numbers', h: 'We measure it', p: 'A $200 Google Ads test on Solid State Construction\'s new site returned 270+ clicks in 14 days at $0.74 per click. Measured results after launch, never projections before it.' },
    ]),
    `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Why The Website Build Is Fast</p>
    <h2 class="reveal font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-6">Because we cut the parts that do not build your site</h2>
    <p class="reveal text-fog leading-[1.8]">Most agencies spend weeks on discovery decks and revision rounds that exist to justify a retainer. We publish our prices, fix the scope in writing, and start building. The sample site is the discovery. Gathering your content is usually the longest part of the whole project.</p>
  </div>
</section>`,
    faqSection(SETUP_FAQ),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- industries.html (hub)
PAGES.push({
  slug: 'industries.html',
  title: 'Websites for Texas Foundation, Restoration and Garage Door Companies | A2H',
  description: 'A2H builds websites with an AI chat and CRM for Texas foundation repair, water damage restoration and garage door companies, plus other local businesses.',
  jsonLd: [ORG],
  body: [
    hero({
      eyebrow: 'Industries',
      h1: 'Built for the trades that <span class="italic text-copper-light">get calls at night.</span>',
      sub: 'A cracked slab, a flooded kitchen and a stuck garage door all send homeowners to a website after hours. Pick your trade.',
    }),
    `<section class="py-16 px-6">
  <div class="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
    <a href="foundation-repair-websites.html" class="reveal group rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col">
      <p class="text-xs uppercase tracking-wider text-copper-light font-semibold mb-3">Foundation</p>
      <h2 class="font-display text-2xl text-sand mb-3">Foundation repair</h2>
      <p class="text-sm text-fog leading-[1.7] flex-1">Free inspection questions at 10 PM, answered on the spot, with the homeowner&#39;s address saved to your lead list.</p>
      <span class="link-underline text-copper-light text-sm font-semibold mt-5">See the page &rarr;</span>
    </a>
    <a href="restoration-websites.html" class="reveal group rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col" style="transition-delay:80ms">
      <p class="text-xs uppercase tracking-wider text-copper-light font-semibold mb-3">Restoration</p>
      <h2 class="font-display text-2xl text-sand mb-3">Water damage restoration</h2>
      <p class="text-sm text-fog leading-[1.7] flex-1">Midnight water calls answered in seconds, marked urgent, and moved through one pipeline.</p>
      <span class="link-underline text-copper-light text-sm font-semibold mt-5">See the page &rarr;</span>
    </a>
    <a href="garage-door-websites.html" class="reveal group rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col" style="transition-delay:160ms">
      <p class="text-xs uppercase tracking-wider text-copper-light font-semibold mb-3">Garage door</p>
      <h2 class="font-display text-2xl text-sand mb-3">Garage door</h2>
      <p class="text-sm text-fog leading-[1.7] flex-1">Broken springs at 6 AM answered while you are on another job, at the top of your lead list.</p>
      <span class="link-underline text-copper-light text-sm font-semibold mt-5">See the page &rarr;</span>
    </a>
  </div>
</section>`,
    `<section class="px-6 pb-16">
  <div class="max-w-5xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">Also serving</p>
    <div class="reveal flex flex-wrap justify-center gap-3">
      <a href="construction.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-5 py-2.5 rounded-full text-sm">Contractors</a>
      <a href="medical.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-5 py-2.5 rounded-full text-sm">Medical practices</a>
      <a href="retail.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-5 py-2.5 rounded-full text-sm">Local retail</a>
    </div>
  </div>
</section>`,
    B.portfolioGrid({ heading: 'Selected work.' }),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- book-a-call.html
PAGES.push({
  slug: 'book-a-call.html',
  noPopup: true,
  title: 'Book A 15-Minute Call: See Your Free Sample Site | A2H',
  description: 'Book a free 15-minute call. A2H shows you a sample website built for your company, with the AI chat and CRM lead list working, and you decide if you want it.',
  jsonLd: [ORG, faqLd([...SETUP_FAQ, ['Is the call really free?', 'Yes. The 15-minute call and the sample site are free, and there is no obligation. If you want to keep the site, it is a one-time price based on size.']])],
  body: [
    `<section class="relative glow-copper pt-36 pb-16 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-3xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">Free · 15 Minutes</p>
    <h1 class="reveal font-display text-[2.5rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-6">See your <span class="italic text-copper-light">sample site.</span></h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto">Pick a time that works for you. We'll build a sample site for your company before the call, then walk you through it, the AI chat and the lead list in 15 minutes. Keep it or walk away.</p>
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
    cards('The Call', 'What happens in 15 minutes', [
      { tag: 'Your site', h: 'You see the sample', p: 'A real site with your company name, trade and service area, built before the call.' },
      { tag: 'The system', h: 'We show the chat and CRM', p: 'You watch a test lead go from the chat into your lead list, so you can judge it before deciding anything.' },
      { tag: 'Only if it fits', h: 'You decide', p: 'Keep it for a one-time price, or walk away. The sample and the call were free.' },
    ], 3),
    faqSection([...SETUP_FAQ, ['Is the call really free?', 'Yes. The 15-minute call and the sample site are free, and there is no obligation. If you want to keep the site, it is a one-time price based on size.']]),
  ].join('\n\n'),
  extraScripts: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`,
});

// ---- watch.html — the pre-sale video sent to prospects before a call.
// The video ends with "book below", so the calendar sits right under it.
// Kept out of the sitemap: it is a link we send, not a page we rank.
PAGES.push({
  slug: 'watch.html',
  noindex: true,
  noPopup: true,
  title: 'How It Works + Pricing, In 2 Minutes | A2H',
  description: 'A 2-minute walkthrough of the A2H AI receptionist and CRM: what it does, what it costs, and how to cancel. Book a 15-minute call right under the video.',
  ogImage: '/assets/video/a2h-presale-poster.jpg',
  jsonLd: [ORG],
  body: [
    `<section class="relative glow-copper pt-32 pb-10 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-4xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">Watch This First · 2 Minutes</p>
    <h1 class="reveal font-display text-[2.25rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-5">How it works, and <span class="italic text-copper-light">exactly what it costs.</span></h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto">No hidden fees and no pressure. If it makes sense for your business, book a call right below the video.</p>
  </div>
</section>`,
    `<section class="px-6 pb-14">
  <div class="max-w-4xl mx-auto reveal">
    <div class="rounded-2xl bg-elevated border border-white/5 shadow-elevated overflow-hidden">
      <video class="block w-full h-auto" controls playsinline preload="metadata" poster="assets/video/a2h-presale-poster.jpg" width="1920" height="1080">
        <source src="assets/video/a2h-presale.mp4" type="video/mp4">
        Your browser can't play this video. <a href="assets/video/a2h-presale.mp4">Download it here</a>.
      </video>
    </div>
  </div>
</section>`,
    `<section id="book" class="px-6 pb-24">
  <div class="max-w-3xl mx-auto">
    <div class="reveal text-center mb-8">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-4">Book Below</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.03em] text-sand">Book your <span class="italic text-copper-light">15-minute</span> call.</h2>
      <p class="text-fog leading-[1.7] mt-4">We'll look at what your business needs and get you set up.</p>
    </div>
    <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated overflow-hidden">
      <div class="calendly-inline-widget" data-url="https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=231c18&text_color=e9dfd2&primary_color=c9702f" style="min-width:280px;height:700px;"></div>
    </div>
    <p class="reveal text-center text-xs text-fog mt-6">Prefer email instead? Reach us at <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.</p>
  </div>
</section>`,
  ].join('\n\n'),
  extraScripts: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`,
});

// ---- demo.html: a real recorded receptionist call, cut into chapters.
PAGES.push(require('./demo')({ ORG, EMAIL }));

// ---- groomers.html / dental.html: paid-traffic funnel pages (no nav, noindex, out of the sitemap).
PAGES.push(...require('./funnel')({ ORG, EMAIL }));

// ---- mockup.html — where the lead popup (partials.js leadPopup) sends
// someone right after they submit their info.
PAGES.push({
  slug: 'mockup.html',
  noindex: true,
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
  ['Does the AI actually book the job, not just reply?', 'Yes. It answers every call, asks what the job is and how urgent it is, and books the estimate — then alerts you the moment it books, or the moment it hits something only you should decide.'],
  ['How fast do leads get answered?', 'Instantly — the AI Receptionist answers every call in real time, day or night. In trades that single detail decides most jobs — the customer usually books whoever gets back to them first.'],
  ['Do I have to run ads to work with you?', 'No. AI Receptionist + CRM stands on its own. If you add the Custom Website tier it includes Google Business Profile setup too, which brings in calls without any ad spend.'],
  ['What does a contractor site actually need?', 'A quote-request form above the fold, proof of past work, service areas stated plainly, and a phone number that is one tap away on mobile. That is what the Custom Website tier is built around — most contractor sites bury at least two of those.'],
];

PAGES.push({
  slug: 'construction.html',
  title: 'AI Receptionist for Texas Contractors — Book More Jobs | A2H',
  description: 'AI Receptionist + CRM for Central Texas contractors: every call answered and booked, day or night. Optional website. From the Solid State Construction team.',
  jsonLd: [ORG, serviceLd('AI receptionist for contractors', 'AI Receptionist + CRM and optional hand-coded websites for Texas construction businesses.', 'Construction contractors'), faqLd(CONSTRUCTION_FAQ)],
  body: [
    hero({
      eyebrow: 'For Central Texas Contractors',
      h1: 'More calls answered. Faster follow-up. <span class="italic text-copper-light">Nothing wasted.</span>',
      sub: 'The AI Receptionist answers every call, books the estimate, and logs every job in your own CRM — the same system already running live for <a href="https://solidstatesconstruction.com" target="_blank" rel="noopener" class="link-underline text-copper-light">Solid State Construction</a>.',
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
      { tag: 'Answered in seconds', h: 'AI Receptionist', p: 'Every call answered instantly, day or night, before the customer calls the next contractor on their list. Warm-transfers to a real person when it should.' },
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
  ['Do you set up online booking?', 'Yes. The AI Receptionist books the visit, and we integrate whatever scheduling tool you already use.'],
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
      sub: 'A missed call is a patient calling the next practice on the list. The AI Receptionist answers day or night, books the visit, and logs every patient contact in your own CRM.',
      secondary: ['See the build', '#work'],
    }),
    cards('What Changes For A Practice', 'Built around how patients actually choose', [
      { tag: 'Never voicemail', h: 'Answered around the clock', p: 'Every call answered instantly, day or night — no patient sent to voicemail because it was after hours or the front desk was on another line.' },
      { tag: 'Booked, not just noted', h: 'Booked during the call', p: 'The AI Receptionist books the appointment directly, and warm-transfers to a real person when the call needs one.' },
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
  title: 'AI Receptionist for Texas Retail, Shops & Markets | A2H',
  description: 'AI Receptionist + CRM for Texas shops, markets and local retail: every call about hours and stock answered instantly. Optional website with Google Maps setup.',
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

// ---- pet-grooming.html
const PET_FAQ = [
  ['I already juggle calls between grooms, why do I need this?', 'Because "I\'ll call them back" loses the booking almost every time — the caller just calls the next mobile groomer on Google before you get a free minute. The AI Receptionist answers instantly and books it for you.'],
  ['Do I have to change my business number?', 'No — your existing number stays yours. We wire the receptionist into it, we do not replace it.'],
  ['What about clients with recurring appointments?', 'Every contact and appointment is logged automatically in your CRM pipeline, so repeat clients and their pet details are always on hand, not scattered across texts and voicemails.'],
  ['What if a caller needs something the AI cannot handle?', 'It warm-transfers to you when a call needs a real person — it is designed to never let a call go unanswered, not to replace you.'],
];

PAGES.push({
  slug: 'pet-grooming.html',
  noindex: true, // niche paused 2026-10-03: live, not indexed
  title: 'AI Receptionist for Mobile Pet Groomers & Pet Cleaning | A2H',
  description: 'AI Receptionist + CRM for Texas mobile pet groomers and pet cleaners: every call answered and booked while you\'re mid-groom. Optional custom website.',
  jsonLd: [ORG, serviceLd('AI receptionist for mobile pet groomers', 'AI Receptionist + CRM and optional hand-coded websites for Texas mobile pet grooming and mobile pet cleaning businesses.', 'Mobile pet groomers and mobile pet cleaning businesses'), faqLd(PET_FAQ)],
  body: [
    hero({
      eyebrow: 'For Mobile Pet Groomers &amp; Mobile Pet Cleaning',
      h1: 'Every call answered, even mid-groom. <span class="italic text-copper-light">Nothing missed.</span>',
      sub: 'When you\'re elbow-deep in a groom, the phone goes unanswered — and that caller books the next mobile groomer on Google. The AI Receptionist answers day or night, books the visit, and logs every contact in your own CRM.',
      secondary: ['See Pricing', 'pricing.html'],
    }),
    cards('What Changes For Mobile Groomers', 'Built around a schedule that never stops moving', [
      { tag: 'Never voicemail', h: 'Answered between appointments', p: 'Every call answered instantly, whether you\'re driving between jobs or hands-on with a groom — no client sent to voicemail because you couldn\'t grab the phone.' },
      { tag: 'Booked, not just noted', h: 'Booked during the call', p: 'The AI Receptionist books the appointment directly, and warm-transfers to you when a call needs a real person.' },
      { tag: 'Nothing lost', h: 'Every contact logged', p: 'Names, pet details, and follow-ups tracked automatically in your own CRM pipeline board — nothing relies on a sticky note in the van.' },
      { tag: 'Found locally', h: 'Maps and reviews', p: 'On the Custom Website tier, Google Business Profile is claimed and tuned, because most pet owners search "mobile groomer near me" before they ever see a website.' },
    ]),
    B.pricingTable({ heading: 'Flat pricing, published openly' }),
    faqSection(PET_FAQ),
  ].join('\n\n'),
});

// ---- hvac / plumbing / roofing / electrical / dental-practices (generated from one template)
PAGES.push(...require('./verticals')({ SITE, ORG, serviceLd, faqLd, hero, cards, faqSection, B, guides: NP.guides, fit: NP.fit }));
PAGES.push(...NP.pages);

// ---- privacy.html
PAGES.push({
  slug: 'privacy.html',
  noPopup: true,
  title: 'Privacy Policy | A2H Agency',
  description: 'How A2H Agency collects, uses and protects the information you submit through this website.',
  jsonLd: [ORG],
  body: B.legalShell({
    title: 'Privacy Policy',
    updated: 'October 19, 2026',
    sections: [
      { h: 'Who we are', p: [`A2H Agency ("A2H", "we", "us") builds websites for businesses in Texas. This policy explains what we collect through a2h.info and what we do with it. You can reach us any time at <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.`] },
      { h: 'What we collect', p: [
        'When you submit the free website mockup form we collect the name, business name, email address and phone number you enter, plus details about the website you want — your niche/industry, how many pages, color scheme preferences, any example sites you like, and any other notes you provide. All of these except phone number and the optional detail fields are required to respond to you.',
        'If you use the AI chat widget, the messages you type are processed so the assistant can answer them. Do not enter sensitive personal, medical or financial information into the chat.',
        'We use Google Analytics 4, which sets cookies and records standard analytics data such as pages viewed, approximate location derived from IP address, referring site and device type. We also use the Meta Pixel, which lets Meta record that you visited this site, watched our video or booked a call, so we can measure our Facebook and Instagram ads and show our ads to people who have visited. If you arrive from an advertisement we also record the campaign parameters in the link (for example utm_source or gclid) so we can tell which campaigns work.',
      ] },
      { h: 'SMS messaging', p: [
        'We only text you if you agree to it: by ticking the optional, unchecked SMS box on one of our forms, by saying yes when we ask on a phone call, or by texting a keyword such as SITE or DEMO to our number. Giving us your phone number on its own is not consent to texts, and agreeing to texts is never required to use our forms or our services.',
        'Texts cover your request: a link to book a time, follow-ups about your free demo or mockup (usually up to 5 per request), appointment reminders and replies to your messages, some of which may be AI-assisted. Message frequency varies; message and data rates may apply. Reply STOP at any time to opt out, or HELP for help. Full details are in our <a href="sms-terms.html" class="link-underline text-copper-light">SMS Terms</a>.',
        'Mobile information, including your phone number and SMS consent, will not be shared with or sold to third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent are never shared with any third party, except the SMS provider (Twilio) that delivers our messages on our behalf.',
      ] },
      { h: 'How we use it', p: [
        'Form submissions are used to build and send your free website mockup and to follow up about your enquiry, including by SMS as described above. Analytics data is used in aggregate to understand how the site performs.',
        'We do not sell your information, rent it, or add you to a marketing list you did not ask for. We do not share it with third parties except the service providers that operate this site — currently Vercel for hosting, Twilio for SMS delivery, Google for analytics and AI replies, Meta for ad measurement, and Resend for email — who process it only on our behalf.',
      ] },
      { h: 'How long we keep it', p: ['Enquiry details are kept for as long as needed to respond and for our business records. Google Analytics data is retained according to the retention period configured in that product. You can ask us to delete your enquiry at any time.'] },
      { h: 'Your choices', p: [
        `You can ask us what we hold about you, ask us to correct it, or ask us to delete it, by emailing <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>. We will respond within 30 days.`,
        'You can block cookies in your browser settings, and you can opt out of Google Analytics using Google\'s browser add-on. You can opt out of Meta ad personalisation in your Facebook or Instagram ad settings. The site works with cookies disabled.',
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

// ---- sms-terms.html
PAGES.push({
  slug: 'sms-terms.html',
  noPopup: true,
  title: 'SMS Terms | A2H Agency',
  description: 'How A2H text messaging works: how you opt in, what we send, how often, and how to stop.',
  jsonLd: [ORG],
  body: B.legalShell({
    title: 'SMS Terms',
    updated: 'October 19, 2026',
    sections: [
      { h: 'The program', p: ['A2H Agency ("A2H") sends text messages to business owners who ask to hear from us about a free demo website, a website mockup or a call with us. The program name is A2H Texts.'] },
      { h: 'How you opt in', p: [
        'You only get texts from us if you agree to them in one of these ways: ticking the optional, unchecked SMS box on a form on a2h.info; saying yes when we ask on a phone call whether we can text you the link and a few follow-ups; or texting a keyword such as SITE or DEMO to our number.',
        'Agreeing to texts is never a condition of using our forms or buying anything from us. Giving us your phone number on its own is not consent to texts.',
      ] },
      { h: 'What we send and how often', p: ['Texts are about your request: a link to book a time, up to 5 follow-ups over about 10 days, appointment reminders, and replies to anything you text us. Some replies may be AI-assisted. Message frequency varies. We text between 9am and 8pm Central, Monday to Saturday.'] },
      { h: 'Cost', p: ['Message and data rates may apply, depending on your mobile plan. A2H does not charge for texts.'] },
      { h: 'How to stop', p: ['Reply STOP (or STOPALL, UNSUBSCRIBE, CANCEL, END or QUIT) to any message and you will get one confirmation text, then nothing more. A plain-English request such as "please stop texting me" works too. To start again, reply START.'] },
      { h: 'Help', p: [`Reply HELP to any message, or email <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.`] },
      { h: 'Carriers', p: ['Supported on major US carriers. Carriers are not liable for delayed or undelivered messages.'] },
      { h: 'Privacy', p: ['Mobile information, including your phone number and SMS consent, will not be shared with or sold to third parties or affiliates for marketing or promotional purposes. See our <a href="privacy.html" class="link-underline text-copper-light">Privacy Policy</a> for everything else.'] },
    ],
  }),
});

// ---- thank-you.html
PAGES.push({
  slug: 'thank-you.html',
  noindex: true,
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

// ---- 404.html: Vercel serves this automatically for unknown URLs (status stays 404).
PAGES.push({
  slug: '404.html',
  noPopup: true,
  noindex: true,
  title: 'Page Not Found | A2H',
  description: 'That page does not exist. Try the homepage, pricing or the industry pages.',
  jsonLd: [],
  body: `<section class="relative glow-copper pt-40 pb-24 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-2xl mx-auto text-center relative">
    <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">404</p>
    <h1 class="font-display text-4xl sm:text-5xl tracking-[-0.03em] text-sand mb-5">That page <span class="italic text-copper-light">is not here.</span></h1>
    <p class="text-lg text-fog leading-[1.7] mb-10">The link may be old or mistyped. These are the pages people usually want.</p>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <a href="/" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">Home</a>
      <a href="/pricing.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">Pricing</a>
      <a href="/industries.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">Industries</a>
      <a href="/book-a-call.html" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">Book A Call</a>
    </div>
  </div>
</section>`,
});

// ================================================================= write ===

// Retired 2026-10-19: dental / orthodontic / home care receptionist pages carry the old
// $397-$697/mo receptionist offer. Kept live for old links, but noindexed (and so dropped from
// the sitemap) so search and AI engines don't read two different A2H offers.
const RETIRED = ['dental-practices.html', 'dental-missed-calls.html', 'dental-receptionist-options.html', 'orthodontic-missed-calls.html', 'orthodontic-receptionist-options.html', 'home-care-missed-calls.html', 'home-care-receptionist-options.html', 'orthodontic-practices.html', 'home-care-agencies.html'];
PAGES.forEach((p) => { if (RETIRED.includes(p.slug)) p.noindex = true; });

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
const urls = ['index.html', ...PAGES.filter((p) => !p.funnel && !p.noindex).map((p) => p.slug)].filter((s) => s !== '404.html' && s !== 'thank-you.html' && s !== 'mockup.html' && s !== 'watch.html');
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

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

console.log(`\n  ${written} pages + sitemap.xml + robots.txt written.`);
