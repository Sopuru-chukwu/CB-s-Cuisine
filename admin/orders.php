<?php
session_start();
include 'config.php';

// SQL to fetch order data
$sql = "SELECT order_id, user_id, full_name, phone_number, street_address, city, postal_code, country, total_price, payment_status FROM orders";
$result = mysqli_query($conn, $sql);
$orders = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>

    <!-- Navbar -->
    <?php include_once 'sidebar.php'; ?>

    <div class="main-content">
        <h1><strong>Order Information</strong></h1>

        <?php if (isset($_SESSION['success'])) {
            include 'component/success.php';
        } ?>
        <?php if (isset($_SESSION['error'])) {
            include 'component/error.php';
        } ?>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Total Price</th>
                    <th>Payment Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if (!empty($orders)) { ?>
                    <?php foreach ($orders as $order) { ?>
                        <tr>
                            <td><?php echo htmlspecialchars($order['order_id']); ?></td>
                            <td><?php echo htmlspecialchars($order['user_id']); ?></td>
                            <td><?php echo htmlspecialchars($order['full_name']); ?></td>
                            <td><?php echo htmlspecialchars($order['phone_number']); ?></td>
                            <td><?php echo htmlspecialchars($order['street_address']); ?></td>
                            <td>₦<?php echo number_format($order['total_price'], 2); ?></td>
                            <td><?php echo htmlspecialchars($order['payment_status']); ?></td>
                            <td>
                                <a href="order_details.php?order_id=<?php echo $order['order_id']; ?>" class="btn btn-info btn-sm">View</a>
                                <a href="delete.php?id=<?php echo $order['order_id']; ?>&table=orders" onclick="return confirm('Are you sure you want to delete this order?');" class="btn btn-danger btn-sm">Delete</a>
                            </td>
                        </tr>
                    <?php } ?>
                <?php } else { ?>
                    <tr>
                        <td colspan="8">No orders found.</td>
                    </tr>
                <?php } ?>
            </tbody>

        </table>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
</body>

</html>