// Shared chrome for every generated page.
//
// index.html is deliberately NOT generated — it carries bespoke interactive
// machinery (intro overlay, 3D card, carousels, live chat widget) that is
// easier to maintain by hand. Everything else on the site is assembled from
// the partials here so the nav, footer, head and structured data only ever
// exist in one place.

const SITE = 'https://a2h.info';
const EMAIL = 'hello@a2h.info';
const GA4 = 'G-L9L2CVTSBB';
const META_PIXEL = '1760813911727113'; // Meta dataset "A2H Ads MCP", ad account 1235578990336631

// ---------------------------------------------------------------- <head> ---

function head({ title, description, slug, ogImage = '/assets/og-image.png', jsonLd = [], noindex = false }) {
  const url = slug === 'index.html' ? SITE + '/' : `${SITE}/${slug}`;
  const ld = jsonLd.length
    ? jsonLd.map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join('\n')
    : '';
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<link rel="canonical" href="${url}">
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
<link rel="stylesheet" href="assets/motion.css">
<script>document.documentElement.classList.add('js');</script>
${ld}
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA4}');
</script>
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL}');
fbq('track', 'PageView');
// Funnel events: video started/finished on the pre-call page, and a booked Calendly slot counts as a Lead.
if (/(watch|groomers|dental)(\.html)?$/.test(location.pathname)) fbq('track', 'ViewContent', { content_name: 'pre-call video page' });
window.addEventListener('message', function (e) {
  if (e.origin === 'https://calendly.com' && e.data && e.data.event === 'calendly.event_scheduled') {
    fbq('track', 'Lead', { content_name: 'call booked' });
    fbq('track', 'Schedule');
  }
});
document.addEventListener('DOMContentLoaded', function () {
  var v = document.querySelector('[data-track-media]');
  if (!v) return;
  v.addEventListener('play', function () { fbq('trackCustom', 'VideoPlay'); }, { once: true });
  v.addEventListener('ended', function () { fbq('trackCustom', 'VideoComplete'); }, { once: true });
});
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL}&ev=PageView&noscript=1" alt=""></noscript>`;
}

// ------------------------------------------------------------------- nav ---

const NAV_ITEMS = [
  ['work.html', 'Work'],
  ['process.html', 'Process'],
  ['pricing.html', 'Pricing'],
  ['industries.html', 'Industries'],
];

const ARROW = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>`;

function nav(current) {
  const link = ([href, label]) => {
    const active = href === current;
    return `        <a href="${href}"${active ? ' aria-current="page"' : ''} class="nav-link">${label}</a>`;
  };
  const mobileLink = ([href, label]) => {
    const active = href === current;
    return `      <a href="${href}"${active ? ' aria-current="page"' : ''} class="mobile-nav-link${active ? ' text-sand' : ''}">${label}</a>`;
  };
  return `<a href="#main" class="skip-link">Skip to content</a>
<header id="site-header">
  <div class="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
    <div class="flex items-center gap-4 shrink-0"><a href="/" class="font-display text-[1.35rem] tracking-tight text-sand" aria-label="A2H home">A2H<span class="text-copper">.</span></a><span class="status-pill hidden lg:inline-flex"><i></i>Houston &middot; Open for new projects</span></div>
    <nav class="hidden md:flex items-center gap-7" aria-label="Primary">
${NAV_ITEMS.map(link).join('\n')}
    </nav>
    <div class="flex items-center gap-3 shrink-0">
      <a href="book-a-call.html" class="btn btn-solid btn-sm hidden sm:inline-flex">Get a free sample site <span class="btn-ico"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></span></a>
      <button id="mobile-menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="menu-btn md:hidden relative">
        <span class="bar"></span><span class="bar"></span><span class="bar"></span>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden">
    <nav class="max-w-6xl mx-auto px-5 pt-1 pb-5 flex flex-col" aria-label="Mobile">
${NAV_ITEMS.map(mobileLink).join('\n')}
      <a href="book-a-call.html" class="mobile-nav-link">Book a call</a>
      <a href="book-a-call.html" class="mobile-nav-link btn btn-solid mt-5 !border-0">Get a free sample site</a>
    </nav>
  </div>
