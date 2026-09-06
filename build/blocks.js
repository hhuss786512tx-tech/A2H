// Reusable page sections. Anything that appears on more than one generated
// page lives here so the copy and the numbers only exist once — the pricing
// figures in particular were previously repeated by hand across index.html
// and construction.html and had already drifted apart.

const { EMAIL } = require('./partials');

// ------------------------------------------------------------- portfolio ---

const PROJECTS = [
  {
    name: 'Solid State Construction',
    href: 'https://solidstatesconstruction.com',
    display: 'solidstatesconstruction.com',
    img: 'ssc',
    category: 'Construction',
    status: 'live',
    blurb: 'Full site rebuild for a growing construction crew — fast, mobile-first, built to convert.',
    metric: '270+ clicks in 14 days · $0.74 cost per click on a $200 test budget',
  },
  {
    name: 'CareMedBill',
    href: 'https://hhuss786512tx-tech.github.io/Caremedbill/',
    display: 'hhuss786512tx-tech.github.io/Caremedbill',
    img: 'caremedbill',
    category: 'Medical Billing',
    status: 'demo',
    blurb: 'Trust-first site for a medical billing platform — built to convert practice-owner visitors into calls.',
    metric: '',
  },
];

function badge(status) {
  return status === 'live'
    ? `        <span class="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-ink/90 border border-white/10 pl-2 pr-2.5 py-1">
          <span class="relative flex h-1.5 w-1.5"><span class="pulse-dot absolute inline-flex h-full w-full rounded-full bg-live"></span><span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-live"></span></span>
          <span class="text-[10px] font-semibold tracking-wide text-sand/80">LIVE</span>
        </span>`
    : `        <span class="absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-ink/90 border border-white/10 pl-2 pr-2.5 py-1">
          <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-fog/70"></span>
          <span class="text-[10px] font-semibold tracking-wide text-sand/80">DEMO BUILD</span>
        </span>`;
}

function projectCard(p) {
  const alt = p.status === 'live' ? `${p.name} live website` : `${p.name} demo build`;
  return `      <a href="${p.href}" target="_blank" rel="noopener" class="group relative rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover overflow-hidden flex flex-col">
${badge(p.status)}
        <div class="flex items-center gap-1.5 px-4 py-3 bg-surface border-b border-white/5">
          <span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
          <span class="h-2.5 w-2.5 rounded-full bg-white/15"></span>
          <span class="ml-2 text-xs text-fog/70 truncate">${p.display}</span>
        </div>
        <div class="h-36 overflow-hidden">
          <img loading="lazy" decoding="async" width="1440" height="1024" src="assets/portfolio/${p.img}.webp" alt="${alt}" class="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105">
        </div>
        <div class="p-5 flex flex-col flex-1">
          <p class="text-xs uppercase tracking-wider text-copper-light font-semibold mb-2">${p.category}</p>
          <h3 class="font-display text-lg text-sand mb-2">${p.name}</h3>
          <p class="text-sm text-fog leading-[1.6] flex-1">${p.blurb}</p>
${p.metric ? `          <p class="text-xs text-copper-light font-semibold mt-3 pt-3 border-t border-white/10">${p.metric}</p>\n` : ''}        </div>
      </a>`;
}

function portfolioGrid({ heading = 'Real businesses, real launches.', sub = '', only = null } = {}) {
  const list = only ? PROJECTS.filter((p) => only.includes(p.img)) : PROJECTS;
  return `<section id="work" class="py-20 px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal mb-10 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Selected Work</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">${heading}</h2>
${sub ? `      <p class="text-fog leading-[1.7] max-w-2xl mx-auto mt-4">${sub}</p>\n` : ''}    </div>
    <div class="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
${list.map(projectCard).join('\n')}
    </div>
    <p class="reveal text-center text-xs text-fog/70 mt-6">Cards marked <span class="text-sand">DEMO BUILD</span> are complete builds hosted on our own GitHub Pages account rather than a client domain.</p>
  </div>
</section>`;
}

// --------------------------------------------------------------- pricing ---

const TIERS = [
  {
    name: 'AI Receptionist + CRM',
    badge: 'Our Main Offer',
    price: '$1,500',
    priceSuffix: ' setup',
    note: 'then <span class="text-sand font-semibold">$397</span>/mo &nbsp;·&nbsp; <span class="text-sand font-semibold">$99</span>/mo per extra team seat',
    featured: true,
    cta: 'Book A Free Setup Call',
    href: 'book-a-call.html',
    features: [
      'Answers every call, day or night — no voicemail',
      'Books appointments straight into your calendar',
      'Every call and contact logged in your own CRM',
      "Warm transfer to a real person when it's needed",
      "Pipeline board — see every lead's stage at a glance",
      '<span class="text-sand">Cancel anytime</span> — no long-term contract',
    ],
    addons: [],
  },
  {
    name: 'AI Receptionist + CRM + Custom Website',
    badge: 'Most Complete',
    price: '$2,000',
    priceSuffix: ' setup',
    note: 'then <span class="text-sand font-semibold">$400</span>/mo &nbsp;·&nbsp; <span class="text-sand font-semibold">$99</span>/mo per extra team seat',
    featured: false,
    cta: 'Book A Free Setup Call',
    href: 'book-a-call.html',
    features: [
      'Everything in AI Receptionist + CRM',
      'Custom hand-coded website (up to 10 pages)',
      'Mobile-first responsive design + logo design included',
      'Google Business Profile / Maps setup',
      '90+ PageSpeed target',
      '<span class="text-sand">Care Plan included</span> — then $249/mo, cancel anytime',
    ],
    addons: ['+ Add AI Website Chatbot for <span class="text-copper-light font-semibold">$99/mo</span>', '+ Add 3D Company Card for <span class="text-copper-light font-semibold">$99 flat</span>'],
  },
];

