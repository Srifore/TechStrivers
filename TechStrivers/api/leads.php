<?php
require __DIR__ . '/config.php';
require __DIR__ . '/crud_helper.php';

// ThinkERP incoming-webhook endpoint (Webhook > Incoming Endpoints, "lead"
// type, named "TechStrivers Website", owned by thinkfinitylabs@gmail.com).
// Same mechanism thinkfinitylabs.com/submit-form.php already uses.
const ERP_LEAD_WEBHOOK_URL = 'https://thinkerp.thinkfinitylabs.com/webhook/in/BQW2AAZYnjFlItJGf0yCEFsnkZHYPUiU';
const ERP_LEAD_WEBHOOK_SECRET = 'KOzvKmhhREGKNc2hgmnZZw05gLPm1PBHPateDzQ1';

// Fire-and-forget: pushes this submission into ThinkERP as a Lead. Any
// failure (network, signature, ERP downtime) is swallowed - the lead is
// already saved in TechStrivers' own database regardless of whether this
// succeeds.
function forward_lead_to_erp(array $lead): void {
    $name = $lead['name'] ?? '';
    $payload = json_encode([
        'name' => $name !== '' ? $name : 'Website Visitor',
        'email' => $lead['email'] ?? '',
        'phone' => $lead['phone'] ?? null,
        'subject' => 'TechStrivers Enquiry: ' . ($lead['subject'] ?? ($name !== '' ? $name : 'Website Visitor')),
        'notes' => $lead['message'] ?? $lead['notes'] ?? null,
    ]);

    $signature = hash_hmac('sha256', $payload, ERP_LEAD_WEBHOOK_SECRET);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\nX-Signature: $signature\r\n",
            'content' => $payload,
            'timeout' => 5,
            'ignore_errors' => true,
        ],
    ]);

    @file_get_contents(ERP_LEAD_WEBHOOK_URL, false, $context);
}

// Leads contain PII, so unlike every other resource, reading the list
// requires admin auth. Creating one (the public enquiry form) does not.
handle_crud($pdo, 'leads', [], false, true, [
    'date' => date('Y-m-d H:i'),
    'status' => 'New',
    'notes' => '',
], 'forward_lead_to_erp');
