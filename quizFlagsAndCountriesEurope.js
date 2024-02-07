// Array to store country names
var countries = [
    "the_United_Kingdom",
    "Finland",
    "Sweden",
    "Switzerland",
    "Norway",
    "Italy",
    "Ireland",
    "Greece",
    "France",
    "Germany"
];

// Array to store the original options pool
var optionsPool = [...countries];

// Variable to keep track of the current flag number
var currentFlagNumber = 0;

var correctAnswers = 0;

var incorrectAnswers = 0;

// Function to shuffle array elements randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to display a new flag and options
function displayFlagAndOptions() {
    if (countries.length === 0) {
        // All flags have been seen, return to the main menu
        redirectToMainMenu();
        return;
    }

    // Increment the current flag number
    currentFlagNumber++;

    var progressElement = document.getElementById("progress");
    progressElement.textContent = "Flag: " + currentFlagNumber + " / " + optionsPool.length;

    var correctElement = document.getElementById("correct");
    correctElement.textContent = "Correct Answers: " + correctAnswers;

    var incorrectElement = document.getElementById("incorrect");
    incorrectElement.textContent = "Incorrect Answers: " + incorrectAnswers;

    // Shuffle the array of countries
    shuffleArray(countries);

    // Get the next country to display
    var currentCountry = countries.pop();

    // Include the correct answer in the options
    var options = document.getElementById("options");
    options.innerHTML = "";

    // Exclude the correct option from the options pool
    var remainingOptions = optionsPool.filter(option => option !== currentCountry);

    // Get four random countries from the remaining options as incorrect options
    remainingOptions = remainingOptions.slice(0, 4);
    shuffleArray(remainingOptions);

    // Insert the correct option at a random position among the five options
    var correctPosition = Math.floor(Math.random() * 5);
    remainingOptions.splice(correctPosition, 0, currentCountry);

    for (let i = 0; i < 5; i++) {
        var option = document.createElement("button");
        option.textContent = remainingOptions[i].replace(/_/g, ' ');
        option.onclick = function () {
            checkAnswer(i === correctPosition, currentCountry);
        };
        options.appendChild(option);
    }

    // Display the flag
    var flagImage = document.getElementById("flag");
    flagImage.src = "Flag_of_" + currentCountry + ".svg.png";
    flagImage.alt = currentCountry;
}

// Function to check the user's answer
function checkAnswer(isCorrect, correctCountry) {
    if (isCorrect) {
        correctAnswers++;
        var correctElement = document.getElementById("correct");
        correctElement.textContent = "Correct Answers: " + correctAnswers;
        displayMessage("Correct!", 1000);
        setTimeout(displayFlagAndOptions, 1000);
    } else {
        incorrectAnswers++
        var incorrectElement = document.getElementById("incorrect");
        incorrectElement.textContent = "Incorrect Answers: " + incorrectAnswers;
        displayMessage("Incorrect! The correct country is: " + correctCountry.replace(/_/g, ' '), 4000);
        setTimeout(displayFlagAndOptions, 4000);
    }

    // Display the next flag and options
    //displayFlagAndOptions();
}

// Function to display a message on the screen for a specified duration
function displayMessage(message, duration) {
    var messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.display = "block";

    setTimeout(function () {
        messageElement.style.display = "none";
    }, duration);
}

// Function to return to the main menu
function redirectToMainMenu() {
    window.location.href = "index.html";
}

// Display the initial flag and options when the page loads
window.onload = displayFlagAndOptions;
