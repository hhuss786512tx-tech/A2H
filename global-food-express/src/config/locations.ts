import { HOURS, type WeekHours } from "./hours";

export type StoreId = "rosenberg" | "sugar-land";

export interface Store {
  id: StoreId;
  slug: string; // route under /locations/
  name: string; // display name
  shortName: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string; // display
  phoneE164: string; // tel: link
  /** TODO_CLIENT: WhatsApp invite links behind the in-store QR codes. */
  whatsappInvite: string | null;
  /** Approximate coordinates from public map data. TODO_CLIENT: confirm pin on GBP. */
  geo: { lat: number; lng: number };
  googleMapsQuery: string;
  hours: WeekHours | null;
  neighborhoods: string[];
  landmarks: string[];
  knownFor: string[];
  parking: string;
}

/**
 * Street spelling: the business, Google's index and neighbouring businesses on
 * the same road (e.g. 503 Minonite Rd) all use "Minonite", which is the real
 * street name in Rosenberg. It is NOT a typo for "Mennonite". Keep "Minonite".
 */
export const STORES: Store[] = [
  {
    id: "rosenberg",
    slug: "rosenberg-tx",
    name: "Global Food Express Rosenberg",
    shortName: "Rosenberg",
    address: {
      street: "235 Minonite Rd",
      suite: "Ste 120",
      city: "Rosenberg",
      state: "TX",
      zip: "77469",
    },
    phone: "(832) 451-6217",
    phoneE164: "+18324516217",
    whatsappInvite: null, // TODO_CLIENT
    geo: { lat: 29.5578, lng: -95.7903 }, // TODO_CLIENT: verify against GBP pin
    googleMapsQuery: "Global Food Express, 235 Minonite Rd Ste 120, Rosenberg, TX 77469",
    hours: HOURS.rosenberg,
    neighborhoods: [
      "Rosenberg",
      "Richmond",
      "Greatwood",
      "Pecan Grove",
      "Brazos Town Center",
      "Bonbrook Plantation",
      "Kingdom Heights",
      "Needville",
      "Beasley",
    ],
    landmarks: [
      "Minonite Rd at US-59 / I-69",
      "Brazos Town Center",
      "Seabourne Creek Nature Park",
      "Fort Bend County Fairgrounds",
    ],
    knownFor: [
      "the biggest masala wall in Rosenberg",
      "fresh zabiha halal goat and chicken",
      "20 lb basmati sacks at pantry prices",
    ],
    parking: "Free surface lot directly in front of Suite 120 with accessible spaces.",
  },
  {
    id: "sugar-land",
    slug: "sugar-land-tx",
    name: "Global Food Express Sugar Land",
    shortName: "Sugar Land (Synott)",
    address: {
      street: "10560 Synott Rd",
      city: "Sugar Land",
      state: "TX",
      zip: "77498",
    },
    phone: "(281) 879-4261",
    phoneE164: "+12818794261",
    whatsappInvite: null, // TODO_CLIENT
    geo: { lat: 29.6563, lng: -95.6238 }, // TODO_CLIENT: verify against GBP pin
    googleMapsQuery: "Global Food Express, 10560 Synott Rd, Sugar Land, TX 77498",
    hours: HOURS["sugar-land"],
    neighborhoods: [
      "Sugar Land",
      "Mission Bend",
      "Alief",
      "Stafford",
      "Meadows Place",
      "Aliana",
      "Chelsea Harbour",
      "Westpark Tollway corridor",
      "Mission Bend / West Bellfort",
    ],
    landmarks: [
      "Synott Rd between W Bellfort Ave and Bissonnet St",
      "Westpark Tollway at Synott",
      "Mission Bend community",
      "Alief ISD schools",
    ],
    knownFor: [
      "Mediterranean pantry: olives, cheeses, tahini, Turkish and Levantine brands",
      "halal butcher counter with custom cuts",
      "ready-to-cook frozen parathas, samosas and kebabs",
    ],
    parking: "Shared plaza lot on Synott Rd with parking at the door.",
  },
];

export const getStore = (slug: string) => STORES.find((s) => s.slug === slug);

export const formatAddress = (s: Store, oneLine = true) => {
  const line1 = [s.address.street, s.address.suite].filter(Boolean).join(", ");
  const line2 = `${s.address.city}, ${s.address.state} ${s.address.zip}`;
  return oneLine ? `${line1}, ${line2}` : [line1, line2];
};

export const directionsUrl = (s: Store) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(s.googleMapsQuery)}`;

export const mapEmbedUrl = (s: Store) =>
  `https://www.google.com/maps?q=${encodeURIComponent(s.googleMapsQuery)}&z=15&output=embed`;

export const whatsappUrl = (s: Store) =>
  s.whatsappInvite ?? `https://wa.me/${s.phoneE164.replace("+", "")}`;
