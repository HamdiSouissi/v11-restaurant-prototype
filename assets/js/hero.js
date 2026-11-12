/** BRACE — hero lantern + live oven counter */
(function () {
  'use strict';

  function initLantern() {
    const lantern = document.getElementById('hero-lantern');
    const hero = document.getElementById('hero');
    if (!lantern || !hero) return;
    if (window.matchMedia('(hover: none)').matches) {
      // slow drifting glow on mobile
      let phase = 0;
      function drift() {
        phase += 0.004;
        const x = 50 + Math.sin(phase) * 22;
        const y = 50 + Math.cos(phase * 0.7) * 18;
        lantern.style.background = `radial-gradient(circle 280px at ${x}% ${y}%, rgba(229,138,58,0.08), transparent 70%)`;
        lantern.style.opacity = '1';
        requestAnimationFrame(drift);
      }
      drift();
      return;
    }

    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      lantern.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(229,138,58,0.10), transparent 70%)`;
      lantern.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', () => { lantern.style.opacity = '0'; });
  }

  function initOvenClock() {
    const el = document.getElementById('hero-oven-time');
    const label = document.getElementById('hero-oven-label');
    if (!el) return;
    const C = window.CONFIG;
    if (!C || !C.oven) return;

    // Determine if the oven is currently on (between daily_start and 23:59, Tue-Sun)
    const now = new Date();
    const dow = now.getDay(); // 0 Sun … 6 Sat; Monday = 1 in ISO but JS: Mon=1
    const isMonday = dow === 1;
    const [sh, sm] = (C.oven.daily_start || '17:00').split(':').map(Number);
    const startTime = new Date(now);
    startTime.setHours(sh, sm, 0, 0);

    function tick() {
      const n = new Date();
      const startedToday = n >= startTime && !isMonday;
      if (startedToday) {
        const diff = n - startTime;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        if (label) label.textContent = (window.I18N?.it?.oven_on_since) || 'Forno acceso da';
      } else {
        el.textContent = '';
        if (label) label.textContent = (window.I18N?.it?.oven_starts_at) || 'Il forno si accende alle 17:00';
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLantern();
    initOvenClock();
  });
})();
