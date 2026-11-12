<?php $C = require __DIR__ . '/../config.php'; ?>
<aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Carrello" hidden>
  <div class="cart-drawer__backdrop" id="cart-backdrop"></div>
  <div class="cart-drawer__panel">
    <div class="cart-drawer__head">
      <h2 class="cart-drawer__title">Il tuo ordine</h2>
      <button type="button" class="cart-drawer__close" id="cart-close" aria-label="Chiudi carrello">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="cart-drawer__mode">
      <button type="button" class="cart-drawer__mode-btn is-active" data-mode="delivery" data-i18n="delivery">Consegna</button>
      <button type="button" class="cart-drawer__mode-btn" data-mode="takeaway" data-i18n="takeaway">Asporto</button>
    </div>

    <div class="cart-drawer__body" id="cart-body">
      <!-- Empty state -->
      <div class="cart-drawer__empty" id="cart-empty">
        <svg width="96" height="96" viewBox="0 0 64 64" fill="none" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <ellipse cx="32" cy="20" rx="18" ry="14"/>
          <path d="M32 34v22M24 56h16"/>
        </svg>
        <p class="cart-drawer__empty-title" data-i18n="empty_cart">Il tavolo è ancora vuoto</p>
        <p class="cart-drawer__empty-sub" data-i18n="empty_cart_sub">Scegli qualcosa dal forno.</p>
        <button type="button" class="btn btn--outline" id="cart-go-menu" data-i18n="go_menu">Vai al menu</button>
      </div>
      <ul class="cart-drawer__items" id="cart-items"></ul>
    </div>

    <div class="cart-drawer__footer" id="cart-footer" hidden>
      <div class="cart-drawer__delivery-bar" id="cart-delivery-bar" hidden>
        <div class="cart-drawer__delivery-fill" id="cart-delivery-fill"></div>
        <span id="cart-delivery-msg"></span>
      </div>
      <dl class="cart-drawer__totals">
        <div><dt data-i18n="sub_total">Subtotale</dt><dd id="cart-subtotal">€ 0,00</dd></div>
        <div id="cart-fee-row" hidden><dt data-i18n="delivery_fee">Consegna</dt><dd id="cart-fee">€ 2,50</dd></div>
        <div class="cart-drawer__total-row"><dt data-i18n="total">Totale</dt><dd id="cart-total">€ 0,00</dd></div>
      </dl>
      <button type="button" class="btn btn--solid btn--full" id="cart-checkout-btn" data-i18n="checkout">Vai alla cassa</button>
    </div>
  </div>
</aside>
