<?php
session_start();
include 'config.php'; // Include your database configuration

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

// Initialize an array to hold error messages
$errors = [
    'email' => '',
    'password' => '',
    'confirm-password' => ''
];

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the form input using $_POST
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    $cpassword = isset($_POST['confirm-password']) ? trim($_POST['confirm-password']) : '';

    // Email validation
    if (empty($email)) {
        $errors['email'] = "Email is required!";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Invalid email format!";
    }

    // Password validation
    if (empty($password)) {
        $errors['password'] = "Password is required!";
    } elseif (!preg_match("/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/", $password)) {
        $errors['password'] = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    // Confirm password validation
    if (empty($cpassword)) {
        $errors['confirm-password'] = "Please confirm password!";
    } elseif ($password !== $cpassword) {
        $errors['confirm-password'] = "Passwords do not match!";
    }

    // If there are errors, return them as JSON
    if (!empty(array_filter($errors))) {
        echo json_encode([
            'success' => false,
            'message' => $errors
        ]);
        exit;
    }

    // Sanitize email
    $email = mysqli_real_escape_string($conn, $email);

    // Check if the email is already registered
    $sql = "SELECT user_id FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $sql);
    $query = mysqli_num_rows($result);

    if ($query > 0) {
        $_SESSION['error'] = "Email is already registered!";
        echo json_encode(['success' => false, 'message' => $_SESSION['error']]);
        unset($_SESSION['error']); // Clear error after sending response
        exit;
    } else {
        // Hash the password and insert into the database
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $sql = "INSERT INTO users (email, password) VALUES ('$email', '$hashedPassword')";

        if (mysqli_query($conn, $sql)) {
            unset($_SESSION['error']); // Clear any previous errors
            $_SESSION['success'] = "Signup successful!";
            echo json_encode(['success' => true, 'message' => $_SESSION['success']]);
            unset($_SESSION['success']); // Clear success after sending response
            exit();
        } else {
            $_SESSION['error'] = "Error occurred while signing up: " . mysqli_error($conn);
            echo json_encode(['success' => false, 'message' => $_SESSION['error']]);
            unset($_SESSION['error']); // Clear error after sending response
            exit();
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => "Invalid request method."]);
    exit();
}
?>
