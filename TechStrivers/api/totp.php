<?php
// Minimal, dependency-free TOTP (RFC 6238) / HOTP (RFC 4226) implementation.
// Standard algorithm: SHA1 HMAC, 6 digits, 30-second period - identical to
// what Google Authenticator, Authy, etc. expect.

function totp_base32_encode($data) {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    $bits = '';
    foreach (str_split($data) as $char) {
        $bits .= str_pad(decbin(ord($char)), 8, '0', STR_PAD_LEFT);
    }
    $encoded = '';
    foreach (str_split($bits, 5) as $chunk) {
        if (strlen($chunk) < 5) {
            $chunk = str_pad($chunk, 5, '0', STR_PAD_RIGHT);
        }
        $encoded .= $alphabet[bindec($chunk)];
    }
    return $encoded;
}

function totp_base32_decode($b32) {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    $b32 = strtoupper(preg_replace('/[^A-Z2-7]/i', '', $b32));
    $bits = '';
    foreach (str_split($b32) as $char) {
        $pos = strpos($alphabet, $char);
        if ($pos === false) continue;
        $bits .= str_pad(decbin($pos), 5, '0', STR_PAD_LEFT);
    }
    $bytes = '';
    foreach (str_split($bits, 8) as $chunk) {
        if (strlen($chunk) < 8) continue; // trailing padding bits, discard
        $bytes .= chr(bindec($chunk));
    }
    return $bytes;
}

function totp_generate_secret($length = 20) {
    $alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    $secret = '';
    for ($i = 0; $i < $length; $i++) {
        $secret .= $alphabet[random_int(0, 31)];
    }
    return $secret;
}

function totp_code($base32Secret, $counter, $digits = 6) {
    $key = totp_base32_decode($base32Secret);
    $binCounter = pack('N2', 0, $counter); // 8-byte big-endian counter
    $hash = hash_hmac('sha1', $binCounter, $key, true);
    $offset = ord($hash[19]) & 0xf;
    $truncated = ((ord($hash[$offset]) & 0x7f) << 24)
        | ((ord($hash[$offset + 1]) & 0xff) << 16)
        | ((ord($hash[$offset + 2]) & 0xff) << 8)
        | (ord($hash[$offset + 3]) & 0xff);
    $code = $truncated % (10 ** $digits);
    return str_pad((string)$code, $digits, '0', STR_PAD_LEFT);
}

// Accepts a code from the current time step or one step before/after, to
// tolerate small clock drift between the server and the phone.
function totp_verify($base32Secret, $code, $window = 1, $period = 30) {
    $code = preg_replace('/\s+/', '', (string)$code);
    if ($code === '' || !empty($base32Secret) === false) return false;
    $currentStep = intdiv(time(), $period);
    for ($i = -$window; $i <= $window; $i++) {
        if (hash_equals(totp_code($base32Secret, $currentStep + $i), $code)) {
            return true;
        }
    }
    return false;
}

function totp_otpauth_url($base32Secret, $accountEmail, $issuer = 'TechStrivers') {
    $label = rawurlencode($issuer) . ':' . rawurlencode($accountEmail);
    return 'otpauth://totp/' . $label
        . '?secret=' . $base32Secret
        . '&issuer=' . rawurlencode($issuer)
        . '&algorithm=SHA1&digits=6&period=30';
}
