/* ═══════════════════════════════════════════════════════════
   AIDS SOC Platform  —  copilot.js
   AI Copilot block — mini carousel preview + expanded demo.
   Self-contained: does not touch soc_dashboard.js logic.
   Mobile-safe: slower typing cadence on mobile, guarded against
   indefinite background loops once the mini preview is unmounted.
═══════════════════════════════════════════════════════════ */

const CP_IS_MOBILE = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

let _cpMiniStarted   = false;
let _cpMiniTypeTimer = null;
let _cpMiniLoopTimer = null;
let _cpMiniAlive     = true;   /* flips false only if destroyCopilotMini() is ever called */
let _cpMiniPaused    = false;  /* flips true while a heavier expanded view is open */

let _cpCycleTimer = null;

const CP_CONVERSATIONS = [
  { title: 'Explain the basics of network', active: true },
  { title: 'New Conversation', active: false },
];

const CP_MODELS = [
  { name: 'gemini-2.5 flash',     tag: 'HTTP-1s',     dot: 'green' },
  { name: 'gemini-…',             tag: 'HTTP-1s',     dot: 'red' },
  { name: 'gemini-2.5 flash-8b',  tag: 'HTTP-1s',     dot: 'green' },
  { name: 'GPT-Mini',             tag: 'GPT-4o-Mini', dot: 'cyan' },
  { name: 'Groq',                 tag: 'mixtral',     dot: 'purple' },
];

const CP_DEMO_USER_MSG = 'explain the basics of network';

const CP_DEMO_REPLY_EN =
  'AIDS SOC COPILOT: based on current Layer 5 SOAR data…\n\n' +
  '1. What is a Network\n' +
  'A group of devices connected to share information and resources.\n\n' +
  '2. Core Network Components\n' +
  '\u2022 Hosts \u2014 endpoint devices on the network\n' +
  '\u2022 Network Devices \u2014 routers, switches and similar hardware\n\n' +
  'Ask me anything about your network \u2014 Expert Mode is active.';

/* ════════════════════
   MINI PREVIEW (inside carousel block)
   Runs once for the whole session, same pattern as
   soc_dashboard.js mini canvases — guarded so it is never
   started twice and can be fully stopped if ever needed.
════════════════════ */
function initCopilotMini() {
  if (_cpMiniStarted) return;
  _cpMiniStarted = true;

  const chatEl = document.getElementById('mini-cp-chat');
  if (!chatEl) return;
  chatEl.innerHTML = `
    <div class="mini-cp-bubble user">explain the basics of network</div>
    <div class="mini-cp-bubble bot" id="mini-cp-bot-bubble"></div>
    <div class="mini-cp-status"><span class="mini-cp-dot"></span> EXPERT MODE</div>
  `;
  const bot = document.getElementById('mini-cp-bot-bubble');
  const fullText = 'A network is a group of devices connected to share data…';
  const typeSpeed  = CP_IS_MOBILE ? 55 : 35;   /* fewer DOM writes/sec on mobile */
  const pauseAfter = CP_IS_MOBILE ? 3200 : 2200;
  let i = 0;

  function typeLoop() {
    if (!_cpMiniAlive || _cpMiniPaused) return;   /* hard stop if torn down or paused */
    bot.textContent = '';
    i = 0;
    _cpMiniTypeTimer = setInterval(() => {
      if (_cpMiniPaused) { clearInterval(_cpMiniTypeTimer); return; }
      bot.textContent += fullText[i++];
      if (i >= fullText.length) {
        clearInterval(_cpMiniTypeTimer);
        _cpMiniLoopTimer = setTimeout(typeLoop, pauseAfter);
      }
    }, typeSpeed);
  }
  typeLoop();
}
window.initCopilotMini = initCopilotMini;

/* Pause/resume — used by the global mini-preview coordinator in
   soc_dashboard.js. The typing effect is just setInterval/setTimeout
   text writes (no canvas), so pausing only needs to stop the timers;
   resuming simply restarts the typing loop from scratch. */
