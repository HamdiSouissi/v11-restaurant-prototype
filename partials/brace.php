<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--brace section--osso" id="brace" aria-labelledby="brace-title">
  <div class="brace__layout">
    <div class="brace__intro">
      <h2 class="brace__title" id="brace-title">
        <span>La cottura</span> <span class="brace__title--italic">giusta</span>
      </h2>
      <p class="brace__sub" data-i18n="cooking_intro">Ogni taglio ha il suo punto. Scegli il tuo e guarda cosa succede.</p>
    </div>

    <div class="brace__controls">
      <div class="brace__slider" role="group" aria-label="Livello di cottura">
        <?php foreach ($C['cottura'] as $i => $c): ?>
        <button type="button" class="brace__step <?php echo $i === 0 ? 'is-active' : ''; ?>" data-cottura="<?php echo $c['key']; ?>" aria-pressed="<?php echo $i === 0 ? 'true' : 'false'; ?>">
          <span data-i18n-cottura-it="<?php echo $c['label_it']; ?>" data-i18n-cottura-en="<?php echo $c['label_en']; ?>"><?php echo htmlspecialchars($c['label_it']); ?></span>
        </button>
        <?php endforeach; ?>
        <div class="brace__slider-track" aria-hidden="true"></div>
        <div class="brace__slider-thumb" aria-hidden="true"></div>
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

      <div class="brace__meat" aria-hidden="true">
        <svg id="brace-meat-svg" viewBox="0 0 200 140" width="200" height="140"></svg>
      </div>
    </div>

    <div class="brace__cuts">
      <h3 class="brace__cuts-title">I tagli</h3>
      <ul class="brace__cuts-list">
        <li data-cut="tagliata">Tagliata di Manzo</li>
        <li data-cut="costata">Costata di Black Angus</li>
        <li data-cut="agnello">Costolette d'agnello</li>
        <li data-cut="salsiccia">Salsiccia di Parma</li>
        <li data-cut="pollo">Pollo ruspante</li>
      </ul>
      <svg class="brace__diagram" viewBox="0 0 300 160" aria-hidden="true">
        <path class="cut cut-tagliata" d="M30,70 Q80,40 140,50 Q170,70 160,100 Q120,120 60,110 Q20,100 30,70Z" fill="none" stroke-width="1.5"/>
        <path class="cut cut-costata" d="M140,40 Q200,30 250,50 Q280,80 260,110 Q200,130 160,120 Q140,90 140,40Z" fill="none" stroke-width="1.5"/>
        <path class="cut cut-agnello" d="M30,120 Q60,130 90,140 Q80,155 50,150 Q20,140 30,120Z" fill="none" stroke-width="1.5"/>
        <path class="cut cut-salsiccia" d="M170,130 Q210,125 250,140 Q240,155 200,155 Q170,150 170,130Z" fill="none" stroke-width="1.5"/>
        <path class="cut cut-pollo" d="M220,20 Q260,15 280,40 Q275,70 240,80 Q210,70 220,20Z" fill="none" stroke-width="1.5"/>
      </svg>
    </div>

    <button type="button" class="btn btn--solid btn--magnetic" id="brace-cta" data-i18n="discover_grill">Scopri la griglia</button>
  </div>
</section>
