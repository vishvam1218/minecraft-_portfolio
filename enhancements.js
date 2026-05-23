/* ===================================================
   VISHCRAFT — UI ENHANCEMENTS
   enhancements.js
   =================================================== */

(function () {
  'use strict';

  /* ================================================================
     CUSTOM PIXEL CURSOR
     ================================================================ */
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    // Ring follows with a slight lag
    function animateCursor() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousedown', () => {
      dot.classList.add('clicking');
      ring.classList.add('clicking');
    });
    document.addEventListener('mouseup', () => {
      dot.classList.remove('clicking');
      ring.classList.remove('clicking');
    });

    // Enlarge ring on hovering interactive elements
    document.querySelectorAll('a, button, [role="button"], input, textarea, .project-card, .skill-tag, .filter-btn, .contact-link-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '50px';
        ring.style.height = '50px';
        ring.style.borderColor = 'rgba(255,212,90,0.8)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '30px';
        ring.style.height = '30px';
        ring.style.borderColor = 'rgba(255,212,90,0.5)';
      });
    });

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }

  /* ================================================================
     SCROLL TO TOP BUTTON
     ================================================================ */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ================================================================
     TYPEWRITER EFFECT on hero "title-sub"
     ================================================================ */
  const titleSub = document.querySelector('.title-sub');
  if (titleSub) {
    const text = titleSub.textContent.trim();
    titleSub.textContent = '';
    titleSub.style.borderRight = '3px solid var(--clr-emerald)';
    titleSub.style.paddingRight = '4px';
    titleSub.style.whiteSpace = 'nowrap';

    let i = 0;
    const speed = 55;
    let started = false;

    // Start typewriter 1.2 seconds after page ready
    function startTypewriter() {
      if (started) return;
      started = true;

      function type() {
        if (i < text.length) {
          titleSub.textContent += text[i++];
          setTimeout(type, speed + Math.random() * 30);
        } else {
          // Blinking cursor
          let visible = true;
          setInterval(() => {
            titleSub.style.borderRightColor = (visible = !visible)
              ? 'var(--clr-emerald)'
              : 'transparent';
          }, 530);
        }
      }
      setTimeout(type, 1200);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startTypewriter);
    } else {
      startTypewriter();
    }
  }

  /* ================================================================
     SECTION HEADERS — staggered reveal for section badges + titles
     ================================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.section-header');
    const hObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const badge    = e.target.querySelector('.section-badge');
        const title    = e.target.querySelector('.section-title');
        const subtitle = e.target.querySelector('.section-subtitle');
        if (badge)    { badge.style.cssText    = 'animation: fadeInDown 0.5s ease both;'; }
        if (title)    { title.style.cssText    = 'animation: fadeInDown 0.5s ease 0.1s both; opacity:0;'; setTimeout(() => { title.style.opacity = ''; }, 50); }
        if (subtitle) { subtitle.style.cssText = 'animation: fadeInDown 0.5s ease 0.2s both; opacity:0;'; setTimeout(() => { subtitle.style.opacity = ''; }, 50); }
        hObs.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    headers.forEach(h => hObs.observe(h));

    /* ---- Player name glow cycling ---- */
    const nameEl = document.querySelector('.player-name-display');
    if (nameEl) {
      nameEl.classList.add('player-name-glow');
    }

    /* ---- Timeline dots pulse on enter ---- */
    const dots = document.querySelectorAll('.tl-dot');
    const dotObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.animation = 'tlDotPulse 0.5s ease both';
          dotObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    dots.forEach(d => dotObs.observe(d));

    /* ---- Stagger project cards on filter change ---- */
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(m => {
        if (m.addedNodes.length) {
          m.addedNodes.forEach((node, i) => {
            if (node.classList && node.classList.contains('project-card')) {
              node.style.animationDelay = `${i * 0.07}s`;
            }
          });
        }
      });
    });
    const grid = document.getElementById('projectsGrid');
    if (grid) observer.observe(grid, { childList: true });

    /* ---- Contact links — hover scan line effect ---- */
    document.querySelectorAll('.contact-link-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.boxShadow = 'inset 3px 0 0 var(--clr-emerald)';
      });
      item.addEventListener('mouseleave', () => {
        item.style.boxShadow = '';
      });
    });
  });

})();
