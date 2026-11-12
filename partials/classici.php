<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--classici section--carbone" id="classici" aria-labelledby="classici-title">
  <div class="classici__header">
    <h2 class="classici__title" id="classici-title">
      <span>I classici</span> <span class="classici__title--italic">del fuoco</span>
    </h2>
  </div>
  <div class="classici__stack">
    <?php foreach ($C['classics'] as $i => $d): ?>
    <article class="classici__card" data-idx="<?php echo $i; ?>" style="--idx: <?php echo $i; ?>">
      <div class="classici__card-media">
        <img src="/assets/img/piatti/<?php echo htmlspecialchars($d['slug']); ?>.webp"
             alt="<?php echo htmlspecialchars($d['name_it']); ?>"
             width="900" height="1080" loading="lazy">
      </div>
      <div class="classici__card-body">
        <span class="classici__num"><?php echo str_pad($i + 1, 2, '0', STR_PAD_LEFT); ?></span>
        <h3 class="classici__dish"><?php echo htmlspecialchars($d['name_it']); ?></h3>
        <p class="classici__desc"><?php echo htmlspecialchars($d['desc_it']); ?></p>
        <div class="classici__price-row">
          <span class="classici__price">€ <?php echo htmlspecialchars($d['price']); ?></span>
          <button type="button" class="btn btn--solid btn--add" data-slug="<?php echo htmlspecialchars($d['slug']); ?>" data-name="<?php echo htmlspecialchars($d['name_it']); ?>" data-price="<?php echo htmlspecialchars($d['price']); ?>">
            <span data-i18n="add">Aggiungi</span>
          </button>
        </div>
      </div>
    </article>
    <?php endforeach; ?>
  </div>
</section>
