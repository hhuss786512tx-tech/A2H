// A2H motion layer: word reveals, live hero window, hub sparks, sticky
// steps, card rail. Pairs with assets/motion.css. Every effect checks
// prefers-reduced-motion and leaves content readable if this never runs.
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var onView = function (el, cb, opts) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); cb(); } });
    }, opts || { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    io.observe(el);
  };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  // Word reveal. Splits text nodes into .w > span words, keeps inline
  // elements (tone spans, <br>) intact, numbers words for the stagger.
  document.querySelectorAll('[data-split]').forEach(function (el) {
    var i = 0;
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var parts = child.textContent.split(/([ \t\n\r]+)/);
          var frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^[ \t\n\r]+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w';
            var s = document.createElement('span'); s.textContent = p; s.style.setProperty('--i', i++);
            w.appendChild(s); frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
    walk(el);
    el.querySelectorAll('.w').forEach(function (w) { w.setAttribute('aria-hidden', 'true'); });
    el.classList.add('split');
    var followers = [];
    var sib = el.nextElementSibling;
    var block = el.closest('[data-split-group]');
    if (block) followers = block.querySelectorAll('.after-split');
    var go = function () {
      el.classList.add('in');
      Array.prototype.forEach.call(followers, function (f) { f.classList.add('in'); });
    };
    if (reduced) { go(); return; }
    if (el.hasAttribute('data-split-now')) {
      var now = function () { requestAnimationFrame(function () { requestAnimationFrame(go); }); };
      if (document.documentElement.classList.contains('intro-on')) document.addEventListener('a2h:intro-done', now, { once: true }); else now();
    }
    else onView(el, go);
  });

  // Live hero window: a scripted chat that lands as a CRM lead, on a loop.
  document.querySelectorAll('[data-live-window]').forEach(function (win) {
    var chat = win.querySelector('.lw-chat');
    var card = win.querySelector('.lw-card');
    var stages = win.querySelectorAll('.lw-stage');
    var feed = win.querySelectorAll('.lw-feed p');
    var items = win.querySelectorAll('.lw-item');
    var tpl = win.querySelector('template');
    if (!chat || !tpl) return;
    var script = JSON.parse(tpl.innerHTML);
    var visible = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(win);
    var addMsg = function (m) {
      var d = document.createElement('div');
      d.className = 'lw-msg ' + m.who;
      d.textContent = m.text;
      var s = document.createElement('small'); s.textContent = m.time; d.appendChild(s);
      chat.appendChild(d);
      requestAnimationFrame(function () { requestAnimationFrame(function () { d.classList.add('in'); }); });
      while (chat.children.length > 4) chat.removeChild(chat.firstChild);
    };
    var typing = function () {
      var t = document.createElement('div'); t.className = 'lw-typing';
      t.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
      chat.appendChild(t);
      requestAnimationFrame(function () { t.classList.add('in'); });
      return t;
    };
    var setStage = function (n) { stages.forEach(function (s, i) { s.classList.toggle('on', i === n); }); };
    if (reduced) {
      script.convo.forEach(addMsg);
      card.classList.add('in'); setStage(0); feed.forEach(function (p) { p.classList.add('in'); });
      return;
    }
    var run = async function () {
      while (true) {
        while (!visible) await sleep(400);
        chat.innerHTML = ''; card.classList.remove('in'); setStage(-1);
        feed.forEach(function (p) { p.classList.remove('in'); });
        items.forEach(function (it, i) { it.classList.toggle('is-active', i === 0); });
        await sleep(700);
        for (var k = 0; k < script.convo.length; k++) {
          var m = script.convo[k];
          if (m.who === 'ai') { var t = typing(); await sleep(1300); t.remove(); }
          addMsg(m);
          await sleep(m.who === 'ai' ? 1200 : 900);
        }
        card.classList.add('in'); await sleep(500);
        setStage(0); feed[0] && feed[0].classList.add('in'); await sleep(900);
        feed[1] && feed[1].classList.add('in'); await sleep(900);
        feed[2] && feed[2].classList.add('in'); await sleep(1100);
        setStage(1); await sleep(1600);
        setStage(2); await sleep(3200);
      }
    };
    onView(win, run, { threshold: 0.15 });
  });

  // Hub: sparks travel each line into the core, nodes and core pulse.
  document.querySelectorAll('[data-hub]').forEach(function (hub) {
    var paths = hub.querySelectorAll('.hub-line');
    var sparks = hub.querySelectorAll('.hub-spark');
    var nodes = hub.querySelectorAll('.hub-node');
    var core = hub.querySelector('.hub-core');
    if (reduced || !paths.length) return;
    var visible = false;
    new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(hub);
    var fire = function (i) {
      var p = paths[i], s = sparks[i], len = p.getTotalLength(), start = performance.now(), dur = 1300;
      nodes[i] && nodes[i].classList.add('pulse');
      setTimeout(function () { nodes[i] && nodes[i].classList.remove('pulse'); }, 450);
      var step = function (now) {
        var t = Math.min((now - start) / dur, 1);
        var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        var pt = p.getPointAtLength(e * len);
        s.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ')');
        s.style.opacity = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1;
        if (t < 1) requestAnimationFrame(step);
        else { core.classList.add('pulse'); setTimeout(function () { core.classList.remove('pulse'); }, 380); }
      };
      requestAnimationFrame(step);
    };
    var k = 0;
    setInterval(function () { if (visible && !document.hidden) { fire(k % paths.length); k++; } }, 1100);
  });

  // Sticky steps: the row nearest the viewport centre drives the stage.
  document.querySelectorAll('[data-steps]').forEach(function (wrap) {
    var rows = wrap.querySelectorAll('.step-row');
    var slides = wrap.querySelectorAll('.steps-stage .slide');
    var bars = wrap.querySelectorAll('.steps-progress i');
    var current = -1;
    var set = function (n) {
      if (n === current) return;
      current = n;
      rows.forEach(function (r, i) { r.classList.toggle('is-active', i === n); r.setAttribute('aria-current', i === n ? 'step' : 'false'); });
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === n); });
      bars.forEach(function (b, i) { b.classList.toggle('done', i <= n); });
    };
    set(0);
    rows.forEach(function (r, i) {
      r.addEventListener('click', function () { set(i); });
      r.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set(i); } });
    });
    var desktop = window.matchMedia('(min-width: 1024px)');
    var tick = function () {
      if (!desktop.matches) { rows.forEach(function (r) { r.classList.add('is-active'); }); return; }
      var mid = window.innerHeight * 0.5, best = 0, bestD = Infinity;
      rows.forEach(function (r, i) {
        var b = r.getBoundingClientRect(), d = Math.abs(b.top + b.height / 2 - mid);
        if (d < bestD) { bestD = d; best = i; }
      });
      set(best);
    };
    var queued = false;
    window.addEventListener('scroll', function () { if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; tick(); }); } }, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  });

  // Card rail: buttons, drag to scroll, staggered entrance.
  document.querySelectorAll('[data-rail]').forEach(function (wrap) {
    var rail = wrap.querySelector('.rail');
    var prev = wrap.querySelector('[data-rail-prev]');
    var next = wrap.querySelector('[data-rail-next]');
    if (!rail) return;
    var stepBy = function () { var c = rail.children[0]; return c ? c.getBoundingClientRect().width + 18 : 320; };
    var sync = function () {
      if (prev) prev.disabled = rail.scrollLeft < 8;
      if (next) next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8;
    };
    prev && prev.addEventListener('click', function () { rail.scrollBy({ left: -stepBy(), behavior: reduced ? 'auto' : 'smooth' }); });
    next && next.addEventListener('click', function () { rail.scrollBy({ left: stepBy(), behavior: reduced ? 'auto' : 'smooth' }); });
    rail.addEventListener('scroll', sync, { passive: true });
    sync();
    var down = false, sx = 0, sl = 0, moved = false;
    rail.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = rail.scrollLeft; });
    window.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - sx;
      if (Math.abs(dx) > 4) { moved = true; rail.classList.add('dragging'); }
      rail.scrollLeft = sl - dx;
    });
    window.addEventListener('pointerup', function () { if (!down) return; down = false; setTimeout(function () { rail.classList.remove('dragging'); }, 0); });
    rail.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    if (rail.classList.contains('stagger-x')) {
      if (reduced) rail.classList.add('in'); else onView(rail, function () { rail.classList.add('in'); }, { threshold: 0.1 });
    }
  });
  // Custom product visuals play only while on screen.
  document.querySelectorAll('[data-viz]').forEach(function (el) {
    if (!('IntersectionObserver' in window)) { el.classList.add('in-view'); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { el.classList.toggle('in-view', e.isIntersecting); });
    }, { threshold: 0.25 }).observe(el);
  });

  // Fire-write: letters ignite one by one behind a travelling spark.
  var fireWrite = function (mark, done) {
    var spark = mark.querySelector('.fire-spark');
    var letters = Array.prototype.slice.call(mark.querySelectorAll('.fire-letter'));
    var box = mark.getBoundingClientRect(), stagger = 60, start = 150;
    letters.forEach(function (letter, i) {
      var t = start + i * stagger;
      setTimeout(function () {
        if (spark) {
          var r = letter.getBoundingClientRect();
          spark.style.left = (r.left - box.left + r.width / 2) + 'px';
          spark.style.top = (r.top - box.top + r.height * 0.3) + 'px';
          spark.style.opacity = '1';
        }
      }, t);
      setTimeout(function () { letter.classList.add('lit'); if (spark) spark.style.opacity = '0'; }, t + stagger * 0.8);
    });
    if (done) setTimeout(done, start + letters.length * stagger + 600);
  };

  // Intro overlay, once per session, skipped for deep links and reduced motion.
  (function () {
    var overlay = document.getElementById('intro-overlay');
    if (!overlay) return;
    var cleanup = function () {
      document.documentElement.style.overflow = '';
      if (overlay.parentNode) overlay.remove();
      if (document.documentElement.classList.contains('intro-on')) { document.documentElement.classList.remove('intro-on'); document.dispatchEvent(new Event('a2h:intro-done')); }
    };
    var seen = null;
    try { seen = sessionStorage.getItem('a2h_intro_seen'); } catch (e) {}
    if (reduced || seen || window.location.hash) { cleanup(); return; }
    try { sessionStorage.setItem('a2h_intro_seen', '1'); } catch (e) {}
    document.documentElement.style.overflow = 'hidden';
    var dirs = ['exit-up', 'exit-down', 'exit-left', 'exit-right', 'exit-fade'];
    fireWrite(overlay.querySelector('.fire-mark'), function () {
      overlay.classList.add(dirs[Math.floor(Math.random() * dirs.length)]);
      overlay.addEventListener('transitionend', cleanup, { once: true });
      setTimeout(cleanup, 1500);
    });
    setTimeout(cleanup, 4500);
  })();

  // Footer wordmark ignites when it scrolls into view.
  document.querySelectorAll('.footer-word').forEach(function (mark) {
    if (reduced) { mark.querySelectorAll('.fire-letter').forEach(function (l) { l.classList.add('lit'); }); return; }
    onView(mark, function () { fireWrite(mark); }, { threshold: 0.4 });
  });
})();
