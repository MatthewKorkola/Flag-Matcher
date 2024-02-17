// highScores.js

// Define arrays for each region
let regionArrays = {
  "30 Random": [],
  "Europe": [],
  "Asia": [],
  "Africa": [],
  "The Americas and Oceania": [],
  "All Countries": []
};

// Function to retrieve arrays from local storage
function getArraysFromLocalStorage() {
  const arrays = JSON.parse(localStorage.getItem('arrays')) || [];
  return arrays;
}

// Function to save arrays to local storage
function saveArraysToLocalStorage(arrays) {
  localStorage.setItem('arrays', JSON.stringify(arrays));
}

// Function to display arrays on the HTML page
function displayArrays(arrays) {
  const arraysDiv = document.getElementById('arrays');
  arraysDiv.innerHTML = ''; // Clear previous content

  // Loop through each array and display it
  for (let index = 0; index < 5; index++) {
    const rank = index + 1;
    const arrayDiv = document.createElement('div');
    arrayDiv.textContent = `Rank ${rank}:     `;
    
    // If the array exists in the provided arrays, display its values
    if (index < arrays.length) {
      arrays[index].forEach((value, i) => {
        const label = getLabelForIndex(i);
        const formattedValue = label ? `${label}: ${value === '-1' ? '-' : value}` : value;
        const valueSpan = document.createElement('span');
        valueSpan.textContent = formattedValue;
        arrayDiv.appendChild(valueSpan);
        if (i !== arrays[index].length - 1) {
          arrayDiv.appendChild(document.createTextNode(', '));
        }
      });
    } else {
      // If the array doesn't exist, display dashes for each value
      for (let i = 0; i < 11; i++) {
        const valueSpan = document.createElement('span');
        valueSpan.textContent = '-';
        arrayDiv.appendChild(valueSpan);
        if (i !== 10) {
          arrayDiv.appendChild(document.createTextNode(', '));
        }
      }
    }
    
    arraysDiv.appendChild(arrayDiv);
  }
}

// Helper function to get label for each index
function getLabelForIndex(index) {
  switch (index) {
    case 0:
      return "Points";
    case 1:
      return "Correct Answers";
    case 2:
      return "Incorrect Answers";
    case 3:
      return "Ending Streak";
    case 4:
      return "Max Streak";
    case 5:
      return "Correct Answer Percentage";
    case 6:
      return "Quick Answers";
    case 7:
      return "Close Calls";
    case 8:
      return "Fastest Answer(s)";
    case 9:
      return "Slowest Answer(s)";
    case 10:
      return "Total Time(s)";
    default:
      return null;
  }
}

// Function to handle clearing data
function clearData() {
  // Retrieve the currently selected region
  const selectedRegion = document.getElementById('regionDropdown').value;

  // Prompt the user for confirmation
  const confirmation = confirm("You chose to clear data for this mode. Are you sure?");
  
  if (confirmation) {
    // Clear data for the selected region from regionArrays
    regionArrays[selectedRegion] = [];

    // Save the updated regionArrays to localStorage
    saveArraysToLocalStorage(regionArrays);

    // Clear data for the selected region from localStorage
    localStorage.removeItem(selectedRegion);

    // Display the cleared arrays for the selected region
    displayArrays(regionArrays[selectedRegion]);
  }
  
}

// Initial setup
let arrays = getArraysFromLocalStorage();
if (arrays.length === 0) {
  // Initialize regionArrays with empty arrays
  Object.keys(regionArrays).forEach(region => {
    for (let i = 0; i < 5; i++) {
      regionArrays[region].push(['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1']);
    }
  });
} else {
  // If arrays are already present in localStorage, update regionArrays
  Object.keys(regionArrays).forEach(region => {
    regionArrays[region] = arrays[region] || [];
  });
}

// Display initial arrays for the default region
displayArrays(regionArrays["30 Random"]);

// Event listener for clear button
document.getElementById('clearButton').addEventListener('click', clearData);
