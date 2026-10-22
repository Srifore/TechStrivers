<?php
require __DIR__ . '/config.php';
require __DIR__ . '/crud_helper.php';

handle_crud($pdo, 'courses', ['topics']);
