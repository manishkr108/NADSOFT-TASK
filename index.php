<!DOCTYPE html>
<html>

<head>
  <title>Members Tree</title>
  <!-- Include Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>

<body>
  <div class="container mt-5">
    <h2>Members Tree</h2>
    <button type="button" class="btn btn-primary mb-3" id="add-member-btn">Add Member</button>
    <div id="members-list"></div>
  </div>

  <!-- Include jQuery and Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="script.js"></script>

  <script>
    $(document).ready(function() {
      $("#add-member-btn").click(function() {
        openAddMemberPopup();
      });

      // Fetch and display members on page load
      fetchMembers();
    });

    // Move the click event binding here
    $(document).on("click", "#save-member-btn", function() {
      saveMember();
    });
  </script>
</body>

</html>