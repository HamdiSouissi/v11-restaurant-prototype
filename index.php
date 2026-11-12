<?php $C = require __DIR__ . '/config.php'; ?>
<?php include __DIR__ . '/partials/head.php'; ?>
<body class="no-scroll-preload">

<?php include __DIR__ . '/partials/icons-svg.php'; ?>
<?php include __DIR__ . '/partials/preloader.php'; ?>
<?php include __DIR__ . '/partials/header.php'; ?>

<main id="main">
  <?php include __DIR__ . '/partials/hero.php'; ?>
  <?php include __DIR__ . '/partials/manifesto.php'; ?>
  <?php include __DIR__ . '/partials/forno.php'; ?>
  <?php include __DIR__ . '/partials/classici.php'; ?>
  <?php include __DIR__ . '/partials/brace.php'; ?>
  <?php include __DIR__ . '/partials/menu.php'; ?>
  <?php include __DIR__ . '/partials/builder.php'; ?>
  <?php include __DIR__ . '/partials/booking.php'; ?>
  <?php include __DIR__ . '/partials/gallery.php'; ?>
  <?php include __DIR__ . '/partials/reviews.php'; ?>
  <?php include __DIR__ . '/partials/info.php'; ?>
</main>

<?php include __DIR__ . '/partials/footer.php'; ?>
<?php include __DIR__ . '/partials/cart-drawer.php'; ?>
<?php include __DIR__ . '/partials/checkout-modal.php'; ?>
<?php include __DIR__ . '/partials/toast.php'; ?>

<div class="mobile-sticky-bar" id="mobile-sticky-bar" hidden>
  <button type="button" class="btn btn--outline" data-i18n="book">Prenota</button>
  <button type="button" class="btn btn--solid" id="mobile-order-btn">
    <span data-i18n="order_count">Ordina</span> · <span class="cart-count">0</span>
  </button>
</div>

</body>
</html>
