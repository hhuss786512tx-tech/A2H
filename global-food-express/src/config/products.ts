import { IMAGES, type ImageKey } from "./images";

export interface FAQ {
  q: string;
  a: string;
}

export interface Category {
  slug: string;
  name: string;
  /** Short label for marquee / nav */
  short: string;
  h1: string;
  title: string; // <title>, under 60 chars
  description: string; // meta description, under 155 chars
  intro: string[]; // paragraphs
  image: ImageKey;
  /** Real brands and products stocked. TODO_CLIENT: trim anything not carried. */
  products: string[];
  keywords: string[];
  faqs: FAQ[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "produce",
    name: "Fresh Produce",
    short: "Produce",
    h1: "Fresh desi and Mediterranean produce",
    title: "Fresh Produce | Global Food Express Rosenberg & Sugar Land",
    description:
      "Okra, karela, methi, long green chilies, fresh curry leaves and Mediterranean herbs. Fresh produce at Global Food Express in Rosenberg and Sugar Land, TX.",
    intro: [
      "The produce section is the first thing you see when you walk in, and it is restocked several times a week. Expect the vegetables that a Houston-area supermarket either skips or sells wilted: tender okra, bitter gourd, tinda, lauki, fresh methi and curry leaves, and the long thin green chilies that a pot of daal actually needs.",
      "Mediterranean cooks will find flat-leaf parsley by the bunch, mint, cucumbers the right size for a shirazi salad, and lemons at prices that make a batch of preserved lemons a reasonable idea.",
    ],
    image: "produce",
    products: [
      "Okra (bhindi)",
      "Bitter gourd (karela)",
      "Tinda and lauki",
      "Fresh methi and curry leaves",
      "Thai and Indian green chilies",
      "Cilantro, mint and flat-leaf parsley",
      "Red and green mangoes in season",
      "Persian cucumbers",
      "Ginger and garlic in bulk",
      "Fresh dates in season",
    ],
    keywords: ["indian vegetables near me", "desi produce rosenberg", "fresh okra sugar land"],
    faqs: [
      {
        q: "Which days is produce delivered?",
        a: "Produce is restocked several times a week at both stores. For a specific vegetable, call the store and ask the day you plan to come in. TODO_CLIENT: confirm delivery days.",
      },
      {
        q: "Do you carry fresh curry leaves and methi?",
        a: "Yes. Both are regular items, though quantities depend on the season. Ask at the counter if you do not see them on the floor.",
      },
      {
        q: "Do you sell mangoes by the box?",
        a: "During mango season we sell by the box as well as by the piece. Varieties change through the summer.",
      },
    ],
  },
  {
    slug: "spices-masalas",
    name: "Spices & Masalas",
    short: "Spices",
    h1: "Whole spices, ground spices and boxed masalas",
    title: "Spices & Masalas | Global Food Express Fort Bend",
    description:
      "Shan, National, MDH, Laziza and whole spices by weight. The largest masala wall in Rosenberg and a full spice aisle in Sugar Land, TX.",
    intro: [
      "Walk past the produce and the masala wall runs the length of the aisle. Every Shan and National box you grew up with is here, along with MDH, Laziza, Everest and the Mediterranean side: za'atar, sumac, Aleppo pepper, baharat, and seven-spice.",
      "Whole spices come in the sizes that make sense for a family kitchen. Cumin, coriander, black cardamom, cinnamon bark, cloves and whole dried red chilies in 7 oz, 14 oz and larger bags. Turmeric and red chili powder in 400 g and up.",
    ],
    image: "spices",
    products: [
      "Shan and National recipe masalas",
      "MDH, Everest and Laziza",
      "Whole cumin, coriander and fennel",
      "Green and black cardamom",
      "Kashmiri and regular red chili powder",
      "Turmeric, garam masala, chaat masala",
      "Za'atar, sumac and Aleppo pepper",
      "Baharat and Lebanese seven-spice",
      "Saffron",
      "Dried fenugreek (kasuri methi)",
    ],
    keywords: ["desi spices and masalas", "shan masala near me", "indian spices store rosenberg"],
    faqs: [
      {
        q: "Do you sell spices by weight?",
        a: "Most whole spices come pre-bagged in several sizes. Ask at the counter about larger quantities for catering or restaurant use.",
      },
      {
        q: "Do you carry Mediterranean spice blends?",
        a: "Yes. Za'atar, sumac, baharat, seven-spice and Aleppo pepper are stocked at both stores, with the widest selection in Sugar Land.",
      },
      {
        q: "Is your saffron real?",
        a: "We stock graded saffron threads from established importers. If you are unsure what you are buying, ask and we will show you the packaging and origin.",
      },
    ],
  },
  {
    slug: "halal-meat",
    name: "Zabiha Halal Meat",
    short: "Halal Meat",
    h1: "Zabiha halal meat, cut the way you ask",
    title: "Zabiha Halal Meat & Butcher | Global Food Express TX",
    description:
      "Fresh zabiha halal goat, lamb, beef and chicken with custom cuts at the butcher counter. Halal meat in Rosenberg and Sugar Land, Fort Bend County.",
    intro: [
      "Every piece of meat we sell is zabiha halal. Goat, lamb, beef and chicken arrive fresh, and the butcher counter cuts to order: curry cut with bone, boneless cubes for kebabs, mince ground while you wait, whole chicken skinned and quartered.",
      "Tell us what you are cooking. Nihari needs shank and marrow bones. Biryani wants a mix of bone-in pieces. Karahi is better with smaller cuts. We will trim it accordingly.",
    ],
    image: "meat",
    products: [
      "Goat, bone-in curry cut",
      "Lamb shoulder, leg and chops",
      "Beef shank and nihari bones",
      "Beef and chicken mince (keema)",
      "Whole chicken, skinned on request",
      "Chicken breast, thighs and drumsticks",
      "Bone marrow and paya",
      "Liver, kidney and other organ meats",
      "Marinated kebabs and tikka (select days)",
    ],
    keywords: ["halal meat rosenberg", "zabiha halal butcher near me", "halal meat sugar land"],
    faqs: [
      {
        q: "Is all your meat zabiha?",
        a: "Yes. Everything at the counter is zabiha halal, hand-slaughtered. We do not sell non-halal meat in either store.",
      },
      {
        q: "Can I pre-order a specific cut or a whole animal?",
        a: "Yes. Use the pre-order form on the contact page or call the store. Give us a day's notice for whole goat or lamb.",
      },
      {
        q: "Do you do Qurbani orders?",
        a: "TODO_CLIENT: confirm whether Qurbani/Udhiya orders are taken and how far in advance.",
      },
    ],
  },
  {
    slug: "frozen",
    name: "Frozen & Ready-to-Cook",
    short: "Frozen",
    h1: "Frozen parathas, samosas, kebabs and more",
    title: "Frozen & Ready-to-Cook Foods | Global Food Express",
    description:
      "Frozen parathas, samosas, seekh kebabs, naan, falafel and halal frozen meals. Ready-to-cook food at Global Food Express, Rosenberg and Sugar Land.",
    intro: [
      "The freezer aisle is where weeknights get rescued. Lachha and plain parathas, chicken and vegetable samosas, seekh kebabs, shami kebabs and chapli kebabs that go from freezer to pan in minutes.",
      "The Mediterranean side holds falafel, kibbeh, spinach fatayer, frozen pita and filo. Halal frozen meals and frozen fish fill out the case.",
    ],
    image: "frozen",
    products: [
      "Lachha, plain and aloo parathas",
      "Chicken, beef and vegetable samosas",
      "Seekh, shami and chapli kebabs",
      "Frozen naan and roti",
      "Falafel, kibbeh and fatayer",
      "Filo and puff pastry",
      "Frozen fish and shrimp",
      "Halal frozen meals and chicken nuggets",
      "Frozen vegetables (methi, mustard greens, peas)",
    ],
    keywords: ["frozen paratha near me", "halal frozen food rosenberg", "frozen samosas sugar land"],
    faqs: [
      {
        q: "Are the frozen kebabs and nuggets halal?",
        a: "Yes. Every frozen meat product we stock is from halal brands. Check with the counter about any specific label.",
      },
      {
        q: "Which paratha brands do you carry?",
        a: "Several, and they rotate with availability. Ask us which is in stock this week. TODO_CLIENT: list the brands you want named.",
      },
    ],
  },
  {
    slug: "rice-pantry",
    name: "Rice & Pantry",
    short: "Rice",
    h1: "Basmati rice, daal, atta and the whole pantry",
    title: "Basmati Rice, Daal & Pantry | Global Food Express TX",
    description:
      "Aged basmati in 10 and 20 lb sacks, every daal, atta and besan, ghee, oils, pickles and canned goods. Pantry staples in Rosenberg and Sugar Land, TX.",
    intro: [
      "Stacked sacks of aged basmati anchor the back wall: 10 lb for a small household, 20 lb for everyone else. Alongside them, every lentil a desi kitchen uses, from masoor and moong to chana and whole urad, in 2 lb and 4 lb bags.",
      "Flours, ghee, cooking oils, pickles, chutneys, canned chickpeas and tomatoes, tahini, olive oil and bulgur fill the rest of the aisle. Household essentials sit at the end so you are not making a second stop.",
    ],
    image: "rice",
    products: [
      "Aged basmati: 10 lb and 20 lb sacks",
      "Sella (parboiled) basmati",
      "Masoor, moong, chana, toor and urad daal",
      "Chapati atta, besan and maida",
      "Pure ghee and cooking oils",
      "Achar, chutneys and pastes",
      "Tahini, olive oil and bulgur",
      "Canned chickpeas, fava beans and tomatoes",
      "Dates, nuts and dried fruit",
      "Household essentials",
    ],
    keywords: ["basmati rice near me", "indian grocery rosenberg", "daal atta sugar land"],
    faqs: [
      {
        q: "Which basmati brands do you stock?",
        a: "A rotating selection of aged basmati from Indian and Pakistani millers, in 10 lb and 20 lb sacks. TODO_CLIENT: name the brands you carry consistently.",
      },
      {
        q: "Do you carry gluten-free flours?",
        a: "Besan (chickpea flour), rice flour and certain millet flours are naturally gluten-free and regularly stocked.",
      },
    ],
  },
  {
    slug: "snacks-sweets",
    name: "Snacks, Sweets & Beverages",
    short: "Sweets",
    h1: "Imported snacks, mithai, baklava and chai",
    title: "Snacks, Sweets & Chai | Global Food Express Fort Bend",
    description:
      "Namkeen, biscuits, mithai, baklava, halwa, chai and Rooh Afza. Imported snacks, sweets and beverages at Global Food Express, Rosenberg and Sugar Land.",
    intro: [
      "The snack aisle is where kids slow down. Namkeen mixes, Kurkure, Parle-G and Marie biscuits, Turkish wafers and the whole range of imported chips you cannot find at a chain.",
      "Sweets come boxed and fresh: mithai, baklava, halwa and barfi. For drinks, loose-leaf and bagged chai, Rooh Afza, mango juice and imported sodas.",
    ],
    image: "sweets",
    products: [
      "Haldiram's and Kolson namkeen",
      "Parle-G, Marie and Peek Freans biscuits",
      "Kurkure and imported chips",
      "Boxed mithai and barfi",
      "Baklava and Turkish delight",
      "Halwa and gulab jamun mix",
      "Tapal, Lipton Yellow Label and loose-leaf chai",
      "Rooh Afza and Jam-e-Shirin",
      "Mango juice and lassi",
      "Imported sodas and sparkling water",
    ],
    keywords: ["indian snacks near me", "mithai rosenberg", "baklava sugar land"],
    faqs: [
      {
        q: "Do you sell fresh mithai?",
        a: "Boxed mithai is always available. Fresh mithai availability varies by store and season. TODO_CLIENT: confirm fresh mithai supplier and days.",
      },
      {
        q: "Can I order sweet trays for Eid or a wedding?",
        a: "Larger orders can be arranged with notice. Call the store or use the contact form with your date and quantity.",
      },
    ],
  },
];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryImage = (c: Category) => IMAGES[c.image];

/** Words that run in the marquee strips. Real items only. */
export const MARQUEE_ITEMS = [
  "Aged basmati",
  "Shan masalas",
  "Zabiha goat",
  "Fresh okra",
  "Lachha paratha",
  "Kashmiri chili",
  "Baklava",
  "Curry leaves",
  "Seekh kebab",
  "Tapal chai",
  "Za'atar",
  "Rooh Afza",
  "Nihari bones",
  "Methi",
  "Halwa",
  "Olive oil",
];
