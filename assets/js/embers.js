/** BRACE — ember canvas particles (hero + footer) */
(function () {
  'use strict';

  const EMBERS = {
    hero: null,
    footer: null
  };

  function createEmberCanvas(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    let W, H, dpr;
    const particles = [];
    let running = false;
    let mouseX = -9999, mouseY = -9999;
    let rafId = null;
    let visible = true;

    const { count = 100, color = [229, 138, 58], maxLife = 180 } = options;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      return {
        x: Math.random() * W,
        y: H + 20,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(0.5 + Math.random() * 1.2),
        life: Math.floor(maxLife * (0.5 + Math.random() * 0.5)),
        maxLife,
        size: 1 + Math.random() * 2.2,
        alpha: 0.3 + Math.random() * 0.7,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
      };
    }

    function tick() {
      if (!visible) { rafId = requestAnimationFrame(tick); return; }
      ctx.clearRect(0, 0, W, H);

      // Top up particles
      while (particles.length < count) particles.push(spawn());

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.25;
        p.y += p.vy;
        p.life--;

        // Mouse repulsion / attraction (subtle)
        const dx = p.x - mouseX, dy = p.y - mouseY;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 120) {
          p.vx += (dx / d) * 0.08;
          p.vy += (dy / d) * 0.04;
        }

        // Fade in + fade out
        const lifeRatio = p.life / p.maxLife;
        let alpha = p.alpha;
        if (lifeRatio > 0.85) alpha *= (1 - lifeRatio) / 0.15;
        else if (lifeRatio < 0.25) alpha *= lifeRatio / 0.25;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.8})`;
        ctx.fill();

        // glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        grad.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.25})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0 || p.y < -20) { particles.splice(i, 1); }
      }

      // Gentle slow flicker on alpha (< 1 Hz — photosensitive safe)
      const flicker = 0.92 + 0.08 * Math.sin(performance.now() * 0.0008);
      ctx.globalAlpha = flicker;

      rafId = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      resize();
      tick();
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
    }

    function setVisible(v) { visible = v; }

    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    });
    canvas.addEventListener('mouseleave', () => { mouseX = mouseY = -9999; });

    window.addEventListener('resize', () => { if (running) resize(); });

    // Pause when tab hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) setVisible(false);
      else setVisible(true);
    });

    // Reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return { start: () => {}, stop, setVisible };
    }

    return { start, stop, setVisible, canvas };
  }

  function initHeroEmbers() {
    const count = window.innerWidth < 768 ? 40 : 120;
    EMBERS.hero = createEmberCanvas('hero-embers', {
      count,
      color: [229, 138, 58],
      maxLife: 200,
    });
    if (EMBERS.hero) {
      // Start only when hero is near viewport
      const st = window.ScrollTrigger;
      if (st) {
        st.create({
          trigger: '#hero',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => EMBERS.hero.setVisible(true),
          onLeave: () => EMBERS.hero.setVisible(false),
          onEnterBack: () => EMBERS.hero.setVisible(true),
          onLeaveBack: () => EMBERS.hero.setVisible(false),
        });
      }
      EMBERS.hero.start();
    }
  }

  function initFooterEmbers() {
    EMBERS.footer = createEmberCanvas('footer-embers', {
      count: window.innerWidth < 768 ? 30 : 80,
      color: [229, 138, 58],
      maxLife: 160,
    });
    if (EMBERS.footer) {
      const st = window.ScrollTrigger;
      if (st) {
        st.create({
          trigger: '#footer',
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => EMBERS.footer.setVisible(true),
          onLeave: () => EMBERS.footer.setVisible(false),
          onEnterBack: () => EMBERS.footer.setVisible(true),
          onLeaveBack: () => EMBERS.footer.setVisible(false),
        });
      }
      EMBERS.footer.start();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initHeroEmbers();
    initFooterEmbers();
    window.BRACE_EMBERS = EMBERS;
  });
})();
