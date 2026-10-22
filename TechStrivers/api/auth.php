<?php
require __DIR__ . '/config.php';
require __DIR__ . '/totp.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json(['error' => 'Method not allowed'], 405);
}

$input = json_input();
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';
$otp = trim($input['otp'] ?? '');

$stmt = $pdo->prepare('SELECT * FROM admin_profile LIMIT 1');
$stmt->execute();
$admin = $stmt->fetch();

if (!$admin || strtolower($email) !== strtolower($admin['email']) || !password_verify($password, $admin['passwordHash'])) {
    send_json(['error' => 'Invalid administrator credentials. Please try again.'], 401);
}

if ($admin['twoFactorEnabled']) {
    if ($otp === '') {
        // Credentials are correct - client must now submit the OTP step.
        send_json(['requiresOtp' => true, 'twoFactorMethod' => $admin['twoFactorMethod']]);
    }
    if (!totp_verify($admin['secretKey'], $otp)) {
        send_json(['error' => 'Invalid 2FA Verification Code. Check your authenticator app and try again.'], 401);
    }
}

$token = bin2hex(random_bytes(32));
$stmt = $pdo->prepare('INSERT INTO auth_tokens (token, expiresAt) VALUES (?, DATE_ADD(NOW(), INTERVAL 7 DAY))');
$stmt->execute([$token]);

send_json([
    'token' => $token,
    'profile' => [
        'name' => $admin['name'],
        'email' => $admin['email'],
        'phone' => $admin['phone'],
        'role' => $admin['role'],
        'twoFactorEnabled' => (bool)$admin['twoFactorEnabled'],
        'twoFactorMethod' => $admin['twoFactorMethod'],
    ],
]);
