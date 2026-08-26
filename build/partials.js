// Shared chrome for every generated page.
//
// index.html is deliberately NOT generated — it carries bespoke interactive
// machinery (intro overlay, 3D card, carousels, live chat widget) that is
// easier to maintain by hand. Everything else on the site is assembled from
// the partials here so the nav, footer, head and structured data only ever
// exist in one place.

const SITE = 'https://a2h.info';
const EMAIL = 'hhuss786512tx@gmail.com';
const GA4 = 'G-L9L2CVTSBB';

// ---------------------------------------------------------------- <head> ---

function head({ title, description, slug, ogImage = '/assets/og-image.png', jsonLd = [] }) {
  const url = slug === 'index.html' ? SITE + '/' : `${SITE}/${slug}`;
  const ld = jsonLd.length
    ? jsonLd.map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join('\n')
    : '';
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23141110'/%3E%3Ctext x='32' y='42' font-family='Georgia,serif' font-size='24' font-style='italic' fill='%23c9702f' text-anchor='middle'%3EA2H%3C/text%3E%3C/svg%3E">
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${SITE}${ogImage}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${SITE}${ogImage}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Hanken+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/tailwind.css">
<link rel="stylesheet" href="assets/site.css">
<script>document.documentElement.classList.add('js');</script>
${ld}
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA4}');
</script>`;
}

// ------------------------------------------------------------------- nav ---

const NAV_ITEMS = [
  ['work.html', 'Work'],
  ['process.html', 'Process'],
  ['pricing.html', 'Pricing'],
  ['industries.html', 'Industries'],
  ['book-a-call.html', 'Book A Call'],
];

function nav(current) {
  const link = ([href, label]) => {
    const active = href === current;
    return `        <a href="${href}"${active ? ' aria-current="page"' : ''} class="link-underline ${active ? 'text-sand' : ''} hover:text-sand transition-colors">${label}</a>`;
  };
  const mobileLink = ([href, label]) => {
    const active = href === current;
    return `      <a href="${href}"${active ? ' aria-current="page"' : ''} class="mobile-nav-link block px-6 py-3 text-sm ${active ? 'text-sand' : 'text-fog'} hover:text-sand transition-colors">${label}</a>`;
  };
  return `<header id="site-header" class="fixed top-0 inset-x-0 z-50 bg-ink/70 backdrop-blur-md transition-[box-shadow,background-color] duration-300">
  <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <a href="/" class="font-display text-xl tracking-tight text-sand">A2H<span class="text-copper">.</span></a>
    <nav class="hidden md:flex items-center gap-8 text-sm text-fog" aria-label="Primary">
${NAV_ITEMS.map(link).join('\n')}
    </nav>
    <div class="flex items-center gap-3">
      <span class="cta-ring rounded-full p-[2px] hidden sm:inline-block">
        <a href="#" class="mockup-trigger btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink text-sm font-semibold px-4 py-2.5 rounded-full block">
          Get My Free Mockup
        </a>
      </span>
      <button id="mobile-menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="md:hidden text-sand p-2 -mr-2">
        <svg id="menu-icon-open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
        <svg id="menu-icon-close" class="hidden" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden border-t border-white/5 bg-ink/95 backdrop-blur-md pb-3">
${NAV_ITEMS.map(mobileLink).join('\n')}
    <a href="#" class="mockup-trigger mobile-nav-link block px-6 py-3 text-sm text-copper-light font-semibold">Get My Free Mockup</a>
  </div>
