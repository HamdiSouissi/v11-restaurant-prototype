<?php $C = require __DIR__ . '/../config.php'; ?>
<header class="site-header" id="site-header">
  <nav class="site-header__nav" aria-label="Principale">
    <button class="site-header__burger" id="nav-burger" type="button" aria-label="Apri il menu" aria-expanded="false" aria-controls="mobile-menu">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>

    <ul class="site-header__left">
      <li><a href="#menu" data-i18n="menu">Menu</a></li>
      <li><a href="#brace" data-i18n="the_ember">La Brace</a></li>
      <li><a href="#builder" data-i18n="compose">Componi</a></li>
    </ul>

    <a href="/" class="site-header__logo" aria-label="<?php echo htmlspecialchars($C['brand']['name']); ?> — home">
      <span class="site-header__wordmark">BRACE</span>
      <span class="site-header__sub"><?php echo htmlspecialchars($C['brand']['subtitle']); ?></span>
    </a>

    <ul class="site-header__right">
      <li>
        <span class="oven-dot" aria-hidden="true"></span>
        <span class="site-header__oven" data-i18n="oven_at">Forno a 485°C</span>
      </li>
      <li><button type="button" class="lang-switch" id="lang-switch" aria-label="Cambia lingua">IT / EN</button></li>
      <li><button type="button" class="site-header__book" id="nav-book-btn" data-i18n="book">Prenota</button></li>
      <li><button type="button" class="site-header__find" data-i18n="find_us">Dove siamo</button></li>
      <li>
        <button type="button" class="site-header__order" id="nav-order-btn" aria-label="Apri il carrello">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span data-i18n="order_count">Ordina</span> · <span class="cart-count">0</span>
        </button>
      </li>
    </ul>
  </nav>
</header>

<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu di navigazione" hidden>
  <button type="button" class="mobile-menu__close" id="mobile-menu-close" aria-label="Chiudi il menu">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
  </button>
  <ul class="mobile-menu__links">
    <li><a href="#menu" data-i18n="menu">Menu</a></li>
    <li><a href="#brace" data-i18n="the_ember">La Brace</a></li>
    <li><a href="#builder" data-i18n="compose">Componi</a></li>
    <li><a href="#booking" data-i18n="book">Prenota</a></li>
    <li><a href="#info" data-i18n="find_us">Dove siamo</a></li>
  </ul>
  <div class="mobile-menu__footer">
    <button type="button" class="btn btn--solid" data-i18n="order_now">Ordina adesso</button>
    <button type="button" class="btn btn--outline" data-i18n="book_table">Prenota un tavolo</button>
  </div>
</div>
