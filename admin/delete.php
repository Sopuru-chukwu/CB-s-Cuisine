<?php
session_start();
include_once "config.php";

// Validate table and id inputs
$id = $_GET['id'];
$table = $_GET['table'];

// If table or id is missing, set an error message and redirect
if (!$id || !$table) {
    $_SESSION['error'] = 'ID or table not specified!';
    header('Location: dishes.php');
    exit;
}

// Prepare SQL queries based on the table
$sql = ""; 

if ($table === 'dishes') {
    // Fetch and delete image for dish
    $select_sql = "SELECT `img` FROM dishes WHERE `dish_id`='$id'";
    $select_result = mysqli_query($conn, $select_sql);

    if ($select_result && mysqli_num_rows($select_result) > 0) {
        $row = mysqli_fetch_assoc($select_result);
        $image_path = $row['img']; 
        if (file_exists($image_path)) {
            unlink($image_path); 
        }
    }
    // Delete the dish record
    $sql = "DELETE FROM dishes WHERE `dish_id`='$id'";

} elseif ($table === 'orders') {
    // Delete related items in order_items first
    $delete_items_sql = "DELETE FROM order_items WHERE `order_id`='$id'";
    mysqli_query($conn, $delete_items_sql);

    // Now delete the order
    $sql = "DELETE FROM orders WHERE `order_id`='$id'";
} else {
    $_SESSION['error'] = 'Invalid table specified!';
    header('Location: dishes.php');
    exit;
}

// Execute delete query if it's set
if (!empty($sql)) {
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $_SESSION['success'] = 'Record deleted successfully!';
        header('Location: ' . ($table === 'orders' ? 'orders.php' : 'dishes.php'));
    } else {
        $_SESSION['error'] = 'Unable to delete record! ' . mysqli_error($conn);
        header('Location: ' . ($table === 'orders' ? 'orders.php' : 'dishes.php'));
    }
} else {
    $_SESSION['error'] = 'Invalid table specified!';
    header('Location: dishes.php');
}  
