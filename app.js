/* ===================================
   VISHCRAFT — VISHVAM PATEL PORTFOLIO
   JavaScript Engine
   =================================== */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ============================================================
// DATA
// ============================================================

const SKILLS_DATA = [
  {
    icon: '🌐', title: 'Frontend',
    items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind', 'Framer Motion']
  },
  {
    icon: '⚙️', title: 'Backend',
    items: ['Node.js', 'Express', 'Python', 'FastAPI', 'Django', 'REST APIs', 'GraphQL', 'WebSockets']
  },
  {
    icon: '🗄️', title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Prisma', 'Supabase', 'Firebase']
  },
  {
    icon: '☁️', title: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel', 'Nginx', 'Linux']
  },
  {
    icon: '🔧', title: 'Tools',
    items: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest', 'Webpack', 'Vite']
  },
  {
    icon: '📱', title: 'Mobile',
    items: ['React Native', 'Expo', 'Flutter (learning)', 'PWA']
  }
];

const SKILL_BARS = [
  { name: '⚛️ React / Next.js', pct: 92, color: '#f6b93b' },
  { name: '🟢 Node.js / Express', pct: 88, color: '#ffd45a' },
  { name: '🐍 Python', pct: 82, color: '#ffdd00' },
  { name: '🗄️ Databases (SQL/NoSQL)', pct: 78, color: '#aa00ff' },
  { name: '☁️ Cloud & DevOps', pct: 70, color: '#ff6600' },
  { name: '📱 React Native', pct: 65, color: '#f6b93b' }
];

const PROJECTS_DATA = [
  {
    id: 'p1', name: 'BlockCommerce', type: 'web',
    emoji: '🛒',
    banner: 'linear-gradient(135deg, #111111, #b77900)',
    desc: 'A blazing-fast e-commerce platform built with Next.js, Stripe, and PostgreSQL. Features real-time inventory and pixel-perfect UI.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
    stars: '⭐ 248', demoUrl: '#', codeUrl: '#',
    longDesc: 'Full-stack e-commerce solution with product listings, cart management, Stripe checkout, order tracking, and an admin dashboard. Deployed on Vercel with a PostgreSQL backend via Prisma ORM. Achieves 98 Lighthouse score.'
  },
  {
    id: 'p2', name: 'NetherChat', type: 'app',
    emoji: '💬',
    banner: 'linear-gradient(135deg, #1b1408, #d99a1e)',
    desc: 'Real-time chat application with WebSocket rooms, file sharing, emoji reactions, and end-to-end encryption.',
    tech: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
    stars: '⭐ 156', demoUrl: '#', codeUrl: '#',
    longDesc: 'NetherChat supports private rooms, group channels, file sharing (up to 25MB), emoji reactions, message editing, read receipts, and optional E2E encryption via libsodium. Redis is used for pub/sub scaling.'
  },
  {
    id: 'p3', name: 'CraftAPI', type: 'api',
    emoji: '⚡',
    banner: 'linear-gradient(135deg, #ffdd00, #ff6600)',
    desc: 'Developer API toolkit for building Minecraft-style game backends. Includes player tracking, inventory, and leaderboard endpoints.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Swagger'],
    stars: '⭐ 94', demoUrl: '#', codeUrl: '#',
    longDesc: 'REST + WebSocket API with full Swagger docs. Handles player sessions, inventory sync, leaderboards with Redis sorted sets, webhooks, and JWT auth. 100% Docker-based with one-command setup.'
  },
  {
    id: 'p4', name: 'PixelUI', type: 'oss',
    emoji: '🎨',
    banner: 'linear-gradient(135deg, #b77900, #0a0a0a)',
    desc: 'Open-source React component library with a pixel-art / retro game design system. 40+ components, dark mode, fully typed.',
    tech: ['React', 'TypeScript', 'Storybook', 'Rollup', 'CSS Modules'],
    stars: '⭐ 1.2k', demoUrl: '#', codeUrl: '#',
    longDesc: 'PixelUI is a fully-themed React component library inspired by retro video games. Features 40+ components, complete dark mode, accessibility (WCAG 2.1 AA), TypeScript generics, and a Storybook playground. Published on npm with 3k+ weekly downloads.'
  },
  {
    id: 'p5', name: 'EndDashboard', type: 'web',
    emoji: '📊',
    banner: 'linear-gradient(135deg, #050505, #6f4a08)',
    desc: 'Analytics dashboard with real-time charts, CSV exports, custom widgets, and multi-workspace team support.',
    tech: ['Next.js', 'Recharts', 'Supabase', 'Shadcn/ui', 'TypeScript'],
    stars: '⭐ 71', demoUrl: '#', codeUrl: '#',
    longDesc: 'EndDashboard provides live analytics with WebSocket updates, 12 chart types, customizable widget grids (drag & drop), CSV/Excel exports, role-based access control, and Slack / email alerts. Built with Supabase for real-time rows.'
  },
  {
    id: 'p6', name: 'MineTracker', type: 'app',
    emoji: '📱',
    banner: 'linear-gradient(135deg, #171207, #f6b93b)',
    desc: 'Mobile productivity app for tracking daily habits, streaks, and goals with a gamified Minecraft-inspired reward system.',
    tech: ['React Native', 'Expo', 'SQLite', 'Zustand', 'Reanimated'],
    stars: '⭐ 38', demoUrl: '#', codeUrl: '#',
    longDesc: 'MineTracker gamifies habit tracking with XP, levels, and unlockable "biome" themes. Features local-first SQLite storage, offline support, push notifications, widgets, and Apple Health integration. Published on App Store & Google Play.'
  }
];

