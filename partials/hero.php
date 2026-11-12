<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--hero" id="hero" aria-labelledby="hero-title">
  <div class="hero__media" aria-hidden="true">
    <video class="hero__video" autoplay muted loop playsinline preload="metadata" poster="/assets/img/hero.jpg">
      <source src="/assets/video/forno-loop.mp4" type="video/mp4">
    </video>
    <img class="hero__poster" src="/assets/img/hero.jpg" alt="" width="1280" height="720" loading="eager" fetchpriority="high">
    <div class="hero__grain"></div>
    <div class="hero__vignette"></div>
    <canvas class="hero__embers" id="hero-embers" aria-hidden="true"></canvas>
    <div class="hero__lantern" id="hero-lantern" aria-hidden="true"></div>
  </div>

  <div class="hero__content">
    <h1 class="hero__title" id="hero-title">
      <span class="hero__line"><span class="hero__line-inner" data-split>Fuoco,</span></span>
      <span class="hero__line"><span class="hero__line-inner hero__line-inner--italic" data-split>farina,</span></span>
      <span class="hero__line"><span class="hero__line-inner" data-split>tempo.</span></span>
    </h1>
    <p class="hero__sub">
      <span data-i18n-tagline="it">Pizza a lunga lievitazione e carne alla brace. Un forno a legna, nessuna scorciatoia.</span>
      <span data-i18n-tagline="en" hidden>Pizza with long fermentation and grilled meat. A wood-fired oven, no shortcuts.</span>
    </p>
    <div class="hero__ctas">
      <button type="button" class="btn btn--solid btn--magnetic" data-i18n="order_now">Ordina adesso</button>
      <button type="button" class="btn btn--outline btn--magnetic" data-i18n="book_table">Prenota un tavolo</button>
    </div>
  </div>

  <div class="hero__footer">
    <div class="hero__status">
      <span class="oven-dot" aria-hidden="true"></span>
      <span id="hero-oven-label" data-i18n="oven_on_since">Forno acceso da</span>
      <time id="hero-oven-time" datetime="">00:00:00</time>
    </div>
    <div class="hero__scroll" data-i18n="scroll">
      <span>Scorri</span>
      <span class="hero__scroll-line" aria-hidden="true"></span>
    </div>
  </div>
</section>
