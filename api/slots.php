<?php
/**
 * /api/slots.php — return available time slots for a given date & guest count
 * Query: ?date=YYYY-MM-DD&guests=N
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$date = $_GET['date'] ?? '';
$guests = (int)($_GET['guests'] ?? 2);

if (!$date || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid date. Use YYYY-MM-DD.']);
    exit;
}

$ts = strtotime($date);
if ($ts === false) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid date.']);
    exit;
}

// Monday = 1 → closed
$dow = (int)date('N', $ts);
if ($dow === 1) {
    echo json_encode(['closed' => true, 'lunch' => [], 'dinner' => []]);
    exit;
}

$now = new DateTimeImmutable();
$todayStr = $now->format('Y-m-d');
$isPast = $date < $todayStr;

$makeSlot = function (string $time, bool $full = false, bool $last = false) use ($date, $isPast) {
    $dt = DateTimeImmutable::createFromFormat('Y-m-d H:i', "$date $time");
    $unavailable = $isPast && $dt && $dt < (new DateTimeImmutable())->setTime(0, 0, 0);
    return [
        'time' => $time,
        'unavailable' => $unavailable || $full,
        'last_tables' => $last,
    ];
};

// Lunch: 12:00 – 14:30, 30 min
$lunch = [];
$lunchStart = new DateTimeImmutable("$date 12:00");
$lunchEnd = new DateTimeImmutable("$date 14:30");
$current = $lunchStart;
$idx = 0;
while ($current <= $lunchEnd) {
    $full = in_array($idx, [3, 5]); // simulate some full slots
    $last = in_array($idx, [2, 4]);
    $lunch[] = $makeSlot($current->format('H:i'), $full, $last);
    $current = $current->modify('+30 minutes');
    $idx++;
}

// Dinner: 19:00 – 23:00, 30 min
$dinner = [];
$dinnerStart = new DateTimeImmutable("$date 19:00");
$dinnerEnd = new DateTimeImmutable("$date 23:00");
$current = $dinnerStart;
$idx = 0;
while ($current <= $dinnerEnd) {
    $full = in_array($idx, [4, 7, 9]);
    $last = in_array($idx, [3, 6, 8]);
    $dinner[] = $makeSlot($current->format('H:i'), $full, $last);
    $current = $current->modify('+30 minutes');
    $idx++;
}

echo json_encode([
    'date'    => $date,
    'guests'  => $guests,
    'lunch'   => $lunch,
    'dinner'  => $dinner,
], JSON_UNESCAPED_UNICODE);