</header>`;
}

// ---------------------------------------------------------------- footer ---

function footer() {
  return `<footer class="relative border-t border-white/5 pt-14 pb-8 px-6 overflow-hidden">
  <div class="max-w-6xl mx-auto relative">
    <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-12">
      <div>
        <p class="font-display text-2xl text-sand mb-3">A2H<span class="text-copper">.</span></p>
        <p class="text-sm text-fog leading-[1.7]">Hand-coded websites and Google Business Profile setup for Texas businesses.</p>
      </div>
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-copper-light font-semibold mb-4">Services</p>
        <ul class="space-y-2 text-sm text-fog">
          <li><a href="work.html" class="link-underline hover:text-sand transition-colors">Our Work</a></li>
          <li><a href="process.html" class="link-underline hover:text-sand transition-colors">How We Work</a></li>
          <li><a href="pricing.html" class="link-underline hover:text-sand transition-colors">Pricing</a></li>
        </ul>
      </div>
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-copper-light font-semibold mb-4">Industries</p>
        <ul class="space-y-2 text-sm text-fog">
          <li><a href="construction.html" class="link-underline hover:text-sand transition-colors">Contractors</a></li>
          <li><a href="medical.html" class="link-underline hover:text-sand transition-colors">Medical Practices</a></li>
          <li><a href="retail.html" class="link-underline hover:text-sand transition-colors">Local Retail</a></li>
        </ul>
      </div>
      <div>
        <p class="text-xs uppercase tracking-[0.2em] text-copper-light font-semibold mb-4">Contact</p>
        <ul class="space-y-2 text-sm text-fog">
          <li><a href="mailto:${EMAIL}" class="link-underline hover:text-sand transition-colors break-all">${EMAIL}</a></li>
          <li>Texas-based</li>
          <li><a href="#" class="mockup-trigger link-underline text-copper-light hover:text-sand transition-colors">Get your free mockup</a></li>
          <li><a href="book-a-call.html" class="link-underline text-copper-light hover:text-sand transition-colors">Book a call</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-fog/70">
      <p>&copy; <span data-year>2026</span> A2H Agency</p>
      <div class="flex items-center gap-5">
        <a href="privacy.html" class="link-underline hover:text-sand transition-colors">Privacy Policy</a>
        <a href="terms.html" class="link-underline hover:text-sand transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>`;
}

// ------------------------------------------------------------- lead popup ---

