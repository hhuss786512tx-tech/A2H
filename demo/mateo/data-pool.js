window.NICHES = window.NICHES || {};
// Sample data for the Tidewater Hollow Pools demo (pool installation, Long
// Island). Every person, phone number and address here is fictional. Times are
// relative to page load: positive = hours ago, negative = hours ahead.
// Calls with outbound: true are speed-to-lead callbacks placed by the AI after
// a form submit; `after` is seconds between the submit and the call.
window.NICHES.pool = {
  client: { name: "Tidewater Hollow Pools", short: "TH", city: "Smithtown, NY", goal: 120000, trade: "Pool installation", appt: "Estimate" },

  stages: [
    { id: "new", label: "New" },
    { id: "contacted", label: "Contacted" },
    { id: "scheduled", label: "Scheduled" },
    { id: "booked", label: "Booked" },
    { id: "completed", label: "Completed" },
    { id: "lost", label: "Lost" },
  ],

  ads: [
    { id: "a1", name: "Fiberglass pool, swimming by summer", campaign: "Pool leads · Suffolk", status: "Active", spend: 412, impr: 18200, clicks: 364, leads: 14, booked: 5, won: 1, wonValue: 58400 },
    { id: "a2", name: "Liner looking tired? Replacement estimate", campaign: "Pool leads · Suffolk", status: "Active", spend: 268, impr: 12400, clicks: 241, leads: 11, booked: 4, won: 1, wonValue: 6800 },
    { id: "a3", name: "Pool deck before and after", campaign: "Pool leads · Suffolk", status: "Paused", spend: 155, impr: 7900, clicks: 118, leads: 4, booked: 1, won: 0, wonValue: 0 },
    { id: "a4", name: "Pool financing, monthly payments", campaign: "Retargeting · site visitors", status: "Active", spend: 96, impr: 5300, clicks: 87, leads: 3, booked: 1, won: 0, wonValue: 0 },
  ],

  speed: { median: 44, calls: 31, reached: 24, booked: 11 },

  deals: [
    {
      id: "d1", name: "Laura Kessler", phone: "(631) 555-0114", email: "laura.kessler@example.com",
      city: "Huntington", zip: "11743", source: "Referral", stage: "completed", service: "Fiberglass pool install, 14x28",
      value: 58400, temp: "hot", urgency: "This season", created: 1320,
      notes: "Referred by a past customer two streets over. Install finished, final walkthrough signed off.",
      appointment: { at: 1150, status: "Completed", notes: "Estimate visit done. Measured backyard, checked side-yard access for the crane." },
      quote: { number: "Q-0001", status: "Accepted", at: 1010, lines: [["Fiberglass pool shell, 14x28, installed", 1, 52400], ["Excavation, permits and electrical", 1, 6000]] },
    },
    {
      id: "d2", name: "Marcus Delaney", phone: "(631) 555-0127", email: "marcus.delaney@example.com",
      city: "Commack", zip: "11725", source: "Website chat", stage: "scheduled", service: "Fiberglass pool install",
      value: 54000, temp: "warm", urgency: "Next spring", created: 74,
      next: { label: "Estimate visit", appt: true },
      visit: {
        referrer: "Google", query: "fiberglass pool installers suffolk county", device: "Mobile",
        pages: [
          ["/pools/fiberglass", "Fiberglass Pools", 142],
          ["/gallery", "Project Gallery", 96],
          ["/financing", "Pool Financing", 58],
          ["/pools/fiberglass", "Fiberglass Pools", 34],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 74, topic: "Fiberglass pool install", page: "/pools/fiberglass",
        messages: [
          ["visitor", "How long does a fiberglass pool install take start to finish?"],
          ["bot", "Most fiberglass installs take 3 to 6 weeks once permits are in, which is a lot faster than concrete. Are you thinking about one for next season?"],
          ["visitor", "Yes, for next spring. Roughly what does it cost?"],
          ["bot", "Most of our fiberglass projects land between $45K and $70K depending on size, patio and fencing. The estimator gives you an exact number at the free estimate visit. Can I grab your name and number?"],
          ["visitor", "Marcus, 631-555-0127"],
          ["bot", "Thanks Marcus. The office will call today to set up a time."],
        ],
      },
      appointment: { day: 4, hour: 14, status: "Scheduled", notes: "Wants fiberglass for next spring. Asked about financing. Check gate width." },
    },
    {
      id: "d3", name: "Dana Whitmore", phone: "(631) 555-0109", email: "dana.whitmore@example.com",
      city: "Smithtown", zip: "11787", source: "Meta lead ad", stage: "booked", service: "Fiberglass pool install",
      value: 62000, temp: "hot", urgency: "This season", created: 2,
      next: { label: "Estimate visit", appt: true },
      form: { name: "Meta instant form: Free pool estimate", answers: [["What are you looking for?", "New inground pool"], ["Do you own the home?", "Yes"], ["When do you want to start?", "Within 3 months"]] },
      call: {
        at: 2, seconds: 162, disposition: "Booked", outbound: true, after: 45,
        summary: "AI called back 45 seconds after the Facebook form. Homeowner, single-family with a fenced backyard and side gate. Wants a fiberglass pool with a small patio, budget $55-65K, ready to start this season. Booked an estimate visit for {day} at 10 AM.",
        transcript: [
          ["ai", "Hi Dana, this is the AI assistant for Tidewater Hollow Pools. You just asked for a pool estimate on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Oh wow, that was fast. Sure."],
          ["ai", "Great. Is this for a single-family home you own, and is there a gate or side yard wide enough for equipment to get to the backyard?"],
          ["caller", "Yes, we own it. There's a side gate, maybe ten feet wide."],
          ["ai", "That works. Are you thinking fiberglass, vinyl or concrete, and do you have a rough budget in mind?"],
          ["caller", "Fiberglass, I think. Somewhere around 55 to 65 with a little patio."],
          ["ai", "That fits most of our fiberglass projects. Our estimator can come out to measure and go over shapes. I have {day} at 10 AM or 2 PM. Which works better?"],
          ["caller", "10 is good."],
          ["ai", "You're booked for {day} at 10 AM at your home in Smithtown. You'll get a text confirmation in a minute. Anything else I can help with?"],
          ["caller", "No, that's great. Thanks."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "Fiberglass with small patio, budget $55-65K. Side gate about 10 ft. Wants to start this season." },
    },
    {
      id: "d4", name: "Mike Russo", phone: "(631) 555-0152", email: "mike.russo@example.com",
      city: "Bay Shore", zip: "11706", source: "Web form", stage: "contacted", service: "Vinyl liner replacement",
      value: 6200, temp: "warm", urgency: "This month", created: 6,
      next: { label: "Follow up on liner text", at: -3 },
      visit: {
        referrer: "Google", query: "pool liner replacement bay shore", device: "Desktop",
        pages: [
          ["/pools/liner-replacement", "Vinyl Liner Replacement", 118],
          ["/blog/how-long-does-a-pool-liner-last", "How Long Does a Pool Liner Last?", 164],
          ["/contact", "Get a Free Estimate", 47],
        ],
        converted: "Submitted the estimate form",
      },
      form: { name: "Website form: Free estimate", answers: [["Project", "Liner is faded and has a tear near the steps"], ["Pool size", "16x32 inground"], ["Best time to call", "Anytime"]] },
      call: {
        at: 6, seconds: 34, disposition: "No answer, text sent", outbound: true, after: 52,
        summary: "AI called 52 seconds after the website form. No answer, left a short voicemail and sent a text with booking times.",
        transcript: [
          ["ai", "Hi Mike, this is the AI assistant for Tidewater Hollow Pools. You just asked about a liner replacement on our website. Sorry I missed you. I'm sending you a text now with a couple of estimate times. Just reply with the one that works."],
        ],
      },
      task: { title: "Follow up with Mike if no reply to the liner text", due: -3, auto: true },
      draft: "Hi Mike, it's Tidewater Hollow Pools about your liner replacement in Bay Shore. We can come measure the 16x32 this week at 9 AM or 3 PM. Which works? Most liner swaps run $5-8K installed.",
    },
    {
      id: "d5", name: "Tyler Brennan", phone: "(631) 555-0166", email: "tyler.brennan@example.com",
      city: "Patchogue", zip: "11772", source: "Meta lead ad", stage: "lost", service: "Above-ground to inground conversion",
      value: 0, temp: "cold", urgency: "Just researching", created: 52, lostReason: "Renter, landlord not interested",
      form: { name: "Meta instant form: Free pool estimate", answers: [["What are you looking for?", "New inground pool"], ["Do you own the home?", "No"], ["When do you want to start?", "Not sure"]] },
      call: {
        at: 52, seconds: 88, disposition: "Not a fit", outbound: true, after: 38,
        summary: "AI called back 38 seconds after the form. Caller rents; landlord said no to a pool. Thanked him and closed it out. No estimate visit needed.",
        transcript: [
          ["ai", "Hi Tyler, this is the AI assistant for Tidewater Hollow Pools. You just filled out our pool estimate form on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Yeah, go ahead."],
          ["ai", "Thanks. The form said you don't own the home. Is the property owner on board with an inground pool?"],
          ["caller", "I asked, and honestly the landlord said no. I was just hoping."],
          ["ai", "Understood. An inground pool does need the owner's approval and permit signature, so we can't move ahead right now. If that changes, just reply to our text and we'll set up an estimate."],
          ["caller", "Okay, thanks."],
        ],
      },
    },
    {
      id: "d6", name: "Karen Albright", phone: "(631) 555-0138", email: "karen.albright@example.com",
      city: "Sayville", zip: "11782", source: "Phone call", stage: "booked", service: "Paver pool deck",
      value: 19200, temp: "hot", urgency: "This month", created: 168,
      next: { label: "Estimate visit", appt: true },
      call: {
        at: 168, seconds: 196, disposition: "Booked",
        summary: "Existing concrete deck is cracked and heaving around the pool. Wants pavers. Booked an estimate visit; quote sent after the phone measurements.",
        transcript: [
          ["ai", "Thanks for calling Tidewater Hollow Pools, how can I help?"],
          ["caller", "Hi, the concrete around my pool is cracked and lifting. I want to replace it with pavers."],
          ["ai", "We do a lot of paver pool decks. Roughly how big is the area around the pool?"],
          ["caller", "Maybe 600 square feet."],
          ["ai", "Thanks. An estimator can come measure and show paver samples. I have {day} at 11 AM or 4 PM. Which works?"],
          ["caller", "11 works."],
          ["ai", "You're set for {day} at 11 AM. You'll get a text confirmation shortly."],
        ],
      },
      appointment: { day: 2, hour: 11, status: "Confirmed", notes: "Replace cracked concrete deck with pavers, about 600 sq ft. Bring samples." },
      quote: { number: "Q-0003", status: "Sent", at: 30, lines: [["Paver pool deck, per sq ft", 600, 28], ["Coping and deck drainage", 1, 2400]] },
    },
    {
      id: "d7", name: "Jenna Morales", phone: "(631) 555-0173", email: "jenna.morales@example.com",
      city: "Islip", zip: "11751", source: "Website chat", stage: "new", service: "Pool heater install",
      value: 5400, temp: "warm", urgency: "This month", created: 18,
      next: { label: "Email heater options", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Mobile",
        pages: [
          ["/", "Tidewater Hollow Pools", 39],
          ["/services/equipment", "Pumps, Filters and Heaters", 104],
          ["/blog/heat-pump-vs-gas-pool-heater", "Heat Pump vs Gas Pool Heater", 211],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 18, topic: "Pool heater", page: "/blog/heat-pump-vs-gas-pool-heater",
        messages: [
          ["visitor", "Is a heat pump worth it on Long Island or should I go gas?"],
          ["bot", "Heat pumps are cheaper to run from May to September. Gas heats faster and works better in cold spring and fall weeks. Installed, most heaters run $4-7K. Want someone to look at your setup?"],
          ["visitor", "Yes please. jenna.morales@example.com"],
          ["bot", "Thanks Jenna. The office will email you options and a few estimate times."],
        ],
      },
      task: { title: "Email Jenna heater options and estimate times", due: -4 },
      draft: "Hi Jenna, thanks for asking about pool heaters. For most Islip backyards a heat pump is the cheaper option to run, and gas makes sense if you want to swim in May and October. We can stop by to check your gas line and electrical. Does a weekday morning or afternoon work?",
    },
    {
      id: "d8", name: "Steve Halloran", phone: "(631) 555-0145", email: "",
      city: "Babylon", zip: "11702", source: "Phone call", stage: "contacted", service: "Vinyl liner replacement",
      value: 6500, temp: "warm", urgency: "Before opening", created: 96,
      next: { label: "Send liner quote", at: 24 },
      call: {
        at: 96, seconds: 141, disposition: "Message taken",
        summary: "Liner has wrinkles and a slow leak. Gave pool size over the phone (18x36). Wants a price before spring opening. Took details for the owner to quote.",
        transcript: [
          ["ai", "Thanks for calling Tidewater Hollow Pools, how can I help?"],
          ["caller", "I think my liner's done. It's wrinkled and I'm losing water."],
          ["ai", "That sounds like time for a replacement. What size is the pool?"],
          ["caller", "18 by 36, rectangle."],
          ["ai", "Got it. I'll pass this to the owner so he can send a written price today. Is this the best number?"],
          ["caller", "Yes, this one."],
        ],
      },
      task: { title: "Send Steve the liner replacement quote", due: 24 },
      quote: { number: "Q-0004", status: "Draft", lines: [["Vinyl liner replacement, 18x36", 1, 5600], ["Wall foam and step pad", 1, 900]] },
    },
    {
      id: "d9", name: "Rob Castellano", phone: "(631) 555-0181", email: "rob.castellano@example.com",
      city: "Riverhead", zip: "11901", source: "Website chat", stage: "completed", service: "Pool closing and safety cover",
      value: 2650, temp: "warm", urgency: "This week", created: 408,
      notes: "Paid in full. Booked spring opening for next year.",
      visit: {
        referrer: "Google", query: "pool closing riverhead", device: "Mobile",
        pages: [
          ["/services/opening-closing", "Openings and Closings", 88],
          ["/services/safety-covers", "Safety Covers", 71],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 408, topic: "Pool closing", page: "/services/safety-covers",
        messages: [
          ["visitor", "Can you close my pool next week and put on a new safety cover?"],
          ["bot", "Yes. A closing is $400, and a custom mesh safety cover is measured and installed separately. Want the office to call you to schedule?"],
          ["visitor", "Yes. Rob, 631-555-0181, I'm in Riverhead"],
          ["bot", "Thanks Rob. The office will call you today."],
        ],
      },
    },
    {
      id: "d10", name: "Priya Shah", phone: "(631) 555-0119", email: "priya.shah@example.com",
      city: "Huntington", zip: "11743", source: "Web form", stage: "scheduled", service: "Concrete (gunite) pool install",
      value: 96000, temp: "warm", urgency: "Next year", created: 30,
      next: { label: "Estimate visit", appt: true },
      visit: {
        referrer: "Google", query: "gunite pool builder long island", device: "Desktop",
        pages: [
          ["/pools/concrete", "Concrete Pools", 176],
          ["/gallery", "Project Gallery", 132],
          ["/financing", "Pool Financing", 64],
          ["/contact", "Get a Free Estimate", 41],
        ],
        converted: "Submitted the estimate form",
      },
      form: { name: "Website form: Free estimate", answers: [["Project", "Custom concrete pool with spa"], ["Yard", "Slopes toward the back, about half an acre"], ["Best time to call", "Evenings"]] },
      call: {
        at: 30, seconds: 204, disposition: "Booked", outbound: true, after: 61,
        summary: "AI called 61 seconds after the website form. Homeowner, sloped half-acre yard, wants a gunite pool with attached spa, budget $90-110K, building next spring. Booked an estimate visit; she wants her husband there.",
        transcript: [
          ["ai", "Hi Priya, this is the AI assistant for Tidewater Hollow Pools. You just sent our estimate form about a concrete pool. Is now a good time for two quick questions?"],
          ["caller", "Sure, I have a minute."],
          ["ai", "Thanks. You mentioned the yard slopes. Can a truck get into the backyard, through a driveway or gate?"],
          ["caller", "Yes, the driveway runs along the side of the house."],
          ["ai", "Good. For a custom concrete pool with a spa, most projects run $80K to $120K. Is that in the range you're planning for, and when would you want to build?"],
          ["caller", "Around 100 is fine. Next spring."],
          ["ai", "Perfect timing to design over the winter. I have {day} at 9 AM or 5 PM for an estimate visit. Which works?"],
          ["caller", "5, so my husband can be there."],
          ["ai", "You're booked for {day} at 5 PM. A text confirmation is on its way."],
        ],
      },
      appointment: { day: 3, hour: 17, status: "Scheduled", notes: "Gunite pool plus spa, budget around $100K, sloped yard. Both owners attending." },
    },
    {
      id: "d11", name: "Gina Lombardi", phone: "(631) 555-0158", email: "gina.lombardi@example.com",
      city: "Commack", zip: "11725", source: "Referral", stage: "contacted", service: "Pump and filter upgrade",
      value: 4300, temp: "warm", urgency: "Before opening", created: 220,
      notes: "Referred by Laura Kessler. Old single-speed pump; wants variable-speed to cut the electric bill.",
      next: { label: "Follow up on equipment estimate", at: -24 },
      task: { title: "Call Gina about variable-speed pump estimate", due: -24, auto: true },
      draft: "Hi Gina, it's Tidewater Hollow Pools. Laura mentioned you're looking at a new pump. A variable-speed pump and cartridge filter usually run $4-5K installed and pay back on electric within a few seasons. Is a quick visit this week good for you?",
    },
    {
      id: "d12", name: "Chris Navarro", phone: "(631) 555-0192", email: "chris.navarro@example.com",
      city: "Smithtown", zip: "11787", source: "Meta lead ad", stage: "new", service: "Fiberglass pool install",
      value: 50000, temp: "warm", urgency: "This season", created: 9,
      next: { label: "AI callback at 8:00 AM", at: -1 },
      form: { name: "Meta instant form: Free pool estimate", answers: [["What are you looking for?", "New inground pool"], ["Do you own the home?", "Yes"], ["When do you want to start?", "Within 6 months"]] },
      call: { queued: true, at: 9, summary: "Form came in at 10:12 PM. Call held until 8:00 AM, inside calling hours." },
      task: { title: "Morning: confirm AI reached Chris (overnight form)", due: -1, auto: true },
    },
  ],

  anonymous: [
    { id: "v1", city: "Huntington", device: "Mobile", referrer: "Google", query: "fiberglass pool cost long island", at: 1.4, pages: [["/pools/fiberglass", "Fiberglass Pools", 92], ["/financing", "Pool Financing", 47]] },
    { id: "v2", city: "Bay Shore", device: "Desktop", referrer: "Facebook ad", query: "", at: 4, pages: [["/gallery", "Project Gallery", 81], ["/pools/fiberglass", "Fiberglass Pools", 38]] },
    { id: "v3", city: "Sayville", device: "Mobile", referrer: "Google", query: "", at: 11, pages: [["/pools/liner-replacement", "Vinyl Liner Replacement", 66]] },
    { id: "v4", city: "Patchogue", device: "Desktop", referrer: "ChatGPT", query: "", at: 27, pages: [["/blog/fiberglass-vs-concrete-pools", "Fiberglass vs Concrete Pools", 198], ["/pools/concrete", "Concrete Pools", 54]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Riverhead", at: 7, topic: "Service area", page: "/",
      messages: [
        ["visitor", "Do you install pools out in Southold?"],
        ["bot", "Our main area runs from Huntington to Riverhead. For the North Fork past Riverhead, the office can confirm. Want them to reach out?"],
        ["visitor", "Not yet, just checking. Thanks."],
      ],
    },
  ],

  doneTasks: [
    { title: "Send Laura the pool warranty and startup guide", contact: "d1", done: 40 },
    { title: "Book Rob's spring opening", contact: "d9", done: 60 },
  ],
};
