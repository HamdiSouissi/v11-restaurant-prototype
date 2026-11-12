<div class="checkout-modal" id="checkout-modal" role="dialog" aria-modal="true" aria-label="Checkout" hidden>
  <div class="checkout-modal__backdrop" id="checkout-backdrop"></div>
  <div class="checkout-modal__panel">
    <div class="checkout-modal__head">
      <h2 class="checkout-modal__title">Checkout</h2>
      <button type="button" class="checkout-modal__close" id="checkout-close" aria-label="Chiudi">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <div class="checkout-modal__progress" aria-hidden="true">
      <span class="checkout-modal__dot is-active">1</span>
      <span class="checkout-modal__dot">2</span>
      <span class="checkout-modal__dot">3</span>
    </div>

    <form id="checkout-form" novalidate>
      <!-- Step 1: Details -->
      <fieldset class="checkout__step" data-step="1">
        <legend class="checkout__step-title" data-i18n="your_details">I tuoi dati</legend>
        <div class="checkout__fields">
          <div class="field">
            <label for="c-name" data-i18n="first_name">Nome</label>
            <input type="text" id="c-name" name="name" required autocomplete="name">
            <span class="field__msg"></span>
          </div>
          <div class="field">
            <label for="c-phone" data-i18n="phone">Telefono</label>
            <input type="tel" id="c-phone" name="phone" required autocomplete="tel">
            <span class="field__msg"></span>
          </div>
          <div class="field">
            <label for="c-email" data-i18n="email">Email</label>
            <input type="email" id="c-email" name="email" required autocomplete="email">
            <span class="field__msg"></span>
          </div>
          <div class="field delivery-only">
            <label for="c-address" data-i18n="address">Indirizzo</label>
            <input type="text" id="c-address" name="address" autocomplete="street-address">
            <span class="field__msg"></span>
          </div>
          <div class="field delivery-only">
            <label for="c-notes" data-i18n="notes">Note per il rider</label>
            <textarea id="c-notes" name="notes" rows="2"></textarea>
          </div>
        </div>
      </fieldset>

      <!-- Step 2: Payment -->
      <fieldset class="checkout__step" data-step="2" hidden>
        <legend class="checkout__step-title" data-i18n="payment">Pagamento</legend>
        <p class="checkout__sim" data-i18n="simulated_pay">Pagamento simulato. Nessun addebito.</p>
        <div class="checkout__pay-methods">
          <label class="checkout__pay-opt">
            <input type="radio" name="pay" value="card" checked>
            <span class="checkout__pay-name" data-i18n="card">Carta</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
          </label>
          <label class="checkout__pay-opt">
            <input type="radio" name="pay" value="satispay">
            <span class="checkout__pay-name" data-i18n="satispay">Satispay</span>
          </label>
          <label class="checkout__pay-opt">
            <input type="radio" name="pay" value="cash">
            <span class="checkout__pay-name" data-i18n="cash">Contanti</span>
          </label>
        </div>
      </fieldset>

      <!-- Step 3: Confirm -->
      <fieldset class="checkout__step" data-step="3" hidden>
        <legend class="checkout__step-title" data-i18n="confirm">Conferma</legend>
        <div class="checkout__summary" id="checkout-summary"></div>
      </fieldset>

      <!-- Success -->
      <div class="checkout__success" id="checkout-success" hidden>
        <svg class="checkout__seal" viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
          <circle cx="60" cy="60" r="56" fill="none" stroke-width="2" stroke-dasharray="352" stroke-dashoffset="352"/>
          <text x="60" y="68" text-anchor="middle" font-family="'Bodoni Moda', serif" font-size="22" font-style="italic">Grazie</text>
        </svg>
        <p class="checkout__ok-title" data-i18n="order_confirmed">Ordine confermato</p>
        <p class="checkout__order-num" id="checkout-order-num">N° BRC-0000</p>
        <div class="checkout__tracker">
          <div class="checkout__tracker-step is-active">
            <div class="checkout__tracker-dot"></div>
            <span data-i18n="dough_ready">Impasto steso</span>
          </div>
          <div class="checkout__tracker-step">
            <div class="checkout__tracker-dot"></div>
            <span data-i18n="in_oven">In forno</span>
            <div class="checkout__thermometer" aria-hidden="true">
              <div class="checkout__thermometer-fill"></div>
            </div>
            <div class="checkout__ring-wrap" aria-hidden="true">
              <svg viewBox="0 0 64 64" width="48" height="48">
                <circle cx="32" cy="32" r="28" fill="none" stroke-width="3" stroke-dasharray="176" stroke-dashoffset="176" class="checkout__ring"/>
              </svg>
            </div>
          </div>
          <div class="checkout__tracker-step">
            <div class="checkout__tracker-dot"></div>
            <span data-i18n="out_oven">Fuori dal forno</span>
          </div>
          <div class="checkout__tracker-step">
            <div class="checkout__tracker-dot"></div>
            <span data-i18n="ready">In consegna / Pronta al banco</span>
          </div>
        </div>
        <p class="checkout__eta"><span data-i18n="est_arrival">Arrivo stimato</span>: <span data-i18n-tag-delivery="30–40 min">30–40 min</span></p>
      </div>

      <div class="checkout__actions">
        <button type="button" class="btn btn--outline checkout__back" id="checkout-back-btn" hidden>&larr;</button>
        <button type="button" class="btn btn--solid checkout__next" id="checkout-next-btn">Avanti</button>
      </div>
    </form>
  </div>
</div>
