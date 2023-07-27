var membersData = [];

function updateDropdown(data) {
  var parentDropdown = $(
    "#parent-dropdown");
  parentDropdown.empty();
  parentDropdown.append($(
      "<option></option>").val("")
    .text("No Parent"));
  for (var i = 0; i < data
    .length; i++) {
    var member = data[i];
    parentDropdown.append($(
      "<option></option>").val(
      member.Id).text(member.Name));
  }
}

function displayMembers() {

  function buildTree(members,
    parentId) {
    var tree = [];
    for (var i = 0; i < members
      .length; i++) {
      if (members[i].ParentId ===
        parentId) {
        var node = {
          id: members[i].Id,
          name: members[i].Name,
          children: buildTree(members,
            members[i].Id)
        };
        tree.push(node);
      }
    }
    return tree;
  }

  var treeData = buildTree(membersData,
    null);

  function createTreeList(treeData,
    level) {
    var ul = $("<ul></ul>");
    for (var i = 0; i < treeData
      .length; i++) {
      var node = treeData[i];
      var li = $("<li></li>").text(" "
        .repeat(level * 4) + node.name
      );
      if (node.children.length > 0) {
        li.append(createTreeList(node
          .children, level + 1));
      }
      ul.append(li);
    }
    return ul;
  }

  
  var membersList = $("#members-list");

  membersList.empty();

  var treeList = createTreeList(
    treeData, 0);
  membersList.append(treeList);
}

function fetchMembers(callback) {
  $.ajax({
    url: "fetch_members.php",
    type: "GET",
    dataType: "json",
    success: function(data) {
      membersData = data;
      displayMembers();
      console.log(
        data); // for testing 
      if (typeof callback ===
        "function") {
        callback(data);
      }
    },
    error: function() {
      alert(
        "Error fetching members."
      );
    }
  });
}

function saveMember() {
  var name = $("#name-field").val();
  var parentId = $("#parent-dropdown")
    .val();

  // Validate the name field client-side
  if (!name.trim() || !/^[a-zA-Z\s]+$/
    .test(name)) {
    alert("Please enter a valid name.");
    return;
  }

  $.ajax({
    url: "save_member.php",
    type: "POST",
    data: {
      name: name,
      parent_id: parentId
    },
    dataType: "json",
    success: function(data) {

      membersData.push(data);

      updateDropdown(membersData);

      displayMembers();

      $("#addMemberModal").modal(
        "hide");
      $("#name-field").val("");
      $("#parent-dropdown").val(
        "");
    },
    error: function() {
      alert(
        "Error saving member.");
    }
  });
}

function openAddMemberPopup() {
  fetchMembers(function(data) {
    // Create the modal HTML structure
    var modalHtml = `
            <div class="modal fade" id="addMemberModal" tabindex="-1" role="dialog" aria-labelledby="addMemberModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addMemberModalLabel">Add Member</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form id="addMemberForm">
                                <div class="form-group">
                                    <label for="parent-dropdown">Parent:</label>
                                    <select class="form-control" id="parent-dropdown">
                                        <!-- Populate this dropdown dynamically using AJAX -->
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="name-field">Name:</label>
                                    <input type="text" class="form-control" id="name-field" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="save-member-btn">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

    $("body").append(modalHtml);

    var parentDropdown = $(
      "#parent-dropdown");
    parentDropdown.empty();

    parentDropdown.append($(
      "<option></option>").val(
      "").text("No Parent"));

    for (var i = 0; i < data
      .length; i++) {
      var member = data[i];
      parentDropdown.append($(
          "<option></option>")
        .val(member.Id).text(
          member.Name));
    }

    $("#addMemberModal").modal(
      "show");

    $("#name-field").val("");
  });
}

$("#add-member-btn").click(function() {
  openAddMemberPopup();
});