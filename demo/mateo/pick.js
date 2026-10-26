// Picks which fictional company the demo shows (?niche=tree|pool|epoxy|junk|pest),
// exposes it as window.DEMO for app.js, and writes the branding into the page.
(function () {
  "use strict";

  const ORDER = [
    ["tree", "Tree removal"],
    ["pool", "Pool installation"],
    ["epoxy", "Epoxy flooring"],
    ["junk", "Junk removal"],
    ["pest", "Pest control"],
  ];
  const all = window.NICHES || {};
  const params = new URLSearchParams(location.search);
  const want = params.get("niche");
  const key = want && all[want] ? want : ORDER.find(([k]) => all[k])[0];
  const D = all[key];
  window.DEMO = D;
  window.DEMO_NICHE = key;

  const c = D.client;
  const [first, ...rest] = c.name.split(" ");
  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  document.title = `${c.name} · CRM demo`;
  const icon = document.querySelector('link[rel="icon"]');
  if (icon) icon.href = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2c5a5e"/><text x="16" y="21" font-family="sans-serif" font-size="13" font-weight="700" fill="white" text-anchor="middle">${c.short}</text></svg>`);

  const mark = document.querySelector(".brand-mark");
  const strong = document.querySelector(".brand-text strong");
  const small = document.querySelector(".brand-text small");
  if (mark) mark.textContent = c.short;
  if (strong) strong.textContent = first;
  if (small) small.textContent = rest.join(" ");

  const long = document.querySelector(".demobar .long");
  const short = document.querySelector(".demobar .short");
  if (long) long.textContent = `White-label demo built for Mateo. ${c.name} is a fictional ${c.trade.toLowerCase()} company and every customer here is sample data.`;
  if (short) short.textContent = "Demo for Mateo. Fictional company, sample data.";

  const sw = document.getElementById("niche-switch");
  if (sw) {
    sw.innerHTML = ORDER.filter(([k]) => all[k]).map(([k, label]) => {
      const q = new URLSearchParams(location.search);
      q.set("niche", k);
      const href = "?" + q.toString();
      return `<a class="niche${k === key ? " on" : ""}" href="${href}" ${k === key ? 'aria-current="page"' : ""}>${esc(label)}</a>`;
    }).join("");
  }
})();
