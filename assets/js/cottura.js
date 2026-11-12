/** BRACE — cottura (cooking level) selector */
(function () {
  'use strict';

  function initCottura() {
    const data = (window.CONFIG && window.CONFIG.cottura) || [];
    if (!data.length) return;

    const steps = document.querySelectorAll('.brace__step[data-cottura]');
    const tempEl = document.getElementById('brace-temp');
    const timeEl = document.getElementById('brace-time');
    const thumb = document.querySelector('.brace__slider-thumb');
    const svg = document.getElementById('brace-meat-svg');
    const meatPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    meatPath.setAttribute('d', 'M30,70 Q100,20 170,40 Q190,80 160,110 Q90,120 30,70Z');
    meatPath.setAttribute('fill', '#5a1414');
    meatPath.setAttribute('stroke', '#2a0808');
    meatPath.setAttribute('stroke-width', '1.5');
    svg?.appendChild(meatPath);

    // Marbling veins
    const veins = [];
    for (let i = 0; i < 5; i++) {
      const v = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      v.setAttribute('d', `M${50 + i * 25},${50 + (i % 2) * 20} Q${70 + i * 18},${70 + (i % 2) * 10} ${90 + i * 15},${55 + (i % 2) * 15}`);
      v.setAttribute('fill', 'none');
      v.setAttribute('stroke', 'rgba(255,255,255,0.35)');
      v.setAttribute('stroke-width', '1.2');
      v.setAttribute('stroke-linecap', 'round');
      svg?.appendChild(v);
      veins.push(v);
    }

    // Color map: deep red -> brown
    const colors = ['#6e1010', '#8a2020', '#7a3828', '#5a2a1a'];

    function activate(key) {
      const idx = data.findIndex(c => c.key === key);
      if (idx === -1) return;
      const c = data[idx];

      steps.forEach(s => {
        const active = s.dataset.cottura === key;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-pressed', active ? 'true' : 'false');
      });

      if (tempEl) tempEl.textContent = `${c.temp}°C`;
      if (timeEl) timeEl.textContent = `${c.time} min`;
      if (thumb) {
        const total = steps.length;
        const left = (idx / (total - 1)) * 100;
        thumb.style.left = `calc(${left}% - 20px)`;
      }
      if (meatPath) {
        meatPath.setAttribute('fill', colors[idx] || colors[0]);
        meatPath.style.transition = 'fill 600ms';
      }
      // Fade veins as cooking increases
      const veinOpacity = Math.max(0.05, 0.4 - idx * 0.1);
      veins.forEach(v => v.setAttribute('stroke', `rgba(255,255,255,${veinOpacity})`));
    }

    steps.forEach(s => s.addEventListener('click', () => activate(s.dataset.cottura)));

    // Init with first
    if (data.length) activate(data[0].key);
  }

  document.addEventListener('DOMContentLoaded', initCottura);
})();
