"use client";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type GfeEvent } from "@/lib/analytics";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  event: GfeEvent;
  store?: string;
  children: ReactNode;
}

/** External/action link that fires a GA4 event. */
export default function TrackedLink({ event, store, children, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, store ? { store } : {});
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
