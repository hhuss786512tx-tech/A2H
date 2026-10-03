// Niche landing pages for A2H's three niches: mobile pet groomers, dental practices, home care agencies.
// For each niche: a "missed calls" guide and a "receptionist options" comparison, plus (for home care)
// the hub page. Pet and dental hubs already exist (pet-grooming.html, dental-practices.html) and get a guides block.
//
// COPY RULES (do not relax without checking the product):
//  - Only claim what is documented: answers calls and texts, books onto the calendar, logs contacts in the CRM,
//    warm-transfers to a person, keeps the customer's own number, works remotely for Texas businesses.
//  - NO prices anywhere in copy or schema: per-niche pricing is not confirmed. Point to pricing.html / the setup call.
//  - NO invented statistics, testimonials, compliance or licensing claims.
//  - Home care: inquiry capture + assessment booking ONLY. No caregiver call-out coverage, shift scheduling,
//    scheduling-software sync, SMS or deposits.

module.exports = function nichePages({ SITE, ORG, faqLd, hero, cards, faqSection, B }) {
  const NICHES = {
    pet: {
      hub: 'pet-grooming.html', hubName: 'Mobile pet groomers', slug: 'pet-grooming',
      who: 'a mobile pet groomer', callerWord: 'call', apptWord: 'appointment', audience: 'Mobile pet groomers',
    },
    dental: {
      hub: 'dental-practices.html', hubName: 'Dental practices', slug: 'dental',
      who: 'a dental practice', callerWord: 'patient call', apptWord: 'appointment', audience: 'Dental practices',
    },
    home: {
      hub: 'home-care-agencies.html', hubName: 'Home care agencies', slug: 'home-care',
      who: 'a home care agency', callerWord: 'inquiry call', apptWord: 'assessment', audience: 'Non-medical home care agencies',
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

  // Guides block shown on each niche hub page.
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
    <p class="reveal text-sm text-fog mt-8">See a real call: <a href="demo.html" class="link-underline text-copper-light">hear the AI receptionist book a job</a>. Pricing is on the <a href="pricing.html" class="link-underline text-copper-light">pricing page</a>.</p>
  </div>
</section>`;
  };

  const shared = (n) => [
    ['Do I have to change my business number?', 'No. Your existing number stays yours. We wire the receptionist into it rather than replacing it.'],
    [`What happens when a ${n.callerWord} needs a real person?`, 'The AI Receptionist warm-transfers the call to you or your team when it needs a human. It is built so that no call goes unanswered, not to replace you.'],
    ['Where does A2H work?', 'A2H sets the receptionist up remotely for Texas businesses, including those around Houston, Dallas, Austin, San Antonio and Fort Worth.'],
  ];

  // ---------------------------------------------------------------- missed-calls guides
  const MISSED = {
    pet: {
      title: 'Missed Calls for Mobile Groomers: The Fix | A2H',
      description: 'Mobile groomers miss calls mid-groom and on the road. See how an AI receptionist answers, books the appointment and logs the contact in a CRM.',
      eyebrow: 'For Mobile Pet Groomers',
      h1: 'Every missed call is a groom <span class="italic text-copper-light">you never booked.</span>',
      sub: 'When your hands are on a dog or the van is moving, the phone goes unanswered, and the caller books the next mobile groomer on Google. Here is how to stop that.',
      answer: 'Mobile pet groomers miss calls while grooming, while driving between jobs and after hours, and a caller who reaches voicemail will often try the next groomer. An AI receptionist answers every call and text, books the appointment onto your calendar, logs the contact in a CRM, and transfers to you when a call needs a person.',
      problemHeading: 'Where mobile groomers lose calls',
      problems: [
        { tag: 'Hands on a dog', h: 'Mid-groom', p: 'You cannot safely answer while you are grooming. The call rings out or goes to voicemail.' },
        { tag: 'Between jobs', h: 'On the road', p: 'Driving from one appointment to the next is half the day, and calls land when you cannot pick up.' },
        { tag: 'Off the clock', h: 'Evenings and weekends', p: 'Pet owners search and call when they are home, which is often when you are not working.' },
        { tag: 'Nothing to call back', h: 'No name, no number', p: 'A call that rings out with no voicemail leaves no record, so there is nobody to follow up with.' },
      ],
      fixHeading: 'What changes with an AI receptionist',
      fixes: [
        { tag: 'Answered', h: 'Every call and text, instantly', p: 'The caller reaches someone while they are still deciding who to book.' },
        { tag: 'Booked', h: 'Straight onto your calendar', p: 'The AI Receptionist books the appointment itself instead of taking a message.' },
        { tag: 'Logged', h: 'Every contact in your CRM', p: 'Name, what the caller wanted and a callback number are logged automatically in your pipeline board.' },
        { tag: 'Backup', h: 'Transfers when it should', p: 'Calls that need you are warm-transferred, so unusual requests still reach a person.' },
      ],
      faq: [
        ['Why do mobile groomers miss so many calls?', 'The work is hands-on and the day is spent moving between jobs, so there is rarely a moment to answer a phone. That is a feature of the job, not a flaw in how you run it.'],
        ['Can I just call people back after the groom?', 'You can, and many groomers do. The risk is that a caller who reaches no one often tries the next groomer first. The AI answers while the caller is still on the line.'],
        ['How do I see what calls came in?', 'Every contact is logged in your CRM pipeline board, so you can see who called and what they wanted without digging through a call log.'],
      ],
    },
    dental: {
      title: 'Missed Calls at the Dental Front Desk | A2H',
      description: 'The front desk cannot answer every line during check-in, lunch or after hours. See how an AI receptionist answers and books the appointment.',
      eyebrow: 'For Dental Practices',
      h1: 'The front desk cannot answer <span class="italic text-copper-light">every line.</span>',
      sub: 'While one patient checks in, another line rings. At lunch and after hours, nobody picks up at all. Here is how to stop losing those calls.',
      answer: 'Dental practices miss calls while the front desk is busy with check-in, during lunch and after hours, and a patient who cannot reach the office may call another practice. An AI receptionist answers every call and text, collects the patient\'s name and reason for calling, books the appointment onto your calendar, and logs the contact in a CRM.',
      problemHeading: 'Where dental practices lose calls',
      problems: [
        { tag: 'Busy desk', h: 'During check-in', p: 'The person answering the phone is also greeting patients, so a second line rings out.' },
        { tag: 'Midday gap', h: 'At lunch', p: 'Staff step away and the phones go to voicemail, often when patients are on their own breaks and calling.' },
        { tag: 'Closed office', h: 'After hours', p: 'New patients searching in the evening reach a recording and may move on to another practice.' },
        { tag: 'Nothing captured', h: 'No callback details', p: 'A hang-up leaves no name and no number, so the front desk has nobody to follow up with.' },
      ],
      fixHeading: 'What changes with an AI receptionist',
      fixes: [
        { tag: 'Answered', h: 'Every call and text, instantly', p: 'No patient is sent to voicemail because the desk was busy or the office was closed.' },
        { tag: 'Booked', h: 'Straight onto your calendar', p: 'The appointment is booked directly, with the patient\'s name and reason for calling attached.' },
        { tag: 'Logged', h: 'Every contact in your CRM', p: 'Names, reasons for calling and callback details are tracked in your own pipeline board.' },
        { tag: 'Backup', h: 'Transfers when it should', p: 'Calls that need a person are warm-transferred to your team.' },
      ],
      faq: [
        ['Is the AI receptionist HIPAA compliant?', 'The AI Receptionist and CRM handle scheduling, not clinical data. Calls collect only a name, the reason for the call and callback details so your staff can follow up. If you need intake that touches protected health information, that belongs in dedicated HIPAA-compliant software, and we link to it rather than rebuild it.'],
        ['Does it handle insurance or clinical questions?', 'It handles the front-desk call: answering, collecting the basics and booking. Anything clinical or insurance-specific is passed to your team rather than answered by the AI.'],
        ['What does the front desk see afterwards?', 'Every call is logged in your CRM pipeline board with the patient\'s name and reason for calling, so the team can follow up without a callback list on paper.'],
      ],
    },
    home: {
      title: 'Missed Family Inquiries for Home Care Agencies | A2H',
      description: 'Families often call home care agencies after hours. See how an AI receptionist answers, captures the inquiry and books an assessment.',
      eyebrow: 'For Home Care Agencies',
      h1: 'Families call when they need help, <span class="italic text-copper-light">not when you are open.</span>',
      sub: 'A family looking for care often makes the first call in the evening or on a weekend. If nobody answers, they call the next agency. Here is how to stop losing those inquiries.',
      answer: 'Home care agencies miss family inquiries in the evening, on weekends and whenever the office is busy, and a family comparing agencies may move on to the next one. An AI receptionist answers every call, captures the family\'s name, who needs care and a callback number, books an assessment onto your calendar, and logs the inquiry in a CRM.',
      problemHeading: 'Where home care agencies lose inquiries',
      problems: [
        { tag: 'Off hours', h: 'Evenings and weekends', p: 'Families researching care often call outside office hours and reach voicemail.' },
        { tag: 'Busy office', h: 'While staff are on other calls', p: 'A coordinator on one call cannot answer the next, and the second family hangs up.' },
        { tag: 'First to answer', h: 'Families compare agencies', p: 'A family calling several agencies tends to stay with the one that picks up and makes the next step easy.' },
        { tag: 'Details lost', h: 'No inquiry on record', p: 'A missed call leaves no name, no number and no sense of what the family needed.' },
      ],
      fixHeading: 'What changes with an AI receptionist',
      fixes: [
        { tag: 'Answered', h: 'Every call, day or night', p: 'The family reaches someone on the first try, including after hours.' },
        { tag: 'Captured', h: 'Who needs care, and how to reach them', p: 'The AI Receptionist collects the family\'s name, who needs care and a callback number.' },
        { tag: 'Booked', h: 'An assessment on your calendar', p: 'It books the assessment directly, so the next step is set before the call ends.' },
        { tag: 'Logged', h: 'Every inquiry in your CRM', p: 'Each inquiry lands in your own pipeline board, and calls that need a person are transferred.' },
      ],
      faq: [
        ['Does it handle caregiver call-outs or shift scheduling?', 'No. The AI Receptionist handles inquiry calls: answering, capturing the details and booking an assessment. It does not manage caregiver scheduling or call-out coverage.'],
        ['Is this for medical home health agencies?', 'A2H is built for non-medical home care agencies. The receptionist does not give clinical advice, and calls that need a person are transferred.'],
        ['Does it collect health information?', 'It captures contact details and who needs care so your team can follow up. If you need to collect protected health information, use dedicated compliant software; we can link to it rather than rebuild it.'],
      ],
    },
  };

  // ---------------------------------------------------------------- receptionist-options comparisons
  const OPTIONS = {
    pet: {
      title: 'Receptionist Options for Mobile Pet Groomers | A2H',
      description: 'Voicemail, hiring help, an answering service or an AI receptionist? Compare how each handles calls for a mobile pet groomer.',
      eyebrow: 'For Mobile Pet Groomers',
      h1: 'Four ways to answer the phone. <span class="italic text-copper-light">Which fits a mobile groomer?</span>',
      sub: 'You cannot answer while you groom. Here is how voicemail, a hire, an answering service and an AI receptionist compare.',
      costCell: 'One-time setup plus a flat monthly fee. See the pricing page.',
      lead: 'Mobile groomers usually choose between voicemail, hiring help, a live answering service and an AI receptionist.',
    },
    dental: {
      title: 'Receptionist Alternatives for Texas Dental Practices | A2H',
      description: 'Voicemail, another front-desk hire, an answering service or an AI receptionist? Compare how each handles calls for a dental practice.',
      eyebrow: 'For Dental Practices',
      h1: 'Four ways to cover the phones. <span class="italic text-copper-light">Which fits a dental practice?</span>',
      sub: 'The front desk is busy and the office closes. Here is how voicemail, another hire, an answering service and an AI receptionist compare.',
      costCell: 'One-time setup plus a flat monthly fee. See the pricing page.',
      lead: 'Dental practices usually choose between voicemail, another front-desk hire, a live answering service and an AI receptionist.',
    },
    home: {
      title: 'Receptionist Options for Texas Home Care Agencies | A2H',
      description: 'Voicemail, another hire, an answering service or an AI receptionist? Compare how each handles family inquiries for a home care agency.',
      eyebrow: 'For Home Care Agencies',
      h1: 'Four ways to answer family inquiries. <span class="italic text-copper-light">Which fits a home care agency?</span>',
      sub: 'Families call at all hours. Here is how voicemail, another hire, an answering service and an AI receptionist compare.',
      costCell: 'One-time setup plus a monthly fee. Ask for current pricing on a free setup call.',
      lead: 'Home care agencies usually choose between voicemail, another hire for the office, a live answering service and an AI receptionist.',
    },
  };

  const comparisonTable = (costCell) => {
    const head = ['Option', 'Nights and weekends', 'Books the appointment', 'Logs the contact', 'How you pay'];
    const rows = [
      ['Voicemail', 'Records a message; the caller waits for a reply', 'No', 'Only if you write it down', 'Usually free'],
      ['Hire help', 'Only during their hours', 'Yes', 'If they enter it', 'Wages, taxes and training'],
      ['Live answering service', 'Often staffed around the clock', 'Depends on whether it connects to your calendar', 'Usually emailed notes', 'Typically a monthly fee plus per-call or per-minute charges'],
      ['AI Receptionist + CRM (A2H)', 'Answers every call and text, day or night', 'Books onto your calendar', 'Every contact lands in your CRM', costCell],
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

  const optionsFaq = (key) => {
    const n = NICHES[key];
    return [
      ['Is an AI receptionist cheaper than hiring someone?', 'It depends on your hours and call volume. A hire costs wages and covers only the hours they work. An AI receptionist is a one-time setup plus a monthly fee and answers around the clock. Compare it against your own payroll, not an industry average.'],
      ['What does an AI receptionist not do?', 'It handles the front-desk call: answering, collecting details and booking. It does not do hands-on work, and anything it cannot handle is transferred to you or your team.'],
      ...shared(n),
    ];
  };

  const pages = [];
  const push = (key, kind, content) => {
    const n = NICHES[key];
    const slug = `${n.slug}-${kind === 'missed' ? 'missed-calls' : 'receptionist-options'}.html`;
    pages.push({ slug, ...content(slug) });
  };

  Object.keys(NICHES).forEach((key) => {
    const n = NICHES[key];
    const m = MISSED[key];
    push(key, 'missed', (slug) => {
      const faq = [...m.faq, ...shared(n)];
      return {
        title: m.title,
        description: m.description,
        jsonLd: [ORG, svcLd(`AI receptionist for ${n.hubName.toLowerCase()}`, m.answer, n.audience), faqLd(faq),
          crumbs([{ name: n.hubName, slug: n.hub }, { name: 'Missed calls', slug }])],
        body: [
          hero({ eyebrow: m.eyebrow, h1: m.h1, sub: m.sub, secondary: ['Hear a real call', 'demo.html'] }),
          answer(m.answer),
          cards('The Problem', m.problemHeading, m.problems),
          cards('The Fix', m.fixHeading, m.fixes),
          faqSection(faq),
          B.ctaBand({}),
          related(key, 'missed'),
        ].join('\n\n'),
      };
    });
    push(key, 'options', (slug) => {
      const o = OPTIONS[key];
      const faq = optionsFaq(key);
      const ans = `${o.lead} Voicemail books nothing, a hire covers only their working hours, an answering service covers more hours but may not connect to your calendar, and an AI receptionist answers every call, books the ${n.apptWord} and logs the contact. A2H charges a one-time setup fee plus a monthly fee.`;
      return {
        title: o.title,
        description: o.description,
        jsonLd: [ORG, svcLd(`AI receptionist for ${n.hubName.toLowerCase()}`, ans, n.audience), faqLd(faq),
          crumbs([{ name: n.hubName, slug: n.hub }, { name: 'Receptionist options', slug }])],
        body: [
          hero({ eyebrow: o.eyebrow, h1: o.h1, sub: o.sub, secondary: ['Hear a real call', 'demo.html'] }),
          answer(ans),
          comparisonTable(o.costCell),
          faqSection(faq),
          B.ctaBand({}),
          related(key, 'options'),
        ].join('\n\n'),
      };
    });
  });

  // ---------------------------------------------------------------- home care hub
  const HOME_FAQ = [
    ['What does the AI Receptionist do for a home care agency?', 'It answers every inquiry call, captures the family\'s name, who needs care and a callback number, books an assessment onto your calendar, and logs the inquiry in your CRM. Calls that need a person are transferred to you or your team.'],
    ['Does it manage caregiver scheduling or call-outs?', 'No. It handles inquiry calls and assessment booking. It does not manage caregiver schedules, shift coverage or call-outs.'],
    ['Is this for non-medical or medical home care?', 'A2H is built for non-medical home care agencies. The receptionist does not give clinical advice.'],
    ['Where can I see pricing?', 'Home care pricing is confirmed on a free 15-minute setup call, and the general pricing page lists the standard plans.'],
    ...shared(NICHES.home),
  ];
  pages.push({
    slug: 'home-care-agencies.html',
    title: 'AI Receptionist for Texas Home Care Agencies | A2H',
    description: 'AI receptionist + CRM for Texas home care agencies: every family inquiry answered, an assessment booked, every contact logged.',
    jsonLd: [ORG, svcLd('AI receptionist for home care agencies', 'An AI receptionist that answers family inquiry calls for non-medical home care agencies, books an assessment and logs the inquiry in a CRM.', NICHES.home.audience), faqLd(HOME_FAQ),
      crumbs([{ name: 'Home care agencies', slug: 'home-care-agencies.html' }])],
    body: [
      hero({
        eyebrow: 'For Texas Home Care Agencies',
        h1: 'Every family inquiry answered, <span class="italic text-copper-light">even at 8 p.m.</span>',
        sub: 'Families looking for care call when they have a minute, not when your office is open. The AI Receptionist answers, captures the inquiry and books an assessment, and every contact lands in your CRM.',
        secondary: ['Hear a real call', 'demo.html'],
      }),
      answer('An AI receptionist for a home care agency answers every inquiry call and text, captures the family\'s name, who needs care and a callback number, books an assessment onto your calendar, and logs the inquiry in a CRM. A2H sets this up for non-medical home care agencies in Texas. It handles inquiries and assessment booking; it does not manage caregiver scheduling.'),
      cards('What Changes For An Agency', 'Built around how families actually reach out', [
        { tag: 'Never voicemail', h: 'Answered day and night', p: 'Evenings, weekends and busy mornings: every inquiry reaches someone on the first call.' },
        { tag: 'Next step set', h: 'An assessment on your calendar', p: 'The AI Receptionist books the assessment directly, so the family leaves the call with something scheduled.' },
        { tag: 'Nothing lost', h: 'Every inquiry logged', p: 'Name, who needs care and a callback number are logged in your own CRM pipeline board.' },
        { tag: 'Found locally', h: 'Maps and reviews', p: 'On the Custom Website tier, Google Business Profile is claimed and tuned, because families often start with the map result.' },
      ]),
      guides('home'),
      faqSection(HOME_FAQ),
      B.ctaBand({}),
    ].join('\n\n'),
  });

  return { pages, guides };
};
