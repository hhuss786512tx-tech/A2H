// Sample data for a fictional tree removal company. Every person, phone number
// and address is made up. Times are relative to page load: positive = hours
// ago, negative = hours ahead. Calls with outbound:true are the speed-to-lead
// caller: the AI phoned the lead `after` seconds after their form came in.

window.NICHES = window.NICHES || {};
window.NICHES.tree = {
  client: { name: "Harbor Oak Tree Service", short: "HO", city: "Huntington, NY", goal: 60000, trade: "Tree removal", appt: "Estimate" },

  stages: [
    { id: "new", label: "New" },
    { id: "contacted", label: "Contacted" },
    { id: "scheduled", label: "Scheduled" },
    { id: "booked", label: "Booked" },
    { id: "completed", label: "Completed" },
    { id: "lost", label: "Lost" },
  ],

  speed: { median: 46, calls: 38, reached: 29, booked: 14 },

  ads: [
    { id: "a1", name: "Leaning tree? Free estimate this week", campaign: "Tree removal leads · Suffolk", status: "Active", spend: 486, impr: 21300, clicks: 402, leads: 17, booked: 7, won: 2, wonValue: 6900 },
    { id: "a2", name: "Storm damage cleanup, same-week crews", campaign: "Tree removal leads · Suffolk", status: "Active", spend: 311, impr: 15800, clicks: 268, leads: 11, booked: 3, won: 1, wonValue: 2400 },
    { id: "a3", name: "Stump grinding from $150", campaign: "Stump leads · Huntington", status: "Active", spend: 204, impr: 12600, clicks: 151, leads: 5, booked: 0, won: 0, wonValue: 0 },
    { id: "a4", name: "Crane removal drone video", campaign: "Tree removal leads · Suffolk", status: "Paused", spend: 52, impr: 2300, clicks: 39, leads: 1, booked: 0, won: 0, wonValue: 0 },
  ],

  deals: [
    {
      id: "d1", name: "Dana Whitfield", phone: "(631) 555-0312", email: "dana.whitfield@example.com",
      city: "Huntington", zip: "11743", source: "Phone call", stage: "booked", service: "Remove 2 dead oaks near the house",
      value: 3800, temp: "hot", urgency: "This week", created: 50,
      next: { label: "Estimate visit", appt: true },
      call: {
        at: 50, seconds: 198, disposition: "Booked",
        summary: "Two dead oaks within 15 feet of the house, one dropping limbs. Booked a free estimate for {day} morning.",
        transcript: [
          ["ai", "Thanks for calling Harbor Oak Tree Service, this is the AI assistant. How can I help?"],
          ["caller", "I've got two dead oaks right by the house and one keeps dropping branches."],
          ["ai", "That's worth getting looked at soon. Roughly how tall are they, and can a truck get near them?"],
          ["caller", "Maybe 50 feet. There's a driveway on that side."],
          ["ai", "Good. We do free estimates. I have {day} at 9 AM or 1 PM. Which works?"],
          ["caller", "9 is fine."],
          ["ai", "You're set for {day} at 9 AM. You'll get a text confirmation with the estimator's name."],
        ],
      },
      appointment: { day: 2, hour: 9, status: "Confirmed", notes: "Two dead oaks ~50 ft, 15 ft from house. Driveway access on that side." },
    },
    {
      id: "d2", name: "Marcus Bell", phone: "(631) 555-0377", email: "marcus.bell@example.com",
      city: "Northport", zip: "11768", source: "Website chat", stage: "scheduled", service: "Crane removal, large maple over garage",
      value: 6400, temp: "warm", urgency: "This month", created: 96,
      next: { label: "Estimate visit", appt: true },
      visit: {
        referrer: "Google", query: "tree removal over garage northport", device: "Mobile",
        pages: [
          ["/services/crane-removal", "Crane Tree Removal", 118],
          ["/pricing", "What Tree Removal Costs", 64],
          ["/reviews", "Reviews", 51],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 96, topic: "Crane removal", page: "/services/crane-removal",
        messages: [
          ["visitor", "There's a huge maple leaning over my detached garage. Can you take it down without wrecking the roof?"],
          ["bot", "Yes, that's what crane removal is for: the tree comes down in sections lifted over the garage. Want a free estimate?"],
          ["visitor", "Sure, what does something like that run?"],
          ["bot", "Crane jobs usually land between $4,000 and $8,000 depending on size and access. The estimator gives you a written number on site. Can I grab your name and number?"],
          ["visitor", "Marcus, 631-555-0377"],
          ["bot", "Thanks Marcus. You'll get a call in the next minute to pick a time."],
        ],
      },
      appointment: { day: 5, hour: 13, status: "Scheduled", notes: "Large maple leaning over detached garage. Likely crane job." },
    },
    {
      id: "d3", name: "Priya Raman", phone: "(631) 555-0309", email: "priya.raman@example.com",
      city: "Commack", zip: "11725", source: "Meta lead ad", stage: "booked", service: "Leaning pine over the driveway",
      value: 2900, temp: "hot", urgency: "This week", created: 2,
      next: { label: "Estimate visit", appt: true },
      form: { name: "Meta instant form: Free tree estimate", answers: [["What's going on", "Pine leaning over the driveway after the wind"], ["Property", "Own my home"], ["When", "This week"]] },
      call: {
        at: 2, outbound: true, after: 44, seconds: 171, disposition: "Booked",
        summary: "Called 44 seconds after the form. Pine leaning toward the driveway since the storm, roots lifting. Qualified as homeowner with truck access. Booked a free estimate for tomorrow at 10 AM.",
        transcript: [
          ["ai", "Hi Priya, this is the AI assistant for Harbor Oak Tree Service. You just asked for a tree estimate on Facebook. Is now a good time for two quick questions?"],
          ["caller", "Oh wow, that was fast. Yeah, go ahead."],
          ["ai", "Thanks. The form says a pine is leaning over the driveway. Is it leaning more than it used to, or has it always been like that?"],
          ["caller", "It moved in the wind last night. The ground on one side is lifting up."],
          ["ai", "Lifting roots means it should be looked at quickly. Can a truck get close to it, and is it your property?"],
          ["caller", "Yes, it's right by the street, and it's my house."],
          ["ai", "Perfect. Estimates are free. I have {day} at 10 AM or 2 PM. Which is better?"],
          ["caller", "10."],
          ["ai", "Done. You're booked for {day} at 10 AM with our estimator. I'm texting you the confirmation now. If the lean gets worse before then, call this number and we'll move you up."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "Pine leaning over driveway, roots lifting after wind. Street-side access. Priority if it worsens." },
    },
    {
      id: "d4", name: "Tom Okafor", phone: "(631) 555-0363", email: "",
      city: "Huntington Station", zip: "11746", source: "Referral", stage: "completed", service: "Remove 3 trees, grind stumps",
      value: 5600, temp: "hot", urgency: "This week", created: 624,
      notes: "Referred by a past customer two doors down.",
      appointment: { at: 456, status: "Completed", notes: "Estimate done, quote accepted on site. Crew came the following week." },
      quote: { number: "Q-0001", status: "Accepted", at: 336, lines: [["Tree removal, 40-60 ft", 3, 1500], ["Stump grinding", 3, 200]] },
    },
    {
      id: "d5", name: "Rachel Nguyen", phone: "(631) 555-0321", email: "rachel.nguyen@example.com",
      city: "Dix Hills", zip: "11746", source: "Meta lead ad", stage: "contacted", service: "Trim oaks away from the roof",
      value: 1400, temp: "warm", urgency: "This month", created: 144,
      next: { label: "Send trimming quote", at: 24 },
      form: { name: "Meta instant form: Free tree estimate", answers: [["What's going on", "Branches rubbing the roof and gutters"], ["Property", "Own my home"], ["When", "This month"]] },
      call: {
        at: 144, outbound: true, after: 51, seconds: 142, disposition: "Quote requested",
        summary: "Called 51 seconds after the form. Oak limbs rubbing the roof on the back of the house. Wants a ballpark before booking. Created a task to send a trimming quote.",
        transcript: [
          ["ai", "Hi Rachel, this is the AI assistant for Harbor Oak Tree Service. You just sent us a form about branches on your roof. Got a minute?"],
          ["caller", "Sure. I mostly want to know what it costs before anyone comes out."],
          ["ai", "Understood. How many trees are touching the roof, and roughly how big are they?"],
          ["caller", "Two oaks, big ones. Just the limbs over the back of the house."],
          ["ai", "Trimming two large oaks back from a roof usually runs $900 to $1,800. I'll have the office send you a written range today, and if it looks right we'll book the visit. Does that work?"],
          ["caller", "Yes, that works."],
        ],
      },
      task: { title: "Send Rachel the oak trimming quote", due: 24 },
      quote: { number: "Q-0005", status: "Draft", lines: [["Crown reduction, large oak", 2, 650], ["Haul away debris", 1, 100]] },
    },
    {
      id: "d6", name: "Luis Herrera", phone: "(631) 555-0388", email: "",
      city: "Melville", zip: "11747", source: "Web form", stage: "lost", service: "Remove tree on town property",
      value: 0, temp: "cold", urgency: "Just researching", created: 432, lostReason: "Tree is on the town right-of-way, referred to the town",
      form: { name: "Website form: Free estimate", answers: [["Problem", "Tree between sidewalk and street is dropping limbs"], ["Best time to call", "Anytime"]] },
      call: {
        at: 432, outbound: true, after: 39, seconds: 88, disposition: "Not a fit",
        summary: "Called 39 seconds after the form. The tree is between the sidewalk and the street, which is town property. Explained the town handles those and gave him the number to call. Marked not a fit.",
        transcript: [
          ["ai", "Hi Luis, this is the AI assistant for Harbor Oak Tree Service. You just asked about a tree dropping limbs. Is the tree in your yard, or between the sidewalk and the street?"],
          ["caller", "Between the sidewalk and the street."],
          ["ai", "That strip is usually town property, so a private company can't remove it. The Town of Huntington handles those through highway services. Want me to text you their number?"],
          ["caller", "Oh. Yeah, send it."],
          ["ai", "Sending it now. If you ever need work on trees inside your property line, we're happy to help."],
        ],
      },
    },
    {
      id: "d7", name: "Hannah Brooks", phone: "(631) 555-0335", email: "hannah.brooks@example.com",
      city: "Greenlawn", zip: "11740", source: "Website chat", stage: "new", service: "Stump grinding, 4 stumps",
      value: 700, temp: "warm", urgency: "This week", created: 20,
      next: { label: "Email estimate times", at: -4 },
      visit: {
        referrer: "ChatGPT", query: "", device: "Desktop",
        pages: [
          ["/", "Harbor Oak Tree Service", 38],
          ["/services/stump-grinding", "Stump Grinding", 91],
          ["/blog/can-you-leave-a-stump", "Can You Just Leave a Stump?", 164],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 20, topic: "Stump grinding", page: "/blog/can-you-leave-a-stump",
        messages: [
          ["visitor", "I have four stumps from trees that came down last year. Do you grind them or do I need the whole tree service?"],
          ["bot", "Stump grinding on its own is fine. Four stumps is usually a half-day job and starts around $150 per stump. Want an estimate?"],
          ["visitor", "Yes please. hannah.brooks@example.com"],
          ["bot", "Thanks Hannah. The office will email you a few times to choose from."],
        ],
      },
      task: { title: "Email Hannah estimate times for 4 stumps", due: -4 },
      draft: "Hi Hannah, thanks for reaching out about the four stumps. We have estimate slots in Greenlawn this week, morning or afternoon. Reply with the day and time that suits you and we'll lock it in.",
    },
    {
      id: "d8", name: "Greg Sutton", phone: "(631) 555-0394", email: "",
      city: "Huntington", zip: "11743", source: "Phone call", stage: "booked", service: "Storm damage, split birch on fence",
      value: 2200, temp: "hot", urgency: "This week", created: 192,
      next: { label: "Estimate visit", appt: true },
      call: {
        at: 192, seconds: 176, disposition: "Booked",
        summary: "Birch split in the storm and is resting on the neighbor's fence. Booked an estimate. Asked about insurance; told him the estimator photographs everything for the claim.",
        transcript: [
          ["ai", "Thanks for calling Harbor Oak Tree Service, this is the AI assistant. How can I help?"],
          ["caller", "A birch split last night and half of it is on my neighbor's fence."],
          ["ai", "Sorry to hear that. Is anyone in danger, or is it resting stable?"],
          ["caller", "It's stable, just ugly. Will insurance cover this?"],
          ["ai", "Often yes. Our estimator photographs the damage for your claim. I have {day} at 10 AM. Does that work?"],
          ["caller", "Yes."],
          ["ai", "You're booked for {day} at 10. Text confirmation on its way."],
        ],
      },
      appointment: { day: 1, hour: 10, status: "Confirmed", notes: "Split birch on neighbor's fence. Photograph for insurance." },
      quote: { number: "Q-0004", status: "Sent", at: 24, lines: [["Storm damage removal, birch", 1, 1800], ["Fence-side cleanup and haul", 1, 400]] },
    },
    {
      id: "d9", name: "Alicia Moreno", phone: "(631) 555-0316", email: "alicia.moreno@example.com",
      city: "Cold Spring Harbor", zip: "11724", source: "Referral", stage: "completed", service: "Remove large oak, crane",
      value: 7200, temp: "hot", urgency: "This month", created: 528,
      notes: "Paid in full. Asked about a discount for her neighbor's two trees.",
      quote: { number: "Q-0002", status: "Accepted", at: 216, lines: [["Crane removal, oak over 70 ft", 1, 6400], ["Stump grinding, large", 1, 800]] },
    },
    {
      id: "d10", name: "Ben Carter", phone: "(631) 555-0352", email: "",
      city: "East Northport", zip: "11731", source: "Meta lead ad", stage: "contacted", service: "Remove dead ash tree",
      value: 1900, temp: "warm", urgency: "This month", created: 240,
      next: { label: "Follow up, no answer on the AI call", at: -24 },
      form: { name: "Meta instant form: Free tree estimate", answers: [["What's going on", "Ash tree died over the summer"], ["Property", "Own my home"], ["When", "This month"]] },
      call: {
        at: 240, outbound: true, after: 48, seconds: 31, disposition: "No answer, text sent",
        summary: "Called 48 seconds after the form, no answer. Left a short voicemail and sent a text with a link to pick an estimate time. Follow-up task created for the office.",
        transcript: [
          ["ai", "Hi Ben, this is the AI assistant for Harbor Oak Tree Service. You just asked for an estimate on the dead ash tree. I'm texting you a link to pick a time, or call this number back any time and we'll set it up."],
        ],
      },
      task: { title: "Follow up with Ben, no answer on the AI call", due: -24, auto: true },
      draft: "Hi Ben, it's Harbor Oak Tree Service following up on the dead ash tree. Our estimator is in East Northport this week. Is a quick call this afternoon or tomorrow morning better?",
    },
    {
      id: "d11", name: "Sofia Patel", phone: "(631) 555-0370", email: "sofia.patel@example.com",
      city: "Centerport", zip: "11721", source: "Website chat", stage: "completed", service: "Lot clearing, 6 small trees",
      value: 4100, temp: "warm", urgency: "This week", created: 360,
      visit: {
        referrer: "Google", query: "lot clearing centerport", device: "Mobile",
        pages: [
          ["/services/lot-clearing", "Lot Clearing", 122],
          ["/projects", "Recent Jobs", 57],
        ],
        converted: "Started a chat",
      },
      chat: {
        at: 360, topic: "Lot clearing", page: "/projects",
        messages: [
          ["visitor", "We're putting in a pool and need six small trees cleared from the back. Do you do that?"],
          ["bot", "Yes, lot clearing for pools and additions is common for us, including stumps and haul-away. Would you like a free estimate?"],
          ["visitor", "Yes. Sofia, 631-555-0370, I'm in Centerport"],
          ["bot", "Thanks Sofia. You'll get a call in the next minute to set a time."],
        ],
      },
      quote: { number: "Q-0003", status: "Accepted", at: 96, lines: [["Remove small trees under 30 ft", 6, 450], ["Stump grinding and haul", 1, 1400]] },
    },
    {
      id: "d12", name: "Kevin Ross", phone: "(631) 555-0327", email: "",
      city: "Huntington", zip: "11743", source: "Web form", stage: "new", service: "Tree touching power line",
      value: 0, temp: "warm", urgency: "This week", created: 9,
      next: { label: "AI calls at 8:00 AM", at: -2 },
      form: { name: "Website form: Free estimate", answers: [["Problem", "Branches touching the line to the house"], ["Best time to call", "Mornings"]] },
      call: {
        at: 9, queued: true,
        summary: "Form came in at 10:12 PM. The call is held until 8:00 AM so it lands inside calling hours. Kevin asked for mornings anyway.",
      },
      task: { title: "Morning: confirm the AI reached Kevin (power line)", due: -2, auto: true },
    },
  ],

  anonymous: [
    { id: "v1", city: "Huntington", device: "Mobile", referrer: "Google", query: "tree removal cost huntington ny", at: 1.2, pages: [["/pricing", "What Tree Removal Costs", 81], ["/services/tree-removal", "Tree Removal", 46]] },
    { id: "v2", city: "Northport", device: "Desktop", referrer: "Google", query: "", at: 5, pages: [["/", "Harbor Oak Tree Service", 39]] },
    { id: "v3", city: "Commack", device: "Mobile", referrer: "Facebook ad", query: "", at: 9, pages: [["/reviews", "Reviews", 55], ["/projects", "Recent Jobs", 34]] },
    { id: "v4", city: "Dix Hills", device: "Desktop", referrer: "Direct", query: "", at: 26, pages: [["/services/stump-grinding", "Stump Grinding", 104]] },
    { id: "v5", city: "Melville", device: "Mobile", referrer: "ChatGPT", query: "", at: 31, pages: [["/blog/is-my-tree-dead", "Is My Tree Dead or Dormant?", 142], ["/services/tree-removal", "Tree Removal", 40]] },
  ],

  extraChats: [
    {
      id: "c-anon", name: "Anonymous visitor", city: "Huntington", at: 7, topic: "Service area", page: "/",
      messages: [
        ["visitor", "Do you come out to Port Jefferson?"],
        ["bot", "Our main area is Huntington, Northport, Commack, Dix Hills, Melville and Smithtown. For Port Jefferson the office can confirm. Want me to have them reach out?"],
        ["visitor", "No thanks, just checking."],
      ],
    },
  ],

  doneTasks: [
    { title: "Send Tom the invoice and before/after photos", contact: "d4", done: 30 },
    { title: "Call Alicia's neighbor about the two trees", contact: "d9", done: 52 },
  ],
};
