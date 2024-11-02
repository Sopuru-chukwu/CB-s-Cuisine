<?php 
session_start();
// Connection to database
include_once "config.php";

// SQL to fetch data
$sql1 = "SELECT dish_id, title, price, img, category FROM `dishes`";

// Fetch data from the database
$result = mysqli_query($conn, $sql1);

// Fetch as an array
$dishes = mysqli_fetch_all($result, MYSQLI_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dishes</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    
<!-- Navbar -->
<?php include_once 'sidebar.php'; ?>

<div class="main-content">
    <h1><strong>
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-journals" viewBox="0 0 16 16" style="margin-right: 5px;">
            <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
            <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
        </svg> Dishes
    </strong></h1>
    
    <?php if (isset($_SESSION['success'])) { include 'component/success.php'; } ?>
    <?php if (isset($_SESSION['error'])) { include 'component/error.php'; } ?>
    
    <table class="table table-striped">
        <thead>
            <tr>
                <th>No</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($dishes as $index => $data) { ?>
            <tr>
                <td><?php echo $index + 1; ?></td>
                <td><?php echo htmlspecialchars($data['title']); ?></td>
                <td><?php echo htmlspecialchars($data['price']); ?></td>
                <td><?php echo htmlspecialchars($data['category']); ?></td>
                <td><img src="<?php echo htmlspecialchars($data['img']); ?>" alt="Dish Image" width="50" height="50"></td>
                <td>
                    <a href='editdish.php?id=<?php echo $data['dish_id']; ?>' class='btn btn-primary btn-sm'>Edit</a>
                    <a href='delete.php?id=<?php echo $data['dish_id']; ?>&table=dishes' onclick="return confirm('Are you sure you want to delete this entry?');" class='btn btn-danger btn-sm'>Delete</a>
                </td>
            </tr>
            <?php } ?>
        </tbody>
    </table>
    
    <div class='add'>
        <a href="addDishes.php"><button class="btn btn-success btn-lg">Add Dish</button></a>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></script>
</body>
</html>
