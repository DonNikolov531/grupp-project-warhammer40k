// fetch data från API
fetch("https://localhost:7011/War")
  .then((response) => response.json())
  .then((data) => displayData(data));

// displaya data in cards
function displayData(data) {
  console.log(data);

  document.getElementById("cards-container").innerHTML = "";
  // foreacha data och skapa cards
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    // Adda data till card
    card.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.race}</p>
        `;

    document.getElementById("cards-container").appendChild(card);
  });
}

function addData(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const race = document.getElementById("race").value;

  const response = fetch("https://localhost:7011/War", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, race }),
  });
  if (response.ok) {
    // Data addat, fetcha upddaterad data
    fetchData();
  } else displayError("Something went wrong, check API");
}

// Function för att hantera updatering av data
function updateData(id, newData) {
  fetch(`https://localhost:7011/War${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
}

// Function att ta bort data med använding av DELETE
function deleteData(id) {
  const response = fetch(`https://localhost:7011/War${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    // Data borttagen, fetcha upddaterad data
    fetchData();
  } else displayError("Something went wrong, check API");
}

// Function för att displaya error message
function displayError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.textContent = message;
}

// Function för att fetcha initial data
function fetchData() {
  fetch("https://localhost:7011/War")
    .then((response) => response.json())
    .then((data) => displayData(data));
}

// Fetcha initial data
fetchData();
