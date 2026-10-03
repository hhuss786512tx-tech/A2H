import type { ImageKey } from "@/config/images";

/**
 * Journal posts. Body is "lite markdown":
 *   "## Heading"  → h2        "### Heading" → h3
 *   "> text"      → answer-first paragraph (large, for AI/featured snippets)
 *   "- item"      → list item          blank line → new paragraph
 *   **bold**, [text](/path) inline.
 */
export interface Post {
  slug: string;
  title: string; // <title> under 60 chars incl. brand is handled in metadata
  h1: string;
  description: string; // under 155 chars
  datePublished: string;
  readMinutes: number;
  image: ImageKey;
  tags: string[];
  body: string;
}

export const POSTS: Post[] = [
  {
    slug: "what-zabiha-halal-means",
    title: "What Zabiha Halal Means and How to Verify It",
    h1: "What “zabiha” actually means, and how to check it",
    description:
      "Zabiha is the method of slaughter, halal is the ruling. Here is the difference, what to ask a butcher, and how we handle it at Global Food Express.",
    datePublished: "2026-10-03",
    readMinutes: 6,
    image: "blogZabiha",
    tags: ["Halal", "Meat"],
    body: `> Zabiha (also written dhabiha) is the Islamic method of slaughter: a Muslim invokes the name of God and cuts the throat, windpipe and both jugular veins of a healthy animal with a sharp blade in a single motion, letting the blood drain fully. "Halal" is the broader ruling that food is permissible. Meat can be sold as halal while the slaughter method, stunning and supply chain vary a lot. Zabiha is the specific standard most families in Fort Bend County are asking for when they say "halal meat."

## Halal versus zabiha

Every zabiha animal is halal. Not every product labeled halal has been slaughtered by hand. In the United States the word "halal" on a package is a marketing claim rather than a legal definition, and certifying bodies differ on two points: whether the animal may be stunned before the cut, and whether machine slaughter with a recorded invocation counts.

The stricter view, and the one most South Asian and Arab households in Sugar Land and Rosenberg follow, is hand slaughter by a Muslim, no prior stunning that could kill the animal, and the invocation said aloud for each animal. That is what "zabiha" means on our sign.

## What to ask a butcher

You do not need to take anyone's word for it. These five questions take two minutes at any counter, ours included.

- **Who is the supplier?** A real answer names a slaughterhouse or distributor, not just "a halal company."
- **Is it hand slaughtered?** The answer should be a plain yes. Hesitation is an answer too.
- **Is there any non-halal meat in the store?** Shared cases, shared grinders and shared knives matter. We sell no non-halal meat in either location.
- **Is the chicken zabiha as well?** Chicken is where machine slaughter is most common, so ask separately.
- **Can I see the box or the invoice?** Cases arrive labeled. A butcher who is proud of the source will show you.

## What we do at Global Food Express

Both stores sell only zabiha halal meat. Goat, lamb, beef and chicken come in fresh from suppliers we have used consistently, and the butcher counter never handles anything else, so there is no question of cross-contact with pork or non-halal beef.

Mince is ground in front of you from the cut you choose. Marinated items are prepared in-store from the same meat. Frozen kebabs, nuggets and ready meals in the freezer aisle are from halal-certified brands and we check the certification mark on every new line we bring in.

We are happy to name the supplier at the counter. If you want it in writing, ask and we will put the certifying body on the receipt.

## Reading labels in the freezer aisle

Packaged halal food usually carries a certifier's mark. In Texas you will most often see marks from IFANCA (a crescent-M), HFSAA, ISA and ISWA, among others. Each has a published standard on its website, and the differences come down to stunning and machine slaughter. If a brand only prints the word "halal" with no certifier, treat it as unverified and ask.

Two things do not make meat halal on their own: a Muslim-sounding brand name, and the phrase "Muslim-owned." Ownership is not slaughter.

## Why it matters beyond the ruling

Zabiha done properly is also simply better meat. Full blood drainage means cleaner flavor and longer freshness in the fridge. Hand slaughter means smaller batches, which means the goat you buy on Friday was not processed three weeks ago. Those are the practical reasons our regulars from Richmond and Missouri City make the drive rather than buying the first "halal" sticker they see.

## Questions we hear every week

**Is your meat the same at both stores?** Yes. Same suppliers, same standard, same butcher training. Sugar Land carries a wider Mediterranean selection of marinades and sausages.

**Do you sell non-zabiha chicken at a lower price?** No. Everything at the counter and in the freezer is zabiha halal.

**Can I bring my own animal for Qurbani?** Call the store. Arrangements depend on the season and on the supplier's capacity.

If you have a question we have not covered, ask at the counter or [send us a message](/contact). We would rather answer it than have you guess.`,
  },
  {
    slug: "beginner-masala-pantry",
    title: "A Beginner's Masala Pantry: 12 Spices to Start",
    h1: "A beginner's masala pantry",
    description:
      "Twelve spices that cover most Indian and Pakistani home cooking, what each one does, which boxed masalas to buy first, and how to store them.",
    datePublished: "2026-10-03",
    readMinutes: 7,
    image: "blogMasala",
    tags: ["Spices", "Guides"],
    body: `> A working desi pantry needs twelve spices, not fifty: cumin, coriander, turmeric, red chili, garam masala, black pepper, mustard seed, cardamom, cinnamon, cloves, bay leaf and kasuri methi. Add three boxed masalas (biryani, karahi, chana) and you can cook most weeknight dishes without a second trip.

## Start with the four that do most of the work

**Cumin (zeera).** Whole for tempering in hot oil, ground for curries and raita. Buy whole and toast a tablespoon at a time; ground cumin fades within a couple of months.

**Coriander (dhania).** Ground coriander is the quiet backbone of most gravies. It thickens, it rounds out heat, and it is the spice people forget. Buy a 7 oz bag.

**Turmeric (haldi).** Color, earthiness, and a bit of bitterness that disappears in cooking. A 200 g bag lasts a household months. Keep it away from the stove; heat dulls it.

**Red chili powder (lal mirch).** Two kinds matter. Regular red chili powder for heat. Kashmiri chili for color with gentle heat, which is what makes a butter chicken or a nihari look right.

## The warm spices

**Garam masala.** A finishing blend, stirred in during the last minute. Every brand differs. Shan and National sell small boxes; if you want to make your own, cardamom, cinnamon, cloves and black pepper are the core.

**Black cardamom (badi elaichi)** for biryani and nihari, smoky and resinous. **Green cardamom** for chai, kheer and pulao. Both keep well whole.

**Cinnamon bark (dalchini)**, **cloves (laung)** and **bay leaf (tej patta)** go into the oil at the start of a pulao or a korma and come out before serving. Buy small quantities; a little goes far.

## The two that surprise people

**Mustard seed (rai).** Black or brown. Popped in oil for South Indian dishes and for pickles. Essential for a quick cabbage or potato sabzi.

**Kasuri methi.** Dried fenugreek leaves, crushed over a curry at the end. It is the flavor in restaurant butter chicken and in most Punjabi gravies that home cooks cannot place. One 100 g pack lasts a year.

## Boxed masalas worth owning

Nobody in Rosenberg is grinding every blend from scratch on a Tuesday. These three boxes earn their shelf space.

- **Shan Bombay Biryani or National Biryani.** Different balance of heat; try both.
- **Shan Karahi** for the quick chicken or goat karahi that most families cook weekly.
- **Shan Chana** or **MDH Chana Masala** for chickpeas, and it works on potatoes too.

After those, add by what you cook: Nihari, Haleem, Tikka, Achar Gosht, Sambar powder, Chaat masala for fruit and snacks.

## How much to buy

Whole spices keep a year or more in a sealed jar away from light. Ground spices lose aroma after three to four months. So buy whole cumin, coriander and cardamom in bigger bags, and buy ground turmeric and chili in sizes you will finish in a season.

Both our stores stock whole spices in 7 oz and 14 oz bags and ground spices from 200 g up. If you are stocking a pantry from zero, bring this list to the counter and we will walk the aisle with you.

## Toasting and storing

Whole spices wake up when toasted. Put a dry pan on medium heat, add the cumin or coriander, and shake it for a minute until it smells nutty and darkens a shade. Cool, then grind in a cheap coffee grinder kept only for spices. Ground this way, a spice tastes twice as strong as the pre-ground bag, so use a little less.

Store everything in airtight jars in a drawer or a cupboard away from the stove. Clear jars on an open shelf look nice and cost you flavor; light and heat are what kill a spice. Label the jar with the month you opened it. If a ground spice has no smell when you open the lid, it is seasoning nothing and it is time to replace it.

## A ten-minute test recipe

Heat two tablespoons of oil. Add a teaspoon of whole cumin and let it sizzle. Add a chopped onion, cook until golden. Add a teaspoon each of ground coriander and turmeric, half a teaspoon of red chili, and a pinch of salt. Add a can of chickpeas with a splash of water, simmer ten minutes, finish with a pinch of garam masala and crushed kasuri methi. That is dinner, and you have used eight of the twelve.

Everything on this page is on the [spices and masalas aisle](/products/spices-masalas) at both stores.`,
  },
  {
    slug: "how-to-pick-basmati-rice",
    title: "How to Pick Basmati Rice: Age, Grain and Sella",
    h1: "How to pick basmati rice",
    description:
      "Aged versus new crop, sella versus raw, Indian versus Pakistani basmati, and which sack to buy for biryani, pulao or everyday rice.",
    datePublished: "2026-10-03",
    readMinutes: 6,
    image: "blogBasmati",
    tags: ["Rice", "Guides"],
    body: `> Good basmati is aged at least a year, has long slender grains that grow longer than they do wider when cooked, and smells faintly of popcorn when raw. For biryani buy aged raw basmati; for everyday rice that forgives mistakes buy sella (parboiled); for pulao either works. A 20 lb sack is the best value if you cook rice more than twice a week.

## Why age matters

Freshly harvested basmati is high in moisture and starch. Cooked, it clumps and breaks. Millers age the grain for one to two years in controlled storage, which dries it and lets the grains elongate without turning to mush. The sacks that say "aged" or "1121 extra long" are worth the premium over "new crop."

If a sack has no age stated and the price seems too good, it is usually new crop or a blend.

## Raw versus sella

**Raw (white) basmati** is milled straight from the aged paddy. It has the strongest aroma and the best texture for biryani, where each grain needs to stand apart. It is also less forgiving: oversoak it or overcook it and it breaks.

**Sella basmati** is parboiled in the husk before milling. The grains turn a pale gold, they hold their shape through long cooking, and they absorb masala without collapsing. It is what most restaurants use for biryani for exactly that reason, and it is the right choice if you are feeding twenty people or cooking in a pressure cooker.

Sella needs a longer soak (30 to 45 minutes) and a little more water.

## Indian versus Pakistani

Both grow basmati in the same Punjab plains on either side of the border and both are excellent. Pakistani super kernel tends to be slightly longer and more aromatic; Indian 1121 is very long and consistent. Preferences run along family lines more than quality lines. We stock both so you can keep buying what your mother bought.

## Reading the sack

- **Variety.** 1121, Super Kernel, Pusa, 1509. All are basmati; 1121 and Super Kernel are the longest.
- **Grade.** "Extra long" or "XXL" means the longest sorted grains with fewer broken pieces.
- **Age.** "Aged," "1 year," "2 years." Longer is better up to two years.
- **Crop year** if printed. Older is fine; rice does not go stale in a sealed sack.
- **Broken percentage.** Lower is better. Premium sacks run under five percent.

## Which size

A 10 lb sack suits a household of two that cooks rice a few times a week. A 20 lb sack is the standard family size and the best price per pound at both our stores. Rice keeps a year or more at room temperature in a sealed container, so bigger is safe.

Transfer the rice to a lidded bin once opened. Keep it away from the stove and away from strong-smelling spices; basmati absorbs odors.

## Brown basmati and other grains

Brown basmati keeps the bran, cooks in about 35 minutes, and has a nuttier flavor with a firmer bite. It is sold in smaller bags because it goes rancid faster than white rice; keep it in the fridge if you will not finish it in two months. We also stock sona masoori for South Indian everyday rice, Egyptian short grain for stuffed vegetables, and jasmine for anyone cooking Thai or Chinese dishes alongside desi ones. None of these are substitutes for basmati in a biryani, and basmati is not the right rice for idli batter, so buy for the dish.

## Cooking it properly

Rinse until the water runs nearly clear, three or four changes. Soak raw basmati 20 minutes, sella 40. Boil in plenty of salted water like pasta, test at 6 minutes for raw and 9 to 10 for sella, drain when the grain is just short of done. For biryani, layer and steam on low for 20 minutes with the lid sealed. For plain rice, return it to the pot, cover with a towel and lid, and rest 10 minutes.

If your rice is breaking, you are soaking too long or boiling too hard. If it is sticky, you did not rinse enough. If it is hard in the center, add a splash of water and steam five more minutes.

All of the sacks above are stacked on the [rice and pantry aisle](/products/rice-pantry) in Rosenberg and Sugar Land, and prices on the 20 lb size are posted on the [weekly specials](/weekly-specials) when they change.`,
  },
  {
    slug: "mediterranean-pantry-staples",
    title: "Mediterranean Pantry Staples: What to Keep in Stock",
    h1: "Mediterranean pantry staples",
    description:
      "Olive oil, tahini, za'atar, sumac, bulgur, chickpeas, olives, cheeses and breads: the Levantine and Turkish basics we stock at our Sugar Land store.",
    datePublished: "2026-10-03",
    readMinutes: 6,
    image: "blogMediterranean",
    tags: ["Mediterranean", "Guides"],
    body: `> A Mediterranean pantry runs on about fifteen staples: extra virgin olive oil, tahini, chickpeas, bulgur, lentils, za'atar, sumac, Aleppo pepper, baharat, pomegranate molasses, lemons, garlic, olives, a brined white cheese and flatbread. With those you can make hummus, tabbouleh, fattoush, mujadara, shakshuka and a dozen marinades without a special trip.

## Oil, acid and the jar everyone forgets

**Olive oil.** Keep two. A robust extra virgin for finishing and dressings, and a milder one for cooking. Lebanese, Turkish, Palestinian and Greek oils all pass through our Sugar Land store; the tins are better value than the bottles if you use it daily.

**Lemons and pomegranate molasses.** Lemons do the everyday work. Pomegranate molasses gives fattoush, muhammara and roasted eggplant their depth. One bottle lasts months in the fridge.

**Tahini.** The jar that separates a good hummus from a great one. Buy a brand whose tahini pours rather than one that has set hard; Lebanese and Palestinian tahinis are generally smoother than Greek ones. Stir it well, and keep it in the cupboard, not the fridge.

## Grains and pulses

- **Chickpeas.** Dried for hummus if you have time (soak overnight with a pinch of baking soda), canned for weeknights. We stock both.
- **Bulgur.** Fine for tabbouleh and kibbeh, coarse for pilaf. They are not interchangeable.
- **Lentils.** Brown or green for mujadara, red for shorbat adas.
- **Freekeh and couscous** if you cook North African or Levantine dishes often.
- **Rice.** Egyptian short grain or calrose for stuffed vegetables; basmati for everything else.

## The spice shelf

**Za'atar** is a blend of wild thyme, sumac and sesame; it belongs on bread with oil, on eggs and on roast chicken. **Sumac** alone gives a sour, almost lemony note to salads and onions. **Aleppo pepper** is the mild, fruity chili flake. **Baharat** and **Lebanese seven-spice** are the warm blends for meat, kibbeh and rice. Add **cumin**, **dried mint** and **cinnamon** and you are covered.

Store blends in a dark cupboard. Za'atar in particular loses its scent in sunlight.

## Dairy, olives and pickles

A brined white cheese (Nabulsi, Akkawi or a Bulgarian feta) for breakfast and for pastries. Labneh, or thick yogurt to make your own. A tub of green and a tub of black olives, cracked or whole, and a jar of makdous or pickled turnips for the table. Halloumi for grilling.

## Breads and frozen

Pita, markook (saj) and Turkish bread are stocked fresh on delivery days and frozen the rest of the week. The freezer holds filo, kataifi, spinach fatayer, kibbeh, falafel mix and ready falafel. Frozen molokhia and okra are the quiet workhorses of a Levantine weeknight.

## Three things to cook first

**Hummus.** Blend a can of drained chickpeas with three tablespoons of tahini, the juice of a lemon, a clove of garlic, a pinch of cumin, salt, and iced water a spoon at a time until it is smooth and pale. Finish with olive oil and sumac.

**Mujadara.** Simmer a cup of brown lentils until almost tender, add a cup of rinsed rice and enough water to cover by an inch, cook until the rice is done. Fry two sliced onions in olive oil until deeply brown and crisp, and pile them on top. Serve with yogurt and a cucumber salad.

**Shakshuka.** Soften an onion and a pepper in olive oil, add garlic, cumin, a teaspoon of Aleppo pepper and a can of crushed tomatoes. Simmer fifteen minutes, make wells, crack in eggs, cover until the whites set. Eat with pita straight from the pan.

Each of those uses only items from the list above and takes under forty minutes, which is the whole point of keeping the pantry stocked.

## A Saturday shopping list

If you are stocking from scratch, this is the basket that gets you through a week of real cooking:

- 1 tin olive oil, 1 jar tahini, 1 bottle pomegranate molasses
- 2 cans chickpeas, 1 bag dried chickpeas, 1 bag red lentils, 1 bag fine bulgur
- Za'atar, sumac, Aleppo pepper, baharat
- Lemons, garlic, parsley, mint, cucumbers, tomatoes
- A block of white cheese, a tub of labneh, a tub of olives
- Fresh pita and a bag of frozen falafel

Our Sugar Land store on Synott Rd carries the deepest Mediterranean range; Rosenberg stocks the essentials and can order the rest. See what is on the [rice and pantry aisle](/products/rice-pantry) and the [spice aisle](/products/spices-masalas).`,
  },
  {
    slug: "eid-and-ramadan-shopping-guide",
    title: "Eid and Ramadan Shopping Guide for Fort Bend Families",
    h1: "Eid and Ramadan shopping guide",
    description:
      "What to buy before Ramadan, what sells out first, when to order meat for Eid, and a week-by-week plan for families in Rosenberg and Sugar Land.",
    datePublished: "2026-10-03",
    readMinutes: 7,
    image: "blogEid",
    tags: ["Ramadan", "Eid", "Guides"],
    body: `> Shop for Ramadan in two trips: a pantry trip a week before the month starts (dates, chickpeas, besan, rice, oil, Rooh Afza, frozen samosas and parathas) and a weekly fresh trip (produce, meat, yogurt, bread). For Eid, place meat orders at least three days ahead and buy sweets the day before. Dates, besan and frozen samosas are the three items that sell out first every year.

## The week before Ramadan

This is the trip where you stock what will not spoil. Our aisles are fullest at this point, before the rush.

**Dates.** Medjool for iftar, Deglet Noor or Ajwa if you prefer, plus a box of stuffed dates for guests. Buy enough for the month; good dates keep.

**Frying staples.** Besan (chickpea flour) for pakoras, a large bottle of oil, rice flour for crisp batter, chaat masala and tamarind for chutney. Frozen samosas, spring rolls and parathas for the nights nobody has time to fold.

**Drinks.** Rooh Afza, Jam-e-Shirin, lemons for shikanji, and the fruit you will blend. Milk and vermicelli for sheer khurma are better bought later.

**Rice and daal.** A 20 lb basmati sack and your regular daals. Haleem and nihari masalas if you cook them in the month.

## What sells out first

Every year the same four shelves empty by the first weekend: Medjool dates, besan, frozen samosas, and Rooh Afza. If you see them, take them. We restock during the month but deliveries are stretched across every store in the Houston area.

## The weekly fresh trip

Plan one trip a week for produce, meat, yogurt and bread. Mint, coriander, onions, potatoes and green chilies go first in the produce section. Yogurt for dahi bhalla and raita. Fresh naan and pita on delivery days.

At the butcher counter, Ramadan is the busiest month of the year. Order a day ahead by phone if you need a specific cut or a large quantity, and come at opening if you want the first choice of the day's goat.

## Shopping for Eid al-Fitr

**Three days out:** order meat, especially if you want a leg of lamb, a whole goat or a large quantity of boneless chicken for a big biryani. Use the [pre-order form](/contact) or call the store.

**Two days out:** sheer khurma ingredients. Fine vermicelli (seviyan), whole milk, dates, pistachios, almonds, green cardamom, and a tin of condensed milk if your family's recipe uses it. Fresh ghee.

**The day before:** sweets and bread. Mithai boxes, baklava trays, fresh mithai where available, and extra naan. Henna cones and small gift boxes are at the front of the store.

## Shopping for Eid al-Adha

Meat is the whole event. If you are arranging Qurbani through the store, ask early in Dhul Hijjah; capacity is limited. If you are receiving your share, you will want freezer bags, a sharp knife, spice for the first-day karahi and plenty of onions, ginger and garlic.

The store is at its busiest in the three days before Eid. Mornings are calmer than evenings.

## Iftar table staples for guests

If you host during the month, keep a guest shelf separate from the family pantry so it is not raided by day ten. A sealed box of premium dates, a large tin of mixed nuts, two bottles of Rooh Afza, a bag of fine seviyan and a packet of pistachios cover most of a last-minute invitation. Add a box of frozen samosas and a jar of tamarind chutney and you can put a respectable spread together in twenty minutes after Maghrib.

For a larger iftar, order fruit by the case. Watermelon, cantaloupe, and whichever mangoes are in season are sold by the box at both stores during Ramadan and are cheaper that way. Call ahead for a case so it is set aside before the evening rush.

## A simple month plan

- **Week before:** pantry trip. Dates, besan, oil, frozen snacks, drinks, rice.
- **Each week:** produce, meat, yogurt, bread. Order meat a day ahead.
- **Last week:** Eid meat order, sheer khurma ingredients, gift boxes.
- **Day before Eid:** sweets, bread, last produce.

Ramadan and Eid hours are posted on the [locations page](/locations) and in the WhatsApp groups as soon as they are set. If you are not in the group yet, [join here](/whatsapp); specials and restock notices go there first.`,
  },
  {
    slug: "halal-meat-cuts-guide",
    title: "Halal Meat Cuts Guide: Goat, Lamb, Beef and Chicken",
    h1: "Halal meat cuts, and what each is best for",
    description:
      "A butcher's guide to goat, lamb, beef and chicken cuts: which to buy for karahi, biryani, nihari, kebabs and roasts, and how to ask at the counter.",
    datePublished: "2026-10-03",
    readMinutes: 8,
    image: "blogCuts",
    tags: ["Meat", "Guides"],
    body: `> For curry and karahi, ask for bone-in goat or lamb from the shoulder and ribs in 1 to 1.5 inch pieces. For biryani, a mix of bone-in leg and shoulder. For nihari, beef shank with marrow bones. For kebabs, lean mince from the leg, ground twice. For roasting, a whole leg of lamb. For everyday chicken, a whole bird skinned and cut into eight to twelve pieces. Our counter cuts all of these to order.

## Goat (bakra)

Goat is the heart of the counter and the most-asked-for meat in both stores. Lean, slightly sweet, and best cooked slowly with bone.

- **Curry cut (mixed, bone-in).** Shoulder, ribs and neck cut small. The standard for salan, karahi and korma. Ask for "small cut" for karahi and "medium" for biryani.
- **Leg (raan).** Meatier, less bone. Bone-in pieces for biryani; whole for a roast raan.
- **Chops (champ).** Rib or loin chops for the grill or for a dry masala fry.
- **Shank (nalli).** Marrow-rich. The best part of a paya or a slow goat nihari.
- **Paya (trotters).** For paya curry. Ask for them cleaned and split.
- **Mince (keema).** Ground to order from shoulder.

A whole goat is roughly 25 to 35 lb dressed. If you are buying whole for a wedding or Qurbani share, tell us how you want it portioned and we will bag it by cut.

## Lamb

Richer and fattier than goat. Where goat suits long braises, lamb shines on the grill and in roasts.

- **Shoulder.** Bone-in cubes for curry and biryani; boneless for kebabs.
- **Leg.** Whole for roasting; sliced for steaks; cubed for tikka.
- **Chops and rack.** Grilling. Ask for a frenched rack for a dinner centerpiece.
- **Neck.** Underrated. Cheap, flavorful, perfect for a slow salan.
- **Ribs (breast).** For a sticky grilled rib or a rich stew.

## Beef

- **Shank (bong) and nihari bones.** The only honest base for nihari and paya-style stews. Ask for the shank cut across the bone so the marrow cooks into the gravy.
- **Chuck and shoulder.** Cubes for beef karahi, kofta mince, and haleem.
- **Boneless leg.** Lean mince for seekh kebab and chapli kebab; thin slices for bihari kebab.
- **Short ribs.** For slow-cooked dishes and Korean-style grilling.
- **Oxtail, liver, kidney, brain, tongue.** Available; ask a day ahead for brain and tongue.

## Chicken (murgh)

Whole birds are the best value and the most flexible. Tell the butcher how you want it: skin on or off, eight pieces for curry, twelve for biryani, or boneless for tikka.

- **Whole, skinned, curry cut.** The weekly default for most families.
- **Boneless breast and thigh.** Thigh for tikka and karahi; it stays juicy. Breast for kebab mince.
- **Drumsticks and wings.** For the grill and for kids.
- **Mince.** Ground from thigh for the best seekh kebabs.
- **Liver and gizzard.** For kaleji.

## Dish by dish

- **Karahi:** small bone-in goat, or boneless chicken thigh.
- **Biryani:** medium bone-in goat or lamb (leg and shoulder mix), or chicken in twelve pieces.
- **Nihari:** beef shank with marrow bones; goat shank for a lighter version.
- **Haleem:** boneless beef chuck or boneless goat shoulder.
- **Seekh kebab:** lean beef or chicken mince, ground twice, with a little fat left in.
- **Chapli kebab:** coarse beef mince with more fat.
- **Roast:** whole leg of lamb or a goat raan.
- **Paya:** goat trotters, cleaned and split.

## Storing meat at home

Fresh meat keeps two to three days in the coldest part of the fridge, in the butcher paper, on a plate so nothing drips. If you will not cook it by then, portion it into meal-sized bags, press the air out, label with the cut and date, and freeze. Goat and lamb hold well for six months frozen; mince for three. Thaw in the fridge overnight rather than on the counter, and never refreeze meat that has fully thawed. If you are buying for the month, tell the counter and we will bag it by dish so it goes straight into the freezer.

## How to ask at the counter

Say the dish, the number of people, and whether you want bone. "Goat for biryani, eight people, bone-in" is all we need. If you want it ground, sliced thin, skinned or frenched, say so, and allow a few minutes during busy hours. Orders can be placed ahead using the [pre-order form](/contact) and picked up at either store.

Everything above is zabiha halal, hand slaughtered, and is explained in detail on our [halal page](/halal).`,
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