const EXPERIENCE_DATA = [
  {
    title: 'Senior Full-Stack Developer',
    company: '🚀 TechForge Inc.',
    date: '2023 – Present',
    desc: 'Led development of a multi-tenant SaaS platform serving 50k+ users. Architected microservices migration from a monolith, reducing latency by 60%. Mentored 3 junior developers and led sprint planning.',
    tags: ['Next.js', 'Node.js', 'AWS', 'PostgreSQL', 'Docker', 'GraphQL']
  },
  {
    title: 'Full-Stack Developer',
    company: '🌐 WebCraft Studio',
    date: '2021 – 2023',
    desc: 'Built 15+ client projects from scratch — e-commerce stores, dashboards, and REST APIs. Established coding standards and CI/CD pipelines. Key contributor to the internal component library.',
    tags: ['React', 'Express', 'MongoDB', 'GitHub Actions', 'Stripe']
  },
  {
    title: 'Frontend Developer Intern',
    company: '💡 StartupBlocks',
    date: '2020 – 2021',
    desc: 'Developed responsive UIs for a fintech startup\'s web app. Improved Lighthouse performance score from 62 to 94. Built reusable component system used across 3 products.',
    tags: ['React', 'TypeScript', 'CSS3', 'Figma', 'Jest']
  },
  {
    title: 'Freelance Developer',
    company: '⛏ Self-Employed',
    date: '2019 – 2020',
    desc: 'Completed 20+ freelance projects on Upwork & Fiverr — landing pages, WordPress sites, and small web apps. Maintained 5-star rating and built a loyal client base.',
    tags: ['JavaScript', 'WordPress', 'PHP', 'CSS3', 'jQuery']
  }
];

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initFloatingBlocks();
  initNavbar();
  initScrollReveal();
  initCounters();
  initSectionObserver();
  renderSkills();
  renderProjects('all');
  renderTimeline();
  initProjectFilter();
  initContactForm();
  initProjectModal();
  initHeroButtons();
  initKonamiCode();

  // Load and render interactive 3D Minecraft Model
  initThreeDModel();
  initOriginHeadModel();
  initBrandHeadLogos();
});

