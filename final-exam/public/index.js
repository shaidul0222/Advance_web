const customerList = document.getElementById("customer-list");
const personForm = document.getElementById("person-form");
const customerIdInput = document.getElementById("customer-id");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const birthDateInput = document.getElementById("birth-date");
const saveBtn = document.getElementById("save-btn");
const updateBtn = document.getElementById("update-btn");
const deleteBtn = document.getElementById("delete-btn");
const clearBtn = document.getElementById("clear-btn");
const formStatus = document.getElementById("form-status");

let selectedCustomerId = null;

function showStatus(message, isError = false) {
  formStatus.textContent = message;
  formStatus.className = isError ? "form-status error" : "form-status success";
}

function clearStatus() {
  formStatus.textContent = "";
  formStatus.className = "form-status";
}

function isValidName(name) {
  const trimmedName = name.trim();
  const namePattern = /^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ\s'-]{1,}$/;
  return namePattern.test(trimmedName);
}

function isValidEmail(email) {
  const trimmedEmail = email.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(trimmedEmail);
}

function isValidPhone(phone) {
  const trimmedPhone = phone.trim();
  const phonePattern = /^[0-9+\-\s()]{6,20}$/;
  return phonePattern.test(trimmedPhone);
}

function isValidBirthDate(birthDate) {
  if (!birthDate) {
    return false;
  }

  const today = new Date();
  const selectedDate = new Date(birthDate);

  today.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  return selectedDate <= today;
}

function validateFormData(formData) {
  if (!isValidName(formData.first_name)) {
    showStatus("Please enter a valid first name.", true);
    return false;
  }

  if (!isValidName(formData.last_name)) {
    showStatus("Please enter a valid last name.", true);
    return false;
  }

  if (!isValidEmail(formData.email)) {
    showStatus("Please enter a valid email address.", true);
    return false;
  }

  if (!isValidPhone(formData.phone)) {
    showStatus("Please enter a valid phone number.", true);
    return false;
  }

  if (!isValidBirthDate(formData.birth_date)) {
    showStatus("Birth date cannot be in the future.", true);
    return false;
  }

  return true;
}

function resetForm() {
  personForm.reset();
  customerIdInput.value = "";
  selectedCustomerId = null;

  saveBtn.disabled = false;
  updateBtn.disabled = true;
  deleteBtn.disabled = true;

  birthDateInput.max = new Date().toISOString().split("T")[0];

  document.querySelectorAll(".customer-card").forEach(card => {
    card.classList.remove("selected");
  });

  clearStatus();
}

function fillForm(person) {
  customerIdInput.value = person.id;
  selectedCustomerId = person.id;

  firstNameInput.value = person.first_name || "";
  lastNameInput.value = person.last_name || "";
  emailInput.value = person.email || "";
  phoneInput.value = person.phone || "";
  birthDateInput.value = person.birth_date ? person.birth_date.split("T")[0] : "";

  saveBtn.disabled = true;
  updateBtn.disabled = false;
  deleteBtn.disabled = false;

  showStatus(`Selected customer: ${person.first_name} ${person.last_name}`);
}

function getFormData() {
  return {
    first_name: firstNameInput.value.trim(),
    last_name: lastNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    birth_date: birthDateInput.value
  };
}

async function loadCustomers() {
  const container = document.getElementById("customer-list");

  try {
    const res = await fetch("/api/persons");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    container.innerHTML = "";

    if (data.length === 0) {
      container.innerHTML = "<p>No customers found.</p>";
      return;
    }

    data.forEach(person => {
      const div = document.createElement("div");
      div.className = "customer-card";
      div.dataset.id = person.id;

      div.innerHTML = `
        <strong>${person.first_name} ${person.last_name}</strong><br>
        Email: ${person.email}<br>
        Phone: ${person.phone || "-"}<br>
        Birth Date: ${person.birth_date ? person.birth_date.split("T")[0] : "-"}
      `;

      div.addEventListener("click", () => {
        document.querySelectorAll(".customer-card").forEach(card => {
          card.classList.remove("selected");
        });

        div.classList.add("selected");
        fillForm(person);
      });

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p style='color:red;'>Error loading data</p>";
  }
}

async function addCustomer(event) {
  event.preventDefault();
  clearStatus();

  const formData = getFormData();

  if (!validateFormData(formData)) {
    return;
  }

  try {
    const res = await fetch("/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await res.json();

    if (!res.ok) {
      showStatus(result.error || "Failed to add customer.", true);
      return;
    }

    resetForm();
    await loadCustomers();
    showStatus("Customer added successfully.");

  } catch (err) {
    console.error(err);
    showStatus("An error occurred while adding customer.", true);
  }
}

async function updateCustomer() {
  clearStatus();

  if (!selectedCustomerId) {
    showStatus("Please select a customer first.", true);
    return;
  }

  const formData = getFormData();

  if (!validateFormData(formData)) {
    return;
  }

  try {
    const res = await fetch(`/api/persons/${selectedCustomerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await res.json();

    if (!res.ok) {
      showStatus(result.error || "Failed to update customer.", true);
      return;
    }

    resetForm();
    await loadCustomers();
    showStatus("Customer updated successfully.");

  } catch (err) {
    console.error(err);
    showStatus("An error occurred while updating customer.", true);
  }
}

async function deleteCustomer() {
  clearStatus();

  if (!selectedCustomerId) {
    showStatus("Please select a customer first.", true);
    return;
  }

  const confirmed = confirm("Are you sure you want to delete this customer?");
  if (!confirmed) {
    return;
  }

  try {
    const res = await fetch(`/api/persons/${selectedCustomerId}`, {
      method: "DELETE"
    });

    const result = await res.json();

    if (!res.ok) {
      showStatus(result.error || "Failed to delete customer.", true);
      return;
    }

    resetForm();
    await loadCustomers();
    showStatus("Customer deleted successfully.");

  } catch (err) {
    console.error(err);
    showStatus("An error occurred while deleting customer.", true);
  }
}

personForm.addEventListener("submit", addCustomer);
updateBtn.addEventListener("click", updateCustomer);
deleteBtn.addEventListener("click", deleteCustomer);
clearBtn.addEventListener("click", resetForm);

resetForm();
loadCustomers();