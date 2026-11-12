<?php
/**
 * /api/order.php — simulate placing an order
 * POST: items[], mode (delivery|takeaway), name, phone, email, address?, notes?, pay
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$items = $input['items'] ?? [];
$mode  = (string)($input['mode'] ?? 'delivery');
$name  = trim((string)($input['name'] ?? ''));
$phone = trim((string)($input['phone'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$pay   = (string)($input['pay'] ?? 'card');

$errors = [];
if (!is_array($items) || count($items) === 0) $errors[] = 'items';
if (!in_array($mode, ['delivery', 'takeaway'])) $errors[] = 'mode';
if ($name === '') $errors[] = 'name';
if ($phone === '' || strlen(preg_replace('/[^0-9+]/', '', $phone)) < 8) $errors[] = 'phone';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if ($mode === 'delivery') {
    $address = trim((string)($input['address'] ?? ''));
    if ($address === '') $errors[] = 'address';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => 'Validation failed.', 'fields' => $errors]);
    exit;
}

$subtotal = 0.0;
foreach ($items as $it) {
    $qty = (int)($it['qty'] ?? 1);
    $price = (float)($it['price'] ?? 0);
    $subtotal += $qty * $price;
}

$fee = 0.0;
if ($mode === 'delivery') {
    $fee = $subtotal >= 25.0 ? 0.0 : 2.50;
    if ($subtotal < 12.0) {
        http_response_code(422);
        echo json_encode(['error' => 'Ordine minimo € 12,00 per la consegna.']);
        exit;
    }
}
$total = $subtotal + $fee;

$code = 'BRC-' . str_pad((string)random_int(1, 9999), 4, '0', STR_PAD_LEFT);

echo json_encode([
    'ok'       => true,
    'code'     => $code,
    'items'    => $items,
    'mode'     => $mode,
    'name'     => $name,
    'phone'    => $phone,
    'email'    => $email,
    'pay'      => $pay,
    'subtotal' => number_format($subtotal, 2, '.', ''),
    'fee'      => number_format($fee, 2, '.', ''),
    'total'    => number_format($total, 2, '.', ''),
    'eta'      => '30-40 min',
], JSON_UNESCAPED_UNICODE);
