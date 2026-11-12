<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--gallery section--carbone" id="gallery" aria-labelledby="gallery-title">
  <h2 class="gallery__title" id="gallery-title">
    <span>La</span> <span class="gallery__title--italic">galleria</span>
  </h2>
  <div class="swiper gallery__swiper" id="gallery-swiper">
    <div class="swiper-wrapper">
      <?php foreach ($C['gallery'] as $i => $g): ?>
      <div class="swiper-slide gallery__slide" data-idx="<?php echo $i; ?>">
        <div class="gallery__frame">
          <img src="/assets/img/<?php echo htmlspecialchars($g['slug']); ?>.webp"
               alt="<?php echo htmlspecialchars($g['caption_it']); ?>"
               width="800" height="1000" loading="lazy">
        </div>
        <p class="gallery__caption" data-i18n-cap-it="<?php echo htmlspecialchars($g['caption_it']); ?>" data-i18n-cap-en="<?php echo htmlspecialchars($g['caption_en']); ?>">
          <?php echo htmlspecialchars($g['caption_it']); ?>
        </p>
      </div>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<div class="lightbox" id="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Galleria" hidden>
  <button type="button" class="lightbox__close" id="lightbox-close" aria-label="Chiudi">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
  </button>
  <button type="button" class="lightbox__nav lightbox__nav--prev" id="lightbox-prev" aria-label="Precedente">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
  </button>
  <button type="button" class="lightbox__nav lightbox__nav--next" id="lightbox-next" aria-label="Successiva">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  </button>
  <div class="lightbox__img-wrap">
    <img id="lightbox-img" alt="" width="1200" height="900">
  </div>
  <div class="lightbox__counter" id="lightbox-counter">01 / 12</div>
  <p class="lightbox__caption" id="lightbox-caption"></p>
</div>
