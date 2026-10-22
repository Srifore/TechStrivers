<?php
require __DIR__ . '/config.php';
require __DIR__ . '/crud_helper.php';

handle_crud($pdo, 'projects', ['tags', 'hardware', 'software']);
