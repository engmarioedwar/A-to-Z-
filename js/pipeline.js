/* ═══════════════════════════════════════════════════════════
   AIDS SOC Platform  —  pipeline.js
   AI Pipeline block — mini carousel preview + expanded demo.
   Self-contained: does not touch soc_dashboard.js logic.
   Mobile-safe: frame-skipping, no shadowBlur on mobile,
   single resize listener, full cleanup on stop.
═══════════════════════════════════════════════════════════ */

const PL_IS_MOBILE = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);

let _plInterval = null;
let _plLogInterval = null;
let _plStageIdx = 0;

/* mini-preview state (kept outside init so it only ever runs once) */
let _plMiniStarted = false;
let _plMiniRAF = null;
let _plMiniDotTimer = null;
let _plMiniResizeHandler = null;
let _plMiniDrawFn = null;

const PL_STAGE_IDS = ['pl-stage-1', 'pl-stage-2', 'pl-stage-3', 'pl-stage-4'];

const PL_LOG_LINES = [
  '[advisor] searching dataset platform for "ddos", "port-scan", "mitm"…',
  '[advisor] candidate verified: network-intrusion-detection-v2',
  '[advisor] candidate verified: cic-ids-collection',
  '[downloader] fetching dataset archive…',
  '[downloader] extracting CSV files (path-safety check passed)',
  '[cleaner] inferring column types…',
  '[cleaner] capping outliers (IQR), filling missing values',
  '[cleaner] duplicate rows removed: 312',
  '[trainer] training base LightGBM model #1…',
  '[trainer] training base LightGBM model #2…',
  '[trainer] building stacking ensemble (meta-learner)…',
  '[export] writing model.pkl + scaler.pkl + features.json',
  '[hot-reload] signal file detected by live engine — model swapped',
];

