<?php
require __DIR__ . '/config.php';
require __DIR__ . '/totp.php';
require_auth($pdo);

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

$stmt = $pdo->prepare('SELECT * FROM admin_profile LIMIT 1');
$stmt->execute();
$admin = $stmt->fetch();

if (!$admin) {
    send_json(['error' => 'Admin profile not found'], 404);
}

if ($method === 'GET') {
    unset($admin['passwordHash'], $admin['secretKey']);
    $admin['twoFactorEnabled'] = (bool)$admin['twoFactorEnabled'];
    send_json($admin);
}

if ($method === 'PUT' && $action === 'password') {
    $input = json_input();
    if (!password_verify($input['currentPassword'] ?? '', $admin['passwordHash'])) {
        send_json(['success' => false, 'message' => 'Current password is incorrect.']);
    }
    $newHash = password_hash($input['newPassword'] ?? '', PASSWORD_BCRYPT);
    $stmt = $pdo->prepare('UPDATE admin_profile SET passwordHash = ? WHERE id = ?');
    $stmt->execute([$newHash, $admin['id']]);
    send_json(['success' => true, 'message' => 'Password updated successfully!']);
}

// Step 1: generate a fresh real TOTP secret and hand back the QR data, but
// don't flip twoFactorEnabled on yet - that only happens once the admin
// proves they actually scanned it correctly (2fa-confirm below). This is
// what prevents a mistyped/never-scanned secret from locking the account out.
if ($method === 'PUT' && $action === '2fa-setup') {
    $input = json_input();
    $method2fa = $input['method'] ?? 'authenticator';
    $secret = totp_generate_secret();
    $stmt = $pdo->prepare('UPDATE admin_profile SET secretKey = ?, twoFactorMethod = ?, twoFactorEnabled = 0 WHERE id = ?');
    $stmt->execute([$secret, $method2fa, $admin['id']]);
    send_json([
        'secret' => $secret,
        'otpauthUrl' => totp_otpauth_url($secret, $admin['email']),
    ]);
}

// Step 2: verify the code the admin's authenticator app actually generated
// from that secret, then activate 2FA for real.
if ($method === 'PUT' && $action === '2fa-confirm') {
    $input = json_input();
    if (!totp_verify($admin['secretKey'], $input['code'] ?? '')) {
        send_json(['success' => false, 'message' => 'Invalid code. Check your authenticator app and try again.']);
    }
    $stmt = $pdo->prepare('UPDATE admin_profile SET twoFactorEnabled = 1 WHERE id = ?');
    $stmt->execute([$admin['id']]);
    send_json(['success' => true, 'message' => '2FA enabled successfully!']);
}

if ($method === 'PUT' && $action === '2fa-disable') {
    $stmt = $pdo->prepare('UPDATE admin_profile SET twoFactorEnabled = 0 WHERE id = ?');
    $stmt->execute([$admin['id']]);
    send_json(['success' => true]);
}

if ($method === 'PUT') {
    $input = json_input();
    $stmt = $pdo->prepare('UPDATE admin_profile SET name = ?, email = ?, phone = ? WHERE id = ?');
    $stmt->execute([
        $input['name'] ?? $admin['name'],
        $input['email'] ?? $admin['email'],
        $input['phone'] ?? $admin['phone'],
        $admin['id'],
    ]);
    send_json(['success' => true]);
}

send_json(['error' => 'Method not allowed'], 405);
