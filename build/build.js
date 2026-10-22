#!/usr/bin/env node
// Generates every page except index.html, which stays hand-maintained.
// Run:  node build/build.js      (or: npm run build:pages)

const fs = require('fs');
const path = require('path');
const { page, SITE, EMAIL, tone } = require('./partials');
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
  disambiguatingDescription: 'A2H (a2h.info) is a Houston, Texas web studio founded by Abbas Hussain. It is not affiliated with A2 Hosting or with a2h.com.',
  address: { '@type': 'PostalAddress', addressLocality: 'Houston', addressRegion: 'TX', addressCountry: 'US' },
  areaServed: { '@type': 'State', name: 'Texas' },
  serviceType: ['Website Design', 'Website Development', 'AI Chatbot', 'CRM Setup', 'AI Receptionist'],
  knowsAbout: ['Websites for contractors', 'AI website chat', 'CRM lead management', 'Foundation repair marketing', 'Water damage restoration marketing', 'Garage door company marketing'],
  award: 'Accepted developer, AI Frontrunners (October 2026)',
  sameAs: ['https://www.linkedin.com/company/a2h-info/', 'https://www.linkedin.com/in/abbas-hussain-1bb46b432/', 'https://www.instagram.com/constructionsresponse/', 'https://www.tiktok.com/@a2h.info'],
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

const ARROW = B.ARROW;

const HERO_LEAD = `<div class="hero-lead" aria-hidden="true">
      <div class="stack">
        <div class="panel-box float-a">
          <div class="row-h"><span class="agent-av">👾</span><div><b>Website chat</b><br>Sample site &middot; 10:14 PM</div><span class="lw-status ml-auto">Answering</span></div>
          <div class="flex flex-col gap-2"><div class="lw-msg user">Can someone come out this week? <small>10:14 PM</small></div><div class="lw-msg ai">Yes. What's your address and best number? The owner will call you in the morning. <small>AI, 10:14 PM</small></div></div>
        </div>
        <div class="panel-box float-b">
          <div class="lw-card"><b>New lead &middot; Maria G.</b>Wants a visit this week. 214-555-0118.<div class="lw-tags"><span class="lw-tag hot">Hot</span><span class="lw-tag">This week</span><span class="lw-tag">Spam check passed</span></div></div>
          <p class="text-[10px] text-fog/70 mt-3 text-right">Sample conversation, sample data</p>
        </div>
      </div>
    </div>`;

// Left-aligned hero. The eyebrow is optional and most pages leave it out.
const hero = ({ eyebrow = '', h1, sub, primary = 'Get a free sample site', primaryHref = 'book-a-call.html', secondary = null, aside = HERO_LEAD }) => `<section class="relative glow-copper pt-32 sm:pt-40 pb-16 sm:pb-20 px-5 sm:px-6 overflow-hidden">
  <div class="hero-aura" aria-hidden="true"></div>
  <div class="hero-grid" aria-hidden="true"></div>
  <div class="hero-embers" aria-hidden="true">
    <span class="ember" style="left:6%;width:6px;height:6px;animation-duration:7.5s;animation-delay:-2s;--ember-drift:26px;--ember-rise:-300px"></span>
    <span class="ember ember-spark" style="left:17%;width:8px;height:8px;animation-duration:6.2s;animation-delay:-4.5s;--ember-drift:-18px;--ember-rise:-340px"></span>
    <span class="ember" style="left:29%;width:4px;height:4px;animation-duration:8.5s;animation-delay:-1s;--ember-drift:14px;--ember-rise:-280px"></span>
    <span class="ember" style="left:44%;width:5px;height:5px;animation-duration:7s;animation-delay:-6s;--ember-drift:-22px;--ember-rise:-310px"></span>
    <span class="ember ember-spark" style="left:58%;width:7px;height:7px;animation-duration:6.6s;animation-delay:-3s;--ember-drift:20px;--ember-rise:-350px"></span>
    <span class="ember" style="left:71%;width:4px;height:4px;animation-duration:9s;animation-delay:-7.5s;--ember-drift:-14px;--ember-rise:-270px"></span>
    <span class="ember" style="left:83%;width:6px;height:6px;animation-duration:7.8s;animation-delay:-5s;--ember-drift:18px;--ember-rise:-320px"></span>
    <span class="ember ember-spark" style="left:94%;width:8px;height:8px;animation-duration:6.4s;animation-delay:-8.5s;--ember-drift:-16px;--ember-rise:-360px"></span>
  </div>
  <div class="grain"></div>
  <div class="max-w-6xl mx-auto relative grid lg:grid-cols-12 gap-10 items-end">
    <div class="lg:col-span-${aside ? '7' : '9'}">
${eyebrow ? `      <p class="rise rise-1 kicker mb-5">${eyebrow}</p>\n` : ''}      <h1 class="display-xl text-sand mb-6" style="font-size:clamp(2.5rem,5.4vw,4.6rem)" data-split data-split-now>${tone(h1, 'tone-copper hero-italic fire-glow')}</h1>
      <p class="rise rise-3 lede text-lg max-w-xl mb-9">${sub}</p>
      <div class="rise rise-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <a href="${primaryHref}" class="btn btn-solid">${primary} <span class="btn-ico">${ARROW}</span></a>
${secondary ? `        <a href="${secondary[1]}" class="btn btn-ghost">${secondary[0]}</a>\n` : ''}      </div>
    </div>
${aside ? `    <div class="rise rise-5 lg:col-span-5">${aside}</div>\n` : ''}  </div>
</section>`;

