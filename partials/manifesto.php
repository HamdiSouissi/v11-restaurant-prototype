<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--manifesto section--carbone" id="manifesto" aria-labelledby="manifesto-title">
  <div class="manifesto__pin">
    <h2 class="manifesto__title" id="manifesto-title" aria-hidden="true">
      <?php echo htmlspecialchars($C['brand']['tagline_it']); ?>
    </h2>
    <p class="manifesto__text" id="manifesto-text">
      <?php echo htmlspecialchars($C['brand']['manifesto_it']); ?>
    </p>
    <div class="manifesto__rule" aria-hidden="true"></div>
  </div>
</section>
