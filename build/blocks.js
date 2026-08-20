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
    name: 'Azul Bio Research',
    href: 'https://azulbioresearch.com',
    display: 'azulbioresearch.com',
    img: 'azulbio',
    category: 'Biotech / Research',
    status: 'live',
    blurb: 'Credibility-first site for a research lab — clean, technical, and quick to scan.',
    metric: '',
  },
  {
    name: 'Quality Halal Market',
    href: 'https://hhuss786512tx-tech.github.io/Quality-Halal-Market/',
    display: 'hhuss786512tx-tech.github.io/Quality-Halal-Market',
    img: 'qhm',
    category: 'Food & Retail — Meat Shop',
    status: 'demo',
    blurb: 'Custom build for a specialty grocer — product catalog, cart, and mobile-first checkout.',
    metric: '',
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
    name: 'Starter',
    price: '$1,497',
    featured: false,
    cta: 'Start with Starter',
    features: [
      'Custom 5-page website',
      'Mobile-first responsive design',
      'Contact form → email',
      'Google Business Profile / Maps setup',
      '90+ PageSpeed target',
      '<span class="text-sand">2 months of Care Plan included</span> — then $249/mo, cancel anytime',
    ],
    addons: ['+ Add AI Chatbot for <span class="text-copper-light font-semibold">$99/mo</span>', '+ Add 3D Company Card for <span class="text-copper-light font-semibold">$99 flat</span>'],
  },
  {
    name: 'Professional',
    price: '$2,997',
    featured: true,
    cta: 'Go Professional',
    features: [
      'Everything in Starter',
      'Up to 10 pages',
      'Custom animation &amp; interactions',
      'Photo &amp; copy integration',
      'Priority build &amp; launch support',
      '<span class="text-sand">3D Company Card included</span>',
      '<span class="text-sand">6 months of Care Plan included</span> — then $249/mo, cancel anytime',
    ],
    addons: ['+ Add AI Chatbot for <span class="text-copper-light font-semibold">$99/mo</span>'],
  },
  {
    name: 'Premium',
    price: '$4,997',
    featured: false,
    cta: 'Start with Premium',
    features: [
      'Everything in Professional',
      'Unlimited pages',
      'Custom functionality (booking, cart, calculators)',
      'Logo design &amp; brand refresh included',
      'Full UI design pass + custom animation',
      '<span class="text-sand">AI Chatbot included</span> — not a $99/mo add-on',
      '<span class="text-sand">3D interactive company card included</span>',
      'Dedicated launch support',
      '<span class="text-sand">12 months of Care Plan included</span> — then $249/mo, cancel anytime',
    ],
    addons: ['Full-service build — logo, UI, and motion all included'],
  },
];

const LEAF = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" class="text-copper-light shrink-0"><path d="M12 2C10 6 6 8 4 8C4 16 8 20 12 22C16 20 20 16 20 8C18 8 14 6 12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`;

function tierCard(t) {
  const shell = t.featured
    ? 'rounded-2xl bg-elevated border border-copper/40 shadow-floating card-hover p-8 flex flex-col relative'
    : 'rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-8 flex flex-col';
  const btn = t.featured
    ? 'plan-cta btn-primary block w-full shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-6 py-3 rounded-full text-sm text-center mt-6'
    : 'plan-cta btn-primary block w-full text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-6 py-3 rounded-full text-sm text-center mt-6';
  return `      <div class="${shell}">
${t.featured ? '        <span class="absolute -top-3 left-8 bg-copper text-ink text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>\n' : ''}        <h3 class="text-sand font-semibold text-lg mb-1">${t.name}</h3>
        <p class="font-display text-3xl text-copper-light mb-4">${t.price}<span class="price-period text-base text-fog font-sans"> one-time</span></p>
        <ul class="text-sm text-fog leading-[1.9] flex-1 space-y-1">
${t.features.map((f) => `          <li>${f}</li>`).join('\n')}
        </ul>
        <div class="mt-5 pt-4 border-t border-white/10 space-y-2">
