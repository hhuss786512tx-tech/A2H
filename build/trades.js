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

  // Plain-language answer block, kept near the top for people and for AI search.
  const answer = (text) => `<section class="px-5 sm:px-6 pb-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal grid lg:grid-cols-12 gap-6 border-t hairline pt-8">
      <p class="lg:col-span-3 text-sm font-semibold text-sand">In short</p>
      <p class="lg:col-span-8 text-sand text-[17px] leading-[1.7] max-w-3xl text-pretty">${text}</p>
    </div>
  </div>
</section>`;

  // Three figures from our own scan, laid out as plain numbers with a rule above each.
  const scan = (t) => `<section class="py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal max-w-2xl mb-12">
      <p class="eyebrow mb-4">Our own data</p>
      <h2 class="display-lg text-sand">How many Texas ${t.plural} websites have a chat or online booking?</h2>
      <p class="lede mt-4">Few. Of ${t.n} Texas ${t.plural} websites A2H scanned in October 2026, ${t.noChat}% had no chat we could detect and ${t.noBook}% had no way to book online. We checked each company's homepage and contact pages, with a Texas address required and call-reselling and directory sites removed.</p>
    </div>
    <div class="stagger grid sm:grid-cols-3 gap-x-8 gap-y-10">
      <div class="border-t border-copper-light/60 pt-6"><p class="figure text-sand" style="font-size:clamp(3rem,6vw,4.5rem)"><span data-countup="${t.noChat}">${t.noChat}</span>%</p><p class="text-fog mt-3 max-w-[18rem]">had no chat we could detect</p></div>
      <div class="border-t hairline pt-6"><p class="figure text-sand" style="font-size:clamp(3rem,6vw,4.5rem)"><span data-countup="${t.noBook}">${t.noBook}</span>%</p><p class="text-fog mt-3 max-w-[18rem]">had no way to book online</p></div>
      <div class="border-t hairline pt-6"><p class="figure text-sand" style="font-size:clamp(3rem,6vw,4.5rem)"><span data-countup="${t.third[0]}">${t.third[0]}</span>%</p><p class="text-fog mt-3 max-w-[18rem]">${t.third[1]}</p></div>
    </div>
    <p class="reveal text-xs text-fog/70 mt-10 max-w-xl">The scan only spots common chat tools, so the real "no chat" share may be a little lower. <a href="houston-trade-website-scan-2026.html" class="link-underline text-sand">Full 2026 scan results and method</a>.</p>
  </div>
</section>`;

  // Sample conversation inside a phone, with the "what happens next" beside it.
  const chatDemo = (t) => `<section class="py-24 px-5 sm:px-6 bg-surface/40 border-y hairline">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
    <div class="reveal lg:col-span-6 order-2 lg:order-1">
      <p class="text-sm text-fog tnum mb-3">${t.time}</p>
      <h2 class="display-lg text-sand">${t.moment}</h2>
      <p class="lede mt-5">The chat on your site answers in the homeowner's words, takes the details, and the lead lands in your CRM marked by urgency. You call back from one list.</p>
      <p class="text-sm text-fog/70 mt-6">Sample conversation on a sample site.</p>
    </div>
    <div class="reveal lg:col-span-5 lg:col-start-8 order-1 lg:order-2 flex justify-center lg:justify-end">
      <div class="phone-frame drift">
        <div class="phone-screen tall flex flex-col">
          <div class="phone-notch"></div>
          <div class="flex items-center justify-between px-4 pt-3 pb-1 text-[10px] font-semibold text-sand tnum"><span>${t.time.replace(/ [AP]M/, '')}</span><span></span></div>
          <div class="flex items-center gap-2.5 px-4 py-2.5 border-b hairline">
            <span class="h-7 w-7 rounded-full bg-copper flex items-center justify-center text-[10px] font-bold text-ink shrink-0">${t.initials}</span>
            <div class="min-w-0"><p class="text-xs font-semibold text-sand truncate">${t.sample}</p><p class="text-[10px] text-fog">Website chat, replies any hour</p></div>
          </div>
          <div class="bubble-thread flex-1 overflow-hidden px-3 py-3 space-y-2 text-[11px] leading-snug">
            <div class="chat-bubble flex justify-end"><div class="max-w-[82%] bubble-user px-3 py-2">${t.q}</div></div>
            <div class="typing-indicator flex justify-start"><div class="bubble-ai px-3.5 py-2.5 flex items-center gap-1"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>
            <div class="chat-bubble flex justify-start"><div class="max-w-[82%] bubble-ai px-3 py-2">${t.a}</div></div>
            <div class="chat-bubble flex justify-end"><div class="max-w-[82%] bubble-user px-3 py-2">${t.reply}</div></div>
            <div class="typing-indicator flex justify-start"><div class="bubble-ai px-3.5 py-2.5 flex items-center gap-1"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div></div>
            <div class="chat-bubble flex justify-start"><div class="max-w-[82%] bubble-ai px-3 py-2">${t.a2}</div></div>
          </div>
          <div class="px-3 pb-3 pt-1"><div class="flex items-center gap-2 bg-live/10 border border-live/30 rounded-full px-3 py-1.5"><span class="h-1.5 w-1.5 rounded-full bg-live shrink-0"></span><span class="text-[10px] text-sand/90 flex-1">Saved to lead list: ${t.tag}</span></div></div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const TRADES = [
    {
      slug: 'foundation-repair-websites.html', name: 'Foundation repair', plural: 'foundation repair', audience: 'Foundation repair companies',
      title: 'Websites for Foundation Repair Companies in Texas | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas foundation repair companies. Free sample site first, $800 to $2,000 one time.',
      h1: 'Websites for Texas foundation repair companies.',
      sub: 'A fast site that answers "do you do free inspections?" at 10 PM, takes the homeowner\'s name, number and address, and saves it to one lead list you check in the morning.',
      short: 'A2H builds websites for Texas foundation repair companies: a fast, hand-coded site with an AI chat that answers common questions (free inspections, slab vs. pier and beam, service area) and saves every lead to a CRM. You see a free sample site for your company first. Builds are $800 to $2,000 one time, depending on size.',
      n: 75, noChat: 71, noBook: 85, third: [21, 'had no contact form at all'],
      time: '10:14 PM', moment: 'A crack in the garage slab.', sample: 'Sample Foundation Co.', initials: 'SF',
      q: 'Found a crack in my garage slab. Do you do free inspections?', a: 'We do. What\'s your address and a good number? The owner will call you tomorrow morning.', reply: '1418 Oak Run, Plano. 214-555-0118.', a2: 'Got it. You\'re on the list, and the owner has your details.', tag: 'warm, this week, slab crack',
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
      h1: 'Websites for Texas restoration companies.',
      sub: 'When water is coming through a ceiling at midnight, the homeowner messages whoever answers first. The chat answers, takes the address and number, marks it urgent, and drops it in your lead list.',
      short: 'A2H builds websites for Texas water damage restoration companies: a fast, hand-coded site with an AI chat that answers at any hour, takes the homeowner\'s address, number and what happened, and saves it to a CRM marked by urgency. You see a free sample site for your company first. Builds are $800 to $2,000 one time, depending on size.',
      n: 117, noChat: 74, noBook: 89, third: [45, 'had no contact form at all'],
      time: '11:48 PM', moment: 'Water through a kitchen ceiling.', sample: 'Sample Restoration Co.', initials: 'SR',
      q: 'Water is coming through my kitchen ceiling. Can someone come tonight?', a: 'I can help. What\'s the address and best number? I\'m sending this to the owner right now.', reply: '220 Cedar Bend, Katy. 281-555-0134.', a2: 'Sent. It\'s marked urgent and the owner has your number.', tag: 'hot, tonight, ceiling leak',
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
      h1: 'Websites for Texas garage door companies.',
      sub: 'A spring snaps at 6:40 AM with the car stuck inside. The chat on your site answers while you\'re on another job, takes the address and number, and puts it at the top of your lead list.',
      short: 'A2H builds websites for Texas garage door companies: a fast, hand-coded site with an AI chat that answers while you\'re on a job, takes the homeowner\'s address and number, and saves it to a CRM marked by urgency. You see a free sample site for your company first. Builds are $800 to $2,000 one time, depending on size.',
      n: 278, noChat: 79, noBook: 85, third: [32, 'showed a copyright year of 2024 or older'],
      time: '6:40 AM', moment: 'Spring snaps. Car stuck inside.', sample: 'Sample Garage Door Co.', initials: 'SG',
      q: 'My garage spring just snapped and my car is stuck inside. Can someone come this morning?', a: 'Sorry about that. What\'s your address and best number? I\'m flagging this as urgent for the owner now.', reply: '1418 Oak Run, San Antonio. 210-555-0118.', a2: 'Got it. You\'re at the top of the list and the owner has your number.', tag: 'hot, this morning, broken spring',
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
      hero({ eyebrow: `${t.name}, Texas`, h1: t.h1, sub: t.sub, primary: 'Get a free sample site', secondary: ['See pricing', 'pricing.html'] }),
      answer(t.short),
      scan(t),
      chatDemo(t),
      cards('What we build', `What should a ${t.plural} website include?`, t.items),
      B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
      faqSection(t.faq),
      B.ctaBand({}),
    ].join('\n\n'),
  }));
};
