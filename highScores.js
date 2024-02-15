// highScores.js

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

  arrays.forEach((array, index) => {
    const rank = index + 1;
    const arrayDiv = document.createElement('div');
    arrayDiv.textContent = `Rank ${rank}:     `;
    array.forEach((value, i) => {
      const label = getLabelForIndex(i);
      const formattedValue = label ? `${label}: ${value === '-1' ? '-' : value}` : value;
      const valueSpan = document.createElement('span');
      valueSpan.textContent = formattedValue;
      arrayDiv.appendChild(valueSpan);
      if (i !== array.length - 1) {
        arrayDiv.appendChild(document.createTextNode(', '));
      }
    });
    arraysDiv.appendChild(arrayDiv);
  });
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
  let emptyArrays = [];
  for (let i = 0; i < 5; i++) {
    emptyArrays.push(['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1']);
  }
  saveArraysToLocalStorage(emptyArrays);
  displayArrays(emptyArrays);
}

// Initial setup
let arrays = getArraysFromLocalStorage();
if (arrays.length === 0) {
  arrays = [
    ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
    ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
    ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
    ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1'],
    ['-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1', '-1']
  ];
}
displayArrays(arrays);