// Two-step "What kind of website do you want?" / "How do we reach you?"
// popup — THE lead-capture mechanism site-wide (the free score popup was
// retired; this is now the only free offer). Fires 10s after page load
// (passive), and opens on-demand from any .mockup-trigger element (nav,
// footer, hero CTAs, cta bands, pricing tier buttons — the latter also
// carry .plan-cta + data-plan to prefill which tier they're inquiring
// about). Suppressed for the passive auto-trigger only, once dismissed or
// submitted — a deliberate click always opens it regardless.
function leadPopup() {
  return `<div id="lead-popup-overlay" class="hidden fixed inset-0 z-[100] items-center justify-center bg-ink/80 backdrop-blur-sm px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="lead-popup-heading">
  <div id="lead-popup-card" class="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-elevated border border-white/10 shadow-floating p-7 sm:p-8">
    <button type="button" id="lead-popup-close" aria-label="Close" class="absolute top-4 right-4 text-fog hover:text-sand transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <form id="lead-popup-form" class="space-y-4">
      <input type="hidden" id="lp-plan" name="plan" value="">
      <p id="lp-plan-banner" class="hidden items-center gap-2 bg-copper/10 border border-copper/30 rounded-lg px-4 py-2.5 text-sm text-copper-light">
        Inquiring about the <span id="lp-plan-banner-name" class="font-semibold"></span> plan
      </p>
      <div id="lead-popup-step-1">
        <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-2">Step 1 of 2</p>
        <h2 id="lead-popup-heading" class="font-display text-2xl sm:text-3xl tracking-[-0.02em] text-sand mb-2">What kind of website do you want?</h2>
        <p class="text-sm text-fog leading-[1.6] mb-6">Tell us the vision — we'll put together a free homepage mockup made just for you, no charge, no obligation.</p>
        <div class="space-y-4">
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-niche">What's your niche?</label>
            <select required id="lp-niche" name="niche" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand focus:border-copper-light/60 transition-colors">
              <option value="" selected disabled>Choose one</option>
              <option value="construction">Construction &amp; Contracting</option>
              <option value="medical">Medical &amp; Healthcare</option>
              <option value="restaurant">Restaurant &amp; Food Service</option>
              <option value="retail">Retail &amp; Local Shop</option>
              <option value="professional">Professional Services</option>
              <option value="beauty">Beauty &amp; Wellness</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div id="lp-niche-other-wrap" class="hidden">
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-niche-other">What's your industry?</label>
            <input id="lp-niche-other" name="niche_other" type="text" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="e.g. pet grooming, event rentals">
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-pages">How many pages?</label>
            <select id="lp-pages" name="page_count" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand focus:border-copper-light/60 transition-colors">
              <option value="unsure" selected>Not sure yet</option>
              <option value="1">Just 1 (single-page site)</option>
              <option value="3-5">3–5 pages</option>
              <option value="6-10">6–10 pages</option>
              <option value="10+">10+ pages</option>
            </select>
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-colors">Color scheme</label>
            <input id="lp-colors" name="color_scheme" type="text" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors mb-2" placeholder="e.g. dark & moody, match my logo">
            <div class="flex flex-wrap gap-1.5" role="group" aria-label="Quick color scheme picks">
              <button type="button" data-scheme="Warm & earthy (tan, rust, cream)" class="lp-scheme-chip text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-fog hover:border-copper-light/60 hover:text-sand transition-colors">Warm &amp; Earthy</button>
              <button type="button" data-scheme="Bold & modern (black, white, one bright accent)" class="lp-scheme-chip text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-fog hover:border-copper-light/60 hover:text-sand transition-colors">Bold &amp; Modern</button>
              <button type="button" data-scheme="Clean & minimal (white, soft gray, single accent)" class="lp-scheme-chip text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-fog hover:border-copper-light/60 hover:text-sand transition-colors">Clean &amp; Minimal</button>
              <button type="button" data-scheme="Dark & moody (charcoal, deep tones, metallic accent)" class="lp-scheme-chip text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-fog hover:border-copper-light/60 hover:text-sand transition-colors">Dark &amp; Moody</button>
              <button type="button" data-scheme="Bright & playful (saturated colors, high energy)" class="lp-scheme-chip text-[11px] px-2.5 py-1 rounded-full border border-white/15 text-fog hover:border-copper-light/60 hover:text-sand transition-colors">Bright &amp; Playful</button>
            </div>
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-reference">A site you like the look of <span class="normal-case text-fog/60">(optional)</span></label>
            <textarea id="lp-reference" name="reference_sites" rows="2" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors resize-y" placeholder="A link, or just describe the vibe"></textarea>
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-notes">Anything else? <span class="normal-case text-fog/60">(optional)</span></label>
            <textarea id="lp-notes" name="notes" rows="2" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors resize-y" placeholder="Online store, booking system, gallery..."></textarea>
          </div>
          <p id="lead-popup-step1-status" class="text-xs text-center text-copper-light" role="status" aria-live="polite"></p>
          <button type="button" id="lead-popup-next" class="btn-primary shadow-btn w-full bg-copper hover:bg-copper-light text-ink font-semibold px-6 py-3 rounded-full text-sm">
            Next: Your Info
          </button>
        </div>
      </div>
      <div id="lead-popup-step-2" class="hidden">
        <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-2">Step 2 of 2</p>
        <h2 class="font-display text-2xl sm:text-3xl tracking-[-0.02em] text-sand mb-2">How do we reach you?</h2>
        <p class="text-sm text-fog leading-[1.6] mb-6">We'll build your mockup within 2–3 days and send it straight to your inbox.</p>
        <div class="space-y-4">
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-name">Name</label>
            <input required id="lp-name" name="name" type="text" autocomplete="name" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="Jane Rivera">
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-business">Business Name</label>
            <input required id="lp-business" name="business" type="text" autocomplete="organization" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="Rivera Concrete Co.">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-email">Email</label>
              <input required id="lp-email" name="email" type="email" autocomplete="email" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="jane@rivera.com">
            </div>
            <div>
              <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-phone">Phone</label>
              <input id="lp-phone" name="phone" type="tel" autocomplete="tel" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="(555) 555-0123">
            </div>
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider text-fog mb-1.5" for="lp-captcha-answer">Quick check: <span id="lp-captcha-question">loading…</span></label>
            <input required id="lp-captcha-answer" name="captcha_answer" type="text" inputmode="numeric" autocomplete="off" class="w-full bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sand placeholder:text-fog/50 focus:border-copper-light/60 transition-colors" placeholder="Your answer">
            <input type="hidden" name="captcha_token" id="lp-captcha-token">
          </div>
          <div style="position:absolute;left:-9999px;top:-9999px" aria-hidden="true">
            <label for="lp-company-site">Leave this field blank</label>
            <input id="lp-company-site" name="company_site" type="text" tabindex="-1" autocomplete="off">
          </div>
          <div class="flex gap-3">
            <button type="button" id="lead-popup-back" class="text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-5 py-3 rounded-full text-sm">
              Back
            </button>
            <button type="submit" class="btn-primary shadow-btn flex-1 bg-copper hover:bg-copper-light text-ink font-semibold px-6 py-3 rounded-full text-sm">
              Get My Free Mockup
            </button>
          </div>
          <p id="lead-popup-status" class="text-xs text-center text-fog" role="status" aria-live="polite"></p>
        </div>
      </div>
    </form>
  </div>
</div>`;
}

