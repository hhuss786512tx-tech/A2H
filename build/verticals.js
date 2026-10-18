// Trade / vertical landing pages, generated from one template so every page
// gets the same structure: answer-first summary, 4 trade-specific cards,
// published pricing, a real FAQ (with matching FAQPage schema) and sibling links.
//
// NOTE: all trade pages here are OFF-NICHE (noindex, out of the sitemap). Only dental-practices.html is an active niche.
// Copy rule: only claim what the product does today (answers calls,
// asks what the job is and how urgent, books onto the calendar, logs the contact
// in the CRM, warm-transfers, keeps the customer's own number, flat pricing).
// No invented statistics, no named integrations, no compliance claims.

module.exports = function verticals({ SITE, ORG, serviceLd, faqLd, hero, cards, faqSection, B, guides, fit }) {
  const breadcrumbLd = (name, slug) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: SITE + '/industries.html' },
      { '@type': 'ListItem', position: 3, name, item: `${SITE}/${slug}` },
    ],
  });

  // Same four answers on every page, worded for the trade. These are the
  // questions an AI assistant is most likely to be asked about the product.
  const sharedFaq = (who, callWord) => [
    [`How much does an AI receptionist cost for ${who}?`, 'A2H publishes its pricing: AI Receptionist + CRM is $1,500 one-time setup, then $397 per month, with no long-term contract. An extra CRM seat is $99 per month. Adding a hand-coded website with Google Business Profile setup is $2,000 setup and $400 per month.'],
    ['Do I have to change my business number?', 'No porting and no new number for your callers. You set your existing line to forward to the receptionist when it is busy or unanswered.'],
    [`What happens when a ${callWord} needs a real person?`, 'It can transfer the call to you or your team, or take a message and flag the contact in our custom CRM.'],
    ['Do I need a new website to use it?', 'No. AI Receptionist + CRM works on its own. The Custom Website tier is optional and adds a hand-coded site and Google Business Profile setup.'],
  ];

  const related = (current) => {
    const links = [
      ['dental-practices.html', 'Dental practices'], ['orthodontic-practices.html', 'Orthodontic practices'], ['home-care-agencies.html', 'Home care agencies'],
    ].filter(([s]) => s !== current);
    return `<section class="py-16 px-6">
  <div class="max-w-3xl mx-auto text-center">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-4">Other industries</p>
    <div class="reveal flex flex-wrap justify-center gap-3">
${links.map(([s, n]) => `      <a href="${s}" class="btn-primary text-sand border border-white/15 hover:border-copper-light/60 font-semibold px-5 py-2.5 rounded-full text-sm">${n}</a>`).join('\n')}
    </div>
    <p class="reveal text-sm text-fog mt-8">Hear a <a href="demo.html" class="link-underline text-copper-light">demo call</a> (a recorded test call with a fictional business and caller). Pricing is on the <a href="pricing.html" class="link-underline text-copper-light">pricing page</a>.</p>
  </div>
</section>`;
  };

  // Answer-first block: one self-contained paragraph an AI assistant (or a
  // searcher) can lift as the direct answer to "what is this / what does it cost".
  const answer = (text) => `<section class="px-6 pb-4">
  <div class="max-w-3xl mx-auto">
    <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated p-7">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">The short answer</p>
      <p class="text-sand text-[15px] leading-[1.8]">${text}</p>
    </div>
  </div>
</section>`;

  const defs = [
    {
      slug: 'hvac.html',
      who: 'an HVAC company',
      callWord: 'call',
      name: 'HVAC',
      title: 'AI Receptionist for Texas HVAC Companies | A2H',
      description: 'AI receptionist + CRM for Texas HVAC companies: every service call answered and booked, even at 2 a.m. in July. $1,500 setup, $397/mo.',
      eyebrow: 'For Texas HVAC Companies',
      h1: 'Every service call answered, <span class="italic text-copper-light">even in July.</span>',
      sub: 'When a no-cool call comes in, your techs are on a roof or in an attic. The AI Receptionist answers instantly, finds out what is wrong and how urgent it is, and books the visit.',
      answer: 'An AI receptionist for an HVAC company answers every inbound call, asks whether it is a no-cool or no-heat emergency or routine maintenance, books the service visit, and logs the customer in a CRM. A2H sets this up for Texas HVAC companies for $1,500 one-time and $397 per month, with no long-term contract.',
      cardsHeading: 'Built for a business that gets slammed in bursts',
      cards: [
        { tag: 'Heat waves and cold snaps', h: 'Nobody waits for a tech to climb down', p: 'Calls arrive in bursts when the weather turns. The AI Receptionist answers each one instantly instead of letting it ring while your crew is on a job.' },
        { tag: 'Emergency or routine', h: 'It asks how urgent it is', p: 'It finds out what the problem is and whether the customer has no cooling or no heat, then books the visit or flags it to you so an urgent job never sits until morning.' },
        { tag: 'Nothing lost between jobs', h: 'Every call lands in the CRM', p: 'The caller\'s name, the problem and a callback number are logged automatically in your pipeline board, so follow-ups do not depend on a sticky note in the truck.' },
        { tag: 'Found without ads', h: 'Google Business Profile', p: 'On the Custom Website tier your profile is claimed and tuned, so you show up in the Maps results for "AC repair near me" in your city.' },
      ],
      faq: [
        ['Can the AI tell an emergency AC call from a routine one?', 'It asks what the problem is and how urgent it is, then books the visit or alerts you right away when it hits something only you should decide. You decide how your business handles after-hours emergencies.'],
        ['What about calls during a heat wave when everyone is booked?', 'Every call is still answered and logged. The AI books the visit, and anything it cannot place is flagged to you instead of going to voicemail.'],
      ],
    },
    {
      slug: 'plumbing.html',
      who: 'a plumbing company',
      callWord: 'call',
      name: 'Plumbing',
      title: 'AI Receptionist for Texas Plumbers | A2H',
      description: 'AI receptionist + CRM for Texas plumbers: every call answered and booked, burst pipes at midnight included. $1,500 setup, $397/mo.',
      eyebrow: 'For Texas Plumbers',
      h1: 'The burst pipe call at midnight <span class="italic text-copper-light">gets answered.</span>',
      sub: 'Plumbing customers call whoever picks up first. The AI Receptionist answers every call, finds out what is leaking and how bad it is, and books the job or gets it to you.',
      answer: 'An AI receptionist for a plumbing company answers every inbound call, asks what the problem is and how urgent it is, books the visit, and logs the customer in a CRM. A2H sets this up for Texas plumbers for $1,500 one-time and $397 per month, with no long-term contract.',
      cardsHeading: 'Built for a trade where the first answer wins the job',
      cards: [
        { tag: 'First to answer', h: 'No call goes to voicemail', p: 'A customer with water on the floor will call the next plumber on the list. The AI Receptionist picks up instantly, day or night, while you are under a sink.' },
        { tag: 'How bad is it', h: 'It asks about urgency', p: 'It finds out what the problem is and how urgent, then books the visit or alerts you straight away when it is something that cannot wait.' },
        { tag: 'Nothing falls through', h: 'Every job in your CRM', p: 'Name, issue and callback number logged automatically in your own pipeline board, so quotes and follow-ups are not scattered across call logs.' },
        { tag: 'Found locally', h: 'Maps and reviews', p: 'The Custom Website tier includes Google Business Profile setup, because most "plumber near me" searches end at the map result.' },
      ],
      faq: [
        ['Will the AI handle after-hours plumbing emergencies?', 'It answers every call after hours, asks what is happening and how urgent it is, and books the visit or flags it to you. You set how your business handles true emergencies.'],
        ['Can it quote a price?', 'It books the visit and collects the details. Quoting is your call. Anything that needs a decision from you is passed to you rather than guessed at.'],
      ],
    },
    {
      slug: 'roofing.html',
      who: 'a roofing company',
      callWord: 'call',
      name: 'Roofing',
      title: 'AI Receptionist for Texas Roofers | A2H',
      description: 'AI receptionist + CRM for Texas roofing companies: every storm-season call answered and booked into an estimate. $1,500 setup, $397/mo.',
      eyebrow: 'For Texas Roofing Companies',
      h1: 'Storm season brings the calls. <span class="italic text-copper-light">Answer all of them.</span>',
      sub: 'After a hailstorm the phones light up, and homeowners book whoever responds first. The AI Receptionist answers every call and books the estimate while your crews are on roofs.',
      answer: 'An AI receptionist for a roofing company answers every inbound call, finds out what the roof problem is and how urgent it is, books the estimate, and logs the homeowner in a CRM. A2H sets this up for Texas roofers for $1,500 one-time and $397 per month, with no long-term contract.',
      cardsHeading: 'Built for a business with sudden surges of leads',
      cards: [
        { tag: 'Hail and wind season', h: 'Every storm lead answered', p: 'When a storm hits, the calls come all at once. The AI Receptionist answers each one instead of letting leads roll over to the next roofer.' },
        { tag: 'Estimate booked', h: 'Booked during the call', p: 'It asks what happened to the roof and books the estimate directly, and warm-transfers to you when a call needs a person.' },
        { tag: 'Nothing lost', h: 'Every lead in the CRM', p: 'Each homeowner is logged with what they reported, so a surge of leads becomes a pipeline you can work instead of a pile of missed calls.' },
        { tag: 'Found locally', h: 'Google Business Profile', p: 'Included on the Custom Website tier, so you appear in the Maps results when someone searches for a roofer in your city.' },
      ],
      faq: [
        ['Can it handle a flood of calls after a storm?', 'Every call is answered and logged, and estimates are booked. Anything it cannot place is flagged to you rather than dropped.'],
        ['Does it work with insurance-claim roofing leads?', 'It captures the homeowner\'s name, what happened and a callback number, and books the estimate. How you handle the claim after that is up to you.'],
      ],
    },
    {
      slug: 'electrical.html',
      who: 'an electrical contractor',
      callWord: 'call',
      name: 'Electrical',
      title: 'AI Receptionist for Texas Electricians | A2H',
      description: 'AI receptionist + CRM for Texas electricians: every call answered and booked while you are on the job. $1,500 setup, $397/mo.',
      eyebrow: 'For Texas Electricians',
      h1: 'You cannot answer the phone <span class="italic text-copper-light">inside a panel.</span>',
      sub: 'Electrical work needs your full attention, and missed calls go to the next electrician on Google. The AI Receptionist answers every call and books the job for you.',
      answer: 'An AI receptionist for an electrical contractor answers every inbound call, asks what the job is and how urgent it is, books the visit, and logs the customer in a CRM. A2H sets this up for Texas electricians for $1,500 one-time and $397 per month, with no long-term contract.',
      cardsHeading: 'Built for work you cannot pause to take a call',
      cards: [
        { tag: 'Hands on the job', h: 'Answered while you work', p: 'You should not stop mid-job to pick up. The AI Receptionist answers instantly so the caller is not left to try someone else.' },
        { tag: 'Urgent or scheduled', h: 'It asks what the job is', p: 'It finds out what is needed and how urgent, then books the visit or flags it to you when it cannot wait.' },
        { tag: 'Nothing falls through', h: 'Every contact in the CRM', p: 'Name, the work needed and a callback number logged automatically in your own pipeline board.' },
        { tag: 'Found locally', h: 'Google Business Profile', p: 'The Custom Website tier includes Google Business Profile setup, so you are visible when someone searches for an electrician near them.' },
      ],
      faq: [
        ['Can it book different kinds of electrical jobs?', 'It asks what the job is, from a dead outlet to a panel upgrade, and books the visit. Jobs that need your judgment are passed to you.'],
        ['What if a caller reports a safety hazard?', 'It flags anything urgent to you immediately and warm-transfers when a call needs a person. You decide your own emergency process.'],
      ],
    },
    {
      slug: 'dental-practices.html',
      who: 'a dental practice',
      callWord: 'patient call',
      name: 'Dental practices',
      title: 'AI Receptionist for Texas Dental Practices | A2H',
      description: 'AI receptionist + CRM for Texas dental practices: every patient call answered and booked. $1,500 setup, $397/mo, no contract.',
      eyebrow: 'For Texas Dental Practices',
      h1: 'Every patient call answered, <span class="italic text-copper-light">even at lunch.</span>',
      sub: 'The front desk cannot answer every line during check-in, lunch or after hours. A2H answers instantly, books the appointment, and tracks every call and caller in our custom CRM.',
      answer: 'An AI receptionist for a dental practice answers every inbound call, collects the patient\'s name and reason for calling, books the appointment, and tracks every call and caller in a custom CRM. It handles scheduling only, never clinical data. A2H sets this up for Texas dental practices for $1,500 one-time and $397 per month, with no long-term contract.',
      cardsHeading: 'Built around how patients actually choose a dentist',
      cards: [
        { tag: 'Never voicemail', h: 'Answered at lunch and after hours', p: 'No patient is sent to voicemail because the front desk was busy with check-in or the office was closed.' },
        { tag: 'Booked, not just noted', h: 'The appointment, during the call', p: 'The AI Receptionist books the visit while the patient is on the line, and can transfer to your front desk when the call needs a person.' },
        { tag: 'Nothing lost', h: 'Every caller in our custom CRM', p: 'Name, reason for calling and callback details tracked automatically in one place.' },
        { tag: 'Found locally', h: 'Maps and reviews', p: 'On the Custom Website tier Google Business Profile is claimed and tuned, because the map result and its reviews are what most patients see first.' },
      ],
      faq: [
        ['Is the AI receptionist HIPAA compliant?', 'The AI Receptionist and CRM handle scheduling, not clinical data. Calls collect only a name, the reason for the call and callback details so your staff can follow up. If you need intake that touches protected health information, that belongs in dedicated HIPAA-compliant software, and we link to it rather than rebuild it.'],
        ['Does it handle insurance or clinical questions?', 'It handles the front-desk call: answering, collecting the basics and booking. Anything clinical or insurance-specific is passed to your team rather than answered by the AI.'],
        ['Do you work with dental practices across Texas?', 'A2H sets the receptionist up remotely for Texas practices, including those around Houston, Dallas, Austin, San Antonio and Fort Worth.'],
      ],
    },
  ];

  return defs.map((d) => {
    const { who, callWord } = d;
    const faq = [...d.faq, ...sharedFaq(who, callWord)];
    return {
      slug: d.slug,
      noindex: d.slug !== 'dental-practices.html', // trades are off-niche: live but noindex
      title: d.title,
      description: d.description,
      jsonLd: [
        ORG,
        serviceLd(`AI receptionist for ${d.name.toLowerCase()}`, d.answer, d.name),
        faqLd(faq),
        breadcrumbLd(d.name, d.slug),
      ],
      body: [
        hero({ eyebrow: d.eyebrow, h1: d.h1, sub: d.sub, secondary: ['Hear a demo call', 'demo.html'] }),
        answer(d.answer),
        cards('What Changes', d.cardsHeading, d.cards),
        ...(d.slug === 'dental-practices.html' ? [fit('dental practices'), guides('dental')] : []),
        ...(d.slug === 'dental-practices.html' ? [] : [B.pricingTable({ heading: 'Flat pricing, published openly' })]),
        faqSection(faq),
        related(d.slug),
      ].join('\n\n'),
    };
  });
};