/* ════════════════════
   MINI PREVIEW (inside carousel block)
   Runs once, lives for the whole session (same pattern as
   soc_dashboard.js mini canvases) — never restarted, so it
   cannot stack listeners or RAF loops on repeat visits.
════════════════════ */
function initPipelineMini() {
  if (_plMiniStarted) return;
  _plMiniStarted = true;

  const stagesEl = document.getElementById('mini-pl-stages');
  if (stagesEl) {
    stagesEl.innerHTML = `
      <div class="mini-pl-stage" data-s="0">①</div>
      <div class="mini-pl-stage" data-s="1">②</div>
      <div class="mini-pl-stage" data-s="2">③</div>
      <div class="mini-pl-stage" data-s="3">④</div>
    `;
  }

  const c = document.getElementById('mini-pipe');
  if (!c) return;
  const ctx = c.getContext('2d');
  const dpr = PL_IS_MOBILE ? 1 : Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    c.width  = Math.max(c.clientWidth, 60)  * dpr;
    c.height = Math.max(c.clientHeight, 40) * dpr;
  }
  resize();
  _plMiniResizeHandler = resize;
  window.addEventListener('resize', _plMiniResizeHandler);

  let t = 0;
  let frameCount = 0;
  function draw() {
    if (_plMiniPaused) return;
    frameCount++;
    /* skip every other frame on mobile — same technique used in soc_dashboard.js */
    if (PL_IS_MOBILE && frameCount % 2 !== 0) {
      _plMiniRAF = requestAnimationFrame(draw);
      return;
    }
    const w = c.width, h = c.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(182,107,255,.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    const step = PL_IS_MOBILE ? 8 : 4;
    for (let x = 0; x <= w; x += step) {
      const y = h * 0.5 + Math.sin((x * 0.04) + t) * (h * 0.18);
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    /* moving pulse dot along the line — no shadowBlur on mobile (expensive on weak GPUs) */
    const px = (t * 40) % w;
    const py = h * 0.5 + Math.sin((px * 0.04) + t) * (h * 0.18);
    ctx.beginPath();
    ctx.fillStyle = '#b66bff';
    if (!PL_IS_MOBILE) {
      ctx.shadowColor = '#b66bff';
      ctx.shadowBlur = 12;
    }
    ctx.arc(px, py, 4 * dpr, 0, Math.PI * 2);
    ctx.fill();
    if (!PL_IS_MOBILE) ctx.shadowBlur = 0;

    t += 0.04;
    _plMiniRAF = requestAnimationFrame(draw);
  }
  _plMiniDrawFn = draw;
  _plMiniRAF = requestAnimationFrame(draw);

  /* cycle through the 4 mini stage dots */
  let s = 0;
  _plMiniDotTimer = setInterval(() => {
    document.querySelectorAll('.mini-pl-stage').forEach((el, i) => {
      el.classList.toggle('active', i === s);
    });
    s = (s + 1) % 4;
  }, 1200);
}
window.initPipelineMini = initPipelineMini;

/* Pause/resume — used by the global mini-preview coordinator in
   soc_dashboard.js so this canvas never runs at the same time as
   the heavier expanded-view canvases of any block. */
let _plMiniPaused = false;

function pausePipelineMini() {
  _plMiniPaused = true;
  if (_plMiniRAF) { cancelAnimationFrame(_plMiniRAF); _plMiniRAF = null; }
  if (_plMiniDotTimer) { clearInterval(_plMiniDotTimer); _plMiniDotTimer = null; }
}
window.pausePipelineMini = pausePipelineMini;

function resumePipelineMini() {
  if (!_plMiniPaused && _plMiniRAF) return; /* already running */
  _plMiniPaused = false;
  const c = document.getElementById('mini-pipe');
  if (c && _plMiniDrawFn) _plMiniRAF = requestAnimationFrame(_plMiniDrawFn);
  if (!_plMiniDotTimer) {
    let s = 0;
    _plMiniDotTimer = setInterval(() => {
      document.querySelectorAll('.mini-pl-stage').forEach((el, i) => {
        el.classList.toggle('active', i === s);
      });
      s = (s + 1) % 4;
    }, 1200);
  }
}
window.resumePipelineMini = resumePipelineMini;

/* ════════════════════
   EXPANDED DEMO
   Started on entering the block, fully stopped on leaving it.
════════════════════ */
function startPipelineDemo() {
  stopPipelineDemo();

  let runs = 0, datasets = 0, cleaned = 0;
  _plStageIdx = 0;

  function setStage(i) {
    PL_STAGE_IDS.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('active', idx === i);
      el.classList.toggle('done', idx < i);
    });
  }

  setStage(0);

  /* Slower cadence on mobile — fewer DOM writes, gentler on battery/CPU */
  const stageTick = PL_IS_MOBILE ? 2400 : 1800;

  _plInterval = setInterval(() => {
    _plStageIdx = (_plStageIdx + 1) % 5;
    if (_plStageIdx === 4) {
      runs++;
      const r = document.getElementById('pl-v-runs');
      if (r) r.textContent = runs;
      const tr = document.getElementById('pl-v-training');
      if (tr) tr.textContent = 'success';
      setStage(0);
      return;
    }
    setStage(_plStageIdx);
    if (_plStageIdx === 1) {
      datasets += Math.floor(Math.random() * 3) + 1;
      const d = document.getElementById('pl-v-datasets');
      if (d) d.textContent = datasets;
    }
    if (_plStageIdx === 2) {
      cleaned += Math.floor(Math.random() * 2) + 1;
      const cl = document.getElementById('pl-v-cleaned');
      if (cl) cl.textContent = cleaned;
    }
  }, stageTick);

  /* log box */
  const logBox = document.getElementById('pl-log-box');
  let li = 0;
  if (logBox) {
    logBox.innerHTML = '';
    const logTick = PL_IS_MOBILE ? 1500 : 1100;
    const maxLines = PL_IS_MOBILE ? 5 : 8;
    _plLogInterval = setInterval(() => {
      const line = document.createElement('div');
      line.className = 'pl-log-line';
      line.textContent = PL_LOG_LINES[li % PL_LOG_LINES.length];
      logBox.appendChild(line);
      logBox.scrollTop = logBox.scrollHeight;
      while (logBox.children.length > maxLines) logBox.removeChild(logBox.firstChild);
      li++;
    }, logTick);
  }
}
window.startPipelineDemo = startPipelineDemo;

function stopPipelineDemo() {
  if (_plInterval)    { clearInterval(_plInterval);    _plInterval = null; }
  if (_plLogInterval) { clearInterval(_plLogInterval); _plLogInterval = null; }
}
window.stopPipelineDemo = stopPipelineDemo;

/* Full teardown — only relevant if the whole page/app is being torn down,
   never called on a normal block switch (mini preview keeps running,
   exactly like soc_dashboard.js mini canvases do). Exposed for completeness. */
function destroyPipelineMini() {
  if (_plMiniRAF) cancelAnimationFrame(_plMiniRAF);
  if (_plMiniDotTimer) clearInterval(_plMiniDotTimer);
  if (_plMiniResizeHandler) window.removeEventListener('resize', _plMiniResizeHandler);
}
window.destroyPipelineMini = destroyPipelineMini;
