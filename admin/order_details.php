<?php
session_start();
include 'config.php'; // Include your database connection

// Ensure order ID is provided via GET or POST
if (!isset($_GET['order_id'])) {
    echo "Order ID is missing.";
    exit;
}

$order_id = intval($_GET['order_id']);

// SQL query to get basic order details (you may adjust fields as needed)
$order_sql = "SELECT full_name, phone_number, street_address, city, postal_code, country, total_price FROM orders WHERE order_id = ?";
$order_stmt = mysqli_prepare($conn, $order_sql);
mysqli_stmt_bind_param($order_stmt, "i", $order_id);
mysqli_stmt_execute($order_stmt);
$order_result = mysqli_stmt_get_result($order_stmt);

if (!$order = mysqli_fetch_assoc($order_result)) {
    echo "Order not found.";
    exit;
}

// SQL query to get order items with detailed dish information
$items_sql = "
    SELECT oi.dish_id, oi.quantity, oi.price AS item_price, d.title AS dish_title, d.category, d.price AS dish_price, d.img
    FROM order_items oi
    JOIN dishes d ON oi.dish_id = d.dish_id
    WHERE oi.order_id = ?";
$items_stmt = mysqli_prepare($conn, $items_sql);
mysqli_stmt_bind_param($items_stmt, "i", $order_id);
mysqli_stmt_execute($items_stmt);
$items_result = mysqli_stmt_get_result($items_stmt);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Details</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>



    <div class="container my-5">
        <h1>Order Details</h1>

        <!-- Order Information Section -->
        <h3 class="mt-4">Customer Information</h3>
        <p><strong>Name:</strong> <?php echo htmlspecialchars($order['full_name']); ?></p>
        <p><strong>Phone:</strong> <?php echo htmlspecialchars($order['phone_number']); ?></p>
        <p><strong>Address:</strong> <?php echo htmlspecialchars($order['street_address']); ?>, <?php echo htmlspecialchars($order['city']); ?>, <?php echo htmlspecialchars($order['postal_code']); ?>, <?php echo htmlspecialchars($order['country']); ?></p>
        <p><strong>Total Price:</strong> ₦<?php echo number_format($order['total_price'], 2); ?></p>

        <!-- Order Items Section -->
        <h3 class="mt-4">Order Items</h3>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Dish Image</th>
                    <th>Dish Title</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price per Dish</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($item = mysqli_fetch_assoc($items_result)) { ?>
                    <tr>
                        <td>
                            <img src="<?php echo htmlspecialchars($item['img']); ?>" alt="<?php echo htmlspecialchars($item['dish_title']); ?>" style="width: 100px; height: auto;">
                        </td>
                        <td><?php echo htmlspecialchars($item['dish_title']); ?></td>
                        <td><?php echo htmlspecialchars($item['category']); ?></td>
                        <td><?php echo htmlspecialchars($item['quantity']); ?></td>
                        <td>₦<?php echo number_format(floatval(str_replace(',', '', $item['dish_price'])), 2); ?></td>
                        <td>₦<?php echo number_format($item['quantity'] * floatval(str_replace(',', '', $item['dish_price'])), 2); ?></td>
                    </tr>
                <?php } ?>
            </tbody>

        </table>
        <div class='add'>
        <a href="orders.php"><button class="btn btn-success btn-lg">Go Back</button></a>
    </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
</body>

</html>