// ============================================================
// HERO BUTTONS
// ============================================================
function initHeroButtons() {
  document.getElementById('heroProjectsBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });
  document.getElementById('heroContactBtn').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
}

// ============================================================
// PARTICLE CANVAS
// ============================================================
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
  resize();
  window.addEventListener('resize', resize);

  const COLORS = ['rgba(255,204,72,', 'rgba(246,185,59,', 'rgba(255,224,138,', 'rgba(183,121,0,'];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.4 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.life = 0;
      this.maxLife = Math.random() * 250 + 100;
    }
    update() {
      this.x += this.vx; this.y += this.vy; this.life++;
      if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      const a = this.alpha * Math.sin((this.life / this.maxLife) * Math.PI);
      ctx.fillStyle = this.color + a + ')';
      ctx.fillRect(Math.round(this.x), Math.round(this.y), this.size, this.size);
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  const animate = () => {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.strokeStyle = `rgba(255,204,72,${0.04 * (1 - dist / 90)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  };
  animate();
}

// ============================================================
// FLOATING BLOCKS
// ============================================================
function initFloatingBlocks() {
  const container = document.getElementById('floatingBlocks');
  const types = ['grass', 'diamond', 'gold', 'emerald', 'redstone'];
  for (let i = 0; i < 16; i++) {
    const block = document.createElement('div');
    block.className = `float-block ${types[Math.floor(Math.random() * types.length)]}`;
    block.style.left = `${Math.random() * 100}%`;
    block.style.width = block.style.height = `${Math.random() * 14 + 8}px`;
    const dur = Math.random() * 18 + 10;
    const delay = Math.random() * -25;
    block.style.animation = `floatUp ${dur}s ${delay}s linear infinite`;
    container.appendChild(block);
  }
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
}

// ============================================================
// SCROLL REVEAL
// ============================================================
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ============================================================
// COUNTERS
// ============================================================
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); observer.unobserve(e.target); } });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const dur = 2000;
  const start = performance.now();
  const update = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// ============================================================
// SECTION OBSERVER (Active Nav)
// ============================================================
function initSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
}

// ============================================================
// RENDER SKILLS
// ============================================================
function renderSkills() {
  // Skill categories
  const layout = document.getElementById('skillsLayout');
  SKILLS_DATA.forEach((cat, i) => {
    const div = document.createElement('div');
    div.className = 'skill-category reveal';
    div.style.animationDelay = `${i * 0.1}s`;
    div.innerHTML = `
      <div class="sc-header">
        <div class="sc-icon">${cat.icon}</div>
        <div class="sc-title">${cat.title}</div>
      </div>
      <div class="sc-items">
        ${cat.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
      </div>
    `;
    layout.appendChild(div);
  });

  // Trigger reveal on skill cards
  setTimeout(() => {
    document.querySelectorAll('.skill-category.reveal').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  }, 100);

  // Skill bars
  const barsContainer = document.getElementById('skillsBars');
  SKILL_BARS.forEach(bar => {
    const item = document.createElement('div');
    item.className = 'skill-bar-item';
    item.innerHTML = `
      <div class="sb-header">
        <span class="sb-name">${bar.name}</span>
        <span class="sb-pct">${bar.pct}%</span>
      </div>
      <div class="sb-track">
        <div class="sb-fill" data-pct="${bar.pct}" style="background: linear-gradient(90deg, ${bar.color}99, ${bar.color});"></div>
      </div>
    `;
    barsContainer.appendChild(item);
  });

  // Animate bars on scroll
  const fills = document.querySelectorAll('.sb-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => { e.target.style.width = e.target.dataset.pct + '%'; }, 200);
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => barObs.observe(f));
}

// ============================================================
// RENDER PROJECTS
// ============================================================
function renderProjects(filter) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.type === filter);
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--clr-text-dim);font-family:var(--font-body);padding:40px;">No projects found for this category.</div>`;
    return;
  }
  filtered.forEach((proj, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.animationDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="pc-banner" style="background: ${proj.banner};">
        <div class="pc-banner-emoji">${proj.emoji}</div>
      </div>
      <div class="pc-body">
        <div class="pc-title-row">
          <div class="pc-name">${proj.name}</div>
          <span class="pc-badge badge-${proj.type}">${proj.type.toUpperCase()}</span>
        </div>
        <p class="pc-desc">${proj.desc}</p>
        <div class="pc-tech-row">
          ${proj.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
        </div>
        <div class="pc-footer">
          <button class="pc-link demo" onclick="openProjectModal('${proj.id}')">🚀 Live Demo</button>
          <a class="pc-link code" href="${proj.codeUrl}" target="_blank">🐙 Code</a>
          <span class="pc-stars">${proj.stars}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.pc-link')) openProjectModal(proj.id);
    });
    grid.appendChild(card);
  });
}