</header>`;
}

// ---------------------------------------------------------------- footer ---

function footer() {
  return `<footer class="relative mt-8">
  <div class="max-w-6xl mx-auto px-5 sm:px-6">
    <div class="rule"></div>
    <div class="grid gap-10 md:grid-cols-12 pt-14 pb-12">
      <div class="md:col-span-5">
        <p class="font-display text-[1.6rem] text-sand mb-4">A2H<span class="text-copper">.</span></p>
        <p class="text-[15px] text-fog leading-[1.7] max-w-sm">Websites with an AI chat and a CRM lead list, built in Houston for Texas foundation repair, restoration and garage door companies.</p>
        <p class="text-sm text-fog/80 mt-4 max-w-sm">Founder Abbas Hussain is an accepted developer on AI Frontrunners.</p>
      </div>
      <div class="md:col-span-2 md:col-start-7">
        <p class="text-sm font-semibold text-sand mb-4">Site</p>
        <ul class="space-y-0.5 text-[15px] text-fog">
          <li><a href="work.html" class="link-underline hover:text-sand inline-block py-1.5">Work</a></li>
          <li><a href="about.html" class="link-underline hover:text-sand inline-block py-1.5">About</a></li>
          <li><a href="process.html" class="link-underline hover:text-sand inline-block py-1.5">Process</a></li>
          <li><a href="pricing.html" class="link-underline hover:text-sand inline-block py-1.5">Pricing</a></li>
          <li><a href="industries.html" class="link-underline hover:text-sand inline-block py-1.5">Industries</a></li>
          <li><a href="houston-trade-website-scan-2026.html" class="link-underline hover:text-sand inline-block py-1.5">2026 website scan</a></li>
          <li><a href="contractor-website-checklist-2027.html" class="link-underline hover:text-sand inline-block py-1.5">2027 website checklist</a></li>
          <li><a href="book-a-call.html" class="link-underline hover:text-sand inline-block py-1.5">Book a call</a></li>
        </ul>
      </div>
      <div class="md:col-span-2">
        <p class="text-sm font-semibold text-sand mb-4">Trades</p>
        <ul class="space-y-0.5 text-[15px] text-fog">
          <li><a href="foundation-repair-websites.html" class="link-underline hover:text-sand inline-block py-1.5">Foundation repair</a></li>
          <li><a href="restoration-websites.html" class="link-underline hover:text-sand inline-block py-1.5">Restoration</a></li>
          <li><a href="garage-door-websites.html" class="link-underline hover:text-sand inline-block py-1.5">Garage door</a></li>
        </ul>
      </div>
      <div class="md:col-span-2">
        <p class="text-sm font-semibold text-sand mb-4">Contact</p>
        <ul class="space-y-0.5 text-[15px] text-fog">
          <li><a href="mailto:${EMAIL}" class="link-underline hover:text-sand inline-block py-1.5">${EMAIL}</a></li>
          <li class="py-1.5">Houston, Texas</li>
          <li><a href="https://www.linkedin.com/in/abbas-hussain-1bb46b432/" target="_blank" rel="noopener" class="link-underline hover:text-sand inline-block py-1.5">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <p class="footer-word" aria-hidden="true"><span class="fire-letter">A</span><span class="fire-letter">2</span><span class="fire-letter">H</span><span class="fire-space"></span><span class="fire-letter">A</span><span class="fire-letter">g</span><span class="fire-letter">e</span><span class="fire-letter">n</span><span class="fire-letter">c</span><span class="fire-letter">y</span><span class="fire-spark"></span></p>
    <div class="border-t hairline py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-fog/70">
      <p>&copy; <span data-year>2026</span> A2H (a2h.info), Houston, Texas. Not affiliated with A2 Hosting or a2h.com.</p>
      <div class="flex items-center gap-5">
        <a href="privacy.html" class="link-underline hover:text-sand">Privacy</a>
        <a href="terms.html" class="link-underline hover:text-sand">Terms</a>
        <a href="sms-terms.html" class="link-underline hover:text-sand">SMS Terms</a>
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
  <div id="lead-popup-card" class="relative w-full max-w-md max-h-[90vh] overflow-y-auto panel-elevated shadow-floating p-7 sm:p-8">
    <button type="button" id="lead-popup-close" aria-label="Close" class="absolute top-4 right-4 text-fog hover:text-sand transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <form id="lead-popup-form" class="space-y-4">
      <input type="hidden" id="lp-plan" name="plan" value="">
      <p id="lp-plan-banner" class="hidden items-center gap-2 bg-copper/10 border border-copper/30 rounded-[10px] px-4 py-2.5 text-sm text-copper-light">
        Inquiring about the <span id="lp-plan-banner-name" class="font-semibold"></span> plan
      </p>
      <div id="lead-popup-step-1">
        <p class="eyebrow mb-3">Step 1 of 2</p>
        <h2 id="lead-popup-heading" class="display-md text-sand mb-2">What kind of website do you want?</h2>
        <p class="text-sm text-fog leading-[1.6] mb-6">Tell us what you have in mind. We'll put together a free homepage mockup for you, no charge, no obligation.</p>
        <div class="space-y-4">
          <div>
            <label class="field-label" for="lp-niche">What's your niche?</label>
            <select required id="lp-niche" name="niche" class="field">
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
            <label class="field-label" for="lp-niche-other">What's your industry?</label>
            <input id="lp-niche-other" name="niche_other" type="text" class="field" placeholder="e.g. pet grooming, event rentals">
          </div>
          <div>
            <label class="field-label" for="lp-pages">How many pages?</label>
            <select id="lp-pages" name="page_count" class="field">
              <option value="unsure" selected>Not sure yet</option>
              <option value="1">Just 1 (single-page site)</option>
              <option value="3-5">3 to 5 pages</option>
              <option value="6-10">6 to 10 pages</option>
              <option value="10+">10+ pages</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="lp-colors">Color scheme</label>
            <input id="lp-colors" name="color_scheme" type="text" class="field mb-2" placeholder="e.g. dark & moody, match my logo">
            <div class="flex flex-wrap gap-1.5" role="group" aria-label="Quick color scheme picks">
              <button type="button" data-scheme="Warm & earthy (tan, rust, cream)" class="lp-scheme-chip chip">Warm &amp; Earthy</button>
              <button type="button" data-scheme="Bold & modern (black, white, one bright accent)" class="lp-scheme-chip chip">Bold &amp; Modern</button>
              <button type="button" data-scheme="Clean & minimal (white, soft gray, single accent)" class="lp-scheme-chip chip">Clean &amp; Minimal</button>
              <button type="button" data-scheme="Dark & moody (charcoal, deep tones, metallic accent)" class="lp-scheme-chip chip">Dark &amp; Moody</button>
              <button type="button" data-scheme="Bright & playful (saturated colors, high energy)" class="lp-scheme-chip chip">Bright &amp; Playful</button>
            </div>
          </div>
          <div>
            <label class="field-label" for="lp-reference">A site you like the look of <span class="normal-case text-fog/60">(optional)</span></label>
            <textarea id="lp-reference" name="reference_sites" rows="2" class="field resize-y" placeholder="A link, or just describe the vibe"></textarea>
          </div>
          <div>
            <label class="field-label" for="lp-notes">Anything else? <span class="normal-case text-fog/60">(optional)</span></label>
            <textarea id="lp-notes" name="notes" rows="2" class="field resize-y" placeholder="Online store, booking system, gallery..."></textarea>
          </div>
          <p id="lead-popup-step1-status" class="text-xs text-center text-copper-light" role="status" aria-live="polite"></p>
          <button type="button" id="lead-popup-next" class="btn btn-solid w-full">
            Next: your info
          </button>
        </div>
      </div>
      <div id="lead-popup-step-2" class="hidden">
        <p class="eyebrow mb-3">Step 2 of 2</p>
        <h2 class="display-md text-sand mb-2">How do we reach you?</h2>
        <p class="text-sm text-fog leading-[1.6] mb-6">We'll build your mockup within 2 to 3 days and send it straight to your inbox.</p>
        <div class="space-y-4">
          <div>
            <label class="field-label" for="lp-name">Name</label>
            <input required id="lp-name" name="name" type="text" autocomplete="name" class="field" placeholder="Jane Rivera">
          </div>
          <div>
            <label class="field-label" for="lp-business">Business Name</label>
            <input required id="lp-business" name="business" type="text" autocomplete="organization" class="field" placeholder="Rivera Concrete Co.">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="field-label" for="lp-email">Email</label>
              <input required id="lp-email" name="email" type="email" autocomplete="email" class="field" placeholder="jane@rivera.com">
            </div>
            <div>
              <label class="field-label" for="lp-phone">Phone</label>
              <input id="lp-phone" name="phone" type="tel" autocomplete="tel" class="field" placeholder="(555) 555-0123">
            </div>
          </div>
          <label class="flex items-start gap-2.5 -mt-1 cursor-pointer text-[11px] text-fog/80 leading-[1.5]">
            <input type="checkbox" name="sms_consent" value="yes" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer" style="accent-color:#c9702f">
            <span>Yes, A2H can text me about my request. Msg frequency varies (up to 5 per request). Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Optional, not needed to submit. <a href="sms-terms.html" target="_blank" class="link-underline text-copper-light">SMS Terms</a> &amp; <a href="privacy.html" target="_blank" class="link-underline text-copper-light">Privacy</a>.</span>
          </label>
          <div>
            <label class="field-label" for="lp-captcha-answer">Quick check: <span id="lp-captcha-question">loading…</span></label>
            <input required id="lp-captcha-answer" name="captcha_answer" type="text" inputmode="numeric" autocomplete="off" class="field" placeholder="Your answer">
            <input type="hidden" name="captcha_token" id="lp-captcha-token">
          </div>
          <div style="position:absolute;left:-9999px;top:-9999px" aria-hidden="true">
            <label for="lp-company-site">Leave this field blank</label>
            <input id="lp-company-site" name="company_site" type="text" tabindex="-1" autocomplete="off">
          </div>
          <div class="flex gap-3">
            <button type="button" id="lead-popup-back" class="btn btn-ghost">
              Back
            </button>
            <button type="submit" class="btn btn-solid flex-1">
              Get my free mockup
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
        if (captchaQuestionEl) captchaQuestionEl.textContent = d.question ? 'What is ' + d.question + '?' : 'skip this, verification unavailable';
        if (captchaTokenEl) captchaTokenEl.value = d.token || '';
      }).catch(function () {
        if (captchaQuestionEl) captchaQuestionEl.textContent = 'skip this, verification unavailable';
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

    // Only self-triggers if the page actually has a manual trigger button —
    // pages that no longer promote the website mockup (the AI Receptionist +
    // CRM pages) carry no .mockup-trigger element, so this stays dormant
    // instead of popping an unprompted "what kind of website do you want?"
    // form with no matching CTA on the page.
    if (document.querySelectorAll('.mockup-trigger').length && !alreadyHandled()) setTimeout(open, 10000);

    var ERROR_COPY = {
      captcha_failed: "That answer didn't match. Check it and try again.",
      invalid_email: 'That email address looks invalid. Please check it.',
      disposable_email: 'Please use a permanent email address, not a temporary/disposable one.',
      email_domain_unreachable: "That email's domain doesn't appear to accept mail. Please check it.",
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
            status.textContent = ERROR_COPY[result.error] || 'Something went wrong. Email us directly at hello@a2h.info.';
            if (result.error === 'captcha_failed') loadCaptcha();
            return;
          }
          try { localStorage.setItem(SUBMITTED_KEY, '1'); } catch (e) {}
          window.location.href = '/mockup.html';
        });
      }).catch(function () {
        btn.disabled = false;
        status.textContent = 'Something went wrong. Email us directly at hello@a2h.info.';
      });
    });
  })();
  </script>`;
}

// -------------------------------------------------- calls-cost lead popup ---

// Two-step "How much are missed calls costing you?" popup — the lead-capture
// mechanism for the AI Receptionist + CRM pitch (as opposed to leadPopup()
// above, which is the free-website-mockup flow used on the pages that still
// sell a custom site). Step 1 is a tiny calculator: pick a missed-calls
// range and an average call/job value, see an instant dollar estimate, then
// move to step 2 for contact info. Opens on-demand from any .calls-trigger
// element and fires passively 10s after load if one exists on the page.
function callsPopup() {
  return `<div id="calls-popup-overlay" class="hidden fixed inset-0 z-[100] items-center justify-center bg-ink/80 backdrop-blur-sm px-4 py-8" role="dialog" aria-modal="true" aria-labelledby="calls-popup-heading">
  <div id="calls-popup-card" class="relative w-full max-w-md max-h-[90vh] overflow-y-auto panel-elevated shadow-floating p-7 sm:p-8">
    <button type="button" id="calls-popup-close" aria-label="Close" class="absolute top-4 right-4 text-fog hover:text-sand transition-colors">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <form id="calls-popup-form" class="space-y-4">
      <div id="calls-popup-step-1">
        <p class="eyebrow mb-3">Step 1 of 2</p>
        <h2 id="calls-popup-heading" class="display-md text-sand mb-2">How much are missed calls costing you?</h2>
        <p class="text-sm text-fog leading-[1.6] mb-6">Answer two quick questions and we'll show you the number. No charge, no obligation.</p>
        <div class="space-y-4">
          <div>
            <label class="field-label" for="cp-calls-missed">Roughly how many calls do you miss per month?</label>
            <select required id="cp-calls-missed" name="calls_missed" class="field">
              <option value="" selected disabled>Choose one</option>
              <option value="under-10">Fewer than 10</option>
              <option value="10-25">10 to 25</option>
              <option value="25-50">25 to 50</option>
              <option value="50-plus">50 or more</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="cp-call-value">What's an average job worth to you?</label>
            <select required id="cp-call-value" name="call_value" class="field">
              <option value="" selected disabled>Choose one</option>
              <option value="under-200">Under $200</option>
              <option value="200-500">$200 to $500</option>
              <option value="500-1500">$500 to $1,500</option>
              <option value="1500-plus">$1,500+</option>
            </select>
          </div>
          <p id="calls-popup-step1-status" class="text-xs text-center text-copper-light" role="status" aria-live="polite"></p>
          <div id="calls-popup-result" class="hidden rounded-2xl bg-copper/10 border border-copper/30 px-5 py-4 text-center">
            <p class="eyebrow mb-1">You could be losing</p>
            <p id="calls-popup-result-monthly" class="figure text-3xl text-sand"></p>
            <p id="calls-popup-result-annual" class="text-xs text-fog mt-1"></p>
          </div>
          <button type="button" id="calls-popup-calc" class="btn btn-solid w-full">
            See my number
          </button>
          <button type="button" id="calls-popup-next" class="hidden btn btn-solid w-full">
            Show me how to fix this
          </button>
        </div>
      </div>
      <div id="calls-popup-step-2" class="hidden">
        <p class="eyebrow mb-3">Step 2 of 2</p>
        <h2 class="display-md text-sand mb-2">How do we reach you?</h2>
        <p class="text-sm text-fog leading-[1.6] mb-6">We'll send your free call recovery plan and get you on a quick setup call.</p>
        <div class="space-y-4">
          <div>
            <label class="field-label" for="cp-name">Name</label>
            <input required id="cp-name" name="name" type="text" autocomplete="name" class="field" placeholder="Jane Rivera">
          </div>
          <div>
            <label class="field-label" for="cp-business">Business Name</label>
            <input required id="cp-business" name="business" type="text" autocomplete="organization" class="field" placeholder="Rivera Concrete Co.">
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="field-label" for="cp-email">Email</label>
              <input required id="cp-email" name="email" type="email" autocomplete="email" class="field" placeholder="jane@rivera.com">
            </div>
            <div>
              <label class="field-label" for="cp-phone">Phone</label>
              <input id="cp-phone" name="phone" type="tel" autocomplete="tel" class="field" placeholder="(555) 555-0123">
            </div>
          </div>
          <label class="flex items-start gap-2.5 -mt-1 cursor-pointer text-[11px] text-fog/80 leading-[1.5]">
            <input type="checkbox" name="sms_consent" value="yes" class="mt-0.5 h-4 w-4 shrink-0 cursor-pointer" style="accent-color:#c9702f">
            <span>Yes, A2H can text me about my request. Msg frequency varies (up to 5 per request). Msg &amp; data rates may apply. Reply STOP to opt out, HELP for help. Optional, not needed to submit. <a href="sms-terms.html" target="_blank" class="link-underline text-copper-light">SMS Terms</a> &amp; <a href="privacy.html" target="_blank" class="link-underline text-copper-light">Privacy</a>.</span>
          </label>
          <div>
            <label class="field-label" for="cp-captcha-answer">Quick check: <span id="cp-captcha-question">loading…</span></label>
            <input required id="cp-captcha-answer" name="captcha_answer" type="text" inputmode="numeric" autocomplete="off" class="field" placeholder="Your answer">
            <input type="hidden" name="captcha_token" id="cp-captcha-token">
          </div>
          <div style="position:absolute;left:-9999px;top:-9999px" aria-hidden="true">
            <label for="cp-company-site">Leave this field blank</label>
            <input id="cp-company-site" name="company_site" type="text" tabindex="-1" autocomplete="off">
          </div>
          <div class="flex gap-3">
            <button type="button" id="calls-popup-back" class="btn btn-ghost">
              Back
            </button>
            <button type="submit" class="btn btn-solid flex-1">
              Get my free call recovery plan
            </button>
          </div>
          <p id="calls-popup-status" class="text-xs text-center text-fog" role="status" aria-live="polite"></p>
        </div>
      </div>
    </form>
  </div>
