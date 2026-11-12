/** BRACE — cart (localStorage-persistent drawer) */
(function () {
  'use strict';

  const STORAGE_KEY = 'brace_cart_v1';
  let state = { items: [], mode: 'delivery' };
  let lastRemoved = null;

  const C = window.CONFIG;
  const deliveryFee = C?.delivery?.fee || 2.50;
  const freeAbove = C?.delivery?.free_above || 25;
  const minimum = C?.delivery?.minimum || 12;

  function load() {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      if (s) state = JSON.parse(s);
    } catch (e) {}
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function subtotal() {
    return state.items.reduce((s, it) => s + it.price * it.qty, 0);
  }

  function itemCount() {
    return state.items.reduce((s, it) => s + it.qty, 0);
  }

  function render() {
    // Update counts in header + mobile bar
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = itemCount(); });

    const empty = document.getElementById('cart-empty');
    const list = document.getElementById('cart-items');
    const footer = document.getElementById('cart-footer');
    const feeRow = document.getElementById('cart-fee-row');
    const deliveryBar = document.getElementById('cart-delivery-bar');
    const deliveryFill = document.getElementById('cart-delivery-fill');
    const deliveryMsg = document.getElementById('cart-delivery-msg');
    const subtotalEl = document.getElementById('cart-subtotal');
    const feeEl = document.getElementById('cart-fee');
    const totalEl = document.getElementById('cart-total');

    if (!list) return;
    list.innerHTML = '';

    if (state.items.length === 0) {
      if (empty) empty.style.display = '';
      if (footer) footer.hidden = true;
      return;
    }

    if (empty) empty.style.display = 'none';
    if (footer) footer.hidden = false;

    state.items.forEach((it, i) => {
      const li = document.createElement('li');
      li.className = 'cart-drawer__item';
      li.innerHTML = `
        <img class="cart-drawer__item-img" src="/assets/img/piatti/${it.slug}.webp" alt="" width="64" height="64" loading="lazy" onerror="this.style.display='none'">
        <div>
          <div class="cart-drawer__item-name">${it.name}</div>
          <div class="cart-drawer__item-price">€ ${(it.price * it.qty).toFixed(2).replace('.', ',')}</div>
          <div class="cart-drawer__item-qty">
            <button type="button" data-act="dec" data-idx="${i}">−</button>
            <span>${it.qty}</span>
            <button type="button" data-act="inc" data-idx="${i}">+</button>
          </div>
        </div>
        <button type="button" class="cart-drawer__item-remove" data-act="remove" data-idx="${i}">Togli</button>
      `;
      list.appendChild(li);
    });

    list.querySelectorAll('[data-act]').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = +btn.dataset.idx;
        const act = btn.dataset.act;
        if (act === 'inc') state.items[idx].qty++;
        else if (act === 'dec') {
          state.items[idx].qty--;
          if (state.items[idx].qty <= 0) state.items.splice(idx, 1);
        } else if (act === 'remove') {
          lastRemoved = { item: state.items[idx], idx };
          state.items.splice(idx, 1);
          const dict = window.I18N?.[window.BRACE_I18N?.getLang() || 'it'] || {};
          if (window.BRACE_TOAST) {
            window.BRACE_TOAST.info(`${lastRemoved.item.name} — ${dict.undo_remove || 'Tolto dall\'ordine. Annulla'}`, 'Annulla');
          }
          setTimeout(() => { if (lastRemoved && lastRemoved.idx === idx) lastRemoved = null; }, 5000);
        }
        save(); render();
      });
    });

    const sub = subtotal();
    const isDelivery = state.mode === 'delivery';
    const fee = isDelivery ? (sub >= freeAbove ? 0 : deliveryFee) : 0;
    const total = sub + fee;

    if (subtotalEl) subtotalEl.textContent = `€ ${sub.toFixed(2).replace('.', ',')}`;
    if (feeRow) feeRow.hidden = !isDelivery;
    if (feeEl) feeEl.textContent = fee === 0 ? 'Gratis' : `€ ${fee.toFixed(2).replace('.', ',')}`;
    if (totalEl) totalEl.textContent = `€ ${total.toFixed(2).replace('.', ',')}`;

    if (isDelivery) {
      if (deliveryBar) deliveryBar.hidden = sub === 0;
      const remaining = Math.max(0, freeAbove - sub);
      const pct = Math.min(100, (sub / freeAbove) * 100);
      if (deliveryFill) deliveryFill.style.width = `${pct}%`;
      if (deliveryMsg) {
        const dict = window.I18N?.[window.BRACE_I18N?.getLang() || 'it'] || {};
        deliveryMsg.textContent = remaining > 0
          ? (dict.free_above || 'Ancora € %s e la consegna è gratis').replace('%s', remaining.toFixed(2).replace('.', ','))
          : 'Consegna gratuita';
      }
    } else {
      if (deliveryBar) deliveryBar.hidden = true;
    }
  }

  function open() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) { drawer.hidden = false; requestAnimationFrame(() => drawer.classList.add('is-open')); }
    document.body.style.overflow = 'hidden';
    document.getElementById('cart-close')?.focus();
  }

  function close() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) { drawer.classList.remove('is-open'); setTimeout(() => drawer.hidden = true, 350); }
    document.body.style.overflow = '';
  }

  function undoRemove() {
    if (!lastRemoved) return;
    state.items.splice(lastRemoved.idx, 0, lastRemoved.item);
    lastRemoved = null;
    save(); render();
  }

  function add(item) {
    const existing = state.items.find(it => it.slug === item.slug);
    if (existing) existing.qty++;
    else state.items.push({ slug: item.slug, name: item.name, price: item.price, qty: 1 });
    save(); render();
    const dict = window.I18N?.[window.BRACE_I18N?.getLang() || 'it'] || {};
    if (window.BRACE_TOAST) {
      const msg = (dict.item_added || '%s aggiunta all\'ordine.').replace('%s', item.name);
      window.BRACE_TOAST.info(msg);
    }
    open();
  }

  function checkout() {
    close();
    setTimeout(() => {
      const modal = document.getElementById('checkout-modal');
      if (modal) { modal.hidden = false; requestAnimationFrame(() => modal.classList.add('is-open')); }
      if (window.BRACE_CHECKOUT) window.BRACE_CHECKOUT.reset();
    }, 360);
  }

  function setMode(m) {
    state.mode = m;
    document.querySelectorAll('.cart-drawer__mode-btn').forEach(b => b.classList.toggle('is-active', b.dataset.mode === m));
    save(); render();
  }

  function reset() {
    state = { items: [], mode: state.mode };
    save(); render();
  }

  function init() {
    load();

    document.getElementById('nav-order-btn')?.addEventListener('click', open);
    document.getElementById('cart-close')?.addEventListener('click', close);
    document.getElementById('cart-backdrop')?.addEventListener('click', close);
    document.getElementById('cart-go-menu')?.addEventListener('click', () => {
      close();
      setTimeout(() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' }), 360);
    });
    document.getElementById('cart-checkout-btn')?.addEventListener('click', checkout);
    document.querySelectorAll('.cart-drawer__mode-btn').forEach(b => {
      b.addEventListener('click', () => setMode(b.dataset.mode));
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

    // Init mode buttons active state
    document.querySelectorAll('.cart-drawer__mode-btn').forEach(b => b.classList.toggle('is-active', b.dataset.mode === state.mode));

    render();

    window.BRACE_CART = { add, open, close, reset, undoRemove, getState: () => state, getSubtotal: subtotal, getMode: () => state.mode };
  }

  document.addEventListener('DOMContentLoaded', init);
})();
