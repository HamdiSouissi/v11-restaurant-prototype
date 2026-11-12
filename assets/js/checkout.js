/** BRACE — checkout modal flow */
(function () {
  'use strict';

  let step = 1;

  function initCheckout() {
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;
    const form = document.getElementById('checkout-form');
    const backBtn = document.getElementById('checkout-back-btn');
    const nextBtn = document.getElementById('checkout-next-btn');
    const successEl = document.getElementById('checkout-success');

    function setStep(n) {
      step = n;
      form.querySelectorAll('.checkout__step').forEach(fs => {
        fs.hidden = +fs.dataset.step !== n;
      });
      successEl.hidden = true;
      backBtn.hidden = n === 1;
      nextBtn.hidden = n === 3;
      document.querySelectorAll('.checkout-modal__dot').forEach((d, i) => d.classList.toggle('is-active', i + 1 === n));
    }

    function reset() {
      step = 1;
      setStep(1);
      // Clear inputs
      form.querySelectorAll('input, textarea').forEach(i => { if (i.type !== 'radio') i.value = ''; });
      const firstRadio = form.querySelector('input[name="pay"]');
      if (firstRadio) firstRadio.checked = true;
      // Show delivery-only fields conditionally
      const mode = window.BRACE_CART?.getMode() || 'delivery';
      form.querySelectorAll('.delivery-only').forEach(el => el.hidden = mode !== 'delivery');
    }

    backBtn.addEventListener('click', () => setStep(step - 1));
    nextBtn.addEventListener('click', () => {
      if (step === 1) {
        // Validate
        const name = document.getElementById('c-name').value.trim();
        const phone = document.getElementById('c-phone').value.trim();
        const email = document.getElementById('c-email').value.trim();
        const address = document.getElementById('c-address').value.trim();
        const mode = window.BRACE_CART?.getMode() || 'delivery';
        let valid = true;

        [['c-name', name, 'name'], ['c-phone', phone, 'phone'], ['c-email', email, 'email']].forEach(([id, val]) => {
          const inp = document.getElementById(id);
          if (!val || (id === 'c-email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
            inp.classList.add('invalid');
            const msg = inp.parentElement.querySelector('.field__msg');
            if (msg) msg.textContent = 'Ci serve un valore valido.';
            valid = false;
          } else {
            inp.classList.remove('invalid');
            const msg = inp.parentElement.querySelector('.field__msg');
            if (msg) msg.textContent = '';
          }
        });
        if (mode === 'delivery' && !address) {
          const inp = document.getElementById('c-address');
          inp.classList.add('invalid');
          const msg = inp.parentElement.querySelector('.field__msg');
          if (msg) msg.textContent = 'Indirizzo obbligatorio per la consegna.';
          valid = false;
        }

        if (valid) {
          // Populate summary
          const summary = document.getElementById('checkout-summary');
          if (summary) {
            const cart = window.BRACE_CART?.getState();
            const sub = window.BRACE_CART?.getSubtotal() || 0;
            const fee = mode === 'delivery' ? (sub >= 25 ? 0 : 2.50) : 0;
            const total = sub + fee;
            summary.innerHTML = `
              <div><strong>${name}</strong> · ${phone} · ${email}</div>
              <div style="margin-top:12px">${cart.items.map(it => `<div>${it.qty} × ${it.name} — € ${(it.price * it.qty).toFixed(2).replace('.', ',')}</div>`).join('')}</div>
              <div style="margin-top:12px;display:flex;justify-content:space-between;border-top:1px solid rgba(11,10,9,0.15);padding-top:10px"><span>Subtotale</span><span>€ ${sub.toFixed(2).replace('.', ',')}</span></div>
              <div style="display:flex;justify-content:space-between"><span>${mode === 'delivery' ? 'Consegna' : 'Asporto'}</span><span>${fee === 0 ? 'Gratis' : '€ ' + fee.toFixed(2).replace('.', ',')}</span></div>
              <div style="display:flex;justify-content:space-between;font-family:var(--ff-display);font-size:24px;margin-top:8px"><span>Totale</span><span>€ ${total.toFixed(2).replace('.', ',')}</span></div>
            `;
          }
          setStep(2);
        }
      } else if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        submitOrder();
      }
    });

    document.getElementById('checkout-close')?.addEventListener('click', closeModal);
    document.getElementById('checkout-backdrop')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    function closeModal() {
      modal.classList.remove('is-open');
      setTimeout(() => modal.hidden = true, 350);
    }

    async function submitOrder() {
      const cart = window.BRACE_CART?.getState();
      if (!cart || cart.items.length === 0) return;
      const pay = form.querySelector('input[name="pay"]:checked')?.value || 'card';

      nextBtn.disabled = true;
      nextBtn.textContent = '…';

      try {
        const r = await fetch('/api/order.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cart.items,
            mode: cart.mode,
            name: document.getElementById('c-name').value.trim(),
            phone: document.getElementById('c-phone').value.trim(),
            email: document.getElementById('c-email').value.trim(),
            address: document.getElementById('c-address').value.trim(),
            notes: document.getElementById('c-notes').value.trim(),
            pay,
          }),
        });
        const data = await r.json();
        if (data.ok) {
          form.querySelectorAll('.checkout__step').forEach(fs => fs.hidden = true);
          backBtn.hidden = true;
          nextBtn.hidden = true;
          successEl.hidden = false;
          document.getElementById('checkout-order-num').textContent = `N° ${data.code}`;

          // Animate thermometer + ring
          setTimeout(() => {
            const fill = successEl.querySelector('.checkout__thermometer-fill');
            if (fill) fill.style.height = '100%';
            const ring = successEl.querySelector('.checkout__ring');
            if (ring) ring.style.strokeDashoffset = '44';
            // Progress through steps
            const trackerSteps = successEl.querySelectorAll('.checkout__tracker-step');
            trackerSteps.forEach((s, i) => {
              setTimeout(() => s.classList.add('is-active'), 600 * (i + 1));
            });
          }, 400);

          // Reset cart
          window.BRACE_CART?.reset();
        } else {
          if (window.BRACE_TOAST) window.BRACE_TOAST.info(data.error || 'Ops.');
        }
      } catch (e) {
        if (window.BRACE_TOAST) window.BRACE_TOAST.info('Ops.');
      } finally {
        nextBtn.disabled = false;
        nextBtn.textContent = 'Avanti';
      }
    }

    window.BRACE_CHECKOUT = { reset, open: () => { modal.hidden = false; requestAnimationFrame(() => modal.classList.add('is-open')); reset(); } };
    setStep(1);
  }

  document.addEventListener('DOMContentLoaded', initCheckout);
})();