</div>`;
}

function callsPopupScript() {
  return `<script>
  (function () {
    var overlay = document.getElementById('calls-popup-overlay');
    if (!overlay) return;
    var form = document.getElementById('calls-popup-form');
    var step1 = document.getElementById('calls-popup-step-1');
    var step2 = document.getElementById('calls-popup-step-2');
    var step1Status = document.getElementById('calls-popup-step1-status');
    var status = document.getElementById('calls-popup-status');
    var closeBtn = document.getElementById('calls-popup-close');
    var calcBtn = document.getElementById('calls-popup-calc');
    var nextBtn = document.getElementById('calls-popup-next');
    var backBtn = document.getElementById('calls-popup-back');
    var callsField = document.getElementById('cp-calls-missed');
    var valueField = document.getElementById('cp-call-value');
    var resultBox = document.getElementById('calls-popup-result');
    var resultMonthly = document.getElementById('calls-popup-result-monthly');
    var resultAnnual = document.getElementById('calls-popup-result-annual');
    var DISMISSED_KEY = 'a2h_calls_popup_dismissed';
    var SUBMITTED_KEY = 'a2h_calls_popup_submitted';

    var CALLS_MID = { 'under-10': 7, '10-25': 17, '25-50': 37, '50-plus': 60 };
    var VALUE_MID = { 'under-200': 125, '200-500': 350, '500-1500': 1000, '1500-plus': 2000 };
    var lastMonthly = 0, lastAnnual = 0;

    // Self-hosted captcha (see api/captcha-challenge.js) — no third-party
    // script/signup. Fetched immediately so it's ready by the time the
    // popup opens 10s+ later.
    var captchaLoadedAt = 0;
    var captchaQuestionEl = document.getElementById('cp-captcha-question');
    var captchaTokenEl = document.getElementById('cp-captcha-token');
    function loadCaptcha() {
      captchaLoadedAt = Date.now();
      fetch('/api/captcha-challenge').then(function (r) { return r.json(); }).then(function (d) {
        if (captchaQuestionEl) captchaQuestionEl.textContent = d.question ? 'What is ' + d.question + '?' : 'skip this, verification unavailable';
        if (captchaTokenEl) captchaTokenEl.value = d.token || '';
      }).catch(function () {
        if (captchaQuestionEl) captchaQuestionEl.textContent = 'skip this, verification unavailable';
      });
    }
    loadCaptcha();

    function showStep(n) {
      step1.classList.toggle('hidden', n !== 1);
      step2.classList.toggle('hidden', n !== 2);
      var first = (n === 1 ? step1 : step2).querySelector('input, select, textarea');
      if (first) first.focus();
    }

    calcBtn.addEventListener('click', function () {
      if (!callsField.value || !valueField.value) {
        step1Status.textContent = 'Please answer both questions to see your number.';
        (callsField.value ? valueField : callsField).focus();
        return;
      }
      step1Status.textContent = '';
      lastMonthly = CALLS_MID[callsField.value] * VALUE_MID[valueField.value];
      lastAnnual = lastMonthly * 12;
      resultMonthly.textContent = '$' + lastMonthly.toLocaleString() + '/mo';
      resultAnnual.textContent = 'About $' + lastAnnual.toLocaleString() + ' a year.';
      resultBox.classList.remove('hidden');
      calcBtn.classList.add('hidden');
      nextBtn.classList.remove('hidden');
      nextBtn.focus();
    });

    nextBtn.addEventListener('click', function () { showStep(2); });
    backBtn.addEventListener('click', function () { showStep(1); });

    function alreadyHandled() {
      try {
        return sessionStorage.getItem(DISMISSED_KEY) === '1' || localStorage.getItem(SUBMITTED_KEY) === '1';
      } catch (e) { return false; }
    }

    function openPopup() {
      showStep(1);
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
      document.body.classList.add('overflow-hidden');
      requestAnimationFrame(function () { overlay.classList.add('is-open'); });
      var first = form.querySelector('select');
      if (first) first.focus();
      document.dispatchEvent(new Event('a2h:popup-toggle'));
    }

    // Passive auto-trigger (10s) — respects dismissal and past submission.
    // A deliberate click (.calls-trigger) always opens it regardless.
    function open() {
      if (alreadyHandled()) return;
      openPopup();
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

    document.querySelectorAll('.calls-trigger').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openPopup();
      });
    });

    // Only self-triggers if the page actually has a manual trigger button —
    // pages with no .calls-trigger element stay dormant instead of popping
    // an unprompted calculator with no matching CTA on the page.
    if (document.querySelectorAll('.calls-trigger').length && !alreadyHandled()) setTimeout(open, 10000);

    var ERROR_COPY = {
      captcha_failed: "That answer didn't match. Check it and try again.",
      invalid_email: 'That email address looks invalid. Please check it.',
      disposable_email: 'Please use a permanent email address, not a temporary/disposable one.',
      email_domain_unreachable: "That email's domain doesn't appear to accept mail. Please check it.",
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.textContent = 'Sending…';
      var data = Object.fromEntries(new FormData(form).entries());
      data.landing_page = window.location.pathname;
      data.elapsed_ms = Date.now() - captchaLoadedAt;
      data.estimated_monthly = lastMonthly;
      data.estimated_annual = lastAnnual;
      ['gclid', 'fbclid', 'utm_source', 'utm_campaign'].forEach(function (k) {
        try { var v = sessionStorage.getItem('a2h_' + k); if (v) data[k] = v; } catch (e) {}
      });
      fetch('/api/calls-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (result) {
          if (!res.ok) {
            btn.disabled = false;
            status.textContent = ERROR_COPY[result.error] || 'Something went wrong. Email us directly at hello@a2h.info.';
            if (result.error === 'captcha_failed') loadCaptcha();
            return;
          }
          try { localStorage.setItem(SUBMITTED_KEY, '1'); } catch (e) {}
          window.location.href = '/book-a-call.html';
        });
      }).catch(function () {
        btn.disabled = false;
        status.textContent = 'Something went wrong. Email us directly at hello@a2h.info.';
      });
    });
  })();
  </script>`;
}

// --------------------------------------------------------- shared scripts ---

function scripts() {
  return `<script>
  // Header hairline once the page has scrolled past a sentinel at the top.
  (function () {
    var header = document.getElementById('site-header');
    if (!header) return;
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:48px;pointer-events:none;';
    document.body.prepend(sentinel);
    if (!('IntersectionObserver' in window)) { header.classList.add('is-scrolled'); return; }
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  })();

  // Mobile menu
  (function () {
    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    var setOpen = function (open) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') setOpen(false); });
  })();

  // Scroll reveal (.reveal fades a block, .stagger cascades its children).
  (function () {
    var els = document.querySelectorAll('.reveal, .stagger');
    if (!els.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    els.forEach(function (el) { io.observe(el); });
    // Safety sweep on load: anything already in or above the viewport shows at once.
    var sweep = function () {
      var vh = window.innerHeight;
      els.forEach(function (el) {
        if (el.classList.contains('in')) return;
        if (el.getBoundingClientRect().top < vh * 0.95) { el.classList.add('in'); io.unobserve(el); }
      });
    };
    window.addEventListener('load', sweep);
    sweep();
  })();

  // Lazy videos: fetch only when near the viewport, then loop muted.
  // data-desktop-only videos stay as their poster on small screens.
  (function () {
    var vids = document.querySelectorAll('video.lazy-video');
    if (!vids.length) return;
    var small = window.matchMedia('(max-width: 767px)').matches;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var v = entry.target;
        io.unobserve(v);
        if (!v.dataset.src) return;
        if ((small && v.hasAttribute('data-desktop-only')) || (reduced && !v.controls)) return;
        v.src = v.dataset.src;
        v.load();
        if (v.hasAttribute('autoplay') || !v.controls) v.play().catch(function () {});
      });
    }, { threshold: 0.1, rootMargin: '240px 0px' });
    vids.forEach(function (v) { io.observe(v); });
  })();

  // Count-up figures.
  (function () {
    var els = document.querySelectorAll('[data-countup]');
    if (!els.length) return;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        var target = parseFloat(el.dataset.countup);
        var decimals = parseInt(el.dataset.decimals || '0', 10);
        if (reduced) { el.textContent = target.toFixed(decimals); return; }
        var start = performance.now();
        var tick = function (now) {
          var p = Math.min((now - start) / 1100, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (target * eased).toFixed(decimals);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    // The real figure ships in the HTML so crawlers and no-JS readers see it; reset to 0 only once JS is animating.
    els.forEach(function (el) {
      if (!reduced) el.textContent = (0).toFixed(parseInt(el.dataset.decimals || '0', 10));
      io.observe(el);
    });
  })();

  // Chat demo threads: stagger bubbles in, with a typing beat before each reply.
  document.querySelectorAll('.bubble-thread').forEach(function (thread) {
    var items = Array.prototype.slice.call(thread.children);
    if (!items.length) return;
    var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var container = thread.closest('.reveal') || thread;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        if (noMotion) {
          items.forEach(function (item) {
            if (item.classList.contains('typing-indicator')) item.style.display = 'none';
            else item.classList.add('in');
          });
          return;
        }
        var delay = 150;
        items.forEach(function (item) {
          if (item.classList.contains('typing-indicator')) {
            setTimeout(function () { item.classList.add('in'); }, delay);
            delay += 1600;
            setTimeout(function () { item.classList.remove('in'); item.style.display = 'none'; }, delay);
            delay += 50;
          } else {
            setTimeout(function () { item.classList.add('in'); }, delay);
            delay += 320;
          }
        });
      });
    }, { threshold: 0.2 });
    io.observe(container);
  });

  // Footer year
  (function () {
    var y = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = y; });
  })();

  // Ad attribution capture
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

