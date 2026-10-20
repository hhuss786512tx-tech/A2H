// Retired niche pages: dental, orthodontic and home care guides and hubs.
// Every page here is noindexed and out of the sitemap (RETIRED list in build.js).
// They stay live only so old links do not 404, so the copy is neutral and matches
// the current offer: a website with an AI chat and a CRM lead list ($800-$2,000
// one time), with the AI phone receptionist as an add-on quoted on the call.
//
// COPY RULES (do not relax without checking the product / the offers doc):
//  - NEVER say "books the visit / on your calendar / calendar sync" (not built), and NEVER mention
//    texts/SMS. Do not say it connects to practice-management software (it does not today).
//  - No monthly prices. The old $397/$697 receptionist plans are gone; the add-on is quoted on the call.
//  - Phone: the client forwards their existing line (when busy / no answer). No number porting.
//  - NO invented statistics, testimonials, guarantees, compliance or licensing claims.
//  - Home care: inquiry intake ONLY. No caregiver call-out coverage or shift scheduling.

module.exports = function nichePages({ SITE, ORG, faqLd, hero, cards, faqSection, answer, relatedLinks, B }) {
  const NICHES = {
    dental: {
      hub: 'dental-practices.html', hubName: 'Dental practices', slug: 'dental',
      callerWord: 'patient inquiry', apptWord: 'appointment', audience: 'Dental practices', who: 'your front desk',
    },
    ortho: {
      hub: 'orthodontic-practices.html', hubName: 'Orthodontic practices', slug: 'orthodontic',
      callerWord: 'new-patient inquiry', apptWord: 'new-patient exam', audience: 'Orthodontic practices', who: 'your front desk',
    },
    home: {
      hub: 'home-care-agencies.html', hubName: 'Home care agencies', slug: 'home-care',
      callerWord: 'family inquiry', apptWord: 'assessment', audience: 'Non-medical home care agencies', who: 'your office',
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

  // Who this is for: an owner who wants inquiries answered and tracked, and wants it set up for them.
  const fit = (noun) => `<section class="px-5 sm:px-6 py-12">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="reveal lg:col-span-4">
      <h2 class="display-lg text-sand lg:sticky lg:top-28">Who this is for</h2>
    </div>
    <div class="reveal lg:col-span-8">
      <p class="text-sand text-[17px] leading-[1.7] max-w-2xl mb-5">A2H is a done-for-you build, not a template. It fits ${noun} that:</p>
      <ul class="stagger text-fog text-[15px] leading-[1.7] max-w-2xl">
        <li class="py-3 border-t hairline">get inquiries at lunch, after hours and on weekends, and know some go unanswered;</li>
        <li class="py-3 border-t hairline">want the front desk to see every inquiry in one list instead of voicemail, email and texts in three places;</li>
        <li class="py-3 border-t border-b hairline">want it set up for them, with a sample site to look at before paying.</li>
      </ul>
      <p class="text-fog text-sm leading-[1.7] mt-5 max-w-2xl">If your current site already does this, it will not move the needle for you.</p>
    </div>
  </div>
</section>`;

  const guides = (key) => {
    const n = NICHES[key];
    return relatedLinks([[`${n.slug}-missed-calls.html`, 'Stopping missed calls'], [`${n.slug}-receptionist-options.html`, 'Receptionist options compared']]);
  };

  const DEMO_NOTE = 'Hear the phone receptionist add-on on a <a href="demo.html" class="link-underline text-copper-light">recorded test call</a>. Pricing is on the <a href="pricing.html" class="link-underline text-copper-light">pricing page</a>.';

  const related = (key, current) => {
    const n = NICHES[key];
    const others = Object.entries(NICHES).filter(([k]) => k !== key).map(([, o]) => [o.hub, o.hubName]);
    const sibling = current === 'missed' ? [`${n.slug}-receptionist-options.html`, 'Receptionist options compared'] : [`${n.slug}-missed-calls.html`, 'Stopping missed calls'];
    return relatedLinks([[n.hub, n.hubName], sibling, ...others], DEMO_NOTE);
  };

  const forwarding = ['Do I have to change my business number?', 'No. Your number stays the same and goes at the top of the site. If you add the phone receptionist, your existing line forwards to it when it is busy or unanswered. No porting.'];
  const transfer = (n) => [`What happens when a ${n.callerWord} needs a real person?`, `The chat passes anything it cannot answer to ${n.who}, with the person's details. The phone receptionist add-on can transfer the call to ${n.who}, or take a message and flag the contact in the CRM.`];
  const where = ['Where does A2H work?', 'A2H builds remotely for Texas businesses, including those around Houston, Dallas, Austin, San Antonio and Fort Worth.'];
  const costFaq = ['What does it cost?', 'A website with the AI chat and CRM lead list is $800 to $2,000 one time, depending on size. You see a free sample site first. The AI phone receptionist is an add-on, quoted on the call, as are hosting and upkeep.'];

  const PRACTICE_SOFTWARE = {
    dental: ['Does it work with my practice-management software?', 'Not directly today. Every inquiry lands in the CRM with the details the patient gave, and your practice software stays your system of record.'],
    ortho: ['Does it work with my practice software?', 'Not directly. It does not connect to Ortho2, Cloud 9, OrthoTrac or Dentrix today. Every inquiry lands in the CRM with the details the parent gave, and your practice software stays your system of record.'],
  };
  const HIPAA = ['Is this HIPAA-safe?', 'The chat and CRM handle inquiries and scheduling details, not clinical data. They collect a name, the reason for the inquiry and callback details. They should not be used to collect health or payment-card information. Anything that touches protected health information belongs in your existing compliant systems.'];

  const shared = (key) => {
    const n = NICHES[key];
    return [forwarding, transfer(n), where, costFaq];
  };

  // ---------------------------------------------------------------- missed-calls guides
  const MISSED = {
    dental: {
      title: 'Missed Calls at the Dental Front Desk | A2H',
      description: 'New-patient inquiries that hit voicemail at lunch, after hours or during a rush go to the practice that answered. How a website chat and a phone receptionist add-on change that.',
      eyebrow: 'Dental practices, Texas',
      h1: 'The front desk cannot answer every line.',
      sub: 'While one patient checks in, another line rings. At lunch and after hours, nobody picks up at all. Here is how to stop losing those inquiries.',
      answer: 'Dental practices miss new-patient inquiries at lunch, after hours and during a rush at the front desk, and a patient who reaches voicemail often books the practice that answered. An A2H website answers the common questions through an AI chat, takes the patient\'s details and saves them to a CRM the front desk works each morning. The AI phone receptionist add-on does the same for calls you miss. Both handle inquiries only, never clinical data.',
      problemHeading: 'Where dental practices lose inquiries',
      problems: [
        { tag: 'Busy desk', h: 'During check-in', p: 'The person answering the phone is also greeting patients, so a second line rings out.' },
        { tag: 'Midday gap', h: 'At lunch', p: 'Staff step away and the phones go to voicemail, often when patients are on their own breaks and calling.' },
        { tag: 'Closed office', h: 'After hours', p: 'New patients searching in the evening reach a recording and may move on to another practice.' },
        { tag: 'Nothing captured', h: 'No callback details', p: 'A hang-up leaves no name and no number, so the front desk has nobody to follow up with.' },
      ],
      fixHeading: 'What changes with A2H',
      fixes: [
        { tag: 'Website chat', h: 'Questions answered at any hour', p: 'Hours, services, directions and new-patient steps answered on your site while the desk is busy or the office is closed.' },
        { tag: 'Details taken', h: 'Name, reason, callback number', p: 'The chat takes the patient\'s details and saves them to your CRM. Your front desk schedules the visit when they call back.' },
        { tag: 'Add-on', h: 'Calls you miss, answered', p: 'The AI phone receptionist answers when nobody can, takes the same details and logs them to the same CRM.' },
        { tag: 'Backup', h: 'Hands off when it should', p: 'Anything the chat or receptionist cannot handle is passed to your front desk with the patient\'s details.' },
      ],
      faq: [HIPAA, PRACTICE_SOFTWARE.dental,
        ['Does it answer insurance or clinical questions?', 'No. It answers front-desk questions: hours, services, directions, how to get started. Anything clinical or insurance-specific is passed to your team rather than answered by the AI.']],
    },
    ortho: {
      title: 'Missed New-Patient Calls at Orthodontic Practices | A2H',
      description: 'A parent who reaches voicemail books the orthodontist who answered. How a website chat and a phone receptionist add-on change that.',
      eyebrow: 'Orthodontic practices, Texas',
      h1: 'A parent who reaches voicemail calls the next orthodontist.',
      sub: 'New-patient exam inquiries arrive at lunch, after school and after hours, when the team is with patients or gone for the day. Here is how to stop losing them.',
      answer: 'Orthodontic practices miss new-patient exam inquiries while the team is with patients, at lunch and after hours, and a parent who reaches voicemail rarely leaves a message. An A2H website answers the common questions through an AI chat, takes the parent\'s details and saves them to a CRM the front desk works each morning. The AI phone receptionist add-on does the same for calls you miss. Both handle inquiries only, never clinical data.',
      problemHeading: 'Where orthodontic practices lose inquiries',
      problems: [
        { tag: 'Chairside', h: 'While the team is with patients', p: 'The people who answer the phone are also running the schedule, so a second line rings out.' },
        { tag: 'Midday gap', h: 'At lunch', p: 'Phones go to voicemail while staff are away from the desk.' },
        { tag: 'After school and work', h: 'Evenings', p: 'Parents often reach out once the day is done, after the office has closed.' },
        { tag: 'Nothing captured', h: 'No parent or child details', p: 'A hang-up leaves no name, no number and no sense of what the family wanted.' },
      ],
      fixHeading: 'What changes with A2H',
      fixes: [
        { tag: 'Website chat', h: 'Questions answered at any hour', p: 'Ages you see, what a first exam involves, hours and directions, answered on your site in the evening.' },
        { tag: 'Details taken', h: 'Parent, child, callback number', p: 'The chat takes the parent\'s name, the child\'s name and age, the reason and a callback number, and saves it to your CRM.' },
        { tag: 'Add-on', h: 'Calls you miss, answered', p: 'The AI phone receptionist answers when nobody can, takes the same details and logs them to the same CRM.' },
        { tag: 'Backup', h: 'Hands off when it should', p: 'Anything the chat or receptionist cannot handle is passed to your front desk with the family\'s details.' },
      ],
      faq: [HIPAA, PRACTICE_SOFTWARE.ortho,
        ['Will parents know it is AI?', 'If they ask, it tells them. You choose the greeting.']],
    },
    home: {
      title: 'Missed Family Inquiries for Home Care Agencies | A2H',
      description: 'An inquiry that hits voicemail becomes a call to the next agency. How a website chat and a phone receptionist add-on change that.',
      eyebrow: 'Home care agencies, Texas',
      h1: 'Families call when they need help, not when you are open.',
      sub: 'A family looking for care often reaches out in the evening or on a weekend. If nobody answers, they call the next agency. Here is how to stop losing those inquiries.',
      answer: 'Home care agencies miss family inquiries in the evening, on weekends and whenever the office is busy, and an inquiry that hits voicemail becomes a call to the next agency. An A2H website answers the common questions through an AI chat, takes the family\'s details and saves them to a CRM your office works each morning. The AI phone receptionist add-on does the same for calls you miss. Both handle inquiry intake only, never clinical records.',
      problemHeading: 'Where home care agencies lose inquiries',
      problems: [
        { tag: 'Off hours', h: 'Evenings and weekends', p: 'Families researching care often reach out outside office hours and get voicemail.' },
        { tag: 'Busy office', h: 'While staff are on other calls', p: 'A coordinator on one call cannot answer the next, and the second family hangs up.' },
        { tag: 'First to answer', h: 'Families compare agencies', p: 'A family contacting several agencies tends to stay with the one that answered and made the next step easy.' },
        { tag: 'Details lost', h: 'No inquiry on record', p: 'A missed call leaves no name, no number and no sense of what the family needed.' },
      ],
      fixHeading: 'What changes with A2H',
      fixes: [
        { tag: 'Website chat', h: 'Questions answered at any hour', p: 'Service area, types of help, how to start, answered on your site on a Sunday evening.' },
        { tag: 'Details taken', h: 'Who needs care, and how to reach them', p: 'The chat takes the family\'s name, who needs care and a callback number, and saves it to your CRM.' },
        { tag: 'Add-on', h: 'Calls you miss, answered', p: 'The AI phone receptionist answers when nobody can, takes the same details and logs them to the same CRM.' },
        { tag: 'Backup', h: 'Hands off when it should', p: 'Anything the chat or receptionist cannot handle is passed to your office with the family\'s details.' },
      ],
      faq: [
        ['Does it handle caregiver call-outs or shift scheduling?', 'No. A2H handles inquiries: answering questions, capturing the details and logging them for your office. It does not manage caregiver scheduling or call-out coverage.'],
        ['Is this for medical home health agencies?', 'A2H builds for non-medical home care agencies. The chat and CRM handle inquiry intake only, never clinical records, and do not give clinical advice.'],
      ],
    },
  };

  // ---------------------------------------------------------------- receptionist-options comparisons
  const OPTIONS = {
    dental: {
      title: 'Receptionist Alternatives for Texas Dental Practices | A2H',
      description: 'Voicemail, another front-desk hire, an answering service or an AI receptionist? Compare how each handles calls for a dental practice.',
      eyebrow: 'Dental practices, Texas',
      h1: 'Four ways to cover the phones.',
      sub: 'The front desk is busy and the office closes. Here is how voicemail, another hire, an answering service and an AI receptionist compare for a dental practice.',
      lead: 'Dental practices usually choose between voicemail, another front-desk hire, a live answering service and an AI receptionist.',
    },
    ortho: {
      title: 'Receptionist Alternatives for Orthodontic Practices | A2H',
      description: 'Voicemail, another hire, an answering service or an AI receptionist? Compare how each handles new-patient calls for an orthodontic practice.',
      eyebrow: 'Orthodontic practices, Texas',
      h1: 'Four ways to answer new-patient calls.',
      sub: 'New-patient exam calls decide the schedule. Here is how voicemail, another hire, an answering service and an AI receptionist compare for an orthodontic practice.',
      lead: 'Orthodontic practices usually choose between voicemail, another front-desk hire, a live answering service and an AI receptionist.',
    },
    home: {
      title: 'Receptionist Options for Texas Home Care Agencies | A2H',
      description: 'Voicemail, another hire, an answering service or an AI receptionist? Compare how each handles family inquiries for a home care agency.',
      eyebrow: 'Home care agencies, Texas',
      h1: 'Four ways to answer family inquiries.',
      sub: 'Families call at all hours. Here is how voicemail, another hire, an answering service and an AI receptionist compare for a home care agency.',
      lead: 'Home care agencies usually choose between voicemail, another hire for the office, a live answering service and an AI receptionist.',
    },
  };

  const comparisonTable = () => {
    const head = ['Option', 'Nights and weekends', 'Takes the details', 'Tracks the caller', 'How you pay'];
    const rows = [
      ['Voicemail', 'Records a message; the caller waits for a reply', 'Only if they leave one', 'Only if you write it down', 'Usually free'],
      ['Hire help', 'Only during their hours', 'Yes', 'If they enter it', 'Wages, taxes and training'],
      ['Live answering service', 'Often staffed around the clock', 'Yes', 'Usually emailed notes', 'Typically a monthly fee plus per-call or per-minute charges'],
      ['A2H AI receptionist add-on', 'Answers when nobody can, day or night', 'Name, reason and callback number', 'Every call and caller in your CRM', 'Add-on to a website build, quoted on the call'],
    ];
    return `<section class="py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal max-w-2xl mb-10">
      <p class="eyebrow mb-4">Side by side</p>
      <h2 class="display-lg text-sand">How the four options compare</h2>
    </div>
    <div class="reveal panel overflow-x-auto">
      <table class="w-full min-w-[720px] text-left text-sm">
        <thead><tr class="border-b hairline">${head.map((h) => `<th class="px-5 py-4 text-xs font-semibold text-fog uppercase tracking-[0.12em]">${h}</th>`).join('')}</tr></thead>
        <tbody>
${rows.map((r, i) => `          <tr class="${i < rows.length - 1 ? 'border-b hairline' : ''} ${i === 3 ? 'bg-copper/[0.06]' : ''}">${r.map((c, j) => `<td class="px-5 py-4 align-top ${j === 0 ? 'text-sand font-semibold' : 'text-fog'} leading-[1.6]">${c}</td>`).join('')}</tr>`).join('\n')}
        </tbody>
      </table>
    </div>
    <p class="reveal text-xs text-fog/70 mt-5 max-w-xl">Comparison reflects typical setups. Check the specifics of any provider you are considering.</p>
  </div>
</section>`;
  };

  const optionsFaq = (key) => [
    ['Is an AI receptionist cheaper than hiring someone?', 'It depends on your hours and call volume. A hire costs wages and covers only the hours they work. The A2H receptionist add-on answers around the clock and is quoted on the call. Compare it against your own payroll, not an industry average.'],
    ['What does the AI receptionist not do?', key === 'home'
      ? 'It handles inquiry calls: answering, collecting details and logging them for your office. It does not manage caregiver schedules, and anything it cannot handle is passed to your team.'
      : 'It handles the front-desk call: answering, collecting details and logging them for your staff. It does not handle clinical questions or insurance, and anything it cannot handle is passed to your team.'],
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
      jsonLd: [ORG, svcLd(`Websites with AI chat and CRM for ${n.hubName.toLowerCase()}`, m.answer, n.audience), faqLd(missedFaq),
        crumbs([{ name: n.hubName, slug: n.hub }, { name: 'Missed calls', slug: missedSlug }])],
      body: [
        hero({ eyebrow: m.eyebrow, h1: m.h1, sub: m.sub, secondary: ['See pricing', 'pricing.html'] }),
        answer(m.answer),
        cards('The problem', m.problemHeading, m.problems),
        cards('The fix', m.fixHeading, m.fixes),
        faqSection(missedFaq),
        related(key, 'missed'),
        B.ctaBand({}),
      ].join('\n\n'),
    });

    const optSlug = `${n.slug}-receptionist-options.html`;
    const optFaq = optionsFaq(key);
    const ans = `${o.lead} Voicemail takes nothing unless the caller leaves a message, a hire covers only their working hours, an answering service covers more hours but usually hands you emailed notes, and the A2H AI receptionist add-on answers when nobody can, takes the ${n.callerWord.replace(' inquiry', '')}'s details and logs every call in your CRM. It is an add-on to an A2H website build, quoted on the call.`;
    pages.push({
      slug: optSlug,
      title: o.title,
      description: o.description,
      jsonLd: [ORG, svcLd(`AI receptionist add-on for ${n.hubName.toLowerCase()}`, ans, n.audience), faqLd(optFaq),
        crumbs([{ name: n.hubName, slug: n.hub }, { name: 'Receptionist options', slug: optSlug }])],
      body: [
        hero({ eyebrow: o.eyebrow, h1: o.h1, sub: o.sub, secondary: ['See pricing', 'pricing.html'] }),
        answer(ans),
        comparisonTable(),
        faqSection(optFaq),
        related(key, 'options'),
        B.ctaBand({}),
      ].join('\n\n'),
    });
  });

  // ---------------------------------------------------------------- orthodontic hub
  const ORTHO_FAQ = [
    PRACTICE_SOFTWARE.ortho, HIPAA,
    ['Will parents know it is AI?', 'If they ask, it tells them. You choose the greeting.'],
    transfer(NICHES.ortho), costFaq, forwarding, where,
  ];
  const ORTHO_ANSWER = 'A2H builds websites for Texas orthodontic practices: a fast, hand-coded site with hours, location and a tappable number first, an AI chat that answers common questions (ages you see, what a first exam involves, directions) and takes the parent\'s name, the child\'s name and age, the reason and a callback number, and a CRM where every inquiry lands. The chat and CRM handle inquiries, not clinical data, and do not connect to practice software such as Ortho2, Cloud 9, OrthoTrac or Dentrix today. You see a free sample site first. Builds are $800 to $2,000 one time. An AI phone receptionist is available as an add-on.';
  pages.push({
    slug: 'orthodontic-practices.html',
    title: 'Websites for Texas Orthodontic Practices | A2H',
    description: 'Websites with an AI chat and a CRM lead list for Texas orthodontic practices. New-patient questions answered after hours, no clinical data. Free sample site first.',
    jsonLd: [ORG, svcLd('Websites with AI chat and CRM for orthodontic practices', ORTHO_ANSWER, NICHES.ortho.audience), faqLd(ORTHO_FAQ),
      crumbs([{ name: 'Orthodontic practices', slug: 'orthodontic-practices.html' }])],
    body: [
      hero({
        eyebrow: 'Orthodontic practices, Texas',
        h1: 'Websites for Texas orthodontic practices.',
        sub: 'A parent who reaches voicemail at lunch or after hours books the practice that answered. The chat on your site answers the common questions, takes the family\'s details, and saves them to a list your front desk works each morning.',
        secondary: ['See pricing', 'pricing.html'],
      }),
      answer(ORTHO_ANSWER),
      cards('What we build', 'Built around how families choose an orthodontist', [
        { tag: 'First screen', h: 'Hours, location, phone', p: 'The three things a parent checks before anything else, visible without scrolling and tappable on a phone.' },
        { tag: 'AI chat', h: 'Answered at lunch and after hours', p: 'Ages you see, what a first exam involves, hours and directions. It answers from what you give us and passes anything clinical to your staff.' },
        { tag: 'CRM', h: 'Every inquiry in one list', p: 'The parent\'s name, the child\'s name and age, the reason and a callback number, saved automatically with spam filtered out.' },
        { tag: 'Honest about the limits', h: 'A lead list, not a practice-software link', p: 'Your practice software stays your system of record. Each inquiry has the details your front desk needs to schedule it.' },
      ]),
      fit('orthodontic practices'),
      guides('ortho'),
      B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
      faqSection(ORTHO_FAQ),
      relatedLinks([['industries.html', 'All industries'], ['medical.html', 'Medical practices'], ['dental-practices.html', 'Dental practices'], ['home-care-agencies.html', 'Home care agencies']], DEMO_NOTE),
      B.ctaBand({}),
    ].join('\n\n'),
  });

  // ---------------------------------------------------------------- home care hub
  const HOME_FAQ = [
    ['What does A2H do for a home care agency?', 'A website with an AI chat that answers the questions families ask (service area, types of help, how to start), takes the family\'s details and saves them to a CRM your office works each morning. The AI phone receptionist add-on does the same for calls you miss.'],
    ['Does it manage caregiver scheduling or call-outs?', 'No. It handles inquiries only. It does not manage caregiver schedules, shift coverage or call-outs.'],
    ['Is this for non-medical or medical home care?', 'A2H builds for non-medical home care agencies. The chat and CRM handle inquiry intake only, never clinical records, and do not give clinical advice.'],
    ...shared('home'),
  ];
  const HOME_ANSWER = 'A2H builds websites for non-medical home care agencies in Texas: a fast, hand-coded site with an AI chat that answers common questions (service area, types of help, how to start) and takes the family\'s name, who needs care and a callback number, and a CRM where every inquiry lands. The chat and CRM handle inquiry intake, not caregiver scheduling or clinical records. You see a free sample site first. Builds are $800 to $2,000 one time. An AI phone receptionist is available as an add-on.';
  pages.push({
    slug: 'home-care-agencies.html',
    title: 'Websites for Texas Home Care Agencies | A2H',
    description: 'Websites with an AI chat and a CRM lead list for Texas home care agencies. Family questions answered in the evening, no clinical records. Free sample site first.',
    jsonLd: [ORG, svcLd('Websites with AI chat and CRM for home care agencies', HOME_ANSWER, NICHES.home.audience), faqLd(HOME_FAQ),
      crumbs([{ name: 'Home care agencies', slug: 'home-care-agencies.html' }])],
    body: [
      hero({
        eyebrow: 'Home care agencies, Texas',
        h1: 'Websites for Texas home care agencies.',
        sub: 'Families looking for care reach out when they have a minute, not when your office is open. The chat on your site answers their questions, takes their details, and saves them to a list your office works each morning.',
        secondary: ['See pricing', 'pricing.html'],
      }),
      answer(HOME_ANSWER),
      cards('What we build', 'Built around how families actually reach out', [
        { tag: 'First screen', h: 'Service area and how to start', p: 'The cities you cover and the first step, visible without scrolling, with a tappable number.' },
        { tag: 'AI chat', h: 'Answered day and night', p: 'Evenings, weekends and busy mornings: the family gets an answer on the first try, and their details are taken.' },
        { tag: 'CRM', h: 'Every inquiry in one list', p: 'Name, who needs care and a callback number, saved in one place for your office, with spam filtered out.' },
        { tag: 'Add-on', h: 'Google Business Profile', p: 'Claimed, categorised and wired to the site, because families often start with the map result. Quoted on the call.' },
      ]),
      fit('home care agencies'),
      guides('home'),
      B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
      faqSection(HOME_FAQ),
      relatedLinks([['industries.html', 'All industries'], ['medical.html', 'Medical practices'], ['dental-practices.html', 'Dental practices'], ['orthodontic-practices.html', 'Orthodontic practices']], DEMO_NOTE),
      B.ctaBand({}),
    ].join('\n\n'),
  });

  return { pages, guides, fit };
};
