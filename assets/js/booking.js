/** BRACE — booking flow */
(function () {
  'use strict';

  const state = {
    step: 1,
    guests: 2,
    date: null,
    time: null,
    table: null,
    name: '',
    phone: '',
    email: '',
    occasion: 'none',
    notes: '',
  };

  const daysIt = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const monthsIt = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

  function initBooking() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    const backBtn = document.getElementById('booking-back-btn');
    const nextBtn = document.getElementById('booking-next-btn');
    const submitBtn = document.getElementById('booking-submit-btn');
    const summaryBar = document.getElementById('booking-summary-bar');
    const summaryText = document.getElementById('booking-summary-text');
    const progressFill = document.querySelector('.booking__progress-fill');
    const progressSteps = document.querySelectorAll('.booking__progress-step');

    function setStep(n) {
      state.step = n;
      form.querySelectorAll('.booking__step').forEach(fs => {
        fs.hidden = +fs.dataset.step !== n;
      });
      backBtn.hidden = n === 1;
      submitBtn.hidden = n !== 5;
      nextBtn.hidden = n === 5;
      progressSteps.forEach((s, i) => s.classList.toggle('is-active', i + 1 === n));
      if (progressFill) progressFill.style.width = `${((n - 1) / 4) * 100}%`;
      updateSummary();
    }

    function updateSummary() {
      if (!summaryBar || !summaryText) return;
      const hasAll = state.date && state.time && state.table;
      summaryBar.hidden = !hasAll;
      if (hasAll) {
        const d = new Date(state.date);
        const dow = daysIt[d.getDay()].toUpperCase();
        const dom = d.getDate();
        const mon = monthsIt[d.getMonth()].toUpperCase();
        summaryText.textContent = `${dow} ${dom} ${mon} · ${state.time} · ${state.guests} ${window.I18N?.it?.guests || 'persone'} · ${window.I18N?.it?.your_table || 'Tavolo'} ${state.table}`;
      }
    }

    // Step 1: Guests
    document.querySelectorAll('.booking__guest-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.booking__guest-btn').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        state.guests = +btn.dataset.guests;
        const plus8 = document.querySelector('.booking__plus-eight');
        if (plus8) plus8.hidden = state.guests <= 8;
      });
    });

    // Step 2: Date strip
    function renderDates() {
      const container = document.getElementById('booking-dates');
      if (!container) return;
      container.innerHTML = '';
      const today = new Date();
      for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dow = d.getDay();
        const isMonday = dow === 1;
        const isPast = i === 0 ? false : false; // today valid
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'booking__date-card' + (isMonday ? ' is-closed' : '') + (isPast ? ' is-disabled' : '');
        card.dataset.date = d.toISOString().slice(0, 10);
        card.innerHTML = `<span class="dow">${daysIt[dow]}</span><span class="dom">${d.getDate()}</span><span class="mon">${monthsIt[d.getMonth()]}</span>`;
        if (isMonday) {
          card.title = 'Chiuso';
          card.disabled = true;
        }
        card.addEventListener('click', () => {
          document.querySelectorAll('.booking__date-card').forEach(c => c.classList.remove('is-active'));
          card.classList.add('is-active');
          state.date = card.dataset.date;
          fetchSlots();
        });
        container.appendChild(card);
      }
      // Select tomorrow if today is Monday
      const todayDow = today.getDay();
      if (todayDow === 1) {
        const tomorrowBtn = container.querySelector('[data-date]');
        if (tomorrowBtn) {
          const tmr = new Date(today); tmr.setDate(today.getDate() + 1);
          const b = container.querySelector(`[data-date="${tmr.toISOString().slice(0, 10)}"]`);
          if (b) b.click();
        }
      } else {
        const todayBtn = container.querySelector(`[data-date="${today.toISOString().slice(0, 10)}"]`);
        if (todayBtn) todayBtn.click();
      }
    }

    // Step 3: Slots
    async function fetchSlots() {
      if (!state.date) return;
      try {
        const r = await fetch(`/api/slots.php?date=${state.date}&guests=${state.guests}`);
        const data = await r.json();
        if (data.closed) {
          document.getElementById('booking-slots-lunch').innerHTML = '<p>Chiuso</p>';
          document.getElementById('booking-slots-dinner').innerHTML = '<p>Chiuso</p>';
          return;
        }
        renderSlots('booking-slots-lunch', data.lunch || []);
        renderSlots('booking-slots-dinner', data.dinner || []);
      } catch (e) {}
    }

    function renderSlots(containerId, slots) {
      const c = document.getElementById(containerId);
      if (!c) return;
      c.innerHTML = '';
      const dict = window.I18N?.[window.BRACE_I18N?.getLang() || 'it'] || {};
      slots.forEach(s => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'booking__slot' + (s.unavailable ? ' is-full' : '') + (s.last_tables ? ' is-last' : '');
        btn.textContent = s.time;
        if (s.unavailable) btn.title = dict.full || 'Pieno';
        else if (s.last_tables) btn.title = dict.last_tables || 'Ultimi tavoli';
        if (!s.unavailable) {
          btn.addEventListener('click', () => {
            c.querySelectorAll('.booking__slot').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            state.time = s.time;
          });
        }
        c.appendChild(btn);
      });
    }

    // Step 4: Floorplan
    document.querySelectorAll('.fp-table').forEach(rect => {
      rect.addEventListener('click', () => {
        const info = JSON.parse(rect.dataset.info);
        // Check availability for current guests
        if (info.seats < state.guests) return;
        document.querySelectorAll('.fp-table').forEach(r => r.classList.remove('is-active'));
        rect.classList.add('is-active');
        state.table = info.id;
        const infoEl = document.getElementById('booking-table-info');
        if (infoEl) infoEl.textContent = `${info.id} · ${info.seats} ${window.I18N?.it?.seats || 'posti'} · ${info.zone === 'bancone' ? (window.I18N?.it?.view_oven || 'vista forno') : info.zone}`;
        updateSummary();
      });
      rect.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); rect.click(); }
      });
    });

    // Nav
    backBtn.addEventListener('click', () => setStep(state.step - 1));
    nextBtn.addEventListener('click', () => {
      if (state.step === 1) setStep(2);
      else if (state.step === 2 && state.date) setStep(3);
      else if (state.step === 3 && state.time) setStep(4);
      else if (state.step === 4 && state.table) setStep(5);
    });

    // Submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      state.name = (document.getElementById('b-name').value || '').trim();
      state.phone = (document.getElementById('b-phone').value || '').trim();
      state.email = (document.getElementById('b-email').value || '').trim();
      state.occasion = (document.getElementById('b-occasion').value || 'none');
      state.notes = (document.getElementById('b-notes').value || '').trim();
      const privacy = form.querySelector('[name="privacy"]');

      // Validate
      let valid = true;
      [['b-name', state.name, 'name'], ['b-phone', state.phone, 'phone'], ['b-email', state.email, 'email']].forEach(([id, val]) => {
        const inp = document.getElementById(id);
        if (!val || (id === 'b-email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
          inp.classList.add('invalid');
          valid = false;
        } else { inp.classList.remove('invalid'); }
      });
      if (privacy && !privacy.checked) { valid = false; }
      if (!valid) return;

      try {
        const r = await fetch('/api/booking.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: state.name, phone: state.phone, email: state.email,
            date: state.date, time: state.time, guests: state.guests,
            table: state.table, occasion: state.occasion, notes: state.notes,
          }),
        });
        const data = await r.json();
        if (data.ok) {
          if (window.BRACE_TOAST) window.BRACE_TOAST.success('booking_done');
          // Offer .ics download
          if (data.ics) {
            const blob = new Blob([data.ics], { type: 'text/calendar' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = `brace-${data.code}.ics`; a.click();
            URL.revokeObjectURL(url);
          }
          // Reset
          state.step = 1;
          setStep(1);
        } else {
          if (window.BRACE_TOAST) window.BRACE_TOAST.info(window.I18N?.it?.something_burned || 'Ops.');
        }
      } catch (e) {
        if (window.BRACE_TOAST) window.BRACE_TOAST.info(window.I18N?.it?.something_burned || 'Ops.');
      }
    });

    // Nav book button
    document.getElementById('nav-book-btn')?.addEventListener('click', () => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    });

    renderDates();
    setStep(1);
  }

  document.addEventListener('DOMContentLoaded', initBooking);
})();
