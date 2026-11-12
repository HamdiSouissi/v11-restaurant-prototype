/** BRACE — menu: filters, scroll-spy index, sticky preview, add-to-cart */
(function () {
  'use strict';

  function initMenu() {
    const items = document.querySelectorAll('.menu__item');
    const indexLinks = document.querySelectorAll('.menu__index-link');
    const categories = document.querySelectorAll('.menu__category');
    const preview = document.querySelector('.menu__preview img');
    const filters = document.querySelectorAll('.menu__filter');
    let currentFilter = 'all';

    // Filters
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentFilter = btn.dataset.filter;
        items.forEach(it => {
          const tags = it.dataset.tags || '';
          if (currentFilter === 'all' || tags.includes(currentFilter)) {
            it.style.display = '';
          } else {
            it.style.display = 'none';
          }
        });
      });
    });

    // Scroll-spy index
    if (window.ScrollTrigger && window.gsap) {
      const gsap = window.gsap;
      const st = window.ScrollTrigger;
      categories.forEach((cat, i) => {
        st.create({
          trigger: cat,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }

    function setActiveIndex(i) {
      indexLinks.forEach((l, idx) => l.classList.toggle('is-active', idx === i));
      // Update preview image to first item in category
      const first = categories[i]?.querySelector('.menu__item img');
      // Use the corresponding piatti image for the first item slug
      const firstItem = categories[i]?.querySelector('.menu__item');
      if (firstItem && preview) {
        const slug = firstItem.dataset.slug;
        if (slug) preview.src = `/assets/img/piatti/${slug}.webp`;
      }
    }

    // Hover preview updates
    items.forEach(it => {
      it.addEventListener('mouseenter', () => {
        const slug = it.dataset.slug;
        if (slug && preview) preview.src = `/assets/img/piatti/${slug}.webp`;
      });
    });

    // Add to cart
    items.forEach(it => {
      const addBtn = it.querySelector('.menu__add-btn');
      if (addBtn) {
        addBtn.addEventListener('click', () => {
          if (window.BRACE_CART) {
            window.BRACE_CART.add({
              slug: it.dataset.slug,
              name: it.dataset.name,
              price: parseFloat(it.dataset.price),
            });
          }
        });
      }
    });

    // Initial active
    if (indexLinks.length) setActiveIndex(0);
  }

  document.addEventListener('DOMContentLoaded', initMenu);
})();
