// Niche landing pages for A2H's active niches: dental practices, orthodontic practices, home care agencies.
// (Mobile pet groomers are PAUSED as of 2026-10-03: no new pet pages; pet-grooming.html is left as it was.)
// For each niche: a "missed calls" guide and a "receptionist options" comparison. Orthodontic + home care also get
// a hub page; the dental hub is dental-practices.html (build/verticals.js) and uses guides()/fit() from here.
//
// COPY RULES (do not relax without checking the product / the offers doc):
//  - Use the decided pitch: "A2H answers, books the {visit}, and tracks every call and caller in our custom CRM.
//    It handles scheduling only, never clinical data."
//  - NEVER say "on your calendar" / "calendar sync" (real Google Calendar sync is not built), and NEVER mention
//    texts/SMS (not available). Do not say it connects to practice-management software (it does not today).
//  - Phone: the client forwards their existing line (when busy / no answer). No number porting.
//  - NO prices in copy or schema: per-niche pricing is undecided. Say pricing is covered on the 15-minute call.
//  - NO invented statistics, testimonials, guarantees, compliance or licensing claims.
//  - Home care: intake + assessment booking ONLY. No caregiver call-out coverage or shift scheduling.

module.exports = function nichePages({ SITE, ORG, faqLd, hero, cards, faqSection, B }) {
  const NICHES = {
    dental: {
      hub: 'dental-practices.html', hubName: 'Dental practices', slug: 'dental',
      callerWord: 'patient call', apptWord: 'appointment', audience: 'Dental practices',
    },
    ortho: {
      hub: 'orthodontic-practices.html', hubName: 'Orthodontic practices', slug: 'orthodontic',
      callerWord: 'new-patient call', apptWord: 'new-patient exam', audience: 'Orthodontic practices',
    },
    home: {
      hub: 'home-care-agencies.html', hubName: 'Home care agencies', slug: 'home-care',
      callerWord: 'inquiry call', apptWord: 'assessment', audience: 'Non-medical home care agencies',
    },
  };

  const svcLd = (name, description, audience) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': SITE + '/#organization' },
    areaServed: { '@type': 'State', name: 'Texas' },
    audience: { '@type': 'Audience', audienceType: audience },
  });

  const crumbs = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', slug: '' }, { name: 'Industries', slug: 'industries.html' }, ...items].map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}/${it.slug}`,
    })),
  });

  const answer = (text) => `<section class="px-6 pb-4">
  <div class="max-w-3xl mx-auto">
    <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated p-7">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">The short answer</p>
      <p class="text-sand text-[15px] leading-[1.8]">${text}</p>
    </div>
  </div>
</section>`;

  const pill = (href, label) => `<a href="${href}" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-5 py-2.5 rounded-full text-sm">${label}</a>`;

  // Who this is for: the ICP is an owner who treats the phone as a revenue channel and is ready to invest.
  const fit = (noun) => `<section class="px-6 py-12">
  <div class="max-w-3xl mx-auto">
    <div class="reveal rounded-2xl border border-white/5 bg-surface/40 p-7">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Who this is for</p>
      <p class="text-sand text-[15px] leading-[1.8] mb-3">A2H is a done-for-you service, not a self-serve app. It fits ${noun} that:</p>
      <ul class="text-fog text-sm leading-[1.9] list-disc pl-5 space-y-1">
        <li>already get a steady flow of inbound calls, and know some go unanswered;</li>
        <li>treat the phone as a revenue channel and are ready to invest in setup and a monthly service;</li>
        <li>want it set up for them, with every call and caller tracked in one place.</li>
      </ul>
      <p class="text-fog text-sm leading-[1.8] mt-4">If you rarely miss a call, it will not move the needle for you.</p>
    </div>
  </div>
</section>`;

  const guides = (key) => {
    const n = NICHES[key];
    return `<section class="px-6 pb-16">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-4">Guides for ${n.hubName.toLowerCase()}</p>
    <div class="reveal flex flex-wrap justify-center gap-3">
      ${pill(`${n.slug}-missed-calls.html`, 'Stopping missed calls')}
      ${pill(`${n.slug}-receptionist-options.html`, 'Receptionist options compared')}
    </div>
  </div>
</section>`;
  };

  const related = (key, current) => {
    const n = NICHES[key];
    const others = Object.entries(NICHES).filter(([k]) => k !== key).map(([, o]) => pill(o.hub, o.hubName));
    const sibling = current === 'missed' ? pill(`${n.slug}-receptionist-options.html`, 'Receptionist options compared') : pill(`${n.slug}-missed-calls.html`, 'Stopping missed calls');
    return `<section class="py-16 px-6">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-4">Keep reading</p>
    <div class="reveal flex flex-wrap justify-center gap-3">
      ${pill(n.hub, n.hubName)}
      ${sibling}
      ${others.join('\n      ')}
    </div>
    <p class="reveal text-sm text-fog mt-8">Hear a <a href="demo.html" class="link-underline text-copper-light">demo call</a> (a recorded test call with a fictional business and caller). Pricing is covered on a free 15-minute call.</p>
  </div>
</section>`;
  };

  const forwarding = ['Do I have to change my business number?', 'No porting and no new number for your callers. You set your existing line to forward to the receptionist when it is busy or unanswered.'];
  const transfer = (n, who) => [`What happens when a ${n.callerWord} needs a real person?`, `It can transfer the call to ${who}, or take a message and flag the contact in our custom CRM.`];
  const where = ['Where does A2H work?', 'A2H sets the receptionist up remotely for Texas businesses, including those around Houston, Dallas, Austin, San Antonio and Fort Worth.'];
  const cost = ['What does it cost, and can I cancel?', 'A2H covers pricing on a free 15-minute call. There is a real contract with a cancel-anytime clause, and no long-term lock-in.'];

  const PRACTICE_SOFTWARE = {
    dental: ['Does it work with my practice-management software?', 'Not directly today. Every call produces a summary your front desk can add in seconds, and your practice software stays your system of record.'],
    ortho: ['Does it work with my practice software?', 'Not directly. It does not connect to Ortho2, Cloud 9, OrthoTrac or Dentrix today. Every call produces a summary your front desk can add in seconds, and your practice software stays your system of record.'],
  };
  const HIPAA = ['Is this HIPAA-safe?', 'It handles scheduling, not clinical data. Calls collect a name, the reason for the call and callback details. It should not be used to collect health or payment-card information. Anything that touches protected health information belongs in your existing compliant systems.'];

  const shared = (key) => {
    const n = NICHES[key];
    const who = key === 'home' ? 'your office' : 'your front desk';
    return [forwarding, transfer(n, who), where, cost];
  };

  // ---------------------------------------------------------------- missed-calls guides
  const MISSED = {
    dental: {
      title: 'Missed Calls at the Dental Front Desk | A2H',
      description: 'New-patient calls that hit voicemail at lunch, after hours or during a rush book the practice that picked up. See how A2H answers and books them.',
      eyebrow: 'For Dental Practices',
      h1: 'The front desk cannot answer <span class="italic text-copper-light">every line.</span>',
      sub: 'While one patient checks in, another line rings. At lunch and after hours, nobody picks up at all. Here is how to stop losing those calls.',
      answer: 'Dental practices miss new-patient calls at lunch, after hours and during a rush at the front desk, and a caller who reaches voicemail often books the practice that picked up. A2H answers every call, books the appointment, and tracks every call and caller in our custom CRM. It handles scheduling only, never clinical data.',
      problemHeading: 'Where dental practices lose calls',
      problems: [
        { tag: 'Busy desk', h: 'During check-in', p: 'The person answering the phone is also greeting patients, so a second line rings out.' },
        { tag: 'Midday gap', h: 'At lunch', p: 'Staff step away and the phones go to voicemail, often when patients are on their own breaks and calling.' },
        { tag: 'Closed office', h: 'After hours', p: 'New patients searching in the evening reach a recording and may move on to another practice.' },
        { tag: 'Nothing captured', h: 'No callback details', p: 'A hang-up leaves no name and no number, so the front desk has nobody to follow up with.' },
      ],
      fixHeading: 'What changes with A2H',
      fixes: [
        { tag: 'Answered', h: 'Every call, instantly', p: 'No patient is sent to voicemail because the desk was busy or the office was closed.' },
        { tag: 'Booked', h: 'The appointment, during the call', p: 'It takes the patient\'s name, the reason for the call and a callback number, then books the visit.' },
        { tag: 'Tracked', h: 'Every caller in our custom CRM', p: 'Each call becomes a contact with the reason for the visit, so nothing depends on a note passed between staff.' },
        { tag: 'Backup', h: 'Hands off when it should', p: 'It can transfer to your front desk, or take a message and flag the contact.' },
      ],
      faq: [HIPAA, PRACTICE_SOFTWARE.dental,
        ['Does it handle insurance or clinical questions?', 'No. It handles the front-desk call: answering, collecting the basics and booking. Anything clinical or insurance-specific is passed to your team rather than answered by the AI.']],
    },
    ortho: {
      title: 'Missed New-Patient Calls at Orthodontic Practices | A2H',
      description: 'A parent who reaches voicemail books the orthodontist who picked up. See how A2H answers new-patient calls and books the exam.',
      eyebrow: 'For Orthodontic Practices',
      h1: 'A parent who reaches voicemail <span class="italic text-copper-light">calls the next orthodontist.</span>',
      sub: 'New-patient exam calls arrive at lunch, after school and after hours, when the team is with patients or gone for the day. Here is how to stop losing them.',
      answer: 'Orthodontic practices miss new-patient exam calls while the team is with patients, at lunch and after hours, and a parent who reaches voicemail rarely leaves a message. A2H answers every call, books the new-patient exam, and tracks every call and caller in our custom CRM. It handles scheduling only, never clinical data.',
      problemHeading: 'Where orthodontic practices lose calls',
      problems: [
        { tag: 'Chairside', h: 'While the team is with patients', p: 'The people who answer the phone are also running the schedule, so a second line rings out.' },
        { tag: 'Midday gap', h: 'At lunch', p: 'Phones go to voicemail while staff are away from the desk.' },
        { tag: 'After school and work', h: 'Evenings', p: 'Parents often call once the day is done, after the office has closed.' },
        { tag: 'Nothing captured', h: 'No parent or child details', p: 'A hang-up leaves no name, no number and no sense of what the family wanted.' },
      ],
      fixHeading: 'What changes with A2H',
      fixes: [
        { tag: 'Answered', h: 'Every call, at lunch and after hours', p: 'The parent gets a real conversation, not a beep.' },
        { tag: 'Booked', h: 'The new-patient exam', p: 'It takes the parent\'s name, the child\'s name and age, the reason for the call and a callback number, then books the exam.' },
        { tag: 'Tracked', h: 'Every caller in our custom CRM', p: 'Each call becomes a contact with the reason for the visit.' },
        { tag: 'Backup', h: 'Hands off when it should', p: 'It can transfer to your front desk, or take a message and flag the contact.' },
      ],
      faq: [HIPAA, PRACTICE_SOFTWARE.ortho,
        ['Will parents know it is AI?', 'If they ask, it tells them. You choose the greeting.']],
    },
    home: {
      title: 'Missed Family Inquiries for Home Care Agencies | A2H',
      description: 'An inquiry that hits voicemail becomes a call to the next agency. See how A2H answers family inquiries and books the assessment.',
      eyebrow: 'For Home Care Agencies',
      h1: 'Families call when they need help, <span class="italic text-copper-light">not when you are open.</span>',
      sub: 'A family looking for care often makes the first call in the evening or on a weekend. If nobody answers, they call the next agency. Here is how to stop losing those inquiries.',
      answer: 'Home care agencies miss family inquiries in the evening, on weekends and whenever the office is busy, and an inquiry that hits voicemail becomes a call to the next agency. A2H answers every inquiry, takes the family\'s details, books the assessment, and tracks every inquiry in our custom CRM. It handles intake and scheduling only, never clinical records.',
      problemHeading: 'Where home care agencies lose inquiries',
      problems: [
        { tag: 'Off hours', h: 'Evenings and weekends', p: 'Families researching care often call outside office hours and reach voicemail.' },
        { tag: 'Busy office', h: 'While staff are on other calls', p: 'A coordinator on one call cannot answer the next, and the second family hangs up.' },
        { tag: 'First to answer', h: 'Families compare agencies', p: 'A family calling several agencies tends to stay with the one that picks up and makes the next step easy.' },
        { tag: 'Details lost', h: 'No inquiry on record', p: 'A missed call leaves no name, no number and no sense of what the family needed.' },
      ],
      fixHeading: 'What changes with A2H',
      fixes: [
        { tag: 'Answered', h: 'Every inquiry, day or night', p: 'The family reaches someone on the first try, including after hours.' },
        { tag: 'Captured', h: 'Who needs care, and how to reach them', p: 'It takes the family\'s name, who needs care and a callback number.' },
        { tag: 'Booked', h: 'The assessment', p: 'It books the assessment during the call, so the next step is set before the family hangs up.' },
        { tag: 'Tracked', h: 'Every inquiry in our custom CRM', p: 'Each inquiry becomes a contact, and calls that need a person can be transferred or flagged.' },
      ],
      faq: [
        ['Does it handle caregiver call-outs or shift scheduling?', 'No. A2H handles inquiry calls: answering, capturing the details and booking an assessment. It does not manage caregiver scheduling or call-out coverage.'],
        ['Is this for medical home health agencies?', 'A2H is built for non-medical home care agencies. It handles intake and scheduling only, never clinical records, and does not give clinical advice.'],
      ],
    },
  };

  // ---------------------------------------------------------------- receptionist-options comparisons
  const OPTIONS = {
    dental: {
      title: 'Receptionist Alternatives for Texas Dental Practices | A2H',
      description: 'Voicemail, another front-desk hire, an answering service or A2H? Compare how each handles calls for a dental practice.',
      eyebrow: 'For Dental Practices',
      h1: 'Four ways to cover the phones. <span class="italic text-copper-light">Which fits a dental practice?</span>',
      sub: 'The front desk is busy and the office closes. Here is how voicemail, another hire, an answering service and A2H compare.',
      lead: 'Dental practices usually choose between voicemail, another front-desk hire, a live answering service and an AI receptionist.',
    },
    ortho: {
      title: 'Receptionist Alternatives for Orthodontic Practices | A2H',
      description: 'Voicemail, another hire, an answering service or A2H? Compare how each handles new-patient calls for an orthodontic practice.',
      eyebrow: 'For Orthodontic Practices',
      h1: 'Four ways to answer new-patient calls. <span class="italic text-copper-light">Which fits an orthodontic practice?</span>',
      sub: 'New-patient exam calls decide the schedule. Here is how voicemail, another hire, an answering service and A2H compare.',
      lead: 'Orthodontic practices usually choose between voicemail, another front-desk hire, a live answering service and an AI receptionist.',
    },
    home: {
      title: 'Receptionist Options for Texas Home Care Agencies | A2H',
      description: 'Voicemail, another hire, an answering service or A2H? Compare how each handles family inquiries for a home care agency.',
      eyebrow: 'For Home Care Agencies',
      h1: 'Four ways to answer family inquiries. <span class="italic text-copper-light">Which fits a home care agency?</span>',
      sub: 'Families call at all hours. Here is how voicemail, another hire, an answering service and A2H compare.',
      lead: 'Home care agencies usually choose between voicemail, another hire for the office, a live answering service and an AI receptionist.',
    },
  };

  const comparisonTable = () => {
    const head = ['Option', 'Nights and weekends', 'Books the visit', 'Tracks the caller', 'How you pay'];
    const rows = [
      ['Voicemail', 'Records a message; the caller waits for a reply', 'No', 'Only if you write it down', 'Usually free'],
      ['Hire help', 'Only during their hours', 'Yes', 'If they enter it', 'Wages, taxes and training'],
      ['Live answering service', 'Often staffed around the clock', 'Depends on whether it connects to your schedule', 'Usually emailed notes', 'Typically a monthly fee plus per-call or per-minute charges'],
      ['A2H AI receptionist', 'Answers every call, day or night', 'Books the visit during the call', 'Every call and caller in our custom CRM', 'Setup plus a monthly service, covered on a 15-minute call'],
    ];
    return `<section class="py-16 px-6">
  <div class="max-w-5xl mx-auto">
    <div class="reveal mb-8 text-center">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Side by side</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">How the four options compare</h2>
    </div>
    <div class="reveal overflow-x-auto rounded-2xl border border-white/5 bg-elevated shadow-elevated">
      <table class="w-full min-w-[720px] text-left text-sm">
        <thead><tr class="border-b border-white/10 text-copper-light text-xs uppercase tracking-wider">${head.map((h) => `<th class="px-5 py-4 font-semibold">${h}</th>`).join('')}</tr></thead>
        <tbody>
${rows.map((r, i) => `          <tr class="border-b border-white/5 ${i === 3 ? 'bg-white/[0.03]' : ''}">${r.map((c, j) => `<td class="px-5 py-4 ${j === 0 ? 'text-sand font-semibold' : 'text-fog'} leading-[1.6]">${c}</td>`).join('')}</tr>`).join('\n')}
        </tbody>
      </table>
    </div>
    <p class="reveal text-xs text-fog mt-4 text-center">Comparison reflects typical setups. Check the specifics of any provider you are considering.</p>
  </div>
</section>`;
  };

  const optionsFaq = (key) => [
    ['Is an AI receptionist cheaper than hiring someone?', 'It depends on your hours and call volume. A hire costs wages and covers only the hours they work. A2H is a setup fee plus a monthly service and answers around the clock. Compare it against your own payroll, not an industry average.'],
    ['What does an AI receptionist not do?', key === 'home'
      ? 'It handles inquiry calls: answering, collecting details and booking the assessment. It does not manage caregiver schedules, and anything it cannot handle is passed to your team.'
      : 'It handles the front-desk call: answering, collecting details and booking. It does not handle clinical questions or insurance, and anything it cannot handle is passed to your team.'],
    ...shared(key),
  ];

  const pages = [];
  Object.keys(NICHES).forEach((key) => {
    const n = NICHES[key];
    const m = MISSED[key];
    const o = OPTIONS[key];

    const missedSlug = `${n.slug}-missed-calls.html`;
    const missedFaq = [...m.faq, ...shared(key)];
    pages.push({
      slug: missedSlug,
      title: m.title,
      description: m.description,
      jsonLd: [ORG, svcLd(`AI receptionist for ${n.hubName.toLowerCase()}`, m.answer, n.audience), faqLd(missedFaq),
        crumbs([{ name: n.hubName, slug: n.hub }, { name: 'Missed calls', slug: missedSlug }])],
      body: [
        hero({ eyebrow: m.eyebrow, h1: m.h1, sub: m.sub, secondary: ['Hear a demo call', 'demo.html'] }),
        answer(m.answer),
        cards('The Problem', m.problemHeading, m.problems),
        cards('The Fix', m.fixHeading, m.fixes),
        faqSection(missedFaq),
        B.ctaBand({}),
        related(key, 'missed'),
      ].join('\n\n'),
    });

    const optSlug = `${n.slug}-receptionist-options.html`;
    const optFaq = optionsFaq(key);
    const ans = `${o.lead} Voicemail books nothing, a hire covers only their working hours, an answering service covers more hours but may not connect to your schedule, and A2H answers every call, books the ${n.apptWord} and tracks every call and caller in our custom CRM. A2H is a setup fee plus a monthly service, covered on a free 15-minute call.`;
    pages.push({
      slug: optSlug,
      title: o.title,
      description: o.description,
      jsonLd: [ORG, svcLd(`AI receptionist for ${n.hubName.toLowerCase()}`, ans, n.audience), faqLd(optFaq),
        crumbs([{ name: n.hubName, slug: n.hub }, { name: 'Receptionist options', slug: optSlug }])],
      body: [
        hero({ eyebrow: o.eyebrow, h1: o.h1, sub: o.sub, secondary: ['Hear a demo call', 'demo.html'] }),
        answer(ans),
        comparisonTable(),
        faqSection(optFaq),
        B.ctaBand({}),
        related(key, 'options'),
      ].join('\n\n'),
    });
  });

  // ---------------------------------------------------------------- orthodontic hub
  const ORTHO_FAQ = [
    PRACTICE_SOFTWARE.ortho, HIPAA,
    ['Will parents know it is AI?', 'If they ask, it tells them. You choose the greeting.'],
    transfer(NICHES.ortho, 'your front desk'), cost, forwarding, where,
  ];
  pages.push({
    slug: 'orthodontic-practices.html',
    title: 'AI Receptionist for Texas Orthodontic Practices | A2H',
    description: 'A2H answers every new-patient call, books the exam and tracks every caller in our custom CRM. Scheduling only, never clinical data.',
    jsonLd: [ORG, svcLd('AI receptionist for orthodontic practices', 'A2H answers every new-patient call for orthodontic practices, books the new-patient exam, and tracks every call and caller in a custom CRM. It handles scheduling only, never clinical data.', NICHES.ortho.audience), faqLd(ORTHO_FAQ),
      crumbs([{ name: 'Orthodontic practices', slug: 'orthodontic-practices.html' }])],
    body: [
      hero({
        eyebrow: 'For Texas Orthodontic Practices',
        h1: 'Every new-patient exam call answered, <span class="italic text-copper-light">even when the desk is slammed.</span>',
        sub: 'A parent who reaches voicemail at lunch or after hours books the practice that picked up. A2H answers, books the new-patient exam, and tracks every call and caller in our custom CRM. It handles scheduling only, never clinical data.',
        secondary: ['Hear a demo call', 'demo.html'],
      }),
      answer('An AI receptionist for an orthodontic practice answers every new-patient call, takes the parent\'s name, the child\'s name and age, the reason for the call and a callback number, books the new-patient exam, and tracks every call and caller in a custom CRM. A2H sets this up for Texas orthodontic practices. It handles scheduling only, never clinical data, and it does not connect to practice software such as Ortho2, Cloud 9, OrthoTrac or Dentrix today.'),
      cards('What Changes For A Practice', 'Built around how families choose an orthodontist', [
        { tag: 'Never voicemail', h: 'Answered at lunch and after hours', p: 'Every call is picked up the same way, whether the team is with patients, on a break, or gone for the night.' },
        { tag: 'Booked, not just noted', h: 'New-patient exams booked', p: 'It takes the parent\'s name, the child\'s name and age, the reason for the call and a callback number, then books the exam.' },
        { tag: 'Nothing lost', h: 'Every caller in our custom CRM', p: 'Each call becomes a contact with the reason for the visit, so nothing depends on a note passed between staff.' },
        { tag: 'Honest about the limits', h: 'A call inbox, not a practice-software link', p: 'Your practice software stays your system of record. Each call produces a summary your front desk can add in seconds.' },
      ]),
      fit('orthodontic practices'),
      guides('ortho'),
      faqSection(ORTHO_FAQ),
      B.ctaBand({}),
    ].join('\n\n'),
  });

  // ---------------------------------------------------------------- home care hub
  const HOME_FAQ = [
    ['What does A2H do for a home care agency?', 'A2H answers every inquiry, takes the family\'s details, books the assessment, and tracks every inquiry in our custom CRM. Calls that need a person can be transferred to your office, or taken as a message and flagged.'],
    ['Does it manage caregiver scheduling or call-outs?', 'No. It handles inquiry calls and assessment booking. It does not manage caregiver schedules, shift coverage or call-outs.'],
    ['Is this for non-medical or medical home care?', 'A2H is built for non-medical home care agencies. It handles intake and scheduling only, never clinical records, and does not give clinical advice.'],
    ...shared('home'),
  ];
  pages.push({
    slug: 'home-care-agencies.html',
    title: 'AI Receptionist for Texas Home Care Agencies | A2H',
    description: 'A2H answers every family inquiry, takes the details, books the assessment and tracks every inquiry in our custom CRM.',
    jsonLd: [ORG, svcLd('AI receptionist for home care agencies', 'A2H answers every family inquiry for non-medical home care agencies, takes the details, books the assessment, and tracks every inquiry in a custom CRM. It handles intake and scheduling only, never clinical records.', NICHES.home.audience), faqLd(HOME_FAQ),
      crumbs([{ name: 'Home care agencies', slug: 'home-care-agencies.html' }])],
    body: [
      hero({
        eyebrow: 'For Texas Home Care Agencies',
        h1: 'Every family inquiry answered, <span class="italic text-copper-light">even at 8 p.m.</span>',
        sub: 'Families looking for care call when they have a minute, not when your office is open. A2H answers every inquiry, takes the family\'s details, books the assessment, and tracks every inquiry in our custom CRM. It handles intake and scheduling only, never clinical records.',
        secondary: ['Hear a demo call', 'demo.html'],
      }),
      answer('An AI receptionist for a home care agency answers every family inquiry, takes the family\'s name, who needs care and a callback number, books the assessment, and tracks every inquiry in a custom CRM. A2H sets this up for non-medical home care agencies in Texas. It handles intake and scheduling; it does not manage caregiver scheduling.'),
      cards('What Changes For An Agency', 'Built around how families actually reach out', [
        { tag: 'Never voicemail', h: 'Answered day and night', p: 'Evenings, weekends and busy mornings: every inquiry reaches someone on the first call.' },
        { tag: 'Next step set', h: 'The assessment, booked', p: 'It books the assessment during the call, so the family leaves with the next step set.' },
        { tag: 'Nothing lost', h: 'Every inquiry in our custom CRM', p: 'Name, who needs care and a callback number are tracked in one place.' },
        { tag: 'Found locally', h: 'Maps and reviews', p: 'On the Custom Website tier, Google Business Profile is claimed and tuned, because families often start with the map result.' },
      ]),
      fit('home care agencies'),
      guides('home'),
      faqSection(HOME_FAQ),
      B.ctaBand({}),
    ].join('\n\n'),
  });

  return { pages, guides, fit };
};
