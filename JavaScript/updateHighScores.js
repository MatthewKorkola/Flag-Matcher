// Function to retrieve arrays from local storage
function getArraysFromLocalStorage() {
  const arrays = JSON.parse(localStorage.getItem('arrays')) || [];
  return arrays;
}

// Function to save arrays to local storage
function saveArraysToLocalStorage(arrays) {
  localStorage.setItem('arrays', JSON.stringify(arrays));
}

// Function to insert specific values into 11 slots
function insertValues() {
  // Retrieve region from localStorage
  const region = localStorage.getItem('region');

  // Check if the data has already been stored
  if (localStorage.getItem('dataStored') === 'true') {
    return; // Exit the function if data has already been stored
  }
  
  // Retrieve values from localStorage
  const points = localStorage.getItem("points") || "-1";

  // Create the new array
  const newArray = [
    points,
    localStorage.getItem("correctAnswers") || "-1",
    localStorage.getItem("incorrectAnswers") || "-1",
    localStorage.getItem("streak") || "-1",
    localStorage.getItem("maxStreak") || "-1",
    localStorage.getItem("correctAnswersPercentage") || "-1",
    localStorage.getItem("quickAnswers") || "-1",
    localStorage.getItem("closeCalls") || "-1",
    localStorage.getItem("fastestAnswer") || "-1",
    localStorage.getItem("slowestAnswer") || "-1",
    localStorage.getItem("totalTime") || "-1"
  ];

  // Retrieve the current arrays from localStorage for the current region
  let arrays = JSON.parse(localStorage.getItem(region)) || [];

  // Find the index where the new array should be inserted based on points
  let insertIndex = 0;
  while (insertIndex < arrays.length && parseInt(newArray[0]) < parseInt(arrays[insertIndex][0])) {
    insertIndex++;
  }

  if (insertIndex >= 0 && insertIndex <= 4) {
    // Retrieve the existing message or set it to an empty string if it doesn't exist
    let existingMessage = document.getElementById('resultsMessage').textContent || '';

    // The user's results made the top 5
    document.getElementById('resultsMessage').textContent = existingMessage + " High scores updated!";
  }

  // Insert the new array into its appropriate spot
  arrays.splice(insertIndex, 0, newArray);

  // If there are more than 5 arrays, remove the last one
  if (arrays.length > 5) {
    arrays.pop();
  }

  // Save the updated arrays to localStorage
  localStorage.setItem(region, JSON.stringify(arrays));

  // Mark data as stored to prevent multiple insertions
  localStorage.setItem('dataStored', 'true');
}


// Insert values when this script is loaded
insertValues();
