// fetch data från API
function displayError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.innerHTML = `<div>Error: ${message}</div>`;
}

// fetch data från API
fetch("https://localhost:7011/War")
  .then((response) => response.json())
  .then((data) => displayData(data))
  .catch((error) => displayError("Error: " + error));

// displaya data in cards
function displayData(data) {
  console.log(data);
  document.getElementById("cards-container").innerHTML = "";
  if (data.length === 0) {
    displayError("No results found.");
    return;
  }
  // foreacha data och skapa cards
  data.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    // Adda data till card
    card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.race}</p>
            <button onclick="populateUpdateForm(${item.id}, '${item.name}', '${item.race}')">Update</button>
        `;

    document.getElementById("cards-container").appendChild(card);
  });
}

function populateUpdateForm(id, name, race) {
  document.getElementById("update-id").value = id;
  document.getElementById("update-name").value = name;
  document.getElementById("update-race").value = race;
}

function updateData(event) {
  event.preventDefault();
  const id = document.getElementById("update-id").value;
  const newName = document.getElementById("update-name").value;
  const newRace = document.getElementById("update-race").value;
  if (!id || !newName || !newRace) {
    displayError("Please fill in all fields for the update.");
    return;
  }

  const newData = { name: newName, race: newRace };

  updateDataApi(id, newData);
}

function addData(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const race = document.getElementById("race").value;

  fetch("https://localhost:7011/War", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, race }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response was not ok");
      }
      // Data added, fetch updated data
      fetchData();
    })
    .catch((error) =>
      displayError("Something went wrong, check API: " + error)
    );
}

// Function för att hantera updatering av data
function updateDataApi(id, newData) {
  fetch(`https://localhost:7011/War/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  }).then((response) => {
    if (response.ok) {
      fetchData(); // Fetch updated data
    } else {
      displayError("Something went wrong, check API for update.");
    }
  });
}

// Function att ta bort data med använding av DELETE
function deleteData(id) {
  fetch(`https://localhost:7011/War/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      // Data borttagen, fetcha upddaterad data
      fetchData();
    } else displayError("Something went wrong, check API");
  });
}

function onDeleteButtonClick() {
  const idToBeDeleted = document.getElementById("delete-id").value;
  if (!idToBeDeleted) {
    displayError("Please enter an ID to delete.");
    return;
  }
  deleteData(idToBeDeleted);
}

function searchData() {
  const searchQuery = document.getElementById("search-input").value;
  fetch(`https://localhost:7011/War/search?q=${searchQuery}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => displayData(data))
    .catch((error) => {
      console.error("Error fetching data:", error.message);
      displayError("Failed to fetch data. See console for details.");
    });
}

// Function för att displaya error message
function displayError(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.textContent = message;
}

// Function för att fetcha initial data
function fetchData() {
  fetch("https://localhost:7011/War")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => displayData(data))
    .catch((error) => displayError("Failed to fetch data: " + error));
}

// Fetcha initial data
fetchData();