// ============================================================
// PROJECT FILTER
// ============================================================
function initProjectFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
}

// ============================================================
// PROJECT MODAL
// ============================================================
function initProjectModal() {
  const overlay = document.getElementById('projectModalOverlay');
  const closeBtn = document.getElementById('modalClose');
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

window.openProjectModal = function(id) {
  const proj = PROJECTS_DATA.find(p => p.id === id);
  if (!proj) return;
  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div style="height:180px;background:${proj.banner};border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:64px;margin-bottom:24px;">
      ${proj.emoji}
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
      <h2 style="font-family:var(--font-pixel);font-size:12px;color:var(--clr-text);letter-spacing:0.5px;">${proj.name}</h2>
      <span class="pc-badge badge-${proj.type}">${proj.type.toUpperCase()}</span>
      <span style="margin-left:auto;color:var(--clr-gold);font-size:13px;">${proj.stars}</span>
    </div>
    <p style="font-family:var(--font-body);font-size:15px;color:var(--clr-text-muted);line-height:1.7;margin-bottom:20px;">${proj.longDesc}</p>
    <div class="pc-tech-row" style="margin-bottom:24px;">
      ${proj.tech.map(t => `<span class="tech-chip">${t}</span>`).join('')}
    </div>
    <div style="display:flex;gap:12px;">
      <a href="${proj.demoUrl}" class="pc-link demo" target="_blank" style="flex:1;justify-content:center;padding:12px;">🚀 View Live Demo</a>
      <a href="${proj.codeUrl}" class="pc-link code" target="_blank" style="flex:1;justify-content:center;padding:12px;">🐙 View Source Code</a>
    </div>
  `;
  document.getElementById('projectModalOverlay').classList.add('open');
};

function closeModal() {
  document.getElementById('projectModalOverlay').classList.remove('open');
}

// ============================================================
// RENDER TIMELINE
// ============================================================
function renderTimeline() {
  const container = document.getElementById('timeline');
  EXPERIENCE_DATA.forEach((exp, i) => {
    const item = document.createElement('div');
    item.className = 'timeline-item reveal';
    item.style.animationDelay = `${i * 0.15}s`;
    item.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-card">
        <div class="tl-top">
          <div class="tl-title">${exp.title}</div>
          <div class="tl-date">${exp.date}</div>
        </div>
        <div class="tl-company">${exp.company}</div>
        <p class="tl-desc">${exp.desc}</p>
        <div class="tl-tags">
          ${exp.tags.map(t => `<span class="tl-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
    container.appendChild(item);
  });

  // Trigger reveals
  setTimeout(() => {
    document.querySelectorAll('.timeline-item.reveal').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  }, 100);
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  const msgInput = document.getElementById('contactMsg');
  const counter = document.getElementById('msgCounter');

  msgInput.addEventListener('input', () => {
    const len = msgInput.value.length;
    counter.textContent = `${len}/500`;
    if (len > 450) counter.style.color = '#ff6600';
    else counter.style.color = '';
    msgInput.setAttribute('maxlength', '500');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('sendBtn');
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const msg = document.getElementById('contactMsg').value.trim();

    if (!name || !email || !msg) {
      showToast('⚠️ Please fill in all required fields!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('⚠️ Please enter a valid email address!');
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<span>⏳</span><span>Sending...</span>';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<span class="btn-icon">🚀</span><span>Send Message</span><div class="btn-shine"></div>';
      form.reset();
      counter.textContent = '0/500';
      showToast('✅ Message sent! Vishvam will reply soon! 🚀');

      showAchievement('📬', 'Message Delivered!');
    }, 1800);
  });
}

