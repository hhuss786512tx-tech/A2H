// Original research page: A2H's October 2026 scan of Houston-area trade websites.
//
// COPY RULES:
//  - Every number comes from lead-gen/.tmp/free-leads-{foundation,restoration,garagedoor}-2026-10-11.csv
//    (tx_address_on_site=yes, lead_gen_site!=yes, one row per domain). Re-derive before changing any figure.
//  - The scan covered 58 cities in the Houston area and Southeast Texas, not all of Texas. Say so.
//  - Detection only finds common chat tools, so "no chat" is an upper bound. Say so.
//  - Never publish business names or contact details from the scan (lead PII).

module.exports = function researchPage({ SITE, ORG, faqLd, hero, answer, figures, faqSection, relatedLinks, B }) {
  const slug = 'houston-trade-website-scan-2026.html';
  const url = `${SITE}/${slug}`;
  const published = '2026-10-22';
  const title = '76% of Houston-Area Trade Websites Have No Chat (2026 Scan)';

  // [trade, sites, no chat %, no booking %, no contact form %, copyright 2024 or older %]
  const ROWS = [
    ['Foundation repair', 75, 71, 85, 21, 8],
    ['Water damage restoration', 117, 74, 89, 45, 8],
    ['Garage door', 278, 79, 85, 16, 32],
    ['All three trades', 470, 76, 86, 24, 22],
  ];

  const CHAT_TOOLS = 'Tawk.to, Intercom, Drift, LiveChat, Podium, Birdeye, Tidio, HubSpot, Zendesk, Smith.ai, Ngage, LeadConnector, CallRail, ApexChat, LivePerson, and generic "chatbot" or "webchat" widgets';
  const BOOKING = 'a link or script from Housecall Pro, ServiceTitan, Jobber, Calendly, Setmore, Acuity Scheduling or Schedulista, or the words "book online", "book now" or "schedule service"';

  const FAQ = [
    ['What share of Houston-area trade websites have a chat?', 'About one in four. In A2H\'s October 2026 scan of 470 foundation repair, water damage restoration and garage door websites in the Houston area and Southeast Texas, 76% had no chat tool we could detect, so roughly 24% did.'],
    ['How many trade company websites let customers book online?', 'Few. 86% of the 470 sites had no online booking tool or "book online" option. By trade: 85% of foundation repair sites, 89% of restoration sites and 85% of garage door sites.'],
    ['Can I use these numbers?', `Yes. Please cite "A2H, Houston-area trade website scan, October 2026" and link to ${url}. For questions about the method, email hello@a2h.info.`],
  ];

  const table = `<section class="py-24 px-5 sm:px-6 bg-surface/40 border-y hairline">
  <div class="max-w-6xl mx-auto">
    <div class="reveal max-w-2xl mb-10">
      <h2 class="display-lg text-sand">How do foundation, restoration and garage door sites compare?</h2>
      <p class="lede mt-4">Garage door sites were the least likely to have a chat (79% had none) and the most likely to look out of date (32% showed a copyright year of 2024 or older). Restoration sites were the least likely to let a homeowner book online (89% could not) or send a form (45% had no contact form).</p>
    </div>
    <div class="reveal overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
      <table class="w-full min-w-[640px] text-left text-[15px]">
        <caption class="sr-only">Website gaps by trade, A2H scan, October 2026</caption>
        <thead>
          <tr class="text-xs text-fog border-b hairline">
            <th scope="col" class="py-3 pr-4 font-semibold">Trade</th>
            <th scope="col" class="py-3 pr-4 font-semibold tnum">Sites</th>
            <th scope="col" class="py-3 pr-4 font-semibold">No chat detected</th>
            <th scope="col" class="py-3 pr-4 font-semibold">No online booking</th>
            <th scope="col" class="py-3 pr-4 font-semibold">No contact form</th>
            <th scope="col" class="py-3 font-semibold">Copyright 2024 or older</th>
          </tr>
        </thead>
        <tbody>
${ROWS.map(([t, n, c, b, f, y], i) => `          <tr class="border-b hairline${i === ROWS.length - 1 ? ' text-sand font-semibold' : ' text-fog'}">
            <th scope="row" class="py-4 pr-4 font-normal text-sand">${t}</th>
            <td class="py-4 pr-4 tnum">${n}</td>
            <td class="py-4 pr-4 tnum">${c}%</td>
            <td class="py-4 pr-4 tnum">${b}%</td>
            <td class="py-4 pr-4 tnum">${f}%</td>
            <td class="py-4 tnum">${y}%</td>
          </tr>`).join('\n')}
        </tbody>
      </table>
    </div>
  </div>
</section>`;

  const prose = (heading, paras) => `<section class="py-16 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="reveal lg:col-span-4">
      <h2 class="display-md text-sand">${heading}</h2>
    </div>
    <div class="reveal lg:col-span-8 space-y-5 text-fog text-[16px] leading-[1.75] max-w-2xl">
${paras.map((p) => `      <p>${p}</p>`).join('\n')}
    </div>
  </div>
</section>`;

  return {
    slug,
    title: `${title} | A2H`,
    description: 'A2H checked 470 foundation repair, restoration and garage door websites in the Houston area in October 2026: 76% had no chat and 86% had no online booking.',
    jsonLd: [ORG, {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      datePublished: published,
      dateModified: published,
      author: { '@type': 'Person', '@id': SITE + '/#abbas', name: 'Abbas Hussain', url: SITE + '/about.html' },
      publisher: { '@id': SITE + '/#organization' },
      mainEntityOfPage: url,
      about: ['Website design for contractors', 'Website chat', 'Online booking'],
    }, {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: 'Houston-area trade website scan, October 2026',
      description: 'Share of 470 foundation repair, water damage restoration and garage door company websites in the Houston area and Southeast Texas with no detectable chat tool, no online booking, no contact form, and a copyright year of 2024 or older.',
      url,
      creator: { '@id': SITE + '/#organization' },
      datePublished: published,
      temporalCoverage: '2026-10-10/2026-10-11',
      spatialCoverage: { '@type': 'Place', name: 'Houston area and Southeast Texas, United States' },
      variableMeasured: ['No chat tool detected', 'No online booking', 'No contact form', 'Copyright year 2024 or older'],
      isAccessibleForFree: true,
    }, faqLd(FAQ)],
    body: [
      hero({
        eyebrow: 'A2H research, October 2026',
        h1: '76% of Houston-area trade websites have no chat.',
        sub: 'We checked the websites of 470 foundation repair, water damage restoration and garage door companies across 58 cities in the Houston area and Southeast Texas. Most give a visitor no way to ask a question or book outside business hours.',
        primary: 'Get a free sample site',
        secondary: ['Read the method', '#method'],
      }),
      answer(`In October 2026, A2H scanned 470 foundation repair, water damage restoration and garage door company websites with a Texas address, across 58 cities in the Houston area and Southeast Texas. 76% had no chat tool we could detect, 86% had no online booking, 24% had no contact form, and 22% showed a copyright year of 2024 or older. Published October 22, 2026 by Abbas Hussain, founder of A2H.`),
      figures({
        eyebrow: 'The headline numbers',
        heading: 'What did the scan find?',
        items: [['', 470, 0, '', 'trade company websites checked'], ['', 76, 0, '%', 'had no chat we could detect'], ['', 86, 0, '%', 'had no way to book online']],
        note: 'The scan only spots common chat tools, so the real "no chat" share may be a little lower.',
      }),
      table,
      `<div id="method"></div>`,
      prose('How was the scan done?', [
        'On October 10 and 11, 2026, we searched for "foundation repair", "house leveling", "water damage restoration", "mold remediation", "garage door repair" and "garage door company" plus a city name, across 58 cities in the Houston area and Southeast Texas, from Huntsville and Beaumont down to Galveston and Bay City.',
        'We kept a company only if its own website showed a Texas street address. We removed directories, review sites, lead-generation and call-reselling sites, and national franchise chains, and counted each website once. That left 470 sites: 75 foundation repair, 117 water damage restoration and 278 garage door.',
        'For each site we read the homepage and up to two contact or about pages, and skipped any page the site\'s robots.txt asked us not to read.',
      ]),
      prose('What counted as a chat or online booking?', [
        `A site counted as having a chat if its pages loaded one of these tools: ${CHAT_TOOLS}.`,
        `A site counted as having online booking if it had ${BOOKING}.`,
        'The copyright year is the latest year shown in a copyright line, such as "© 2023".',
      ]),
      prose('What are the limits?', [
        'This is one snapshot from two days of searches. Search results change, so a repeat scan would find a somewhat different set of companies.',
        'A chat that loads only after a visitor scrolls or clicks, or a tool not on our list, would be missed, so the "no chat" figure is an upper bound. The scan covers the Houston area and Southeast Texas, not all of Texas, and it does not measure how fast anyone answers the phone.',
      ]),
      prose('Who ran it?', [
        'A2H, a Houston web studio that builds websites with an AI chat and a CRM lead list for Texas trade companies. The scan was run and written up by founder Abbas Hussain. We publish only totals, never the names or contact details of the companies checked.',
      ]),
      faqSection(FAQ),
      relatedLinks([['contractor-website-checklist-2027.html', '2027 website checklist'], ['foundation-repair-websites.html', 'Foundation repair websites'], ['restoration-websites.html', 'Restoration websites'], ['garage-door-websites.html', 'Garage door websites'], ['pricing.html', 'Pricing']]),
      B.ctaBand({}),
    ].join('\n\n'),
  };
};
