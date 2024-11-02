<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = 'restoweb';

$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn){
   die("Connected to database" . mysqli_connect_error());
}