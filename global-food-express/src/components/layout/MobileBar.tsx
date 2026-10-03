"use client";
import { useEffect, useState } from "react";
import { STORES, directionsUrl, whatsappUrl, type Store } from "@/config/locations";
import { PhoneIcon, PinIcon, ChatIcon, CloseIcon } from "@/components/ui/Icons";
import { track } from "@/lib/analytics";

type Action = "call" | "directions" | "whatsapp";

const hrefFor = (a: Action, s: Store) =>
  a === "call" ? `tel:${s.phoneE164}` : a === "directions" ? directionsUrl(s) : whatsappUrl(s);
const eventFor = (a: Action) => (a === "call" ? "phone_click" : a === "directions" ? "directions_click" : "whatsapp_click");

/**
 * Persistent bottom bar on small screens: Call, Directions, WhatsApp.
 * Remembers the store the visitor last viewed; otherwise asks which store.
 */
export default function MobileBar() {
  const [pending, setPending] = useState<Action | null>(null);
  const [preferred, setPreferred] = useState<Store | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        const id = localStorage.getItem("gfe_store");
        setPreferred(STORES.find((s) => s.id === id) ?? null);
      } catch {}
    };
    read();
    window.addEventListener("gfe:store", read);
    return () => window.removeEventListener("gfe:store", read);
  }, []);

  const go = (a: Action, s: Store) => {
    track(eventFor(a), { store: s.id, placement: "mobile_bar" });
    const href = hrefFor(a, s);
    if (a === "call") window.location.href = href;
    else window.open(href, "_blank", "noopener");
    setPending(null);
  };

  const onPress = (a: Action) => (preferred ? go(a, preferred) : setPending(a));

  const btn = "flex min-h-[3.25rem] flex-1 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors active:bg-cream/10";
  return (
    <>
      <div className="fixed inset-x-3 bottom-3 z-40 md:hidden" role="region" aria-label="Quick actions">
        <div className="glass flex overflow-hidden rounded-full">
          <button type="button" className={btn} onClick={() => onPress("call")}>
            <PhoneIcon width={18} height={18} /> Call
          </button>
          <button type="button" className={`${btn} border-x border-line`} onClick={() => onPress("directions")}>
            <PinIcon width={18} height={18} /> Directions
          </button>
          <button type="button" className={`${btn} text-pistachio`} onClick={() => onPress("whatsapp")}>
            <ChatIcon width={18} height={18} /> WhatsApp
          </button>
        </div>
      </div>
      {pending && (
        <div className="fixed inset-0 z-50 flex items-end bg-base/70 backdrop-blur-sm md:hidden" role="dialog" aria-modal="true" aria-labelledby="store-pick">
          <div className="surface-floating w-full rounded-t-3xl p-6 pb-8">
            <div className="flex items-center justify-between">
              <h2 id="store-pick" className="font-display text-[length:var(--step-2)]">Which store?</h2>
              <button type="button" className="icon-btn" aria-label="Close" onClick={() => setPending(null)}>
                <CloseIcon />
              </button>
            </div>
            <ul className="mt-5 grid gap-3">
              {STORES.map((s) => (
                <li key={s.id}>
                  <button type="button" className="flex w-full items-center justify-between rounded-2xl border border-line-strong p-4 text-left active:bg-cream/10" onClick={() => go(pending, s)}>
                    <span>
                      <span className="block font-semibold">{s.shortName}</span>
                      <span className="block text-sm text-cream-2">{s.address.street}, {s.address.city}</span>
                    </span>
                    <span className="text-sm text-saffron">{pending === "call" ? s.phone : pending === "directions" ? "Open map" : "Open chat"}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
