// Paid-traffic landing pages: /groomers and /dental.
// One template, two niches. No site navigation: the only exits are "watch the
// video" and "book a call". Kept out of the sitemap and marked noindex, since
// these are pages we send traffic to, not pages we rank.
//
// Pricing is deliberately absent from the copy: dental pricing is not locked,
// and the video/call is where price is discussed.

const PHONE_DISPLAY = '(832) 743-3676';
const PHONE_TEL = '+18327433676';
const CALENDLY = 'https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=231c18&text_color=e9dfd2&primary_color=c9702f';

const NICHES = {
  groomers: {
    slug: 'groomers.html',
    title: 'AI Receptionist for Mobile Pet Groomers | A2H',
    description: 'Every call answered and booked while your hands are in a groom. Watch the 2-minute video, then book a 15-minute call.',
    eyebrow: 'For Texas mobile pet groomers',
    h1: 'Every call answered while your <span class="italic text-copper-light">hands are in a groom.</span>',
    sub: 'When you are mid-groom or driving between stops, the phone goes to voicemail and that pet owner books the next groomer on Google. A2H answers, books the appointment on your calendar, and saves every pet owner in your CRM.',
    test: {
      h: 'Call your own number and count the rings.',
      p: 'Every ring is a pet owner deciding whether to hang up and call the next groomer. Now think about the calls you missed this week.',
      callsLabel: 'Calls you missed this week',
      callsPh: 'e.g. 6',
      valueLabel: 'What a typical groom is worth ($)',
      valuePh: 'e.g. 95',
    },
    cards: [
      ['Never voicemail', 'Answered between appointments', 'Every call is picked up, whether you are driving between jobs or holding a wet dog. The caller gets a real conversation, not a beep.'],
      ['Booked, not just noted', 'Straight onto your calendar', 'It asks the pet\'s name, breed and size, quotes from your own price list, and books the slot. It warm-transfers to you when a call needs a real person.'],
      ['Nothing lost', 'Every owner saved in one place', 'Names, pet details and notes (like "hates the dryer" or "matting behind the ears") land in your CRM the moment the call ends. Nothing lives on a sticky note in the van.'],
    ],
    proof: 'Hear a real call: the receptionist answers a mobile groomer\'s line, quotes a price and books the visit.',
    faq: [
      ['Will pet owners know it is AI?', 'If they ask, it tells them. You choose the greeting, and it can offer to have you call back instead of finishing the booking.'],
      ['What if a call needs me?', 'It can transfer to your phone on the spot, or take a message and flag the contact in your CRM.'],
      ['Does it use my prices and my calendar?', 'Yes. It quotes from your own price list and books into your Google Calendar. It never invents prices.'],
      ['What does it cost, and can I cancel?', 'The video covers pricing. There is a real contract, and it includes a cancel-anytime clause. No long-term lock-in.'],
    ],
  },
  dental: {
    slug: 'dental.html',
    title: 'AI Receptionist for Dental Clinics | A2H',
    description: 'Every call answered and booked, even when the front desk is slammed or the office is closed. Watch the 2-minute video, then book a 15-minute call.',
    eyebrow: 'For Texas dental clinics',
    h1: 'Every call answered, even when the <span class="italic text-copper-light">front desk is slammed.</span>',
    sub: 'New-patient calls that hit voicemail at lunch, after hours or during a rush book the practice that picked up. A2H answers, books the appointment, and logs every caller in one CRM. It handles scheduling only, never clinical data.',
    test: {
      h: 'Call your own front desk after closing and see what happens.',
      p: 'A new patient who reaches voicemail rarely leaves a message. They call the next practice on the list.',
      callsLabel: 'New-patient calls missed this month',
      callsPh: 'e.g. 12',
      valueLabel: 'What a new patient is worth ($)',
      valuePh: 'e.g. 800',
    },
    cards: [
      ['Never voicemail', 'Answered at lunch and after hours', 'Every call is picked up the same way, whether the team is with patients, on a break, or gone for the night.'],
      ['Booked, not just noted', 'Straight onto your schedule', 'It captures the caller\'s name, reason for the call and callback number, and books the slot. It transfers to a person when a call needs one.'],
      ['Nothing lost', 'Every caller saved in one place', 'Each call becomes a contact in your CRM with the reason for the visit, so nothing depends on a note passed between staff.'],
    ],
    proof: 'Hear a real call: the receptionist answers, asks what is needed and books the visit (recorded on a groomer\'s line, same system).',
    faq: [
      ['Is this HIPAA-safe?', 'It handles scheduling, not clinical data. Calls collect a name, the reason for the call and callback details. It should not be used to collect health or payment-card information. Anything that touches PHI belongs in your existing compliant software.'],
      ['Will patients know it is AI?', 'If they ask, it tells them. You choose the greeting.'],
      ['What if a caller needs a person?', 'It can transfer to your front desk, or take a message and flag the contact in your CRM.'],
      ['What does it cost, and can I cancel?', 'We cover that on the 15-minute call. There is a real contract with a cancel-anytime clause, and no long-term lock-in.'],
    ],
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function build(key, { ORG, EMAIL }) {
  const n = NICHES[key];
  const body = `
<header class="fixed top-0 inset-x-0 z-50 bg-ink/80 backdrop-blur-md border-b border-white/5">
  <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
    <span class="font-display text-xl tracking-tight text-sand">A2H<span class="text-copper">.</span></span>
    <a href="#book" class="btn-primary text-sm font-semibold text-sand border border-white/15 hover:border-copper-light/60 px-5 py-2 rounded-full">Book a call</a>
  </div>
</header>

<section class="relative glow-copper pt-36 pb-16 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-4xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">${n.eyebrow}</p>
    <h1 class="reveal font-display text-[2.5rem] leading-[1.1] sm:text-6xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-6">${n.h1}</h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto mb-10">${n.sub}</p>
    <div class="reveal flex flex-col sm:flex-row items-center justify-center gap-4">
      <span class="cta-ring rounded-full p-[2px] inline-block">
        <a href="#video" class="btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-7 py-3.5 rounded-full text-[15px] block">Watch the 2-minute video</a>
      </span>
      <a href="#book" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-7 py-3.5 rounded-full text-[15px]">Book a 15-minute call</a>
    </div>
    <p class="reveal text-sm text-fog mt-8">Cancel anytime · Real contract · Built for Texas businesses</p>
  </div>
</section>

<section id="video" class="px-6 pb-16 scroll-mt-20">
  <div class="max-w-4xl mx-auto reveal">
    <div class="rounded-2xl bg-elevated border border-white/5 shadow-elevated overflow-hidden">
      <video class="block w-full h-auto" controls playsinline preload="metadata" poster="assets/video/a2h-presale-poster.jpg" width="1920" height="1080">
        <source src="assets/video/a2h-presale.mp4" type="video/mp4">
        Your browser can't play this video. <a href="assets/video/a2h-presale.mp4">Download it here</a>.
      </video>
    </div>
    <p class="text-center text-sm text-fog mt-4">How it works, in two minutes.</p>
  </div>
</section>

<section class="py-16 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-4">The 30-second test</p>
    <h2 class="reveal font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand mb-4">${n.test.h}</h2>
    <p class="reveal text-fog leading-[1.7] mb-10">${n.test.p}</p>
    <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated p-7 text-left">
      <div class="grid sm:grid-cols-2 gap-5">
        <label class="block"><span class="text-sm text-fog">${n.test.callsLabel}</span>
          <input id="calc-calls" type="number" inputmode="numeric" min="0" placeholder="${n.test.callsPh}" class="mt-2 w-full rounded-xl bg-ink border border-white/10 px-4 py-3 text-sand text-lg focus:outline-none focus-visible:border-copper-light"></label>
        <label class="block"><span class="text-sm text-fog">${n.test.valueLabel}</span>
          <input id="calc-value" type="number" inputmode="numeric" min="0" placeholder="${n.test.valuePh}" class="mt-2 w-full rounded-xl bg-ink border border-white/10 px-4 py-3 text-sand text-lg focus:outline-none focus-visible:border-copper-light"></label>
      </div>
      <div class="mt-6 pt-6 border-t border-white/5 flex items-baseline justify-between gap-4 flex-wrap">
        <span class="text-fog text-sm">Walking away each month (your numbers, not a promise)</span>
        <span id="calc-out" class="font-display text-4xl text-copper-light">$0</span>
      </div>
    </div>
  </div>
</section>

<section class="py-20 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="reveal mb-12 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">What you get</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">One system. Every call handled.</h2>
    </div>
    <div class="grid md:grid-cols-3 gap-5">
${n.cards.map(([tag, h, p], i) => `      <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated card-hover p-7" style="transition-delay:${i * 70}ms">
        <p class="text-copper-light text-sm font-semibold mb-2">${String(i + 1).padStart(2, '0')} · ${tag}</p>
        <h3 class="font-display text-xl text-sand mb-2">${h}</h3>
        <p class="text-fog text-sm leading-[1.7]">${p}</p>
      </div>`).join('\n')}
    </div>
    <p class="reveal text-center mt-10"><a href="demo.html" class="link-underline text-copper-light">${n.proof}</a></p>
  </div>
</section>

<section class="py-16 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-4xl mx-auto">
    <h2 class="reveal font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand text-center mb-10">What happens next</h2>
    <ol class="grid sm:grid-cols-3 gap-5">
      <li class="reveal rounded-2xl bg-elevated border border-white/5 p-6"><p class="font-display text-3xl text-copper-light mb-2">1</p><p class="text-sand font-semibold mb-1">Watch the video</p><p class="text-fog text-sm leading-[1.7]">Two minutes on how it works and how it is priced.</p></li>
      <li class="reveal rounded-2xl bg-elevated border border-white/5 p-6" style="transition-delay:70ms"><p class="font-display text-3xl text-copper-light mb-2">2</p><p class="text-sand font-semibold mb-1">Book a 15-minute call</p><p class="text-fog text-sm leading-[1.7]">We look at your calls and whether it is a fit. No obligation.</p></li>
      <li class="reveal rounded-2xl bg-elevated border border-white/5 p-6" style="transition-delay:140ms"><p class="font-display text-3xl text-copper-light mb-2">3</p><p class="text-sand font-semibold mb-1">We set it up</p><p class="text-fog text-sm leading-[1.7]">We configure it around your business and put it live on your number.</p></li>
    </ol>
  </div>
</section>

<section class="py-20 px-6">
  <div class="max-w-3xl mx-auto">
    <h2 class="reveal font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand text-center mb-10">Questions</h2>
    <div class="space-y-3">
${n.faq.map(([q, a]) => `      <details class="reveal group rounded-2xl bg-elevated border border-white/5 px-6 py-5">
        <summary class="cursor-pointer list-none flex items-center justify-between gap-4 text-sand font-semibold focus-visible:outline-2 focus-visible:outline-copper-light">${esc(q)}<span class="text-copper-light transition-transform duration-200 group-open:rotate-45" aria-hidden="true">+</span></summary>
        <p class="text-fog leading-[1.7] mt-3">${esc(a)}</p>
      </details>`).join('\n')}
    </div>
  </div>
</section>

<section id="book" class="px-6 pb-24 scroll-mt-20">
  <div class="max-w-3xl mx-auto">
    <div class="reveal text-center mb-8">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-4">Book Below</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.03em] text-sand">Book your <span class="italic text-copper-light">15-minute</span> call.</h2>
      <p class="text-fog leading-[1.7] mt-4">Pick a time that works. We will look at your calls and see if it makes sense.</p>
    </div>
    <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated overflow-hidden">
      <div class="calendly-inline-widget" data-url="${CALENDLY}" style="min-width:280px;height:700px;"></div>
    </div>
    <p class="reveal text-center text-sm text-fog mt-6">Prefer to talk first? Call or text <a href="tel:${PHONE_TEL}" class="link-underline text-copper-light">${PHONE_DISPLAY}</a>, or email <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.</p>
  </div>
</section>

<footer class="border-t border-white/5 py-8 px-6">
  <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-fog">
    <span class="font-display text-lg text-sand">A2H<span class="text-copper">.</span></span>
    <span><a href="privacy.html" class="link-underline hover:text-sand">Privacy</a> · <a href="terms.html" class="link-underline hover:text-sand">Terms</a></span>
    <span>© ${new Date().getFullYear()} A2H Agency</span>
  </div>
</footer>`;

  const calc = `<script>
(function () {
  var c = document.getElementById('calc-calls'), v = document.getElementById('calc-value'), o = document.getElementById('calc-out');
  if (!c || !v || !o) return;
  var fired = false;
  function run() {
    var m = Math.round((+c.value || 0) * (+v.value || 0) * 4.3);
    o.textContent = '$' + m.toLocaleString('en-US');
    if (m > 0 && !fired && window.fbq) { fired = true; fbq('trackCustom', 'CalculatorUsed'); }
  }
  c.addEventListener('input', run); v.addEventListener('input', run);
})();
</script>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>`;

  return {
    slug: n.slug,
    noPopup: true,
    funnel: true,
    title: n.title,
    description: n.description,
    ogImage: '/assets/video/a2h-presale-poster.jpg',
    jsonLd: [ORG],
    body,
    extraScripts: calc,
  };
}

module.exports = (ctx) => Object.keys(NICHES).map((k) => build(k, ctx));