// Numbered rows: a large number gutter, heading and one short paragraph.
// Replaces the old equal-card grid, which repeated on every page.
const cards = (eyebrow, heading, items) => `<section class="py-20 lg:py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="lg:col-span-4">
      <div class="lg:sticky lg:top-28">
${eyebrow ? `        <p class="kicker mb-5">${eyebrow}</p>\n` : ''}        <h2 class="display-lg text-sand" data-split>${tone(heading)}</h2>
      </div>
    </div>
    <div class="stagger lg:col-span-8">
${items.map((it, i) => `      <div class="num-row grid grid-cols-[3rem_1fr] sm:grid-cols-[4.5rem_1fr] gap-4 sm:gap-6 py-7 border-t hairline${i === items.length - 1 ? ' border-b' : ''}">
        <p class="figure text-copper-light text-2xl sm:text-3xl pt-1">${String(i + 1).padStart(2, '0')}</p>
        <div>
          <p class="kicker-sm mb-1.5">${it.tag}</p>
          <h3 class="display-md text-sand mb-2">${it.h}</h3>
          <p class="text-fog text-[15px] leading-[1.7] max-w-xl">${it.p}</p>
        </div>
      </div>`).join('\n')}
    </div>
  </div>
</section>`;

const faqSection = (qas, heading = 'Common questions') => `<section id="faq" class="py-20 lg:py-24 px-5 sm:px-6 bg-surface/40 border-y hairline">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="lg:col-span-4">
      <h2 class="display-lg text-sand lg:sticky lg:top-28" data-split>${tone(heading)}</h2>
    </div>
    <div class="reveal faq lg:col-span-8">
${qas.map(([q, a]) => `      <details>
        <summary><span>${q}</span><span class="plus" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span></summary>
        <p>${a}</p>
      </details>`).join('\n')}
    </div>
  </div>
</section>`;

// Plain-language summary near the top, for people and for AI search.
const answer = (text) => `<section class="px-5 sm:px-6 pb-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal grid lg:grid-cols-12 gap-6 border-t hairline pt-8">
      <p class="lg:col-span-3 text-sm font-semibold text-sand">In short</p>
      <p class="lg:col-span-8 text-sand text-[17px] leading-[1.7] max-w-3xl text-pretty">${text}</p>
    </div>
  </div>
</section>`;

// Three plain figures with a rule above each. items: [prefix, value, decimals, suffix, label].
const figures = ({ eyebrow, heading, sub = '', items, note = '' }) => `<section class="deep py-20 lg:py-24 px-5 sm:px-6 border-y hairline">
  <div class="relative max-w-6xl mx-auto">
    <div class="max-w-2xl mb-12">
      <p class="kicker mb-5">${eyebrow}</p>
      <h2 class="display-lg text-sand" data-split>${tone(heading)}</h2>
${sub ? `      <p class="lede mt-4">${sub}</p>\n` : ''}    </div>
    <div class="stagger grid sm:grid-cols-3 gap-x-8 gap-y-10">
${items.map(([pre, val, dec, suf, label], i) => `      <div class="border-t ${i === 0 ? 'border-copper-light/60' : 'hairline'} pt-6"><p class="figure text-sand" style="font-size:clamp(3rem,6vw,4.5rem)">${pre}<span data-countup="${val}"${dec ? ` data-decimals="${dec}"` : ''}>${dec ? Number(val).toFixed(dec) : val}</span>${suf}</p><p class="text-fog mt-3 max-w-[18rem]">${label}</p></div>`).join('\n')}
    </div>
${note ? `    <p class="reveal text-xs text-fog/70 mt-10 max-w-xl">${note}</p>\n` : ''}  </div>
</section>`;

// The three trade pages as rail rows, for pages that serve a wider audience.
const tradeRail = (heading) => `<section class="py-12 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <h2 class="display-lg text-sand max-w-2xl mb-8" data-split>${tone(heading)}</h2>
    <div class="stagger">
      <a href="foundation-repair-websites.html" class="rail-row group">
        <p class="text-sm text-fog tnum">10:14 PM</p>
        <h3 class="display-md text-sand">Foundation repair</h3>
        <p class="text-[15px] text-fog leading-[1.6]">"Do you do free inspections?" answered on the spot, with the homeowner&#39;s address saved to your lead list.</p>
        <span class="rail-arrow" aria-hidden="true">${ARROW.replace('viewBox', 'width="16" height="16" viewBox')}</span>
      </a>
      <a href="restoration-websites.html" class="rail-row group">
        <p class="text-sm text-fog tnum">11:48 PM</p>
        <h3 class="display-md text-sand">Water damage restoration</h3>
        <p class="text-[15px] text-fog leading-[1.6]">Midnight water messages answered in seconds, marked urgent, and moved through one pipeline.</p>
        <span class="rail-arrow" aria-hidden="true">${ARROW.replace('viewBox', 'width="16" height="16" viewBox')}</span>
      </a>
      <a href="garage-door-websites.html" class="rail-row group">
        <p class="text-sm text-fog tnum">6:40 AM</p>
        <h3 class="display-md text-sand">Garage door</h3>
        <p class="text-[15px] text-fog leading-[1.6]">Broken springs at dawn answered while you are on another job, at the top of your lead list.</p>
        <span class="rail-arrow" aria-hidden="true">${ARROW.replace('viewBox', 'width="16" height="16" viewBox')}</span>
      </a>
    </div>
  </div>
</section>`;

// Sibling links at the foot of a vertical page. links: [[href, label], ...]
const relatedLinks = (links, note = '') => `<section class="px-5 sm:px-6 pb-16">
  <div class="max-w-6xl mx-auto reveal border-t hairline pt-8">
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
      <p class="text-sm text-fog">Other pages</p>
      <div class="flex flex-wrap gap-2.5">
${links.map(([href, label]) => `        <a href="${href}" class="btn btn-ghost btn-sm">${label}</a>`).join('\n')}
      </div>
    </div>
${note ? `    <p class="text-sm text-fog mt-6 max-w-2xl">${note}</p>\n` : ''}  </div>
</section>`;

