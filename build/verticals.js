// Off-niche vertical pages (HVAC, plumbing, roofing, electrical) and the dental hub,
// generated from one template so every page gets the same structure: hero,
// answer-first summary, 4 trade-specific rows, published pricing, FAQ (with
// matching FAQPage schema) and sibling links.
//
// All of these are noindex and out of the sitemap (RETIRED list / off-niche).
// They are kept live for old links only, so the copy here is deliberately neutral
// and matches the current offer: a website with an AI chat and a CRM lead list,
// $800-$2,000 one time, with the AI phone receptionist as an add-on quoted on
// the call. Rules: no "books the job / on your calendar", no monthly prices,
// no invented statistics, no named integrations, no compliance claims.

module.exports = function verticals({ SITE, ORG, serviceLd, faqLd, hero, cards, faqSection, answer, relatedLinks, B, guides, fit }) {
  const breadcrumbLd = (name, slug) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: SITE + '/industries.html' },
      { '@type': 'ListItem', position: 3, name, item: `${SITE}/${slug}` },
    ],
  });

  // Same answers on every page, worded for the trade.
  const sharedFaq = (who, callWord) => [
    [`How much does a website cost for ${who}?`, 'A2H builds are $800 to $2,000 one time, depending on the number of pages and features, including the AI chat and the CRM lead list. Hosting and upkeep are quoted on the call. You see a free sample site first.'],
    ['Do you offer an AI phone receptionist?', 'Yes, as an add-on to a website build. It answers calls when you cannot, takes the caller\'s name, number and what they need, and logs it to the same CRM. Pricing is quoted on the call.'],
    ['Do I have to change my business number?', 'No. Your number stays the same and goes at the top of the site, tappable on a phone. If you add the phone receptionist, your existing line forwards to it when it is busy or unanswered.'],
    [`What happens when a ${callWord} needs a real person?`, 'The chat passes anything it cannot answer to you, with the visitor\'s details. The phone receptionist add-on can transfer the call to you, or take a message and flag the contact in the CRM.'],
  ];

  const TRADE_LINKS = [['industries.html', 'All industries'], ['foundation-repair-websites.html', 'Foundation repair'], ['restoration-websites.html', 'Restoration'], ['garage-door-websites.html', 'Garage door']];
  const DEMO_NOTE = 'Hear the phone receptionist add-on on a <a href="demo.html" class="link-underline text-copper-light">recorded test call</a>. Pricing is on the <a href="pricing.html" class="link-underline text-copper-light">pricing page</a>.';

  const defs = [
    {
      slug: 'hvac.html',
      who: 'an HVAC company',
      callWord: 'call',
      name: 'HVAC',
      title: 'Websites for Texas HVAC Companies | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas HVAC companies. No-cool questions answered at any hour. Free sample site first, $800 to $2,000 one time.',
      eyebrow: 'HVAC, Texas',
      h1: 'Websites for Texas HVAC companies.',
      sub: 'When a no-cool message comes in, your techs are on a roof or in an attic. The chat on your site answers, takes the address and number, and puts the lead at the top of your list.',
      answer: 'A2H builds websites for Texas HVAC companies: a fast, hand-coded site with an AI chat that answers common questions (service area, emergency hours, what you work on), takes the customer\'s address, number and what is wrong, and saves it to a CRM marked by urgency. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size. An AI phone receptionist is available as an add-on.',
      cardsHeading: 'Built for a business that gets slammed in bursts',
      cards: [
        { tag: 'Heat waves', h: 'Answered while the crew is on a job', p: 'Messages arrive in bursts when the weather turns. The chat answers each one instead of letting it sit until someone climbs down.' },
        { tag: 'Urgency', h: 'It asks how urgent it is', p: 'No cooling in July is flagged hot and lands first in your list. Routine maintenance is logged as warm.' },
        { tag: 'CRM', h: 'Every lead in one place', p: 'Name, problem and callback number saved automatically, so follow-ups do not depend on a sticky note in the truck.' },
        { tag: 'Add-on', h: 'Google Business Profile', p: 'Claimed, categorised and wired to the site, so you show up in the map results for "AC repair near me" in your city. Quoted on the call.' },
      ],
      faq: [
        ['Can the chat tell an emergency AC job from a routine one?', 'It asks what the problem is and how urgent it is, then marks the lead hot or warm in your CRM. You decide how your business handles after-hours emergencies.'],
        ['What about a heat wave when everyone is booked?', 'Every message is still answered and logged. Nothing goes to voicemail, and you call back from one list in the order you choose.'],
      ],
    },
    {
      slug: 'plumbing.html',
      who: 'a plumbing company',
      callWord: 'call',
      name: 'Plumbing',
      title: 'Websites for Texas Plumbers | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas plumbers. Burst-pipe messages answered at midnight. Free sample site first, $800 to $2,000 one time.',
      eyebrow: 'Plumbing, Texas',
      h1: 'Websites for Texas plumbers.',
      sub: 'A customer with water on the floor messages whoever answers first. The chat on your site answers, takes the address and number, marks it urgent, and drops it in your lead list.',
      answer: 'A2H builds websites for Texas plumbing companies: a fast, hand-coded site with an AI chat that answers common questions (service area, emergency hours, what you handle), takes the customer\'s address, number and what is leaking, and saves it to a CRM marked by urgency. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size. An AI phone receptionist is available as an add-on.',
      cardsHeading: 'Built for a trade where the first answer wins the job',
      cards: [
        { tag: 'First to answer', h: 'No message goes unanswered', p: 'The chat replies in seconds, day or night, while you are under a sink.' },
        { tag: 'How bad is it', h: 'It asks about urgency', p: 'A burst pipe is flagged hot and lands first in your list. A slow drain is logged as warm.' },
        { tag: 'CRM', h: 'Every job in one list', p: 'Name, issue and callback number saved automatically, so quotes and follow-ups are not scattered across call logs.' },
        { tag: 'Add-on', h: 'Google Business Profile', p: 'Most "plumber near me" searches end at the map result. Setup is quoted on the call.' },
      ],
      faq: [
        ['Does the chat handle after-hours plumbing emergencies?', 'It answers whenever someone types, takes the address, number and what is happening, and marks the lead urgent so you see it first. How you handle true emergencies is up to you.'],
        ['Can it quote a price?', 'No. It collects the details and tells the customer you will call. Quoting is your call, and anything that needs a decision from you is passed to you rather than guessed at.'],
      ],
    },
    {
      slug: 'roofing.html',
      who: 'a roofing company',
      callWord: 'call',
      name: 'Roofing',
      title: 'Websites for Texas Roofers | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas roofing companies. Storm-season messages answered and logged. Free sample site first, $800 to $2,000 one time.',
      eyebrow: 'Roofing, Texas',
      h1: 'Websites for Texas roofing companies.',
      sub: 'After a hailstorm the messages come all at once, and homeowners go with whoever responds first. The chat on your site answers every one and lands it in your list while your crews are on roofs.',
      answer: 'A2H builds websites for Texas roofing companies: a fast, hand-coded site with an AI chat that answers common questions (free inspections, service area, insurance claims), takes the homeowner\'s address, number and what happened to the roof, and saves it to a CRM. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size. An AI phone receptionist is available as an add-on.',
      cardsHeading: 'Built for a business with sudden surges of leads',
      cards: [
        { tag: 'Storm season', h: 'Every lead answered', p: 'When a storm hits, the chat answers each message instead of letting leads roll over to the next roofer.' },
        { tag: 'Inspection', h: 'The offer, up top', p: 'Homeowners want to know if the first look is free. The site says so on the first screen, with a tappable number.' },
        { tag: 'CRM', h: 'A surge becomes a pipeline', p: 'Each homeowner is logged with what they reported, so a flood of leads is a list you can work instead of a pile of missed messages.' },
        { tag: 'Add-on', h: 'Google Business Profile', p: 'Claimed and wired to the site, so you appear in the map results when someone searches for a roofer in your city. Quoted on the call.' },
      ],
      faq: [
        ['Can it handle a flood of messages after a storm?', 'Yes. Every message is answered and logged in the order it arrived, with spam filtered out. Anything the chat cannot answer is passed to you with the homeowner\'s details.'],
        ['Does it work with insurance-claim roofing leads?', 'It captures the homeowner\'s name, what happened and a callback number. How you handle the claim after that is up to you.'],
      ],
    },
    {
      slug: 'electrical.html',
      who: 'an electrical contractor',
      callWord: 'call',
      name: 'Electrical',
      title: 'Websites for Texas Electricians | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas electricians. Messages answered while you are inside a panel. Free sample site first, $800 to $2,000 one time.',
      eyebrow: 'Electrical, Texas',
      h1: 'Websites for Texas electricians.',
      sub: 'Electrical work needs your full attention, and an unanswered message goes to the next electrician on Google. The chat on your site answers, takes the details, and puts the lead in your list.',
      answer: 'A2H builds websites for Texas electrical contractors: a fast, hand-coded site with an AI chat that answers common questions (service area, what you take on, how to reach you), takes the customer\'s address, number and what the job is, and saves it to a CRM. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size. An AI phone receptionist is available as an add-on.',
      cardsHeading: 'Built for work you cannot pause to take a call',
      cards: [
        { tag: 'Hands on the job', h: 'Answered while you work', p: 'You should not stop mid-job to reply. The chat answers so the customer is not left to try someone else.' },
        { tag: 'Urgent or scheduled', h: 'It asks what the job is', p: 'A dead panel is flagged hot. A ceiling fan install is logged as warm. You call back in the order that makes sense.' },
        { tag: 'CRM', h: 'Every contact in one list', p: 'Name, the work needed and a callback number saved automatically.' },
        { tag: 'Add-on', h: 'Google Business Profile', p: 'Claimed and wired to the site, so you are visible when someone searches for an electrician near them. Quoted on the call.' },
      ],
      faq: [
        ['Can it take different kinds of electrical jobs?', 'It asks what the job is, from a dead outlet to a panel upgrade, and logs it with the customer\'s details. Jobs that need your judgment are passed to you.'],
        ['What if a customer reports a safety hazard?', 'It marks the lead urgent so it lands first in your list, and tells the customer you will call. You decide your own emergency process.'],
      ],
    },
    {
      slug: 'dental-practices.html',
      who: 'a dental practice',
      callWord: 'patient inquiry',
      name: 'Dental practices',
      title: 'Websites for Texas Dental Practices | A2H',
      description: 'Websites with an AI chat and a CRM lead list for Texas dental practices. Patient questions answered at lunch and after hours, no clinical data. Free sample site first.',
      eyebrow: 'Dental practices, Texas',
      h1: 'Websites for Texas dental practices.',
      sub: 'The front desk cannot answer every question during check-in, lunch or after hours. The chat on your site answers the common ones, takes the patient\'s details, and saves them to a list your front desk works each morning.',
      answer: 'A2H builds websites for Texas dental practices: a fast, hand-coded site with hours, location and a tappable number first, an AI chat that answers common questions (hours, services, directions, new-patient steps) and takes the patient\'s name, reason for the inquiry and callback number, and a CRM where every inquiry lands. The chat and CRM handle inquiries, not clinical data. You see a free sample site first. Builds are $800 to $2,000 one time, depending on size. An AI phone receptionist is available as an add-on.',
      cardsHeading: 'Built around how patients actually choose a dentist',
      cards: [
        { tag: 'First screen', h: 'Hours, location, phone', p: 'The three things a patient checks before anything else, visible without scrolling and tappable on a phone.' },
        { tag: 'AI chat', h: 'Answered at lunch and after hours', p: 'Hours, services, directions, what to bring. It answers from what you give us and passes anything clinical or insurance-specific to your staff.' },
        { tag: 'No clinical data', h: 'Inquiries, not records', p: 'The chat collects a name, the reason for the inquiry and callback details. Anything that touches protected health information stays in your compliant software.' },
        { tag: 'CRM', h: 'Every inquiry in one list', p: 'Chats and form fills land in one place for your front desk, with spam filtered out first.' },
      ],
      faq: [
        ['Is this HIPAA compliant?', 'The chat and CRM handle inquiries and scheduling details, not clinical data. They collect a name, the reason for the inquiry and callback details so your staff can follow up. Anything that touches protected health information belongs in dedicated HIPAA-compliant software, and we link to it rather than rebuild it.'],
        ['Does it answer insurance or clinical questions?', 'No. It answers the front-desk questions: hours, services, directions, how to get started. Anything clinical or insurance-specific is passed to your team rather than answered by the AI.'],
        ['Do you work with dental practices across Texas?', 'Yes. A2H builds remotely for Texas practices, including those around Houston, Dallas, Austin, San Antonio and Fort Worth.'],
      ],
    },
  ];

  return defs.map((d) => {
    const { who, callWord } = d;
    const faq = [...d.faq, ...sharedFaq(who, callWord)];
    const isDental = d.slug === 'dental-practices.html';
    const links = isDental
      ? [['industries.html', 'All industries'], ['medical.html', 'Medical practices'], ['orthodontic-practices.html', 'Orthodontic practices'], ['home-care-agencies.html', 'Home care agencies']]
      : TRADE_LINKS;
    return {
      slug: d.slug,
      noindex: true, // off-niche or retired: live for old links, out of the sitemap
      title: d.title,
      description: d.description,
      jsonLd: [
        ORG,
        serviceLd(`Websites with AI chat and CRM for ${d.name.toLowerCase()}`, d.answer, d.name),
        faqLd(faq),
        breadcrumbLd(d.name, d.slug),
      ],
      body: [
        hero({ eyebrow: d.eyebrow, h1: d.h1, sub: d.sub, secondary: ['See pricing', 'pricing.html'] }),
        answer(d.answer),
        cards('What we build', d.cardsHeading, d.cards),
        ...(isDental ? [fit('dental practices'), guides('dental')] : []),
        B.pricingTable({ heading: 'One price, paid once. Free sample first.' }),
        faqSection(faq),
        relatedLinks(links, DEMO_NOTE),
        B.ctaBand({}),
      ].join('\n\n'),
    };
  });
};