const LEAF = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-copper-light shrink-0"><path d="M12 2C10 6 6 8 4 8C4 16 8 20 12 22C16 20 20 16 20 8C18 8 14 6 12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

function tierCard(t) {
  const shell = t.featured
    ? 'pricing-ring pricing-ring-feature rounded-2xl bg-elevated border border-copper/40 shadow-floating card-hover p-8 flex flex-col relative'
    : 'pricing-ring rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col';
  const btn = t.featured
    ? 'btn-primary block w-full shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-6 py-3 rounded-full text-sm text-center mt-6'
    : 'btn-primary block w-full text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-6 py-3 rounded-full text-sm text-center mt-6';
  const priceBlock = `        <p class="font-display text-3xl text-copper-light mb-1">${t.price}<span class="price-period text-base text-fog font-sans">${t.priceSuffix || ''}</span></p>
        <p class="text-xs text-fog mb-4">${t.note}</p>`;
  return `      <div class="${shell}">
${t.badge ? `        <span class="absolute -top-3 left-8 bg-copper text-ink text-xs font-bold px-3 py-1 rounded-full">${t.badge}</span>\n` : ''}        <h3 class="text-sand font-semibold text-lg mb-1">${t.name}</h3>
${priceBlock}
        <ul class="text-sm text-fog leading-[1.9] flex-1 space-y-1">
${t.features.map((f) => `          <li>${f}</li>`).join('\n')}
        </ul>
${t.addons.length ? `        <div class="mt-5 pt-4 border-t border-white/10 space-y-2">
${t.addons.map((a) => `          <div class="flex items-center gap-2">${LEAF}<p class="text-xs text-fog">${a}</p></div>`).join('\n')}
        </div>\n` : ''}        <a href="${t.href}" class="${btn}">${t.cta}</a>
      </div>`;
}

function pricingTable({ heading = 'Two ways to never miss a call again.' } = {}) {
  return `<section id="pricing" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="reveal mb-6 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Transparent Pricing</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-4">${heading}</h2>
      <p class="text-fog text-sm">Fixed setup fee, simple monthly rate &nbsp;·&nbsp; cancel anytime &nbsp;·&nbsp; no long-term contract</p>
    </div>
    <div class="reveal grid sm:grid-cols-2 gap-6 items-stretch mt-8 max-w-3xl mx-auto">
${TIERS.map(tierCard).join('\n')}
    </div>
    <p class="reveal text-center text-sm text-fog mt-8">Both tiers include a dedicated onboarding call before anything goes live. Google Business Profile setup comes with the Custom Website tier.</p>
  </div>
</section>`;
}

// ------------------------------------------------------------------ misc ---

function ctaBand({ heading = 'Ready to stop missing calls?', sub = 'Free setup call, fixed pricing, no long-term contract.' } = {}) {
  return `<section class="px-6 py-20">
  <div class="max-w-3xl mx-auto text-center reveal">
    <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-4">${heading}</h2>
    <p class="text-fog leading-[1.7] mb-8">${sub}</p>
    <span class="cta-ring rounded-full p-[2px] inline-block">
      <a href="book-a-call.html" class="btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-8 py-4 rounded-full text-[15px] block">
        Book A Free Setup Call
      </a>
    </span>
  </div>
</section>`;
}

function legalShell({ title, updated, sections }) {
  return `<section class="pt-32 pb-20 px-6">
  <div class="max-w-3xl mx-auto">
    <h1 class="font-display text-4xl sm:text-5xl tracking-[-0.03em] text-sand mb-3">${title}</h1>
    <p class="text-sm text-fog mb-12">Last updated ${updated}</p>
    <div class="prose-a2h space-y-10">
${sections.map((s) => `      <div>
        <h2 class="font-display text-xl text-sand mb-3">${s.h}</h2>
        ${s.p.map((x) => `<p class="text-fog text-sm leading-[1.8] mb-3">${x}</p>`).join('\n        ')}
      </div>`).join('\n')}
    </div>
  </div>
</section>`;
}

module.exports = { PROJECTS, TIERS, portfolioGrid, projectCard, pricingTable, ctaBand, legalShell };
