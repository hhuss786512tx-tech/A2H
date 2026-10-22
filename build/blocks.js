// Reusable page sections. Anything that appears on more than one generated
// page lives here so the copy and the numbers only exist once.

const { EMAIL, tone } = require('./partials');

const ARROW = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>`;
const EXT = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12 12 4M6 4h6v6"/></svg>`;

// ------------------------------------------------------------- portfolio ---

// Every entry is a live client site. Order is the order they appear on the
// Work page. Azul Bio is kept here (and in the sitemap of links) but not
// surfaced on the homepage.
const PROJECTS = [
  {
    name: 'H&amp;A Healthcare Consulting',
    href: 'https://hahealthconsulting.com',
    display: 'hahealthconsulting.com',
    img: 'hahealth',
    category: 'Healthcare consulting',
    blurb: 'Website, AI chat, spam filter and CRM. Every chat and form lands in one dashboard the practice checks each morning.',
    metric: '',
    video: { src: 'assets/video/ha-chatbot-crm-demo.mp4', poster: 'assets/video/ha-chatbot-crm-demo-poster.jpg', label: 'Walkthrough of the H&amp;A chatbot capturing a lead into the CRM (test conversation)' },
  },
  {
    name: 'Solid State Construction',
    href: 'https://solidstatesconstruction.com',
    display: 'solidstatesconstruction.com',
    img: 'ssc',
    category: 'Construction',
    blurb: 'Full site rebuild for a growing construction crew. Fast, mobile-first, built around the quote request.',
    metric: '270+ clicks in 14 days at $0.74 per click, on a $200 Google Ads test',
  },
  {
    name: 'CareMedBill',
    href: 'https://caremedbill.com',
    display: 'caremedbill.com',
    img: 'caremedbill',
    category: 'Medical billing',
    blurb: 'Trust-first site for a medical billing company, built to turn practice owners into calls.',
    metric: '',
  },
  {
    name: 'Azul Bio',
    href: 'https://azulbioresearch.com',
    display: 'azulbioresearch.com',
    img: 'azulbio',
    category: 'Biotech research',
    blurb: 'Research company site with a clear service catalogue and contact path.',
    metric: '',
  },
];

function projectCard(p, { wide = false } = {}) {
  const media = p.video && wide
    ? `<video class="lazy-video w-full h-full object-cover" data-src="${p.video.src}" poster="${p.video.poster}" muted loop playsinline preload="none" width="720" height="720" aria-label="${p.video.label}"></video>`
    : `<img loading="lazy" decoding="async" width="1440" height="900" src="assets/portfolio/${p.img}.webp" alt="${p.name.replace('&amp;', '&')} website homepage" class="w-full h-full object-cover object-top">`;
  return `      <a href="${p.href}" target="_blank" rel="noopener" class="group rail-card ${wide ? 'feature md:col-span-2' : ''}">
        <div class="${wide ? 'md:w-1/2 aspect-[16/10] md:aspect-[5/4]' : 'aspect-[16/10]'} overflow-hidden bg-ink border-b hairline ${wide ? 'md:border-b-0 md:border-r' : ''}">${media}</div>
        <div class="p-6 ${wide ? 'md:w-1/2 md:p-8 flex flex-col justify-center' : 'flex flex-col flex-1'}">
          <p class="kicker-sm mb-2">${p.category}</p>
          <h3 class="display-md text-sand mb-2">${p.name}</h3>
          <p class="text-[15px] text-fog leading-[1.65] ${wide ? 'max-w-md' : 'flex-1'}">${p.blurb}</p>
${p.metric ? `          <p class="text-sm text-sand mt-4 pt-4 border-t hairline tnum">${p.metric}</p>\n` : ''}          <span class="link-arrow text-sm mt-5">${p.display}${EXT}</span>
        </div>
      </a>`;
}

function portfolioGrid({ heading = 'Live sites we have built.', sub = '', only = null, featureFirst = true } = {}) {
  const list = only ? PROJECTS.filter((p) => only.includes(p.img)) : PROJECTS;
  const wideFirst = featureFirst && list.length > 1 && list.length % 2 === 1;
  const cards = list.map((p, i) => projectCard(p, { wide: wideFirst && i === 0 })).join('\n');
  return `<section id="work" class="py-20 lg:py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="max-w-2xl mb-12">
      <p class="kicker mb-5">Work</p>
      <h2 class="display-lg text-sand" data-split>${tone(heading)}</h2>
${sub ? `      <p class="lede mt-4">${sub}</p>\n` : ''}    </div>
    <div class="stagger grid md:grid-cols-2 gap-5">
${cards}
    </div>
  </div>
</section>`;
}

// --------------------------------------------------------------- pricing ---

const OFFER = {
  name: 'Website + AI chat + CRM',
  price: '$800 to $2,000',
  priceSuffix: 'one time',
  note: 'Price depends on pages and features. Hosting and upkeep are quoted on the call.',
  features: [
    'A free sample site for your company before you pay',
    'Fast, hand-coded, mobile-first website',
    'AI chat trained on your business, answers at any hour',
    'Every chat and form saved to your own CRM lead list',
    'Spam form fills filtered out',
    'Launched on your domain, with a walkthrough',
  ],
};

