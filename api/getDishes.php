<?php
include "config.php";

$sql = "SELECT * FROM dishes";
$query = mysqli_query($conn, $sql);
$dishes = [];

if ($query) {
    while ($row = mysqli_fetch_assoc($query)) {
        // Ensure full image URL is returned and check for missing images
        $imagePath = 'http://localhost/restoweb/admin/imgs/' . $row['img'];
        if (!file_exists($_SERVER['DOCUMENT_ROOT'] . '/restoweb/admin/imgs/' . $row['img'])) {
            error_log("Image not found for dish ID " . $row['dish_id'] . ": " . $imagePath);
            $imagePath = 'http://localhost/restoweb/admin/imgs/img2.jpeg'; // Fallback image
        }
        $row['img'] = $imagePath;
        $dishes[] = $row;
    }
} else {
    error_log("Database query failed: " . mysqli_error($conn));
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
echo json_encode($dishes);
?>
