/**
 * Full-page screenshots at 375 / 768 / 1024 / 1440 for a list of paths.
 *   node screenshot.mjs http://localhost:3000 [path ...]
 * Writes to ./screenshots/<width>-<path>.png and reports console errors + horizontal overflow.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const paths = process.argv.slice(3).length ? process.argv.slice(3) : ["/", "/products", "/products/halal-meat", "/halal", "/locations", "/locations/rosenberg-tx", "/weekly-specials", "/whatsapp", "/about", "/contact", "/blog", "/blog/what-zabiha-halal-means", "/404-test"];
const widths = [375, 768, 1024, 1440];
const out = path.resolve("screenshots");
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const problems = [];
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 812 : 900 }, deviceScaleFactor: 1, reducedMotion: process.env.RM ? "reduce" : "no-preference", hasTouch: w < 1024 });
  for (const p of paths) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.goto(base + p, { waitUntil: "networkidle" });
    try { await page.evaluate(() => sessionStorage.setItem("gfe_loaded", "1")); } catch {}
    await page.waitForTimeout(2200);
    // scroll through to trigger reveals, then back to top
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    const name = `${w}-${p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "_")}.png`;
    await page.screenshot({ path: path.join(out, name), fullPage: true });
    if (errors.length || overflow) problems.push({ w, p, errors, overflow });
    console.log(`${w}px ${p} ${overflow ? "OVERFLOW " : ""}${errors.length ? `${errors.length} console error(s)` : "ok"}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close();
if (problems.length) { console.log("\nProblems:\n" + JSON.stringify(problems, null, 2)); process.exitCode = 1; }
