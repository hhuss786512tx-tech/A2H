import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/config/images";
import { SITE } from "@/config/site";
import PageHeader from "@/components/sections/PageHeader";
import Reveal from "@/components/motion/Reveal";
import { pageMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/components/ui/Icons";

export const metadata: Metadata = pageMetadata({
  title: "About Global Food Express | Halal Grocer in Fort Bend TX",
  description:
    "Global Food Express is an Indo-Pak and Mediterranean grocery with two stores in Fort Bend County, Texas, built around one rule: 100% zabiha halal.",
  path: "/about",
});

export default function AboutPage() {
  const img = IMAGES.team;
  return (
    <>
      <PageHeader
        eyebrow="About"
        crumbs={[{ name: "About", href: "/about" }]}
        lines={["A grocery built", <span key="r">around one <em className="accent">rule.</em></span>]}
        intro="Everything in the store is halal. Not the meat case alone, not most of the shelves: the whole building. That is the rule the stores were built on and it has not changed."
      />
      <Reveal className="container grid gap-12 pb-24 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="clip-reveal img-reveal" data-cursor="view">
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} priority sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
        </div>
        <div className="prose">
          <p className="fade-up">
            Global Food Express started {SITE.foundingYear ? `in ${SITE.foundingYear} ` : ""}as a neighborhood grocery for families who were driving across Houston for a halal butcher and a proper spice aisle. The first store in Rosenberg sat where Fort Bend County was growing fastest and where the nearest zabiha counter was a long way up US-59. The Sugar Land store on Synott Rd followed, in a corridor where South Asian, Arab and Turkish households shop side by side.
          </p>
          <p className="fade-up">
            The idea has stayed simple. Stock what people actually cook: the desi vegetables the chains skip, the full Shan and National wall, aged basmati in family sizes, the Levantine pantry from olive oil to za&rsquo;atar. Cut meat the way the dish needs it. Know regulars by their order.
          </p>
          <h2 className="fade-up">What we will not do</h2>
          <ul className="fade-up">
            <li>Sell meat that is not zabiha halal, at any price.</li>
            <li>Bring a non-halal product into the building.</li>
            <li>Sell you an aged basmati that is not aged, or a spice that has lost its smell.</li>
          </ul>
          <h2 className="fade-up">Two stores, one counter standard</h2>
          <p className="fade-up">
            Rosenberg is known for the masala wall and the Saturday goat. Sugar Land is known for the Mediterranean range and the deepest freezer aisle. Both counters follow the same halal standard, buy from the same suppliers and will tell you where the meat came from if you ask.
          </p>
          <div className="fade-up mt-8 flex flex-wrap gap-3">
            <Link href="/halal" className="btn btn-primary">Our halal standard <ArrowIcon width={18} height={18} /></Link>
            <Link href="/locations" className="btn btn-ghost">Visit a store</Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
