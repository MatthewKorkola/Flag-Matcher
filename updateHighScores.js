// updateHighScores.js

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
  // Retrieve values from localStorage
  const points = localStorage.getItem("points") || "-1";
  const correctAnswers = localStorage.getItem("correctAnswers") || "-1";
  const incorrectAnswers = localStorage.getItem("incorrectAnswers") || "-1";
  const streak = localStorage.getItem("streak") || "-1";
  const maxStreak = localStorage.getItem("maxStreak") || "-1";
  const correctAnswerPercentage = localStorage.getItem("correctAnswersPercentage") || "-1";
  const quickAnswers = localStorage.getItem("quickAnswers") || "-1";
  const closeCalls = localStorage.getItem("closeCalls") || "-1";
  const fastestAnswer = localStorage.getItem("fastestAnswer") || "-1";
  const slowestAnswer = localStorage.getItem("slowestAnswer") || "-1";
  const totalTime = localStorage.getItem("totalTime") || "-1";

  // Create the new array
  const newArray = [points, correctAnswers, incorrectAnswers, streak, maxStreak, correctAnswerPercentage, quickAnswers, closeCalls, fastestAnswer, slowestAnswer, totalTime];

  // Retrieve the current arrays from localStorage
  let arrays = getArraysFromLocalStorage();

  // Find the index where the new array should be inserted
  let insertIndex = 0;
  while (insertIndex < arrays.length && newArray[0] < arrays[insertIndex][0]) {
    insertIndex++;
  }

  // Shift down arrays starting from the last one
  for (let i = arrays.length - 1; i > insertIndex; i--) {
    arrays[i] = arrays[i - 1];
  }

  // Insert the new array into its appropriate spot
  arrays[insertIndex] = newArray;

  // If there are more than 5 arrays, remove the last one
  if (arrays.length > 5) {
    arrays.pop();
  }

  // Save the updated arrays to localStorage and display them
  saveArraysToLocalStorage(arrays);
}

// Insert values when this script is loaded
insertValues();