// ============================================================
// APPLY DEFAULT SKIN COLORS
// ============================================================
function initThreeDModel() {
  const container = document.getElementById('threeContainer');
  const canvas = document.getElementById('threeCanvas');
  const loadingEl = document.getElementById('threeCanvasLoading');
  const reloadBtn = document.getElementById('threeModelReloadBtn');
  if (!container || !canvas) return;

  // 1. Scene Setup
  const scene = new THREE.Scene();

  // 2. Camera Setup (Adjust field of view and clipping planes)
  const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.15, 2.6);

  // 3. WebGL Renderer with transparency and shadows enabled
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 4. Orbit Controls (Configure restrictions for focused panning)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.minDistance = 1.8;
  controls.maxDistance = 5.0;
  controls.enablePan = false; // Restrict panning to maintain center focus
  controls.target.set(0, 1.05, 0); // Focus camera orbit around model chest/head height

  // 5. Illumination setup (Premium aesthetic lighting system)
  // Soft ambient background light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  // Cool emerald green highlight light from top right
  const dirLightGreen = new THREE.DirectionalLight(0xffc848, 0.55);
  dirLightGreen.position.set(4, 5, 2);
  scene.add(dirLightGreen);

  // Main white lighting key from top left for true skin/clothing colors
  const dirLightWhite = new THREE.DirectionalLight(0xffffff, 0.85);
  dirLightWhite.position.set(-4, 5, 3);
  scene.add(dirLightWhite);

  // Upward turquoise rim light for back depth
  const dirLightBlue = new THREE.DirectionalLight(0xf6b93b, 0.35);
  dirLightBlue.position.set(0, -3, -2);
  scene.add(dirLightBlue);

  // Dynamic spotlight glowing behind the character that follows mouse movements
  const followLight = new THREE.PointLight(0xffc848, 0, 5);
  followLight.position.set(0, 1, 1);
  scene.add(followLight);

  // The exported GLTF face texture points away from the camera by default.
  const characterBaseRotation = Math.PI;
  let modelMixer = null;
  let hasModelAnimations = false;
  const modelActions = [];

  // 6. Loading the 3D Character Model (GLTF with embedded skin texture)
  const gltfLoader = new GLTFLoader();
  gltfLoader.load('model.gltf', (gltf) => {
      const object = gltf.scene;

      object.traverse((child) => {
        if (!child.isMesh) return;

        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => {
          if (material?.map) {
            material.map.magFilter = THREE.NearestFilter;
            material.map.minFilter = THREE.NearestFilter;
            material.map.colorSpace = THREE.SRGBColorSpace;
          }
        });
      });

      // Hide and clean up the retro pixel spinner loader
      if (loadingEl) {
        loadingEl.style.opacity = '0';
        setTimeout(() => loadingEl.remove(), 400);
      }

      // Automatically center the imported GLTF mesh using standard bounding box math
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      
      // Move model feet exactly to the base grid/origin coordinate y=0
      object.position.y -= box.min.y;
      object.position.x = -center.x;
      object.position.z = -center.z;

      // Add Model to Scene
      object.rotation.y = characterBaseRotation;
      scene.add(object);

      // Play embedded GLTF animations in a continuous loop when available.
      if (gltf.animations && gltf.animations.length > 0) {
        modelMixer = new THREE.AnimationMixer(object);
        gltf.animations.forEach((clip) => {
          const action = modelMixer.clipAction(clip);
          action.setLoop(THREE.LoopOnce, 1);
          action.clampWhenFinished = true;
          action.enabled = true;
          action.play();
          modelActions.push(action);
        });
        hasModelAnimations = true;
      }
      
      // Cache character globally for interactive callbacks
      window.minecraftDude = object;
      
      // Unlock a secret achievement when the 3D model finishes rendering!
      if (window.showAchievement) {
        setTimeout(() => {
          window.showAchievement('🧱', '3D Model Loaded!');
        }, 1200);
      }
  }, 
  // Loading progress callback
  (xhr) => {
    if (xhr.lengthComputable) {
      const percent = Math.round((xhr.loaded / xhr.total) * 100);
      if (loadingEl) {
        loadingEl.querySelector('span').textContent = `Loading: ${percent}%`;
      }
    }
  },
  // Loading error callback
  (error) => {
    console.error('An error happened while loading the GLTF model:', error);
    if (loadingEl) {
      loadingEl.querySelector('span').textContent = 'Error Loading Model';
    }
  });

  if (reloadBtn) {
    reloadBtn.addEventListener('click', () => {
      if (!modelActions.length) return;
      modelActions.forEach((action) => {
        action.reset();
        action.play();
      });
    });
  }

  // Track cursor position to update interactive lights
  let mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    // Translate client coordinates to normalized viewport bounds (-1 to +1)
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Smooth spotlight track calculation
    const distance = Math.hypot(
      e.clientX - (rect.left + rect.width / 2),
      e.clientY - (rect.top + rect.height / 2)
    );
    
    if (distance < 500 && window.minecraftDude) {
      const scaleFactor = (500 - distance) / 500;
      followLight.intensity = scaleFactor * 1.8;
      followLight.position.x = mouse.x * 2.2;
      followLight.position.y = 1.2 + mouse.y * 1.8;
    } else {
      followLight.intensity = 0;
    }
  });

  // 7. Core animation frame loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    if (modelMixer) modelMixer.update(delta);

    // Check if the user is currently rotating/orbiting the mesh
    // OrbitControls set state > -1 when actively interacting
    const isDragging = controls.state !== -1;

    if (window.minecraftDude && !hasModelAnimations) {
      if (!isDragging) {
        // Slow idle float vertically
        window.minecraftDude.position.y = Math.sin(elapsedTime * 2.2) * 0.05 + 0.02;
        // Slow rotation
        window.minecraftDude.rotation.y = characterBaseRotation + Math.sin(elapsedTime * 0.45) * 0.2;
      } else {
        // Interpolate character height back to baseline floor smooth
        window.minecraftDude.position.y += (0 - window.minecraftDude.position.y) * 0.15;
      }
    }

    // Apply OrbitControl damping and updates
    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // 8. Dynamic resizing listener to keep the WebGL canvas proportional
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

