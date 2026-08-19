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
        <a href="index.html#contact" class="btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink text-sm font-semibold px-4 py-2.5 rounded-full block">
          Get My Free Audit
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
    <a href="index.html#contact" class="mobile-nav-link block px-6 py-3 text-sm text-copper-light font-semibold">Get My Free Audit</a>
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
          <li><a href="index.html#contact" class="link-underline text-copper-light hover:text-sand transition-colors">Get a free audit</a></li>
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

    // Safety net: anything still hidden after load — because it was never
    // scrolled past, or the observer never fired — is shown rather than left
    // as invisible text. Content must never be unreachable.
    window.addEventListener('load', function () {
      setTimeout(function () {
        els.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && !el.classList.contains('in')) el.classList.add('in');
        });
      }, 300);
    });
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

function page({ title, description, slug, jsonLd, body, extraScripts = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
${head({ title, description, slug, jsonLd })}
</head>
<body class="text-sand antialiased">

${nav(slug)}

${body}

${footer()}

${scripts()}
${extraScripts}
</body>
</html>
`;
}

module.exports = { page, head, nav, footer, scripts, SITE, EMAIL, GA4 };
