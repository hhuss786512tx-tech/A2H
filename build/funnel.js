// Paid-traffic landing pages: /groomers, /dental, /homecare and /orthodontists.
// One template, four niches. No site navigation: the only exits are "hear the
// test call" and "book a call". Kept out of the sitemap and marked noindex, since
// these are pages we send traffic to, not pages we rank.
//
// The old shared video quoted the receptionist's old standalone price, so it was
// retired 2026-10-21. The pages now play the recorded test call from demo.html.
// Pricing is absent from the copy and discussed on the call.
// Copy rules: no "books the visit", no monthly prices, no invented numbers.

const PHONE_DISPLAY = '(832) 743-3676';
const PHONE_TEL = '+18327433676';
const CALENDLY = 'https://calendly.com/hhuss786512tx/new-meeting?hide_gdpr_banner=1&background_color=ffffff&text_color=0b0b0d&primary_color=c9702f';

const NICHES = {
  groomers: {
    slug: 'groomers.html',
    title: 'AI Phone Receptionist for Mobile Pet Groomers | A2H',
    description: 'Calls answered while your hands are in a groom, logged to one list. Hear a recorded test call, then book a 15-minute call.',
    eyebrow: 'Mobile pet groomers, Texas',
    h1: 'Every call answered while your hands are in a groom.',
    sub: 'When you are mid-groom or driving between stops, the phone goes to voicemail and that pet owner calls the next groomer on Google. The A2H phone receptionist answers, takes the owner\'s and pet\'s details, and logs the call in your CRM.',
    test: {
      h: 'Call your own number and count the rings.',
      p: 'Every ring is a pet owner deciding whether to hang up and call the next groomer. Now think about the calls you missed this week.',
      callsLabel: 'Calls you missed this week',
      callsPh: 'e.g. 6',
      valueLabel: 'What a typical groom is worth ($)',
      valuePh: 'e.g. 95',
      mult: 4.3, // calls are per week, results are per month
    },
    cards: [
      { tag: 'Never voicemail', h: 'Answered between appointments', p: 'Every call is picked up, whether you are driving between jobs or holding a wet dog. The caller gets a real conversation, not a beep.' },
      { tag: 'Details, not a beep', h: 'Pet, owner, what they need', p: 'It asks the pet\'s name, breed and size and what the owner is after, and tells them you will call back. It transfers to you when a call needs a real person.' },
      { tag: 'Nothing lost', h: 'Every owner saved in one place', p: 'Names, pet details and notes (like "hates the dryer" or "matting behind the ears") land in your CRM the moment the call ends. Nothing lives on a sticky note in the van.' },
    ],
    proof: 'Hear a recorded test call: the receptionist answers a mobile groomer\'s line and takes the booking details.',
    faq: [
      ['Will pet owners know it is AI?', 'If they ask, it tells them. You choose the greeting, and it can offer to have you call back instead of finishing the conversation.'],
      ['What if a call needs me?', 'It can transfer to your phone on the spot, or take a message and flag the contact for you.'],
      ['What does it cost?', 'The phone receptionist is an add-on to an A2H website build, and we cover its price on the 15-minute call. Website builds are $800 to $2,000 one time, with a free sample site first.'],
    ],
  },
  dental: {
    slug: 'dental.html',
    title: 'AI Phone Receptionist for Dental Clinics | A2H',
    description: 'Calls answered when the front desk is slammed or the office is closed, logged to one list. Hear a recorded test call, then book a 15-minute call.',
    eyebrow: 'Dental clinics, Texas',
    h1: 'Every call answered, even when the front desk is slammed.',
    sub: 'New-patient calls that hit voicemail at lunch, after hours or during a rush go to the practice that picked up. The A2H phone receptionist answers, takes the patient\'s details, and logs the call in your CRM. It handles inquiries only, never clinical data.',
    test: {
      h: 'Call your own front desk after closing and see what happens.',
      p: 'A new patient who reaches voicemail rarely leaves a message. They call the next practice on the list.',
      callsLabel: 'New-patient calls missed this month',
      callsPh: 'e.g. 12',
      valueLabel: 'What a new patient is worth ($)',
      valuePh: 'e.g. 800',
      mult: 1, // calls are already per month
    },
    cards: [
      { tag: 'Never voicemail', h: 'Answered at lunch and after hours', p: 'Every call is picked up the same way, whether the team is with patients, on a break, or gone for the night.' },
      { tag: 'Details, not a beep', h: 'Name, reason, callback number', p: 'It takes the caller\'s name, the reason for the call and a number, and tells them the front desk will call back. It transfers to a person when a call needs one.' },
      { tag: 'Nothing lost', h: 'Every caller saved in one place', p: 'Each call becomes a contact in your CRM with the reason for the visit, so nothing depends on a note passed between staff.' },
    ],
    proof: 'Hear a recorded test call: the receptionist answers, asks what is needed and takes the details (recorded on a groomer\'s line, same system).',
    faq: [
      ['Is this HIPAA-safe?', 'It handles inquiries, not clinical data. Calls collect a name, the reason for the call and callback details. It should not be used to collect health or payment-card information. Anything that touches PHI belongs in your existing compliant software.'],
      ['Will patients know it is AI?', 'If they ask, it tells them. You choose the greeting.'],
      ['What if a caller needs a person?', 'It can transfer to your front desk, or take a message and flag the contact in your CRM.'],
      ['What does it cost?', 'The phone receptionist is an add-on to an A2H website build, and we cover its price on the 15-minute call. Website builds are $800 to $2,000 one time, with a free sample site first.'],
    ],
  },
  homecare: {
    slug: 'homecare.html',
    title: 'AI Phone Receptionist for Home Care Agencies | A2H',
    description: 'Family inquiries answered after the office closes, logged to one list. Hear a recorded test call, then book a 15-minute call.',
    eyebrow: 'Home care agencies, Texas',
    h1: 'Every family call answered, even after the office closes.',
    sub: 'Families often call in the evening, and an inquiry that hits voicemail becomes a call to the next agency. The A2H phone receptionist answers, takes the family\'s details, and logs the call in your CRM. It handles inquiry intake only, never clinical records.',
    test: {
      h: 'Call your own agency at 7 PM and hear what a family hears.',
      p: 'A family that reaches voicemail rarely leaves a message. They call the next agency on the list. Now think about the inquiries you missed this month.',
      callsLabel: 'Family inquiries missed this month',
      callsPh: 'e.g. 6',
      valueLabel: 'What one new client is worth in their first month ($)',
      valuePh: 'e.g. 2770',
      mult: 1, // calls are already per month
    },
    cards: [
      { tag: 'Never voicemail', h: 'Answered nights and weekends', p: 'Every inquiry is picked up, whether the office is closed, the scheduler is out, or you are with a client. The family gets a real conversation, not a beep.' },
      { tag: 'Details, not a beep', h: 'Who needs care, and how to reach them', p: 'It takes the family\'s name, who needs care, what kind of help they want and a callback number, and tells them your office will call. It transfers to you when a call needs a person.' },
      { tag: 'Nothing lost', h: 'Every inquiry saved in one place', p: 'Each call becomes a contact in your CRM with the details the family gave, so nothing depends on a sticky note or whoever picked up last.' },
    ],
    proof: 'Hear a recorded test call: the receptionist answers, asks what is needed and takes the details (recorded on a groomer\'s line, same system).',
    faq: [
      ['Does it handle caregiver call-outs?', 'No. It answers family inquiries and takes their details. It can take a message from a caregiver and flag it for you, but it does not find replacement caregivers or connect to scheduling software.'],
      ['What information does it collect?', 'A name, who needs care, the type of help and callback details. It should not be used to collect health records or payment-card information. Whether your agency has HIPAA obligations depends on how you bill, so we cover that on the call.'],
      ['Will families know it is AI?', 'If they ask, it tells them. You choose the greeting.'],
      ['What does it cost?', 'The phone receptionist is an add-on to an A2H website build, and we cover its price on the 15-minute call. Website builds are $800 to $2,000 one time, with a free sample site first.'],
    ],
  },
  orthodontists: {
    slug: 'orthodontists.html',
    title: 'AI Phone Receptionist for Orthodontic Practices | A2H',
    description: 'New-patient calls answered when the front desk is slammed or the office is closed, logged to one list. Hear a recorded test call, then book a 15-minute call.',
    eyebrow: 'Orthodontic practices, Texas',
    h1: 'Every new-patient call answered, even when the desk is slammed.',
    sub: 'A parent who reaches voicemail at lunch or after hours books the practice that picked up. The A2H phone receptionist answers, takes the family\'s details, and logs the call in your CRM. It handles inquiries only, never clinical data.',
    test: {
      h: 'Call your own office after closing and see what happens.',
      p: 'A parent who reaches voicemail rarely leaves a message. They call the next orthodontist on the list. Now think about the exam calls you missed this month.',
      callsLabel: 'New-patient exam calls missed this month',
      callsPh: 'e.g. 10',
      valueLabel: 'What a new-patient exam is worth to you ($)',
      valuePh: 'e.g. 2000',
      mult: 1, // calls are already per month
    },
    cards: [
      { tag: 'Never voicemail', h: 'Answered at lunch and after hours', p: 'Every call is picked up the same way, whether the team is with patients, on a break, or gone for the night. The parent gets a real conversation, not a beep.' },
      { tag: 'Details, not a beep', h: 'Parent, child, callback number', p: 'It takes the parent\'s name, the child\'s name and age, the reason for the call and a number, and tells them the front desk will call back. It transfers to a person when a call needs one.' },
      { tag: 'Nothing lost', h: 'Every caller saved in one place', p: 'Each call becomes a contact in your CRM with the reason for the visit, so nothing depends on a note passed between staff.' },
    ],
    proof: 'Hear a recorded test call: the receptionist answers, asks what is needed and takes the details (recorded on a groomer\'s line, same system).',
    faq: [
      ['Does it work with my practice software?', 'Not directly. It does not connect to Ortho2, Cloud 9, OrthoTrac or Dentrix today. Every call lands in the CRM with a summary your front desk can add to your software in seconds.'],
      ['Is this HIPAA-safe?', 'It handles inquiries, not clinical data. Calls collect a name, the reason for the call and callback details. It should not be used to collect health or payment-card information. Anything that touches PHI belongs in your existing compliant software.'],
      ['Will parents know it is AI?', 'If they ask, it tells them. You choose the greeting.'],
      ['What does it cost?', 'The phone receptionist is an add-on to an A2H website build, and we cover its price on the 15-minute call. Website builds are $800 to $2,000 one time, with a free sample site first.'],
    ],
  },
};

