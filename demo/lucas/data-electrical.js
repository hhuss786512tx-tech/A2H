// Sample data for the Lucas Electrical Inc demo. The company name, license,
// hours and service area are real (the demo was built for its owner); every
// customer, phone number, address, price and ad number here is made up.
// Times are relative to page load: positive = hours ago, negative = hours
// ahead. All calls are inbound: Alex, the AI assistant, answers the shop line,
// asks who is calling and why, books real customers and hangs up on vendors
// and robocalls. Those hang-ups live in `screened`.
// Alex never quotes a price. Estimates are free and the electrician prices the
// job on site or from a texted photo.

window.NICHES = window.NICHES || {};
window.NICHES.electrical = {
  client: { name: "Lucas Electrical Inc", short: "LE", city: "Antioch, CA", goal: 35000, trade: "Electrical", appt: "Estimate visit", license: "1101130", hours: "Mon–Fri 7 AM–5 PM" },

  stages: [
    { id: "new", label: "New" },
    { id: "contacted", label: "Contacted" },
    { id: "scheduled", label: "Scheduled" },
    { id: "booked", label: "Booked" },
    { id: "completed", label: "Completed" },
    { id: "lost", label: "Lost" },
  ],

  // Kept so shared code that reads D.speed keeps working. There is no
  // speed-to-lead caller on this demo; these are 30-day answering numbers.
  speed: { median: 2, calls: 61, reached: 61, booked: 23, answered: 61, afterHours: 17, screened: 24 },

  ads: [
    { id: "a1", name: "EV charger installed, free estimate", campaign: "EV leads · East Contra Costa", status: "Active", spend: 386, impr: 17400, clicks: 352, leads: 14, booked: 7, won: 4, wonValue: 6400 },
    { id: "a2", name: "Panel upgrade? Licensed, permitted, done right", campaign: "Panel leads · East Bay", status: "Active", spend: 412, impr: 15100, clicks: 263, leads: 8, booked: 3, won: 1, wonValue: 3600 },
    { id: "a3", name: "Outlets dead? Breaker tripping? Same-week fix", campaign: "Repair leads · Antioch + Brentwood", status: "Active", spend: 204, impr: 12600, clicks: 198, leads: 9, booked: 4, won: 3, wonValue: 870 },
    { id: "a4", name: "Commercial LED retrofit, cut the light bill", campaign: "Commercial · Concord + Walnut Creek", status: "Paused", spend: 88, impr: 3900, clicks: 51, leads: 1, booked: 0, won: 0, wonValue: 0 },
  ],

  deals: [
    {
      id: "d1", name: "Renee Castillo", phone: "(925) 555-0112", email: "renee.castillo@example.com",
      city: "Antioch", zip: "94531", source: "Phone call", stage: "booked", service: "EV charger install, Level 2 in garage",
      value: 1650, temp: "hot", urgency: "This week", created: 5,
      next: { label: "Estimate visit", appt: true },
      call: {
        at: 5, seconds: 171, disposition: "Booked", afterHours: true,
        summary: "Called at 6:50 PM after the shop closed. Just bought an EV, wants a Level 2 charger in an attached garage, 200 amp panel on the far wall. Told her the estimate is free and the electrician prices it on site. Booked {day} at 9 AM.",
        transcript: [
          ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
          ["caller", "Hi, this is Renee. We just got an EV and need a charger put in the garage."],
          ["ai", "Congrats on the car. Is the garage attached to the house, and do you know where your electrical panel is?"],
          ["caller", "Attached, and the panel's in the garage on the far wall. It says 200 on it."],
          ["ai", "Perfect, that's a good setup. The estimate's free and the electrician gives you the exact price on site. I've got {day} at 9 AM or 1 PM. Which works?"],
          ["caller", "9 is good."],
          ["ai", "You're set for {day} at 9. You'll get a text with the electrician's name. Have the charger model handy if you've picked one."],
        ],
      },
      appointment: { day: 1, hour: 9, status: "Confirmed", notes: "Level 2 EV charger, attached garage, 200A panel on far garage wall. Ask which charger she bought." },
    },
    {
      id: "d2", name: "Kevin Tran", phone: "(925) 555-0147", email: "kevin.tran@example.com",
      city: "Brentwood", zip: "94513", source: "Website chat", stage: "scheduled", service: "Panel upgrade, 100A to 200A",
      value: 3800, temp: "warm", urgency: "This month", created: 72,
      next: { label: "Estimate visit", appt: true },
      visit: {
        referrer: "Google", query: "panel upgrade cost brentwood ca", device: "Mobile",
        pages: [
          ["/panel-upgrades", "Panel & Service Upgrades", 144],
          ["/ev-charger-installation", "EV Charger Installation", 61],
          ["/reviews", "Reviews", 39],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 72, topic: "Panel upgrade", page: "/panel-upgrades",
        messages: [
          ["visitor", "Our house has a 100 amp panel and we want to add an EV charger and a heat pump. Do we need to upgrade? What does it cost?"],
          ["bot", "With a charger and a heat pump on 100 amps, an upgrade to 200 is usually the right call. Pricing depends on the panel, the meter and PG&E, so the electrician looks first. The estimate is free. Want to set one up?"],
          ["visitor", "Yes. Kevin, 925-555-0147"],
          ["bot", "Thanks Kevin. The office will text you a couple of times to pick from."],
        ],
      },
      appointment: { day: 3, hour: 13, status: "Scheduled", notes: "100A to 200A, planning EV charger + heat pump. Check meter main and PG&E service drop." },
    },
    {
      id: "d3", name: "Angela Reyes", phone: "(925) 555-0163", email: "angela.reyes@example.com",
      city: "Oakley", zip: "94561", source: "Meta lead ad", stage: "booked", service: "Half the kitchen outlets dead",
      value: 275, temp: "hot", urgency: "Today", created: 4,
      next: { label: "Service visit", appt: true },
      form: { name: "Meta instant form: Electrical repair", answers: [["What's going on", "Half the outlets in the kitchen stopped working"], ["Home or business", "Home"], ["When", "As soon as possible"]] },
      call: {
        at: 3.6, seconds: 149, disposition: "Booked",
        summary: "She called the line 25 minutes after sending the form. Half the kitchen outlets dead, breaker not tripped. Walked her through the GFCI reset, no luck. Booked tomorrow at 8 AM.",
        transcript: [
          ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
          ["caller", "It's Angela Reyes, I filled out the form on Facebook. Half my kitchen outlets just died."],
          ["ai", "Thanks Angela, I've got your form here. Is any breaker in the panel tripped or sitting in the middle?"],
          ["caller", "No, they all look fine."],
          ["ai", "Okay. Is there an outlet in the kitchen with little Test and Reset buttons? Try pushing Reset."],
          ["caller", "Tried it. Nothing."],
          ["ai", "Then an electrician should take a look. Earliest I've got is tomorrow at 8 AM. Want it?"],
          ["caller", "Yes please."],
          ["ai", "Done, tomorrow at 8. He'll find the fault and give you the price before touching anything."],
        ],
      },
      appointment: { day: 1, hour: 8, status: "Confirmed", notes: "Kitchen outlets dead, GFCI reset didn't help, no tripped breakers. Likely a bad GFCI or a loose neutral." },
    },
    {
      id: "d4", name: "Dale Hoffman", phone: "(925) 555-0128", email: "",
      city: "Pittsburg", zip: "94565", source: "Referral", stage: "completed", service: "Recessed lighting, living room (8 cans)",
      value: 1450, temp: "hot", urgency: "This month", created: 600,
      notes: "Referred by Linda Okoro. Left a 5-star Google review.",
      appointment: { at: 560, status: "Completed", notes: "Installed 8 LED recessed cans with a dimmer. Paid by card on site." },
      quote: { number: "Q-0101", status: "Accepted", at: 560, lines: [["LED recessed light, installed", 8, 165], ["Dimmer switch", 1, 130]] },
    },
    {
      id: "d5", name: "Monica Alvarez", phone: "(925) 555-0139", email: "monica.alvarez@example.com",
      city: "Concord", zip: "94520", source: "Web form", stage: "contacted", service: "Generator hookup, transfer switch",
      value: 2900, temp: "warm", urgency: "This month", created: 120,
      next: { label: "Send Monica the interlock vs transfer switch rundown", at: 20 },
      form: { name: "Website form: Request an estimate", answers: [["What do you need", "Hook up a portable generator so it runs the fridge and furnace during PG&E shutoffs"], ["Home or business", "Home"], ["Best time to call", "Afternoons"]] },
      call: {
        at: 118, seconds: 188, disposition: "Estimate requested",
        summary: "She called after sending the form. Wants a portable generator wired in for PG&E shutoffs. Asked about interlock vs transfer switch; Alex said the electrician would explain both on site and sent the office a task to text the rundown. Estimate visit still to be picked.",
        transcript: [
          ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
          ["caller", "Monica Alvarez. I sent a form about hooking up a generator. Is an interlock cheaper than a transfer switch?"],
          ["ai", "Good question. Both are things we do, and which one fits depends on your panel and what you want to run. I won't guess at the price, but the estimate is free and the electrician walks you through both options on site."],
          ["caller", "Okay. Can someone send me something to read first?"],
          ["ai", "Sure, I'll have the office text you a short rundown today. Want me to pencil in a time for the estimate as well?"],
          ["caller", "Let me read it first."],
          ["ai", "No problem, Monica. Watch for the text."],
        ],
      },
      task: { title: "Text Monica the interlock vs transfer switch rundown", due: 20 },
      quote: { number: "Q-0105", status: "Draft", lines: [["Generator inlet + interlock kit, installed", 1, 1650], ["Permit and inspection", 1, 350]] },
    },
    {
      id: "d6", name: "Frank Delgado", phone: "(925) 555-0181", email: "",
      city: "Livermore", zip: "94550", source: "Phone call", stage: "lost", service: "Rooftop solar install",
      value: 0, temp: "cold", urgency: "Just researching", created: 300, lostReason: "Wanted rooftop solar installed, not a service we offer",
      call: {
        at: 300, seconds: 66, disposition: "Not a fit",
        summary: "Wanted a quote on rooftop solar panels. Explained we do the electrical side but don't install solar systems. Marked not a fit.",
        transcript: [
          ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
          ["caller", "Frank Delgado. I'm looking to get solar panels put on my roof. Do you guys do that?"],
          ["ai", "Thanks Frank. We don't install solar systems, so that one's outside what we handle. If a solar company needs panel or service work done for the install, we're happy to help with that part."],
          ["caller", "Okay, good to know. Thanks."],
        ],
      },
    },
    {
      id: "d7", name: "Priyanka Shah", phone: "(925) 555-0154", email: "priyanka.shah@example.com",
      city: "Walnut Creek", zip: "94598", source: "Website chat", stage: "new", service: "Ceiling fan + two dimmers",
      value: 520, temp: "warm", urgency: "This week", created: 18,
      next: { label: "Text Priyanka visit times", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Desktop",
        pages: [
          ["/", "Lucas Electrical Inc", 29],
          ["/lighting", "Lighting & Ceiling Fans", 95],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 18, topic: "Ceiling fan install", page: "/lighting",
        messages: [
          ["visitor", "Can you install a ceiling fan where there's only a light fixture now? And swap two switches for dimmers?"],
          ["bot", "Yes, both are common jobs. The box may need to be swapped for a fan-rated one, which the electrician checks on site. Want someone to come by this week?"],
          ["visitor", "Yes please. priyanka.shah@example.com"],
          ["bot", "Thanks Priyanka. The office will text you a few times to pick from."],
        ],
      },
      task: { title: "Text Priyanka visit times", due: -4 },
      draft: "Hi Priyanka, it's Lucas Electrical about the ceiling fan and dimmers. I can be in Walnut Creek Thursday morning or Friday after 1. Which works better?",
    },
    {
      id: "d8", name: "Jorge Medina", phone: "(925) 555-0176", email: "jorge@example.com",
      city: "Concord", zip: "94518", source: "Phone call", stage: "booked", service: "Commercial LED retrofit, dental office",
      value: 7200, temp: "hot", urgency: "This month", created: 28,
      next: { label: "Site walk", appt: true },
      call: {
        at: 28, seconds: 212, disposition: "Booked",
        summary: "Office manager at a dental practice in Concord. 40-odd fluorescent troffers, half flickering, wants LEDs before a remodel inspection. Booked a site walk {day} at 3 PM, after their last patient.",
        transcript: [
          ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
          ["caller", "Jorge Medina, I manage a dental office in Concord. We've got old fluorescent lights all over, half of them flicker. We want to go LED."],
          ["ai", "We do a lot of that. Roughly how many fixtures, and is the building open during the day?"],
          ["caller", "Maybe forty. We see patients till 2:30 most days."],
          ["ai", "Got it. For a job that size the electrician does a quick site walk first, counts fixtures and prices it from there. It's free. Does {day} at 3 PM work, after your last patient?"],
          ["caller", "That works."],
          ["ai", "You're set for {day} at 3. I'll note that it's commercial so he brings the right ladder."],
        ],
      },
      appointment: { day: 2, hour: 15, status: "Confirmed", notes: "Dental office, ~40 fluorescent troffers to LED. Site walk after 2:30 PM. Commercial, bring 10-ft ladder." },
    },
    {
      id: "d9", name: "Linda Okoro", phone: "(925) 555-0119", email: "linda.okoro@example.com",
      city: "Antioch", zip: "94509", source: "Referral", stage: "completed", service: "Hot tub circuit, 50A GFCI",
      value: 1380, temp: "hot", urgency: "This month", created: 480,
      notes: "Paid in full. Referred Dale Hoffman a week later.",
      quote: { number: "Q-0102", status: "Accepted", at: 420, lines: [["50A GFCI spa disconnect + circuit, installed", 1, 1180], ["Permit and inspection", 1, 200]] },
    },
    {
      id: "d10", name: "Ray Whitaker", phone: "(925) 555-0195", email: "",
      city: "Brentwood", zip: "94513", source: "Meta lead ad", stage: "contacted", service: "Garage breaker keeps tripping",
      value: 325, temp: "warm", urgency: "This week", created: 200,
      next: { label: "Call Ray back about the garage breaker", at: -24 },
      form: { name: "Meta instant form: Electrical repair", answers: [["What's going on", "Garage breaker trips every time the freezer and the compressor run together"], ["Home or business", "Home"], ["When", "This week"]] },
      call: {
        at: 196, seconds: 97, disposition: "Call back requested",
        summary: "He called the line after the form. Garage breaker trips with the freezer and air compressor on the same circuit. Wants to talk to the electrician about adding a dedicated circuit before booking. Task created for a callback.",
        transcript: [
          ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
          ["caller", "Ray Whitaker, I sent in the Facebook form. My garage breaker trips whenever the freezer and my compressor run at the same time."],
          ["ai", "Thanks Ray, I see it. That's usually two big loads sharing one circuit. Want me to book a visit, or would you rather talk it through with the electrician first?"],
          ["caller", "I'd like to talk to him first about adding a circuit."],
          ["ai", "Sure. I'll have him call you back tomorrow. Mornings or afternoons?"],
          ["caller", "Afternoons."],
          ["ai", "Noted. Tomorrow afternoon from this number."],
        ],
      },
      task: { title: "Call Ray back about adding a dedicated garage circuit", due: -24, auto: true },
      draft: "Hi Ray, Lucas Electrical here about the tripping garage breaker. Sounds like the freezer and compressor need their own circuit. I can call this afternoon around 2, or come look Thursday. Which do you prefer?",
    },
    {
      id: "d11", name: "Tasha Greene", phone: "(925) 555-0107", email: "tasha.greene@example.com",
      city: "Oakley", zip: "94561", source: "Website chat", stage: "completed", service: "Landscape lighting, front yard",
      value: 980, temp: "warm", urgency: "This month", created: 340,
      visit: {
        referrer: "Google", query: "landscape lighting installer oakley ca", device: "Mobile",
        pages: [
          ["/lighting", "Lighting & Ceiling Fans", 88],
          ["/reviews", "Reviews", 51],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 340, topic: "Landscape lighting", page: "/lighting",
        messages: [
          ["visitor", "Do you do low-voltage path lights and uplights for the front yard?"],
          ["bot", "Yes, landscape lighting is one of our services. The electrician lays it out with you on site and the estimate is free. Want to set one up?"],
          ["visitor", "Yes. Tasha, 925-555-0107"],
          ["bot", "Thanks Tasha. The office will text you a couple of times to pick from."],
        ],
      },
      quote: { number: "Q-0103", status: "Accepted", at: 290, lines: [["Low-voltage path light, installed", 6, 95], ["Uplight, installed", 2, 110], ["Transformer + timer", 1, 190]] },
    },
    {
      id: "d12", name: "Omar Haddad", phone: "(925) 555-0168", email: "omar.haddad@example.com",
      city: "Pittsburg", zip: "94565", source: "Web form", stage: "new", service: "Code corrections from inspection report",
      value: 0, temp: "warm", urgency: "This week", created: 10,
      next: { label: "Review Omar's inspection report, call back", at: -3 },
      form: { name: "Website form: Request an estimate", answers: [["What do you need", "Buying a house in Pittsburg. Inspector flagged double-tapped breakers, an ungrounded outlet in the bathroom and an open junction box in the attic"], ["Home or business", "Home"], ["Best time to call", "Mornings"]] },
      task: { title: "Review Omar's inspection report and call him back", due: -3, auto: true },
    },
  ],

  // Calls Alex ended without taking a message: vendors, robocalls, scams.
  // Positive `at` = hours ago. None of these became a contact or a task.
  screened: [
    {
      id: "s1", at: 2.5, seconds: 24, from: "(415) 555-0199", kind: "Google listing scam",
      summary: "SPAM: Robocall claiming the Google Business listing would be removed unless it was 'verified' today.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["caller", "This is an urgent message regarding your Google Business listing. Your listing is at risk of being removed. Press 1 now to speak with a verification specialist."],
        ["ai", "Sounds like a recording, so I'm gonna let you go."],
      ],
    },
    {
      id: "s2", at: 7, seconds: 38, from: "(888) 555-0142", kind: "Merchant cash advance robocall",
      summary: "SPAM: 'Pre-approved' business funding pitch, wanted two minutes with the owner.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["caller", "Hi, this is Brandon with Capital Funding Partners. Great news, your business has been pre-approved for up to $250,000 in working capital, no collateral. I just need two minutes with the owner."],
        ["ai", "Is this about electrical work at your home or business?"],
        ["caller", "No no, this is about funding for Lucas Electrical. Is the owner available?"],
        ["ai", "Gotcha. We don't take sales calls on this line, but thanks for calling."],
      ],
    },
    {
      id: "s3", at: 22, seconds: 33, from: "(650) 555-0177", kind: "SEO / web design pitch",
      summary: "SPAM: Marketing agency pitching first-page Google rankings for 'electrician Antioch'.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["caller", "Hi, I was just looking at your website and noticed you're not on the first page of Google for electrician in Antioch. We help contractors like you..."],
        ["ai", "Are you a customer who needs electrical work done?"],
        ["caller", "No, I'm with a digital marketing agency. Who handles your marketing?"],
        ["ai", "Gotcha. We don't take sales calls on this line, but thanks for calling."],
      ],
    },
    {
      id: "s4", at: 30, seconds: 19, from: "Unknown", kind: "Silent call",
      summary: "SPAM: Nobody on the line after two prompts, likely an autodialer with no agent free.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["ai", "Hello? Is anyone there?"],
        ["ai", "Sounds like a recording, so I'm gonna let you go."],
      ],
    },
    {
      id: "s5", at: 50, seconds: 31, from: "(925) 555-0133", kind: "Lead-gen seller",
      summary: "SPAM: Selling 'exclusive' Contra Costa homeowner leads at $40 each.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["caller", "Hey, is this the owner? We've got homeowners in Contra Costa County looking for electricians right now. Exclusive leads, forty bucks each, no contract."],
        ["ai", "So this is a sales call, not a service request?"],
        ["caller", "Well, it's more of a partnership..."],
        ["ai", "Gotcha. We don't take sales calls on this line, but thanks for calling."],
      ],
    },
    {
      id: "s6", at: 75, seconds: 27, from: "(800) 555-0160", kind: "Insurance / workers comp",
      summary: "SPAM: Workers' comp broker cold-calling about California rate increases.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["caller", "Hi, I'm calling about your workers' compensation policy. Rates for electrical contractors in California went up this year and we can probably save you..."],
        ["ai", "Is this about electrical work, or are you selling insurance?"],
        ["caller", "I'm a broker, I'd just like to quote your policy."],
        ["ai", "Gotcha. We don't take sales calls on this line, but thanks for calling."],
      ],
    },
    {
      id: "s7", at: 100, seconds: 16, from: "(510) 555-0188", kind: "Recording / press 1",
      summary: "SPAM: Recorded 'lower your business energy bill, press 1' message.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["caller", "...qualifies for a reduced commercial electricity rate. To lower your business's energy bill, press 1 now. To be removed, press 2."],
        ["ai", "Sounds like a recording, so I'm gonna let you go."],
      ],
    },
    {
      id: "s8", at: 118, seconds: 36, from: "(916) 555-0121", kind: "Google listing scam",
      summary: "SPAM: Live caller claiming to be 'from Google' about an unverified listing.",
      transcript: [
        ["ai", "Lucas Electrical, this is Alex, the AI assistant. Who am I speaking with, and what can we help you with?"],
        ["caller", "Hi, this is Jessica calling from Google. I'm showing that your business listing is not verified and it's about to be suspended. Can I speak to the owner?"],
        ["ai", "Are you calling about electrical work?"],
        ["caller", "No, this is regarding your Google listing. It's very important."],
        ["ai", "Gotcha. We don't take sales calls on this line, but thanks for calling."],
      ],
    },
  ],

  anonymous: [
    { id: "v1", city: "Antioch", device: "Mobile", referrer: "Google", query: "electrician near me antioch", at: 1.4, pages: [["/", "Lucas Electrical Inc", 41], ["/reviews", "Reviews", 38]] },
    { id: "v2", city: "Brentwood", device: "Desktop", referrer: "Google", query: "", at: 6, pages: [["/ev-charger-installation", "EV Charger Installation", 112], ["/service-area", "Service Area", 22]] },
    { id: "v3", city: "Concord", device: "Mobile", referrer: "Facebook ad", query: "", at: 11, pages: [["/panel-upgrades", "Panel & Service Upgrades", 58]] },
    { id: "v4", city: "Walnut Creek", device: "Desktop", referrer: "Direct", query: "", at: 27, pages: [["/commercial", "Commercial Electrical", 84], ["/reviews", "Reviews", 33]] },
    { id: "v5", city: "Oakley", device: "Mobile", referrer: "ChatGPT", query: "", at: 33, pages: [["/blog/half-my-outlets-stopped-working", "Half My Outlets Stopped Working. Now What?", 141]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Livermore", at: 8, topic: "Service area", page: "/",
      messages: [
        ["visitor", "Do you come out to Livermore?"],
        ["bot", "We cover the East Bay, and Livermore is usually fine depending on the job. Want me to have the office confirm?"],
        ["visitor", "Not yet, just checking."],
      ],
    },
  ],

  doneTasks: [
    { title: "Ask Dale for a Google review", contact: "d4", done: 30 },
    { title: "Send Linda the permit sign-off for the spa circuit", contact: "d9", done: 70 },
  ],
};
