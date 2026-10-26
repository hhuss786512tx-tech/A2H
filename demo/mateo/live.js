// "Try it live": the one part of this demo that is not sample data. The AI
// caller for the tree company runs on a real phone line. Two ways in:
//   1. call the line (inbound), or
//   2. leave a number and the AI calls back within a minute (outbound), which
//      is the speed-to-lead flow the whole demo is about.
// The number and readiness come from the CRM, so this file never hardcodes one.
(function () {
  "use strict";

  const API = "https://receptionist-crm-three.vercel.app/api/demo/speed-to-lead";
  // Shown while the CRM readiness check is unreachable (the inbound line works regardless).
  const FALLBACK_FROM = "+15168869066";
  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const pretty = (e164) => {
    const m = /^\+1(\d{3})(\d{3})(\d{4})$/.exec(e164 || "");
    return m ? `(${m[1]}) ${m[2]}-${m[3]}` : e164 || "";
  };

  const style = document.createElement("style");
  style.textContent = `
    .live-btn { font: 600 12.5px/1 Geist, system-ui, sans-serif; display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 12px; border-radius: 999px; border: 0; cursor: pointer; background: #fff; color: #18211f; transition: transform .15s cubic-bezier(.2,.9,.3,1.2), background .12s ease; }
    .live-btn:hover { background: #f2f1ec; }
    .live-btn:active { transform: scale(.96); }
    .live-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .live-btn .dot { width: 8px; height: 8px; border-radius: 50%; background: #36734a; box-shadow: 0 0 0 0 rgba(54,115,74,.5); animation: live-pulse 1.8s ease-out infinite; }
    @keyframes live-pulse { 0% { box-shadow: 0 0 0 0 rgba(54,115,74,.5); } 100% { box-shadow: 0 0 0 7px rgba(54,115,74,0); } }
    .live-scrim { position: fixed; inset: 0; z-index: 70; background: rgba(18,24,22,.38); opacity: 0; transition: opacity .25s ease; }
    .live-scrim.on { opacity: 1; }
    .live-modal { position: fixed; z-index: 71; left: 50%; top: 50%; width: min(520px, calc(100vw - 32px)); max-height: calc(100vh - 32px); overflow: auto; background: var(--bg, #f4f3ee); border-radius: 18px; box-shadow: 0 30px 80px -30px rgba(18,24,22,.5), 0 2px 0 rgba(255,255,255,.4) inset; transform: translate(-50%, -46%) scale(.97); opacity: 0; transition: transform .4s cubic-bezier(.2,.9,.3,1.1), opacity .25s ease; }
    .live-modal.on { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    .live-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 22px 24px 0; }
    .live-head h2 { font: 600 20px/1.2 "Bricolage Grotesque", system-ui, sans-serif; letter-spacing: -.02em; margin: 0; }
    .live-head p { margin: 6px 0 0; color: var(--muted, #6a7470); font-size: 13.5px; line-height: 1.5; }
    .live-x { flex: none; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--line-2, #d6d4ca); background: var(--surface, #fff); cursor: pointer; display: grid; place-items: center; transition: transform .15s ease; }
    .live-x:hover { transform: rotate(90deg); }
    .live-x svg { width: 14px; height: 14px; }
    .live-body { padding: 18px 24px 24px; display: grid; gap: 14px; }
    .live-opt { background: var(--surface, #fff); border: 1px solid var(--line, #e4e2da); border-radius: 14px; padding: 16px; box-shadow: 0 1px 2px rgba(18,24,22,.05); }
    .live-opt h3 { margin: 0 0 4px; font: 600 11.5px/1 Geist, system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase; color: var(--muted, #6a7470); }
    .live-num { font: 600 26px/1.15 "Bricolage Grotesque", system-ui, sans-serif; letter-spacing: -.02em; color: var(--brand, #2c5a5e); text-decoration: none; display: inline-block; margin-top: 4px; }
    .live-num:hover { text-decoration: underline; }
    .live-opt p { margin: 6px 0 0; font-size: 13px; color: var(--ink-2, #3a4542); line-height: 1.5; }
    .live-form { display: grid; gap: 10px; margin-top: 10px; }
    .live-form label { display: grid; gap: 4px; font-size: 12.5px; font-weight: 500; color: var(--ink-2, #3a4542); }
    .live-form input, .live-form select { height: 38px; padding: 0 12px; border: 1px solid var(--line-2, #d6d4ca); border-radius: 9px; background: var(--surface, #fff); font: 400 14px/1 Geist, system-ui, sans-serif; color: var(--ink, #18211f); width: 100%; }
    .live-form input:focus-visible, .live-form select:focus-visible { outline: 2px solid var(--brand, #2c5a5e); outline-offset: 1px; border-color: var(--brand, #2c5a5e); }
    .live-consent { display: flex; gap: 9px; align-items: flex-start; font-size: 12.5px; line-height: 1.45; color: var(--ink-2, #3a4542); }
    .live-consent input { width: 16px; height: 16px; margin-top: 2px; flex: none; accent-color: var(--brand, #2c5a5e); }
    .live-go { height: 40px; border: 0; border-radius: 10px; background: var(--brand, #2c5a5e); color: #fff; font: 600 14px/1 Geist, system-ui, sans-serif; cursor: pointer; transition: transform .2s cubic-bezier(.2,.9,.3,1.2), background .15s ease; }
    .live-go:hover { background: #244b4f; }
    .live-go:active { transform: scale(.98); }
    .live-go:disabled { opacity: .6; cursor: progress; }
    .live-go:focus-visible { outline: 2px solid var(--brand, #2c5a5e); outline-offset: 2px; }
    .live-msg { font-size: 13.5px; line-height: 1.5; padding: 10px 12px; border-radius: 10px; }
    .live-msg.ok { background: var(--green-soft, #e1efe4); color: var(--green, #36734a); }
    .live-msg.err { background: var(--red-soft, #f7e3df); color: var(--red, #b0392c); }
    .live-msg.wait { background: var(--amber-soft, #f6ead9); color: var(--amber, #a8681f); }
    .live-foot { font-size: 12px; color: var(--faint, #9aa29e); line-height: 1.5; margin: 0; }
    @media (prefers-color-scheme: dark) {
      .live-modal { box-shadow: 0 30px 80px -30px rgba(0,0,0,.8); }
    }
  `;
  document.head.appendChild(style);

  const bar = document.querySelector(".demobar-right");
  if (!bar) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "live-btn";
  btn.innerHTML = '<span class="dot" aria-hidden="true"></span>Try it live';
  bar.insertBefore(btn, bar.firstChild);

  const isTree = (window.DEMO_NICHE || "tree") === "tree";
  const trade = window.DEMO && window.DEMO.client ? window.DEMO.client.trade : "";

  let scrim, modal, state = { ready: false, from: null, loaded: false };

  function build() {
    scrim = document.createElement("div");
    scrim.className = "live-scrim";
    modal = document.createElement("div");
    modal.className = "live-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "live-title");
    document.body.append(scrim, modal);
    scrim.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("on")) close(); });
    render();
  }

  function render() {
    const num = state.from ? pretty(state.from) : null;
    const notTree = !isTree ? `<p class="live-foot">The live line plays <strong>Harbor Oak Tree Service</strong>. Same system, same CRM for ${esc(trade.toLowerCase() || "every trade")}; only the script changes.</p>` : "";
    modal.innerHTML = `
      <div class="live-head">
        <div>
          <h2 id="live-title">Talk to the AI caller</h2>
          <p>This part is real. Jordan answers for Harbor Oak Tree Service, qualifies the job, books the estimate, and the call lands in a CRM just like this one.</p>
        </div>
        <button type="button" class="live-x" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="live-body">
        <div class="live-opt">
          <h3>Get called back in under a minute</h3>
          <p>Fill in the estimate form the way a homeowner would. The AI calls you back within seconds and tries to book you.</p>
          <form class="live-form" id="live-form" novalidate>
            <label>Your name<input name="name" autocomplete="name" required maxlength="80" placeholder="Dana Whitfield"></label>
            <label>Mobile number (US)<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required placeholder="(631) 555-0123"></label>
            <label>What's going on
              <select name="service">
                <option>Dead oak leaning toward the house</option>
                <option>Storm damage, branches down</option>
                <option>Two trees to remove, two stories tall</option>
                <option>Stump grinding</option>
                <option>Trimming and pruning</option>
              </select>
            </label>
            <label class="live-consent"><input type="checkbox" name="consent" required><span>Call me at this number with an automated AI assistant for this one demo call. No marketing follow-ups. Standard rates may apply.</span></label>
            <button type="submit" class="live-go">Call me now</button>
            <div id="live-out" aria-live="polite"></div>
          </form>
        </div>
        <div class="live-opt">
          <h3>Or call the line yourself</h3>
          ${num ? `<a class="live-num" href="tel:${esc(state.from)}">${esc(num)}</a><p>Jordan picks up in under ten seconds, 24/7. Say you've got a tree problem and see how far it gets you.</p>` : `<p id="live-numwait">${state.loaded ? "The phone line is being set up. Check back shortly." : "Loading the number…"}</p>`}
        </div>
        ${notTree}
        <p class="live-foot">Jordan says it's an AI if asked. Every call writes a contact, a summary and (if booked) an appointment into the CRM.</p>
      </div>`;
    modal.querySelector(".live-x").addEventListener("click", close);
    modal.querySelector("#live-form").addEventListener("submit", submit);
  }

  async function load() {
    try {
      const r = await fetch(API, { method: "GET", mode: "cors" });
      const j = await r.json();
      state = { ready: !!j.ready, from: j.from || FALLBACK_FROM, loaded: true };
    } catch {
      state = { ready: false, from: FALLBACK_FROM, loaded: true };
    }
    if (modal) render();
  }

  function open() {
    if (!modal) build();
    if (!state.loaded) load();
    scrim.style.display = "block";
    modal.style.display = "block";
    requestAnimationFrame(() => { scrim.classList.add("on"); modal.classList.add("on"); });
    const first = modal.querySelector("input[name=name]");
    if (first) setTimeout(() => first.focus(), 350);
  }

  function close() {
    scrim.classList.remove("on");
    modal.classList.remove("on");
    setTimeout(() => { scrim.style.display = "none"; modal.style.display = "none"; btn.focus(); }, 300);
  }

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const out = form.querySelector("#live-out");
    const go = form.querySelector(".live-go");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    const consent = data.get("consent") === "on";
    const digits = phone.replace(/\D/g, "");
    if (!name) return say(out, "err", "Your name, so Jordan knows who to ask for.");
    if (!(digits.length === 10 || (digits.length === 11 && digits[0] === "1"))) return say(out, "err", "A 10-digit US mobile number, please.");
    if (!consent) return say(out, "err", "Tick the box so we're allowed to call you.");

    go.disabled = true;
    say(out, "wait", "Starting the call…");
    try {
      const r = await fetch(API, { method: "POST", mode: "cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, service, consent: true }) });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        say(out, "ok", `Ringing you now${j.from ? ` from ${pretty(j.from)}` : ""}. Pick up and talk to Jordan like a homeowner would.`);
        form.reset();
      } else if (j.error === "line_not_ready") {
        say(out, "err", j.from ? `The callback isn't switched on yet. Call ${pretty(j.from)} directly instead.` : "The callback isn't switched on yet. Check back shortly.");
      } else if (j.error === "cooldown") {
        say(out, "err", "That number was called a few minutes ago. Give it ten minutes, or call the line directly.");
      } else if (j.error === "busy") {
        say(out, "err", "The demo line has hit its hourly limit. Call the number below directly.");
      } else if (j.error === "us_phone_only") {
        say(out, "err", "US numbers only on the demo line.");
      } else {
        say(out, "err", "The call didn't start. Try the number below instead.");
      }
    } catch {
      say(out, "err", "Couldn't reach the CRM. Try the number below instead.");
    } finally {
      go.disabled = false;
    }
  }

  function say(el, kind, text) {
    el.innerHTML = `<div class="live-msg ${kind}">${esc(text)}</div>`;
  }

  btn.addEventListener("click", open);
  if (new URLSearchParams(location.search).has("live")) open();
})();
