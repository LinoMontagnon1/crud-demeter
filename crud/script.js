document.addEventListener("DOMContentLoaded", function () {
  const userTableBody = document.getElementById("userTableBody");
  const addUserForm = document.getElementById("addUserForm");
  const deleteAllButton = document.getElementById("deleteAllButton");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let editingUserId = null;

  users.forEach(addUserToTable);

  addUserForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const userName = document.getElementById("userName").value;
    const userCnpj = document.getElementById("userCnpj").value;
    const userPhone = document.getElementById("userPhone").value;
    const userIe = document.getElementById("userIe").value;
    const userAddress = document.getElementById("userAddress").value;
    const userNeighborhood = document.getElementById("userNeighborhood").value;
    const userCep = document.getElementById("userCep").value;
    const userCity = document.getElementById("userCity").value;
    const userUf = document.getElementById("userUf").value;

    const newUser = {
      id: userId,
      name: userName,
      cnpj: userCnpj,
      phone: userPhone,
      ie: userIe,
      address: userAddress,
      neighborhood: userNeighborhood,
      cep: userCep,
      city: userCity,
      uf: userUf,
    };

    if (editingUserId !== null) {
      // Editing an existing user
      const existingUser = users.find((user) => user.id === editingUserId);
      if (existingUser) {
        Object.assign(existingUser, newUser);
        updateTableRow(existingUser);
        editingUserId = null;
      }
    } else {
      // Adding a new user
      users.push(newUser);
      addUserToTable(newUser);
    }

    localStorage.setItem("users", JSON.stringify(users));

    clearFormFields();
    resetFormButton();
  });

  function addUserToTable(user) {
    const row = createTableRow(user);

    const editButton = createButton("Edit");
    editButton.classList.add("editButton");
    editButton.dataset.userId = user.id;
    editButton.addEventListener("click", function () {
      editUser(user.id);
    });

    const deleteButton = createButton("Delete");
    deleteButton.classList.add("deleteButton");
    deleteButton.dataset.userId = user.id;
    deleteButton.addEventListener("click", function () {
      deleteUser(user.id);
    });

    // Append buttons to the last cell in the row
    row.lastElementChild.appendChild(editButton);
    row.lastElementChild.appendChild(deleteButton);

    userTableBody.appendChild(row);
  }

  function createTableRow(user) {
    const row = document.createElement("tr");
    row.id = `user-${user.id}`;
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.cnpj}</td>
      <td>${user.phone}</td>
      <td>${user.ie}</td>
      <td>${user.address}</td>
      <td>${user.neighborhood}</td>
      <td>${user.cep}</td>
      <td>${user.city}</td>
      <td>${user.uf}</td>
      <td></td> <!-- Placeholder for buttons -->
    `;

    return row;
  }

  function createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    return button;
  }

  function updateTableRow(user) {
    const rowToUpdate = document.getElementById(`user-${user.id}`);
    if (rowToUpdate) {
      // Update the content of the existing row
      rowToUpdate.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.cnpj}</td>
        <td>${user.phone}</td>
        <td>${user.ie}</td>
        <td>${user.address}</td>
        <td>${user.neighborhood}</td>
        <td>${user.cep}</td>
        <td>${user.city}</td>
        <td>${user.uf}</td>
        <td></td> <!-- Placeholder for buttons -->
      `;
    }
  }

  function editUser(userId) {
    const userToEdit = users.find((user) => user.id === userId);
    if (userToEdit) {
      // Populate the form with the user's information for editing
      document.getElementById("userId").value = userToEdit.id;
      document.getElementById("userName").value = userToEdit.name;
      document.getElementById("userCnpj").value = userToEdit.cnpj;
      document.getElementById("userPhone").value = userToEdit.phone;
      document.getElementById("userIe").value = userToEdit.ie;
      document.getElementById("userAddress").value = userToEdit.address;
      document.getElementById("userNeighborhood").value = userToEdit.neighborhood;
      document.getElementById("userCep").value = userToEdit.cep;
      document.getElementById("userCity").value = userToEdit.city;
      document.getElementById("userUf").value = userToEdit.uf;

      // Change the form button to "Save Edit"
      const submitButton = document.querySelector("#addUserForm button[type='submit']");
      submitButton.textContent = "Save Edit";
      editingUserId = userId;
    }
  }

  function deleteUser(userId) {
    if (confirm(`Delete user with ID ${userId}?`)) {
      const rowToRemove = document.getElementById(`user-${userId}`);
      if (rowToRemove) {
        userTableBody.removeChild(rowToRemove);
        // Remove the user from the array and update localStorage
        users = users.filter((user) => user.id !== userId);
        localStorage.setItem("users", JSON.stringify(users));
      }
    }
  }

  function clearFormFields() {
    document.getElementById("userId").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("userCnpj").value = "";
    document.getElementById("userPhone").value = "";
    document.getElementById("userIe").value = "";
    document.getElementById("userAddress").value = "";
    document.getElementById("userNeighborhood").value = "";
    document.getElementById("userCep").value = "";
    document.getElementById("userCity").value = "";
    document.getElementById("userUf").value = "";
  }

  function resetFormButton() {
    // Change the form button back to "Add User"
    const submitButton = document.querySelector("#addUserForm button[type='submit']");
    submitButton.textContent = "Add User";
    editingUserId = null;
  }

  

  deleteAllButton.addEventListener("click", function () {
    if (confirm("Você tem certeza que deseja deletar todos os usuários?")) {
      userTableBody.innerHTML = "";
      users = [];
      localStorage.removeItem("users"); // Limpa o localStorage
    }
  });
});