function leadPopupScript() {
  return `<script>
  (function () {
    var overlay = document.getElementById('lead-popup-overlay');
    if (!overlay) return;
    var form = document.getElementById('lead-popup-form');
    var step1 = document.getElementById('lead-popup-step-1');
    var step2 = document.getElementById('lead-popup-step-2');
    var step1Status = document.getElementById('lead-popup-step1-status');
    var status = document.getElementById('lead-popup-status');
    var closeBtn = document.getElementById('lead-popup-close');
    var nextBtn = document.getElementById('lead-popup-next');
    var backBtn = document.getElementById('lead-popup-back');
    var nicheField = document.getElementById('lp-niche');
    var nicheOtherWrap = document.getElementById('lp-niche-other-wrap');
    var planField = document.getElementById('lp-plan');
    var planBanner = document.getElementById('lp-plan-banner');
    var planBannerName = document.getElementById('lp-plan-banner-name');
    var DISMISSED_KEY = 'a2h_popup_dismissed';
    var SUBMITTED_KEY = 'a2h_popup_submitted';

    // Self-hosted captcha (see api/captcha-challenge.js) — no third-party
    // script/signup. Fetched immediately so it's ready by the time the
    // popup opens 10s+ later.
    var captchaLoadedAt = 0;
    var captchaQuestionEl = document.getElementById('lp-captcha-question');
    var captchaTokenEl = document.getElementById('lp-captcha-token');
    function loadCaptcha() {
      captchaLoadedAt = Date.now();
      fetch('/api/captcha-challenge').then(function (r) { return r.json(); }).then(function (d) {
        if (captchaQuestionEl) captchaQuestionEl.textContent = d.question ? 'What is ' + d.question + '?' : 'skip this — verification unavailable';
        if (captchaTokenEl) captchaTokenEl.value = d.token || '';
      }).catch(function () {
        if (captchaQuestionEl) captchaQuestionEl.textContent = 'skip this — verification unavailable';
      });
    }
    loadCaptcha();

    if (nicheField && nicheOtherWrap) {
      nicheField.addEventListener('change', function () {
        nicheOtherWrap.classList.toggle('hidden', nicheField.value !== 'other');
      });
    }

    document.querySelectorAll('.lp-scheme-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var input = document.getElementById('lp-colors');
        if (input) input.value = chip.getAttribute('data-scheme') || '';
      });
    });

    function showStep(n) {
      step1.classList.toggle('hidden', n !== 1);
      step2.classList.toggle('hidden', n !== 2);
      var first = (n === 1 ? step1 : step2).querySelector('input, select, textarea');
      if (first) first.focus();
    }

    nextBtn.addEventListener('click', function () {
      if (!nicheField.value) {
        step1Status.textContent = 'Please choose a niche to continue.';
        nicheField.focus();
        return;
      }
      step1Status.textContent = '';
      showStep(2);
    });

    backBtn.addEventListener('click', function () { showStep(1); });

    function alreadyHandled() {
      try {
        return sessionStorage.getItem(DISMISSED_KEY) === '1' || localStorage.getItem(SUBMITTED_KEY) === '1';
      } catch (e) { return false; }
    }

    // plan is set when a pricing-tier button (.plan-cta, data-plan) opened
    // this — shows a small "inquiring about X" banner and prefills the
    // hidden field. Any other trigger (nav, footer, hero, ...) passes no
    // plan, which clears it.
    function openPopup(plan) {
      showStep(1);
      if (plan) {
        planField.value = plan;
        planBannerName.textContent = plan;
        planBanner.classList.remove('hidden');
        planBanner.classList.add('flex');
      } else {
        planField.value = '';
        planBanner.classList.add('hidden');
        planBanner.classList.remove('flex');
      }
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
      document.body.classList.add('overflow-hidden');
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      var first = form.querySelector('input, select');
      if (first) first.focus();
      document.dispatchEvent(new Event('a2h:popup-toggle'));
    }

    // Passive auto-trigger (10s / scroll-past-hero) — respects dismissal
    // and past submission. A deliberate click (openPopup above, wired to
    // .mockup-trigger below) always opens regardless.
    function open() {
      if (alreadyHandled()) return;
      openPopup(null);
    }

    function close(remember) {
      overlay.classList.remove('is-open');
      document.body.classList.remove('overflow-hidden');
      setTimeout(function () { overlay.classList.add('hidden'); overlay.classList.remove('flex'); }, 250);
      if (remember) { try { sessionStorage.setItem(DISMISSED_KEY, '1'); } catch (e) {} }
      document.dispatchEvent(new Event('a2h:popup-toggle'));
    }

    closeBtn.addEventListener('click', function () { close(true); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(true); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close(true);
    });

    document.querySelectorAll('.mockup-trigger').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openPopup(el.dataset.plan || null);
      });
    });

    if (!alreadyHandled()) setTimeout(open, 10000);

    var ERROR_COPY = {
      captcha_failed: "That answer didn't match — double-check and try again.",
      invalid_email: 'That email address looks invalid — please double-check it.',
      disposable_email: 'Please use a permanent email address, not a temporary/disposable one.',
      email_domain_unreachable: "That email's domain doesn't appear to accept mail — please double-check it.",
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.textContent = 'Sending…';
      var data = Object.fromEntries(new FormData(form).entries());
      data.landing_page = window.location.pathname;
      data.elapsed_ms = Date.now() - captchaLoadedAt;
      ['gclid', 'fbclid', 'utm_source', 'utm_campaign'].forEach(function (k) {
        try { var v = sessionStorage.getItem('a2h_' + k); if (v) data[k] = v; } catch (e) {}
      });
      fetch('/api/mockup-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (result) {
          if (!res.ok) {
            btn.disabled = false;
            status.textContent = ERROR_COPY[result.error] || 'Something went wrong — email us directly at hhuss786512tx@gmail.com.';
            if (result.error === 'captcha_failed') loadCaptcha();
            return;
          }
          try { localStorage.setItem(SUBMITTED_KEY, '1'); } catch (e) {}
          window.location.href = '/mockup.html';
        });
      }).catch(function () {
        btn.disabled = false;
        status.textContent = 'Something went wrong — email us directly at hhuss786512tx@gmail.com.';
      });
    });
  })();
  </script>`;
}

