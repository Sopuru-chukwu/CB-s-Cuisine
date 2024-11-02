<?php

$conn = mysqli_connect("localhost", "root", "", "restoweb");

if (!$conn) {
  die ("Unable to connect! ". mysqli_connect_error());
} 
?>