function applyPixelTextureFiltering(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (material?.map) {
        material.map.magFilter = THREE.NearestFilter;
        material.map.minFilter = THREE.NearestFilter;
        material.map.colorSpace = THREE.SRGBColorSpace;
      }
    });
  });
}

function initOriginHeadModel() {
  const canvas = document.getElementById('originHeadCanvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1.45, 1.45, 1.45, -1.45, 0.1, 100);
  camera.position.set(0, 0, 5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    preserveDrawingBuffer: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 1.1));

  const keyLight = new THREE.DirectionalLight(0xffffff, 0.95);
  keyLight.position.set(-2, 3, 4);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xffc848, 0.45);
  rimLight.position.set(3, 2, -2);
  scene.add(rimLight);

  const loader = new GLTFLoader();
  let headModel = null;
  let headPivot = null;
  const faceForwardRotationY = -Math.PI / 2;
  const baseRotationY = faceForwardRotationY - 0.35;

  loader.load('player%20head.gltf', (gltf) => {
    headModel = gltf.scene;
    applyPixelTextureFiltering(headModel);

    const box = new THREE.Box3().setFromObject(headModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z) || 1;

    headPivot = new THREE.Group();
    headModel.position.set(-center.x, -center.y, -center.z);
    headPivot.scale.setScalar(1.72 / maxSize);
    headPivot.rotation.y = baseRotationY;
    headPivot.rotation.x = -0.12;
    headPivot.add(headModel);
    scene.add(headPivot);
  }, null, (error) => {
    console.error('An error happened while loading the origin head model:', error);
  });

  const clock = new THREE.Clock();
  function animateHead() {
    requestAnimationFrame(animateHead);
    const elapsedTime = clock.getElapsedTime();

    if (headPivot) {
      headPivot.rotation.y = baseRotationY + Math.sin(elapsedTime * 0.8) * 0.12;
      headPivot.rotation.x = -0.12 + Math.sin(elapsedTime * 1.1) * 0.04;
    }

    renderer.render(scene, camera);
  }

  animateHead();

  window.addEventListener('resize', () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

function initBrandHeadLogos() {
  const canvases = document.querySelectorAll('.brand-head-canvas');
  if (!canvases.length) return;

  canvases.forEach((canvas) => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.5, 1.5, 1.5, -1.5, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      preserveDrawingBuffer: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(-2, 3, 4);
    scene.add(keyLight);

    const goldLight = new THREE.DirectionalLight(0xffc848, 0.5);
    goldLight.position.set(3, 2, -2);
    scene.add(goldLight);

    let logoHead = null;
    const loader = new GLTFLoader();
    const baseRotationY = -Math.PI / 2 - 0.25;

    loader.load('player%20head.gltf', (gltf) => {
      const model = gltf.scene;
      applyPixelTextureFiltering(model);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z) || 1;

      logoHead = new THREE.Group();
      model.position.set(-center.x, -center.y, -center.z);
      logoHead.scale.setScalar(1.9 / maxSize);
      logoHead.rotation.set(-0.08, baseRotationY, 0);
      logoHead.add(model);
      scene.add(logoHead);
    }, null, (error) => {
      console.error('An error happened while loading the brand head logo:', error);
    });

    const clock = new THREE.Clock();
    function animateLogoHead() {
      requestAnimationFrame(animateLogoHead);
      if (logoHead) {
        logoHead.rotation.y = baseRotationY + Math.sin(clock.getElapsedTime() * 0.9) * 0.1;
      }
      renderer.render(scene, camera);
    }

    animateLogoHead();
  });
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, duration = 3500) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ============================================================
// ACHIEVEMENT POPUP
// ============================================================
function showAchievement(icon, name) {
  const popup = document.getElementById('achievementPopup');
  document.getElementById('achIcon').textContent = icon;
  document.getElementById('achName').textContent = name;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 4000);
}

