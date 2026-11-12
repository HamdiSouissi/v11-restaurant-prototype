<?php $C = require __DIR__ . '/../config.php'; ?>
<footer class="site-footer" id="footer" role="contentinfo">
  <div class="footer__embers-wrap">
    <canvas class="footer__embers" id="footer-embers" aria-hidden="true"></canvas>
  </div>

  <div class="footer__wordmark" id="footer-wordmark" aria-hidden="true">
    <span>B</span><span>R</span><span>A</span><span>C</span><span>E</span>
  </div>

  <div class="footer__newsletter">
    <p class="footer__nl-label" data-i18n="stay_close">Resta vicino al fuoco</p>
    <form class="footer__nl-form" id="nl-form" novalidate>
      <label for="nl-email" class="sr-only" data-i18n="your_email">La tua email</label>
      <input type="email" id="nl-email" name="email" placeholder="La tua email" required data-i18n-placeholder="your_email">
      <button type="submit" class="btn btn--solid btn--small" data-i18n="subscribe">Iscrizione</button>
    </form>
  </div>

  <div class="footer__bottom">
    <ul class="footer__socials">
      <li><a href="https://instagram.com/<?php echo ltrim($C['socials']['instagram'], '@'); ?>" target="_blank" rel="noopener" aria-label="Instagram">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/></svg>
      </a></li>
      <li><a href="https://tiktok.com/<?php echo ltrim($C['socials']['tiktok'], '@'); ?>" target="_blank" rel="noopener" aria-label="TikTok">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
      </a></li>
      <li><a href="https://facebook.com/<?php echo rawurlencode($C['socials']['facebook']); ?>" target="_blank" rel="noopener" aria-label="Facebook">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a></li>
    </ul>
    <p class="footer__legal">
      <?php echo htmlspecialchars($C['brand']['legal'] . ' ' . $C['brand']['vat']); ?> ·
      <a href="#" data-i18n="privacy_text">Privacy</a> ·
      <a href="#" data-i18n="cookie_text">Cookie</a>
    </p>
    <button type="button" class="footer__top" id="back-to-top" aria-label="Torna su">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    </button>
  </div>

  <?php if ($C['demo_badge']): ?>
  <div class="demo-badge" aria-label="Versione demo">Demo</div>
  <?php endif; ?>
</footer>
