/* ===================================================
   VISHCRAFT — MINECRAFT LOADING SCREEN ENGINE
   loading.js
   =================================================== */

(function () {
  'use strict';

  /* ---- CONFIG ---- */
  const TIPS = [
    "Vishvam has been crafting code since 2019 ⛏",
    "This portfolio was built one block at a time 🧱",
    "Fun Fact: Vishvam drinks 9,841+ cups of coffee ☕",
    "All projects are handcrafted — no shortcuts 💎",
    "Open to Work: Hire Vishvam before someone else does! 🚀",
    "React, Node.js, Python — the holy trinity of web dev 🔱",
    "Spiders are neutral mobs. So are pull requests. 🕷️",
    "The Nether has no sky. Vishvam's skills have no ceiling. 🔥",
    "TNT destroys blocks. Vishvam destroys deadlines. 💥",
    "A good portfolio loads fast — like a Netherite sword swing ⚡",
    "Creepers feared Vishvam's code review process 💣",
    "Diamonds are rare. Senior full-stack devs are rarer. 💎",
  ];

  const BOOT_LINES = [
    "Initializing world seed...",
    "Generating terrain chunks...",
    "Spawning entities...",
    "Loading textures...",
    "Building portfolio structures...",
    "Importing skill trees...",
    "Rendering project builds...",
    "Calibrating XP counters...",
    "Connecting to servers...",
    "World ready! Welcome to VishCraft.",
  ];

  /* ---- ELEMENT REFERENCES ---- */
  const screen     = document.getElementById('mcLoadingScreen');
  const worldCanvas = document.getElementById('mcWorldCanvas');
  const steveCanvas = document.getElementById('mcSteveCanvas');
  const progressBar = document.getElementById('mcProgressBar');
  const progressPct = document.getElementById('mcProgressPct');
  const tipText     = document.getElementById('mcTipText');
  const logLine     = document.getElementById('mcLogLine');

  if (!screen) return;

  /* ================================================================
     WORLD CANVAS — Scrolling pixel Minecraft panorama
     ================================================================ */
  const wCtx = worldCanvas.getContext('2d');

  // Palette
  const SKY_TOP    = '#0d0d2b';
  const SKY_BOT    = '#1a2850';
  const MOON_CLR   = '#eef2ff';
  const STAR_CLR   = '#ffffff';

  // Block colour tables [top-face, side-face]
  const BLOCKS = {
    air:     null,
    grass:   ['#5d9e3b', '#4e7d2e'],
    dirt:    ['#8b5e3c', '#7a4e2c'],
    stone:   ['#7d7d7d', '#6e6e6e'],
    deepstone:['#3a3a4a','#2e2e3c'],
    gold:    ['#f5c518', '#c99a10'],
    diamond: ['#4fc3f7', '#3aaedf'],
    lava:    ['#ff4500', '#d93a00'],
    bedrock: ['#222228', '#1a1a1e'],
    coal:    ['#555560', '#484850'],
    gravel:  ['#8a8070', '#7a7060'],
    sand:    ['#d4b87a', '#c4a86a'],
    wood:    ['#6e4e28', '#5e3e1a'],
    leaves:  ['#2d6a1a', '#1e5010'],
  };

  // World grid: columns from right → left (we'll scroll it)
  const COLS   = 24;    // visible columns
  const ROWS   = 14;    // total rows in grid
  const GROUND_Y = 9;   // row index of ground surface
  let CELL_W, CELL_H;

  function resizeWorldCanvas() {
    worldCanvas.width  = window.innerWidth;
    worldCanvas.height = window.innerHeight;
    CELL_W = Math.ceil(worldCanvas.width  / COLS);
    CELL_H = Math.ceil(worldCanvas.height / ROWS);
  }
  resizeWorldCanvas();
  window.addEventListener('resize', resizeWorldCanvas);

  // Build a column of blocks (ground + underground)
  function buildColumn(x) {
    // Terrain height variance using sine noise
    const surfaceRow = GROUND_Y + Math.round(Math.sin(x * 0.7) * 1.5 + Math.cos(x * 0.4) * 1);
    const col = [];
    for (let row = 0; row < ROWS; row++) {
      if (row < surfaceRow)          col.push('air');
      else if (row === surfaceRow)   col.push('grass');
      else if (row < surfaceRow + 3) col.push('dirt');
      else if (row < surfaceRow + 6) col.push('stone');
      else if (row < ROWS - 1)      col.push(Math.random() < 0.05 ? 'diamond'
                                          : Math.random() < 0.07 ? 'coal'
                                          : Math.random() < 0.03 ? 'gold'
                                          : 'deepstone');
      else                           col.push('bedrock');
    }
    // Occasional tree
    if (surfaceRow > 0 && Math.random() < 0.22) {
      const trunkH = 3 + Math.floor(Math.random() * 2);
      for (let t = 0; t < trunkH && surfaceRow - 1 - t >= 0; t++) col[surfaceRow - 1 - t] = 'wood';
      for (let l = -1; l <= 1; l++) {
        const lr = surfaceRow - 1 - trunkH + l;
        if (lr >= 0 && lr < surfaceRow) col[lr] = 'leaves';
      }
    }
    return col;
  }

  // Pre-generate columns (double width for seamless scroll)
  const TOTAL_COLS = COLS * 2;
  let world = [];
  for (let c = 0; c < TOTAL_COLS; c++) world.push(buildColumn(c));

  // Stars
  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random(),
    y: Math.random() * 0.55,
    r: Math.random() * 1.4 + 0.4,
    twinkle: Math.random() * Math.PI * 2,
  }));

  // Moon position
  let moonX = 0.78, moonY = 0.12;

  // Scroll state
  let scrollOffset = 0;      // in pixels
  const SCROLL_SPEED = 0.6;  // px per frame

  function drawWorld(timestamp) {
    const W = worldCanvas.width, H = worldCanvas.height;

    /* Sky gradient */
    const skyGrad = wCtx.createLinearGradient(0, 0, 0, H * 0.65);
    skyGrad.addColorStop(0, SKY_TOP);
    skyGrad.addColorStop(1, SKY_BOT);
    wCtx.fillStyle = skyGrad;
    wCtx.fillRect(0, 0, W, H);

    /* Stars */
    stars.forEach(s => {
      s.twinkle += 0.04;
      const alpha = 0.4 + 0.5 * Math.abs(Math.sin(s.twinkle));
      wCtx.fillStyle = `rgba(255,255,255,${alpha})`;
      wCtx.fillRect(
        Math.round(s.x * W - s.r / 2),
        Math.round(s.y * H - s.r / 2),
        Math.ceil(s.r), Math.ceil(s.r)
      );
    });

    /* Moon (pixel circle) */
    const mx = Math.round(moonX * W), my = Math.round(moonY * H);
    const mr = 22;
    wCtx.fillStyle = MOON_CLR;
    // Draw pixelated circle
    for (let dy = -mr; dy <= mr; dy++) {
      for (let dx = -mr; dx <= mr; dx++) {
        if (dx * dx + dy * dy <= mr * mr) {
          wCtx.fillRect(mx + dx, my + dy, 1, 1);
        }
      }
    }
    // Moon craters
    wCtx.fillStyle = 'rgba(0,0,0,0.12)';
    [[6,-6,4],[-8,4,3],[4,8,2]].forEach(([cx,cy,cr]) => {
      for (let dy = -cr; dy <= cr; dy++) {
        for (let dx = -cr; dx <= cr; dx++) {
          if (dx * dx + dy * dy <= cr * cr) wCtx.fillRect(mx+cx+dx, my+cy+dy, 1, 1);
        }
      }
    });

    /* Advance scroll */
    scrollOffset += SCROLL_SPEED;
    const colPixelW = CELL_W;
    const colsShifted = Math.floor(scrollOffset / colPixelW);

    // Re-generate a new column on the right when we shift
    if (colsShifted > 0) {
      scrollOffset -= colsShifted * colPixelW;
      for (let i = 0; i < colsShifted; i++) {
        world.shift();
        world.push(buildColumn(world.length + colsShifted * 7));
      }
    }

    /* Draw blocks */
    for (let c = 0; c < world.length && c < COLS + 1; c++) {
      const col = world[c];
      const xPx = Math.round(c * CELL_W - scrollOffset);
      for (let row = 0; row < ROWS; row++) {
        const type = col[row];
        if (!type || type === 'air') continue;
        const colours = BLOCKS[type];
        if (!colours) continue;
        const yPx = Math.round(row * CELL_H);
        // Side face
        wCtx.fillStyle = colours[1];
        wCtx.fillRect(xPx, yPx, CELL_W, CELL_H);
        // Top face highlight (2px strip at top)
        if (row === 0 || col[row - 1] === 'air' || !col[row-1] || col[row-1] === 'leaves') {
          wCtx.fillStyle = colours[0];
          wCtx.fillRect(xPx, yPx, CELL_W, Math.max(2, Math.round(CELL_H * 0.28)));
        }
        // Pixel grid lines
        wCtx.strokeStyle = 'rgba(0,0,0,0.2)';
        wCtx.lineWidth = 0.5;
        wCtx.strokeRect(xPx + 0.5, yPx + 0.5, CELL_W - 1, CELL_H - 1);

        // Lava glow
        if (type === 'lava') {
          wCtx.fillStyle = `rgba(255,100,0,${0.2 + 0.15 * Math.sin(timestamp * 0.003 + c)})`;
          wCtx.fillRect(xPx, yPx - 4, CELL_W, 4);
        }
      }
    }

    /* Ground-level atmospheric fog */
    const fogGrad = wCtx.createLinearGradient(0, H * 0.6, 0, H);
    fogGrad.addColorStop(0, 'rgba(0,0,0,0)');
    fogGrad.addColorStop(1, 'rgba(0,0,0,0.55)');
    wCtx.fillStyle = fogGrad;
    wCtx.fillRect(0, 0, W, H);
  }

  /* ================================================================
     STEVE CANVAS — Walking animation (pixel art drawn via JS)
     ================================================================ */
  const sCtx = steveCanvas.getContext('2d');

  // Body part colours
  const SKIN = '#c8a87a';
  const HAIR = '#4e2800';
  const SHIRT= '#1a6bb5';
  const PANTS= '#2e4a8a';

  function drawPixel(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }

  // Draw Steve in a given walk phase (angle in radians)
  function drawSteve(phase) {
    const S = 3; // scale factor (each "pixel" = S×S real pixels)
    sCtx.clearRect(0, 0, 96, 96);

    const armSwing = Math.sin(phase) * 8;   // degrees
    const legSwing = Math.sin(phase) * 10;

    // Helper: pixel block at grid coords
    function pb(gx, gy, gw, gh, col) {
      sCtx.fillStyle = col;
      sCtx.fillRect(gx * S, gy * S, gw * S, gh * S);
    }

    // Shadow
    sCtx.fillStyle = 'rgba(0,0,0,0.25)';
    sCtx.beginPath();
    sCtx.ellipse(16 * S, 31 * S, 6 * S, 2 * S, 0, 0, Math.PI * 2);
    sCtx.fill();

    // Legs (walking)
    const legY = 19;
    // Left leg
    sCtx.save();
    sCtx.translate(12 * S, legY * S);
    sCtx.rotate((legSwing * Math.PI) / 180);
    pb(0, 0, 4, 9, PANTS);
    pb(0, 0, 4, 1, '#1e3a7a'); // highlight
    sCtx.restore();

    // Right leg
    sCtx.save();
    sCtx.translate(17 * S, legY * S);
    sCtx.rotate((-legSwing * Math.PI) / 180);
    pb(0, 0, 4, 9, PANTS);
    pb(0, 0, 4, 1, '#1e3a7a');
    sCtx.restore();

    // Body
    pb(10, 10, 12, 10, SHIRT);
    pb(10, 10, 12, 1, '#2a7bc5'); // top highlight

    // Left arm
    sCtx.save();
    sCtx.translate(9 * S, 10 * S);
    sCtx.rotate((-armSwing * Math.PI) / 180);
    pb(0, 0, 3, 9, SHIRT);
    pb(0, 0, 3, 1, '#2a7bc5');
    pb(0, 7, 3, 2, SKIN); // hand
    sCtx.restore();

    // Right arm
    sCtx.save();
    sCtx.translate(20 * S, 10 * S);
    sCtx.rotate((armSwing * Math.PI) / 180);
    pb(0, 0, 3, 9, SHIRT);
    pb(0, 0, 3, 1, '#2a7bc5');
    pb(0, 7, 3, 2, SKIN); // hand
    sCtx.restore();

    // Head
    pb(10, 2, 12, 9, SKIN);
    pb(10, 2, 12, 1, '#d4b48a'); // top highlight
    // Hair / hat
    pb(10, 2, 12, 3, HAIR);
    // Eyes
    pb(12, 6, 2, 2, '#1a1a2e');
    pb(18, 6, 2, 2, '#1a1a2e');
    // Mouth
    pb(13, 9, 1, 1, '#8a5a4a');
    pb(17, 9, 1, 1, '#8a5a4a');

    // Pixel outline: dark border on head
    sCtx.strokeStyle = 'rgba(0,0,0,0.35)';
    sCtx.lineWidth = 0.5;
    sCtx.strokeRect(10 * S, 2 * S, 12 * S, 9 * S);
    sCtx.strokeRect(10 * S, 10 * S, 12 * S, 10 * S);
  }

  /* ================================================================
     PROGRESS & BOOT SEQUENCE
     ================================================================ */
  let progress   = 0;
  let targetProgress = 0;
  let currentTip     = 0;
  let currentLog     = 0;
  let stevePhase     = 0;
  let animFrameId;
  let startTime;

  const TOTAL_DURATION_MS = 3800; // loading lasts ~3.8s

  function cycleTip() {
    if (!tipText) return;
    tipText.style.opacity = '0';
    setTimeout(() => {
      currentTip = (currentTip + 1) % TIPS.length;
      tipText.textContent = TIPS[currentTip];
      tipText.style.opacity = '1';
    }, 400);
  }

  function cycleLog() {
    if (!logLine) return;
    logLine.style.opacity = '0';
    setTimeout(() => {
      currentLog = Math.min(currentLog + 1, BOOT_LINES.length - 1);
      logLine.textContent = BOOT_LINES[currentLog];
      logLine.style.opacity = '1';
    }, 200);
  }

  // Randomize tips on interval
  const tipInterval = setInterval(cycleTip, 2200);
  // Boot lines tied to progress checkpoints
  const logCheckpoints = [10, 20, 32, 45, 55, 65, 75, 85, 92, 100];
  let logIdx = 0;

  function setProgress(pct) {
    const clamped = Math.min(100, Math.max(0, Math.round(pct)));
    if (progressBar) progressBar.style.width = clamped + '%';
    if (progressPct) progressPct.textContent  = clamped + '%';

    // Trigger log updates at checkpoints
    while (logIdx < logCheckpoints.length && clamped >= logCheckpoints[logIdx]) {
      cycleLog();
      logIdx++;
    }
  }

  /* Main animation loop */
  function tick(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const t = Math.min(elapsed / TOTAL_DURATION_MS, 1);

    // Ease-out cubic progress
    const eased = 1 - Math.pow(1 - t, 2.4);
    targetProgress = eased * 100;

    // Smooth actual progress bar toward target
    progress += (targetProgress - progress) * 0.12;
    setProgress(progress);

    // Steve walk
    stevePhase += 0.12;
    drawSteve(stevePhase);

    // World canvas
    drawWorld(timestamp);

    if (t < 1) {
      animFrameId = requestAnimationFrame(tick);
    } else {
      // Finished loading — dismiss screen
      setProgress(100);
      drawSteve(stevePhase);
      clearInterval(tipInterval);
      setTimeout(dismissLoader, 300);
    }
  }

  function dismissLoader() {
    screen.classList.add('mc-hidden');
    // Remove from DOM after transition
    setTimeout(() => {
      screen.remove();
      cancelAnimationFrame(animFrameId);
    }, 900);
  }

  /* Set up initial tip */
  const initialTip = TIPS[Math.floor(Math.random() * TIPS.length)];
  if (tipText) tipText.textContent = initialTip;

  /* Start! */
  animFrameId = requestAnimationFrame(tick);

})();
