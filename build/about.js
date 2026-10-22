// About / founder page: who builds A2H sites, for people and for AI search (Person entity).
// Team size: Abbas confirmed 10-22 that 15 vetted developers (corrected from 25+ the same day) work with A2H (staff/contractors).
//
// COPY RULES:
//  - Only facts already published elsewhere on a2h.info or confirmed by Abbas. No years of experience,
//    credentials, past employers or client quotes until he supplies them.
//  - Never publish his home address. City is Houston.

module.exports = function aboutPage({ SITE, ORG, faqLd, hero, answer, faqSection, B }) {
  const slug = 'about.html';
  const PERSON = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': SITE + '/#abbas',
    name: 'Abbas Hussain',
    jobTitle: 'Founder and AI Consultant',
    worksFor: { '@id': SITE + '/#organization' },
    url: `${SITE}/${slug}`,
    sameAs: ['https://www.linkedin.com/in/abbas-hussain-1bb46b432/'],
    workLocation: { '@type': 'Place', name: 'Houston, Texas' },
    knowsAbout: ['Website development', 'AI website chat', 'CRM lead management', 'Websites for contractors'],
    award: 'Accepted developer, AI Frontrunners (October 2026)',
  };

  const FAQ = [
    ['Who runs A2H?', 'Abbas Hussain, an AI consultant in Houston, Texas, founded A2H and runs it. 15 vetted developers work with A2H.'],
    ['Is A2H related to A2 Hosting or a2h.com?', 'No. A2H (a2h.info) is a Houston web studio. It is not affiliated with A2 Hosting or with a2h.com.'],
    ['How do I reach Abbas?', 'Email hello@a2h.info, message him on LinkedIn, or book a 15-minute call from the Book a call page.'],
  ];

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
    title: 'About A2H and Founder Abbas Hussain | Houston Web Studio',
    description: 'A2H is a Houston web studio run by Abbas Hussain, building websites with an AI chat and a CRM lead list for Texas trade companies.',
    jsonLd: [ORG, PERSON, {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About A2H',
      url: `${SITE}/${slug}`,
      about: { '@id': SITE + '/#organization' },
      mainEntity: { '@id': SITE + '/#abbas' },
    }, faqLd(FAQ)],
    body: [
      hero({
        eyebrow: 'About A2H',
        h1: 'Who builds A2H websites?',
        sub: 'A2H was founded by Abbas Hussain in Houston, Texas. 15 vetted developers work with A2H on websites with an AI chat and a CRM lead list for Texas foundation repair, water damage restoration and garage door companies.',
        secondary: ['See the work', 'work.html'],
      }),
      answer('A2H is a Houston, Texas web studio founded and run by Abbas Hussain, an AI consultant, with 15 vetted developers working with it. In October 2026 he was accepted as a developer on AI Frontrunners, the agency community run by Tim Chao, where agency owners hire a small group of vetted developers. A2H is not affiliated with A2 Hosting or with a2h.com.'),
      prose('What does A2H build?', [
        'Fast, hand-coded websites with an AI chat trained on the business. The chat answers common questions at any hour, takes the visitor\'s name, number and what they need, and saves it to the company\'s own CRM lead list, tagged by urgency, with spam filtered out.',
        'Every client sees a free sample site with their company name before paying. Builds are $800 to $2,000 one time, depending on size, and the client owns the finished files.',
      ]),
      B.portfolioGrid({ heading: 'Which sites has A2H built?', featureFirst: false }),
      prose('What has A2H published?', [
        'In October 2026 A2H checked 470 foundation repair, restoration and garage door websites across 58 cities in the Houston area and Southeast Texas. 76% had no chat we could detect and 86% had no online booking. <a href="houston-trade-website-scan-2026.html" class="link-underline text-sand">Read the full scan and method</a>.',
      ]),
      faqSection(FAQ),
      B.ctaBand({}),
    ].join('\n\n'),
  };
};
