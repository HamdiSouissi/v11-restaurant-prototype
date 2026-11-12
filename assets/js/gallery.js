/** BRACE — gallery: pure CSS scroll + lightbox */
(function () {
  'use strict';

  function initGallery() {
    const scrollContainer = document.getElementById('gallery-scroll');
    if (!scrollContainer) return;

    const items = scrollContainer.querySelectorAll('.gallery__item');

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
      items.forEach(item => {
        const r = item.getBoundingClientRect();
        const center = window.innerHeight / 2;
        const offset = (r.top + r.height / 2 - center) / center;
        const img = item.querySelector('img');
        if (img && Math.abs(offset) < 1.5) {
          img.style.transform = `translateY(${offset * -8}px)`;
        }
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
      const item = items[idx];
      if (!item) return;
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery__caption');
      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
      }
      if (lightboxCounter) lightboxCounter.textContent = `${String(idx + 1).padStart(2, '0')} / ${items.length}`;
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
      currentIndex = (currentIndex + dir + items.length) % items.length;
      openLightbox(currentIndex);
    }

    document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev')?.addEventListener('click', () => navigate(-1));
    document.getElementById('lightbox-next')?.addEventListener('click', () => navigate(1));
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    items.forEach((item, i) => {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => openLightbox(i));
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
