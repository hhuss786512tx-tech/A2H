// Step-by-step guide for the CRM demo. Starts on its own the first time the
// demo is opened (or with ?tour in the URL) and can be restarted from the
// Guide buttons. Each step switches to a screen, spotlights one element and
// explains what it does. Relies on window.DEMO_API exposed by app.js.
(function () {
  "use strict";

  const API = window.DEMO_API;
  if (!API) return;
  const KEY = "a2h.crmdemo.tour.v1";
  const $ = (s, r = document) => r.querySelector(s);
  const mobile = () => window.innerWidth <= 860;

  const STEPS = [
    {
      kicker: "Welcome",
      title: "This is the client portal",
      body: "The CRM every A2H client logs into. Every phone call, website chat, form and ad lead lands here on its own, with the full conversation attached. This guide takes about two minutes and walks through each screen.",
      next: "Start the guide",
    },
    {
      view: "pipeline", target: "#nav", side: "right",
      kicker: "Navigation",
      title: "Six screens, one sidebar",
      body: "Pipeline, Contacts, Website visitors, Chats, Tasks and Reports. The number beside each one is a live count. When it turns red, something is overdue.",
    },
    {
      view: "pipeline", target: ".kpis",
      kicker: "Pipeline",
      title: "The four numbers that matter",
      body: "Open pipeline value, new leads in the last seven days, inspections already on the calendar, and overdue follow-ups. They update the moment a card moves.",
    },
    {
      view: "pipeline", target: "#board", maxH: 440, top: true,
      kicker: "Pipeline",
      title: "The board",
      body: "Each column is a stage: New, Contacted, Scheduled, Booked, Completed, plus Lost. Drag a card from one column to the next to move the deal. Every column shows its count and total value.",
    },
    {
      view: "pipeline", target: '.card[data-deal="d3"]',
      kicker: "Pipeline",
      title: "One card per lead",
      body: "Name and quote value, the job and ZIP, where the lead came from, a Hot badge for urgent ones, and the next follow-up with its due time. Click any card to open the whole story.",
    },
    {
      view: "pipeline", target: "#drawer", drawer: "d3", side: "left", delay: 450,
      kicker: "Contact timeline",
      title: "The full story in one place",
      body: "Priya called after a storm. The AI receptionist answered, flagged it urgent, created a callback task and drafted a text the office can send in one tap. Scroll the panel to read the call transcript.",
    },
    {
      view: "contacts", target: ".table", maxH: 360, top: true,
      kicker: "Contacts",
      title: "Everyone, in one list",
      body: "Phone, email, source, stage and last activity for every person. Search by name, ZIP or job type, or filter by where the lead came from. Click a row to open the same timeline.",
    },
    {
      view: "visitors", target: ".journey", top: true,
      kicker: "Website visitors",
      title: "What they read before reaching out",
      body: "Every page a visitor viewed before they called, chatted or filled in a form, attached to their contact. The callback can start where their research ended, instead of with a cold pitch.",
    },
    {
      view: "chats", target: ".split", maxH: 420, top: true,
      kicker: "Chats",
      title: "Every website conversation",
      body: "Transcripts from the website assistant. When a visitor shares a name and number, a contact and a deal are created on their own. The green line under a chat shows what was captured.",
    },
    {
      view: "tasks", target: ".panel", maxH: 380, top: true,
      kicker: "Tasks",
      title: "Follow-ups for the office",
      body: "Grouped into Overdue, Today and Coming up. Calls that need a human create their own task. Tick the box to mark one done and the counts update everywhere.",
    },
    {
      view: "ads", target: ".ads-table", maxH: 420, top: true,
      kicker: "Ads",
      title: "Ads judged by booked jobs",
      body: "Spend and leads come from Meta. Booked jobs and revenue come from the CRM, so every ad gets a cost per booked job and a verdict: Scale, Watch or Cut. Pause or resume an ad right here. When a Meta lead books, the CRM tells Meta, so the ads find more people who book.",
    },
    {
      view: "reports", target: ".kpis",
      kicker: "Reports",
      title: "Month to date",
      body: "Revenue won against the goal, leads by source, calls answered by AI, close rate, and which pages leads read before reaching out. The monthly report is built from this screen.",
    },
    {
      target: "#tour-start",
      kicker: "That is the whole system",
      title: "Now try it yourself",
      body: "Drag a card, tick a task, open any contact. Everything resets on reload, so nothing can break. Restart this guide any time from the Guide button up here.",
      next: "Start exploring",
    },
  ];

  // ---------- DOM ----------
  const root = document.createElement("div");
  root.id = "tour";
  root.hidden = true;
  root.innerHTML = `
    <div class="tour-back" aria-hidden="true"></div>
    <div class="tour-spot none" aria-hidden="true"></div>
    <div class="tour-card" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-body">
      <button type="button" class="tour-skip" data-tour="end" aria-label="Close the guide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      <p class="tour-kicker" id="tour-kicker"></p>
      <h2 id="tour-title"></h2>
      <p id="tour-body"></p>
      <div class="tour-bar" aria-hidden="true"><i></i></div>
      <div class="tour-foot">
        <span class="n" id="tour-n"></span>
        <button type="button" class="btn" data-tour="back" id="tour-back">Back</button>
        <button type="button" class="btn primary" data-tour="next" id="tour-next">Next</button>
      </div>
    </div>`;
  document.body.appendChild(root);
  const back = $(".tour-back", root), spot = $(".tour-spot", root), card = $(".tour-card", root);

  let i = -1, startView = null, timer = null, raf = null, on = false;

  // ---------- geometry ----------
  function targetRect(step) {
    const t = step.target && document.querySelector(step.target);
    if (!t) return null;
    const vw = window.innerWidth, vh = window.innerHeight;
    if (step.target === "#drawer") {
      // The drawer is fixed and slides in with a transform, so measure its
      // resting position instead of its animated one.
      if (mobile()) return { left: 0, top: vh * 0.08, width: vw, height: vh * 0.92 };
      const w = Math.min(540, vw);
      return { left: vw - w, top: 0, width: w, height: vh };
    }
    let r = t.getBoundingClientRect();
    const tall = step.top || r.height > vh - 160;
    if (tall) window.scrollTo({ top: window.scrollY + r.top - (mobile() ? 12 : 92), behavior: "auto" });
    else if (r.top < 80 || r.bottom > vh - 20) t.scrollIntoView({ block: "center", behavior: "auto" });
    r = t.getBoundingClientRect();
    const pad = 8;
    let left = Math.max(pad, r.left - pad), top = Math.max(pad, r.top - pad);
    let right = Math.min(vw - pad, r.right + pad), bottom = Math.min(vh - pad, r.bottom + pad);
    if (step.maxH) bottom = Math.min(bottom, top + step.maxH);
    return { left, top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
  }

  function place() {
    const step = STEPS[i];
    if (!step) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    const r = targetRect(step);
    card.classList.remove("sheet");
    if (!r) {
      spot.classList.add("none");
      const W = card.offsetWidth, H = card.offsetHeight;
      card.style.left = Math.round((vw - W) / 2) + "px";
      card.style.top = Math.round(Math.max(16, (vh - H) / 2)) + "px";
      return;
    }
    spot.classList.remove("none");
    spot.style.left = r.left + "px"; spot.style.top = r.top + "px";
    spot.style.width = r.width + "px"; spot.style.height = r.height + "px";

    if (mobile()) {
      card.style.left = ""; card.style.top = "";
      card.classList.add("sheet");
      if (step.target === "#drawer") card.classList.add("sheet-top");
      else card.classList.remove("sheet-top");
      return;
    }
    card.classList.remove("sheet-top");
    const W = card.offsetWidth, H = card.offsetHeight, m = 14, e = 12;
    const fits = {
      below: r.top + r.height + m + H <= vh - e,
      above: r.top - m - H >= e,
      right: r.left + r.width + m + W <= vw - e,
      left: r.left - m - W >= e,
    };
    const order = [step.side, "below", "above", "right", "left"].filter(Boolean);
    const pick = order.find((k) => fits[k]);
    const cx = Math.min(Math.max(r.left, e), vw - W - e);
    const cy = Math.min(Math.max(r.top, e), vh - H - e);
    let left, top;
    if (pick === "below") { left = cx; top = r.top + r.height + m; }
    else if (pick === "above") { left = cx; top = r.top - m - H; }
    else if (pick === "right") { left = r.left + r.width + m; top = cy; }
    else if (pick === "left") { left = r.left - m - W; top = cy; }
    else { left = (vw - W) / 2; top = vh - H - 16; }
    card.style.left = Math.round(left) + "px";
    card.style.top = Math.round(top) + "px";
  }

  function schedulePlace() {
    if (!on) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(place);
  }

  // ---------- steps ----------
  function show(n) {
    clearTimeout(timer);
    const prev = STEPS[i];
    if (prev && prev.drawer) API.closeDrawer();
    i = n;
    const step = STEPS[i];
    if (step.view && API.view() !== step.view) API.go(step.view);
    if (step.drawer) API.openDrawer(step.drawer);

    $("#tour-kicker").textContent = step.kicker || "";
    $("#tour-title").textContent = step.title;
    $("#tour-body").textContent = step.body;
    $("#tour-n").textContent = `${i + 1} of ${STEPS.length}`;
    $(".tour-bar i", card).style.width = ((i + 1) / STEPS.length) * 100 + "%";
    $("#tour-back").hidden = i === 0;
    $("#tour-next").textContent = step.next || "Next";
    card.classList.remove("in"); void card.offsetWidth; card.classList.add("in");

    const go = () => { place(); setTimeout(() => $("#tour-next").focus({ preventScroll: true }), 80); };
    if (step.delay) { spot.classList.add("none"); timer = setTimeout(go, step.delay); }
    else go();
    // The view enters with a short slide, so measure again once it settles.
    setTimeout(schedulePlace, 420);
  }

  function start() {
    if (on) return;
    on = true;
    startView = API.view();
    try { localStorage.setItem(KEY, String(Date.now())); } catch (_) {}
    root.hidden = false;
    document.body.classList.add("tour-on");
    requestAnimationFrame(() => root.classList.add("on"));
    show(0);
  }

  function end() {
    if (!on) return;
    clearTimeout(timer);
    const step = STEPS[i];
    if (step && step.drawer) API.closeDrawer();
    on = false;
    i = -1;
    root.classList.remove("on");
    document.body.classList.remove("tour-on");
    setTimeout(() => { if (!on) root.hidden = true; }, 250);
    if (startView && API.view() !== startView) API.go(startView);
    const btn = $("#tour-start");
    if (btn) btn.focus({ preventScroll: true });
  }

  function next() { if (i + 1 >= STEPS.length) end(); else show(i + 1); }
  function prev() { if (i > 0) show(i - 1); }

  // ---------- events ----------
  root.addEventListener("click", (e) => {
    const b = e.target.closest("[data-tour]");
    if (!b) return;
    const a = b.dataset.tour;
    if (a === "next") next(); else if (a === "back") prev(); else end();
  });
  back.addEventListener("click", next);
  document.addEventListener("click", (e) => { if (e.target.closest("[data-tour-start]")) start(); });
  document.addEventListener("keydown", (e) => {
    if (!on) return;
    if (e.key === "Escape") { e.stopPropagation(); return end(); }
    if (e.key === "ArrowRight") { e.preventDefault(); return next(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); return prev(); }
    if (e.key === "Tab") {
      const f = [...card.querySelectorAll("button")].filter((x) => !x.hidden);
      if (!card.contains(document.activeElement)) { e.preventDefault(); return f[f.length - 1].focus(); }
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  }, true);
  window.addEventListener("resize", schedulePlace);
  window.addEventListener("scroll", schedulePlace, { passive: true });

  // First visit, or ?tour in the URL: start on its own once the page has settled.
  let seen = false;
  try { seen = !!localStorage.getItem(KEY); } catch (_) {}
  const forced = /[?&]tour\b/.test(location.search);
  if (!seen || forced) setTimeout(start, 700);

  window.DEMO_TOUR = { start, end };
})();
