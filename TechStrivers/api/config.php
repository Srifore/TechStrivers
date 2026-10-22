<?php
// Shared bootstrap for every API endpoint: DB connection, CORS, JSON helpers, auth.

$DB_HOST = 'localhost';
$DB_NAME = 'u107969203_techstriversdb';
$DB_USER = 'u107969203_techstrivers';
$DB_PASS = ';IXm96mh4f:G';

// --- CORS ---
$allowedOrigins = [
    'https://techstrivers.com',
    'https://erp.techstrivers.com',
    'http://localhost:5173',
    'http://localhost:5174',
];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Vary: Origin');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=utf-8');

// This data changes whenever a lead is submitted or the ERP publishes
// something - never let a CDN, proxy, or browser cache a stale response.
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// --- DB connection ---
try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// --- Helpers ---
function json_input() {
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : [];
}

function send_json($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function gen_id($prefix) {
    return $prefix . '-' . bin2hex(random_bytes(6));
}

function get_auth_header() {
    if (function_exists('getallheaders')) {
        foreach (getallheaders() as $k => $v) {
            if (strtolower($k) === 'authorization') return $v;
        }
    }
    if (!empty($_SERVER['HTTP_AUTHORIZATION'])) return $_SERVER['HTTP_AUTHORIZATION'];
    if (!empty($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) return $_SERVER['REDIRECT_HTTP_AUTHORIZATION'];
    return '';
}

function require_auth($pdo) {
    $auth = get_auth_header();
    if (!preg_match('/Bearer\s+(\S+)/', $auth, $m)) {
        send_json(['error' => 'Unauthorized'], 401);
    }
    $stmt = $pdo->prepare('SELECT * FROM auth_tokens WHERE token = ? AND expiresAt > NOW()');
    $stmt->execute([$m[1]]);
    $row = $stmt->fetch();
    if (!$row) {
        send_json(['error' => 'Unauthorized'], 401);
    }
    return $row;
}
