<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--booking section--osso" id="booking" aria-labelledby="booking-title">
  <div class="booking__layout">
    <div class="booking__intro">
      <h2 class="booking__title" id="booking-title">
        <span>Prenota il</span> <span class="booking__title--italic">tavolo</span>
      </h2>
      <p class="booking__sub" data-i18n="book_few_tables">Pochi tavoli, molto fuoco. Scegli il tuo.</p>
    </div>

    <div class="booking__progress" aria-hidden="true">
      <div class="booking__progress-bar"><div class="booking__progress-fill" style="width:0%"></div></div>
      <span class="booking__progress-step is-active">1</span>
      <span class="booking__progress-step">2</span>
      <span class="booking__progress-step">3</span>
      <span class="booking__progress-step">4</span>
      <span class="booking__progress-step">5</span>
    </div>

    <form class="booking__form" id="booking-form" novalidate>
      <!-- Step 1: Guests -->
      <fieldset class="booking__step" data-step="1">
        <legend class="booking__step-title" data-i18n="how_many">Quanti siete?</legend>
        <div class="booking__guests" id="booking-guests">
          <?php for ($g = 1; $g <= 8; $g++): ?>
          <button type="button" class="booking__guest-btn <?php echo $g === 2 ? 'is-active' : ''; ?>" data-guests="<?php echo $g; ?>" aria-pressed="<?php echo $g === 2 ? 'true' : 'false'; ?>"><?php echo $g; ?></button>
          <?php endfor; ?>
          <button type="button" class="booking__guest-btn" data-guests="9" aria-label="8+">8+</button>
        </div>
        <p class="booking__plus-eight" data-i18n="plus_eight" hidden>Siete in tanti? Chiamaci al +39 0521 000 000.</p>
      </fieldset>

      <!-- Step 2: Date -->
      <fieldset class="booking__step" data-step="2" hidden>
        <legend class="booking__step-title" data-i18n="what_day">Che giorno?</legend>
        <div class="booking__dates" id="booking-dates"></div>
        <button type="button" class="booking__alt-date" data-i18n="another_date">Altra data</button>
      </fieldset>

      <!-- Step 3: Time -->
      <fieldset class="booking__step" data-step="3" hidden>
        <legend class="booking__step-title" data-i18n="what_time">A che ora?</legend>
        <div class="booking__times">
          <div class="booking__time-group">
            <h4 data-i18n="lunch">Pranzo</h4>
            <div class="booking__slots" id="booking-slots-lunch"></div>
          </div>
          <div class="booking__time-group">
            <h4 data-i18n="dinner">Sera</h4>
            <div class="booking__slots" id="booking-slots-dinner"></div>
          </div>
        </div>
      </fieldset>

      <!-- Step 4: Table -->
      <fieldset class="booking__step" data-step="4" hidden>
        <legend class="booking__step-title" data-i18n="pick_table">Scegli il tavolo</legend>
        <svg class="booking__floorplan" viewBox="0 0 800 440" aria-label="Pianta della sala">
          <rect x="0" y="0" width="800" height="440" fill="none"/>
          <!-- Sala zone -->
          <text x="40" y="30" class="fp-zone-label">Sala</text>
          <!-- Bancone zone -->
          <text x="600" y="30" class="fp-zone-label">Bancone sul forno</text>
          <!-- Terrazza zone -->
          <text x="40" y="290" class="fp-zone-label">Terrazza</text>

          <?php foreach ($C['booking']['floorplan'] as $zone):
            foreach ($zone['tables'] as $t):
              $data = json_encode(['id' => $t['id'], 'seats' => $t['seats'], 'zone' => $zone['zone']], JSON_UNESCAPED_UNICODE);
          ?>
          <rect class="fp-table" data-info='<?php echo htmlspecialchars($data, ENT_QUOTES); ?>'
                x="<?php echo $t['x']; ?>" y="<?php echo $t['y']; ?>"
                width="<?php echo $t['w']; ?>" height="<?php echo $t['h']; ?>"
                rx="4" tabindex="0" role="button"
                aria-label="Tavolo <?php echo $t['id']; ?> · <?php echo $t['seats']; ?> posti"/>
          <text class="fp-table-id" x="<?php echo $t['x'] + $t['w']/2; ?>" y="<?php echo $t['y'] + $t['h']/2 + 5; ?>" text-anchor="middle" pointer-events="none"><?php echo $t['id']; ?></text>
          <?php endforeach; endforeach; ?>
        </svg>
        <div class="booking__table-info" id="booking-table-info" data-i18n="nothing_selected">Nessun tavolo selezionato</div>
      </fieldset>

      <!-- Step 5: Details -->
      <fieldset class="booking__step" data-step="5" hidden>
        <legend class="booking__step-title" data-i18n="your_details">I tuoi dati</legend>
        <div class="booking__fields">
          <div class="field">
            <label for="b-name" data-i18n="first_name">Nome</label>
            <input type="text" id="b-name" name="name" required autocomplete="name">
            <span class="field__msg"></span>
          </div>
          <div class="field">
            <label for="b-phone" data-i18n="phone">Telefono</label>
            <input type="tel" id="b-phone" name="phone" required autocomplete="tel">
            <span class="field__msg"></span>
          </div>
          <div class="field">
            <label for="b-email" data-i18n="email">Email</label>
            <input type="email" id="b-email" name="email" required autocomplete="email">
            <span class="field__msg"></span>
          </div>
          <div class="field">
            <label for="b-occasion" data-i18n="occasion">Occasione</label>
            <select id="b-occasion" name="occasion">
              <?php foreach ($C['booking']['occasions'] as $o): ?>
              <option value="<?php echo htmlspecialchars($o['key']); ?>" data-i18n-occ-it="<?php echo htmlspecialchars($o['label_it']); ?>" data-i18n-occ-en="<?php echo htmlspecialchars($o['label_en']); ?>"><?php echo htmlspecialchars($o['label_it']); ?></option>
              <?php endforeach; ?>
            </select>
          </div>
          <div class="field field--full">
            <label for="b-notes" data-i18n="notes">Note</label>
            <textarea id="b-notes" name="notes" rows="3"></textarea>
          </div>
          <label class="booking__privacy">
            <input type="checkbox" name="privacy" required>
            <span data-i18n="privacy">Accetto il trattamento dei dati personali.</span>
          </label>
        </div>
      </fieldset>

      <div class="booking__summary-bar" id="booking-summary-bar" hidden>
        <span id="booking-summary-text"></span>
      </div>

      <div class="booking__actions">
        <button type="button" class="btn btn--outline booking__back" id="booking-back-btn" hidden>&larr; <span>Indietro</span></button>
        <button type="button" class="btn btn--solid booking__next" id="booking-next-btn">Avanti</button>
        <button type="submit" class="btn btn--solid booking__submit" id="booking-submit-btn" hidden data-i18n="confirm_booking">Conferma la prenotazione</button>
      </div>
    </form>
  </div>
</section>
