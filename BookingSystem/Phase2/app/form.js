// ===============================
// Form handling for resources page
// ===============================

// -------------- Helpers --------------
function $(id) {
  return document.getElementById(id);
}

function logSection(title, data) {
  console.group(title);
  console.log(data);
  console.groupEnd();
}

// -------------- Form wiring --------------
document.addEventListener("DOMContentLoaded", () => {
  const form = $("resourceForm");
  if (!form) {
    console.warn("resourceForm not found. Ensure the form has id=\"resourceForm\".");
    return;
  }

  // Get reference to the "Create" button
  const createButton = $("createBtn");
  
  // Add submit event listener
  form.addEventListener("submit", onSubmit);

  // Initialize validation
  const resourceNameInput = $("resourceName");
  const resourceDescInput = $("resourceDescription");

  // Add real-time validation to resource name and description
  attachResourceNameValidation(resourceNameInput);
  attachResourceDescValidation(resourceDescInput);

  // Initialize button state
  setButtonEnabled(createButton, false); // Disabled by default
});

// -------------- Form submission handler --------------
async function onSubmit(event) {
  event.preventDefault();
  const submitter = event.submitter;
  const actionValue = submitter && submitter.value ? submitter.value : "create";

  // Prepare payload for form submission
  const payload = {
    action: actionValue,
    resourceName: $("resourceName")?.value ?? "",
    resourceDescription: $("resourceDescription")?.value ?? "",
    resourceAvailable: $("resourceAvailable")?.value ?? "",
    resourcePrice: $("resourcePrice")?.value ?? "",
    resourcePriceUnit: $("resourcePriceUnit")?.value ?? ""
  };

  logSection("Sending payload", payload);

  try {
    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`HTTP ${response.status} ${response.statusText}\n${text}`);
    }

    const data = await response.json();

    console.group("Response from server");
    console.log("Status:", response.status);
    console.log("You sent (echo):", data.json);
    console.groupEnd();
  } catch (err) {
    console.error("POST error:", err);
  }
}

// -------------- Validation logic --------------

// Resource Name validation
function isResourceNameValid(value) {
  const trimmed = value.trim();
  const allowedPattern = /^[a-zA-Z0-9äöåÄÖÅ ]+$/;
  const lengthValid = trimmed.length >= 5 && trimmed.length <= 30;
  const charactersValid = allowedPattern.test(trimmed);
  return lengthValid && charactersValid;
}

// Resource Description validation
function isResourceDescValid(value) {
  const trimmed = value.trim();
  const lengthValid = trimmed.length >= 10 && trimmed.length <= 50;
  return lengthValid;
}

// Set input field visual state (green for valid, red for invalid)
function setInputVisualState(input, state) {
  // Reset to neutral state first
  input.classList.remove(
    "border-green-500", "bg-green-100", "focus:ring-green-500/30",
    "border-red-500", "bg-red-100", "focus:ring-red-500/30"
  );
  
  input.classList.add("focus:ring-2"); // Always keep the focus ring

  if (state === "valid") {
    input.classList.add("border-green-500", "bg-green-100", "focus:ring-green-500/30");
  } else if (state === "invalid") {
    input.classList.add("border-red-500", "bg-red-100", "focus:ring-red-500/30");
  }
}

// Attach validation to the Resource Name input
function attachResourceNameValidation(input) {
  const update = () => {
    const raw = input.value;
    if (raw.trim() === "") {
      setInputVisualState(input, "neutral");
      setButtonEnabled($("createBtn"), false);
      return;
    }

    const valid = isResourceNameValid(raw);
    setInputVisualState(input, valid ? "valid" : "invalid");
    setButtonEnabled($("createBtn"), valid && isResourceDescValid($("resourceDescription").value));
  };

  // Real-time validation
  input.addEventListener("input", update);

  // Initialize state on page load (Create disabled until valid)
  update();
}

// Attach validation to the Resource Description input
function attachResourceDescValidation(input) {
  const update = () => {
    const raw = input.value;
    if (raw.trim() === "") {
      setInputVisualState(input, "neutral");
      setButtonEnabled($("createBtn"), false);
      return;
    }

    const valid = isResourceDescValid(raw);
    setInputVisualState(input, valid ? "valid" : "invalid");
    setButtonEnabled($("createBtn"), valid && isResourceNameValid($("resourceName").value));
  };

  // Real-time validation
  input.addEventListener("input", update);

  // Initialize state on page load (Create disabled until valid)
  update();
}

// Enable or disable the button based on form validity
function setButtonEnabled(button, enabled) {
  if (!button) return;

  button.disabled = !enabled;

  // Keep disabled look in ONE place (here)
  button.classList.toggle("cursor-not-allowed", !enabled);
  button.classList.toggle("opacity-50", !enabled);

  // Optional: Remove hover feel when disabled (recommended UX)
  if (!enabled) {
    button.classList.remove("hover:bg-brand-dark/80");
  } else {
    button.classList.add("hover:bg-brand-dark/80");
  }
}