/** BRACE — pizza builder */
(function () {
  'use strict';

  const state = {
    impasto: null,
    base: null,
    toppings: [],
    finishes: [],
    basePrice: 7,
  };

  const TOPPING_COLORS = {
    bufala: '#F5EFE0',
    salsiccia: '#7a4020',
    funghi: '#9a8a6a',
    prosciutto: '#c9766a',
    rucola: '#4a7a3a',
    olive: '#2a2a2a',
    peperoncino: '#a82010',
    grana: '#E8E0C8',
  };
  const FINISH_COLORS = {
    'olio-tartufo': '#3a2a1a',
    'basilico': '#3a6a2a',
    'olio-piccante': '#a82010',
  };
  const BASE_COLORS = {
    rossa: '#7a1a0a',
    bianca: '#F5EFE0',
    marinara: '#6a1a08',
  };

  function initBuilder() {
    const C = window.CONFIG;
    if (!C || !C.builder) return;
    state.basePrice = C.builder.base_price || 7;

    const opts = document.querySelectorAll('.builder__opt');
    const priceEl = document.getElementById('builder-price');
    const missingEl = document.getElementById('builder-missing');
    const addBtn = document.getElementById('builder-add-btn');
    const toppingCounter = document.querySelector('.builder__topping-counter');
    const baseCircle = document.querySelector('.builder-base');
    const toppingsGroup = document.querySelector('.builder-toppings');

    function updatePrice() {
      let total = state.basePrice;
      if (state.impasto) {
        const d = C.builder.impasti.find(i => i.key === state.impasto);
        if (d) total += d.extra;
      }
      state.toppings.forEach(k => {
        const t = C.builder.toppings.find(x => x.key === k);
        if (t) total += t.extra;
      });
      state.finishes.forEach(k => {
        const f = C.builder.finishes.find(x => x.key === k);
        if (f) total += f.extra;
      });
      if (priceEl) priceEl.textContent = `€ ${total.toFixed(2).replace('.', ',')}`;

      // Missing info
      const missing = [];
      if (!state.impasto) missing.push('l\'impasto');
      if (!state.base) missing.push('la base');
      if (missingEl) missingEl.textContent = missing.length ? `(Manca ancora: ${missing.join(', ')})` : '';
      if (addBtn) addBtn.disabled = missing.length > 0;

      if (toppingCounter) toppingCounter.textContent = `${state.toppings.length}/4`;
    }

    function drawPizza() {
      if (!baseCircle || !toppingsGroup) return;
      // Base color
      baseCircle.setAttribute('fill', BASE_COLORS[state.base] || '#3A2A1E');

      // Toppings
      toppingsGroup.innerHTML = '';
      state.toppings.forEach((key, i) => {
        const color = TOPPING_COLORS[key] || '#888';
        const angle = (i / Math.max(1, state.toppings.length)) * Math.PI * 2 + (key.length * 0.3);
        const r = 50 + (i * 17 % 70);
        const cx = 200 + Math.cos(angle) * r;
        const cy = 200 + Math.sin(angle) * r;
        const size = 8 + (i % 3) * 3;
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', cx);
        c.setAttribute('cy', cy);
        c.setAttribute('r', 0);
        c.setAttribute('fill', color);
        c.setAttribute('opacity', '0.9');
        toppingsGroup.appendChild(c);
        // animate drop
        requestAnimationFrame(() => {
          c.style.transform = `translate(0, -80px)`;
          c.style.transition = 'transform 500ms cubic-bezier(0.22,1,0.36,1)';
          requestAnimationFrame(() => {
            c.setAttribute('r', size);
            c.style.transform = '';
          });
        });
      });

      // Finishes (oil drops)
      state.finishes.forEach((key, i) => {
        const color = FINISH_COLORS[key] || '#a82010';
        const angle = (i / Math.max(1, state.finishes.length)) * Math.PI * 2 + 1;
        const r = 30 + i * 20;
        const cx = 200 + Math.cos(angle) * r;
        const cy = 200 + Math.sin(angle) * r;
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', cx);
        c.setAttribute('cy', cy);
        c.setAttribute('r', 4);
        c.setAttribute('fill', color);
        c.setAttribute('opacity', '0.6');
        toppingsGroup.appendChild(c);
      });
    }

    // Step activation
    const steps = document.querySelectorAll('.builder__step');
    function activateStep(name) {
      steps.forEach(s => s.classList.toggle('is-active', s.dataset.step === name));
    }

    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.group;
        const key = btn.dataset.key;
        const price = parseFloat(btn.dataset.price) || 0;

        if (group === 'impasto') {
          state.impasto = state.impasto === key ? null : key;
          document.querySelectorAll('.builder__opt[data-group="impasto"]').forEach(b => b.classList.toggle('is-selected', b.dataset.key === state.impasto));
          activateStep('base');
        } else if (group === 'base') {
          state.base = state.base === key ? null : key;
          document.querySelectorAll('.builder__opt[data-group="base"]').forEach(b => b.classList.toggle('is-selected', b.dataset.key === state.base));
          activateStep('toppings');
        } else if (group === 'topping') {
          const idx = state.toppings.indexOf(key);
          if (idx === -1) {
            if (state.toppings.length >= 4) return;
            state.toppings.push(key);
          } else {
            state.toppings.splice(idx, 1);
          }
          document.querySelectorAll('.builder__opt[data-group="topping"]').forEach(b => b.classList.toggle('is-selected', state.toppings.includes(b.dataset.key)));
        } else if (group === 'finish') {
          const idx = state.finishes.indexOf(key);
          if (idx === -1) state.finishes.push(key);
          else state.finishes.splice(idx, 1);
          document.querySelectorAll('.builder__opt[data-group="finish"]').forEach(b => b.classList.toggle('is-selected', state.finishes.includes(b.dataset.key)));
        }

        updatePrice();
        drawPizza();
      });
    });

    // Add pizza to cart
    addBtn?.addEventListener('click', () => {
      if (addBtn.disabled) return;
      let total = state.basePrice;
      if (state.impasto) {
        const d = C.builder.impasti.find(i => i.key === state.impasto);
        if (d) total += d.extra;
      }
      state.toppings.forEach(k => {
        const t = C.builder.toppings.find(x => x.key === k);
        if (t) total += t.extra;
      });
      state.finishes.forEach(k => {
        const f = C.builder.finishes.find(x => x.key === k);
        if (f) total += f.extra;
      });

      const impLabel = C.builder.impasti.find(i => i.key === state.impasto)?.label_it || '';
      const baseLabel = C.builder.basi.find(b => b.key === state.base)?.label_it || '';
      const topLabels = state.toppings.map(k => C.builder.toppings.find(x => x.key === k)?.label_it).filter(Boolean).join(', ');

      const name = `Pizza ${impLabel} · ${baseLabel}${topLabels ? ' · ' + topLabels : ''}`;

      if (window.BRACE_CART) {
        window.BRACE_CART.add({ slug: 'pizza-su-misura', name, price: total });
      }

      // Reset
      state.impasto = null;
      state.base = null;
      state.toppings = [];
      state.finishes = [];
      document.querySelectorAll('.builder__opt').forEach(b => b.classList.remove('is-selected'));
      activateStep('impasto');
      updatePrice();
      drawPizza();
    });

    // Init
    activateStep('impasto');
    updatePrice();
    drawPizza();
  }

  document.addEventListener('DOMContentLoaded', initBuilder);
})();
