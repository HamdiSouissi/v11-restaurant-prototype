<?php
/**
 * /api/booking.php — simulate a table booking
 * POST: name, phone, email, date, time, guests, table, occasion, notes
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

$name    = trim((string)($input['name'] ?? ''));
$phone   = trim((string)($input['phone'] ?? ''));
$email   = trim((string)($input['email'] ?? ''));
$date    = trim((string)($input['date'] ?? ''));
$time    = trim((string)($input['time'] ?? ''));
$guests  = (int)($input['guests'] ?? 0);
$table   = trim((string)($input['table'] ?? ''));
$occasion= trim((string)($input['occasion'] ?? 'none'));
$notes   = trim((string)($input['notes'] ?? ''));

$errors = [];
if ($name === '') $errors[] = 'name';
if ($phone === '' || strlen(preg_replace('/[^0-9+]/', '', $phone)) < 8) $errors[] = 'phone';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'email';
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) $errors[] = 'date';
if (!preg_match('/^\d{2}:\d{2}$/', $time)) $errors[] = 'time';
if ($guests < 1 || $guests > 20) $errors[] = 'guests';
if ($table === '') $errors[] = 'table';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['error' => 'Validation failed.', 'fields' => $errors]);
    exit;
}

$code = 'BRC-T-' . str_pad((string)random_int(1, 9999), 4, '0', STR_PAD_LEFT);

// Generate .ics content
$icsDate = str_replace('-', '', $date);
$icsStart = $icsDate . 'T' . str_replace(':', '', $time) . '00';
$endTime = date('H:i', strtotime($time . ' +2 hours'));
$icsEnd = $icsDate . 'T' . str_replace(':', '', $endTime) . '00';
$ics = "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Brace//Booking//IT\r\nBEGIN:VEVENT\r\n";
$ics .= "DTSTART:{$icsStart}\r\nDTEND:{$icsEnd}\r\n";
$ics .= "SUMMARY:Prenotazione Brace – Tavolo {$table}\r\n";
$ics .= "DESCRIPTION:{$guests} persone · {$occasion}\r\n";
$ics .= "LOCATION:Via Esempio 21, 43121 Parma (PR)\r\n";
$ics .= "UID:{$code}@bracegriglia.it\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n";

echo json_encode([
    'ok'       => true,
    'code'     => $code,
    'name'     => $name,
    'phone'    => $phone,
    'email'    => $email,
    'date'     => $date,
    'time'     => $time,
    'guests'   => $guests,
    'table'    => $table,
    'occasion' => $occasion,
    'notes'    => $notes,
    'ics'      => $ics,
], JSON_UNESCAPED_UNICODE);