// ============================================================== the pages ===

const PAGES = [];

// Niche guide pages (pet groomers, dental, home care): generated in build/niche_pages.js
const NP = require('./niche_pages')({ SITE, ORG, faqLd, hero, cards, faqSection, answer, relatedLinks, B });

// Trade pages (current ICP: foundation repair, restoration, garage door): build/trades.js
PAGES.push(...require('./trades')({ SITE, ORG, faqLd, hero, cards, faqSection, B }));

// ---- work.html
PAGES.push({
  slug: 'work.html',
  title: 'Our Work: Websites Built for Texas Businesses | A2H',
  description: 'Live sites built by A2H for Texas businesses: H&A Healthcare Consulting (website, AI chat and CRM), Solid State Construction, CareMedBill and Azul Bio.',
  jsonLd: [ORG],
  body: [
    hero({
      h1: 'Every build, start to launch.',
      sub: 'Websites we have built for Texas businesses, from construction to healthcare consulting. Every one is hand-coded, with no page builders anywhere.',
      secondary: ['See pricing', 'pricing.html'],
    }),
    B.portfolioGrid({
      heading: 'Live sites, open them yourself.',
      sub: 'Each card opens the real site in a new tab.',
    }),
    cards('What every build includes', 'The same standard on every project', [
      { tag: 'Hand-coded', h: 'No page builders', p: 'No Divi, no Elementor, no WordPress theme bloat. Clean HTML, CSS and JavaScript you own and can hand to anyone.' },
      { tag: 'Mobile-first', h: 'Built for the small screen first', p: 'Most local searches happen on a phone. Every layout is designed at 390px before it is designed at 1440px, not squeezed down afterwards.' },
      { tag: 'Found on Maps', h: 'Google Business Profile setup', p: 'Your profile claimed, categorised and wired to the site, so you appear where customers are already searching.' },
      { tag: 'Fast', h: '90+ PageSpeed target', p: 'Compressed modern image formats, lazy loading, and an ahead-of-time CSS build. Speed is a ranking factor and a conversion factor.' },
    ]),
    B.ctaBand({ heading: 'Want yours in this list?' }),
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
      h1: 'One price, paid once. Free sample first.',
      sub: 'We build a sample site for your company before you pay anything. If you keep it, it is a one-time price based on size. Add-ons are quoted on the call.',
      secondary: ['See our work', 'work.html'],
    }),
    B.pricingTable({ heading: 'What it costs', eyebrow: 'Pricing' }),
    `<section class="py-10 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal panel grid md:grid-cols-12 gap-8 p-7 sm:p-10 items-center">
      <div class="md:col-span-8">
        <p class="text-xs text-fog mb-2">Add-on</p>
        <h2 class="display-md text-sand mb-3">3D company card</h2>
        <p class="text-fog text-[15px] leading-[1.7] max-w-xl">An interactive business card built from your real card artwork. It flips, tilts and follows the cursor. There is a live one on the <a href="/#card3d-section" class="link-underline text-copper-light">homepage</a>.</p>
      </div>
      <div class="md:col-span-4 md:text-right">
        <p class="figure text-sand text-4xl">$99</p>
        <p class="text-sm text-fog mt-1">one time, added to any build</p>
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
      h1: 'Sample site first. Then you decide.',
      sub: 'We build a sample site for your company before you pay, show it to you on a 15-minute call, and launch it on your domain if you keep it.',
      secondary: ['See pricing', 'pricing.html'],
    }),
    cards('The process', 'Four steps, start to finish', [
      { tag: 'Free', h: 'We build your sample site', p: 'Your company name, trade and service area on a real site, with the AI chat working, before you pay anything.' },
      { tag: '15 minutes', h: 'You see it on a call', p: 'We walk you through the site, the chat and the lead list. Keep it or walk away.' },
      { tag: 'Yours to keep', h: 'We launch and hand it off', p: 'Fully tested, live on your domain, plus a walkthrough so you are never locked out of your own site. Static files you own outright.' },
      { tag: 'Real numbers', h: 'We measure it', p: 'A $200 Google Ads test on Solid State Construction\'s new site returned 270+ clicks in 14 days at $0.74 per click. Measured results after launch, never projections before it.' },
    ]),
    `<section class="py-24 px-5 sm:px-6 bg-surface/40 border-y hairline">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="reveal lg:col-span-5">
      <h2 class="display-lg text-sand">Why the build is fast</h2>
    </div>
    <div class="reveal lg:col-span-7">
      <p class="text-sand text-[17px] leading-[1.75] max-w-2xl">Most agencies spend weeks on discovery decks and revision rounds that exist to justify a retainer. We publish our prices, fix the scope in writing, and start building. The sample site is the discovery. Gathering your content is usually the longest part of the whole project.</p>
    </div>
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
      h1: 'Built for the trades that get calls at night.',
      sub: 'A cracked slab, a flooded kitchen and a stuck garage door all send homeowners to a website after hours. Pick your trade.',
    }),
    `<section class="py-12 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto stagger">
    <a href="foundation-repair-websites.html" class="rail-row group">
      <p class="text-sm text-fog tnum">10:14 PM</p>
      <h2 class="display-md text-sand">Foundation repair</h2>
      <p class="text-[15px] text-fog leading-[1.6] ">"Do you do free inspections?" answered on the spot, with the homeowner&#39;s address saved to your lead list.</p>
      <span class="rail-arrow" aria-hidden="true">${ARROW.replace('viewBox', 'width="16" height="16" viewBox')}</span>
    </a>
    <a href="restoration-websites.html" class="rail-row group">
      <p class="text-sm text-fog tnum">11:48 PM</p>
      <h2 class="display-md text-sand">Water damage restoration</h2>
      <p class="text-[15px] text-fog leading-[1.6] ">Midnight water messages answered in seconds, marked urgent, and moved through one pipeline.</p>
      <span class="rail-arrow" aria-hidden="true">${ARROW.replace('viewBox', 'width="16" height="16" viewBox')}</span>
    </a>
    <a href="garage-door-websites.html" class="rail-row group">
      <p class="text-sm text-fog tnum">6:40 AM</p>
      <h2 class="display-md text-sand">Garage door</h2>
      <p class="text-[15px] text-fog leading-[1.6] ">Broken springs at dawn answered while you are on another job, at the top of your lead list.</p>
      <span class="rail-arrow" aria-hidden="true">${ARROW.replace('viewBox', 'width="16" height="16" viewBox')}</span>
    </a>
  </div>
</section>`,
    `<section class="px-5 sm:px-6 pb-12">
  <div class="max-w-6xl mx-auto reveal flex flex-wrap items-center gap-x-6 gap-y-3">
    <p class="text-sm text-fog">We also build for</p>
    <div class="flex flex-wrap gap-2.5">
      <a href="construction.html" class="btn btn-ghost btn-sm">Contractors</a>
      <a href="medical.html" class="btn btn-ghost btn-sm">Medical practices</a>
      <a href="retail.html" class="btn btn-ghost btn-sm">Local retail</a>
    </div>
  </div>
</section>`,
    B.portfolioGrid({ heading: 'Live sites we have built.', only: ['hahealth', 'ssc', 'caremedbill'] }),
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
    `<section class="relative glow-copper pt-32 sm:pt-40 pb-16 px-5 sm:px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-6xl mx-auto relative">
    <div class="max-w-2xl">
      <p class="rise rise-1 eyebrow mb-5">Free, 15 minutes</p>
      <h1 class="rise rise-2 display-xl text-sand mb-6">See your sample site.</h1>
      <p class="rise rise-3 lede text-lg">Pick a time that works. We build a sample site for your company before the call, then walk you through it, the AI chat and the lead list in 15 minutes. Keep it or walk away.</p>
    </div>
  </div>
</section>`,
    `<section class="px-5 sm:px-6 pb-24">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
    <div class="lg:col-span-4 lg:sticky lg:top-28">
      <div class="stagger">
        <p class="text-sm font-semibold text-sand pb-4 border-b hairline">What happens on the call</p>
        <div class="py-4 border-b hairline grid grid-cols-[2.5rem_1fr] gap-3"><span class="step-n">1</span><div><p class="text-sand font-medium">You see the sample</p><p class="text-sm text-fog leading-[1.6] mt-1">A real site with your company name, trade and service area, built before the call.</p></div></div>
        <div class="py-4 border-b hairline grid grid-cols-[2.5rem_1fr] gap-3"><span class="step-n">2</span><div><p class="text-sand font-medium">We show the chat and CRM</p><p class="text-sm text-fog leading-[1.6] mt-1">You watch a test lead go from the chat into your lead list.</p></div></div>
        <div class="py-4 border-b hairline grid grid-cols-[2.5rem_1fr] gap-3"><span class="step-n">3</span><div><p class="text-sand font-medium">You decide</p><p class="text-sm text-fog leading-[1.6] mt-1">Keep it for a one-time price, or walk away. The sample and the call were free.</p></div></div>
        <p class="text-sm text-fog pt-5">Prefer email? <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a></p>
      </div>
    </div>
    <div class="lg:col-span-8 reveal">
      <div class="panel-elevated overflow-hidden cal-crop">
        <div class="calendly-inline-widget" data-url="https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=231c18&text_color=e9dfd2&primary_color=c9702f" style="min-width:280px;height:700px;"></div>
      </div>
    </div>
  </div>
</section>`,
    faqSection([...SETUP_FAQ, ['Is the call really free?', 'Yes. The 15-minute call and the sample site are free, and there is no obligation. If you want to keep the site, it is a one-time price based on size.']]),
  ].join('\n\n'),
  extraScripts: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`,
});

// ---- watch.html — the pre-sale video sent to prospects before a call.
// The video ends with "book below", so the calendar sits right under it.
// Kept out of the sitemap: it is a link we send, not a page we rank.
// The old pre-sale recording (assets/video/a2h-presale.mp4) pitched the phone
// receptionist as a standalone product at its old monthly price, so it was
// retired 2026-10-21. The page now shows the H&A chat-to-CRM demo instead.
PAGES.push({
  slug: 'watch.html',
  noindex: true,
  noPopup: true,
  title: 'From Chat To CRM, On A Live Client Site | A2H',
  description: 'A test conversation on a live client site and the lead it creates in the CRM, in under 90 seconds. Book a 15-minute call right under the video.',
  ogImage: '/assets/video/ha-chatbot-crm-demo-poster.jpg',
  jsonLd: [ORG],
  body: [
    `<section class="relative glow-copper pt-32 sm:pt-40 pb-12 px-5 sm:px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-6xl mx-auto relative">
    <div class="max-w-2xl">
      <p class="rise rise-1 eyebrow mb-5">Watch first, under 90 seconds</p>
      <h1 class="rise rise-2 display-xl text-sand mb-6">A lead, from the chat to the CRM.</h1>
      <p class="rise rise-3 lede text-lg">No pressure. If it makes sense for your business, book a call right under the video.</p>
    </div>
  </div>
