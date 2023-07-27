<?php
// Include the database connection file
require_once 'db_connection.php';


if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $name = $_POST["name"];
  $parentId = $_POST["parent_id"];


  if (empty($name) || !preg_match("/^[a-zA-Z\s]+$/", $name)) {
    echo json_encode(["error" => "Invalid name"]);
    exit;
  }


  if ($parentId !== null) {
    $query = "SELECT * FROM Members WHERE Id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':id', $parentId, PDO::PARAM_INT);
    $statement->execute();
    $parentMemberData = $statement->fetch(PDO::FETCH_ASSOC);

    if (!$parentMemberData) {

      $parentId = null;
    }
  }


  try {
    $query = "INSERT INTO Members (CreatedDate, Name, ParentId) VALUES (NOW(), :name, :parentId)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':name', $name);
    $statement->bindParam(':parentId', $parentId, PDO::PARAM_INT);
    $statement->execute();


    $newMemberId = $pdo->lastInsertId();
    $query = "SELECT * FROM Members WHERE Id = :id";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':id', $newMemberId, PDO::PARAM_INT);
    $statement->execute();
    $newMemberData = $statement->fetch(PDO::FETCH_ASSOC);


    echo json_encode($newMemberData);
  } catch (PDOException $e) {

    echo json_encode(["error" => "Error saving member: " . $e->getMessage()]);
  }
} else {

  echo json_encode(["error" => "Invalid request method"]);
}