function pauseCopilotMini() {
  _cpMiniPaused = true;
  if (_cpMiniTypeTimer) { clearInterval(_cpMiniTypeTimer); _cpMiniTypeTimer = null; }
  if (_cpMiniLoopTimer) { clearTimeout(_cpMiniLoopTimer); _cpMiniLoopTimer = null; }
}
window.pauseCopilotMini = pauseCopilotMini;

function resumeCopilotMini() {
  if (!_cpMiniPaused) return;
  _cpMiniPaused = false;
  _cpMiniStarted = false;   /* allow initCopilotMini to rebuild + restart the loop */
  initCopilotMini();
}
window.resumeCopilotMini = resumeCopilotMini;

/* Full teardown — not called on a normal block switch (the mini preview
   is meant to keep running in the background, exactly like the SOC
   dashboard's mini canvases do), only relevant if the whole page is
   being torn down. Exposed for completeness / future use. */
function destroyCopilotMini() {
  _cpMiniAlive = false;
  if (_cpMiniTypeTimer) clearInterval(_cpMiniTypeTimer);
  if (_cpMiniLoopTimer) clearTimeout(_cpMiniLoopTimer);
}
window.destroyCopilotMini = destroyCopilotMini;

/* ════════════════════
   EXPANDED DEMO
   Started on entering the block, fully stopped on leaving it —
   the only timer here (_cpCycleTimer) is always cleared by
   stopCopilotDemo(), which carousel.js calls on every block switch.
════════════════════ */
function startCopilotDemo() {
  stopCopilotDemo();

  const convList = document.getElementById('cp-conv-list');
  if (convList) {
    convList.innerHTML = CP_CONVERSATIONS.map(c =>
      `<div class="cp-conv-item${c.active ? ' active' : ''}">\u{1F4AC} ${c.title}</div>`
    ).join('');
  }

  const modelsList = document.getElementById('cp-models-list');
  if (modelsList) {
    modelsList.innerHTML = CP_MODELS.map(m =>
      `<div class="cp-model-item"><span class="cp-model-dot ${m.dot}"></span> ${m.name} <span class="cp-model-tag">${m.tag}</span></div>`
    ).join('');
  }

  const msgs = document.getElementById('cp-messages');
  if (msgs) {
    msgs.innerHTML = '';
    const userMsg = document.createElement('div');
    userMsg.className = 'cp-msg user';
    userMsg.innerHTML = `<div class="cp-msg-bubble">${CP_DEMO_USER_MSG}</div><div class="cp-msg-time">07:11</div>`;
    msgs.appendChild(userMsg);

    const botMsg = document.createElement('div');
    botMsg.className = 'cp-msg bot';
    const bubble = document.createElement('div');
    bubble.className = 'cp-msg-bubble';
    botMsg.appendChild(bubble);
    msgs.appendChild(botMsg);

    /* Mobile gets the full reply typed out in slightly bigger chunks
       (fewer DOM writes/sec) instead of skipping the effect entirely —
       keeps it light without feeling broken or static. */
    const chunk = CP_IS_MOBILE ? 3 : 1;
    let i = 0;
    _cpCycleTimer = setInterval(() => {
      bubble.textContent += CP_DEMO_REPLY_EN.slice(i, i + chunk);
      i += chunk;
      msgs.scrollTop = msgs.scrollHeight;
      if (i >= CP_DEMO_REPLY_EN.length) {
        clearInterval(_cpCycleTimer);
        _cpCycleTimer = null;
      }
    }, 18);
  }

  /* expert toggle visual state */
  const toggle = document.getElementById('cp-expert-toggle');
  if (toggle) toggle.classList.add('active');
}
window.startCopilotDemo = startCopilotDemo;

function stopCopilotDemo() {
  if (_cpCycleTimer) { clearInterval(_cpCycleTimer); _cpCycleTimer = null; }
}
window.stopCopilotDemo = stopCopilotDemo;
