<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--builder section--fumo" id="builder" aria-labelledby="builder-title">
  <div class="builder__layout">
    <div class="builder__intro">
      <h2 class="builder__title" id="builder-title">
        <span>Componi la</span> <span class="builder__title--italic">tua pizza</span>
      </h2>
      <p class="builder__sub">Quattro scelte, una pizza solo tua.</p>
    </div>

    <div class="builder__visual">
      <div class="builder__pizza-img">
        <img src="/assets/img/pizza-builder.webp" alt="Pizza artesanal" width="900" height="900">
      </div>
    </div>

    <div class="builder__steps" id="builder-steps">
      <div class="builder__step is-active" data-step="impasto">
        <div class="builder__step-head"><span class="builder__step-num">01</span> <h3 data-i18n="dough">L'impasto</h3></div>
        <div class="builder__options">
          <?php foreach ($C['builder']['impasti'] as $d): ?>
          <button type="button" class="builder__opt" data-group="impasto" data-key="<?php echo $d['key']; ?>" data-price="<?php echo $d['extra']; ?>">
            <span data-i18n-builder-it="<?php echo $d['label_it']; ?>" data-i18n-builder-en="<?php echo $d['label_en']; ?>"><?php echo htmlspecialchars($d['label_it']); ?></span>
            <?php if ($d['extra'] > 0): ?><span class="builder__extra">+€ <?php echo number_format($d['extra'], 2, ',', '.'); ?></span><?php endif; ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="builder__step" data-step="base">
        <div class="builder__step-head"><span class="builder__step-num">02</span> <h3 data-i18n="base">La base</h3></div>
        <div class="builder__options">
          <?php foreach ($C['builder']['basi'] as $b): ?>
          <button type="button" class="builder__opt" data-group="base" data-key="<?php echo $b['key']; ?>">
            <span data-i18n-builder-it="<?php echo $b['label_it']; ?>" data-i18n-builder-en="<?php echo $b['label_en']; ?>"><?php echo htmlspecialchars($b['label_it']); ?></span>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="builder__step" data-step="toppings">
        <div class="builder__step-head">
          <span class="builder__step-num">03</span>
          <h3 data-i18n="toppings">La farcitura</h3>
          <span class="builder__topping-counter">0/4</span>
        </div>
        <div class="builder__options">
          <?php foreach ($C['builder']['toppings'] as $t): ?>
          <button type="button" class="builder__opt builder__opt--toggle" data-group="topping" data-key="<?php echo $t['key']; ?>" data-price="<?php echo $t['extra']; ?>">
            <span data-i18n-builder-it="<?php echo $t['label_it']; ?>" data-i18n-builder-en="<?php echo $t['label_en']; ?>"><?php echo htmlspecialchars($t['label_it']); ?></span>
            <?php if ($t['extra'] > 0): ?><span class="builder__extra">+€ <?php echo number_format($t['extra'], 2, ',', '.'); ?></span><?php endif; ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="builder__step" data-step="finish">
        <div class="builder__step-head"><span class="builder__step-num">04</span> <h3 data-i18n="finish">Il tocco finale</h3></div>
        <div class="builder__options">
          <?php foreach ($C['builder']['finishes'] as $f): ?>
          <button type="button" class="builder__opt builder__opt--toggle" data-group="finish" data-key="<?php echo $f['key']; ?>" data-price="<?php echo $f['extra']; ?>">
            <span data-i18n-builder-it="<?php echo $f['label_it']; ?>" data-i18n-builder-en="<?php echo $f['label_en']; ?>"><?php echo htmlspecialchars($f['label_it']); ?></span>
            <?php if ($f['extra'] > 0): ?><span class="builder__extra">+€ <?php echo number_format($f['extra'], 2, ',', '.'); ?></span><?php endif; ?>
          </button>
          <?php endforeach; ?>
        </div>
      </div>
    </div>

    <div class="builder__summary">
      <div class="builder__total">
        <span class="builder__price" id="builder-price">€ 7,00</span>
        <span class="builder__eta" data-i18n="ready_in">Pronta in circa 12 minuti</span>
      </div>
      <button type="button" class="btn btn--solid btn--magnetic" id="builder-add-btn" disabled>
        <span data-i18n="add_your_pizza">Aggiungi la tua pizza</span>
        <span class="builder__missing" id="builder-missing"></span>
      </button>
    </div>
  </div>
</section>
