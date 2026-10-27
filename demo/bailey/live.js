// "Call Sam": the one part of this demo that is not sample data. Sam, the AI
// receptionist, answers a real phone line as Bailey's Garage Door Service
// (inbound only; the speed-to-lead callback runs on the tree demo).
// LINE is the Vapi free-pool number provisioned 2026-10-27
// (receptionist-crm: scripts/provision-speed-to-lead-demo.ts --demo garage).
(function () {
  "use strict";

  const LINE = "+16823708137";
  const BOOK = "/book-a-call";
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
    .book-btn { font: 600 12.5px/1 Geist, system-ui, sans-serif; display: inline-flex; align-items: center; height: 28px; padding: 0 12px; border-radius: 999px; background: #c9702f; color: #fff; text-decoration: none; transition: transform .15s cubic-bezier(.2,.9,.3,1.2), background .12s ease; }
    .book-btn:hover { background: #b2622a; }
    .book-btn:active { transform: scale(.96); }
    .book-btn:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    .live-book { display: inline-flex; align-items: center; justify-content: center; height: 40px; border-radius: 10px; background: #c9702f; color: #fff; font: 600 14px/1 Geist, system-ui, sans-serif; text-decoration: none; transition: transform .2s cubic-bezier(.2,.9,.3,1.2), background .15s ease; }
    .live-book:hover { background: #b2622a; }
    .live-book:active { transform: scale(.98); }
    .live-book:focus-visible { outline: 2px solid #c9702f; outline-offset: 2px; }
    @media (max-width: 640px) { .demobar .book-btn { display: none; } }
    @media (prefers-color-scheme: dark) {
      .live-modal { box-shadow: 0 30px 80px -30px rgba(0,0,0,.8); }
    }
  `;
  document.head.appendChild(style);

  const bar = document.querySelector(".demobar-right");
  if (!bar) return;
  const book = document.createElement("a");
  book.className = "book-btn";
  book.href = BOOK;
  book.textContent = "Book a 15-min call";
  bar.insertBefore(book, bar.firstChild);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "live-btn";
  btn.innerHTML = '<span class="dot" aria-hidden="true"></span>Call the AI receptionist';
  bar.insertBefore(btn, bar.firstChild);

  let scrim, modal;

  function build() {
    scrim = document.createElement("div");
    scrim.className = "live-scrim";
    modal = document.createElement("div");
    modal.className = "live-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "live-title");
    const num = LINE ? pretty(LINE) : null;
    modal.innerHTML = `
      <div class="live-head">
        <div>
          <h2 id="live-title">Call your AI receptionist</h2>
          <p>This part is real. Sam answers as Bailey's Garage Door Service, figures out what's wrong with the door, books the visit, and the call shows up in a CRM like this one.</p>
        </div>
        <button type="button" class="live-x" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </div>
      <div class="live-body">
        <div class="live-opt">
          <h3>Call the line yourself</h3>
          ${num ? `<a class="live-num" href="tel:${esc(LINE)}">${esc(num)}</a><p>Pretend you're a customer. Try "my spring broke and my car's stuck inside" and see if Sam gets you booked.</p>` : `<p>The phone line is being set up. Check back shortly, or book a call and we'll show it to you live.</p>`}
        </div>
        <div class="live-opt">
          <h3>Like what you see?</h3>
          <p>Book 15 minutes and we'll set it up with your real prices, hours and service area.</p>
          <a class="live-book" href="${BOOK}" style="margin-top:10px;display:flex">Book a 15-min call</a>
        </div>
        <p class="live-foot">Prices and hours Sam quotes are sample numbers for this demo. Sam says it's an AI if asked.</p>
      </div>`;
    document.body.append(scrim, modal);
    scrim.addEventListener("click", close);
    modal.querySelector(".live-x").addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("on")) close(); });
  }

  function open() {
    if (!modal) build();
    scrim.style.display = "block";
    modal.style.display = "block";
    requestAnimationFrame(() => { scrim.classList.add("on"); modal.classList.add("on"); });
    setTimeout(() => modal.querySelector(".live-x").focus(), 350);
  }

  function close() {
    scrim.classList.remove("on");
    modal.classList.remove("on");
    setTimeout(() => { scrim.style.display = "none"; modal.style.display = "none"; btn.focus(); }, 300);
  }

  btn.addEventListener("click", open);
  if (new URLSearchParams(location.search).has("live")) open();
})();