</section>`,
    `<section class="px-5 sm:px-6 pb-14">
  <div class="max-w-6xl mx-auto">
    <div class="reveal frame drift max-w-2xl">
      <video class="block w-full h-auto" controls playsinline preload="metadata" poster="assets/video/ha-chatbot-crm-demo-poster.jpg" width="720" height="720" data-track-media>
        <source src="assets/video/ha-chatbot-crm-demo.mp4" type="video/mp4">
        Your browser can't play this video. <a href="assets/video/ha-chatbot-crm-demo.mp4">Download it here</a>.
      </video>
    </div>
    <p class="reveal text-sm text-fog leading-[1.65] mt-5 max-w-2xl">A test conversation on the H&amp;A Healthcare Consulting site, which we built and run, and the lead it creates in their CRM. Website pricing is on the <a href="pricing.html" class="link-underline text-copper-light">pricing page</a>.</p>
  </div>
</section>`,
    `<section id="book" class="px-5 sm:px-6 pb-24">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
    <div class="reveal lg:col-span-4 lg:sticky lg:top-28">
      <p class="eyebrow mb-4">Book below</p>
      <h2 class="display-lg text-sand">Book your 15-minute call.</h2>
      <p class="lede mt-4">We look at what your business needs and whether it is a fit. No obligation.</p>
      <p class="text-sm text-fog mt-6">Prefer email? <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a></p>
    </div>
    <div class="reveal lg:col-span-8">
      <div class="panel-elevated overflow-hidden cal-crop">
        <div class="calendly-inline-widget" data-url="https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=231c18&text_color=e9dfd2&primary_color=c9702f" style="min-width:280px;height:700px;"></div>
      </div>
    </div>
  </div>
