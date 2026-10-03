// Link crawl + console check + keyboard menu + form validation + reduced-motion state.
import { chromium } from "playwright";
const base = "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const seen = new Set(); const queue = ["/"]; const broken = [];
while (queue.length) {
  const p = queue.shift(); if (seen.has(p)) continue; seen.add(p);
  const res = await page.goto(base + p, { waitUntil: "domcontentloaded" });
  if (!res || res.status() >= 400) { broken.push([p, res && res.status()]); continue; }
  const links = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const h of links) { if (!h) continue; if (h.startsWith("/") && !h.startsWith("//")) { const clean = h.split("#")[0]; if (clean && !seen.has(clean)) queue.push(clean); } }
}
console.log("crawled", seen.size, "internal pages; broken:", JSON.stringify(broken));
// external hrefs sanity
await page.goto(base + "/locations/rosenberg-tx");
const ext = await page.$$eval("a[href^='http'],a[href^='tel'],a[href^='mailto']", (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
console.log("external/action hrefs:", ext.join("\n  "));
// keyboard: open menu, tab, escape
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.evaluate(() => sessionStorage.setItem("gfe_loaded", "1"));
await page.keyboard.press("Tab"); // skip link
const skip = await page.evaluate(() => document.activeElement?.textContent);
await page.click("button[aria-controls='site-menu']");
await page.waitForTimeout(900);
const menuOpen = await page.getAttribute("#site-menu", "data-open");
const focused = await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 20));
await page.keyboard.press("Escape");
await page.waitForTimeout(800);
const menuClosed = await page.getAttribute("#site-menu", "data-open");
console.log("skip link focus:", skip, "| menu open:", menuOpen, "focus:", focused, "| after Esc:", menuClosed);
// form: honeypot path and validation
await page.goto(base + "/contact");
const r1 = await page.evaluate(async () => (await fetch("/api/preorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "A", phone: "1", store: "x", order: "", t: Date.now() }) })).status);
const r2 = await page.evaluate(async () => (await fetch("/api/preorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Test Person", phone: "(832) 555-0100", store: "rosenberg", order: "5 lb goat curry cut", t: Date.now() - 10000 }) })).status);
const r3 = await page.evaluate(async () => (await fetch("/api/preorder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Bot", phone: "1234567", store: "rosenberg", order: "spam spam spam", company: "x", t: Date.now() - 10000 }) })).status);
console.log("api: invalid→", r1, "(expect 400) | valid, unconfigured→", r2, "(expect 503) | honeypot→", r3, "(expect 400 zod max(0) or 200 swallow)");
// reduced motion: headings visible without animation
const rm = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 390, height: 800 } });
const rp = await rm.newPage(); await rp.goto(base + "/halal", { waitUntil: "networkidle" });
const vis = await rp.evaluate(() => { const s = document.querySelector("h1 .mask-line > span"); const cs = getComputedStyle(s); return { transform: cs.transform, anim: cs.animationName, preloader: !!document.querySelector(".preloader") }; });
console.log("reduced motion h1:", JSON.stringify(vis));
// no-JS: headline visible
const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 800 } });
const np = await nojs.newPage(); await np.goto(base + "/");
const nv = await np.evaluate(() => getComputedStyle(document.querySelector("h1 .mask-line > span")).transform);
console.log("no-JS h1 transform:", nv);
// tap targets on mobile bar
const mob = await browser.newContext({ viewport: { width: 375, height: 812 }, hasTouch: true });
const mp = await mob.newPage(); await mp.goto(base + "/");
const sizes = await mp.$$eval("[aria-label='Quick actions'] button", (bs) => bs.map((b) => { const r = b.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; }));
console.log("mobile bar tap targets:", JSON.stringify(sizes));
await browser.close();
