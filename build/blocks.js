// Reusable page sections. Anything that appears on more than one generated
// page lives here so the copy and the numbers only exist once.

const { EMAIL } = require('./partials');

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
  return `      <a href="${p.href}" target="_blank" rel="noopener" class="group panel card-hover media-zoom overflow-hidden flex flex-col ${wide ? 'md:col-span-2 md:flex-row' : ''}">
        <div class="${wide ? 'md:w-1/2 aspect-[16/10] md:aspect-[5/4]' : 'aspect-[16/10]'} overflow-hidden bg-ink border-b hairline ${wide ? 'md:border-b-0 md:border-r' : ''}">${media}</div>
        <div class="p-6 ${wide ? 'md:w-1/2 md:p-8 flex flex-col justify-center' : 'flex flex-col flex-1'}">
          <p class="text-xs text-fog mb-2">${p.category}</p>
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
  return `<section id="work" class="py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal max-w-2xl mb-12">
      <h2 class="display-lg text-sand">${heading}</h2>
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
  return `<section id="pricing" class="py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal max-w-2xl mb-12">
      <p class="eyebrow mb-4">${eyebrow}</p>
      <h2 class="display-lg text-sand">${heading}</h2>
    </div>
    <div class="reveal panel-elevated overflow-hidden">
      <div class="grid lg:grid-cols-12">
        <div class="lg:col-span-5 p-7 sm:p-10 border-b lg:border-b-0 lg:border-r hairline flex flex-col">
          <p class="text-sm font-semibold text-sand mb-5">${OFFER.name}</p>
          <p class="figure text-sand" style="font-size:clamp(2.4rem,4.2vw,3.4rem)">${OFFER.price}</p>
          <p class="text-fog mt-2">${OFFER.priceSuffix}</p>
          <p class="text-sm text-fog leading-[1.6] mt-5 max-w-xs">${OFFER.note}</p>
          <div class="pt-8">
            <a href="book-a-call.html" class="btn btn-solid w-full sm:w-auto">Get a free sample site <span class="btn-ico">${ARROW}</span></a>
          </div>
        </div>
        <div class="lg:col-span-7 p-7 sm:p-10">
          <p class="text-sm font-semibold text-sand mb-5">Every build includes</p>
          <ul class="grid sm:grid-cols-2 gap-x-8 gap-y-3.5 text-[15px] text-fog leading-[1.55]">
${OFFER.features.map((f) => `            <li class="flex gap-3">${CHECK}<span>${f}</span></li>`).join('\n')}
          </ul>
          <p class="text-sm font-semibold text-sand mt-10 mb-4">Add-ons, quoted on the call</p>
          <ul class="divide-y divide-white/[0.06] border-y border-white/[0.06]">
${ADDONS.map(([h, p]) => `            <li class="py-3 grid sm:grid-cols-[13rem_1fr] gap-x-6 gap-y-1 text-[15px]"><span class="text-sand">${h}</span><span class="text-fog">${p}</span></li>`).join('\n')}
          </ul>
        </div>
      </div>
    </div>
    <p class="reveal text-sm text-fog mt-6 max-w-xl">Every build starts with a free sample site and a 15-minute walkthrough call. Scope is fixed in writing before any money changes hands.</p>
  </div>
</section>`;
}

// ------------------------------------------------------------------ misc ---

function ctaBand({ heading = 'Want to see your sample site?', sub = 'We build it free, show it to you in 15 minutes, and you decide.' } = {}) {
  return `<section class="px-5 sm:px-6 py-10">
  <div class="reveal band max-w-6xl mx-auto rounded-2xl px-7 py-14 sm:px-14 sm:py-20">
    <div class="relative z-[1] grid md:grid-cols-12 gap-8 items-end">
      <div class="md:col-span-8">
        <h2 class="display-lg text-ink">${heading}</h2>
        <p class="text-ink/80 text-lg leading-[1.6] mt-4 max-w-lg">${sub}</p>
      </div>
      <div class="md:col-span-4 md:text-right">
        <a href="book-a-call.html" class="btn btn-ink">Get a free sample site <span class="btn-ico !bg-white/10">${ARROW}</span></a>
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