// --------------------------------------------------------- shared scripts ---

function scripts() {
  return `<script>
  // Header shadow on scroll
  (function () {
    var header = document.getElementById('site-header');
    if (!header) return;
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  // Mobile menu
  (function () {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    var iconOpen = document.getElementById('menu-icon-open');
    var iconClose = document.getElementById('menu-icon-close');
    if (!btn || !menu) return;
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      iconOpen.classList.toggle('hidden', open);
      iconClose.classList.toggle('hidden', !open);
      if (open) {
        menu.classList.remove('hidden');
        requestAnimationFrame(function () { menu.classList.add('is-open'); });
      } else {
        menu.classList.remove('is-open');
        setTimeout(function () { menu.classList.add('hidden'); }, 250);
      }
    };
    btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
    menu.querySelectorAll('.mobile-nav-link').forEach(function (l) { l.addEventListener('click', function () { setOpen(false); }); });
  })();

  // Scroll reveal
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    // threshold 0 + a negative bottom margin instead of a fraction threshold:
    // a fraction is measured against the element's own height, so a block
    // taller than the viewport can never reach it and would stay invisible
    // forever. This fires once any part crosses 12% up from the bottom edge,
    // which behaves the same for a one-line heading and a full-height card.
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    els.forEach(function (el) { io.observe(el); });

    // Safety sweep: since .reveal starts hidden, an observer miss means copy
    // the visitor can never read. Anything already scrolled past or currently
    // in view gets revealed outright, on every scroll and resize.
    var sweep = function () {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        if (el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.95) { el.classList.add('in'); io.unobserve(el); }
      });
    };
    var queued = false;
    var onScroll = function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; sweep(); });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('load', sweep);
    sweep();
  })();

  // Footer year — never goes stale
  (function () {
    var y = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
  })();

  // Ad attribution capture, mirroring index.html
  (function () {
    var KEYS = ['gclid', 'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    var params = new URLSearchParams(window.location.search);
    var found = false;
    KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) { try { sessionStorage.setItem('a2h_' + k, v); found = true; } catch (e) {} }
    });
    if (found) { try { sessionStorage.setItem('a2h_landing_page', window.location.pathname); } catch (e) {} }
  })();
</script>`;
}

// ----------------------------------------------------------------- shell ---

function page({ title, description, slug, jsonLd, body, extraScripts = '', noPopup = false }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${head({ title, description, slug, jsonLd })}
</head>
<body class="text-sand antialiased">

${nav(slug)}

${body}

${footer()}
${noPopup ? '' : `\n${leadPopup()}`}

${scripts()}
${noPopup ? '' : leadPopupScript()}
${extraScripts}
</body>
</html>
`;
}

module.exports = { page, head, nav, footer, scripts, leadPopup, leadPopupScript, SITE, EMAIL, GA4 };
