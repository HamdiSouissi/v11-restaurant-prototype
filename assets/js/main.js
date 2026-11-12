/** BRACE — main entry: Lenis, GSAP registrations, scroll, reveals, cursor, bg crossfade, preloader, magnetic buttons */
(function () {
  'use strict';

  /* ---------- Lenis ---------- */
  let lenis = null;
  function initLenis() {
    if (typeof Lenis === 'undefined') return;
    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (window.gsap) {
      lenis.on('scroll', window.gsap.updateRoot);
    }
    function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }

  /* ---------- GSAP ---------- */
  function initGSAP() {
    if (!window.gsap) return;
    const gsap = window.gsap;
    const st = window.ScrollTrigger;
    if (st) gsap.registerPlugin(st);

    // Background crossfade — determine dominant bg per section
    const bgMap = {
      'hero':     '#141210',
      'manifesto':'#141210',
      'forno':    '#141210',
      'classici': '#141210',
      'brace':    '#E8E2D6',
      'menu':     '#141210',
      'builder':  '#1E1B18',
      'booking':  '#E8E2D6',
      'gallery':  '#141210',
      'reviews':  '#1E1B18',
      'info':     '#141210',
    };
    const sections = Object.keys(bgMap);
    sections.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (st) {
        st.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setBg(bgMap[id]),
          onEnterBack: () => setBg(bgMap[id]),
        });
      }
    });
    function setBg(c) {
      document.body.style.transition = 'background-color 600ms cubic-bezier(0.65,0,0.35,1)';
      document.body.style.backgroundColor = c;
    }

    // Generic reveal: fade + rise
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // Hero title lines
    if (st && window.SplitText) {
      gsap.utils.toArray('.hero__line-inner').forEach((line, i) => {
        gsap.to(line, {
          y: 0, duration: 1.1, ease: 'power3.out', delay: 0.2 + i * 0.12,
          scrollTrigger: { trigger: '#hero', start: 'top top' }
        });
      });
    } else {
      gsap.utils.toArray('.hero__line-inner').forEach(line => gsap.set(line, { y: 0 }));
    }

    // Manifesto word-by-word scrub
    const manifestoText = document.getElementById('manifesto-text');
    if (manifestoText && st) {
      const words = manifestoText.textContent.trim().split(/\s+/);
      manifestoText.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
      const wordEls = manifestoText.querySelectorAll('.word');
      const keywords = ['fuoco', 'tempo'];
      wordEls.forEach(w => {
        const clean = w.textContent.toLowerCase().replace(/[.,]/g, '');
        if (keywords.includes(clean)) w.classList.add('is-key');
      });

      const scrub = st.create({
        trigger: '#manifesto',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          wordEls.forEach((w, i) => {
            const thresh = i / wordEls.length;
            if (progress > thresh + 0.04) {
              if (w.classList.contains('is-key')) w.classList.add('is-lit');
              else w.classList.add('is-lit');
            } else {
              w.classList.remove('is-lit');
            }
          });
          const rule = document.querySelector('.manifesto__rule');
          if (rule && progress > 0.85) rule.classList.add('is-drawn');
        }
      });
    }

    // Forno image reveal
    const fornoImg = document.querySelector('.forno__img-wrap');
    if (fornoImg && st) {
      st.create({
        trigger: '#forno',
        start: 'top 70%',
        onEnter: () => fornoImg.classList.add('is-revealed'),
        once: true
      });
    }

    // Forno counters
    gsap.utils.toArray('.forno__counter-num').forEach(el => {
      const target = +el.dataset.target;
      if (st) {
        st.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target, duration: 1.6, ease: 'power3.out',
              onUpdate: () => { el.textContent = Math.round(obj.v); }
            });
          }
        });
      }
    });

    // Classici sticky stacking
    const cards = document.querySelectorAll('.classici__card');
    if (cards.length && st) {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        st.create({
          trigger: card,
          start: 'bottom bottom-=120',
          end: 'bottom top+=120',
          scrub: true,
          onUpdate: (self) => {
            const next = card.nextElementSibling;
            if (!next) return;
            if (self.progress > 0.5) {
              card.classList.add('is-stacked');
            } else {
              card.classList.remove('is-stacked');
            }
          }
        });
      });
    }
  }

  /* ---------- Header hide on scroll ---------- */
  function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    let lastY = 0;
    let ticking = false;
    function onScroll() {
      const y = window.scrollY;
      if (y > 80) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');

      if (y > lastY && y > 200) header.classList.add('is-hidden');
      else header.classList.remove('is-hidden');

      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    const p = document.getElementById('preloader');
    if (!p) return;
    if (sessionStorage.getItem('brace_preloaded')) {
      p.remove();
      document.body.classList.remove('no-scroll-preload');
      return;
    }

    const deg = document.getElementById('preloader-deg');
    let cur = 0;
    const target = 485;
    const start = performance.now();
    const duration = 1400;

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      cur = Math.round(eased * target);
      if (deg) deg.textContent = cur;
      if (t < 1) requestAnimationFrame(tick);
      else {
        p.classList.add('preloader-loaded');
        setTimeout(() => {
          p.classList.add('preloader-exit');
          setTimeout(() => {
            p.remove();
            document.body.classList.remove('no-scroll-preload');
            sessionStorage.setItem('brace_preloaded', '1');
          }, 720);
        }, 200);
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.btn--magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const burger = document.getElementById('nav-burger');
    const menu = document.getElementById('mobile-menu');
    const close = document.getElementById('mobile-menu-close');
    if (!burger || !menu) return;

    burger.addEventListener('click', () => {
      menu.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      close.focus();
    });
    close.addEventListener('click', () => {
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ---------- Footer wordmark heat ---------- */
  function initFooterWordmark() {
    if (window.matchMedia('(hover: none)').matches) {
      // Mobile: loop
      const letters = document.querySelectorAll('#footer-wordmark span');
      let i = 0;
      setInterval(() => {
        letters.forEach(l => l.classList.remove('is-heated'));
        letters[i % letters.length].classList.add('is-heated');
        i++;
      }, 1200);
      return;
    }
    const wm = document.getElementById('footer-wordmark');
    if (!wm) return;
    wm.addEventListener('mousemove', (e) => {
      const r = wm.getBoundingClientRect();
      const cx = e.clientX - r.left;
      wm.querySelectorAll('span').forEach(s => {
        const sr = s.getBoundingClientRect();
        const scx = sr.left - r.left + sr.width / 2;
        const d = Math.abs(cx - scx);
        if (d < 80) s.classList.add('is-heated');
        else s.classList.remove('is-heated');
      });
    });
    wm.addEventListener('mouseleave', () => {
      wm.querySelectorAll('span').forEach(s => s.classList.remove('is-heated'));
    });
  }

  /* ---------- Newsletter ---------- */
  function initNewsletter() {
    const form = document.getElementById('nl-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = form.querySelector('input');
      if (!inp.value || !inp.validity.valid) return;
      if (window.BRACE_TOAST) window.BRACE_TOAST.success('subscribed');
      inp.value = '';
    });
  }

  /* ---------- Back to top ---------- */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Nav buttons ---------- */
  function initNavButtons() {
    document.getElementById('nav-book-btn')?.addEventListener('click', () => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    });
    document.querySelector('.site-header__find')?.addEventListener('click', () => {
      document.getElementById('info')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Toast module ---------- */
  function initToasts() {
    const stack = document.getElementById('toast-stack');
    if (!stack) return;
    window.BRACE_TOAST = {
      info(msg, undo) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerHTML = `<span>${msg}</span>${undo ? `<button type="button" class="toast__undo">${undo}</button>` : ''}`;
        stack.appendChild(t);
        requestAnimationFrame(() => t.classList.add('is-visible'));
        const timer = setTimeout(() => dismiss(t), 4000);
        if (undo) {
          t.querySelector('.toast__undo').addEventListener('click', () => {
            clearTimeout(timer);
            dismiss(t);
            if (window.BRACE_CART) window.BRACE_CART.undoRemove();
          });
        }
        return t;
      },
      success(key) {
        const dict = (window.I18N && window.I18N[window.BRACE_I18N?.getLang() || 'it']) || {};
        const msg = dict[key] || key;
        return this.info(msg);
      }
    };
    function dismiss(t) {
      t.classList.remove('is-visible');
      setTimeout(() => t.remove(), 300);
    }
  }

  /* ---------- Mobile sticky bar ---------- */
  function initMobileSticky() {
    const bar = document.getElementById('mobile-sticky-bar');
    if (!bar) return;
    if (window.innerWidth < 900) {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const st = window.ScrollTrigger;
      if (st) {
        st.create({
          trigger: hero,
          start: 'bottom top',
          onEnter: () => bar.hidden = false,
          onLeaveBack: () => bar.hidden = true,
        });
      } else {
        bar.hidden = false;
      }
    }
    document.getElementById('mobile-order-btn')?.addEventListener('click', () => {
      if (window.BRACE_CART) window.BRACE_CART.open();
    });
    bar.querySelector('[data-i18n="book"]')?.addEventListener('click', () => {
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initGSAP();
    initPreloader();
    initHeader();
    initMagnetic();
    initMobileMenu();
    initFooterWordmark();
    initNewsletter();
    initBackToTop();
    initNavButtons();
    initToasts();
    initMobileSticky();
  });
})();
