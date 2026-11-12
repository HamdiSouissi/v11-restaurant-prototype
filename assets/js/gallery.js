/** BRACE — gallery: Swiper freeMode + lightbox */
(function () {
  'use strict';

  function initGallery() {
    const swiperEl = document.getElementById('gallery-swiper');
    if (!swiperEl || typeof Swiper === 'undefined') {
      // Fallback: display all slides in a horizontal scroll if Swiper fails
      const wrapper = swiperEl?.querySelector('.swiper-wrapper');
      if (wrapper) {
        wrapper.style.display = 'flex';
        wrapper.style.overflowX = 'auto';
        wrapper.style.scrollSnapType = 'x mandatory';
      }
      return;
    }

    new Swiper(swiperEl, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      freeMode: { enabled: true, momentum: true, momentumRatio: 0.8 },
      grabCursor: true,
      speed: 600,
      loop: false,
    });

    // Parallax per image based on position
    const slides = swiperEl.querySelectorAll('.gallery__slide');
    window.addEventListener('scroll', () => {
      slides.forEach(s => {
        const r = s.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const offset = (r.top + r.height / 2 - center) / center;
        const img = s.querySelector('img');
        if (img) img.style.transform = `translateY(${offset * -12}px)`;
      });
    }, { passive: true });

    // Lightbox
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxCaption = document.getElementById('lightbox-caption');
    let currentIndex = 0;
    let previouslyFocused = null;

    function openLightbox(idx) {
      previouslyFocused = document.activeElement;
      currentIndex = idx;
      const slide = slides[idx];
      if (!slide) return;
      const img = slide.querySelector('img');
      const caption = slide.querySelector('.gallery__caption');
      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCounter) lightboxCounter.textContent = `${String(idx + 1).padStart(2, '0')} / ${slides.length}`;
      if (lightboxCaption) lightboxCaption.textContent = caption?.textContent || '';
      if (lightbox) { lightbox.hidden = false; requestAnimationFrame(() => lightbox.classList.add('is-open')); }
      document.getElementById('lightbox-close')?.focus();
      trapFocus(lightbox);
    }

    function closeLightbox() {
      if (lightbox) { lightbox.classList.remove('is-open'); setTimeout(() => lightbox.hidden = true, 350); }
      releaseFocus();
      if (previouslyFocused) previouslyFocused.focus();
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + slides.length) % slides.length;
      openLightbox(currentIndex);
    }

    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', () => navigate(-1));
    document.getElementById('lightbox-next')?.addEventListener('click', () => navigate(1));
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    slides.forEach((s, i) => {
      s.style.cursor = 'pointer';
      s.addEventListener('click', () => openLightbox(i));
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox && !lightbox.hidden) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
      }
    });

    function trapFocus(container) {
      const focusable = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0], last = focusable[focusable.length - 1];
      container.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }
    function releaseFocus() {}
  }

  document.addEventListener('DOMContentLoaded', initGallery);
})();
