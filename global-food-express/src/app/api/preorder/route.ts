import { NextResponse } from "next/server";
import { z } from "zod";
import { STORES } from "@/config/locations";

export const runtime = "nodejs";

const Schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(25).regex(/^[0-9+()\-\s.]+$/),
  email: z.string().trim().email().max(120).optional().or(z.literal("")),
  store: z.enum(["rosenberg", "sugar-land"]),
  pickup: z.string().trim().max(40).optional().or(z.literal("")),
  order: z.string().trim().min(5).max(1500),
  kind: z.enum(["preorder", "contact"]).default("preorder"),
  // spam protection
  company: z.string().max(0).optional(), // honeypot: must stay empty
  t: z.coerce.number(), // timestamp the form was rendered
});

const RATE = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const hits = (RATE.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  RATE.set(ip, hits);
  return hits.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many requests. Please call the store." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 400 });
  }
  const d = parsed.data;
  // Bots fill the honeypot or submit within 3 seconds.
  if (d.company || Date.now() - d.t < 3000) return NextResponse.json({ ok: true });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PREORDER_TO_EMAIL; // TODO_CLIENT: store inbox
  const from = process.env.PREORDER_FROM_EMAIL ?? "Global Food Express <onboarding@resend.dev>";
  if (!apiKey || !to) {
    return NextResponse.json(
      { ok: false, error: "Online pre-orders are not switched on yet. Please call the store and we will have it ready." },
      { status: 503 },
    );
  }
  const store = STORES.find((s) => s.id === d.store)!;
  const subject = d.kind === "preorder" ? `Pre-order request: ${store.shortName} — ${d.name}` : `Website message: ${d.name}`;
  const text = [
    `Store: ${store.name}`,
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.email ? `Email: ${d.email}` : null,
    d.pickup ? `Pickup: ${d.pickup}` : null,
    "",
    d.order,
    "",
    `IP: ${ip}`,
  ]
    .filter((l) => l !== null)
    .join("\n");
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({ from, to: to.split(",").map((s) => s.trim()), subject, text, replyTo: d.email || undefined });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[preorder] send failed", e);
    return NextResponse.json({ ok: false, error: "We could not send that. Please call the store." }, { status: 502 });
  }
}