${t.addons.map((a) => `          <div class="flex items-center gap-2">${LEAF}<p class="text-xs text-fog">${a}</p></div>`).join('\n')}
        </div>
        <a href="index.html#contact" data-plan="${t.name}" class="${btn}">${t.cta}</a>
      </div>`;
}

function pricingTable({ heading = 'One flat price. Your site, live in 2–3 days.' } = {}) {
  return `<section id="pricing" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="reveal mb-6 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Transparent Pricing</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-4">${heading}</h2>
      <p class="text-fog text-sm">50% to start, 50% at launch &nbsp;·&nbsp; fixed scope, no surprises &nbsp;·&nbsp; Care Plan included with every tier</p>
    </div>
    <div class="reveal grid sm:grid-cols-3 gap-6 items-stretch mt-8">
${TIERS.map(tierCard).join('\n')}
    </div>
    <p class="reveal text-center text-sm text-fog mt-8">Every project starts with a free website score — fixed price, clear scope, no long-term contract.</p>
    <p class="reveal text-center text-sm text-fog mt-3">Care Plan (hosting, maintenance &amp; monthly edits) is included with every tier — 2, 6, or 12 months depending on plan — then continues at <span class="text-copper-light font-semibold">$249/mo</span>, cancel anytime.</p>
  </div>
</section>`;
}

// ------------------------------------------------------------------ form ---

function scoreForm({
  plan = '',
  vertical = '',
  heading = "How Strong Is Your Business's Online Presence?",
  intro = "Enter your business info — with or without a site — and get your Online Presence Score out of 100 instantly. No charge, no obligation.",
} = {}) {
  return `<section id="contact" class="py-20 px-6">
  <div class="max-w-2xl mx-auto">
    <div class="reveal mb-10 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Free Website Score</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-4">${heading}</h2>
      <p class="text-fog leading-[1.7]">${intro}</p>
    </div>
    <form id="score-form" class="reveal rounded-2xl bg-elevated border border-white/5 shadow-floating p-8 space-y-5">
      <input type="hidden" id="plan" name="plan" value="${plan}">
