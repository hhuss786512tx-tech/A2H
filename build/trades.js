// Trade landing pages for A2H's current ICP (2026-10): Texas foundation repair, water damage restoration and
// garage door companies. Offer: a website with an AI chat and a CRM lead list, free sample site first,
// $800-$2,000 one time.
//
// COPY RULES:
//  - Stats come ONLY from A2H's own scan of Texas trade websites (Oct 2026, Texas address on the site,
//    call-reselling/lead-gen sites removed). The scan only detects common chat tools, so "no chat" is a floor.
//  - Never say the chat or receptionist books jobs "on your calendar"; never mention SMS/texts.
//  - No invented results, testimonials, rankings or guarantees.

module.exports = function tradePages({ SITE, ORG, faqLd, hero, cards, faqSection, B }) {
  const svcLd = (name, description, audience) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': SITE + '/#organization' },
    areaServed: { '@type': 'State', name: 'Texas' },
    audience: { '@type': 'BusinessAudience', audienceType: audience },
    offers: { '@type': 'Offer', priceCurrency: 'USD', priceSpecification: { '@type': 'PriceSpecification', minPrice: '800', maxPrice: '2000', priceCurrency: 'USD' } },
  });
  const crumbs = (name, slug) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [['Home', ''], ['Industries', 'industries.html'], [name, slug]].map(([n, s], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: `${SITE}/${s}` })),
  });
  const answer = (text) => `<section class="px-6 pb-4">
  <div class="max-w-3xl mx-auto">
    <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated p-7">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">The short answer</p>
      <p class="text-sand text-[15px] leading-[1.8]">${text}</p>
    </div>
  </div>
</section>`;
  const scan = (t) => `<section class="py-20 px-6">
  <div class="max-w-4xl mx-auto">
    <div class="reveal text-center mb-10">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Our own data</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">We scanned ${t.n} Texas ${t.plural} websites</h2>
      <p class="text-fog text-sm mt-3 max-w-2xl mx-auto">October 2026. Each company's homepage and contact pages, Texas address required, call-reselling and directory sites removed. The scan only spots common chat tools, so the real "no chat" share may be a little lower.</p>
    </div>
    <div class="reveal grid sm:grid-cols-3 gap-5">
      <div class="rounded-2xl bg-elevated border border-copper-light/30 shadow-elevated p-7 text-center"><p class="font-display text-copper-light leading-none mb-3" style="font-size:clamp(2.25rem,6vw,3rem)">${t.noChat}%</p><p class="text-sm text-fog">had no chat we could detect</p></div>
      <div class="rounded-2xl bg-elevated border border-white/5 shadow-elevated p-7 text-center"><p class="font-display text-copper-light leading-none mb-3" style="font-size:clamp(2.25rem,6vw,3rem)">${t.noBook}%</p><p class="text-sm text-fog">had no way to book online</p></div>
      <div class="rounded-2xl bg-elevated border border-white/5 shadow-elevated p-7 text-center"><p class="font-display text-copper-light leading-none mb-3" style="font-size:clamp(2.25rem,6vw,3rem)">${t.third[0]}%</p><p class="text-sm text-fog">${t.third[1]}</p></div>
    </div>
  </div>
</section>`;
  const chatDemo = (t) => `<section class="py-20 px-6 bg-surface/40 border-y border-white/5">
  <div class="max-w-3xl mx-auto">
    <div class="reveal text-center mb-8">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">What the chat does</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.02em] text-sand">${t.time}. ${t.moment}</h2>
      <p class="text-fog text-sm mt-3">Sample conversation on a sample site.</p>
    </div>
    <div class="reveal rounded-2xl bg-elevated border border-white/10 shadow-elevated p-6 space-y-3 text-sm">
      <div class="flex justify-end"><p class="max-w-[85%] bg-white/10 text-sand rounded-2xl rounded-br-sm px-4 py-3">${t.q}</p></div>
      <div class="flex justify-start"><p class="max-w-[85%] bg-gradient-to-br from-[#0b93f6] to-[#0066e0] text-white rounded-2xl rounded-bl-sm px-4 py-3">${t.a}</p></div>
      <div class="flex justify-end"><p class="max-w-[85%] bg-white/10 text-sand rounded-2xl rounded-br-sm px-4 py-3">${t.reply}</p></div>
      <p class="text-xs text-live pt-2">&#10003; Saved to your lead list: ${t.tag}</p>
    </div>
  </div>
</section>`;

  const TRADES = [
    {
      slug: 'foundation-repair-websites.html', name: 'Foundation repair', plural: 'foundation repair', audience: 'Foundation repair companies',
      title: 'Websites for Foundation Repair Companies in Texas | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas foundation repair companies. Free sample site first, $800 to $2,000 one time.',
      h1: 'Websites for Texas <span class="italic text-copper-light">foundation repair</span> companies',
      sub: 'A fast site that answers "do you do free inspections?" at 10 PM, takes the homeowner\'s name, number and address, and saves it to one lead list you check in the morning.',
      short: 'A2H builds websites for Texas foundation repair companies: a fast, hand-coded site with an AI chat that answers common questions (free inspections, slab vs. pier and beam, service area) and saves every lead to a CRM. You see a free sample site for your company first. Builds are $800 to $2,000 one time, depending on size.',
      n: 75, noChat: 71, noBook: 85, third: [21, 'had no contact form at all'],
      time: '10:14 PM', moment: 'A crack in the garage slab.',
      q: 'Found a crack in my garage slab. Do you do free inspections?', a: 'We do. What\'s your address and a good number? The owner will call you tomorrow morning.', reply: '1418 Oak Run, Plano. 214-555-0118.', tag: 'warm · this week · slab crack',
      items: [
        { tag: 'Free inspection', h: 'The offer, up top', p: 'Homeowners want to know if the first look is free. The site says so on the first screen, with a tappable phone number.' },
        { tag: 'Service area', h: 'Cities you actually cover', p: 'Your real service area listed in plain text, so homeowners (and search engines) can see you work their city.' },
        { tag: 'AI chat', h: 'Answers after hours', p: 'Trained on your business. It answers the common questions and takes the name, number, address and what they found.' },
        { tag: 'CRM', h: 'One lead list', p: 'Every chat and form lands in one place, tagged by urgency, with spam filtered out before you see it.' },
      ],
      faq: [
        ['How much does a foundation repair website cost?', 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features. That includes the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
        ['What does the AI chat say to homeowners?', 'It answers from the information you give us: your services, service area, whether inspections are free, and how to reach you. When it can\'t answer, it takes the homeowner\'s details and passes the question to you.'],
        ['Can I see it before I pay?', 'Yes. We build a sample site with your company name, trade and service area, and walk you through it on a 15-minute call. If you don\'t want it, you don\'t pay.'],
      ],
    },
    {
      slug: 'restoration-websites.html', name: 'Water damage restoration', plural: 'water damage restoration', audience: 'Water damage restoration companies',
      title: 'Websites for Water Damage Restoration Companies in Texas | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas water damage restoration companies. Free sample site first, $800 to $2,000 one time.',
      h1: 'Websites for Texas <span class="italic text-copper-light">restoration</span> companies',
      sub: 'When water is coming through a ceiling at midnight, the homeowner messages whoever answers first. The chat answers, takes the address and number, marks it urgent, and drops it in your lead list.',
      short: 'A2H builds websites for Texas water damage restoration companies: a fast, hand-coded site with an AI chat that answers at any hour, takes the homeowner\'s address, number and what happened, and saves it to a CRM marked by urgency. You see a free sample site for your company first. Builds are $800 to $2,000 one time, depending on size.',
      n: 117, noChat: 74, noBook: 89, third: [45, 'had no contact form at all'],
      time: '11:48 PM', moment: 'Water through a kitchen ceiling.',
      q: 'Water is coming through my kitchen ceiling. Can someone come tonight?', a: 'I can help. What\'s the address and best number? I\'m sending this to the owner right now.', reply: '220 Cedar Bend, Katy. 281-555-0134.', tag: 'hot · tonight · ceiling leak',
      items: [
        { tag: '24/7', h: 'Says you answer at night', p: 'Emergency hours and a tappable number on the first screen, because most water calls don\'t wait for business hours.' },
        { tag: 'AI chat', h: 'Answers in seconds', p: 'Takes the address, number and what happened, and flags it urgent so it\'s the first thing you see.' },
        { tag: 'CRM', h: 'New, contacted, scheduled, booked', p: 'Every lead moves through one pipeline, so nobody on your team calls the same homeowner twice or forgets to call.' },
        { tag: 'Spam filter', h: 'Junk stays out', p: 'Fake form fills and spam are filtered before they reach your lead list.' },
      ],
      faq: [
        ['How much does a restoration company website cost?', 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features, including the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
        ['Does the chat work at night and on weekends?', 'Yes. It answers whenever someone types, takes their details, and saves the lead marked by urgency so you can call back first thing, or right away if you take night calls.'],
        ['Can I see it before I pay?', 'Yes. We build a sample site with your company name and service area and walk you through it on a 15-minute call. If you don\'t want it, you don\'t pay.'],
      ],
    },
    {
      slug: 'garage-door-websites.html', name: 'Garage door', plural: 'garage door', audience: 'Garage door repair and installation companies',
      title: 'Websites for Garage Door Companies in Texas | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas garage door repair companies. Free sample site first, $800 to $2,000 one time.',
      h1: 'Websites for Texas <span class="italic text-copper-light">garage door</span> companies',
      sub: 'A spring snaps at 6:40 AM with the car stuck inside. The chat on your site answers while you\'re on another job, takes the address and number, and puts it at the top of your lead list.',
      short: 'A2H builds websites for Texas garage door companies: a fast, hand-coded site with an AI chat that answers while you\'re on a job, takes the homeowner\'s address and number, and saves it to a CRM marked by urgency. You see a free sample site for your company first. Builds are $800 to $2,000 one time, depending on size.',
      n: 278, noChat: 79, noBook: 85, third: [32, 'showed a copyright year of 2024 or older'],
      time: '6:40 AM', moment: 'Spring snaps. Car stuck inside.',
      q: 'My garage spring just snapped and my car is stuck inside. Can someone come this morning?', a: 'Sorry about that. What\'s your address and best number? I\'m flagging this as urgent for the owner now.', reply: '1418 Oak Run, San Antonio. 210-555-0118.', tag: 'hot · this morning · broken spring',
      items: [
        { tag: 'Same-day', h: 'The services people search for', p: 'Broken springs, openers, off-track doors and new doors, each with its own section so homeowners find the right one fast.' },
        { tag: 'AI chat', h: 'Answers while you work', p: 'Takes the address, number and the problem while your hands are busy, so the homeowner doesn\'t call the next company.' },
        { tag: 'CRM', h: 'Call back from one list', p: 'Every chat and form in one place, marked by urgency. No digging through voicemail.' },
        { tag: 'Fast', h: 'Built for phones', p: 'Hand-coded and mobile-first, with a 90+ PageSpeed target and a tappable number at the top.' },
      ],
      faq: [
        ['How much does a garage door company website cost?', 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features, including the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
        ['What happens when the chat gets an emergency?', 'It takes the homeowner\'s address, number and problem, marks the lead urgent in your CRM, and tells them the owner has it. You decide when to call back.'],
        ['Can I see it before I pay?', 'Yes. We build a sample site with your company name and service area and walk you through it on a 15-minute call. If you don\'t want it, you don\'t pay.'],
      ],
    },
  ];

  return TRADES.map((t) => ({
    slug: t.slug,
    title: t.title,
    description: t.description,
    jsonLd: [ORG, svcLd(`Websites with AI chat and CRM for ${t.audience.toLowerCase()}`, t.short, t.audience), crumbs(t.name, t.slug), faqLd(t.faq)],
    body: [
      hero({ eyebrow: `${t.name} · Texas`, h1: t.h1, sub: t.sub, primary: 'Get A Free Sample Site', secondary: ['See Pricing', 'pricing.html'] }),
      answer(t.short),
      scan(t),
      chatDemo(t),
      cards('What we build', `What a ${t.plural} site needs`, t.items, 2),
      B.pricingTable({ heading: 'One-time price, free sample first' }),
      faqSection(t.faq),
      B.ctaBand({}),
    ].join('\n\n'),
  }));
};
