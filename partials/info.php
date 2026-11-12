<?php $C = require __DIR__ . '/../config.php'; ?>
<section class="section section--info section--carbone" id="info" aria-labelledby="info-title">
  <div class="info__layout">
    <div class="info__map">
      <svg class="info__map-svg" viewBox="0 0 400 300" aria-label="Mappa di Parma">
        <!-- Simplified Parma map illustration -->
        <path class="map-river" d="M0,180 Q60,170 120,180 Q180,200 240,190 Q300,175 360,190 Q390,200 400,195" fill="none" stroke-width="2"/>
        <path class="map-road" d="M0,100 Q100,95 200,100 Q300,105 400,100" fill="none" stroke-width="1.5"/>
        <path class="map-road" d="M0,220 Q150,215 300,225 Q370,230 400,225" fill="none" stroke-width="1.5"/>
        <path class="map-road" d="M100,0 Q95,80 100,150 Q105,220 100,300" fill="none" stroke-width="1.5"/>
        <path class="map-road" d="M200,0 Q205,60 200,120 Q195,180 200,240 Q205,280 200,300" fill="none" stroke-width="1.5"/>
        <path class="map-road" d="M300,0 Q305,100 300,200 Q295,260 300,300" fill="none" stroke-width="1.5"/>

        <!-- Pulsing pin at Via Esempio 21 -->
        <circle class="map-pin-pulse" cx="220" cy="140" r="18" aria-hidden="true"/>
        <circle class="map-pin-core" cx="220" cy="140" r="7"/>
        <path class="map-pin-needle" d="M220,140 L220,115" fill="none" stroke-width="1.5"/>
      </svg>
    </div>

    <div class="info__content">
      <h2 class="info__title" id="info-title">
        <span>Dove</span> <span class="info__title--italic">siamo</span>
      </h2>

      <div class="info__block">
        <h3 class="info__block-title">Dove</h3>
        <address class="info__address"><?php echo htmlspecialchars($C['brand']['address']); ?></address>
        <a class="info__directions" href="https://www.google.com/maps/search/?api=1&query=<?php echo urlencode($C['brand']['address']); ?>" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-7-7.58-7-13a7 7 0 0 1 14 0c0 5.42-7 13-7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>
          <span data-i18n="take_me_there">Portami lì</span>
        </a>
      </div>

      <div class="info__block">
        <h3 class="info__block-title">Quando</h3>
        <div class="info__hours" id="info-hours">
          <?php
          $days_it = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
          $keys = ['mon','tue','wed','thu','fri','sat','sun'];
          $today = strtolower(date('D'));
          $map = ['mon'=>'mon','tue'=>'tue','wed'=>'wed','thu'=>'thu','fri'=>'fri','sat'=>'sat','sun'=>'sun'];
          $today_key = $map[$today] ?? 'mon';
          foreach ($keys as $i => $k):
            $h = $C['hours'][$k];
            $is_today = $k === $today_key;
            $label = $days_it[$i];
          ?>
          <div class="info__day <?php echo $is_today ? 'is-today' : ''; ?>">
            <span><?php echo $label; ?></span>
            <span>
              <?php if (!empty($h['closed'])): ?>
                <span data-i18n="closed">Chiuso</span>
              <?php else: ?>
                <?php echo htmlspecialchars($h['lunch'] ? $h['lunch'] . ' · ' : ''); ?><?php echo htmlspecialchars($h['dinner'] ?? ''); ?>
              <?php endif; ?>
            </span>
          </div>
          <?php endforeach; ?>
        </div>
        <div class="info__status" id="info-status"></div>
      </div>

      <div class="info__block">
        <h3 class="info__block-title">Contatti</h3>
        <div class="info__contacts">
          <a href="tel:<?php echo preg_replace('/[^+0-9]/', '', $C['contact']['phone']); ?>">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.58 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <?php echo htmlspecialchars($C['contact']['phone']); ?>
          </a>
          <a href="mailto:<?php echo htmlspecialchars($C['contact']['email']); ?>">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
            <?php echo htmlspecialchars($C['contact']['email']); ?>
          </a>
          <a href="https://instagram.com/<?php echo ltrim($C['socials']['instagram'], '@'); ?>" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg>
            <?php echo htmlspecialchars($C['socials']['instagram']); ?>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
