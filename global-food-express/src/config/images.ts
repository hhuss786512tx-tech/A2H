/**
 * Image manifest. Every photo the site uses is listed here once so the owner
 * can swap a placeholder for a real shot by replacing the file in /public/images
 * (keep the filename and aspect ratio) or by editing `src`.
 *
 * All files are generated placeholders until real photography arrives.
 * See PHOTO_SHOTLIST.md for the brief given to the photographer.
 */
export interface SiteImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** What the photographer should shoot. Used to generate PHOTO_SHOTLIST.md. */
  shot: string;
  placeholder: boolean;
}

const img = (
  key: string,
  width: number,
  height: number,
  alt: string,
  shot: string,
): SiteImage => ({
  src: `/images/${key}.jpg`,
  width,
  height,
  alt,
  shot,
  placeholder: true,
});

export const IMAGES = {
  hero: img(
    "hero-spice-wall",
    2400,
    1500,
    "Whole spices, dried chilies and turmeric in open sacks on the Global Food Express spice wall",
    "Hero, landscape 16:10. Spice aisle, low warm light, shallow depth of field. Open sacks or bins of whole spices in the foreground, masala boxes receding behind. No people.",
  ),
  heroPoster: img(
    "hero-poster",
    1600,
    1000,
    "Global Food Express storefront at dusk",
    "Hero video poster. Storefront at dusk with the sign lit. Also shoot 10 to 15 seconds of slow handheld video: spices being scooped, a grill sizzling, produce being misted.",
  ),
  produce: img(
    "aisle-produce",
    1600,
    2000,
    "Fresh okra, bitter gourd, green chilies and cilantro stacked in the produce section",
    "Produce aisle, portrait 4:5. Desi vegetables up close: okra, karela, tinda, methi bunches, long green chilies, coriander.",
  ),
  spices: img(
    "aisle-spices",
    1600,
    2000,
    "Shelves of boxed masalas and whole spices from Shan, National and MDH",
    "Spice aisle, portrait 4:5. Straight-on shot of the masala wall with brand boxes legible.",
  ),
  meat: img(
    "aisle-halal-meat",
    1600,
    2000,
    "Butcher trimming fresh zabiha halal goat at the Global Food Express meat counter",
    "Butcher counter, portrait 4:5. Butcher at work, clean steel, fresh cuts in the case. Ask permission before shooting staff.",
  ),
  frozen: img(
    "aisle-frozen",
    1600,
    2000,
    "Frozen parathas, samosas and kebabs in the freezer case",
    "Frozen aisle, portrait 4:5. Freezer door open, packaged parathas, samosas, kebabs, with frost on the glass.",
  ),
  sweets: img(
    "aisle-sweets",
    1600,
    2000,
    "Boxes of mithai, baklava and halwa on the sweets shelf",
    "Sweets, portrait 4:5. Mithai boxes, baklava trays, halwa tins. Warm light.",
  ),
  rice: img(
    "aisle-rice-pantry",
    1600,
    2000,
    "Stacked 10 and 20 pound sacks of aged basmati rice, lentils and flour",
    "Rice and pantry, portrait 4:5. Stacked basmati sacks with brand names visible, daal bins, atta bags.",
  ),
  snacks: img(
    "aisle-snacks",
    1600,
    2000,
    "Imported namkeen, biscuits and chai on the snack aisle",
    "Snacks and beverages, portrait 4:5. Namkeen bags, biscuit tins, chai boxes, Rooh Afza.",
  ),
  storefrontRosenberg: img(
    "store-rosenberg",
    1600,
    1067,
    "Global Food Express storefront at 235 Minonite Rd, Rosenberg, Texas",
    "Rosenberg storefront, landscape 3:2. Daytime, sign and Suite 120 entrance visible, a few cars.",
  ),
  storefrontSugarLand: img(
    "store-sugar-land",
    1600,
    1067,
    "Global Food Express storefront at 10560 Synott Rd, Sugar Land, Texas",
    "Sugar Land storefront, landscape 3:2. Daytime, sign and entrance visible from Synott Rd.",
  ),
  halal: img(
    "halal-counter",
    2000,
    1250,
    "Fresh zabiha halal lamb and chicken in the refrigerated butcher case",
    "Halal section, landscape 16:10. Close detail of fresh cuts in the case, labels showing zabiha / halal.",
  ),
  team: img(
    "team",
    1600,
    1067,
    "The Global Food Express team behind the counter",
    "About page, landscape 3:2. Owners and staff in front of the spice wall or at the counter.",
  ),
  whatsapp: img(
    "whatsapp-qr-rosenberg",
    800,
    800,
    "QR code for the Global Food Express Rosenberg WhatsApp community",
    "Not a photo. Export the Rosenberg WhatsApp community QR as a square PNG, 800x800.",
  ),
  whatsappSugarLand: img(
    "whatsapp-qr-sugar-land",
    800,
    800,
    "QR code for the Global Food Express Sugar Land WhatsApp community",
    "Not a photo. Export the Sugar Land WhatsApp community QR as a square PNG, 800x800.",
  ),
  blogZabiha: img("blog-zabiha", 1600, 1000, "Halal certification label on a package of fresh chicken", "Blog, 16:10. A halal label on packaged meat."),
  blogMasala: img("blog-masala", 1600, 1000, "A dozen whole and ground spices laid out in small bowls", "Blog, 16:10. Spices in bowls on a dark surface: cumin, coriander, turmeric, red chili, garam masala."),
  blogBasmati: img("blog-basmati", 1600, 1000, "Aged basmati grains in an open sack", "Blog, 16:10. Close detail of long basmati grains."),
  blogMediterranean: img("blog-mediterranean", 1600, 1000, "Olives, tahini, labneh and pita on a counter", "Blog, 16:10. Mediterranean pantry flat lay."),
  blogEid: img("blog-eid", 1600, 1000, "Dates, sheer khurma ingredients and mithai boxes ready for Eid", "Blog, 16:10. Dates, vermicelli, mithai, a kettle."),
  blogCuts: img("blog-cuts", 1600, 1000, "Labeled cuts of halal goat and lamb on butcher paper", "Blog, 16:10. Butcher cuts on paper with handwritten labels."),
} as const satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;