function build(key, { ORG, EMAIL, cards, faqSection }) {
  const n = NICHES[key];
  const ARROW = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>`;
  const body = `
<header id="site-header">
  <div class="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between gap-4">
    <span class="brand" aria-label="A2H"><span class="brand-mark" aria-hidden="true"></span>A2H</span>
    <a href="#book" class="btn btn-ghost btn-sm">Book a call</a>
  </div>
</header>

<section class="relative glow-copper pt-32 sm:pt-40 pb-14 px-5 sm:px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-6xl mx-auto relative">
    <div class="max-w-2xl">
      <p class="rise rise-1 eyebrow mb-5">${n.eyebrow}</p>
      <h1 class="rise rise-2 display-xl text-sand mb-6">${n.h1}</h1>
      <p class="rise rise-3 lede text-lg mb-9">${n.sub}</p>
      <div class="rise rise-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <a href="#video" class="btn btn-solid">Hear a recorded test call <span class="btn-ico">${ARROW}</span></a>
        <a href="#book" class="btn btn-ghost">Book a 15-minute call</a>
      </div>
      <p class="rise rise-5 text-sm text-fog mt-7">Free 15-minute call. No obligation. Built in Houston for Texas businesses.</p>
    </div>
  </div>
</section>

<section id="video" class="px-5 sm:px-6 pb-16 scroll-mt-20">
  <div class="max-w-6xl mx-auto">
    <div class="reveal panel-elevated p-6 sm:p-8 max-w-2xl">
      <p class="eyebrow mb-4">Recorded test call</p>
      <audio class="block w-full" controls preload="none" src="assets/demo/riley-demo-call.mp3" data-track-media>
        Your browser can't play this audio. <a href="assets/demo/riley-demo-call.mp3">Download it here</a>.
      </audio>
    </div>
    <p class="reveal text-sm text-fog leading-[1.65] mt-5 max-w-2xl">The receptionist answering a test caller, recorded on a groomer's line. It is an add-on to an A2H website build. The transcript and the CRM record are on the <a href="demo.html" class="link-underline text-copper-light">demo page</a>.</p>
  </div>
</section>

<section class="py-24 px-5 sm:px-6 bg-surface/40 border-y hairline">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
    <div class="reveal lg:col-span-5">
      <p class="eyebrow mb-4">The 30-second test</p>
      <h2 class="display-lg text-sand">${n.test.h}</h2>
      <p class="lede mt-5">${n.test.p}</p>
    </div>
    <div class="reveal lg:col-span-6 lg:col-start-7">
      <div class="panel-elevated p-6 sm:p-8">
        <div class="grid sm:grid-cols-2 gap-5">
          <div><label class="field-label" for="calc-calls">${n.test.callsLabel}</label><input id="calc-calls" type="number" inputmode="numeric" min="0" placeholder="${n.test.callsPh}" class="field text-lg"></div>
          <div><label class="field-label" for="calc-value">${n.test.valueLabel}</label><input id="calc-value" type="number" inputmode="numeric" min="0" placeholder="${n.test.valuePh}" class="field text-lg"></div>
        </div>
        <div class="mt-6 pt-6 border-t hairline flex items-baseline justify-between gap-4 flex-wrap">
          <span class="text-fog text-sm max-w-[16rem] leading-[1.5]">Walking away each month. Your numbers, not a promise.</span>
          <span id="calc-out" class="figure text-copper-light text-4xl">$0</span>
        </div>
      </div>
    </div>
  </div>
</section>

${cards('What you get', 'One receptionist. Every call handled.', n.cards)}

<section class="px-5 sm:px-6 pb-6">
  <div class="max-w-6xl mx-auto reveal border-t hairline pt-6">
    <p class="text-sm text-fog max-w-2xl"><a href="demo.html" class="link-underline text-copper-light">${n.proof}</a></p>
  </div>
</section>

<section class="py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="reveal lg:col-span-4">
      <h2 class="display-lg text-sand lg:sticky lg:top-28">What happens next</h2>
    </div>
    <div class="stagger lg:col-span-8 steps">
      <div class="step"><span class="step-n">1</span><div class="pt-1.5"><h3 class="text-sand font-semibold text-[17px] mb-1.5">Hear the test call</h3><p class="text-fog text-[15px] leading-[1.7] max-w-md">How it answers, what it asks and what it logs for you.</p></div></div>
      <div class="step"><span class="step-n">2</span><div class="pt-1.5"><h3 class="text-sand font-semibold text-[17px] mb-1.5">Book a 15-minute call</h3><p class="text-fog text-[15px] leading-[1.7] max-w-md">We look at your calls and whether it is a fit. No obligation.</p></div></div>
      <div class="step"><span class="step-n">3</span><div class="pt-1.5"><h3 class="text-sand font-semibold text-[17px] mb-1.5">We build it</h3><p class="text-fog text-[15px] leading-[1.7] max-w-md">A sample site for your business first, with the chat and lead list working. The phone receptionist is added on top and set up around your business and your number.</p></div></div>
    </div>
  </div>
</section>

${faqSection(n.faq, 'Questions')}

<section id="book" class="px-5 sm:px-6 pb-24 scroll-mt-20">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10 items-start">
    <div class="reveal lg:col-span-4 lg:sticky lg:top-28">
      <p class="eyebrow mb-4">Book below</p>
      <h2 class="display-lg text-sand">Book your 15-minute call.</h2>
      <p class="lede mt-4">Pick a time that works. We will look at your calls and see if it makes sense.</p>
      <p class="text-sm text-fog mt-6 leading-[1.7]">Prefer to talk first? Call or text <a href="tel:${PHONE_TEL}" class="link-underline text-copper-light">${PHONE_DISPLAY}</a>, or email <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a>.</p>
    </div>
    <div class="reveal lg:col-span-8">
      <div class="panel-elevated overflow-hidden">
        <div class="calendly-inline-widget" data-url="${CALENDLY}" style="min-width:280px;height:700px;"></div>
      </div>
    </div>
  </div>
</section>

<footer class="mt-8">
  <div class="max-w-6xl mx-auto px-5 sm:px-6">
    <div class="rule"></div>
    <div class="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-fog/70">
      <span class="brand"><span class="brand-mark" aria-hidden="true"></span>A2H</span>
      <div class="flex items-center gap-5"><a href="privacy.html" class="link-underline hover:text-sand">Privacy</a><a href="terms.html" class="link-underline hover:text-sand">Terms</a></div>
      <span>&copy; ${new Date().getFullYear()} A2H, Houston, Texas</span>
    </div>
  </div>
</footer>`;

  const calc = `<script>
(function () {
  var c = document.getElementById('calc-calls'), v = document.getElementById('calc-value'), o = document.getElementById('calc-out');
  if (!c || !v || !o) return;
  var fired = false;
  function run() {
    var m = Math.round((+c.value || 0) * (+v.value || 0) * ${n.test.mult});
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
    ogImage: '/assets/og-image.png',
    jsonLd: [ORG],
    body,
    extraScripts: calc,
  };
}

module.exports = (ctx) => Object.keys(NICHES).map((k) => build(k, ctx));