${vertical ? `      <input type="hidden" name="vertical" value="${vertical}">\n` : ''}      <div class="grid sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="name">Name</label>
          <input required id="name" name="name" type="text" autocomplete="name" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="Jane Rivera">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="business">Business Name</label>
          <input required id="business" name="business" type="text" autocomplete="organization" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="Rivera Concrete Co.">
        </div>
      </div>
      <div>
        <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="url">Website URL <span class="normal-case text-fog/60">(optional — leave blank if you don't have one yet)</span></label>
        <input id="url" name="url" type="text" autocomplete="url" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="yourbusiness.com">
      </div>
      <div class="grid sm:grid-cols-2 gap-5">
        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="email">Email</label>
          <input required id="email" name="email" type="email" autocomplete="email" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="jane@rivera.com">
        </div>
        <div>
          <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autocomplete="tel" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="(555) 555-0123">
        </div>
      </div>
      <div>
        <label class="block text-xs uppercase tracking-wider text-fog mb-2" for="gbp">Have you claimed your Google Business Profile?</label>
        <select id="gbp" name="gbp" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sand focus:border-copper-light/60 transition-colors">
          <option value="unsure" selected>Not sure</option>
          <option value="yes">Yes, it's claimed</option>
          <option value="no">No / not yet</option>
        </select>
      </div>
      <span class="cta-ring rounded-full p-[2px] block w-full">
        <button type="submit" class="btn-primary shadow-btn w-full bg-copper hover:bg-copper-light text-ink font-semibold px-7 py-3.5 rounded-full text-[15px]">
          Get My Free Score
        </button>
      </span>
      <p class="text-xs text-fog/70 text-center leading-[1.6]">We use your details only to calculate and send your score. No lists, no resale. See our <a href="privacy.html" class="link-underline text-copper-light hover:text-sand transition-colors">Privacy Policy</a>.</p>
      <p id="form-status" class="text-sm text-center text-fog" role="status" aria-live="polite"></p>
    </form>
    <div id="score-success" class="hidden reveal rounded-2xl bg-elevated border border-white/5 shadow-floating p-8 sm:p-12 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Your Online Presence Score</p>
      <p id="score-total" class="font-display text-6xl sm:text-7xl tracking-[-0.02em] text-sand mb-8">—<span class="text-2xl text-fog font-sans">/100</span></p>
      <ul id="score-breakdown" class="text-left max-w-sm mx-auto space-y-2.5 text-sm text-fog mb-8"></ul>
      <p class="text-fog leading-[1.7] max-w-md mx-auto mb-6">Want to see how we can get you to <span class="text-copper-light font-semibold">90+</span>?</p>
      <span class="cta-ring rounded-full p-[2px] inline-block mb-4">
        <a href="pricing.html" class="btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-7 py-3.5 rounded-full text-[15px] block">
          Show Me How to Get to 90+
        </a>
      </span>
      <p class="text-xs text-fog/70 mb-6">We'll also follow up by email with your full breakdown within 24 hours.</p>
      <button type="button" id="score-success-reset" class="text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-6 py-3 rounded-full text-sm">
        Check Another Business
      </button>
    </div>
  </div>
</section>`;
}

// Mirrors the index.html submit path exactly, including the mailto fallback
// so a lead is never silently dropped when the backend is unreachable.
const FORM_SCRIPT = `<script>
(function () {
  var form = document.getElementById('score-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var successBlock = document.getElementById('score-success');
  var successReset = document.getElementById('score-success-reset');
  var scoreTotal = document.getElementById('score-total');
  var scoreBreakdown = document.getElementById('score-breakdown');
  var submitBtn = form.querySelector('button[type="submit"]');
  var AD_PARAMS = ['gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  var BADGE = { pass: '✅', warn: '⚠️', fail: '❌' };

  function renderScore(score, breakdown) {
    scoreTotal.innerHTML = score + '<span class="text-2xl text-fog font-sans">/100</span>';
    scoreBreakdown.innerHTML = (breakdown || []).map(function (item) {
      return '<li>' + (BADGE[item.status] || '⚠️') + ' ' + item.label + '</li>';
    }).join('');
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    AD_PARAMS.concat(['landing_page']).forEach(function (key) {
      var val = null;
      try { val = sessionStorage.getItem('a2h_' + key); } catch (err) {}
      if (val) data[key] = val;
    });

    status.textContent = 'Calculating your score…';
    submitBtn.disabled = true;

    try {
      var res = await fetch('/api/score-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      var result = await res.json().catch(function () { return {}; });

      if (result.score === undefined) {
        status.textContent = 'Something went wrong. Email ${EMAIL} directly.';
        return;
      }

      renderScore(result.score, result.breakdown);
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          plan: data.plan || '',
          source: data.utm_source || (data.gclid ? 'google_ads' : 'organic'),
          score: result.score,
        });
      }

      if (result.reason === 'not_configured') {
        // No email backend configured — open a mailto so Haider still gets
        // notified, but the visitor already has their score on screen.
        var enc = encodeURIComponent;
        var planLine = data.plan ? 'Plan: ' + enc(data.plan) + '%0A' : '';
        var body = planLine + 'Business: ' + enc(data.business) + '%0AURL: ' + enc(data.url || 'none yet') + '%0APhone: ' + enc(data.phone || '') + '%0AScore: ' + result.score + '/100%0A%0ARequesting a free website score.';
        window.location.href = 'mailto:${EMAIL}?subject=' + enc('Free Score Request — ' + data.business) + '&body=' + body;
      }

      status.textContent = '';
      form.reset();
      form.classList.add('hidden');
      successBlock.classList.remove('hidden');
      successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      status.textContent = 'Something went wrong. Email ${EMAIL} directly.';
    } finally {
      submitBtn.disabled = false;
    }
  });

  if (successReset) {
    successReset.addEventListener('click', function () {
      successBlock.classList.add('hidden');
      form.classList.remove('hidden');
    });
  }
})();
</script>`;

// ------------------------------------------------------------------ misc ---

function ctaBand({ heading = 'Ready to see your <span class="italic">new site?</span>', sub = 'Free website score, fixed price, live in 2–3 days.' } = {}) {
  return `<section class="px-6 py-20">
  <div class="max-w-3xl mx-auto text-center reveal">
    <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-4">${heading}</h2>
    <p class="text-fog leading-[1.7] mb-8">${sub}</p>
    <span class="cta-ring rounded-full p-[2px] inline-block">
      <a href="index.html#contact" class="btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-8 py-4 rounded-full text-[15px] block">
        Get My Free Score
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

module.exports = { PROJECTS, TIERS, portfolioGrid, projectCard, pricingTable, scoreForm, FORM_SCRIPT, ctaBand, legalShell };
