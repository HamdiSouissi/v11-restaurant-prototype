<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--brace section--osso" id="brace" aria-labelledby="brace-title">
  <div class="brace__layout">
    <div class="brace__intro">
      <h2 class="brace__title" id="brace-title">
        <span>La cottura</span> <span class="brace__title--italic">giusta</span>
      </h2>
      <p class="brace__sub" data-i18n="cooking_intro">Ogni taglio ha il suo punto. Scegli il tuo e guarda cosa succede.</p>
    </div>

    <div class="brace__slider" role="group" aria-label="Livello di cottura">
      <?php foreach ($C['cottura'] as $i => $c): ?>
      <button type="button" class="brace__step <?php echo $i === 0 ? 'is-active' : ''; ?>" data-cottura="<?php echo $c['key']; ?>" aria-pressed="<?php echo $i === 0 ? 'true' : 'false'; ?>">
        <span data-i18n-cottura-it="<?php echo $c['label_it']; ?>" data-i18n-cottura-en="<?php echo $c['label_en']; ?>"><?php echo htmlspecialchars($c['label_it']); ?></span>
      </button>
      <?php endforeach; ?>
    </div>

    <div class="brace__meat-display">
      <div class="brace__meat-gradient" id="brace-meat-gradient" style="background: linear-gradient(90deg, #6e1010 0%, #8a2020 50%, #6e1010 100%);"></div>
    </div>

    <div class="brace__readout">
      <div class="brace__readout-item">
        <div class="brace__readout-big" id="brace-temp">50°C</div>
        <div class="brace__readout-label" data-i18n="heart_temp">Temperatura a cuore</div>
      </div>
      <div class="brace__readout-item">
        <div class="brace__readout-big" id="brace-time">4 min</div>
        <div class="brace__readout-label" data-i18n="grill_time">Tempo di grill</div>
      </div>
    </div>

    <div class="brace__cuts">
      <h3 class="brace__cuts-title">I tagli</h3>
      <ul class="brace__cuts-list">
        <li>Tagliata di Manzo</li>
        <li>Costata di Black Angus</li>
        <li>Costolette d'agnello</li>
        <li>Salsiccia di Parma</li>
        <li>Pollo ruspante</li>
      </ul>
    </div>

    <button type="button" class="btn btn--solid btn--magnetic" id="brace-cta" data-i18n="discover_grill">Scopri la griglia</button>
  </div>
</section>
