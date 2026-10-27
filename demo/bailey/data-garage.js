// Sample data for the Bailey's Garage Door Service demo. The company name is
// real (the demo was built for its owner); every customer, phone number,
// address, price and ad number here is made up. Times are relative to page
// load: positive = hours ago, negative = hours ahead. Calls with
// outbound:true are the speed-to-lead caller: the AI phoned the lead `after`
// seconds after their form came in.

window.NICHES = window.NICHES || {};
window.NICHES.garage = {
  client: { name: "Bailey's Garage Door Service", short: "BG", city: "Arlington, TX", goal: 40000, trade: "Garage door", appt: "Service visit" },

  stages: [
    { id: "new", label: "New" },
    { id: "contacted", label: "Contacted" },
    { id: "scheduled", label: "Scheduled" },
    { id: "booked", label: "Booked" },
    { id: "completed", label: "Completed" },
    { id: "lost", label: "Lost" },
  ],

  speed: { median: 41, calls: 44, reached: 35, booked: 19 },

  ads: [
    { id: "a1", name: "Broken spring? Fixed today in Arlington", campaign: "Repair leads · Arlington + Mansfield", status: "Active", spend: 412, impr: 19800, clicks: 431, leads: 21, booked: 11, won: 8, wonValue: 2480 },
    { id: "a2", name: "New garage door, free quote this week", campaign: "New door leads · DFW", status: "Active", spend: 356, impr: 14200, clicks: 247, leads: 9, booked: 4, won: 2, wonValue: 5900 },
    { id: "a3", name: "Opener dead? $79 service call", campaign: "Repair leads · Arlington + Mansfield", status: "Active", spend: 188, impr: 11300, clicks: 162, leads: 6, booked: 2, won: 1, wonValue: 450 },
    { id: "a4", name: "Gate repair video", campaign: "Gate leads · Fort Worth", status: "Paused", spend: 61, impr: 2900, clicks: 41, leads: 1, booked: 0, won: 0, wonValue: 0 },
  ],

  deals: [
    {
      id: "d1", name: "Dana Whitfield", phone: "(817) 555-0312", email: "dana.whitfield@example.com",
      city: "Arlington", zip: "76016", source: "Phone call", stage: "booked", service: "Broken spring, car stuck inside",
      value: 320, temp: "hot", urgency: "Today", created: 3,
      next: { label: "Service visit", appt: true },
      call: {
        at: 3, seconds: 164, disposition: "Booked",
        summary: "Heard a loud bang, door won't open, car stuck inside. Sounds like a broken spring. Booked the first open visit, {day} at 10 AM. Called at 9:40 PM after the shop closed.",
        transcript: [
          ["ai", "Bailey's Garage Door Service, this is Sam, the AI assistant. What's going on with your door?"],
          ["caller", "There was a loud bang last night and now the door won't go up. My car's stuck in there."],
          ["ai", "Oof, that bang's usually a broken spring. Is it a single or a double door?"],
          ["caller", "Double."],
          ["ai", "Gotcha. Springs run about two to three-fifty and the tech fixes it on the spot. Earliest I've got is {day} at 10. Want it?"],
          ["caller", "Yes please."],
          ["ai", "You're set for {day} at 10. You'll get a text with the tech's name."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "Double door, likely broken torsion spring. Car stuck inside, first job of the day." },
    },
    {
      id: "d2", name: "Marcus Bell", phone: "(817) 555-0377", email: "marcus.bell@example.com",
      city: "Mansfield", zip: "76063", source: "Website chat", stage: "scheduled", service: "New insulated double door",
      value: 2900, temp: "warm", urgency: "This month", created: 96,
      next: { label: "Free quote visit", appt: true },
      visit: {
        referrer: "Google", query: "new garage door cost mansfield tx", device: "Mobile",
        pages: [
          ["/new-garage-doors", "New Garage Doors", 131],
          ["/pricing", "What a New Door Costs", 72],
          ["/reviews", "Reviews", 48],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 96, topic: "New door", page: "/new-garage-doors",
        messages: [
          ["visitor", "Our door is 20 years old and dented. What does a new insulated double door cost?"],
          ["bot", "Most insulated double doors land between $1,800 and $3,500 installed, depending on style and windows. The quote visit is free. Want one?"],
          ["visitor", "Yeah. Marcus, 817-555-0377"],
          ["bot", "Thanks Marcus. You'll get a call in the next minute to pick a time."],
        ],
      },
      appointment: { day: 3, hour: 10, status: "Scheduled", notes: "Replace 20-yr-old dented double door. Wants insulated, maybe windows. Bring samples." },
    },
    {
      id: "d3", name: "Priya Raman", phone: "(817) 555-0309", email: "priya.raman@example.com",
      city: "Grand Prairie", zip: "75052", source: "Meta lead ad", stage: "booked", service: "Door off track",
      value: 240, temp: "hot", urgency: "This week", created: 2,
      next: { label: "Service visit", appt: true },
      form: { name: "Meta instant form: Garage door repair", answers: [["What's wrong", "Door came off the track on one side"], ["Door", "Single"], ["When", "As soon as possible"]] },
      call: {
        at: 2, outbound: true, after: 38, seconds: 149, disposition: "Booked",
        summary: "Called 38 seconds after the form. Single door hanging off the track on the left side, still closed. Told her not to run the opener. Booked tomorrow at 9 AM.",
        transcript: [
          ["ai", "Hi, is this Priya? This is Sam, the AI assistant at Bailey's Garage Door Service. You just sent us a request about your door, got a quick minute?"],
          ["caller", "Oh wow, that was fast. Yeah."],
          ["ai", "So it came off the track on one side, right? Is it open or closed right now?"],
          ["caller", "Closed, but it's crooked."],
          ["ai", "Okay, don't run the opener till we look at it. I've got tomorrow at 9 or 1. Which works?"],
          ["caller", "9."],
          ["ai", "Done, tomorrow at 9. Off track is usually one-fifty to three hundred, and the tech gives you the price before starting."],
        ],
      },
      appointment: { day: 1, hour: 9, status: "Confirmed", notes: "Single door off track left side, closed. Told her not to use the opener." },
    },
    {
      id: "d4", name: "Tom Okafor", phone: "(817) 555-0363", email: "",
      city: "Arlington", zip: "76017", source: "Referral", stage: "completed", service: "Two springs + new rollers",
      value: 480, temp: "hot", urgency: "This week", created: 624,
      notes: "Referred by a neighbor. Left a 5-star Google review.",
      appointment: { at: 600, status: "Completed", notes: "Replaced both springs and all rollers. Paid by card on site." },
      quote: { number: "Q-0001", status: "Accepted", at: 600, lines: [["Torsion spring replacement (pair)", 1, 330], ["Nylon rollers", 10, 15]] },
    },
    {
      id: "d5", name: "Rachel Nguyen", phone: "(817) 555-0321", email: "rachel.nguyen@example.com",
      city: "Fort Worth", zip: "76119", source: "Meta lead ad", stage: "contacted", service: "Opener replacement",
      value: 520, temp: "warm", urgency: "This month", created: 144,
      next: { label: "Send opener options", at: 24 },
      form: { name: "Meta instant form: Garage door repair", answers: [["What's wrong", "Opener hums but door doesn't move"], ["Door", "Double"], ["When", "This month"]] },
      call: {
        at: 144, outbound: true, after: 47, seconds: 131, disposition: "Quote requested",
        summary: "Called 47 seconds after the form. Opener is 15 years old and hums without moving. Wants prices on a new quiet opener before booking. Created a task to send options.",
        transcript: [
          ["ai", "Hi, is this Rachel? This is Sam, the AI assistant at Bailey's Garage Door Service. You sent a request about your opener, got a minute?"],
          ["caller", "Sure. Honestly I just want to know what a new one costs."],
          ["ai", "For sure. How old's the one you've got?"],
          ["caller", "Like fifteen years. It's loud too."],
          ["ai", "Gotcha. A new quiet belt-drive opener installed is usually four to six-fifty. I'll have the owner text you a couple options today. Sound good?"],
          ["caller", "Yeah, that works."],
        ],
      },
      task: { title: "Text Rachel 2 opener options", due: 24 },
      quote: { number: "Q-0005", status: "Draft", lines: [["Belt-drive opener, installed", 1, 480], ["Haul away old opener", 1, 40]] },
    },
    {
      id: "d6", name: "Luis Herrera", phone: "(817) 555-0388", email: "",
      city: "Dallas", zip: "75204", source: "Web form", stage: "lost", service: "Commercial roll-up door",
      value: 0, temp: "cold", urgency: "Just researching", created: 432, lostReason: "Commercial roll-up door, not a service we offer",
      form: { name: "Website form: Request service", answers: [["Problem", "Roll-up door at our warehouse is stuck"], ["Best time to call", "Anytime"]] },
      call: {
        at: 432, outbound: true, after: 35, seconds: 74, disposition: "Not a fit",
        summary: "Called 35 seconds after the form. Warehouse roll-up door, which is commercial work. Explained we do homes only. Marked not a fit.",
        transcript: [
          ["ai", "Hi, is this Luis? This is Sam with Bailey's Garage Door Service, calling about your door. Is this for a house or a business?"],
          ["caller", "It's our warehouse, a big roll-up door."],
          ["ai", "Ah, gotcha. We only do homes, so that one's outside what we handle. Sorry about that. Good luck getting it sorted."],
        ],
      },
    },
    {
      id: "d7", name: "Hannah Brooks", phone: "(817) 555-0335", email: "hannah.brooks@example.com",
      city: "Kennedale", zip: "76060", source: "Website chat", stage: "new", service: "Driveway gate won't close",
      value: 350, temp: "warm", urgency: "This week", created: 20,
      next: { label: "Text Hannah visit times", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Desktop",
        pages: [
          ["/", "Bailey's Garage Door Service", 34],
          ["/gates", "Gate Repair", 88],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 20, topic: "Gate repair", page: "/gates",
        messages: [
          ["visitor", "Do you fix driveway gates? Ours stops halfway and won't close."],
          ["bot", "Yes, we do gates too. That's often a sensor or the gate operator. Want someone to come look at it this week?"],
          ["visitor", "Yes please. hannah.brooks@example.com"],
          ["bot", "Thanks Hannah. The owner will text you a few times to pick from."],
        ],
      },
      task: { title: "Text Hannah gate visit times", due: -4 },
      draft: "Hi Hannah, it's Bailey's Garage Door Service about your driveway gate. I can come by Kennedale Thursday morning or Friday afternoon. Which works better?",
    },
    {
      id: "d8", name: "Greg Sutton", phone: "(817) 555-0394", email: "",
      city: "Arlington", zip: "76001", source: "Phone call", stage: "booked", service: "Door won't close, sensor",
      value: 150, temp: "hot", urgency: "Today", created: 30,
      next: { label: "Service visit", appt: true },
      call: {
        at: 30, seconds: 118, disposition: "Booked",
        summary: "Called at 9:15 PM. Door goes down then back up. Walked him through checking the sensor lights, still stuck open. Booked first slot tomorrow.",
        transcript: [
          ["ai", "Bailey's Garage Door Service, this is Sam, the AI assistant. What's going on with your door?"],
          ["caller", "It goes down then pops right back up. It's 9 at night and I can't close it."],
          ["ai", "Ugh, that's usually the safety sensors. Are both little lights by the floor on?"],
          ["caller", "One's blinking."],
          ["ai", "Yeah, that's it. I've got tomorrow at 8, first thing. Want it?"],
          ["caller", "Yes."],
          ["ai", "You're set for 8 AM. If you hold the wall button down the whole way, it'll usually close for tonight."],
        ],
      },
      appointment: { day: 1, hour: 8, status: "Confirmed", notes: "Sensor misaligned or bad (one light blinking). Told him to hold the wall button to close tonight." },
    },
    {
      id: "d9", name: "Alicia Moreno", phone: "(817) 555-0316", email: "alicia.moreno@example.com",
      city: "Mansfield", zip: "76063", source: "Referral", stage: "completed", service: "New steel double door + opener",
      value: 3400, temp: "hot", urgency: "This month", created: 528,
      notes: "Paid in full. Asked about the same door for her rental house.",
      quote: { number: "Q-0002", status: "Accepted", at: 400, lines: [["Insulated steel double door, installed", 1, 2850], ["Belt-drive opener, installed", 1, 550]] },
    },
    {
      id: "d10", name: "Ben Carter", phone: "(817) 555-0352", email: "",
      city: "Pantego", zip: "76013", source: "Meta lead ad", stage: "contacted", service: "Cable snapped",
      value: 220, temp: "warm", urgency: "This week", created: 240,
      next: { label: "Follow up, no answer on the AI call", at: -24 },
      form: { name: "Meta instant form: Garage door repair", answers: [["What's wrong", "One cable snapped, door is crooked"], ["Door", "Single"], ["When", "This week"]] },
      call: {
        at: 240, outbound: true, after: 44, seconds: 29, disposition: "No answer, text sent",
        summary: "Called 44 seconds after the form, no answer. Left a short voicemail and sent a text with a link to pick a time. Follow-up task created.",
        transcript: [
          ["ai", "Hi Ben, it's Sam, the AI assistant at Bailey's Garage Door Service, about the snapped cable. I'm texting you a link to pick a time, or just call this number back."],
        ],
      },
      task: { title: "Follow up with Ben, no answer on the AI call", due: -24, auto: true },
      draft: "Hi Ben, Bailey's Garage Door Service following up on the snapped cable. I'm in Pantego tomorrow. Is morning or afternoon better?",
    },
    {
      id: "d11", name: "Sofia Patel", phone: "(817) 555-0370", email: "sofia.patel@example.com",
      city: "Arlington", zip: "76018", source: "Website chat", stage: "completed", service: "Spring + tune-up",
      value: 360, temp: "warm", urgency: "This week", created: 360,
      visit: {
        referrer: "Google", query: "garage door spring repair arlington tx", device: "Mobile",
        pages: [
          ["/spring-repair", "Garage Door Spring Repair", 102],
          ["/reviews", "Reviews", 44],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 360, topic: "Spring repair", page: "/spring-repair",
        messages: [
          ["visitor", "Door is really heavy to lift by hand. Is that the spring?"],
          ["bot", "Most likely, yes. A worn spring makes the door heavy and strains the opener. Want a tech to check it this week?"],
          ["visitor", "Yes. Sofia, 817-555-0370"],
          ["bot", "Thanks Sofia. You'll get a call in the next minute to set a time."],
        ],
      },
      quote: { number: "Q-0003", status: "Accepted", at: 300, lines: [["Torsion spring replacement", 1, 260], ["Tune-up and lube", 1, 100]] },
    },
    {
      id: "d12", name: "Derek Ross", phone: "(817) 555-0327", email: "",
      city: "Arlington", zip: "76015", source: "Web form", stage: "new", service: "Opener remote not working",
      value: 0, temp: "warm", urgency: "This week", created: 9,
      next: { label: "AI calls at 8:00 AM", at: -2 },
      form: { name: "Website form: Request service", answers: [["Problem", "Remotes stopped working, wall button works"], ["Best time to call", "Mornings"]] },
      call: {
        at: 9, queued: true,
        summary: "Form came in at 10:48 PM. The call is held until 8:00 AM so it lands inside calling hours.",
      },
      task: { title: "Morning: confirm the AI reached Derek (remotes)", due: -2, auto: true },
    },
  ],

  anonymous: [
    { id: "v1", city: "Arlington", device: "Mobile", referrer: "Google", query: "garage door repair near me", at: 1.2, pages: [["/spring-repair", "Garage Door Spring Repair", 77], ["/pricing", "Pricing", 41]] },
    { id: "v2", city: "Grand Prairie", device: "Desktop", referrer: "Google", query: "", at: 5, pages: [["/", "Bailey's Garage Door Service", 36]] },
    { id: "v3", city: "Mansfield", device: "Mobile", referrer: "Facebook ad", query: "", at: 9, pages: [["/reviews", "Reviews", 52], ["/new-garage-doors", "New Garage Doors", 39]] },
    { id: "v4", city: "Fort Worth", device: "Desktop", referrer: "Direct", query: "", at: 26, pages: [["/openers", "Garage Door Openers", 96]] },
    { id: "v5", city: "Arlington", device: "Mobile", referrer: "ChatGPT", query: "", at: 31, pages: [["/blog/garage-door-spring-snapped", "My Garage Door Spring Snapped. Now What?", 138]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Arlington", at: 7, topic: "Service area", page: "/",
      messages: [
        ["visitor", "Do you come out to Burleson?"],
        ["bot", "We cover most of DFW. The owner can confirm Burleson. Want me to have him reach out?"],
        ["visitor", "Not yet, just checking."],
      ],
    },
  ],

  doneTasks: [
    { title: "Ask Tom for a Google review", contact: "d4", done: 30 },
    { title: "Send Alicia a quote for the rental house", contact: "d9", done: 52 },
  ],
};
