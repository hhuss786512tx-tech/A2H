// Single-company version of the Mateo picker: exposes the Bailey's data as
// window.DEMO for app.js and writes the branding into the page.
(function () {
  "use strict";

  const D = window.NICHES.garage;
  window.DEMO = D;
  window.DEMO_NICHE = "garage";

  const c = D.client;
  document.title = `${c.name} · Demo`;
  const icon = document.querySelector('link[rel="icon"]');
  if (icon) icon.href = "data:image/svg+xml," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2c5a5e"/><text x="16" y="21" font-family="sans-serif" font-size="13" font-weight="700" fill="white" text-anchor="middle">${c.short}</text></svg>`);

  const mark = document.querySelector(".brand-mark");
  const strong = document.querySelector(".brand-text strong");
  const small = document.querySelector(".brand-text small");
  if (mark) mark.textContent = c.short;
  if (strong) strong.textContent = "Bailey's";
  if (small) small.textContent = "Garage Door Service";
})();
