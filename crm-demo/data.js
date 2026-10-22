// Sample data for the Bluestem Foundation Repair demo. Every person, phone
// number and address here is fictional. Times are relative to page load so
// the demo never looks stale: positive = hours ago, negative = hours ahead.

window.DEMO = {
  client: { name: "Bluestem Foundation Repair", short: "BF", city: "Round Rock, TX", goal: 40000 },

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
      id: "d1", name: "Dana Whitfield", phone: "(512) 555-0142", email: "dana.whitfield@example.com",
      city: "Round Rock", zip: "78664", source: "Phone call", stage: "booked", service: "Slab foundation inspection",
      value: 8500, temp: "hot", urgency: "This week", created: 50,
      next: { label: "Inspection" },
      call: {
        at: 50, seconds: 214, disposition: "Booked",
        summary: "Caller noticed new cracks above two interior doors and a sticking back door. Booked a free inspection for {day} morning.",
        transcript: [
          ["ai", "Thanks for calling Bluestem Foundation Repair, this is the front desk. How can I help?"],
          ["caller", "Hi, I've got cracks showing up over a couple of doors and the back door started sticking."],
          ["ai", "That's worth a look. How long have you been seeing the cracks?"],
          ["caller", "Maybe a month. They're getting longer."],
          ["ai", "Got it. We do free foundation inspections. I have {day} at 9 AM or 1 PM open. Which works?"],
          ["caller", "9 is good."],
          ["ai", "You're set for {day} at 9 AM. You'll get a text confirmation. Anything else?"],
          ["caller", "No, that's it. Thanks."],
        ],
      },
      appointment: { day: 2, hour: 9, status: "Confirmed", notes: "Free inspection. Interior cracks over 2 doors, back door sticking." },
    },
    {
      id: "d2", name: "Marcus Bell", phone: "(512) 555-0177", email: "marcus.bell@example.com",
      city: "Pflugerville", zip: "78660", source: "Website chat", stage: "scheduled", service: "Pier and beam leveling",
      value: 12400, temp: "warm", urgency: "This month", created: 96,
      next: { label: "Inspection" },
      visit: {
        referrer: "Google", query: "pier and beam leveling round rock", device: "Mobile",
        pages: [
          ["/services/pier-and-beam", "Pier and Beam Leveling", 112],
          ["/financing", "Financing", 41],
          ["/reviews", "Reviews", 65],
          ["/services/pier-and-beam", "Pier and Beam Leveling", 38],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 96, topic: "Pier and beam leveling", page: "/services/pier-and-beam",
        messages: [
          ["visitor", "Do you work on pier and beam houses? Floors are sloping in the kitchen."],
          ["bot", "Yes, pier and beam leveling is one of our main services. Sloping floors usually mean shifted or settled piers. Want me to set up a free inspection?"],
          ["visitor", "Sure, how much does leveling usually run?"],
          ["bot", "It depends on how many piers need work, so the inspector gives you a written quote on site. Can I grab your name and number?"],
          ["visitor", "Marcus, 512-555-0177"],
          ["bot", "Thanks Marcus. Someone from the office will call you today to pick a time."],
        ],
      },
      appointment: { day: 5, hour: 13, status: "Scheduled", notes: "Kitchen floor slope. Asked about price range on chat." },
    },
    {
      id: "d3", name: "Priya Raman", phone: "(512) 555-0109", email: "priya.raman@example.com",
      city: "Cedar Park", zip: "78613", source: "Phone call", stage: "new", service: "Water in crawl space",
      value: 3200, temp: "hot", urgency: "Immediate", created: 3,
      next: { label: "Call back about same-day visit", at: -1 },
      call: {
        at: 3, seconds: 96, disposition: "Transferred",
        summary: "Standing water under the house after last night's storm. Wants someone out today. Flagged urgent and handed to the office.",
        transcript: [
          ["ai", "Thanks for calling Bluestem Foundation Repair. How can I help?"],
          ["caller", "There's water under my house after the storm. Can someone come today?"],
          ["ai", "I'm sorry, that's stressful. I'm going to connect you with the office right now so they can check today's schedule. One moment."],
        ],
      },
      task: { title: "Call Priya back about same-day crawl space visit", due: -1, auto: true },
      draft: "Hi Priya, this is Bluestem Foundation Repair. We can get a tech out to look at the crawl space at your place in Cedar Park on our first open slot. What time works best for you?",
    },
    {
      id: "d4", name: "Tom Okafor", phone: "(512) 555-0163", email: "",
      city: "Georgetown", zip: "78626", source: "Referral", stage: "completed", service: "Foundation repair, 14 piers",
      value: 17800, temp: "hot", urgency: "This week", created: 624,
      notes: "Referred by a past customer on the same street.",
      appointment: { at: 456, status: "Completed", notes: "Inspection done, quote accepted on site." },
      quote: { number: "Q-0001", status: "Accepted", at: 336, lines: [["Pressed concrete pier", 14, 1150], ["Engineer report and city permit", 1, 1700]] },
    },
    {
      id: "d5", name: "Rachel Nguyen", phone: "(512) 555-0121", email: "rachel.nguyen@example.com",
      city: "Austin", zip: "78745", source: "Meta lead ad", stage: "contacted", service: "Drainage and gutter regrade",
      value: 2600, temp: "warm", urgency: "This month", created: 144,
      next: { label: "Send drainage quote", at: 24 },
      form: { name: "Meta instant form: Free drainage check", answers: [["Main problem", "Water pooling by the back patio"], ["Home type", "Slab"], ["When", "This month"]] },
      task: { title: "Send Rachel the drainage quote", due: 24 },
      quote: { number: "Q-0005", status: "Draft", lines: [["French drain, per linear foot", 60, 32], ["Gutter downspout extensions", 4, 170]] },
    },
    {
      id: "d6", name: "Luis Herrera", phone: "(512) 555-0188", email: "",
      city: "Hutto", zip: "78634", source: "Phone call", stage: "lost", service: "Foundation inspection",
      value: 6000, temp: "cold", urgency: "Just researching", created: 432, lostReason: "Went with a cheaper quote",
      call: {
        at: 432, seconds: 142, disposition: "Message taken",
        summary: "Getting three quotes before selling the house. Took a message for the owner to call back.",
        transcript: [
          ["ai", "Thanks for calling Bluestem Foundation Repair. How can I help?"],
          ["caller", "I'm selling my house and the inspector flagged the foundation. I'm getting a few quotes."],
          ["ai", "Understood. I can take your details and have the owner call you back today. What's the best number?"],
          ["caller", "This one is fine."],
          ["ai", "Got it. He'll call you this afternoon."],
        ],
      },
    },
    {
      id: "d7", name: "Hannah Brooks", phone: "(512) 555-0135", email: "hannah.brooks@example.com",
      city: "Leander", zip: "78641", source: "Website chat", stage: "new", service: "Brick crack repair",
      value: 1400, temp: "warm", urgency: "This week", created: 20,
      next: { label: "Email inspection times", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Desktop",
        pages: [
          ["/", "Bluestem Foundation Repair", 44],
          ["/services/crack-repair", "Crack Repair", 96],
          ["/blog/stair-step-cracks-in-brick", "Are Stair-Step Cracks Serious?", 183],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 20, topic: "Brick crack repair", page: "/blog/stair-step-cracks-in-brick",
        messages: [
          ["visitor", "I have a stair-step crack in my brick outside. Is that bad?"],
          ["bot", "Stair-step cracks in brick often point to foundation movement, so it's worth an inspection. They're free. Want to book one?"],
          ["visitor", "Yes please. hannah.brooks@example.com"],
          ["bot", "Thanks Hannah. The office will email you a few times to choose from."],
        ],
      },
      task: { title: "Email Hannah inspection times", due: -4 },
      draft: "Hi Hannah, thanks for reaching out about the crack in your brick. We have free inspection slots in Leander this week, morning or afternoon. Reply with the day and time that suits you and we'll lock it in.",
    },
    {
      id: "d8", name: "Greg Sutton", phone: "(512) 555-0194", email: "",
      city: "Round Rock", zip: "78681", source: "Phone call", stage: "booked", service: "Pier and beam leveling",
      value: 9800, temp: "hot", urgency: "This week", created: 192,
      next: { label: "Inspection" },
      call: {
        at: 192, seconds: 188, disposition: "Booked",
        summary: "Bouncy floors in the living room. Booked an inspection. Asked about financing; told him the inspector covers options on site.",
        transcript: [
          ["ai", "Thanks for calling Bluestem Foundation Repair. How can I help?"],
          ["caller", "My living room floor feels bouncy. Do you do pier and beam?"],
          ["ai", "We do. A free inspection is the first step. I have {day} at 10 AM. Does that work?"],
          ["caller", "Yes. Do you offer financing?"],
          ["ai", "The inspector goes over financing options with you on site. You're booked for {day} at 10."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "Bouncy living room floor. Ask about financing." },
      quote: { number: "Q-0004", status: "Sent", at: 24, lines: [["Pier and beam shim and reset", 1, 7400], ["Replace rotted sill joists", 6, 400]] },
    },
    {
      id: "d9", name: "Alicia Moreno", phone: "(512) 555-0116", email: "alicia.moreno@example.com",
      city: "Austin", zip: "78704", source: "Referral", stage: "completed", service: "Foundation repair, 8 piers",
      value: 10900, temp: "hot", urgency: "This month", created: 528,
      notes: "Paid in full. Asked about a referral discount for her neighbor.",
      quote: { number: "Q-0002", status: "Accepted", at: 216, lines: [["Pressed concrete pier", 8, 1150], ["Engineer report and city permit", 1, 1700]] },
    },
    {
      id: "d10", name: "Ben Carter", phone: "(512) 555-0152", email: "",
      city: "Austin", zip: "78758", source: "Phone call", stage: "contacted", service: "Foundation inspection",
      value: 5500, temp: "warm", urgency: "This month", created: 240,
      next: { label: "Follow up, no answer last time", at: -24 },
      task: { title: "Follow up with Ben, no answer last time", due: -24, auto: true },
      draft: "Hi Ben, it's Bluestem Foundation Repair following up on your inspection request. I tried you earlier this week. Is a quick call this afternoon or tomorrow morning better?",
    },
    {
      id: "d11", name: "Sofia Patel", phone: "(512) 555-0170", email: "sofia.patel@example.com",
      city: "Cedar Park", zip: "78613", source: "Website chat", stage: "completed", service: "Drainage correction",
      value: 3900, temp: "warm", urgency: "This week", created: 360,
      visit: {
        referrer: "Google", query: "foundation drainage cedar park", device: "Mobile",
        pages: [
          ["/services/drainage", "Drainage Solutions", 128],
          ["/projects", "Recent Projects", 57],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 360, topic: "Drainage correction", page: "/projects",
        messages: [
          ["visitor", "Water keeps pooling against my foundation on one side. Is that something you fix?"],
          ["bot", "Yes. Pooling water along the slab is one of the main causes of settlement, and drainage correction is a common fix. Would you like a free drainage check?"],
          ["visitor", "Yes. Sofia, 512-555-0170, I'm in Cedar Park"],
          ["bot", "Thanks Sofia. The office will call you today to set a time."],
        ],
      },
      quote: { number: "Q-0003", status: "Accepted", at: 96, lines: [["Surface drain system", 1, 3100], ["Yard regrade", 1, 800]] },
    },
    {
      id: "d12", name: "Kevin Ross", phone: "(512) 555-0127", email: "",
      city: "Austin", zip: "78750", source: "Phone call", stage: "new", service: "After-hours call, slab question",
      value: 0, temp: "cold", urgency: "Just researching", created: 11,
      next: { label: "Morning callback", at: -2 },
      call: {
        at: 11, seconds: 121, disposition: "Message taken", afterHours: true,
        summary: "Called at 9:40 PM asking if small slab cracks are normal. Answered general questions and took his number for a morning call.",
        transcript: [
          ["ai", "Thanks for calling Bluestem Foundation Repair. We're closed right now, but I can help. What's going on?"],
          ["caller", "Just wondering if hairline cracks in the garage slab are normal."],
          ["ai", "Hairline cracks in garage slabs are common and often cosmetic. Wider or uneven cracks are worth a look. Want the office to call you in the morning?"],
          ["caller", "Sure."],
        ],
      },
      task: { title: "Morning callback: Kevin (after-hours call)", due: -2, auto: true },
    },
    {
      id: "d13", name: "Megan Ortiz", phone: "(512) 555-0139", email: "megan.ortiz@example.com",
      city: "Pflugerville", zip: "78660", source: "Meta lead ad", stage: "scheduled", service: "Slab leveling",
      value: 4800, temp: "warm", urgency: "This week", created: 70,
      next: { label: "Inspection" },
      form: { name: "Meta instant form: Free foundation inspection", answers: [["Main problem", "Gaps under baseboards, uneven floor"], ["Home type", "Slab"], ["When", "This week"]] },
      visit: {
        referrer: "Facebook ad", query: "", device: "Mobile",
        pages: [
          ["/reviews", "Reviews", 72],
          ["/services/slab-leveling", "Slab Leveling", 88],
        ],
        converted: "Sent the Meta lead form",
      },
      appointment: { day: 3, hour: 11, status: "Scheduled", notes: "Gaps under baseboards. Read reviews and the slab leveling page from the ad." },
    },
    {
      id: "d14", name: "Jordan Lee", phone: "(512) 555-0158", email: "jordan.lee@example.com",
      city: "Round Rock", zip: "78665", source: "Web form", stage: "contacted", service: "Interior crack repair",
      value: 2200, temp: "warm", urgency: "This month", created: 168,
      next: { label: "Confirm inspection time", at: 48 },
      visit: {
        referrer: "Google", query: "drywall cracks foundation round rock", device: "Desktop",
        pages: [
          ["/blog/drywall-cracks-and-your-foundation", "Drywall Cracks and Your Foundation", 204],
          ["/services/crack-repair", "Crack Repair", 61],
          ["/about", "About Us", 39],
          ["/contact", "Get a Free Inspection", 52],
        ],
        converted: "Submitted the inspection form",
      },
      form: { name: "Website form: Free inspection", answers: [["Problem", "Diagonal cracks at the corners of two bedroom doors"], ["Best time to call", "Weekday mornings"]] },
      task: { title: "Call Jordan to confirm inspection time", due: 48 },
    },
  ],

  anonymous: [
    { id: "v1", city: "Austin", device: "Mobile", referrer: "Google", query: "foundation repair cost austin", at: 1.2, pages: [["/services/foundation-repair", "Foundation Repair", 74], ["/financing", "Financing", 50]] },
    { id: "v2", city: "Round Rock", device: "Desktop", referrer: "Google", query: "", at: 5, pages: [["/", "Bluestem Foundation Repair", 41]] },
    { id: "v3", city: "Georgetown", device: "Mobile", referrer: "Facebook ad", query: "", at: 9, pages: [["/reviews", "Reviews", 58], ["/projects", "Recent Projects", 33]] },
    { id: "v4", city: "Pflugerville", device: "Desktop", referrer: "Direct", query: "", at: 26, pages: [["/services/drainage", "Drainage Solutions", 112]] },
    { id: "v5", city: "Cedar Park", device: "Mobile", referrer: "ChatGPT", query: "", at: 31, pages: [["/financing", "Financing", 33], ["/services/slab-leveling", "Slab Leveling", 47]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Austin", at: 7, topic: "Hours and service area", page: "/",
      messages: [
        ["visitor", "Do you come out to Kyle?"],
        ["bot", "Our main service area is Round Rock, Austin, Cedar Park, Pflugerville, Georgetown, Leander and Hutto. For Kyle, the office can confirm. Want me to have them reach out?"],
        ["visitor", "No thanks, just checking."],
      ],
    },
  ],

  doneTasks: [
    { title: "Send Tom the warranty paperwork", contact: "d4", done: 30 },
    { title: "Call Alicia's neighbor (referral)", contact: "d9", done: 52 },
  ],
};
