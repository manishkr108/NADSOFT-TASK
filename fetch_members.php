<?php
// Include the database connection file
require_once 'db_connection.php';

try {
   
    $query = "SELECT Id, Name, ParentId FROM Members";
    $statement = $pdo->query($query);
    $members = $statement->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($members);
} catch (PDOException $e) {
   
    echo json_encode(["error" => "Error fetching members: " . $e->getMessage()]);
}
?>