</section>`,
  ].join('\n\n'),
  extraScripts: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`,
});

// ---- demo.html: a real recorded receptionist call, cut into chapters.
PAGES.push(require('./demo')({ ORG, EMAIL }));

// ---- groomers.html / dental.html / homecare.html / orthodontists.html: paid-traffic funnel pages (no nav, noindex, out of the sitemap).
PAGES.push(...require('./funnel')({ ORG, EMAIL, cards, faqSection }));

// ---- mockup.html — where the lead popup (partials.js leadPopup) sends
// someone right after they submit their info.
PAGES.push({
  slug: 'mockup.html',
  noindex: true,
  noPopup: true,
  title: "Let's Build Your Free Mockup | A2H",
  description: "You're in. Pick a time and we'll show up with a real homepage mockup built for your business, free, no obligation.",
  jsonLd: [ORG],
  body: [
    `<section class="relative glow-copper pt-32 sm:pt-40 pb-12 px-5 sm:px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-6xl mx-auto relative">
    <div class="max-w-2xl">
      <div class="rise rise-1 mb-7 h-12 w-12 rounded-full bg-live/15 border border-live/30 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="#7fb88a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <p class="rise rise-2 eyebrow mb-5">You're in</p>
      <h1 class="rise rise-3 display-xl text-sand mb-6">Let's build your free mockup.</h1>
      <p class="rise rise-4 lede text-lg">Pick a time below. We spend the next 2 to 3 days building a real homepage mockup for your business, then walk you through it live. No charge, no obligation either way.</p>
    </div>
  </div>
</section>`,
    `<section class="px-5 sm:px-6 pb-24">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
    <div class="lg:col-span-4 lg:sticky lg:top-28">
      <div class="stagger">
        <p class="text-sm font-semibold text-sand pb-4 border-b hairline">What happens next</p>
        <div class="py-4 border-b hairline grid grid-cols-[2.5rem_1fr] gap-3"><span class="step-n">1</span><div><p class="text-sand font-medium">We build the mockup</p><p class="text-sm text-fog leading-[1.6] mt-1">A real homepage for your business, from what you told us in the form.</p></div></div>
        <div class="py-4 border-b hairline grid grid-cols-[2.5rem_1fr] gap-3"><span class="step-n">2</span><div><p class="text-sand font-medium">You see it live</p><p class="text-sm text-fog leading-[1.6] mt-1">On the call you booked. We walk through it and take your notes.</p></div></div>
        <div class="py-4 border-b hairline grid grid-cols-[2.5rem_1fr] gap-3"><span class="step-n">3</span><div><p class="text-sand font-medium">You decide</p><p class="text-sm text-fog leading-[1.6] mt-1">Keep it for a one-time price, or walk away. The mockup and the call were free.</p></div></div>
        <p class="text-sm text-fog pt-5">Prefer email? <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a></p>
      </div>
    </div>
    <div class="lg:col-span-8 reveal">
      <div class="panel-elevated overflow-hidden cal-crop">
        <div class="calendly-inline-widget" data-url="https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=231c18&text_color=e9dfd2&primary_color=c9702f" style="min-width:280px;height:700px;"></div>
      </div>
    </div>
  </div>
</section>`,
  ].join('\n\n'),
  extraScripts: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`,
});

// ---- construction.html
// Current offer only (website + AI chat + CRM, $800-$2,000). The Google Ads
// numbers are the one measured result on the site (Solid State Construction).
const CONSTRUCTION_FAQ = [
  ['How much does a contractor website cost?', 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features. That includes the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
  ['What does the AI chat say to homeowners?', 'It answers from the information you give us: your services, service area, whether estimates are free, and how to reach you. When it cannot answer, it takes the homeowner\'s name, number and what they need, and passes the question to you.'],
  ['Do I have to run ads to work with you?', 'No. The site, the chat and the CRM work on their own. Google Business Profile setup is available as an add-on and brings in calls without any ad spend.'],
  ['What does a contractor site actually need?', 'A quote-request form above the fold, proof of past work, service areas stated plainly, and a phone number that is one tap away on a phone. Most contractor sites bury at least two of those.'],
  ['Can I see it before I pay?', 'Yes. We build a sample site with your company name, trade and service area, and walk you through it on a 15-minute call. If you do not want it, you do not pay.'],
];

PAGES.push({
  slug: 'construction.html',
  title: 'Websites for Texas Contractors, Built Around the Quote Request | A2H',
  description: 'Websites with an AI chat and a CRM lead list for Texas contractors. Quote request above the fold, free sample site first, $800 to $2,000 one time.',
  jsonLd: [ORG, serviceLd('Websites with AI chat and CRM for contractors', 'Hand-coded websites with an AI chat and a CRM lead list for Texas construction and contracting businesses.', 'Construction contractors'), faqLd(CONSTRUCTION_FAQ)],
  body: [
    hero({
      eyebrow: 'Contractors, Texas',
      h1: 'Websites for Texas contractors.',
      sub: 'A fast, hand-coded site built around the quote request, with an AI chat that answers after hours and a CRM where every lead lands. Built the same way as <a href="https://solidstatesconstruction.com" target="_blank" rel="noopener" class="link-underline text-copper-light">Solid State Construction</a>.',
      secondary: ['See the build', '#work'],
    }),
    answer('A2H builds websites for Texas contractors: a fast, hand-coded site with a quote-request form above the fold, an AI chat that answers common questions (services, service area, free estimates, how to reach you) and saves every lead to a CRM. You see a free sample site for your company first. Builds are $800 to $2,000 one time, depending on size.'),
    figures({
      eyebrow: 'Measured, not projected',
      heading: 'What a fast site did to one contractor\'s ad spend.',
      sub: 'A $200 Google Ads test on Solid State Construction\'s new site, over 14 days.',
      items: [['$', 200, 0, '', 'spent on the test'], ['', 270, 0, '+', 'clicks in 14 days'], ['$', 0.74, 2, '', 'per click']],
      note: 'One client, one test. Your numbers depend on your market and your budget.',
    }),
    cards('What we build', 'What a contractor site needs', [
      { tag: 'Above the fold', h: 'The quote request, first', p: 'The form and a tappable phone number on the first screen, before a single photo.' },
      { tag: 'Proof', h: 'Your past work', p: 'Real job photos, laid out so a homeowner can see what you do in ten seconds.' },
      { tag: 'Service area', h: 'Cities you actually cover', p: 'Your real service area in plain text, so homeowners (and search engines) can see you work their city.' },
      { tag: 'AI chat + CRM', h: 'Answers after hours, saved to one list', p: 'Trained on your business. It answers the common questions, takes the name, number and job, and the lead lands in your CRM tagged by urgency.' },
    ]),
    tradeRail('In one of these trades? There is a page for you.'),
    B.portfolioGrid({ heading: 'Contractor work, live right now.', sub: 'Opens the real site in a new tab.', only: ['ssc'] }),
    B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
    faqSection(CONSTRUCTION_FAQ),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- medical.html
const MEDICAL_FAQ = [
  ['Can you handle patient privacy requirements?', 'The chat and CRM handle inquiries and scheduling details, not clinical data. They collect a name, the reason for the inquiry and callback details so your staff can follow up. If you need a patient portal or intake that touches PHI, that belongs in dedicated HIPAA-compliant software, and we link to it rather than rebuild it.'],
  ['Do you set up online booking?', 'We connect the site and the chat to whatever scheduling tool you already use, with a link patients can tap. We do not replace it.'],
  ['How do patients find the practice?', 'Google Business Profile is the biggest lever for a local practice. It drives the map result and the reviews people read before they call. Setup is available as an add-on.'],
  ['What happens after hours?', 'The chat still answers, takes the request and saves it to your CRM, so your staff see it first thing the next morning instead of a voicemail.'],
  ['How much does it cost?', 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features, including the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
];

PAGES.push({
  slug: 'medical.html',
  title: 'Websites for Texas Medical Practices and Clinics | A2H',
  description: 'Websites with an AI chat and a CRM lead list for Texas medical practices, dental offices and clinics. Inquiries answered after hours, no clinical data. Free sample site first.',
  jsonLd: [ORG, serviceLd('Websites with AI chat and CRM for medical practices', 'Hand-coded websites with an AI chat and a CRM lead list for Texas medical practices, dental offices and clinics.', 'Medical practices and clinics'), faqLd(MEDICAL_FAQ)],
  body: [
    hero({
      eyebrow: 'Medical practices and clinics, Texas',
      h1: 'Websites for Texas medical practices.',
      sub: 'A fast site that puts hours, location and a tappable number first, with an AI chat that answers the questions patients ask before they call, and a CRM where every inquiry lands. The same website, chat and CRM build is live for <a href="https://hahealthconsulting.com" target="_blank" rel="noopener" class="link-underline text-copper-light">H&amp;A Healthcare Consulting</a>.',
      secondary: ['See the build', '#work'],
    }),
    answer('A2H builds websites for Texas medical practices and clinics: a fast, hand-coded site with an AI chat that answers common questions (hours, location, services, how to reach you), takes the visitor\'s name, number and reason for the inquiry, and saves it to a CRM. The chat and CRM handle inquiries, not clinical data. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size.'),
    cards('What we build', 'Built around how patients choose', [
      { tag: 'First screen', h: 'Hours, location, phone', p: 'The three things a patient checks before anything else, visible without scrolling and tappable on a phone.' },
      { tag: 'AI chat', h: 'Answers before the call', p: 'Hours, services, directions, what to bring. It answers from what you give us and passes anything clinical or insurance-specific to your staff.' },
      { tag: 'No clinical data', h: 'Inquiries, not records', p: 'The chat collects a name, the reason for the inquiry and callback details. Anything that touches protected health information stays in your compliant software, and we link to it.' },
      { tag: 'CRM', h: 'Every inquiry in one list', p: 'Chats and form fills land in one place for your front desk, with spam filtered out first.' },
    ]),
    B.portfolioGrid({ heading: 'Healthcare work, live right now.', sub: 'Each card opens the real site in a new tab.', only: ['hahealth', 'caremedbill'] }),
    B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
    faqSection(MEDICAL_FAQ),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- retail.html
const RETAIL_FAQ = [
  ['Do I need an online store?', 'Often not. For most local shops the priority is getting someone through the door: hours, directions, stock and a phone number. A catalog or cart can be added if you are ready to sell online.'],
  ['What matters most for a local shop?', 'Your Google Business Profile. Most "near me" searches never reach a website at all, they end at the map result. Setup is available as an add-on.'],
  ['Can you show products without a full catalog?', 'Yes. A simple browsable product or menu section covers most shops, and it is far cheaper to maintain than a full e-commerce build.'],
  ['What does the AI chat do for a shop?', '"Are you open," "do you have this in stock," "where are you": the questions that otherwise interrupt whoever is at the counter. It answers from the information you give us, and when someone asks about a big order it saves their details to your CRM.'],
  ['How much does it cost?', 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features, including the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
];

PAGES.push({
  slug: 'retail.html',
  title: 'Websites for Texas Shops, Markets and Local Retail | A2H',
  description: 'Websites with an AI chat and a CRM lead list for Texas shops, markets and local retail. Hours, directions and stock questions answered at any hour. Free sample site first.',
  jsonLd: [ORG, serviceLd('Websites with AI chat and CRM for local retail', 'Hand-coded websites with an AI chat and a CRM lead list for Texas shops, markets and local retail businesses.', 'Local retail businesses'), faqLd(RETAIL_FAQ)],
  body: [
    hero({
      eyebrow: 'Shops, markets and local retail, Texas',
      h1: 'Websites for Texas shops and local retail.',
      sub: 'Hours, directions, what you carry and a tappable number, visible before anyone scrolls. An AI chat answers "are you open?" and "do you have this?" at any hour, and every inquiry lands in your CRM.',
      secondary: ['See pricing', 'pricing.html'],
    }),
    answer('A2H builds websites for Texas shops, markets and local retail: a fast, hand-coded site with hours and directions on the first screen, a simple product or menu section, an AI chat that answers hours, stock and location questions, and a CRM where inquiries land. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size.'),
    cards('What we build', 'Built for foot traffic, not page views', [
      { tag: 'First screen', h: 'Hours and directions first', p: 'The two things every local searcher wants, visible without scrolling and correct on the day.' },
      { tag: 'Products', h: 'What you carry, without a full catalog', p: 'A simple browsable product or menu section covers most shops, and it is far cheaper to maintain than a full online store.' },
      { tag: 'AI chat', h: '"Are you open?" answered at any hour', p: 'It answers hours, stock and location questions from what you give us, and saves anyone asking about a big order to your CRM.' },
      { tag: 'Maps', h: 'Google Business Profile', p: 'Most "near me" searches end at the map result and never reach a website. Setup is available as an add-on.' },
    ]),
    `<section class="py-10 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal panel grid md:grid-cols-12 gap-8 p-7 sm:p-10 items-center">
      <div class="md:col-span-8">
        <p class="text-xs text-fog mb-2">Add-on</p>
        <h2 class="display-md text-sand mb-3">3D company card</h2>
        <p class="text-fog text-[15px] leading-[1.7] max-w-xl">An interactive business card built from your real card artwork. It flips, tilts and follows the cursor. There is a live one on the <a href="/#card3d-section" class="link-underline text-copper-light">homepage</a>, built for Quality Halal Market.</p>
      </div>
      <div class="md:col-span-4 md:text-right">
        <p class="figure text-sand text-4xl">$99</p>
        <p class="text-sm text-fog mt-1">one time, added to any build</p>
      </div>
    </div>
  </div>
</section>`,
    B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
    faqSection(RETAIL_FAQ),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- pet-grooming.html (niche paused 2026-10-03: live, not indexed)
const PET_FAQ = [
  ['How much does a mobile grooming website cost?', 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features, including the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
  ['What does the chat say to pet owners?', 'It answers from what you give us: the areas you drive to, the services you offer, how to reach you. When it cannot answer, it takes the owner\'s name, number, pet and what they need, and passes it to you.'],
  ['Do you answer the phone too?', 'An AI phone receptionist is available as an add-on. It answers calls when you cannot, takes the caller\'s details and logs them to the same CRM. Your existing number stays yours. Pricing is quoted on the call.'],
  ['What about clients with recurring appointments?', 'Every inquiry is logged in your CRM with the owner\'s and pet\'s details, so repeat clients are on hand instead of scattered across texts and voicemails.'],
];

PAGES.push({
  slug: 'pet-grooming.html',
  noindex: true,
  title: 'Websites for Texas Mobile Pet Groomers | A2H',
  description: 'Websites with an AI chat and a CRM lead list for Texas mobile pet groomers. Inquiries answered while your hands are busy. Free sample site first, $800 to $2,000 one time.',
  jsonLd: [ORG, serviceLd('Websites with AI chat and CRM for mobile pet groomers', 'Hand-coded websites with an AI chat and a CRM lead list for Texas mobile pet grooming businesses.', 'Mobile pet groomers'), faqLd(PET_FAQ)],
  body: [
    hero({
      eyebrow: 'Mobile pet groomers, Texas',
      h1: 'Websites for Texas mobile groomers.',
      sub: 'A fast site with an AI chat that answers "do you come to my area?" while your hands are in a groom, and a CRM where every inquiry lands. An AI phone receptionist is available as an add-on.',
      secondary: ['See pricing', 'pricing.html'],
    }),
    answer('A2H builds websites for Texas mobile pet groomers: a fast, hand-coded site with your service area and services up front, an AI chat that answers common questions and takes the owner\'s name, number, pet and what they need, and a CRM where every inquiry lands. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size.'),
    cards('What we build', 'Built around a schedule that never stops moving', [
      { tag: 'Service area', h: 'Where you drive to', p: 'Your real service area in plain text, so owners (and search engines) can see you cover their neighborhood.' },
      { tag: 'AI chat', h: 'Answers between grooms', p: 'It answers the common questions and takes the owner\'s and pet\'s details while your hands are busy, so the owner does not call the next groomer.' },
      { tag: 'CRM', h: 'Every owner in one list', p: 'Every chat and form becomes a contact with the pet\'s details, tagged by urgency, with spam filtered out.' },
      { tag: 'Add-on', h: 'Phone receptionist', p: 'Answers calls when you cannot, takes the caller\'s details and logs them to the same CRM. Quoted on the call.' },
    ]),
    B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
    faqSection(PET_FAQ),
    B.ctaBand({}),
  ].join('\n\n'),
});

// ---- hvac / plumbing / roofing / electrical / dental-practices (generated from one template)
PAGES.push(...require('./verticals')({ SITE, ORG, serviceLd, faqLd, hero, cards, faqSection, answer, relatedLinks, B, guides: NP.guides, fit: NP.fit }));
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
  title: 'Thank You, Your Free Mockup Request Is In | A2H',
  description: 'Your free website mockup request has been received. We follow up within 24 hours.',
  jsonLd: [],
  body: `<section class="relative glow-copper pt-40 pb-24 px-5 sm:px-6 overflow-hidden min-h-[70vh] flex items-center">
  <div class="grain"></div>
  <div class="max-w-6xl mx-auto w-full relative">
    <div class="max-w-2xl">
      <div class="rise rise-1 mb-7 h-12 w-12 rounded-full bg-live/15 border border-live/30 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12.5L9.5 17L19 7" stroke="#7fb88a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h1 class="rise rise-2 display-xl text-sand mb-5">Thank you.</h1>
      <p class="rise rise-3 lede text-lg mb-10">Your request is in. Check your inbox for a confirmation. We will follow up with your free website mockup within 2 to 3 days.</p>
      <div class="rise rise-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <a href="work.html" class="btn btn-ghost">See our work</a>
        <a href="pricing.html" class="btn btn-ghost">See pricing</a>
      </div>
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
  body: `<section class="relative glow-copper pt-40 pb-24 px-5 sm:px-6 overflow-hidden min-h-[70vh] flex items-center">
  <div class="grain"></div>
  <div class="max-w-6xl mx-auto w-full relative">
    <div class="max-w-2xl">
      <p class="rise rise-1 figure text-copper-light text-6xl mb-6">404</p>
      <h1 class="rise rise-2 display-xl text-sand mb-5">That page is not here.</h1>
      <p class="rise rise-3 lede text-lg mb-10">The link may be old or mistyped. These are the pages people usually want.</p>
      <div class="rise rise-4 flex flex-wrap items-center gap-3">
        <a href="/" class="btn btn-solid">Home</a>
        <a href="/pricing.html" class="btn btn-ghost">Pricing</a>
        <a href="/industries.html" class="btn btn-ghost">Industries</a>
        <a href="/book-a-call.html" class="btn btn-ghost">Book a call</a>
      </div>
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
  'assets/motion.css': hashOf('assets/motion.css'),
  'assets/motion.js': hashOf('assets/motion.js'),
  'assets/agent.js': hashOf('assets/agent.js'),
};

fs.readdirSync(OUT)
  .filter((f) => f.endsWith('.html'))
  .forEach((f) => {
    const p = path.join(OUT, f);
    let s = fs.readFileSync(p, 'utf8');
    let touched = false;
    Object.entries(cssHashes).forEach(([rel, hash]) => {
      const re = new RegExp(`((?:href|src)=")${rel.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}(\\?v=[a-f0-9]+)?(")`, 'g');
      const next = s.replace(re, `$1${rel}?v=${hash}$3`);
      if (next !== s) { s = next; touched = true; }
    });
    if (touched) fs.writeFileSync(p, s);
  });
console.log(`\n  stylesheet cache-busting: site.css?v=${cssHashes['assets/site.css']}  tailwind.css?v=${cssHashes['assets/tailwind.css']}`);

// robots.txt + sitemap.xml
const urls = ['index.html', ...PAGES.filter((p) => !p.funnel && !p.noindex).map((p) => p.slug)].filter((s) => s !== '404.html' && s !== 'thank-you.html' && s !== 'mockup.html' && s !== 'watch.html');
const today = new Date().toISOString().slice(0, 10);
// lastmod = the page's last commit date, or today if its built file differs from that commit,
// so the sitemap only reports pages whose content actually changed.
const { execFileSync } = require('child_process');
const lastmod = (s) => {
  const git = (args) => { try { return execFileSync('git', args, { cwd: OUT, encoding: 'utf8' }).trim(); } catch { return ''; } };
  if (git(['status', '--porcelain', '--', s])) return today;
  return git(['log', '-1', '--format=%cs', '--', s]) || today;
};
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((s) => {
  const loc = s === 'index.html' ? SITE + '/' : `${SITE}/${s}`;
  const priority = s === 'index.html' ? '1.0' : (s === 'privacy.html' || s === 'terms.html') ? '0.3' : '0.8';
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod(s)}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
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