// ============================================================
// DOWNLOAD CV BUTTON
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const cvBtn = document.getElementById('downloadCvBtn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('📄 CV download starting...');
      showAchievement('📄', 'CV Downloaded!');
    });
  }
});

// ============================================================
// KONAMI CODE EASTER EGG 🕹️
// ============================================================
function initKonamiCode() {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let i = 0;
  document.addEventListener('keydown', e => {
    if (e.key === code[i]) {
      i++;
      if (i === code.length) {
        i = 0;
        // Flash the whole page green
        document.body.style.transition = 'filter 0.2s ease';
        document.body.style.filter = 'hue-rotate(120deg) brightness(1.5)';
        setTimeout(() => { document.body.style.filter = ''; }, 800);
        showAchievement('🌌', 'Konami Master!');
        showToast('🌌 Konami Code! You found the Easter Egg!', 5000);
      }
    } else { i = 0; }
  });
}

// ============================================================
// CURSOR TRAIL (subtle pixel trail on mouse move)
// ============================================================
(function() {
  const trail = [];
  const MAX = 8;
  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:4px;height:4px;background:rgba(255,204,72,0.6);
      border-radius:1px;pointer-events:none;z-index:9999;
      image-rendering:pixelated;
      transition:opacity 0.4s ease, transform 0.4s ease;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
    if (trail.length > MAX) {
      const old = trail.shift();
      old.remove();
    }
    setTimeout(() => { dot.style.opacity = '0'; dot.style.transform = 'scale(0)'; }, 50);
    setTimeout(() => { if (dot.parentNode) dot.remove(); }, 500);
  });
})();
