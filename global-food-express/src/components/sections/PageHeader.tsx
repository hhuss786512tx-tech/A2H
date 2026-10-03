import Breadcrumbs, { type Crumb } from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/motion/Reveal";
import { Lines } from "@/components/motion/Lines";
import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  lines: ReactNode[];
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}

/** Inner-page header: breadcrumbs, eyebrow, masked H1, intro. */
export default function PageHeader({ eyebrow, lines, intro, crumbs, children }: Props) {
  return (
    <header className="glow-bg pt-[calc(var(--nav-h)+3rem)] pb-12 md:pb-16">
      <Reveal className="container">
        <Breadcrumbs items={crumbs} className="fade-up" />
        <p className="eyebrow mt-8 fade-up">{eyebrow}</p>
        <h1 className="mt-4 max-w-[16ch] text-[length:var(--step-5)]">
          <Lines lines={lines} />
        </h1>
        {intro && <div className="fade-up mt-6 max-w-[58ch] text-[length:var(--step-1)] leading-[1.5] text-cream-2">{intro}</div>}
        {children}
      </Reveal>
    </header>
  );
}
