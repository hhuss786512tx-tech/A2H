// A2H AI agent chat widget (👾). Markup comes from partials.agentWidget();
// talks to /api/chat (Vercel function proxying Gemini, key never in the browser).
(function () {
  const fabBtn = document.getElementById('chat-fab-btn');
  const iconOpen = document.getElementById('chat-fab-icon-open');
  const iconClose = document.getElementById('chat-fab-icon-close');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close-btn');
  const thread = document.getElementById('chat-thread-live');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  if (!fabBtn || !panel || !form) return;

  const history = [];
  let opened = false;
  let sending = false;

  const scrollToBottom = () => { thread.scrollTop = thread.scrollHeight; };

  const addBubble = (role, text) => {
    const row = document.createElement('div');
    row.className = 'flex ' + (role === 'user' ? 'justify-end' : 'justify-start');
    const bubble = document.createElement('div');
    bubble.className = 'chat-live-bubble ' + (role === 'user' ? 'user' : 'ai');
    bubble.style.whiteSpace = 'pre-wrap';
    bubble.textContent = text;
    row.appendChild(bubble);
    thread.appendChild(row);
    scrollToBottom();
  };

  let typingEl = null;
  const showTyping = () => {
    typingEl = document.createElement('div');
    typingEl.className = 'flex justify-start';
    typingEl.innerHTML = '<div class="chat-live-bubble ai flex items-center gap-1 py-2.5"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
    thread.appendChild(typingEl);
    scrollToBottom();
  };
  const hideTyping = () => { if (typingEl) { typingEl.remove(); typingEl = null; } };

  const openPanel = () => {
    panel.classList.add('open');
    fabBtn.setAttribute('aria-expanded', 'true');
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');
    if (!opened) {
      opened = true;
      addBubble('ai', "Hi, I'm the A2H AI agent. Ask me about pricing, turnaround, or what's included. To see a free sample site, book a call from the button in the menu.");
    }
    setTimeout(() => input && input.focus(), 300);
  };
  const closePanel = () => {
    panel.classList.remove('open');
    fabBtn.setAttribute('aria-expanded', 'false');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  };

  fabBtn.addEventListener('click', () => {
    panel.classList.contains('open') ? closePanel() : openPanel();
  });
  closeBtn && closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message || sending) return;
    sending = true;
    input.value = '';
    addBubble('user', message);
    history.push({ role: 'user', text: message });
    showTyping();

    // Floor the perceived reply time at ~2s (run alongside the fetch, not
    // after it) so the typing indicator is on screen long enough to notice
    // even when the API itself responds instantly.
    const minDelay = new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: history.slice(-6) }),
      });
      const data = await res.json();
      await minDelay;
      hideTyping();
      const reply = (data && data.reply) || "Sorry, something went wrong. Email us at hello@a2h.info.";
      addBubble('ai', reply);
      history.push({ role: 'ai', text: reply });
    } catch (err) {
      await minDelay;
      hideTyping();
      addBubble('ai', "Something went wrong on my end. Email us at hello@a2h.info and we will get back to you directly.");
    } finally {
      sending = false;
    }
  });
})();
