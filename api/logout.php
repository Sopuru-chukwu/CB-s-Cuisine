<?php
session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Destroy the session to log the user out
session_unset();
session_destroy();

echo json_encode(['success' => true, 'message' => "Logout successful."]);
exit();
?>
