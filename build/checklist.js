// Guide page: what a Texas contractor website needs in 2027, tied to the October 2026 scan.
//
// COPY RULES:
//  - Every number is from the scan (see build/research.js ROWS). Change both pages together.
//  - Items without a scan number are advice, and must not be dressed up as data.
//  - "2027" targets next-year searches; refresh the year and numbers after the next scan.

module.exports = function checklistPage({ SITE, ORG, faqLd, hero, answer, faqSection, relatedLinks, B }) {
  const slug = 'contractor-website-checklist-2027.html';
  const url = `${SITE}/${slug}`;
  const published = '2026-10-28';
  const title = 'Contractor Website Checklist for 2027: 8 Things Texas Trades Need';

  // [heading, what the scan found (or why it matters), what to do]
  const ITEMS = [
    ['Something that answers after hours', '76% of the trade sites we scanned had no chat we could detect.',
      'Most visitors look at night or on the weekend, when nobody is at the phone. An AI chat that answers common questions, takes the name, number and what\'s wrong, and saves it for you turns that visit into a callback.'],
    ['A way to book or request a time', '86% had no online booking.',
      'A request-a-time option or a booking link lets a ready customer commit without waiting for business hours. It doesn\'t need to be a full scheduling system. A form that asks for a preferred day is enough to start.'],
    ['A short contact form', '24% had no contact form at all. Among water damage restoration sites, 45%.',
      'Name, phone and what\'s wrong. Skip the email field and the long dropdowns. Every extra box costs you visitors.'],
    ['An easy first step instead of "Get a quote"', 'Almost every competitor uses the same button.',
      'Start with something small the visitor can say yes to, like a ZIP code to check you serve their area, then ask for their details. A smaller first ask is easier to start.'],
    ['Your phone number, tappable, on the first screen', 'For emergency trades this matters most.',
      'Water through a ceiling or a garage door stuck shut won\'t wait for someone to find a contact page. Put the number and your hours where a phone user sees them without scrolling.'],
    ['A site that looks maintained', '22% showed a copyright year of 2024 or older. Among garage door sites, 32%.',
      'Update the footer year, remove dead links and expired offers, and add recent job photos. Visitors read an old site as a business that may not answer either.'],
    ['Every lead in one list', 'Leads from chat, forms and calls get lost when they live in three places.',
      'Send every chat and form to one lead list (a CRM), marked by how urgent it is, so nobody on your team calls the same person twice or forgets to call back.'],
    ['Spam kept out', 'Junk form fills waste the time you save.',
      'Filter fake submissions before they reach your lead list, so the list you call from is real people.'],
  ];

  // [trade, page, sites, no chat %, no booking %, no contact form %, copyright 2024 or older %]
  const ROWS = [
    ['Foundation repair', 'foundation-repair-websites.html', 75, 71, 85, 21, 8],
    ['Water damage restoration', 'restoration-websites.html', 117, 74, 89, 45, 8],
    ['Garage door', 'garage-door-websites.html', 278, 79, 85, 16, 32],
    ['All three trades', '', 470, 76, 86, 24, 22],
  ];

  const FAQ = [
    ['Does a contractor website need a chat in 2027?', 'It is the most common gap. In A2H\'s October 2026 scan of 470 Houston-area foundation repair, restoration and garage door websites, 76% had no chat tool we could detect. A chat that answers at night and saves the visitor\'s number means an after-hours visitor becomes a callback instead of a lost job.'],
    ['Is online booking worth adding for a trade company?', 'If your jobs can be scheduled, yes. 86% of the sites we scanned had no way to book or request a time online, so a simple request-a-time option already puts you ahead of most local competitors. Emergency work like water damage still needs a phone number and chat on the first screen.'],
    ['Do I need a contact form if my phone number is on the site?', 'Yes. Plenty of people won\'t call a business they haven\'t used before. 24% of the scanned sites had no contact form at all, and among water damage restoration sites it was 45%. Keep it short: name, phone and what\'s wrong.'],
    ['What should the first button on a contractor website say?', 'Something easy to say yes to. "Get a quote" is on almost every competitor\'s site and feels like a commitment. A smaller first step, such as entering a ZIP code to check you serve the area, then asking for a name and phone number, is less to ask of a visitor.'],
    ['How do I know if my website looks out of date?', 'Check the copyright year in the footer first. 22% of the sites we scanned showed 2024 or older, and among garage door companies it was 32%. An old year tells visitors nobody is looking after the site.'],
    ['How much does a contractor website cost in Texas?', 'At A2H, $800 to $2,000 one time, including the AI chat and CRM lead list, with a free sample site before you pay. Hosting and upkeep are quoted separately. See the pricing page for what is included.'],
  ];

  const checklist = `<section class="py-20 lg:py-24 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto">
    <div class="reveal max-w-2xl mb-10">
      <p class="kicker mb-5">The checklist</p>
      <h2 class="display-lg text-sand" data-split>What does a contractor website need in 2027?</h2>
    </div>
    <ol class="space-y-8">
${ITEMS.map(([h, stat, body], i) => `      <li class="reveal border-t hairline pt-6 grid sm:grid-cols-12 gap-4">
        <p class="sm:col-span-1 figure text-copper-light tnum" style="font-size:1.6rem">${String(i + 1).padStart(2, '0')}</p>
        <div class="sm:col-span-11">
          <h3 class="display-md text-sand" style="font-size:clamp(1.25rem,2.2vw,1.6rem)">${h}</h3>
          <p class="text-sand mt-2 font-semibold">${stat}</p>
          <p class="text-fog mt-2 text-[16px] leading-[1.75] max-w-2xl">${body}</p>
        </div>
      </li>`).join('\n')}
    </ol>
  </div>
</section>`;

  const table = `<section class="py-24 px-5 sm:px-6 bg-surface/40 border-y hairline">
  <div class="max-w-6xl mx-auto">
    <div class="reveal max-w-2xl mb-10">
      <h2 class="display-lg text-sand">Which trades have the biggest gaps?</h2>
      <p class="lede mt-4">Garage door sites were the least likely to have a chat and the most likely to look out of date. Restoration sites were the least likely to take a booking or a form, even though their customers often need help the same night.</p>
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
${ROWS.map(([t, href, n, c, b, f, y], i) => `          <tr class="border-b hairline${i === ROWS.length - 1 ? ' text-sand font-semibold' : ' text-fog'}">
            <th scope="row" class="py-4 pr-4 font-normal text-sand">${href ? `<a href="${href}" class="link-underline">${t}</a>` : t}</th>
            <td class="py-4 pr-4 tnum">${n}</td>
            <td class="py-4 pr-4 tnum">${c}%</td>
            <td class="py-4 pr-4 tnum">${b}%</td>
            <td class="py-4 pr-4 tnum">${f}%</td>
            <td class="py-4 tnum">${y}%</td>
          </tr>`).join('\n')}
        </tbody>
      </table>
    </div>
    <p class="reveal text-xs text-fog/70 mt-6 max-w-xl">Source: A2H scan of 470 trade company websites with a Texas address in the Houston area and Southeast Texas, October 10 and 11, 2026. The scan only spots common chat tools, so the real "no chat" share may be a little lower. <a href="houston-trade-website-scan-2026.html" class="link-underline text-sand">Full method and limits</a>.</p>
  </div>
</section>`;

  const selfCheck = `<section class="py-16 px-5 sm:px-6">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
    <div class="reveal lg:col-span-4">
      <h2 class="display-md text-sand">How do I check my own site?</h2>
    </div>
    <div class="reveal lg:col-span-8 space-y-5 text-fog text-[16px] leading-[1.75] max-w-2xl">
      <p>Open your website on your phone at night and pretend you're a customer with a problem. Can you ask a question and get an answer? Can you request a time? Is the phone number one tap away? Is the footer year current?</p>
      <p>Then send yourself a test message through every way in: the form, the chat if you have one, and a call after hours. Count how long until someone gets back to you. If you'd rather not do it yourself, we build a free sample site for your company that covers all eight points and walk you through it in 15 minutes.</p>
    </div>
  </div>
</section>`;

  return {
    slug,
    title: `${title} | A2H`,
    description: 'What a Texas contractor website needs in 2027, checked against A2H\'s scan of 470 Houston-area trade sites: 76% had no chat, 86% no online booking, 24% no contact form.',
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
      citation: `${SITE}/houston-trade-website-scan-2026.html`,
    }, faqLd(FAQ)],
    body: [
      hero({
        eyebrow: 'A2H guide, October 2026',
        h1: 'The 2027 contractor website checklist.',
        sub: 'Eight things a Texas contractor website should do in 2027, each checked against our scan of 470 Houston-area foundation repair, restoration and garage door sites. Most fail the first two.',
        primary: 'Get a free sample site',
        secondary: ['See the scan data', 'houston-trade-website-scan-2026.html'],
      }),
      answer('A contractor website in 2027 should answer visitors after hours, let them request a time, keep the contact form short, make the first step easy, show a tappable phone number, look maintained, send every lead to one list and filter out spam. In A2H\'s October 2026 scan of 470 Houston-area trade websites, 76% had no chat, 86% had no online booking and 24% had no contact form. Written October 28, 2026 by Abbas Hussain, founder of A2H.'),
      checklist,
      table,
      selfCheck,
      faqSection(FAQ.map(([q, a]) => [q, a.replace('See the pricing page', 'See the <a href="pricing.html" class="link-underline text-sand">pricing page</a>')])),
      relatedLinks([['houston-trade-website-scan-2026.html', '2026 website scan'], ['foundation-repair-websites.html', 'Foundation repair websites'], ['restoration-websites.html', 'Restoration websites'], ['garage-door-websites.html', 'Garage door websites'], ['pricing.html', 'Pricing']]),
      B.ctaBand({}),
    ].join('\n\n'),
  };
};
