<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--menu section--carbone" id="menu" aria-labelledby="menu-title">
  <div class="menu__layout">
    <div class="menu__sticky">
      <div class="menu__preview" id="menu-preview" aria-hidden="true">
        <img src="/assets/img/piatti/margherita-di-bufala.webp" alt="" width="900" height="1080" loading="lazy">
      </div>
    </div>

    <div class="menu__content">
      <h2 class="menu__title" id="menu-title">
        <span>Il</span> <span class="menu__title--italic">menu</span>
      </h2>

      <div class="menu__filters" role="group" aria-label="Filtri menu">
        <button type="button" class="menu__filter is-active" data-filter="all" data-i18n="all">Tutti</button>
        <button type="button" class="menu__filter" data-filter="veg" data-i18n="veg">Veg</button>
        <button type="button" class="menu__filter" data-filter="piccante" data-i18n="spicy">Piccante</button>
        <button type="button" class="menu__filter" data-filter="gluten_free" data-i18n="gluten_free">Senza glutine</button>
      </div>

      <nav class="menu__index" aria-label="Categorie menu">
        <a href="#cat-antipasti" class="menu__index-link is-active"><span>01</span> Antipasti</a>
        <a href="#cat-pizze" class="menu__index-link"><span>02</span> Pizze</a>
        <a href="#cat-brace" class="menu__index-link"><span>03</span> Dalla brace</a>
        <a href="#cat-contorni" class="menu__index-link"><span>04</span> Contorni</a>
        <a href="#cat-dolci" class="menu__index-link"><span>05</span> Dolci</a>
        <a href="#cat-cantina" class="menu__index-link"><span>06</span> Cantina</a>
      </nav>

      <?php
      $cats = [
        ['key' => 'antipasti', 'label' => 'Antipasti'],
        ['key' => 'pizze',     'label' => 'Pizze'],
        ['key' => 'brace',     'label' => 'Dalla brace'],
        ['key' => 'contorni',  'label' => 'Contorni'],
        ['key' => 'dolci',     'label' => 'Dolci'],
        ['key' => 'cantina',   'label' => 'Cantina'],
      ];
      foreach ($cats as $ci => $cat):
        $items = $C['menu'][$cat['key']] ?? [];
      ?>
      <div class="menu__category" id="cat-<?php echo $cat['key']; ?>">
        <h3 class="menu__cat-title"><span><?php echo str_pad($ci + 1, 2, '0', STR_PAD_LEFT); ?></span> <?php echo $cat['label']; ?></h3>
        <ul class="menu__list">
          <?php foreach ($items as $item):
            $tags = [];
            if (!empty($item['veg'])) $tags[] = 'veg';
            if (!empty($item['piccante'])) $tags[] = 'piccante';
            if (!empty($item['gluten_free'])) $tags[] = 'gluten_free';
            $tag_attr = implode(' ', $tags);
          ?>
          <li class="menu__item" data-tags="<?php echo $tag_attr; ?>" data-slug="<?php echo htmlspecialchars($item['slug']); ?>" data-name="<?php echo htmlspecialchars($item['name_it']); ?>" data-price="<?php echo htmlspecialchars($item['price']); ?>">
            <div class="menu__item-head">
              <div class="menu__item-title-row">
                <h4 class="menu__item-title"><?php echo htmlspecialchars($item['name_it']); ?></h4>
                <div class="menu__item-tags" aria-label="Caratteristiche">
                  <?php if (!empty($item['veg'])): ?><span class="tag tag--veg" title="Vegetariano">Veg</span><?php endif; ?>
                  <?php if (!empty($item['piccante'])): ?><span class="tag tag--piccante" title="Piccante">Piccante</span><?php endif; ?>
                  <?php if (!empty($item['gluten_free'])): ?><span class="tag tag--gf" title="Senza glutine">Senza glutine</span><?php endif; ?>
                </div>
              </div>
              <span class="menu__item-price">€ <?php echo htmlspecialchars($item['price']); ?></span>
            </div>
            <?php if (!empty($item['desc_it'])): ?>
            <p class="menu__item-desc"><?php echo htmlspecialchars($item['desc_it']); ?></p>
            <?php endif; ?>
            <?php if (!empty($item['allergens'])): ?>
            <div class="menu__item-allergens" aria-label="Allergeni">
              <?php foreach ($item['allergens'] as $a): ?>
              <span class="allergen"><?php echo htmlspecialchars($a); ?></span>
              <?php endforeach; ?>
            </div>
            <?php endif; ?>
            <button type="button" class="menu__add-btn" aria-label="Aggiungi <?php echo htmlspecialchars($item['name_it']); ?>">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
            </button>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>
      <?php endforeach; ?>

      <p class="menu__note">
        <span data-i18n="price_vat">Prezzi IVA inclusa.</span>
        <span data-i18n="allergies_note">Allergie? Chiedi pure, ci pensiamo noi.</span>
      </p>
    </div>
  </div>
</section>
