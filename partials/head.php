<?php $C = require __DIR__ . '/../config.php'; ?>
<!doctype html>
<html lang="it" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="<?php echo htmlspecialchars($C['colors']['carbone']); ?>">
<meta name="color-scheme" content="dark">
<title><?php echo htmlspecialchars($C['brand']['name'] . ' · ' . $C['brand']['subtitle'] . ' · ' . $C['brand']['city']); ?></title>
<meta name="description" content="<?php echo htmlspecialchars($C['brand']['tagline_it'] . ' — ' . $C['brand']['subtitle'] . ' a ' . $C['brand']['city'] . '. Forno a legna a 485°C, impasto a 72 ore, carne alla brace.'); ?>">
<link rel="canonical" href="">

<meta property="og:type" content="restaurant.restaurant">
<meta property="og:site_name" content="<?php echo htmlspecialchars($C['brand']['name']); ?>">
<meta property="og:title" content="<?php echo htmlspecialchars($C['brand']['name'] . ' · ' . $C['brand']['subtitle']); ?>">
<meta property="og:description" content="<?php echo htmlspecialchars($C['brand']['tagline_it']); ?>">
<meta property="og:image" content="/assets/img/hero.jpg">
<meta property="og:locale" content="it_IT">
<meta property="og:locale:alternate" content="en_US">

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"Restaurant",
  "name":"<?php echo htmlspecialchars($C['brand']['name']); ?>",
  "servesCuisine":["Pizza","Grill","Cucina italiana"],
  "address":{"@type":"PostalAddress","streetAddress":"<?php echo htmlspecialchars($C['brand']['address']); ?>"},
  "telephone":"<?php echo htmlspecialchars($C['contact']['phone']); ?>",
  "email":"<?php echo htmlspecialchars($C['contact']['email']); ?>",
  "priceRange":"€€",
  "openingHours":["Tu-Th 12:00-14:30,19:00-23:30","Fr-Sa 12:00-14:30,19:00-00:30","Su 19:00-23:30"]
}
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Space+Grotesk:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css?v=1">

<script>
window.CONFIG = <?php
  $safe = $C;
  echo json_encode($safe, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
?>;
window.MENU = <?php echo json_encode($C['menu'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
window.I18N = <?php echo json_encode($C['i18n'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); ?>;
document.documentElement.classList.remove('no-js');

// HARD FALLBACK: if main.js never runs (CDN blocked, network error),
// still unblock the body after 3s so the page is usable.
(function(){
  var t = setTimeout(function(){
    document.body.classList.remove('no-scroll-preload');
    var p = document.getElementById('preloader');
    if (p && p.parentNode) p.remove();
  }, 3000);
  window.__bracePreloaderCleared = function(){ clearTimeout(t); };
})();
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js" defer></script>

<script src="/assets/js/i18n.js" defer></script>
<script src="/assets/js/embers.js" defer></script>
<script src="/assets/js/hero.js" defer></script>
<script src="/assets/js/cottura.js" defer></script>
<script src="/assets/js/menu.js" defer></script>
<script src="/assets/js/builder.js" defer></script>
<script src="/assets/js/cart.js" defer></script>
<script src="/assets/js/booking.js" defer></script>
<script src="/assets/js/gallery.js" defer></script>
<script src="/assets/js/checkout.js" defer></script>
<script src="/assets/js/main.js" defer></script>
</head>