const ADDONS = [
  ['AI phone receptionist', 'Answers calls when you cannot and logs them to the same CRM.'],
  ['Hosting and monthly upkeep', 'We keep the site online, fast and updated.'],
  ['Extra CRM logins', 'Seats for the people on your team who call leads back.'],
  ['Google Business Profile setup', 'Claimed, categorised and wired to the site.'],
  ['3D company card', 'An interactive card built from your real card artwork. $99 flat.'],
];

const CHECK = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-copper-light shrink-0 mt-[3px]" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg>`;

function pricingTable({ heading = 'One price, paid once. Free sample first.', eyebrow = 'Pricing' } = {}) {
  return `<section id="pricing" class="relative py-20 lg:py-24 px-5 sm:px-6 bg-surface/40 border-y hairline overflow-hidden">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
    <div class="lg:col-span-5 lg:self-center">
      <p class="kicker mb-5">${eyebrow}</p>
      <h2 class="display-lg text-sand" data-split>${tone(heading)}</h2>
      <p class="lede mt-6">Every build starts with a free sample site and a 15-minute walkthrough call. Scope is fixed in writing before any money changes hands.</p>
    </div>
    <div class="lg:col-span-7 stagger grid sm:grid-cols-2 gap-5 items-stretch">
      <div class="price-card accent">
        <p class="k">${OFFER.name}</p>
        <p class="figure text-sand mt-5" style="font-size:clamp(2.1rem,3.1vw,2.7rem)">${OFFER.price.replace(' to ', '<span class="text-fog font-sans text-lg font-normal mx-1.5">to</span>')}</p>
        <p class="text-fog mt-2">${OFFER.priceSuffix}</p>
        <p class="text-sm text-fog leading-[1.6] mt-4">${OFFER.note}</p>
        <ul class="mt-6 pt-6 border-t hairline grid gap-2.5 text-sm text-fog leading-[1.5] flex-1">
${OFFER.features.map((f) => `          <li class="flex gap-3">${CHECK}<span>${f}</span></li>`).join('\n')}
        </ul>
        <a href="book-a-call.html" class="btn btn-solid w-full mt-8">Get a free sample site <span class="btn-ico">${ARROW}</span></a>
      </div>
      <div class="price-card base">
        <p class="k">Add-ons, quoted on the call</p>
        <ul class="mt-6 divide-y divide-white/[0.06] text-[15px] flex-1">
${ADDONS.map(([h, p]) => `          <li class="py-3"><span class="text-sand block">${h}</span><span class="text-fog text-sm">${p}</span></li>`).join('\n')}
        </ul>
      </div>
    </div>
  </div>
</section>`;
}

// ------------------------------------------------------------------ misc ---

function ctaBand({ heading = 'Want to see your sample site?', sub = 'We build it free, show it to you in 15 minutes, and you decide.' } = {}) {
  return `<section class="px-5 sm:px-6 py-16 lg:py-20">
  <div class="reveal cta-deep max-w-6xl mx-auto px-7 py-14 sm:px-14 sm:py-20 text-center">
    <div class="aura" aria-hidden="true"></div>
    <div class="grain"></div>
    <div class="ambient-embers" aria-hidden="true">
      <span class="ember" style="left:4%;width:4px;height:4px;animation-duration:11s;animation-delay:-3s;--ember-drift:14px"></span>
      <span class="ember" style="left:14%;width:3px;height:3px;animation-duration:13s;animation-delay:-8s;--ember-drift:-10px"></span>
      <span class="ember" style="left:86%;width:3px;height:3px;animation-duration:12s;animation-delay:-5s;--ember-drift:-12px"></span>
      <span class="ember" style="left:95%;width:4px;height:4px;animation-duration:10.5s;animation-delay:-1s;--ember-drift:12px"></span>
    </div>
    <div class="relative">
      <h2 class="display-hero text-sand mx-auto max-w-3xl" style="font-size:clamp(2.2rem,5vw,4rem)" data-split>${/[.?!:]\s/.test(heading) ? tone(heading, 'tone-copper') : heading.replace(/^(.*?)\s(\S+\s+\S+\s+\S+)$/, '$1 <span class="tone-copper">$2</span>')}</h2>
      <p class="lede mx-auto mt-6 text-lg">${sub}</p>
      <div class="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a href="book-a-call.html" class="btn btn-solid">Get a free sample site <span class="btn-ico">${ARROW}</span></a>
        <a href="/crm-demo" class="btn btn-ghost">Try the CRM demo</a>
      </div>
    </div>
  </div>
</section>`;
}

function legalShell({ title, updated, sections }) {
  return `<section class="pt-32 pb-20 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="lg:col-span-4">
      <h1 class="display-lg text-sand mb-3">${title}</h1>
      <p class="text-sm text-fog">Last updated ${updated}</p>
    </div>
    <div class="lg:col-span-7 lg:col-start-6 prose-a2h space-y-10">
${sections.map((s) => `      <div>
        <h2 class="display-md text-sand mb-3">${s.h}</h2>
        ${s.p.map((x) => `<p class="text-fog text-[15px] leading-[1.75] mb-3">${x}</p>`).join('\n        ')}
      </div>`).join('\n')}
    </div>
  </div>
</section>`;
}

module.exports = { PROJECTS, OFFER, ADDONS, ARROW, EXT, CHECK, portfolioGrid, projectCard, pricingTable, ctaBand, legalShell };
