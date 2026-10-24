(function () {
  "use strict";

  const D = window.DEMO;
  const NOW = Date.now();
  const HOUR = 3600e3;

  // ---------- state ----------
  // Future appointments are stored as day offset + hour so they always land in
  // business hours; transcripts reference them through a {day} placeholder.
  D.deals.forEach((d) => {
    const a = d.appointment;
    if (!a || a.day === undefined) return;
    const t = new Date(NOW);
    t.setDate(t.getDate() + a.day);
    t.setHours(a.hour, 0, 0, 0);
    a.at = (NOW - t) / HOUR;
    if (d.next && d.next.label === "Inspection") d.next.at = a.at;
    const day = a.day === 1 ? "tomorrow" : t.toLocaleDateString("en-US", { weekday: "long" });
    const fill = (x) => x.replace(/\{day\}/g, day);
    if (d.call) { d.call.summary = fill(d.call.summary); d.call.transcript = d.call.transcript.map(([w, x]) => [w, fill(x)]); }
  });
  const deals = D.deals.map((d) => ({ ...d }));
  const byId = Object.fromEntries(deals.map((d) => [d.id, d]));
  const tasks = [
    ...deals.filter((d) => d.task).map((d) => ({ id: "t-" + d.id, contact: d.id, title: d.task.title, due: d.task.due, auto: !!d.task.auto, done: false })),
    ...D.doneTasks.map((t, i) => ({ id: "td" + i, contact: t.contact, title: t.title, due: t.done, doneAt: t.done, auto: false, done: true })),
  ];
  let view = "pipeline";
  let filters = { q: "", source: "all", visitors: "all" };
  let activeChat = null;
  let openDeal = null;
  let lastFocus = null;

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => "$" + Math.round(n).toLocaleString("en-US");
  const initials = (n) => n.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const at = (h) => new Date(NOW - h * HOUR);
  const roundHour = (d) => { const x = new Date(d); if (x.getMinutes() >= 30) x.setHours(x.getHours() + 1); x.setMinutes(0, 0, 0); return x; };
  const dayDiff = (d) => {
    const a = new Date(d); a.setHours(0, 0, 0, 0);
    const b = new Date(NOW); b.setHours(0, 0, 0, 0);
    return Math.round((a - b) / 864e5);
  };
  const clock = (d) => d.toLocaleTimeString("en-US", { hour: "numeric", minute: d.getMinutes() ? "2-digit" : undefined });
  const shortDate = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  function ago(h) {
    if (h < 1) return Math.max(1, Math.round(h * 60)) + "m ago";
    if (h < 24) return Math.round(h) + "h ago";
    const days = Math.round(h / 24);
    if (days < 7) return days + "d ago";
    return shortDate(at(h));
  }
  // Future (h < 0) or past (h > 0) appointment-style time.
  // Keep follow-up times inside office hours (8 AM to 6 PM) whatever time it is now.
  function biz(d, ahead) {
    const x = new Date(d);
    const h = 9 + Math.min(3, Math.round(ahead));
    if (x.getHours() < 8) x.setHours(h, 0, 0, 0);
    else if (x.getHours() >= 18) { x.setDate(x.getDate() + 1); x.setHours(h, 0, 0, 0); }
    return x;
  }
  function when(h) {
    const d = h < 0 ? biz(roundHour(at(h)), -h) : roundHour(at(h));
    const dd = dayDiff(d);
    if (dd === 0) return "Today " + clock(d);
    if (dd === 1) return "Tomorrow " + clock(d);
    if (dd === -1) return "Yesterday " + clock(d);
    if (dd > 1 && dd < 7) return d.toLocaleDateString("en-US", { weekday: "short" }) + " " + clock(d);
    return shortDate(d);
  }
  function due(h) {
    if (h > 0) {
      const days = Math.floor(h / 24);
      return { text: days >= 1 ? days + "d overdue" : Math.max(1, Math.round(h)) + "h overdue", cls: "overdue" };
    }
    return { text: when(h), cls: -h <= 6 ? "soon" : "" };
  }
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("on");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.classList.remove("on"), 2600);
  }

  const I = {
    pipeline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="5" height="16" rx="1.5"/><rect x="10" y="4" width="5" height="11" rx="1.5"/><rect x="17" y="4" width="4" height="7" rx="1.5"/></svg>',
    contacts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.6.8 2.6 2.6 3 5.2"/></svg>',
    visitors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    chats: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9.5h8M8 12.5h5"/></svg>',
    tasks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="m8 12 3 3 5-6"/></svg>',
    reports: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4V5Z"/></svg>',
    form: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    meta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15c0-4 2-8 4.5-8 3.5 0 5.5 10 9 10 2 0 3.5-1.5 3.5-4.5 0-3.5-2-6.5-4-6.5-3 0-5 6-7.5 9.5C7 17.5 6 18 5 18c-1.3 0-2-1.2-2-3Z"/></svg>',
    referral: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6V3Z"/><path d="M14 3v5h5M9.5 13h6M9.5 17h4"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg>',
    stage: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4.5 4.5L19 7"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/></svg>',
    arrow: '<svg class="arrow" viewBox="0 0 22 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7h17M14 2l5 5-5 5"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z"/></svg>',
  };

  const SOURCE_ICON = { "Phone call": I.phone, "Website chat": I.chat, "Web form": I.form, "Meta lead ad": I.meta, Referral: I.referral };
  const STAGE_COLOR = { new: "#8a938f", contacted: "#5f7f8a", scheduled: "#a8681f", booked: "#2c5a5e", completed: "#36734a", lost: "#b8b3a6" };
  const stageLabel = (id) => D.stages.find((s) => s.id === id).label;

  function sourceChip(s) { return `<span class="chip outline">${SOURCE_ICON[s] || ""}${esc(s)}</span>`; }
  function stageChip(stage) {
    const cls = { booked: "brand", completed: "green", scheduled: "warm", lost: "strike" }[stage] || "";
    return `<span class="chip ${cls}">${stageLabel(stage)}</span>`;
  }
  function tempChip(t) { return t === "hot" ? '<span class="chip hot">Hot</span>' : ""; }
  function quoteChip(q) {
    if (!q) return "";
    const cls = { Accepted: "green", Sent: "brand", Draft: "outline" }[q.status] || "";
    return `<span class="chip ${cls}">${I.quote}Quote ${q.status.toLowerCase()}</span>`;
  }
  const quoteTotal = (q) => q.lines.reduce((s, [, n, p]) => s + n * p, 0);
  const openStages = ["new", "contacted", "scheduled", "booked"];
  const overdueCount = () => tasks.filter((t) => !t.done && t.due > 0).length;

  function matches(d) {
    const q = filters.q.trim().toLowerCase();
    if (filters.source !== "all" && d.source !== filters.source) return false;
    if (!q) return true;
    return [d.name, d.service, d.city, d.zip, d.phone, d.email].join(" ").toLowerCase().includes(q);
  }

  // ---------- nav ----------
  const VIEWS = [
    ["pipeline", "Pipeline", I.pipeline, () => deals.filter((d) => openStages.includes(d.stage)).length],
    ["contacts", "Contacts", I.contacts, () => deals.length],
    ["visitors", "Website visitors", I.visitors, () => deals.filter((d) => d.visit).length + D.anonymous.length],
    ["chats", "Chats", I.chats, () => deals.filter((d) => d.chat).length + D.extraChats.length],
    ["tasks", "Tasks", I.tasks, () => tasks.filter((t) => !t.done).length],
    ["reports", "Reports", I.reports, () => ""],
  ];
  function renderNav() {
    $("#nav").innerHTML = VIEWS.map(([id, label, ico, count]) => {
      const n = count();
      const alert = id === "tasks" && overdueCount() > 0;
      return `<button class="nav-btn" data-view="${id}" ${view === id ? 'aria-current="page"' : ""}>${ico}<span>${label}</span><span class="count${alert ? " alert" : ""}">${alert ? overdueCount() + " late" : n}</span></button>`;
    }).join("");
    const cur = $("#nav [aria-current]");
    if (cur && window.innerWidth <= 860) cur.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  // ---------- views ----------
  function head(title, sub, tools = "") {
    return `<div class="page-head"><div><h1>${title}</h1>${sub ? `<p class="sub">${sub}</p>` : ""}</div>${tools ? `<div class="tools">${tools}</div>` : ""}</div>`;
  }
  function searchTools(withSource = true) {
    const sources = ["Phone call", "Website chat", "Web form", "Meta lead ad", "Referral"];
    return `<input class="input" type="search" id="q" placeholder="Search name, ZIP or job" value="${esc(filters.q)}" aria-label="Search">` +
      (withSource ? `<select class="select" id="src" aria-label="Lead source"><option value="all">All sources</option>${sources.map((s) => `<option ${filters.source === s ? "selected" : ""}>${s}</option>`).join("")}</select>` : "");
  }

  function vPipeline() {
    const open = deals.filter((d) => openStages.includes(d.stage));
    const openVal = open.reduce((s, d) => s + d.value, 0);
    const newWeek = deals.filter((d) => d.created <= 168).length;
    const upcoming = deals.filter((d) => d.appointment && d.appointment.at < 0 && ["scheduled", "booked"].includes(d.stage)).length;
    const od = overdueCount();
    const kpis = `<div class="kpis">
      <div class="kpi"><div class="label">Open pipeline</div><div class="value">${money(openVal)}</div><div class="hint">${open.length} active deals</div></div>
      <div class="kpi"><div class="label">New leads, last 7 days</div><div class="value">${newWeek}</div><div class="hint good">${deals.filter((d) => d.created <= 168 && (d.call || d.chat)).length} answered by AI first</div></div>
      <div class="kpi"><div class="label">Inspections on the calendar</div><div class="value">${upcoming}</div><div class="hint">Next: ${when(Math.max(...deals.filter((d) => d.appointment && d.appointment.at < 0).map((d) => d.appointment.at)))}</div></div>
      <div class="kpi"><div class="label">Overdue follow-ups</div><div class="value">${od}</div><div class="hint ${od ? "bad" : "good"}">${od ? "Shown in red on the board" : "All caught up"}</div></div>
    </div>`;
    const cols = D.stages.map((s) => {
      const list = deals.filter((d) => d.stage === s.id && matches(d));
      const sum = list.reduce((a, d) => a + d.value, 0);
      return `<section class="col" data-stage="${s.id}" aria-label="${s.label}">
        <div class="col-head"><span class="dot" style="background:${STAGE_COLOR[s.id]}"></span><h2>${s.label}</h2><span class="n">${list.length}</span><span class="sum">${sum ? money(sum) : ""}</span></div>
        <div class="cards">${list.map(card).join("")}</div>
      </section>`;
    }).join("");
    return head("Pipeline", `${money(openVal)} open across ${open.length} deals. Drag a card to move it.`, searchTools()) + kpis +
      `<div class="board-wrap"><div class="board" id="board">${cols}</div></div>`;
  }

  function card(d) {
    let foot = "";
    if (d.stage === "completed") foot = `<span class="muted">Won</span><span>${d.quote ? shortDate(at(d.quote.at)) : ""}</span>`;
    else if (d.stage === "lost") foot = `<span class="muted">${esc(d.lostReason || "Lost")}</span>`;
    else if (d.next) { const w = due(d.next.at); foot = `<span>${esc(d.next.label)}</span><span class="when ${w.cls}">${w.text}</span>`; }
    return `<button class="card" draggable="true" data-deal="${d.id}" aria-label="${esc(d.name)}, ${esc(d.service)}">
      <div class="card-top"><span class="card-name">${esc(d.name)}</span>${d.value ? `<span class="card-val">${money(d.value)}</span>` : '<span class="card-val none">Not quoted</span>'}</div>
      <div class="card-svc">${esc(d.service)}, ${d.zip}</div>
      <div class="card-meta">${sourceChip(d.source)}${tempChip(d.temp)}${quoteChip(d.quote)}</div>
      ${foot ? `<div class="card-foot">${foot}</div>` : ""}
    </button>`;
  }

  function lastTouch(d) {
    const times = [d.created];
    if (d.call) times.push(d.call.at);
    if (d.chat) times.push(d.chat.at);
    if (d.quote && d.quote.at) times.push(d.quote.at);
    return Math.min(...times);
  }

  function vContacts() {
    const list = deals.filter(matches).sort((a, b) => lastTouch(a) - lastTouch(b));
    const rows = list.map((d) => `<tr class="row-btn" tabindex="0" data-deal="${d.id}">
      <td><div class="person"><span class="avatar">${initials(d.name)}</span><div><strong>${esc(d.name)}</strong><div class="muted" style="font-size:12.5px">${esc(d.city)}, TX ${d.zip}</div></div></div></td>
      <td class="mono">${d.phone}</td>
      <td class="hide-sm">${d.email ? esc(d.email) : '<span class="muted">None</span>'}</td>
      <td class="hide-sm">${sourceChip(d.source)}</td>
      <td>${stageChip(d.stage)}</td>
      <td class="hide-sm muted">${ago(lastTouch(d))}</td>
    </tr>`).join("");
    return head("Contacts", `${deals.length} people. Every call, chat, form and quote for a person sits on one timeline.`, searchTools()) +
      `<div class="panel"><table class="table"><thead><tr><th>Name</th><th>Phone</th><th class="hide-sm">Email</th><th class="hide-sm">Source</th><th>Stage</th><th class="hide-sm">Last activity</th></tr></thead><tbody>${rows || `<tr><td colspan="6" class="muted">No contacts match that search.</td></tr>`}</tbody></table></div>`;
  }

  function refChip(r) {
    const cls = { Google: "brand", ChatGPT: "green", "Facebook ad": "plum", Direct: "outline" }[r] || "outline";
    return `<span class="chip ${cls}">${esc(r)}</span>`;
  }
  const dur = (s) => (s >= 60 ? Math.floor(s / 60) + "m " + String(s % 60).padStart(2, "0") + "s" : s + "s");
  function pathHTML(v, goal) {
    const src = v.referrer === "Direct" ? "Typed the URL" : v.query ? `Searched "${esc(v.query)}"` : v.referrer === "ChatGPT" ? "Linked from a ChatGPT answer" : v.referrer === "Facebook ad" ? "Clicked a Facebook ad" : v.referrer === "Google" ? "Organic search" : "From " + esc(v.referrer);
    const steps = [`<div class="step-box src"><span class="t">${esc(v.referrer)}</span><span class="d">${src}</span></div>`];
    v.pages.forEach(([p, t, s]) => steps.push(`<div class="step-box"><span class="t">${esc(t)}</span><span class="p">${esc(p)}</span><span class="d">${dur(s)} on page</span></div>`));
    steps.push(goal);
    return `<div class="path">${steps.map((s, i) => `<div class="step">${i ? I.arrow : ""}${s}</div>`).join("")}</div>`;
  }

  function vVisitors() {
    const leads = deals.filter((d) => d.visit).map((d) => ({ kind: "lead", d, v: d.visit, t: d.created }));
    const anon = D.anonymous.map((v) => ({ kind: "anon", v, t: v.at }));
    let items = [...leads.sort((a, b) => a.t - b.t), ...anon.sort((a, b) => a.t - b.t)];
    if (filters.visitors === "leads") items = items.filter((i) => i.kind === "lead");
    if (filters.visitors === "anon") items = items.filter((i) => i.kind === "anon");
    const seg = `<div class="seg" role="group" aria-label="Filter visitors">${[["all", "All"], ["leads", "Became leads"], ["anon", "Not yet"]].map(([k, l]) => `<button data-vf="${k}" aria-pressed="${filters.visitors === k}">${l}</button>`).join("")}</div>`;
    const cards = items.map((i) => {
      const v = i.v;
      if (i.kind === "lead") {
        const d = i.d;
        const goal = `<div class="step-box goal"><span class="t">${esc(v.converted)}</span><span class="d">${ago(d.created)}</span></div>`;
        return `<article class="journey">
          <div class="journey-head"><div class="who"><span class="avatar">${initials(d.name)}</span><div><button class="link-btn" data-deal="${d.id}">${esc(d.name)}</button><small>${esc(d.city)} · ${v.device} · ${v.pages.length} pages before reaching out</small></div></div>
          <div class="right">${refChip(v.referrer)}${stageChip(d.stage)}</div></div>
          ${pathHTML(v, goal)}
        </article>`;
      }
      const goal = `<div class="step-box lost"><span class="t">Left without contacting</span><span class="d">${ago(v.at)}</span></div>`;
      return `<article class="journey">
        <div class="journey-head"><div class="who"><span class="avatar" style="background:var(--sunken);color:var(--muted)">?</span><div><strong>Visitor from ${esc(v.city)}</strong><small>${v.device} · ${v.pages.length} page${v.pages.length > 1 ? "s" : ""}</small></div></div>
        <div class="right">${refChip(v.referrer)}</div></div>
        ${pathHTML(v, goal)}
      </article>`;
    }).join("");
    return head("Website visitors", "What each person read on the site before they called, chatted or filled in a form.", seg) +
      `<div class="callout">${I.eye}<div><strong>Know what they read before you call them back.</strong><p>When a visitor becomes a lead, their earlier page views are attached to the contact. Marcus read the financing page and the reviews before he chatted, so the callback can open with payment options instead of a cold pitch.</p></div></div>` +
      `<div class="journeys">${cards}</div>`;
  }

  function chatList() {
    return [
      ...deals.filter((d) => d.chat).map((d) => ({ id: d.id, name: d.name, city: d.city, deal: d, ...d.chat })),
      ...D.extraChats.map((c) => ({ ...c, deal: null })),
    ].sort((a, b) => a.at - b.at);
  }
  function bubbles(msgs) {
    let last = null;
    return msgs.map(([who, text]) => {
      const side = who === "visitor" || who === "caller";
      const label = who === "bot" ? "Website assistant" : who === "ai" ? "AI receptionist" : who === "caller" ? "Caller" : "Visitor";
      const lab = last !== who ? `<span class="who-label${side ? " r" : ""}">${label}</span>` : "";
      last = who;
      return lab + `<div class="bubble ${who}">${esc(text)}</div>`;
    }).join("");
  }
  function vChats() {
    const list = chatList();
    if (!activeChat || !list.find((c) => c.id === activeChat)) activeChat = (list.find((c) => c.id === "d2") || list[0]).id;
    const c = list.find((x) => x.id === activeChat);
    const items = list.map((x) => `<button class="list-item" data-chat="${x.id}" aria-current="${x.id === activeChat}">
      <span class="top"><strong>${esc(x.name)}</strong><span>${ago(x.at)}</span></span>
      <span class="snip">${esc(x.messages[0][1])}</span>
      <span>${x.deal ? stageChip(x.deal.stage) : '<span class="chip outline">No lead</span>'}</span>
    </button>`).join("");
    const end = c.deal
      ? `<span class="capture">${I.check}Lead captured: ${esc(c.deal.name)}, moved to ${stageLabel(c.deal.stage)}</span>`
      : `<span class="capture none">No contact details shared. Nothing added to the pipeline.</span>`;
    return head("Chats", "Conversations from the website assistant. When someone shares a name and number, a contact and deal are created for them.") +
      `<div class="split">
        <div class="panel list-panel"><div class="list">${items}</div></div>
        <div class="panel">
          <div class="panel-head"><div><h2>${esc(c.topic)}</h2><p>Started on <span class="mono">${esc(c.page)}</span> · ${esc(c.city)} · ${when(c.at)}</p></div>${c.deal ? `<button class="btn" data-deal="${c.deal.id}">${I.contacts}Open contact</button>` : ""}</div>
          <div class="thread">${bubbles(c.messages)}${end}</div>
        </div>
      </div>`;
  }

  function vTasks() {
    const open = tasks.filter((t) => !t.done);
    const groups = [
      ["Overdue", open.filter((t) => t.due > 0), "red"],
      ["Today", open.filter((t) => t.due <= 0 && dayDiff(at(t.due)) === 0), ""],
      ["Coming up", open.filter((t) => t.due <= 0 && dayDiff(at(t.due)) > 0), ""],
      ["Done", tasks.filter((t) => t.done), ""],
    ];
    const row = (t) => {
      const d = byId[t.contact];
      const w = t.done ? { text: "Done " + ago(t.doneAt), cls: "" } : due(t.due);
      return `<div class="task${t.done ? " done" : ""}">
        <button class="check" role="checkbox" aria-checked="${t.done}" data-task="${t.id}" aria-label="Mark done: ${esc(t.title)}">${I.check}</button>
        <div class="task-body"><div class="t">${esc(t.title)}</div><div class="s"><button class="link-btn" data-deal="${d.id}">${esc(d.name)}</button>${t.auto ? " · created automatically from the call" : ""}</div></div>
        <span class="when ${w.cls}">${w.text}</span>
      </div>`;
    };
    return head("Tasks", "Follow-ups for the office. Calls that need a human create their own task.") +
      `<div class="panel">${groups.filter(([, l]) => l.length).map(([h, l, c]) => `<div class="task-group"><h3 class="${c}">${h} · ${l.length}</h3>${l.map(row).join("")}</div>`).join("")}</div>`;
  }

  function bars(rows, fmt = (n) => n) {
    const max = Math.max(...rows.map((r) => r[1]), 1);
    return rows.map(([l, n, color], i) => `<div class="bar-row"><span>${esc(l)}</span><div class="track"><div class="fill" style="width:${(n / max) * 100}%;background:${color || "var(--brand)"};animation-delay:${i * 60}ms"></div></div><span class="num">${fmt(n)}</span></div>`).join("");
  }
  function donut(rows) {
    const total = rows.reduce((s, r) => s + r[1], 0);
    const R = 52, C = 2 * Math.PI * R;
    let off = 0;
    const segs = rows.map(([, n, color]) => {
      const len = (n / total) * C;
      const s = `<circle r="${R}" cx="70" cy="70" fill="none" stroke="${color}" stroke-width="20" stroke-dasharray="${len - 2} ${C - len + 2}" stroke-dashoffset="${-off}" transform="rotate(-90 70 70)"/>`;
      off += len;
      return s;
    }).join("");
    return `<div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
      <svg class="donut" viewBox="0 0 140 140" width="150" height="150" role="img" aria-label="Leads by source">${segs}<text x="70" y="66" text-anchor="middle" font-family="Bricolage Grotesque" font-size="26" font-weight="600" fill="#18211f">${total}</text><text x="70" y="86" text-anchor="middle" font-size="11" fill="#6a7470">leads</text></svg>
      <div class="legend" style="flex-direction:column;gap:8px;margin:0">${rows.map(([l, n, c]) => `<span><i style="background:${c}"></i>${esc(l)} <strong style="color:var(--ink)">${n}</strong></span>`).join("")}</div>
    </div>`;
  }
  function stageColumns() {
    const rows = D.stages.map((s) => [s.label, deals.filter((d) => d.stage === s.id).length, STAGE_COLOR[s.id]]);
    const max = Math.max(...rows.map((r) => r[1]), 1);
    const W = 360, H = 170, bw = 38, gap = (W - bw * rows.length) / (rows.length - 1);
    const cols = rows.map(([l, n, c], i) => {
      const h = (n / max) * 120, x = i * (bw + gap), y = 140 - h;
      return `<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="6" fill="${c}"/><text x="${x + bw / 2}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="600" fill="#18211f">${n}</text><text x="${x + bw / 2}" y="160" text-anchor="middle" font-size="10.5" fill="#6a7470">${l}</text>`;
    }).join("");
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Deals by stage"><line x1="0" x2="${W}" y1="140.5" y2="140.5" stroke="#e4e2da"/>${cols}</svg>`;
  }

  function vReports() {
    const won = deals.filter((d) => d.stage === "completed").reduce((s, d) => s + d.value, 0);
    const pct = Math.min(100, Math.round((won / D.client.goal) * 100));
    const calls = deals.filter((d) => d.call);
    const disp = {};
    calls.forEach((d) => (disp[d.call.disposition] = (disp[d.call.disposition] || 0) + 1));
    const srcColors = { "Phone call": "#2c5a5e", "Website chat": "#7a4a6e", "Web form": "#a8681f", "Meta lead ad": "#5f7f8a", Referral: "#36734a" };
    const bySrc = Object.keys(srcColors).map((s) => [s, deals.filter((d) => d.source === s).length, srcColors[s]]).filter((r) => r[1]);
    const quotes = deals.filter((d) => d.quote).map((d) => d.quote);
    const qs = ["Draft", "Sent", "Accepted"].map((s) => [s, quotes.filter((q) => q.status === s).reduce((a, q) => a + quoteTotal(q), 0), s === "Accepted" ? "#36734a" : s === "Sent" ? "#2c5a5e" : "#b8b3a6"]);
    const pages = {};
    deals.filter((d) => d.visit).forEach((d) => d.visit.pages.forEach(([p]) => (pages[p] = (pages[p] || 0) + 1)));
    const topPages = Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([p, n]) => [p, n, "#5f7f8a"]);
    const afterHours = calls.filter((d) => d.call.afterHours).length;
    return head("Reports", "This month so far.") +
      `<div class="kpis">
        <div class="kpi"><div class="label">Won this month</div><div class="value">${money(won)}</div><div class="goal-bar" aria-hidden="true"><div style="width:${pct}%"></div></div><div class="hint">${pct}% of the ${money(D.client.goal)} goal</div></div>
        <div class="kpi"><div class="label">Leads</div><div class="value">${deals.length}</div><div class="hint">${deals.filter((d) => d.source !== "Referral").length} from calls, the site and ads</div></div>
        <div class="kpi"><div class="label">Calls answered by AI</div><div class="value">${calls.length} of ${calls.length}</div><div class="hint good">${afterHours} after hours, none missed</div></div>
        <div class="kpi"><div class="label">Close rate</div><div class="value">${Math.round((deals.filter((d) => d.stage === "completed").length / deals.filter((d) => ["completed", "lost"].includes(d.stage)).length) * 100)}%</div><div class="hint">Won vs lost, decided deals</div></div>
      </div>
      <div class="grid-2">
        <div class="panel"><div class="panel-head"><h2>Leads by source</h2></div><div class="chart">${donut(bySrc)}</div></div>
        <div class="panel"><div class="panel-head"><h2>Deals by stage</h2></div><div class="chart">${stageColumns()}</div></div>
        <div class="panel"><div class="panel-head"><h2>Quotes by status</h2><p>Total value</p></div><div class="chart">${bars(qs, money)}</div></div>
        <div class="panel"><div class="panel-head"><h2>Calls by outcome</h2></div><div class="chart">${bars(Object.entries(disp).map(([k, n]) => [k, n, k === "Booked" ? "#2c5a5e" : "#8fa9a6"]))}</div></div>
        <div class="panel"><div class="panel-head"><h2>Pages read before reaching out</h2><p>Leads who viewed each page</p></div><div class="chart">${bars(topPages)}</div></div>
        <div class="panel"><div class="panel-head"><h2>Where web visitors came from</h2></div><div class="chart">${bars(["Google", "ChatGPT", "Facebook ad", "Direct"].map((r) => [r, [...deals.filter((d) => d.visit).map((d) => d.visit), ...D.anonymous].filter((v) => v.referrer === r).length, { Google: "#2c5a5e", ChatGPT: "#36734a", "Facebook ad": "#7a4a6e", Direct: "#b8b3a6" }[r]]))}</div></div>
      </div>`;
  }

  // ---------- drawer ----------
  function timeline(d) {
    const ev = [];
    if (d.visit) ev.push({ t: d.created + 0.05, cls: "", ico: I.eye, title: `Visited the site from ${d.visit.referrer}`, body: `${d.visit.pages.length} pages, ${dur(d.visit.pages.reduce((s, p) => s + p[2], 0))} total<div class="mini-path">${d.visit.pages.map((p) => `<span class="chip">${esc(p[0])}</span>`).join("")}</div>` });
    if (d.call) ev.push({ t: d.call.at, cls: "call", ico: I.phone, title: `Call answered by AI receptionist · ${dur(d.call.seconds)}`, body: `${esc(d.call.summary)}<div style="margin-top:6px"><span class="chip brand">${d.call.disposition}</span>${d.call.afterHours ? ' <span class="chip outline">After hours</span>' : ""}</div><details class="more"><summary>Read transcript</summary><div class="thread">${bubbles(d.call.transcript)}</div></details>` });
    if (d.chat) ev.push({ t: d.chat.at, cls: "chat", ico: I.chat, title: "Website chat", body: `Asked about ${esc(d.chat.topic.toLowerCase())} on <span class="mono">${esc(d.chat.page)}</span>. Lead captured by the assistant.<details class="more"><summary>Read chat</summary><div class="thread">${bubbles(d.chat.messages)}</div></details>` });
    if (d.form) ev.push({ t: d.created, cls: "form", ico: d.source === "Meta lead ad" ? I.meta : I.form, title: d.form.name, body: d.form.answers.map(([q, a]) => `<div><span class="muted">${esc(q)}:</span> ${esc(a)}</div>`).join("") });
    if (!d.call && !d.chat && !d.form) ev.push({ t: d.created, cls: "", ico: I.plus, title: `Added as a ${d.source.toLowerCase()}`, body: "" });
    if (d.notes) ev.push({ t: d.created - 1, cls: "", ico: I.note, title: "Note", body: esc(d.notes) });
    if (d.stage !== "new") ev.push({ t: Math.max(d.created - 24, 1), cls: "", ico: I.stage, title: `Stage changed to ${stageLabel(d.stage)}`, body: d.lostReason ? "Reason: " + esc(d.lostReason) : "" });
    if (d.quote) {
      const q = d.quote;
      ev.push({ t: q.at ?? d.created - 30, cls: "quote", ico: I.quote, title: `Quote ${q.number} · ${q.status.toLowerCase()}`, body: `<table class="qtable">${q.lines.map(([l, n, p]) => `<tr><td>${esc(l)}${n > 1 ? ` × ${n}` : ""}</td><td>${money(n * p)}</td></tr>`).join("")}<tr class="total"><td>Total</td><td>${money(quoteTotal(q))}</td></tr></table>` });
    }
    if (d.appointment && d.appointment.at > 0) ev.push({ t: d.appointment.at, cls: "", ico: I.cal, title: "Inspection completed", body: esc(d.appointment.notes) });
    tasks.filter((t) => t.contact === d.id && t.done).forEach((t) => ev.push({ t: t.doneAt, cls: "", ico: I.tasks, title: "Task done", body: esc(t.title) }));
    ev.sort((a, b) => a.t - b.t);
    return `<ol class="timeline">${ev.map((e) => `<li class="tl"><span class="tl-ico ${e.cls}">${e.ico}</span><div><div class="tl-head"><strong>${e.title}</strong><span>${ago(e.t)}</span></div>${e.body ? `<div class="tl-body">${e.body}</div>` : ""}</div></li>`).join("")}</ol>`;
  }

  function drawerHTML(d) {
    const openTask = tasks.find((t) => t.contact === d.id && !t.done);
    const appt = d.appointment && d.appointment.at < 0 ? d.appointment : null;
    return `<div class="dr-head">
      <div class="dr-row"><span class="avatar lg">${initials(d.name)}</span><div style="min-width:0"><h2 id="drawer-title">${esc(d.name)}</h2><p class="svc">${esc(d.service)}</p></div>
      <button class="close" data-close aria-label="Close">${I.x}</button></div>
      <dl class="facts">
        <div><dt>Phone</dt><dd class="mono">${d.phone}</dd></div>
        <div><dt>Email</dt><dd>${d.email ? esc(d.email) : '<span class="muted">None</span>'}</dd></div>
        <div><dt>Location</dt><dd>${esc(d.city)}, TX ${d.zip}</dd></div>
        <div><dt>Source</dt><dd>${esc(d.source)}</dd></div>
        <div><dt>Deal value</dt><dd>${d.value ? money(d.value) : "Not quoted yet"}</dd></div>
        <div><dt>Urgency</dt><dd>${esc(d.urgency)} ${tempChip(d.temp)}</dd></div>
      </dl>
      <div class="dr-actions">
        <label class="sr" for="stage-sel" style="font-size:12.5px;color:var(--muted)">Stage</label>
        <select class="select" id="stage-sel" data-deal="${d.id}">${D.stages.map((s) => `<option value="${s.id}" ${s.id === d.stage ? "selected" : ""}>${s.label}</option>`).join("")}</select>
        <button class="btn" data-demo="Calling from the portal is off in the demo.">${I.phone}Call</button>
        <button class="btn" data-demo="Texting is off in the demo.">${I.chat}Text</button>
      </div>
    </div>
    <div class="dr-body">
      ${d.draft && d.stage !== "completed" && d.stage !== "lost" ? `<div class="sect"><h3>Suggested reply</h3><div class="box draft"><span class="chip brand">${I.spark}Drafted by AI from this timeline</span><p>${esc(d.draft)}</p><div class="dr-actions" style="margin:0"><button class="btn primary" data-demo="In the live portal this sends the text. Off in the demo.">${I.send}Send text</button><button class="btn" data-demo="Edit is off in the demo.">${I.note}Edit</button></div></div></div>` : ""}
      ${appt || openTask ? `<div class="sect"><h3>Next up</h3><div class="box" style="display:flex;flex-direction:column;gap:10px">
        ${appt ? `<div style="display:flex;gap:10px;align-items:flex-start"><span class="tl-ico call">${I.cal}</span><div><strong>Inspection ${when(appt.at)}</strong><div class="muted">${appt.status} · ${esc(appt.notes)}</div></div></div>` : ""}
        ${openTask ? (() => { const w = due(openTask.due); return `<div style="display:flex;gap:10px;align-items:flex-start"><span class="tl-ico">${I.tasks}</span><div><strong>${esc(openTask.title)}</strong><div class="${w.cls === "overdue" ? "" : "muted"}" style="${w.cls === "overdue" ? "color:var(--red);font-weight:600" : ""}">${w.text}</div></div></div>`; })() : ""}
      </div></div>` : ""}
      <div class="sect"><h3>Timeline</h3><div class="box">${timeline(d)}</div></div>
    </div>`;
  }

  function openDrawer(id) {
    const d = byId[id];
    if (!d) return;
    openDeal = id;
    lastFocus = document.activeElement;
    const dr = $("#drawer");
    dr.innerHTML = drawerHTML(d);
    dr.scrollTop = 0;
    const scrim = $("#scrim");
    scrim.hidden = false;
    dr.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => { scrim.classList.add("on"); dr.classList.add("on"); });
    setTimeout(() => $(".close", dr).focus({ preventScroll: true }), 50);
    document.body.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!openDeal) return;
    openDeal = null;
    const dr = $("#drawer"), scrim = $("#scrim");
    dr.classList.remove("on");
    scrim.classList.remove("on");
    dr.setAttribute("aria-hidden", "true");
    setTimeout(() => { if (!openDeal) scrim.hidden = true; }, 250);
    document.body.style.overflow = "";
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function moveDeal(id, stage) {
    const d = byId[id];
    if (!d || d.stage === stage) return;
    d.stage = stage;
    if (stage === "completed" && !d.quote) d.quote = { number: "Q-0099", status: "Accepted", at: 0.01, lines: [[d.service, 1, d.value || 1200]] };
    if (stage === "lost" && !d.lostReason) d.lostReason = "Marked lost in the demo";
    render();
    const el = document.querySelector(`.card[data-deal="${id}"]`);
    if (el) el.classList.add("flash");
    toast(`${d.name} moved to ${stageLabel(stage)}. Demo only, resets on reload.`);
  }

  // ---------- render ----------
  const RENDER = { pipeline: vPipeline, contacts: vContacts, visitors: vVisitors, chats: vChats, tasks: vTasks, reports: vReports };
  function render(enter) {
    renderNav();
    const m = $("#main");
    m.innerHTML = `<div class="${enter ? "view-enter" : ""}">${RENDER[view]()}</div>`;
    bindView();
  }
  function go(v) {
    if (!RENDER[v]) v = "pipeline";
    view = v;
    if (location.hash.slice(1) !== v) history.replaceState(null, "", "#" + v);
    render(true);
    window.scrollTo(0, 0);
  }

  function bindView() {
    const q = $("#q");
    if (q) q.addEventListener("input", () => {
      filters.q = q.value;
      const pos = q.selectionStart;
      render();
      const nq = $("#q"); nq.focus(); nq.setSelectionRange(pos, pos);
    });
    const src = $("#src");
    if (src) src.addEventListener("change", () => { filters.source = src.value; render(); });

    const board = $("#board");
    if (board) {
      let dragId = null;
      board.addEventListener("dragstart", (e) => {
        const c = e.target.closest(".card"); if (!c) return;
        dragId = c.dataset.deal; c.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", dragId);
      });
      board.addEventListener("dragend", (e) => { const c = e.target.closest(".card"); if (c) c.classList.remove("dragging"); board.querySelectorAll(".col.drop").forEach((x) => x.classList.remove("drop")); });
      board.addEventListener("dragover", (e) => {
        const col = e.target.closest(".col"); if (!col || !dragId) return;
        e.preventDefault();
        board.querySelectorAll(".col.drop").forEach((x) => x !== col && x.classList.remove("drop"));
        col.classList.add("drop");
      });
      board.addEventListener("dragleave", (e) => { const col = e.target.closest(".col"); if (col && !col.contains(e.relatedTarget)) col.classList.remove("drop"); });
      board.addEventListener("drop", (e) => {
        const col = e.target.closest(".col"); if (!col) return;
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain") || dragId; dragId = null;
        moveDeal(id, col.dataset.stage);
      });
    }
  }

  document.addEventListener("click", (e) => {
    const t = e.target;
    const nav = t.closest("[data-view]");
    if (nav) return go(nav.dataset.view);
    if (t.closest("[data-close]") || t.id === "scrim") return closeDrawer();
    const demo = t.closest("[data-demo]");
    if (demo) return toast(demo.dataset.demo);
    const chk = t.closest("[data-task]");
    if (chk) {
      const task = tasks.find((x) => x.id === chk.dataset.task);
      task.done = !task.done; task.doneAt = 0.01;
      render();
      return toast(task.done ? "Task marked done. Demo only, resets on reload." : "Task reopened.");
    }
    const vf = t.closest("[data-vf]");
    if (vf) { filters.visitors = vf.dataset.vf; return render(); }
    const ch = t.closest("[data-chat]");
    if (ch) { activeChat = ch.dataset.chat; render(); const cur = document.querySelector(`[data-chat="${activeChat}"]`); if (cur) cur.focus({ preventScroll: true }); return; }
    const deal = t.closest("[data-deal]");
    if (deal && !deal.matches("select")) return openDrawer(deal.dataset.deal);
  });
  document.addEventListener("change", (e) => {
    if (e.target.id === "stage-sel") {
      const id = e.target.dataset.deal;
      moveDeal(id, e.target.value);
      $("#drawer").innerHTML = drawerHTML(byId[id]);
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDrawer();
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("tr.row-btn")) { e.preventDefault(); openDrawer(e.target.dataset.deal); }
    if (e.key === "Tab" && openDeal) {
      const f = [...$("#drawer").querySelectorAll("button, select, summary, [tabindex]")].filter((x) => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  window.addEventListener("hashchange", () => go(location.hash.slice(1)));

  go(location.hash.slice(1) || "pipeline");

  // Small surface for the step-by-step guide (tour.js).
  window.DEMO_API = { go, openDrawer, closeDrawer, view: () => view };
})();
