window.NICHES = window.NICHES || {};
window.NICHES.pest = {
  // Sample data for the Tidewick Pest Control demo (Long Island, NY). Every
  // person, phone number and address here is fictional. Times are relative to
  // page load: positive = hours ago, negative = hours ahead. Calls marked
  // outbound: true are speed-to-lead callbacks placed by the AI after a form
  // submit; "after" is the seconds between the submit and the call.

  client: { name: "Tidewick Pest Control", short: "TP", city: "Port Washington, NY", goal: 18000, trade: "Pest control", appt: "Visit" },

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
      id: "d1", name: "Ellen Marchetti", phone: "(516) 555-0214", email: "ellen.marchetti@example.com",
      city: "Great Neck", zip: "11021", source: "Phone call", stage: "booked", service: "Rodent exclusion",
      value: 1230, temp: "hot", urgency: "This week", created: 30,
      next: { label: "Visit", appt: true },
      call: {
        at: 30, seconds: 196, disposition: "Booked",
        summary: "Hearing scratching in the kitchen ceiling at night and found droppings under the sink. Booked a rodent visit for {day} morning. Quote for exclusion sent after the call.",
        transcript: [
          ["ai", "Thanks for calling Tidewick Pest Control, this is the front desk. How can I help?"],
          ["caller", "I think we have mice. There's scratching in the kitchen ceiling at night and droppings under the sink."],
          ["ai", "That's a common fall problem as it gets colder. How long have you been hearing it?"],
          ["caller", "About a week. It's getting louder."],
          ["ai", "Got it. Any pets in the house? The tech will plan the traps around them."],
          ["caller", "One cat."],
          ["ai", "Thanks. I have {day} at 9 AM or 1 PM open. Which works?"],
          ["caller", "9 is good."],
          ["ai", "You're set for {day} at 9 AM. You'll get a text confirmation. Anything else?"],
          ["caller", "No, that's it. Thanks."],
        ],
      },
      appointment: { day: 2, hour: 9, status: "Confirmed", notes: "Scratching in kitchen ceiling, droppings under sink. One cat in the house, use enclosed stations." },
      quote: { number: "Q-0003", status: "Sent", at: 26, lines: [["Rodent exclusion, seal entry points", 1, 950], ["Trap setup and 2 follow-up visits", 1, 280]] },
    },
    {
      id: "d2", name: "Victor Alvarado", phone: "(516) 555-0237", email: "victor.alvarado@example.com",
      city: "Huntington", zip: "11743", source: "Website chat", stage: "scheduled", service: "Termite inspection",
      value: 1800, temp: "warm", urgency: "This month", created: 90,
      next: { label: "Visit", appt: true },
      visit: {
        referrer: "Google", query: "termite treatment huntington ny", device: "Mobile",
        pages: [
          ["/termites", "Termite Treatment", 124],
          ["/blog/termite-swarmers-vs-flying-ants", "Termite Swarmers vs. Flying Ants", 167],
          ["/reviews", "Reviews", 48],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 90, topic: "Termite inspection", page: "/blog/termite-swarmers-vs-flying-ants",
        messages: [
          ["visitor", "Found a pile of small wings by the basement window. Termites or flying ants?"],
          ["bot", "Piles of shed wings near a window are a classic sign of termite swarmers, though flying ants can look similar. A termite inspection will tell you for sure. Want to set one up?"],
          ["visitor", "Yes. How much is treatment if it is termites?"],
          ["bot", "It depends on the size of the home and how much activity there is, so the tech gives you a written quote on site. Can I grab your name and number?"],
          ["visitor", "Victor, 516-555-0237"],
          ["bot", "Thanks Victor. The office will call you today to pick a time."],
        ],
      },
      appointment: { day: 4, hour: 13, status: "Scheduled", notes: "Shed wings by basement window. Read the swarmers vs. flying ants post. Asked about price range." },
    },
    {
      id: "d3", name: "Dana Kowalski", phone: "(516) 555-0209", email: "dana.kowalski@example.com",
      city: "Manhasset", zip: "11030", source: "Meta lead ad", stage: "booked", service: "Carpenter ant treatment + quarterly plan",
      value: 830, temp: "hot", urgency: "This week", created: 2,
      next: { label: "Visit", appt: true },
      form: { name: "Meta instant form: Free pest check", answers: [["What pest?", "Big black ants in the kitchen"], ["Where?", "Kitchen and back deck"], ["Home or business?", "Home"]] },
      call: {
        at: 2, seconds: 158, disposition: "Booked", outbound: true, after: 45,
        summary: "AI called 45 seconds after the Meta form. Large black ants in the kitchen and on the back deck for about two weeks, likely carpenter ants. Two kids and a dog. Booked a visit for {day} at 10 AM and asked about a quarterly plan.",
        transcript: [
          ["ai", "Hi Dana, this is the AI assistant for Tidewick Pest Control. You just asked for a free pest check on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Oh wow, that was fast. Sure."],
          ["ai", "What are you seeing, and where?"],
          ["caller", "Big black ants. In the kitchen by the sink and all over the back deck."],
          ["ai", "Large black ants near wood and water are often carpenter ants. How long has it been going on?"],
          ["caller", "Maybe two weeks. It's getting worse."],
          ["ai", "Got it. Any kids or pets at home? The tech uses products that are safe around them, but they like to know."],
          ["caller", "Two kids and a dog."],
          ["ai", "Thanks. I can get a tech out {day} at 10 AM or 2 PM. Which works better?"],
          ["caller", "10 AM."],
          ["ai", "You're booked for {day} at 10 AM at your home in Manhasset. You'll get a text confirmation in a minute. Anything else?"],
          ["caller", "Do you do those regular plans so they don't come back?"],
          ["ai", "We do, a quarterly plan. The tech will go over it with you on {day}. Talk soon."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "Likely carpenter ants, kitchen sink and back deck, 2 weeks. Two kids and a dog. Interested in quarterly plan." },
    },
    {
      id: "d4", name: "Frank DeLuca", phone: "(516) 555-0251", email: "",
      city: "Oyster Bay", zip: "11771", source: "Referral", stage: "completed", service: "Termite treatment",
      value: 2400, temp: "hot", urgency: "This week", created: 620,
      notes: "Referred by a quarterly-plan customer down the block. Active termites in a basement sill plate.",
      appointment: { at: 470, status: "Completed", notes: "Treatment done. 1-year retreatment warranty issued." },
      quote: { number: "Q-0001", status: "Accepted", at: 500, lines: [["Liquid termite treatment, per linear foot", 180, 11], ["Bait station install", 1, 420]] },
    },
    {
      id: "d5", name: "Natalie Brennan", phone: "(516) 555-0266", email: "natalie.brennan@example.com",
      city: "Roslyn", zip: "11576", source: "Meta lead ad", stage: "contacted", service: "Bed bug heat treatment",
      value: 2800, temp: "warm", urgency: "Immediate", created: 6,
      next: { label: "Call back about bed bugs", at: -3 },
      form: { name: "Meta instant form: Bed bug heat treatment", answers: [["What pest?", "Bed bugs"], ["Where?", "Main bedroom"], ["Home or business?", "Home"]] },
      call: {
        at: 6, seconds: 34, disposition: "No answer, text sent", outbound: true, after: 52,
        summary: "AI called 52 seconds after the Meta form. No answer. Left a short voicemail and sent a text with a link to book. Callback task created.",
        transcript: [
          ["ai", "Hi Natalie, this is the AI assistant for Tidewick Pest Control calling about the bed bug form you just sent on Facebook. Sorry I missed you. I'm sending you a text now so you can pick a time, or call us back at this number. Thanks."],
        ],
      },
      task: { title: "Call Natalie back about bed bug heat treatment", due: -3, auto: true },
      draft: "Hi Natalie, it's Tidewick Pest Control. We tried you a few minutes after your bed bug request. A one-day heat treatment usually clears the room in a single visit. Reply with a good time to talk and we'll call you.",
    },
    {
      id: "d6", name: "Raymond Choi", phone: "(516) 555-0273", email: "raymond.choi@example.com",
      city: "Flushing", zip: "11354", source: "Meta lead ad", stage: "lost", service: "Roach treatment",
      value: 250, temp: "cold", urgency: "This week", created: 54, lostReason: "Outside service area (Queens)",
      form: { name: "Meta instant form: Free pest check", answers: [["What pest?", "Roaches"], ["Where?", "Apartment kitchen"], ["Home or business?", "Home"]] },
      call: {
        at: 54, seconds: 71, disposition: "Not a fit", outbound: true, after: 38,
        summary: "AI called 38 seconds after the Meta form. Caller is in Flushing, Queens, outside the service area. Told him politely and closed the lead.",
        transcript: [
          ["ai", "Hi Raymond, this is the AI assistant for Tidewick Pest Control. You just asked for a free pest check on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Yeah, go ahead."],
          ["ai", "What are you seeing, and what town is the home in?"],
          ["caller", "Roaches in the kitchen. I'm in Flushing."],
          ["ai", "Thanks. I'm sorry, Flushing is outside our service area. We cover the North Shore of Nassau and western Suffolk. I'd suggest a company based in Queens so you get a fast visit."],
          ["caller", "Oh, okay. No problem."],
          ["ai", "Thanks for reaching out, Raymond. Good luck with it."],
        ],
      },
    },
    {
      id: "d7", name: "Grace Whitaker", phone: "(516) 555-0228", email: "grace.whitaker@example.com",
      city: "Northport", zip: "11768", source: "Website chat", stage: "new", service: "Stinging insect nest removal",
      value: 195, temp: "warm", urgency: "This week", created: 18,
      next: { label: "Email visit times", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Desktop",
        pages: [
          ["/", "Tidewick Pest Control", 39],
          ["/wasps-and-hornets", "Wasp and Hornet Nest Removal", 92],
          ["/blog/yellow-jackets-in-the-wall", "Yellow Jackets in the Wall: What to Do", 176],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 18, topic: "Wasp nest removal", page: "/blog/yellow-jackets-in-the-wall",
        messages: [
          ["visitor", "There are yellow jackets going in and out of a gap in my siding. Should I spray it?"],
          ["bot", "Please don't seal or spray the gap yourself. Yellow jackets can chew through drywall into the house. Nest removal is quick and usually one visit. Want us to set one up?"],
          ["visitor", "Yes please. grace.whitaker@example.com"],
          ["bot", "Thanks Grace. The office will email you a few times to choose from."],
        ],
      },
      task: { title: "Email Grace nest removal times", due: -4 },
      draft: "Hi Grace, thanks for reaching out about the yellow jackets in your siding. We have openings in Northport this week, morning or afternoon. Reply with what suits you and we'll lock it in. Until then, keep kids and pets away from that wall.",
    },
    {
      id: "d8", name: "Owen Pritchard", phone: "(516) 555-0245", email: "owen.pritchard@example.com",
      city: "Glen Cove", zip: "11542", source: "Web form", stage: "contacted", service: "Mice in attic",
      value: 900, temp: "warm", urgency: "This month", created: 28,
      next: { label: "Call Owen after 5 PM", at: -6 },
      visit: {
        referrer: "Google", query: "mice in attic glen cove", device: "Desktop",
        pages: [
          ["/rodents", "Mice and Rat Control", 141],
          ["/blog/signs-of-mice-in-the-attic", "6 Signs You Have Mice in the Attic", 198],
          ["/contact", "Book a Pest Visit", 47],
        ],
        converted: "Submitted the website form",
      },
      form: { name: "Website form: Book a pest visit", answers: [["Problem", "Droppings and chewed insulation in the attic"], ["Best time to call", "After 5 PM"]] },
      call: {
        at: 28, seconds: 52, disposition: "Callback requested", outbound: true, after: 61,
        summary: "AI called 61 seconds after the website form. Owen was at work and asked for a call after 5 PM. Confirmed it's mice in the attic. Callback task set.",
        transcript: [
          ["ai", "Hi Owen, this is the AI assistant for Tidewick Pest Control. You just sent our website form about the attic. Is now a good time for two quick questions?"],
          ["caller", "I'm at work actually. Can you call after 5?"],
          ["ai", "Of course. Just so the tech is ready, is it mice you're seeing up there?"],
          ["caller", "Yeah, droppings and chewed insulation."],
          ["ai", "Got it. We'll call you after 5 today to pick a time. You'll get a text from this number too."],
        ],
      },
      task: { title: "Call Owen after 5 PM to book attic visit", due: -6, auto: true },
    },
    {
      id: "d9", name: "Lucia Ferraro", phone: "(516) 555-0219", email: "lucia.ferraro@example.com",
      city: "Smithtown", zip: "11787", source: "Referral", stage: "completed", service: "Bed bug heat treatment",
      value: 3200, temp: "hot", urgency: "Immediate", created: 410,
      notes: "Two bedrooms heat treated in one day. Follow-up check clear. Asked about a discount for her sister in Huntington.",
      appointment: { at: 300, status: "Completed", notes: "Heat treatment, 2 bedrooms. Follow-up visit in 14 days found no activity." },
    },
    {
      id: "d10", name: "Paul Henning", phone: "(516) 555-0282", email: "",
      city: "Port Washington", zip: "11050", source: "Phone call", stage: "contacted", service: "Quarterly pest plan",
      value: 635, temp: "warm", urgency: "This month", created: 120,
      next: { label: "Send quarterly plan quote", at: -20 },
      call: {
        at: 120, seconds: 138, disposition: "Message taken",
        summary: "Wants year-round coverage after ants and spiders this summer. Asked what a quarterly plan includes. Took his details for a quote.",
        transcript: [
          ["ai", "Thanks for calling Tidewick Pest Control. How can I help?"],
          ["caller", "We had ants and spiders all summer. Do you have some kind of regular service?"],
          ["ai", "We do. The quarterly plan covers ants, spiders, roaches and mice with a visit every three months, and free re-service between visits. Want me to have the office send a quote?"],
          ["caller", "Yes. This number is fine."],
          ["ai", "Got it. They'll text you the quote today."],
        ],
      },
      task: { title: "Send Paul the quarterly plan quote", due: -20 },
      quote: { number: "Q-0004", status: "Draft", lines: [["Quarterly perimeter service", 4, 135], ["Initial interior and exterior treatment", 1, 95]] },
      draft: "Hi Paul, it's Tidewick Pest Control. Your quarterly plan quote is ready: four visits a year plus a first full treatment, with free re-service between visits. Want me to text it over or walk you through it on a quick call?",
    },
    {
      id: "d11", name: "Hannah Lindqvist", phone: "(516) 555-0291", email: "hannah.lindqvist@example.com",
      city: "Roslyn", zip: "11576", source: "Web form", stage: "scheduled", service: "Rodent inspection, garage",
      value: 600, temp: "warm", urgency: "This week", created: 72,
      next: { label: "Visit", appt: true },
      visit: {
        referrer: "Facebook ad", query: "", device: "Mobile",
        pages: [
          ["/reviews", "Reviews", 66],
          ["/rodents", "Mice and Rat Control", 84],
          ["/quarterly-plan", "Quarterly Pest Plan", 41],
        ],
        converted: "Submitted the website form",
      },
      form: { name: "Website form: Book a pest visit", answers: [["Problem", "Something chewed through bags of birdseed in the garage"], ["Best time to call", "Weekday mornings"]] },
      appointment: { day: 3, hour: 11, status: "Scheduled", notes: "Chewed birdseed bags in garage. Looked at the quarterly plan page too." },
    },
    {
      id: "d12", name: "Brian Costa", phone: "(516) 555-0258", email: "brian.costa@example.com",
      city: "Great Neck", zip: "11023", source: "Web form", stage: "new", service: "Ant treatment",
      value: 225, temp: "warm", urgency: "This week", created: 9,
      next: { label: "AI callback at 8:00 AM", at: -1 },
      form: { name: "Website form: Book a pest visit", answers: [["Problem", "Small ants coming in along the bathroom baseboard"], ["Best time to call", "Morning"]] },
      call: {
        queued: true, at: 9,
        summary: "Form came in at 10:12 PM. Call held until 8:00 AM, inside calling hours.",
      },
      task: { title: "Morning AI callback: Brian (form came in after hours)", due: -1, auto: true },
    },
  ],

  ads: [
    { id: "a1", name: "Carpenter ants are back", campaign: "Pest leads · Nassau", status: "Active", spend: 412, impr: 18200, clicks: 364, leads: 13, booked: 5, won: 2, wonValue: 1460 },
    { id: "a2", name: "Mice moving in for winter", campaign: "Pest leads · Nassau", status: "Active", spend: 338, impr: 14600, clicks: 281, leads: 10, booked: 4, won: 1, wonValue: 1230 },
    { id: "a3", name: "Termite swarm check", campaign: "Pest leads · Suffolk", status: "Active", spend: 264, impr: 11300, clicks: 198, leads: 6, booked: 2, won: 1, wonValue: 2400 },
    { id: "a4", name: "Bed bugs gone in one day", campaign: "Pest leads · Suffolk", status: "Paused", spend: 146, impr: 6100, clicks: 87, leads: 3, booked: 0, won: 0, wonValue: 0 },
  ],

  speed: { median: 44, calls: 31, reached: 24, booked: 11 },

  anonymous: [
    { id: "v1", city: "Port Washington", device: "Mobile", referrer: "Google", query: "mice in walls port washington", at: 1.4, pages: [["/rodents", "Mice and Rat Control", 81], ["/reviews", "Reviews", 37]] },
    { id: "v2", city: "Huntington", device: "Desktop", referrer: "Google", query: "", at: 6, pages: [["/termites", "Termite Treatment", 102], ["/blog/termite-swarmers-vs-flying-ants", "Termite Swarmers vs. Flying Ants", 64]] },
    { id: "v3", city: "Manhasset", device: "Mobile", referrer: "Facebook ad", query: "", at: 11, pages: [["/quarterly-plan", "Quarterly Pest Plan", 58]] },
    { id: "v4", city: "Smithtown", device: "Mobile", referrer: "ChatGPT", query: "", at: 27, pages: [["/bed-bugs", "Bed Bug Heat Treatment", 133], ["/blog/how-heat-kills-bed-bugs", "How Heat Treatment Kills Bed Bugs", 92]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Port Washington", at: 8, topic: "Service area and pets", page: "/quarterly-plan",
      messages: [
        ["visitor", "Do you service Long Beach? And is the spray safe for cats?"],
        ["bot", "Our main area is the North Shore: Port Washington, Great Neck, Manhasset, Roslyn, Glen Cove, Oyster Bay, Huntington, Northport and Smithtown. For Long Beach the office can confirm. Our treatments are pet-safe once dry, usually about an hour. Want them to reach out?"],
        ["visitor", "No thanks, just checking."],
      ],
    },
  ],

  doneTasks: [
    { title: "Send Frank the termite warranty paperwork", contact: "d4", done: 30 },
    { title: "Schedule Lucia's 14-day bed bug follow-up", contact: "d9", done: 140 },
  ],
};
