<?php
// Generic REST handler shared by projects/courses/internships/workshops/blogs/gallery/leads.
// GET = list, POST = create, PUT/PATCH ?id= = update, DELETE ?id= = remove.

function decode_json_columns(&$row, $jsonColumns) {
    foreach ($jsonColumns as $col) {
        if (isset($row[$col])) {
            $decoded = json_decode($row[$col], true);
            $row[$col] = is_array($decoded) ? $decoded : [];
        }
    }
    foreach (['popular'] as $boolCol) {
        if (isset($row[$boolCol])) {
            $row[$boolCol] = (bool)$row[$boolCol];
        }
    }
}

// $onCreated, if given, is called with the newly-inserted row right after
// it's saved (and before the HTTP response is sent) - e.g. leads.php uses
// this to forward a new lead into ThinkERP. Every other caller omits it,
// so this is a no-op addition for them.
function handle_crud($pdo, $table, $jsonColumns = [], $publicRead = true, $publicCreate = false, $createDefaults = [], $onCreated = null) {
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method === 'GET' && !$publicRead) {
        require_auth($pdo);
    }
    if ($method === 'POST' && !$publicCreate) {
        require_auth($pdo);
    }
    if (in_array($method, ['PUT', 'PATCH', 'DELETE'], true)) {
        require_auth($pdo);
    }

    if ($method === 'GET') {
        $stmt = $pdo->query("SELECT * FROM `$table` ORDER BY createdAt DESC");
        $rows = $stmt->fetchAll();
        foreach ($rows as &$row) {
            decode_json_columns($row, $jsonColumns);
        }
        send_json($rows);
    }

    if ($method === 'POST') {
        $input = array_merge($createDefaults, json_input());
        $input['id'] = $input['id'] ?? gen_id($table);

        $cols = [];
        $placeholders = [];
        $values = [];
        foreach ($input as $key => $value) {
            $cols[] = "`$key`";
            $placeholders[] = '?';
            $values[] = in_array($key, $jsonColumns, true) ? json_encode($value) : $value;
        }
        $sql = "INSERT INTO `$table` (" . implode(',', $cols) . ") VALUES (" . implode(',', $placeholders) . ")";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        if ($onCreated) {
            $onCreated($input);
        }

        send_json($input, 201);
    }

    if ($method === 'PUT' || $method === 'PATCH') {
        $id = $_GET['id'] ?? '';
        if ($id === '') send_json(['error' => 'Missing id'], 400);

        $input = json_input();
        unset($input['id']);
        if (empty($input)) send_json(['success' => true]);

        $sets = [];
        $values = [];
        foreach ($input as $key => $value) {
            $sets[] = "`$key` = ?";
            $values[] = in_array($key, $jsonColumns, true) ? json_encode($value) : $value;
        }
        $values[] = $id;
        $sql = "UPDATE `$table` SET " . implode(',', $sets) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($values);

        send_json(['success' => true]);
    }

    if ($method === 'DELETE') {
        $id = $_GET['id'] ?? '';
        if ($id === '') send_json(['error' => 'Missing id'], 400);
        $stmt = $pdo->prepare("DELETE FROM `$table` WHERE id = ?");
        $stmt->execute([$id]);
        send_json(['success' => true]);
    }

    send_json(['error' => 'Method not allowed'], 405);
}