// Two-tone headline: the second sentence is muted (sections) or copper
// italic (heroes), as on the homepage.
function tone(h, cls = 'tone-muted') {
  const m = /^(.+?[.?!:])\s+(\S.*)$/.exec(h);
  return m ? `${m[1]} <span class="${cls}">${m[2]}</span>` : h;
}

// ----------------------------------------------------------- AI agent ---

function agentWidget() {
  return `<!-- AI CHAT WIDGET -->
<div class="fixed bottom-5 left-5 z-50">
  <button id="chat-fab-btn" type="button" aria-label="Chat with the A2H AI agent" aria-expanded="false" class="agent-fab">
    <span class="online" aria-hidden="true"></span>
    <span id="chat-fab-icon-open" class="emoji" aria-hidden="true">👾</span>
    <span id="chat-fab-icon-close" class="hidden" aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#141110" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg></span>
  </button>
</div>

<div id="chat-panel" class="fixed bottom-24 left-5 z-50 flex flex-col overflow-hidden panel-elevated shadow-floating" style="width: 360px; max-width: calc(100vw - 32px); height: min(520px, 70vh);">
  <div class="flex items-center gap-2.5 px-4 py-3 border-b hairline shrink-0">
    <span class="agent-av" aria-hidden="true">👾</span>
    <div class="min-w-0 flex-1">
      <p class="text-xs font-semibold text-sand truncate">A2H AI agent</p>
      <p class="text-[10px] text-live flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-live inline-block"></span>Active now</p>
    </div>
    <button id="chat-close-btn" type="button" aria-label="Close chat" class="text-fog hover:text-sand transition-colors h-10 w-10 -mr-2 inline-flex items-center justify-center rounded-full">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div id="chat-thread-live" class="flex-1 overflow-y-auto px-3 py-3 space-y-2.5"></div>
  <form id="chat-form" class="flex items-center gap-2 px-3 py-3 border-t hairline shrink-0">
    <input id="chat-input" type="text" autocomplete="off" maxlength="600" placeholder="Ask about pricing or turnaround" class="field !rounded-full flex-1 !py-2.5">
    <button type="submit" aria-label="Send message" class="h-10 w-10 rounded-full bg-copper hover:bg-copper-light text-ink flex items-center justify-center shrink-0 transition-colors">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 12L20 4L14 20L11 13L4 12Z" fill="currentColor"/></svg>
    </button>
  </form>
</div>`;
}

// ----------------------------------------------------------------- shell ---

function page({ title, description, slug, jsonLd, body, extraScripts = '', noPopup = false, ogImage, funnel = false, noindex = false }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${head({ title, description, slug, jsonLd, ogImage, noindex: funnel || noindex })}
</head>
<body class="text-sand antialiased">

${funnel ? '' : nav(slug)}

<main id="main">
${body}
</main>

${funnel ? '' : footer()}
${noPopup ? '' : `\n${leadPopup()}`}

${funnel ? '' : agentWidget()}

${scripts()}
${noPopup ? '' : leadPopupScript()}
<script src="assets/motion.js" defer></script>
${funnel ? '' : '<script src="assets/agent.js" defer></script>'}
${extraScripts}
</body>
</html>
`;
}

module.exports = { tone, page, head, nav, footer, scripts, agentWidget, leadPopup, leadPopupScript, callsPopup, callsPopupScript, SITE, EMAIL, GA4 };
