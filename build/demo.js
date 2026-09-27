// demo.html: "Hear it work". A real recorded call between the A2H AI
// receptionist and a test caller, cut into chapters with transcripts, the
// tool calls the AI made, and the CRM record it left behind.
//
// The audio and data are produced by receptionist-crm (scripts/record-demo-call.ts
// then scripts/cut-demo-chapters.py) and live in assets/demo/. This file only
// lays them out. The recording is ONE mp3; chapters seek within it.

const fs = require('fs');
const path = require('path');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clock = (sec) => `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

const CSS = `
.dm-player{background:#231c18;border:1px solid rgba(255,255,255,.06);border-radius:20px;padding:20px;box-shadow:0 30px 60px -30px rgba(0,0,0,.7)}
.dm-top{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.dm-play,.dm-part{appearance:none;border:0;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:600;color:#141110;background:#c9702f;transition:transform .15s cubic-bezier(.34,1.56,.64,1),background-color .2s}
.dm-play{width:60px;height:60px;border-radius:999px;flex:none}
.dm-play:hover,.dm-part:hover{background:#e2924f}
.dm-play:active,.dm-part:active{transform:scale(.95)}
.dm-play:focus-visible,.dm-part:focus-visible,.dm-ch summary:focus-visible{outline:2px solid #e2924f;outline-offset:3px}
.dm-play svg,.dm-part svg{width:22px;height:22px;fill:currentColor}
.dm-part svg{width:14px;height:14px}
.dm-part{padding:9px 16px;border-radius:999px;font-size:14px}
.dm-meta{flex:1;min-width:160px}
.dm-meta strong{display:block;color:#e9dfd2;font-size:17px;font-weight:600}
.dm-meta span{color:#a89a8c;font-size:14px}
.dm-time{font-variant-numeric:tabular-nums;color:#a89a8c;font-size:14px}
.dm-wave{position:relative;height:120px;margin-top:18px}
.dm-wave canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.dm-wave input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer}
.dm-wave:focus-within{outline:2px solid #e2924f;outline-offset:4px;border-radius:8px}
.dm-legend{display:flex;gap:22px;flex-wrap:wrap;margin-top:12px;font-size:13px;color:#a89a8c}
.dm-dot{display:inline-block;width:10px;height:10px;border-radius:999px;margin-right:8px;vertical-align:baseline}
.dm-dot.ai{background:#c9702f}.dm-dot.caller{background:#e9dfd2}
.dm-note{margin-top:18px;border-left:2px solid #c9702f;padding:2px 0 2px 16px;color:#a89a8c;font-size:14px;line-height:1.7}
.dm-note b{color:#e9dfd2;font-weight:600}
.dm-ch{background:#1b1613;border:1px solid rgba(255,255,255,.05);border-radius:18px;padding:22px;transition:border-color .25s,background-color .25s}
.dm-ch.dm-active{border-color:rgba(201,112,47,.55);background:#211a16}
.dm-ch-head{display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap}
.dm-num{flex:none;width:36px;height:36px;border-radius:999px;border:1px solid rgba(226,146,79,.5);color:#e2924f;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:14px}
.dm-ch h3{font-family:Fraunces,serif;font-size:22px;letter-spacing:-.02em;color:#e9dfd2;line-height:1.25}
.dm-range{font-size:13px;color:#a89a8c;font-variant-numeric:tabular-nums;margin-top:2px}
.dm-ch p.dm-sum{color:#a89a8c;line-height:1.7;margin:14px 0 0 52px;font-size:15px}
.dm-chips{display:flex;flex-direction:column;gap:8px;margin:14px 0 0 52px}
.dm-chip{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;font-size:13.5px;color:#a89a8c;background:#141110;border:1px solid rgba(255,255,255,.05);border-radius:10px;padding:8px 12px}
.dm-chip code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;color:#e2924f}
.dm-chip.info code{color:#7fb88a}
.dm-ch details{margin:14px 0 0 52px}
.dm-ch summary{cursor:pointer;color:#e2924f;font-size:14px;font-weight:600;list-style:none;display:inline-block}
.dm-ch summary::-webkit-details-marker{display:none}
.dm-ch summary::after{content:' +'}
.dm-ch details[open] summary::after{content:' \\2212'}
.dm-lines{margin-top:12px;display:flex;flex-direction:column;gap:10px}
.dm-line{display:grid;grid-template-columns:78px 1fr;gap:12px;font-size:15px;line-height:1.6;color:#e9dfd2}
.dm-line b{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;padding-top:3px;color:#e2924f}
.dm-line.caller b{color:#a89a8c}
.dm-line.caller{color:#cfc4b6}
@media (max-width:640px){
  .dm-ch p.dm-sum,.dm-chips,.dm-ch details{margin-left:0}
  .dm-line{grid-template-columns:1fr;gap:2px}
}
@media (prefers-reduced-motion:reduce){.dm-play,.dm-part,.dm-ch{transition:none}}
`;

const JS = `
(function () {
  var data = JSON.parse(document.getElementById('dm-data').textContent);
  var audio = document.getElementById('dm-audio');
  var playBtn = document.getElementById('dm-play');
  var seek = document.getElementById('dm-seek');
  var canvas = document.getElementById('dm-canvas');
  var curEl = document.getElementById('dm-cur');
  var durEl = document.getElementById('dm-dur');
  var nowEl = document.getElementById('dm-now');
  var ctx = canvas.getContext('2d');
  var chapters = data.chapters, stopAt = null, activePart = null, started = false;
  var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4.5" height="14" rx="1.2"/><rect x="13.5" y="5" width="4.5" height="14" rx="1.2"/></svg>';

  function clock(s) { s = Math.max(0, s || 0); return Math.floor(s / 60) + ':' + ('0' + Math.floor(s % 60)).slice(-2); }
  function dur() { return isFinite(audio.duration) && audio.duration > 0 ? audio.duration : data.duration; }
  function track(name, extra) { try { if (window.gtag) gtag('event', name, extra || {}); } catch (e) {} }

  function draw() {
    var dpr = window.devicePixelRatio || 1, w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var cols = Math.max(20, Math.floor(w / 4)), n = data.ai.length, mid = h / 2, played = audio.currentTime / dur();
    for (var i = 0; i < cols; i++) {
      var a = 0, c = 0, from = Math.floor(i * n / cols), to = Math.max(from + 1, Math.floor((i + 1) * n / cols));
      for (var j = from; j < to; j++) { if (data.ai[j] > a) a = data.ai[j]; if (data.caller[j] > c) c = data.caller[j]; }
      var x = i * (w / cols), bw = Math.max(1.5, w / cols - 1.5), on = (i + 0.5) / cols <= played;
      var ah = Math.max(1.5, (a / 99) * (mid - 3)), ch = Math.max(1.5, (c / 99) * (mid - 3));
      ctx.globalAlpha = on ? 1 : 0.38;
      ctx.fillStyle = '#c9702f'; ctx.fillRect(x, mid - ah, bw, ah);
      ctx.fillStyle = '#e9dfd2'; ctx.fillRect(x, mid, bw, ch);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(233,223,210,.18)';
    chapters.forEach(function (chp, k) { if (k) ctx.fillRect(Math.round((chp.start / dur()) * w), 0, 1, h); });
    ctx.fillStyle = '#e2924f'; ctx.fillRect(Math.round(played * w) - 1, 0, 2, h);
  }

  function activeIndex(t) { var idx = 0; chapters.forEach(function (c, i) { if (t >= c.start) idx = i; }); return idx; }

  function ui() {
    var t = audio.currentTime, playing = !audio.paused;
    curEl.textContent = clock(t); durEl.textContent = clock(dur());
    seek.value = Math.round((t / dur()) * 1000);
    seek.setAttribute('aria-valuetext', clock(t) + ' of ' + clock(dur()));
    var idx = activeIndex(t);
    nowEl.textContent = (started ? 'Chapter ' + (idx + 1) + ' of ' + chapters.length + ' · ' : 'Chapter 1 of ' + chapters.length + ' · ') + chapters[started ? idx : 0].title;
    playBtn.innerHTML = playing && stopAt === null ? ICON_PAUSE : ICON_PLAY;
    playBtn.setAttribute('aria-label', playing && stopAt === null ? 'Pause the call' : 'Play the full call');
    document.querySelectorAll('.dm-ch').forEach(function (el, i) {
      var on = started && i === idx;
      el.classList.toggle('dm-active', on);
      if (on) el.setAttribute('aria-current', 'true'); else el.removeAttribute('aria-current');
      var b = el.querySelector('.dm-part'), mine = playing && stopAt !== null && i === activePart;
      b.innerHTML = (mine ? ICON_PAUSE : ICON_PLAY) + '<span>' + (mine ? 'Pause' : 'Play this part') + '</span>';
    });
    draw();
  }

  function tick() { if (stopAt !== null && audio.currentTime >= stopAt) { audio.pause(); stopAt = null; activePart = null; } ui(); }

  playBtn.addEventListener('click', function () {
    if (!audio.paused && stopAt === null) { audio.pause(); return; }
    if (audio.ended || audio.currentTime >= dur() - 0.2) audio.currentTime = 0;
    stopAt = null; activePart = null; started = true;
    track('demo_play', { part: 'full' });
    audio.play();
  });
  document.querySelectorAll('.dm-ch').forEach(function (el, i) {
    el.querySelector('.dm-part').addEventListener('click', function () {
      var c = chapters[i];
      if (!audio.paused && stopAt !== null && activePart === i) { audio.pause(); return; }
      audio.currentTime = c.start; stopAt = c.start + c.duration - 0.05; activePart = i; started = true;
      track('demo_play', { part: c.id });
      audio.play();
    });
  });
  seek.addEventListener('input', function () { audio.currentTime = (seek.value / 1000) * dur(); stopAt = null; activePart = null; started = true; ui(); });

  ['timeupdate', 'play', 'pause', 'ended', 'loadedmetadata', 'seeked'].forEach(function (ev) { audio.addEventListener(ev, tick); });
  window.addEventListener('resize', draw);
  ui();
})();
`;

function chapterHtml(c, i) {
  const chips = c.behind.length
    ? `<div class="dm-chips" aria-label="What the system did">${c.behind
        .map((b) => `<div class="dm-chip ${b.kind === 'info' ? 'info' : 'tool'}"><code>${esc(b.label)}</code><span>${esc(b.text)}</span></div>`)
        .join('')}</div>`
    : '';
  const lines = c.lines
    .map((l) => `<div class="dm-line ${l.who}"><b>${l.who === 'ai' ? 'Riley' : 'Caller'}</b><span>${esc(l.text)}</span></div>`)
    .join('');
  return `<article class="dm-ch reveal" id="ch-${esc(c.id)}">
  <div class="dm-ch-head">
    <div class="dm-num" aria-hidden="true">${i + 1}</div>
    <div style="flex:1;min-width:200px">
      <h3>${esc(c.title)}</h3>
      <p class="dm-range">${clock(c.start)} to ${clock(c.start + c.duration)}</p>
    </div>
    <button type="button" class="dm-part" aria-label="Play chapter ${i + 1}: ${esc(c.title)}"></button>
  </div>
  <p class="dm-sum">${esc(c.summary)}</p>
  ${chips}
  <details><summary>Read the transcript</summary><div class="dm-lines">${lines}</div></details>
</article>`;
}

module.exports = function demoPage({ ORG, EMAIL }) {
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'assets', 'demo', 'riley-demo.json'), 'utf8'));
  const total = clock(data.duration);
  // "</" would end the inline script early; none appear in this data, but guard anyway.
  const inline = JSON.stringify(data).replace(/</g, '\\u003c');

  return {
    slug: 'demo.html',
    noPopup: true,
    title: 'Hear An AI Receptionist Book A Job — A Real Call | A2H',
    description: `Listen to a real ${total} call: our AI receptionist answers, quotes a price, checks the schedule, books the visit and logs it in the CRM. Read the transcript and see the record it created.`,
    jsonLd: [
      ORG,
      {
        '@context': 'https://schema.org',
        '@type': 'AudioObject',
        name: 'AI receptionist demo call: booking a mobile pet grooming visit',
        description: 'A recorded call between the A2H AI receptionist and an AI test caller. The business and caller are fictional.',
        contentUrl: 'https://a2h.info/assets/demo/riley-demo-call.mp3',
        encodingFormat: 'audio/mpeg',
        duration: `PT${Math.floor(data.duration / 60)}M${Math.floor(data.duration % 60)}S`,
      },
    ],
    body: [
      `<style>${CSS}</style>`,
      `<section class="relative glow-copper pt-36 pb-10 px-6 overflow-hidden">
  <div class="grain"></div>
  <div class="max-w-4xl mx-auto text-center relative">
    <p class="reveal text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-5">Hear It Work · A Real Call</p>
    <h1 class="reveal font-display text-[2.25rem] leading-[1.1] sm:text-5xl sm:leading-[1.05] tracking-[-0.03em] text-sand mb-5">Hear an AI receptionist book a job, <span class="italic text-copper-light">start to finish.</span></h1>
    <p class="reveal text-lg text-fog leading-[1.7] max-w-2xl mx-auto">${total} of real audio. Riley answers the phone for a mobile pet groomer, quotes a price, checks the schedule, books the visit and logs it in the CRM, all while the groomer is out in the van.</p>
  </div>
</section>`,
      `<section class="px-6 pb-16">
  <div class="max-w-4xl mx-auto reveal">
    <div class="dm-player">
      <div class="dm-top">
        <button type="button" id="dm-play" class="dm-play" aria-label="Play the full call"></button>
        <div class="dm-meta"><strong>The full call</strong><span id="dm-now" aria-live="polite">Chapter 1 of ${data.chapters.length} · ${esc(data.chapters[0].title)}</span></div>
        <p class="dm-time"><span id="dm-cur">0:00</span> / <span id="dm-dur">${total}</span></p>
      </div>
      <div class="dm-wave">
        <canvas id="dm-canvas" aria-hidden="true"></canvas>
        <input id="dm-seek" type="range" min="0" max="1000" value="0" aria-label="Seek within the call">
      </div>
      <div class="dm-legend"><span><i class="dm-dot ai"></i>Riley, the AI receptionist</span><span><i class="dm-dot caller"></i>Caller</span></div>
      <audio id="dm-audio" preload="metadata" src="assets/demo/riley-demo-call.mp3"></audio>
      <noscript><p class="dm-note">Audio needs JavaScript here. <a class="link-underline text-copper-light" href="assets/demo/riley-demo-call.mp3">Download the call (MP3)</a> or read the transcripts below.</p></noscript>
    </div>
    <p class="dm-note"><b>About this recording.</b> It is a real call between our receptionist and a test caller. The caller is another AI reading from a script we wrote, and Riley was never given that script. The business (Bluebonnet Mobile Grooming), the caller and the address are made up. The open times come from a sample schedule. Everything else, the voice, the answers and the booking, is the actual system. The audio is not edited beyond levelling the volume and cutting it into the chapters below.</p>
  </div>
</section>`,
      `<section class="px-6 pb-20">
  <div class="max-w-4xl mx-auto">
    <div class="reveal mb-8">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">Broken Down</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.03em] text-sand">What happens, <span class="italic text-copper-light">step by step.</span></h2>
      <p class="text-fog leading-[1.7] mt-3 max-w-2xl">Play any part on its own. The tags show what the system did behind the scenes at that moment.</p>
    </div>
    <div class="flex flex-col gap-4">
${data.chapters.map(chapterHtml).join('\n')}
    </div>
  </div>
</section>`,
      `<section class="px-6 pb-20">
  <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
    <div class="reveal">
      <p class="text-xs tracking-[0.2em] uppercase text-copper-light font-semibold mb-3">The Result</p>
      <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.03em] text-sand mb-4">The call is over. <span class="italic text-copper-light">The job is in your CRM.</span></h2>
      <p class="text-fog leading-[1.7] mb-5">Nobody typed anything in. This is the record the call created, seconds after Riley hung up.</p>
      <ul class="text-fog leading-[1.7] flex flex-col gap-3">
        <li><span class="text-sand font-semibold">The customer,</span> with the name and address they gave.</li>
        <li><span class="text-sand font-semibold">A booked job,</span> tagged hot and this week, with the groomer's notes attached: hates the dryer, matting behind the ears, nervous around men.</li>
        <li><span class="text-sand font-semibold">The appointment,</span> Monday at 10:00 AM, on the schedule.</li>
      </ul>
      <p class="text-xs text-fog mt-6">This is a demo record. The phone number shown is a sample; on a live phone call the caller's own number is filled in automatically.</p>
    </div>
    <div class="reveal rounded-2xl bg-elevated border border-white/5 shadow-elevated overflow-hidden">
      <img src="assets/demo/crm-booked-contact.webp" alt="The CRM record created by the call: contact Chris Walker with address, and a booked full groom for a goldendoodle named Bella with the groomer's notes" width="1000" height="1190" loading="lazy" decoding="async" class="block w-full h-auto">
    </div>
  </div>
</section>`,
      `<section class="px-6 pb-24">
  <div class="max-w-3xl mx-auto text-center reveal">
    <h2 class="font-display text-3xl sm:text-4xl tracking-[-0.03em] text-sand mb-4">Want this answering <span class="italic text-copper-light">your</span> phone?</h2>
    <p class="text-fog leading-[1.7] mb-8">This demo is set up for a mobile groomer. Yours gets your services, prices, hours and rules, and it hands off to you when a call needs a person.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="book-a-call.html" class="btn-primary shadow-btn bg-copper hover:bg-copper-light text-ink font-semibold px-7 py-3.5 rounded-full">Book A Free Setup Call</a>
      <a href="pricing.html" class="link-underline text-copper-light font-semibold px-7 py-3.5">See pricing</a>
    </div>
    <p class="text-xs text-fog mt-6">Prefer email? <a href="mailto:${EMAIL}" class="link-underline text-copper-light">${EMAIL}</a></p>
  </div>
</section>`,
      `<script type="application/json" id="dm-data">${inline}</script>`,
    ].join('\n\n'),
    extraScripts: `<script>${JS}</script>`,
  };
};
