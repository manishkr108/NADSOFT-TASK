<?php
// Database configuration
$db_host = 'localhost';
$db_name = 'nadsoft';
$db_user = 'root';
$db_pass = '';

try {
  // Create a new PDO instance
  $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);

  // Set PDO error mode to exception
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  // If the connection fails, catch the exception and display an error message
  die("Connection failed: " . $e->getMessage());
}
