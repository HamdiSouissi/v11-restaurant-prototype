/** BRACE — cottura (cooking level) selector */
(function () {
  'use strict';

  function initCottura() {
    const data = (window.CONFIG && window.CONFIG.cottura) || [];
    if (!data.length) return;

    const steps = document.querySelectorAll('.brace__step[data-cottura]');
    const tempEl = document.getElementById('brace-temp');
    const timeEl = document.getElementById('brace-time');
    const gradientEl = document.getElementById('brace-meat-gradient');

    // Color gradients for each cooking level (from rare to well-done)
    const gradients = [
      'linear-gradient(90deg, #6e1010 0%, #8a2020 50%, #6e1010 100%)',      // Al sangue
      'linear-gradient(90deg, #8a2020 0%, #a83030 50%, #8a2020 100%)',      // Media
      'linear-gradient(90deg, #7a3828 0%, #9a4838 50%, #7a3828 100%)',      // Media cottura
      'linear-gradient(90deg, #5a2a1a 0%, #7a3a2a 50%, #5a2a1a 100%)',      // Ben cotta
    ];

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
      if (gradientEl) {
        gradientEl.style.background = gradients[idx] || gradients[0];
      }
    }

    steps.forEach(s => s.addEventListener('click', () => activate(s.dataset.cottura)));

    // Init with first
    if (data.length) activate(data[0].key);
  }

  document.addEventListener('DOMContentLoaded', initCottura);
})();
