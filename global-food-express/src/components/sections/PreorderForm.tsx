"use client";
import { useId, useState } from "react";
import { STORES } from "@/config/locations";
import { track } from "@/lib/analytics";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Pre-order / request-a-cut form. Honeypot + render timestamp + server-side zod.
 * When email is not configured the API returns 503 and the form points to the phone.
 */
export default function PreorderForm({ kind = "preorder", defaultStore }: { kind?: "preorder" | "contact"; defaultStore?: string }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");
  const [t] = useState(() => Date.now());
  const isPre = kind === "preorder";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/preorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, t, kind }) });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("sent");
        track(isPre ? "preorder_submit" : "form_submit", { store: String(data.store) });
        form.reset();
      } else {
        setStatus("error");
        setMsg(json.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please call the store.");
    }
  };

  const field = "w-full rounded-[var(--radius-sm)] border border-line-strong bg-base-2/60 px-4 py-3 text-cream placeholder:text-cream-3 focus-visible:border-saffron focus-visible:outline-none";
  const label = "mb-1.5 block text-sm font-medium text-cream-2";

  if (status === "sent") {
    return (
      <div className="surface-elevated rounded-[var(--radius)] border border-line p-8" role="status">
        <p className="font-display text-[length:var(--step-2)]">Got it.</p>
        <p className="mt-2 text-cream-2">{isPre ? "We will call to confirm your cut and pickup time." : "We will get back to you shortly."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>Name</label>
          <input id={`${id}-name`} name="name" required minLength={2} maxLength={80} autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-phone`} className={label}>Phone</label>
          <input id={`${id}-phone`} name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={field} />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-email`} className={label}>Email <span className="text-cream-3">(optional)</span></label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-store`} className={label}>Store</label>
          <select id={`${id}-store`} name="store" defaultValue={defaultStore ?? STORES[0].id} className={field}>
            {STORES.map((s) => (
              <option key={s.id} value={s.id}>{s.shortName}</option>
            ))}
          </select>
        </div>
      </div>
      {isPre && (
        <div>
          <label htmlFor={`${id}-pickup`} className={label}>Pickup day and time</label>
          <input id={`${id}-pickup`} name="pickup" placeholder="e.g. Friday after 5 pm" maxLength={40} className={field} />
        </div>
      )}
      <div>
        <label htmlFor={`${id}-order`} className={label}>{isPre ? "What do you need?" : "Message"}</label>
        <textarea id={`${id}-order`} name="order" required minLength={5} maxLength={1500} rows={5} placeholder={isPre ? "e.g. 5 lb goat curry cut, bone-in. 2 whole chickens, skinned and quartered." : ""} className={field} />
      </div>
      {/* honeypot: hidden from people, filled by bots */}
      <div className="absolute -left-[9999px] top-0" aria-hidden="true">
        <label>Company <input name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-[var(--radius-sm)] border border-chili/40 bg-chili/10 px-4 py-3 text-sm text-cream">
          {msg} <a className="link-underline font-semibold" href={`tel:${STORES[0].phoneE164}`}>{STORES[0].phone}</a>
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : isPre ? "Send pre-order" : "Send message"}
        </button>
        <p className="text-xs text-cream-3">No payment online. We confirm by phone.</p>
      </div>
    </form>
  );
}
