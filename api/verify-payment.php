<?php
// verify-payment.php
session_start();
include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$request = file_get_contents("php://input");

if (!$request) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit;
}

$data = json_decode($request, true);

if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'JSON decoding failed: ' . json_last_error_msg()]);
    exit;
}

if (isset($_SESSION['user_id'])) {
    $data['user_id'] = $_SESSION['user_id'];
} elseif (!isset($data['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User ID is missing']);
    exit;
}

$reference = $data['reference'];
$user_id = $data['user_id'];
$cart_items = $data['cart_items'];
$full_name = $data['full_name'];
$phone_number = $data['phone_number'];
$street_address = $data['street_address'];
$city = $data['city'];
$postal_code = $data['postal_code'];
$country = $data['country'];
$total_price = $data['total_price'];

$secretKey = "sk_test_3a82ec695f2a9ef7d02a3e8a9f9ee1f8fdb917a1";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.paystack.co/transaction/verify/" . $reference);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $secretKey",
    "Content-Type: application/json"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200) {
    echo json_encode(['success' => false, 'message' => 'Paystack API request failed', 'httpCode' => $httpCode, 'response' => $response]);
    exit;
}

$paystack_response = json_decode($response, true);

if (!$paystack_response || !$paystack_response['status']) {
    echo json_encode(['success' => false, 'message' => 'Transaction verification failed']);
    exit;
}

if ($paystack_response['data']['status'] === 'success') {
    $order_id = saveOrder($conn, $user_id, $full_name, $phone_number, $street_address, $city, $postal_code, $country, $cart_items, $total_price);

    if ($order_id) {
        echo json_encode(['success' => true, 'message' => 'Payment successful, order placed!', 'order_id' => $order_id]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to save order to the database']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Payment was not successful']);
}

function saveOrder($conn, $user_id, $full_name, $phone_number, $street_address, $city, $postal_code, $country, $cart_items, $total_price)
{
    // Insert order details into the orders table
    $query = "INSERT INTO orders (user_id, total_price, full_name, phone_number, street_address, city, postal_code, country, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'paid')";

    if ($stmt = mysqli_prepare($conn, $query)) {
        mysqli_stmt_bind_param($stmt, "idssssss", $user_id, $total_price, $full_name, $phone_number, $street_address, $city, $postal_code, $country);
        mysqli_stmt_execute($stmt);

        if (mysqli_stmt_error($stmt)) {
            error_log("Order Insertion Error: " . mysqli_stmt_error($stmt), 3, "debug.log");
            return false;
        }

        $order_id = mysqli_insert_id($conn);
        mysqli_stmt_close($stmt);

        // Log the created order ID for debugging
        error_log("Order ID created: " . $order_id, 3, "debug.log");

        // Check if cart_items has content
        if (empty($cart_items)) {
            error_log("Cart items array is empty", 3, "debug.log");
            return false;
        }

        // Insert each item from cart_items into order_items table
        foreach ($cart_items as $item) {
            error_log("Inspecting cart item: " . print_r($item, true), 3, "debug.log");
            // Validate each cart item to ensure it has all fields
            if (!isset($item['dish_id']) || !isset($item['quantity']) || !isset($item['price'])) {
                error_log("Error: Missing fields in cart item: " . print_r($item, true), 3, "debug.log");
                continue;
            }

            $product_id = $item['dish_id'];
            $quantity = $item['quantity'];
            $price = floatval(str_replace(',', '', $item['price']));  // Ensure price is a float after removing commas

            $query = "INSERT INTO order_items (order_id, dish_id, quantity, price) VALUES (?, ?, ?, ?)";
            if ($stmt = mysqli_prepare($conn, $query)) {
                mysqli_stmt_bind_param($stmt, "iiid", $order_id, $product_id, $quantity, $price);
                mysqli_stmt_execute($stmt);

                if (mysqli_stmt_error($stmt)) {
                    error_log("Order Item Insert Error: " . mysqli_stmt_error($stmt), 3, "debug.log");
                } else {
                    error_log("Order Item Inserted: order_id $order_id, product_id $product_id, quantity $quantity, price $price", 3, "debug.log");
                }

                mysqli_stmt_close($stmt);
            } else {
                error_log("Order Item Statement Preparation Error: " . mysqli_error($conn), 3, "debug.log");
            }
        }

        return $order_id;
    } else {
        error_log("Order Statement Preparation Error: " . mysqli_error($conn), 3, "debug.log");
    }
    return false;
}
