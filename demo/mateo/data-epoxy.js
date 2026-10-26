window.NICHES = window.NICHES || {};
// Sample data for the Gullhaven Epoxy Floors demo (Long Island, NY). Every
// person, phone number and address here is fictional. Times are relative to
// page load: positive = hours ago, negative = hours ahead. Outbound calls are
// speed-to-lead callbacks placed by the AI after a form submit; `after` is the
// seconds between the form and the call.
window.NICHES.epoxy = {
  client: { name: "Gullhaven Epoxy Floors", short: "GE", city: "Massapequa, NY", goal: 45000, trade: "Epoxy flooring", appt: "Estimate" },

  stages: [
    { id: "new", label: "New" },
    { id: "contacted", label: "Contacted" },
    { id: "scheduled", label: "Scheduled" },
    { id: "booked", label: "Booked" },
    { id: "completed", label: "Completed" },
    { id: "lost", label: "Lost" },
  ],

  deals: [
    {
      id: "d1", name: "Dana Kowalski", phone: "(516) 555-0142", email: "dana.kowalski@example.com",
      city: "Garden City", zip: "11530", source: "Phone call", stage: "booked", service: "2-car garage flake floor",
      value: 3600, temp: "hot", urgency: "This month", created: 50,
      next: { label: "Estimate visit", appt: true },
      call: {
        at: 50, seconds: 198, disposition: "Booked",
        summary: "Two-car garage, old paint peeling off the slab. Wants a flake floor before winter. Booked a free estimate for {day} morning.",
        transcript: [
          ["ai", "Thanks for calling Gullhaven Epoxy Floors, this is the front desk. How can I help?"],
          ["caller", "Hi, I want to redo my garage floor. The paint the last owner put down is peeling everywhere."],
          ["ai", "That's a common one. Peeling paint gets ground off before we coat. Is it a one, two or three-car garage?"],
          ["caller", "Two-car."],
          ["ai", "Got it. Our estimator can measure and show you flake colors on site. I have {day} at 9 AM or 2 PM. Which works?"],
          ["caller", "9 works."],
          ["ai", "You're set for {day} at 9 AM. You'll get a text confirmation. Anything else?"],
          ["caller", "No, that's it. Thanks."],
        ],
      },
      appointment: { day: 2, hour: 9, status: "Confirmed", notes: "2-car garage, peeling paint needs grinding. Bring flake color samples." },
    },
    {
      id: "d2", name: "Marcus Delgado", phone: "(516) 555-0177", email: "marcus.delgado@example.com",
      city: "Levittown", zip: "11756", source: "Website chat", stage: "scheduled", service: "Basement epoxy floor",
      value: 5400, temp: "warm", urgency: "This month", created: 96,
      next: { label: "Estimate visit", appt: true },
      visit: {
        referrer: "Google", query: "basement epoxy floor levittown", device: "Mobile",
        pages: [
          ["/basements", "Basement Floors", 124],
          ["/gallery", "Project Gallery", 88],
          ["/financing", "Financing", 37],
          ["/basements", "Basement Floors", 41],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 96, topic: "Basement epoxy floor", page: "/basements",
        messages: [
          ["visitor", "Can you put epoxy down in a basement that gets a little damp in spring?"],
          ["bot", "Yes. For damp basements we use a moisture-mitigating primer under the coating. The estimator checks moisture levels on site. Want a free estimate?"],
          ["visitor", "Sure. About 700 square feet, mostly open."],
          ["bot", "Thanks. Can I grab your name and number so the office can pick a time with you?"],
          ["visitor", "Marcus, 516-555-0177"],
          ["bot", "Thanks Marcus. Someone from the office will call you today."],
        ],
      },
      appointment: { day: 4, hour: 13, status: "Scheduled", notes: "~700 sq ft basement, damp in spring. Moisture test + vapor barrier primer." },
    },
    {
      id: "d3", name: "Priya Shah", phone: "(516) 555-0109", email: "priya.shah@example.com",
      city: "Massapequa", zip: "11758", source: "Meta lead ad", stage: "booked", service: "2-car garage flake floor + crack repair",
      value: 4200, temp: "hot", urgency: "This month", created: 2,
      next: { label: "Estimate visit", appt: true },
      form: { name: "Meta instant form: Free garage floor quote", answers: [["Which floor", "Garage"], ["Garage size", "2-car"], ["When do you want it done", "Within a month"]] },
      call: {
        at: 2, seconds: 172, disposition: "Booked", outbound: true, after: 45,
        summary: "Called 45 seconds after the Facebook form. 2-car garage, about 480 sq ft, a few hairline cracks and oil stains. Wants it done before the holidays. Booked a free estimate for {day} at 10 AM.",
        transcript: [
          ["ai", "Hi Priya, this is the AI assistant for Gullhaven Epoxy Floors. You just asked for a garage floor quote on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Oh wow, that was fast. Yeah, go ahead."],
          ["ai", "Great. Your form says a 2-car garage. Roughly how big is it, and what shape is the concrete in? Any cracks, stains or old coating?"],
          ["caller", "Standard two-car, maybe 20 by 24. There are a couple of thin cracks and some oil stains where the car parks."],
          ["ai", "That's about 480 square feet. Thin cracks get filled and ground flush before coating, so that's no problem. When are you hoping to have it done?"],
          ["caller", "Before Thanksgiving if possible."],
          ["ai", "That's doable. The estimator can measure, check the cracks and show flake colors in person. I have {day} at 10 AM or 3 PM. Which works better?"],
          ["caller", "10 AM."],
          ["ai", "You're booked for {day} at 10 AM at your place in Massapequa. I'll text you a confirmation right now. Anything else I can note for the estimator?"],
          ["caller", "Just that I like the gray and black flake I saw in the ad."],
          ["ai", "Noted. See you {day}, Priya."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "2-car (~480 sq ft). Hairline cracks + oil stains. Likes gray/black flake from the ad. Wants it done before Thanksgiving." },
    },
    {
      id: "d4", name: "Tom Brennan", phone: "(516) 555-0163", email: "",
      city: "Syosset", zip: "11791", source: "Referral", stage: "completed", service: "3-car garage flake floor",
      value: 5900, temp: "hot", urgency: "This month", created: 624,
      notes: "Referred by a neighbor whose garage we did in the spring.",
      appointment: { at: 456, status: "Completed", notes: "Estimate done, quote accepted on site. Installed in one day." },
      quote: { number: "Q-0001", status: "Accepted", at: 336, lines: [["Full-flake epoxy system, per sq ft", 720, 7.5], ["Polyaspartic top coat upgrade", 1, 500]] },
    },
    {
      id: "d5", name: "Rachel Moran", phone: "(516) 555-0121", email: "rachel.moran@example.com",
      city: "Oceanside", zip: "11572", source: "Meta lead ad", stage: "contacted", service: "Garage floor coating",
      value: 3400, temp: "warm", urgency: "This month", created: 6,
      next: { label: "Try Rachel again", at: -3 },
      form: { name: "Meta instant form: Free garage floor quote", answers: [["Which floor", "Garage"], ["Garage size", "1-car"], ["When do you want it done", "Next 1-2 months"]] },
      call: {
        at: 6, seconds: 38, disposition: "No answer, text sent", outbound: true, after: 52,
        summary: "Called 52 seconds after the Facebook form. No answer. Left a short voicemail and sent a text with a booking link. Retry scheduled.",
        transcript: [
          ["ai", "Hi Rachel, this is the AI assistant for Gullhaven Epoxy Floors calling about the garage floor quote you just requested on Facebook. Sorry I missed you. I'm sending you a text now so you can pick an estimate time, or just reply and we'll call you back. Thanks!"],
        ],
      },
      task: { title: "Call Rachel back (no answer on first call)", due: -3, auto: true },
      draft: "Hi Rachel, this is Gullhaven Epoxy Floors. Thanks for asking about a garage floor quote. We have free estimate slots in Oceanside this week, morning or afternoon. Reply with a time that suits you and we'll lock it in.",
    },
    {
      id: "d6", name: "Luis Ferraro", phone: "(516) 555-0188", email: "",
      city: "Hicksville", zip: "11801", source: "Meta lead ad", stage: "lost", service: "Garage floor coating",
      value: 3000, temp: "cold", urgency: "Just researching", created: 432, lostReason: "Wanted a DIY kit, not installation",
      form: { name: "Meta instant form: Free garage floor quote", answers: [["Which floor", "Garage"], ["Garage size", "2-car"], ["When do you want it done", "Not sure yet"]] },
      call: {
        at: 432, seconds: 84, disposition: "Not a fit", outbound: true, after: 61,
        summary: "Called 61 seconds after the Facebook form. Looking to buy a DIY epoxy kit and do it himself. Gullhaven only does full installs, so marked not a fit and closed politely.",
        transcript: [
          ["ai", "Hi Luis, this is the AI assistant for Gullhaven Epoxy Floors. You just asked about a garage floor on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Sure. I mostly wanted to know if you sell the kits. I want to do it myself."],
          ["ai", "Thanks for asking. We only do professional installs with grinding and commercial-grade coatings, so we don't sell kits. Would a quote for a full install be helpful at all?"],
          ["caller", "No, I'm going to do it myself this weekend."],
          ["ai", "Understood. Good luck with the project, Luis. If you ever want a pro install, just reply to the text and we'll set up an estimate."],
        ],
      },
    },
    {
      id: "d7", name: "Hannah Price", phone: "(516) 555-0135", email: "hannah.price@example.com",
      city: "Bethpage", zip: "11714", source: "Website chat", stage: "new", service: "Warehouse floor coating",
      value: 18500, temp: "warm", urgency: "This month", created: 20,
      next: { label: "Email estimate times", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Desktop",
        pages: [
          ["/", "Gullhaven Epoxy Floors", 46],
          ["/commercial", "Commercial Floors", 142],
          ["/blog/epoxy-vs-polyaspartic-for-warehouses", "Epoxy vs Polyaspartic for Warehouses", 211],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 20, topic: "Warehouse floor coating", page: "/blog/epoxy-vs-polyaspartic-for-warehouses",
        messages: [
          ["visitor", "We have a 3,000 sq ft warehouse with forklift traffic. Can you coat it without shutting us down for a week?"],
          ["bot", "Yes. For working warehouses we often use a fast-cure polyaspartic system, and large floors can be done in sections or over a weekend. Want a free estimate?"],
          ["visitor", "Yes please. hannah.price@example.com"],
          ["bot", "Thanks Hannah. The office will email you a few estimate times to choose from."],
        ],
      },
      task: { title: "Email Hannah estimate times (warehouse)", due: -4 },
      draft: "Hi Hannah, thanks for reaching out about the warehouse floor in Bethpage. We can walk the space and plan a weekend install around your forklift traffic. Reply with a day and time that works this week and we'll lock it in.",
    },
    {
      id: "d8", name: "Greg Sullivan", phone: "(516) 555-0194", email: "greg.sullivan@example.com",
      city: "Freeport", zip: "11520", source: "Web form", stage: "scheduled", service: "Basement epoxy floor",
      value: 6800, temp: "hot", urgency: "This week", created: 30,
      next: { label: "Estimate visit", appt: true },
      visit: {
        referrer: "Google", query: "epoxy basement floor freeport ny", device: "Mobile",
        pages: [
          ["/basements", "Basement Floors", 97],
          ["/gallery", "Project Gallery", 64],
          ["/quote", "Get a Free Quote", 48],
        ],
        converted: "Submitted the quote form",
      },
      form: { name: "Website form: Free quote", answers: [["Which floor", "Basement"], ["Approx. size", "About 900 sq ft"], ["Anything we should know", "Finishing the basement into a gym"]] },
      call: {
        at: 30, seconds: 154, disposition: "Booked", outbound: true, after: 38,
        summary: "Called 38 seconds after the website form. ~900 sq ft basement turning into a home gym, no water issues. Booked an estimate for {day} at 4 PM.",
        transcript: [
          ["ai", "Hi Greg, this is the AI assistant for Gullhaven Epoxy Floors. You just filled out our quote form on the website. Is now a good time for a couple of quick questions?"],
          ["caller", "Yeah, sure."],
          ["ai", "Thanks. You mentioned about 900 square feet for a home gym. Has the basement ever had water or dampness?"],
          ["caller", "No, it's been dry since we moved in."],
          ["ai", "Good. And when are you hoping to start using the gym?"],
          ["caller", "Next month ideally."],
          ["ai", "That works. I can get an estimator out {day} at 8 AM or 4 PM. Which is better?"],
          ["caller", "4 PM, after work."],
          ["ai", "You're set for {day} at 4 PM. I'll text you a confirmation now. Thanks Greg."],
        ],
      },
      appointment: { day: 3, hour: 16, status: "Scheduled", notes: "~900 sq ft dry basement, home gym. Ask about rubber-mat-safe top coat." },
    },
    {
      id: "d9", name: "Alicia Romano", phone: "(516) 555-0116", email: "alicia.romano@example.com",
      city: "Long Beach", zip: "11561", source: "Website chat", stage: "completed", service: "2-car garage flake floor",
      value: 3900, temp: "hot", urgency: "This month", created: 528,
      notes: "Paid in full. Asked about a referral discount for her sister in Oceanside.",
      visit: {
        referrer: "Instagram", query: "", device: "Mobile",
        pages: [
          ["/gallery", "Project Gallery", 133],
          ["/garage-floors", "Garage Floors", 76],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 528, topic: "Garage flake floor", page: "/garage-floors",
        messages: [
          ["visitor", "Does salt from winter roads ruin these floors? We're right by the beach."],
          ["bot", "Our polyaspartic top coat is UV-stable and stands up to road salt, so it holds up well near the shore. Want a free estimate?"],
          ["visitor", "Yes. Alicia, 516-555-0116"],
          ["bot", "Thanks Alicia. The office will call you today to set a time."],
        ],
      },
    },
    {
      id: "d10", name: "Ben Castillo", phone: "(516) 555-0152", email: "",
      city: "Hicksville", zip: "11801", source: "Phone call", stage: "contacted", service: "Auto shop floor coating",
      value: 14600, temp: "warm", urgency: "This month", created: 240,
      next: { label: "Follow up on shop quote", at: -24 },
      call: {
        at: 240, seconds: 141, disposition: "Message taken",
        summary: "Owns a 2-bay auto repair shop, about 1,800 sq ft. Wants a chemical-resistant floor. Took details for the owner to call back with pricing.",
        transcript: [
          ["ai", "Thanks for calling Gullhaven Epoxy Floors. How can I help?"],
          ["caller", "I run a two-bay auto shop and want a floor that can handle oil and brake fluid."],
          ["ai", "We do commercial floors for shops. Roughly how many square feet is the space?"],
          ["caller", "About 1,800."],
          ["ai", "Got it. I'll have the owner call you back today with options for a chemical-resistant system. Is this the best number?"],
          ["caller", "Yes."],
        ],
      },
      task: { title: "Follow up with Ben on the shop floor quote", due: -24, auto: true },
      quote: { number: "Q-0003", status: "Sent", at: 72, lines: [["Chemical-resistant epoxy system, per sq ft", 1800, 7], ["Crack and spall repair", 1, 2000]] },
      draft: "Hi Ben, it's Gullhaven Epoxy Floors following up on the shop floor quote we sent. Happy to walk through it or plan the install around a weekend so the bays stay open. When's a good time for a quick call?",
    },
    {
      id: "d11", name: "Sofia Mancuso", phone: "(516) 555-0170", email: "sofia.mancuso@example.com",
      city: "Garden City", zip: "11530", source: "Referral", stage: "contacted", service: "3-car garage, polyaspartic upgrade",
      value: 6200, temp: "warm", urgency: "Next 1-2 months", created: 120,
      notes: "Referred by Tom Brennan (Syosset). Wants the same flake color.",
      next: { label: "Send garage quote", at: 24 },
      task: { title: "Send Sofia the 3-car garage quote", due: 24 },
      quote: { number: "Q-0004", status: "Draft", lines: [["Full-flake epoxy system, per sq ft", 740, 7.5], ["Polyaspartic top coat upgrade", 1, 650]] },
    },
    {
      id: "d12", name: "Kevin Doyle", phone: "(516) 555-0127", email: "kevin.doyle@example.com",
      city: "Massapequa", zip: "11758", source: "Web form", stage: "new", service: "Garage floor coating",
      value: 0, temp: "warm", urgency: "This month", created: 9,
      next: { label: "AI callback at 8:00 AM", at: -1 },
      form: { name: "Website form: Free quote", answers: [["Which floor", "Garage"], ["Approx. size", "2-car"], ["Anything we should know", "Big crack down the middle"]] },
      call: {
        queued: true, at: 9,
        summary: "Form came in at 10:12 PM. Call held until 8:00 AM, inside calling hours.",
      },
      task: { title: "Morning AI callback: Kevin (night form)", due: -1, auto: true },
    },
  ],

  ads: [
    { id: "a1", name: "Before/after flake floor video", campaign: "Garage floor leads · Nassau", status: "Active", spend: 412, impr: 18200, clicks: 364, leads: 14, booked: 5, won: 1, wonValue: 3900 },
    { id: "a2", name: "One-day install carousel", campaign: "Garage floor leads · Nassau", status: "Active", spend: 286, impr: 12900, clicks: 221, leads: 9, booked: 4, won: 1, wonValue: 5900 },
    { id: "a3", name: "Basement gym floor static", campaign: "Basement floors · Long Island", status: "Active", spend: 194, impr: 8400, clicks: 132, leads: 5, booked: 2, won: 0, wonValue: 0 },
    { id: "a4", name: "Winter salt warning reel", campaign: "Garage floor leads · Nassau", status: "Paused", spend: 118, impr: 6100, clicks: 79, leads: 3, booked: 0, won: 0, wonValue: 0 },
  ],

  speed: { median: 44, calls: 31, reached: 24, booked: 11 },

  anonymous: [
    { id: "v1", city: "Hicksville", device: "Mobile", referrer: "Google", query: "garage floor epoxy cost long island", at: 1.2, pages: [["/garage-floors", "Garage Floors", 81], ["/financing", "Financing", 44]] },
    { id: "v2", city: "Levittown", device: "Desktop", referrer: "Facebook ad", query: "", at: 5, pages: [["/gallery", "Project Gallery", 66], ["/garage-floors", "Garage Floors", 39]] },
    { id: "v3", city: "Syosset", device: "Mobile", referrer: "Google", query: "", at: 12, pages: [["/blog/how-long-does-garage-epoxy-last", "How Long Does Garage Epoxy Last?", 158]] },
    { id: "v4", city: "Long Beach", device: "Mobile", referrer: "ChatGPT", query: "", at: 28, pages: [["/commercial", "Commercial Floors", 73], ["/gallery", "Project Gallery", 51]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Bethpage", at: 7, topic: "Cure time", page: "/garage-floors",
      messages: [
        ["visitor", "How long until I can park my car on it?"],
        ["bot", "With our polyaspartic system you can walk on it the same evening and park on it after about 24 hours. Want a free estimate?"],
        ["visitor", "Not yet, just comparing. Thanks."],
      ],
    },
  ],

  doneTasks: [
    { title: "Send Tom the warranty paperwork", contact: "d4", done: 30 },
    { title: "Text Alicia's sister about a referral estimate", contact: "d9", done: 52 },
  ],
};
