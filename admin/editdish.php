<?php
session_start();
include "config.php";

$data_id = $_GET['id'];
$sql = "SELECT * FROM `dishes` WHERE dish_id='$data_id'";
$query = mysqli_query($conn, $sql);
$result = mysqli_fetch_assoc($query);

$errors = [
    'title' => '',
    'price' => '',
    'img' => '',
    'category' => ''
];

$title = $price = $img = $category = "";
if (isset($_POST['submit'])) {
    $title = htmlspecialchars($_POST['title']);
    $price = $_POST['price'];
    $category = $_POST['category'] ?? '';

    // Validate fields
    if (empty($title)) $errors['title'] = "Enter a dish title!";
    if (empty($price)) $errors['price'] = "Enter the price!";
    if (empty($category)) $errors['category'] = "Select a category!";

    // Check if a new image is uploaded
    if (empty($_FILES['img']['name'])) {
        // No new image uploaded, use the existing image path
        $img = $result['img'];
    } else {
        // Validate new image file type
        if (!preg_match('!image!', $_FILES['img']['type'])) {
            $errors['img'] = 'You must upload an image file';
        } else {
            $maxFileSize = 2 * 1024 * 1024;
            if ($_FILES['img']['size'] > $maxFileSize) {
                $errors['img'] = 'File size is too large';
            } else {
                // Generate unique name for the new image
                $filename = $_FILES['img']['name'];
                $uniquename = uniqid('', true) . '.' . pathinfo($filename, PATHINFO_EXTENSION);
                $destination = 'imgs/' . $uniquename;

                // Move the uploaded file to the server
                if (move_uploaded_file($_FILES['img']['tmp_name'], $destination)) {
                    // Delete the old image if it exists
                    if (!empty($result['img']) && file_exists($result['img'])) {
                        unlink($result['img']);
                    }
                    $img = $destination; // Set the new image path
                } else {
                    $errors['img'] = "Sorry, there was an error uploading your file.";
                }
            }
        }
    }

    // Update in database if form is valid
    if (!array_filter($errors)) {
        $stmt = "UPDATE dishes SET `title`='$title', `price`='$price', `img`='$img', `category`='$category' WHERE `dish_id`='$data_id'";
        $stmt_query = mysqli_query($conn, $stmt);
        if ($stmt_query) {
            $_SESSION['success'] = "Dish updated successfully!";
            header('location: dishes.php');
            exit();
        } else {
            $_SESSION['error'] = "Failed to update dish! " . mysqli_error($conn);
        }
    }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Dish</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <?php include_once 'sidebar.php'; ?>

    <div class="container" style="margin-left: 270px;">
        <h1>Edit Dish</h1>
        <form action="#" method="POST" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="title" class="form-label">Dish Title:</label>
                <input type="text" class="form-control" id="title" name="title" placeholder="Enter Dish Title" value="<?php echo $result['title']; ?>">
                <small class="text-danger"><?php echo $errors['title']; ?></small>
            </div>
            <div class="mb-3">
                <label for="price" class="form-label">Price:</label>
                <input type="text" class="form-control" id="price" name="price" placeholder="Enter Price" value="<?php echo $result['price']; ?>">
                <small class="text-danger"><?php echo $errors['price']; ?></small>
            </div>
            <div class="mb-3">
                <label class="form-label">Category:</label><br>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="main_course" name="category" value="Main Course" <?php echo $result['category'] === 'Main Course' ? 'checked' : ''; ?>>
                    <label class="form-check-label" for="main_course">Main Course</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="fast_food" name="category" value="Fast Food" <?php echo $result['category'] === 'Fast Food' ? 'checked' : ''; ?>>
                    <label class="form-check-label" for="fast_food">Fast Food</label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="salad" name="category" value="Salad" <?php echo $result['category'] === 'Salad' ? 'checked' : ''; ?>>
                    <label class="form-check-label" for="salad">Salad</label>
                </div>
                <small class="text-danger"><?php echo $errors['category']; ?></small>
            </div>
            <div class="mb-3">
                <label for="image" class="form-label">Upload Image:</label>
                <input type="file" class="form-control" id="image" name="img">
                <small class="text-danger"><?php echo $errors['img']; ?></small>
            </div>
            <button type="submit" name="submit" class="btn btn-outline-dark">Submit</button>
        </form>
    </div>
</body>

</html>