<?php
/**
 * Суши Мать — Серверная отправка заказов в Telegram
 * POST /api/send-order.php
 * Body: JSON { items, total, phone, name, address, payment, comment, deliveryTime }
 */

// === КОНФИГУРАЦИЯ (заполни свои данные) ===
define('TG_BOT_TOKEN', getenv('TG_BOT_TOKEN') ?: '');  // Токен бота
define('TG_CHAT_ID', getenv('TG_CHAT_ID') ?: '');      // ID чата/группы

// Режим отладки — отправляет заказы в файл если токен не задан
$DEBUG_MODE = empty(TG_BOT_TOKEN) || empty(TG_CHAT_ID);

// === CORS ===
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://sushimom.ru');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Only POST allowed']);
    exit;
}

// === ЧТЕНИЕ ДАННЫХ ===
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || empty($data['items']) || empty($data['phone'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Missing required fields: items, phone']);
    exit;
}

// === ФОРМАТИРОВАНИЕ ЗАКАЗА ===
$items = $data['items'];
$total = $data['total'] ?? 0;
$phone = htmlspecialchars($data['phone'] ?? '');
$name = htmlspecialchars($data['name'] ?? 'Не указано');
$address = htmlspecialchars($data['address'] ?? 'Самовывоз');
$payment = $data['payment'] ?? 'Наличные';
$comment = htmlspecialchars($data['comment'] ?? '');
$deliveryTime = $data['deliveryTime'] ?? 'Как можно скорее';
$orderId = 'SM-' . date('ymd') . '-' . substr(uniqid(), -4);
$date = date('d.m.Y H:i');

// Формируем список товаров
$itemsText = '';
foreach ($items as $i => $item) {
    $n = $i + 1;
    $itemName = htmlspecialchars($item['name'] ?? 'Товар');
    $qty = $item['quantity'] ?? 1;
    $price = $item['price'] ?? 0;
    $itemTotal = $qty * $price;
    $itemsText .= "$n. {$itemName} x{$qty} = {$itemTotal}₽\n";
}

// === СОБИРАЕМ СООБЩЕНИЕ ===
$message = "🍣 <b>НОВЫЙ ЗАКАЗ {$orderId}</b>\n";
$message .= "━━━━━━━━━━━━━━━━━━━━\n";
$message .= "📅 {$date}\n\n";

$message .= "👤 <b>Клиент:</b> {$name}\n";
$message .= "📱 <b>Телефон:</b> <code>{$phone}</code>\n";
$message .= "📍 <b>Адрес:</b> {$address}\n";
$message .= "⏰ <b>Время доставки:</b> {$deliveryTime}\n";
$message .= "💳 <b>Оплата:</b> {$payment}\n\n";

$message .= "📦 <b>Состав заказа:</b>\n";
$message .= "━━━━━━━━━━━━━━━━━━━━\n";
$message .= $itemsText;
$message .= "━━━━━━━━━━━━━━━━━━━━\n";
$message .= "💰 <b>ИТОГО: {$total}₽</b>\n";

if ($comment) {
    $message .= "\n📝 <b>Комментарий:</b> {$comment}\n";
}

$message .= "\n#заказ #{$orderId}";

// === ОТПРАВКА ===
if ($DEBUG_MODE) {
    // Режим отладки — пишем в файл
    $logFile = __DIR__ . '/orders-debug.log';
    $logEntry = "=== {$orderId} | {$date} ===\n{$message}\n\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    
    http_response_code(200);
    echo json_encode([
        'ok' => true, 
        'debug' => true,
        'warning' => 'TG_BOT_TOKEN или TG_CHAT_ID не настроены. Заказ сохранён в orders-debug.log',
        'orderId' => $orderId
    ]);
    exit;
}

// Отправка в Telegram
$tgUrl = "https://api.telegram.org/bot" . TG_BOT_TOKEN . "/sendMessage";
$tgPayload = [
    'chat_id' => TG_CHAT_ID,
    'text' => $message,
    'parse_mode' => 'HTML',
    'disable_web_page_preview' => true
];

$ch = curl_init($tgUrl);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query($tgPayload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($httpCode === 200 && $response) {
    $tgResponse = json_decode($response, true);
    if ($tgResponse['ok'] ?? false) {
        http_response_code(200);
        echo json_encode(['ok' => true, 'orderId' => $orderId, 'telegram' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Telegram API error: ' . ($tgResponse['description'] ?? 'Unknown')]);
    }
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'HTTP ' . $httpCode . ($error ? ': ' . $error : '')]);
}
