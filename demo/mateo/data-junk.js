window.NICHES = window.NICHES || {};
// Sample data for the Kettlehole Hauling demo (junk removal, Long Island).
// Every person, phone number and address here is fictional. Times are relative
// to page load: positive = hours ago, negative = hours ahead.
// Outbound calls are speed-to-lead callbacks: `after` = seconds from form submit to call.
window.NICHES.junk = {
  client: { name: "Kettlehole Hauling", short: "KH", city: "Ronkonkoma, NY", goal: 32000, trade: "Junk removal", appt: "Pickup" },

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
      id: "d1", name: "Dana Whitfield", phone: "(631) 555-0214", email: "dana.whitfield@example.com",
      city: "Holbrook", zip: "11741", source: "Phone call", stage: "booked", service: "Garage cleanout, half truck",
      value: 500, temp: "hot", urgency: "This week", created: 50,
      next: { label: "Pickup", appt: true },
      call: {
        at: 50, seconds: 198, disposition: "Booked",
        summary: "Clearing out a two-car garage before selling. Old bikes, boxes, a broken treadmill. Estimated about half a truck. Booked a pickup for {day} morning.",
        transcript: [
          ["ai", "Thanks for calling Kettlehole Hauling, this is the front desk. How can I help?"],
          ["caller", "Hi, I need my garage cleaned out. We're listing the house next month."],
          ["ai", "Happy to help. What's in there, roughly?"],
          ["caller", "Boxes, a couple of old bikes, a treadmill that doesn't work, some lawn stuff."],
          ["ai", "That sounds like around half a truck, which usually runs $450 to $550. The crew confirms the price on site before loading. I have {day} at 9 AM or 1 PM. Which works?"],
          ["caller", "9 is good."],
          ["ai", "You're set for {day} at 9 AM. You'll get a text confirmation. Anything else?"],
          ["caller", "No, that's it. Thanks."],
        ],
      },
      appointment: { day: 2, hour: 9, status: "Confirmed", notes: "Garage cleanout, about half a truck. Treadmill, bikes, boxes. Driveway access." },
    },
    {
      id: "d2", name: "Marcus Bell", phone: "(631) 555-0227", email: "marcus.bell@example.com",
      city: "Centereach", zip: "11720", source: "Website chat", stage: "scheduled", service: "Basement cleanout, full truck",
      value: 850, temp: "warm", urgency: "This month", created: 96,
      next: { label: "Pickup", appt: true },
      visit: {
        referrer: "Google", query: "basement cleanout suffolk county", device: "Mobile",
        pages: [
          ["/cleanouts", "House and Basement Cleanouts", 108],
          ["/pricing", "Pricing", 74],
          ["/what-we-take", "What We Take", 46],
          ["/cleanouts", "House and Basement Cleanouts", 31],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 96, topic: "Basement cleanout", page: "/cleanouts",
        messages: [
          ["visitor", "How much to clear out a finished basement? Old couch, a bar, lots of boxes."],
          ["bot", "Most basements like that are three quarters to a full truck, so roughly $700 to $900. The crew gives you the exact price on site before they load anything. Are there stairs?"],
          ["visitor", "Yes, one flight with a turn at the bottom."],
          ["bot", "No problem, stairs are included. Can I grab your name and number to set a pickup time?"],
          ["visitor", "Marcus, 631-555-0227"],
          ["bot", "Thanks Marcus. The office will text you today with open times."],
        ],
      },
      appointment: { day: 4, hour: 13, status: "Scheduled", notes: "Finished basement. Sectional, wet bar, boxes. One flight of stairs with a turn." },
    },
    {
      id: "d3", name: "Priya Raman", phone: "(631) 555-0209", email: "priya.raman@example.com",
      city: "Medford", zip: "11763", source: "Meta lead ad", stage: "booked", service: "Hot tub removal",
      value: 550, temp: "hot", urgency: "This week", created: 2,
      next: { label: "Pickup", appt: true },
      form: { name: "Meta instant form: Same-week junk pickup", answers: [["What needs to go?", "Old hot tub on the back deck"], ["How soon?", "This week"], ["Best way to reach you", "Phone call"]] },
      call: {
        at: 2, seconds: 162, disposition: "Booked", outbound: true, after: 45,
        summary: "AI called back 45 seconds after the Meta form. 7-foot hot tub on a ground-level deck, gate access to the backyard, power already off. Quoted $450 to $600. Booked a pickup for {day} at 10 AM.",
        transcript: [
          ["ai", "Hi Priya, this is the AI assistant for Kettlehole Hauling. You just asked for a quote on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Oh wow, that was fast. Sure."],
          ["ai", "Thanks. You mentioned a hot tub. About how big is it, and is the power disconnected?"],
          ["caller", "It's maybe seven feet. My husband shut the breaker off last year, it hasn't run since."],
          ["ai", "Good, that helps. Is it on a deck or a patio, and can a crew get to it through a side gate?"],
          ["caller", "Ground-level deck in the backyard. There's a gate on the left side of the house."],
          ["ai", "Perfect. For a hot tub that size with gate access, removal usually runs $450 to $600, cut-up and haul-away included. I have {day} at 10 AM or 2 PM open. Which works better?"],
          ["caller", "10 AM."],
          ["ai", "You're booked for {day} at 10 AM. The crew confirms the final price before they start. You'll get a text confirmation in a minute. Anything else?"],
          ["caller", "No, that's great. Thank you."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "7 ft hot tub, ground-level deck, power off. Left-side gate access. Quoted $450 to $600." },
    },
    {
      id: "d4", name: "Tom Okafor", phone: "(631) 555-0263", email: "",
      city: "Lake Grove", zip: "11755", source: "Referral", stage: "completed", service: "Whole-house estate cleanout",
      value: 2900, temp: "hot", urgency: "This week", created: 624,
      notes: "Referred by a realtor in Lake Grove. Estate cleanout before closing.",
      appointment: { at: 456, status: "Completed", notes: "Three full truckloads plus donation drop-off. Done in one day." },
      quote: { number: "Q-0001", status: "Accepted", at: 504, lines: [["Full truckload", 3, 850], ["Donation drop-off and receipts", 1, 350]] },
    },
    {
      id: "d5", name: "Rachel Nguyen", phone: "(631) 555-0221", email: "rachel.nguyen@example.com",
      city: "Shirley", zip: "11967", source: "Meta lead ad", stage: "contacted", service: "Shed demo and removal",
      value: 1050, temp: "warm", urgency: "This month", created: 144,
      next: { label: "Send shed demo quote", at: 24 },
      form: { name: "Meta instant form: Same-week junk pickup", answers: [["What needs to go?", "Rotted 10x12 wood shed"], ["How soon?", "This month"], ["Best way to reach you", "Text"]] },
      task: { title: "Send Rachel the shed demo quote", due: 24 },
      quote: { number: "Q-0005", status: "Draft", lines: [["Shed teardown, 10x12 wood", 1, 850], ["Floor and debris haul-away", 1, 200]] },
    },
    {
      id: "d6", name: "Luis Herrera", phone: "(631) 555-0288", email: "luis.herrera@example.com",
      city: "Brentwood", zip: "11717", source: "Web form", stage: "lost", service: "Garage cleanout, chemicals",
      value: 0, temp: "cold", urgency: "This week", created: 432, lostReason: "Hazardous materials, referred out",
      form: { name: "Website form: Free quote", answers: [["What needs to go?", "Old oil drums, paint cans, pool chemicals"], ["Where", "Detached garage"]] },
      call: {
        at: 432, seconds: 84, disposition: "Not a fit", outbound: true, after: 52,
        summary: "AI called back 52 seconds after the web form. Load is mostly motor oil drums, paint and pool chemicals. Explained these can't go on the truck and pointed him to the town's household hazardous waste drop-off.",
        transcript: [
          ["ai", "Hi Luis, this is the AI assistant for Kettlehole Hauling. You just sent a quote request on our website. Is now a good time for two quick questions?"],
          ["caller", "Yeah, go ahead."],
          ["ai", "Thanks. What's in the garage that needs to go?"],
          ["caller", "Mostly old oil drums, a bunch of paint cans and some pool chemicals."],
          ["ai", "I'm sorry, we can't take motor oil, paint or pool chemicals. Those have to go through a hazardous waste drop-off. Your town runs a household hazardous waste program, and I can text you the details. Is there anything else, like furniture or boxes?"],
          ["caller", "No, that's pretty much it."],
          ["ai", "Understood. I'll text you the drop-off info now. If anything else comes up, we're happy to help."],
        ],
      },
    },
    {
      id: "d7", name: "Hannah Brooks", phone: "(631) 555-0235", email: "hannah.brooks@example.com",
      city: "Ronkonkoma", zip: "11779", source: "Website chat", stage: "new", service: "Single item, sleeper sofa",
      value: 195, temp: "warm", urgency: "This week", created: 20,
      next: { label: "Text Hannah pickup times", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Desktop",
        pages: [
          ["/", "Kettlehole Hauling", 38],
          ["/what-we-take", "What We Take", 71],
          ["/blog/how-to-get-rid-of-a-sleeper-sofa", "How to Get Rid of a Sleeper Sofa", 164],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 20, topic: "Furniture removal", page: "/blog/how-to-get-rid-of-a-sleeper-sofa",
        messages: [
          ["visitor", "Do you take just one sleeper sofa? It's on the second floor."],
          ["bot", "Yes. Single items start at $120, and a sleeper sofa from upstairs is usually $175 to $225. The crew carries it down. Want a pickup this week?"],
          ["visitor", "Yes please. hannah.brooks@example.com"],
          ["bot", "Thanks Hannah. The office will send you a few times to choose from."],
        ],
      },
      task: { title: "Text Hannah pickup times", due: -4 },
      draft: "Hi Hannah, it's Kettlehole Hauling. We can grab the sleeper sofa in Ronkonkoma this week, morning or afternoon. Reply with the day that works and we'll lock it in.",
    },
    {
      id: "d8", name: "Greg Sutton", phone: "(631) 555-0294", email: "greg.sutton@example.com",
      city: "Bay Shore", zip: "11706", source: "Meta lead ad", stage: "contacted", service: "Yard debris and old fencing",
      value: 300, temp: "warm", urgency: "This month", created: 6,
      next: { label: "Follow up, no answer", at: -3 },
      form: { name: "Meta instant form: Same-week junk pickup", answers: [["What needs to go?", "Old fence panels and yard debris"], ["How soon?", "Next couple of weeks"], ["Best way to reach you", "Phone call"]] },
      call: {
        at: 6, seconds: 31, disposition: "No answer, text sent", outbound: true, after: 38,
        summary: "AI called back 38 seconds after the Meta form. No answer. Left a short voicemail and sent a text with a link to pick a time.",
        transcript: [
          ["ai", "Hi Greg, this is the AI assistant for Kettlehole Hauling, calling about the quote you just asked for on Facebook. I'll send you a text so you can pick a pickup time whenever it's convenient. Talk soon."],
        ],
      },
      task: { title: "Follow up with Greg, AI callback went to voicemail", due: -3, auto: true },
      draft: "Hi Greg, it's Kettlehole Hauling. Fence panels and yard debris usually fit in a quarter truck, around $300. Want us out this week or next? Reply with a day and we'll book it.",
    },
    {
      id: "d9", name: "Alicia Moreno", phone: "(631) 555-0216", email: "alicia.moreno@example.com",
      city: "Central Islip", zip: "11722", source: "Referral", stage: "completed", service: "Light demo, kitchen cabinets",
      value: 1150, temp: "hot", urgency: "This month", created: 528,
      notes: "Paid in full. Asked about a referral discount for her sister in Holbrook.",
      appointment: { at: 240, status: "Completed", notes: "Cabinets and countertop removed ahead of her contractor." },
      quote: { number: "Q-0002", status: "Accepted", at: 312, lines: [["Cabinet and countertop tear-out", 1, 650], ["Full truckload haul-away", 1, 500]] },
    },
    {
      id: "d10", name: "Ben Carter", phone: "(631) 555-0252", email: "",
      city: "Holbrook", zip: "11741", source: "Phone call", stage: "scheduled", service: "Attic cleanout, on-site quote",
      value: 1800, temp: "warm", urgency: "This month", created: 120,
      next: { label: "Pickup", appt: true },
      call: {
        at: 120, seconds: 176, disposition: "Booked",
        summary: "Parents' attic and spare room, hard to estimate by phone. Booked a free on-site quote. Pull-down attic stairs only.",
        transcript: [
          ["ai", "Thanks for calling Kettlehole Hauling. How can I help?"],
          ["caller", "My parents are downsizing. The attic and a spare room are packed and I have no idea how much it is."],
          ["ai", "That's common. For a bigger cleanout we can send someone to give you an exact price for free. Is the attic reached by pull-down stairs?"],
          ["caller", "Yeah, the fold-down kind."],
          ["ai", "Got it, I'll note that for the crew. I have {day} at 11 AM or 3 PM. Which works?"],
          ["caller", "11."],
          ["ai", "You're set for {day} at 11 AM. You'll get a text confirmation."],
        ],
      },
      appointment: { day: 3, hour: 11, status: "Scheduled", notes: "Free on-site quote. Attic via pull-down stairs plus spare room. Likely 2 truckloads." },
    },
    {
      id: "d11", name: "Sofia Patel", phone: "(631) 555-0270", email: "sofia.patel@example.com",
      city: "Lake Grove", zip: "11755", source: "Web form", stage: "contacted", service: "Mattress and box spring, quarter truck",
      value: 300, temp: "warm", urgency: "This week", created: 30,
      next: { label: "Confirm pickup day", at: -20 },
      visit: {
        referrer: "Google", query: "mattress removal lake grove ny", device: "Mobile",
        pages: [
          ["/pricing", "Pricing", 88],
          ["/what-we-take", "What We Take", 52],
          ["/contact", "Get a Free Quote", 40],
        ],
        converted: "Submitted the quote form",
      },
      form: { name: "Website form: Free quote", answers: [["What needs to go?", "Two mattresses, box springs, a dresser"], ["Best time to call", "After 5 PM"]] },
      task: { title: "Call Sofia after 5 PM to confirm pickup day", due: -20 },
    },
    {
      id: "d12", name: "Kevin Ross", phone: "(631) 555-0247", email: "kevin.ross@example.com",
      city: "Bay Shore", zip: "11706", source: "Web form", stage: "new", service: "Dumpster alternative, renovation debris",
      value: 750, temp: "warm", urgency: "This week", created: 10,
      next: { label: "AI callback at 8:00 AM", at: -1 },
      visit: {
        referrer: "Google", query: "dumpster rental vs junk removal", device: "Desktop",
        pages: [
          ["/blog/dumpster-vs-junk-removal", "Dumpster vs Junk Removal: Which Costs Less?", 211],
          ["/pricing", "Pricing", 63],
          ["/contact", "Get a Free Quote", 35],
        ],
        converted: "Submitted the quote form",
      },
      form: { name: "Website form: Free quote", answers: [["What needs to go?", "Drywall, old carpet and trim from a bathroom and bedroom reno"], ["Best time to call", "Mornings"]] },
      call: { queued: true, at: 9, summary: "Form came in at 10:12 PM. Call held until 8:00 AM, inside calling hours." },
      task: { title: "Morning: check AI callback reached Kevin", due: -1, auto: true },
    },
  ],

  anonymous: [
    { id: "v1", city: "Ronkonkoma", device: "Mobile", referrer: "Google", query: "junk removal near me", at: 1.4, pages: [["/pricing", "Pricing", 66], ["/what-we-take", "What We Take", 41]] },
    { id: "v2", city: "Medford", device: "Mobile", referrer: "Facebook ad", query: "", at: 4, pages: [["/hot-tub-removal", "Hot Tub Removal", 79]] },
    { id: "v3", city: "Centereach", device: "Desktop", referrer: "Google", query: "estate cleanout long island", at: 12, pages: [["/cleanouts", "House and Basement Cleanouts", 94], ["/pricing", "Pricing", 38]] },
    { id: "v4", city: "Shirley", device: "Mobile", referrer: "ChatGPT", query: "", at: 27, pages: [["/blog/dumpster-vs-junk-removal", "Dumpster vs Junk Removal: Which Costs Less?", 122]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Brentwood", at: 7, topic: "Same-day pickup", page: "/what-we-take",
      messages: [
        ["visitor", "Do you do same-day? And do you take old TVs?"],
        ["bot", "Same-day is often possible if you reach us before noon. We take old TVs and most electronics and recycle them. Want me to check today's openings?"],
        ["visitor", "Not today, maybe next week."],
        ["bot", "Sounds good. You can book anytime from the Pricing page or text us."],
      ],
    },
  ],

  doneTasks: [
    { title: "Email Tom the donation receipts", contact: "d4", done: 30 },
    { title: "Call Alicia's sister (referral)", contact: "d9", done: 52 },
  ],

  ads: [
    { id: "a1", name: "Garage gone by Friday", campaign: "Cleanout leads · Suffolk", status: "Active", spend: 412, impr: 18200, clicks: 364, leads: 14, booked: 5, won: 3, wonValue: 4100 },
    { id: "a2", name: "Hot tub out in one visit", campaign: "Hot tub removal · Suffolk", status: "Active", spend: 286, impr: 11900, clicks: 241, leads: 11, booked: 6, won: 4, wonValue: 2150 },
    { id: "a3", name: "Skip the dumpster", campaign: "Dumpster alternative · Suffolk", status: "Active", spend: 338, impr: 15400, clicks: 297, leads: 12, booked: 4, won: 2, wonValue: 1600 },
    { id: "a4", name: "Estate cleanouts, one call", campaign: "Cleanout leads · Suffolk", status: "Paused", spend: 174, impr: 8300, clicks: 118, leads: 4, booked: 1, won: 1, wonValue: 2900 },
  ],

  speed: { median: 44, calls: 68, reached: 49, booked: 23 },
};
