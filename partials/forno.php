<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--forno section--carbone" id="forno" aria-labelledby="forno-title">
  <div class="forno__layout">
    <div class="forno__sticky">
      <div class="forno__img-wrap">
        <picture class="forno__picture">
          <img class="forno__img" src="/assets/img/forno-01.webp" alt="La cupola del forno a legna" width="960" height="1200" loading="lazy">
        </picture>
      </div>
    </div>
    <div class="forno__content">
      <h2 class="forno__title" id="forno-title">
        <span>Il</span> <span class="forno__title--italic">forno</span>
      </h2>
      <p class="forno__text">
        Cupola in mattoni refrattari, legna di quercia, 485 gradi. La pizza è pronta in novanta secondi, ma ci vogliono tre giorni per arrivarci.
      </p>
      <ul class="forno__counters">
        <li class="forno__counter">
          <span class="forno__counter-num" data-target="485">0</span><span class="forno__counter-unit">°</span>
          <span class="forno__counter-label">temperatura del forno</span>
        </li>
        <li class="forno__counter">
          <span class="forno__counter-num" data-target="72">0</span><span class="forno__counter-unit"> h</span>
          <span class="forno__counter-label">di lievitazione</span>
        </li>
        <li class="forno__counter">
          <span class="forno__counter-num" data-target="90">0</span><span class="forno__counter-unit"> s</span>
          <span class="forno__counter-label">nel forno</span>
        </li>
      </ul>
    </div>
  </div>
</section>
