<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--reviews section--fumo" id="reviews" aria-labelledby="reviews-title">
  <div class="reviews__layout">
    <div class="reviews__header">
      <div class="reviews__stars" aria-label="4,8 su 5">
        <?php for ($s = 0; $s < 5; $s++): ?>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <?php endfor; ?>
      </div>
      <p class="reviews__rating">4,8 / 5 · <span data-i18n="reviews_count">oltre 900 recensioni</span></p>
    </div>

    <div class="reviews__rotator" id="reviews-rotator" aria-live="polite">
      <?php foreach ($C['reviews'] as $i => $r): ?>
      <blockquote class="reviews__quote <?php echo $i === 0 ? 'is-active' : ''; ?>" data-idx="<?php echo $i; ?>">
        <p class="reviews__text" data-i18n-review-it="<?php echo htmlspecialchars($r['text_it']); ?>" data-i18n-review-en="<?php echo htmlspecialchars($r['text_en']); ?>"><?php echo htmlspecialchars($r['text_it']); ?></p>
        <footer class="reviews__author">— <?php echo htmlspecialchars($r['author']); ?></footer>
      </blockquote>
      <?php endforeach; ?>
      <div class="reviews__progress"><div class="reviews__progress-bar" id="reviews-progress-bar"></div></div>
      <div class="reviews__dots" id="reviews-dots" role="tablist">
        <?php foreach ($C['reviews'] as $i => $r): ?>
        <button type="button" class="reviews__dot <?php echo $i === 0 ? 'is-active' : ''; ?>" data-idx="<?php echo $i; ?>" role="tab" aria-label="Recensione <?php echo $i + 1; ?>"></button>
        <?php endforeach; ?>
      </div>
    </div>

    <div class="reviews__cite">
      <p class="reviews__cite-label" data-i18n="citati_da">Citati da</p>
      <p class="reviews__cite-names" data-i18n="newspapers"><?php echo htmlspecialchars($C['i18n']['it']['newspapers']); ?></p>
    </div>
  </div>
</section>
