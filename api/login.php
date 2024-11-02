<?php
session_start();
include 'config.php'; // Database configuration

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

$errors = ['email' => '', 'password' => ''];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';

    // Validate email and password
    if (empty($email)) {
        $errors['email'] = "Email is required!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format!";
    }
    if (empty($password)) {
        $errors['password'] = "Password is required!";
    }

    if (!empty(array_filter($errors))) {
        echo json_encode(['success' => false, 'message' => $errors]);
        exit;
    }

    // Sanitize email
    $email = mysqli_real_escape_string($conn, $email);

    // Query user by email
    $sql = "SELECT user_id, password, email FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        if (password_verify($password, $user['password'])) {
            // Store user info in session
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['loggedin'] = true;

            // Send user_id in the response
            echo json_encode([
                'success' => true,
                'message' => "Login successful!",
                'userId' => $user['user_id']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => "Invalid credentials!"]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => "Email not registered!"]);
    }
}
