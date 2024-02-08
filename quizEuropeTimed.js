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
    "Germany",
    "Albania",
    "Andorra",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Belarus",
    "Belgium",
    "Bosnia_and_Herzegovina",
    "Bulgaria",
    "Croatia"
];

// Array to store the original options pool
var optionsPool = [...countries];

// Variable to keep track of the current flag number
var currentFlagNumber = 0;

var correctAnswers = 0;

var incorrectAnswers = 0;

var currentStreak = 0;

var maxStreak = 0;

var timer;

var timeLeft;

var extraMessage;

var quickAnswers = 0;

var closeCalls = 0;

var fastestAnswer = 10;

var slowestAnswer = 0;

var totalTime = 0;

// Function to start the timer
function startTimer(correctCountry) {
    timeLeft = 10; // Set the initial time limit to 10 seconds

    // Display the initial time
    var timerElement = document.getElementById("timer");
    timerElement.textContent = "Time left: " + timeLeft.toFixed(2) + "s";

    // Update the timer every second
    timer = setInterval(function() {
        timeLeft -= 0.01;
        if (timeLeft < 0) {
            timeLeft = 0
        }
        timerElement.textContent = "Time left: " + timeLeft.toFixed(2) + "s";

        // If time runs out, handle it as an incorrect answer and reset the timer
        if (timeLeft <= 0) {
            totalTime += 10;
            resetTimer()
            incorrectAnswers++
            var incorrectElement = document.getElementById("incorrect");
            incorrectElement.textContent = "Incorrect Answers: " + incorrectAnswers;
            currentStreak = 0;
            var streakElement = document.getElementById("streak");
            streakElement.textContent = "Streak: " + currentStreak;
            displayMessage("Time depleted! The correct country is: " + correctCountry.replace(/_/g, ' '), 4000);
            setTimeout(displayFlagAndOptions, 4000);
        }
    }, 10);
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timer); // Stop the timer
}

// Function to shuffle array elements randomly (Fisher-Yates shuffle algorithm)
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
        redirectToResults();
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

    var streakElement = document.getElementById("streak");
    streakElement.textContent = "Streak: " + currentStreak;

    // Shuffle the array of countries
    shuffleArray(countries);

    // Get the next country to display
    var currentCountry = countries.pop();

    startTimer(currentCountry);

    // Include the correct answer in the options
    var options = document.getElementById("options");
    options.innerHTML = "";

    // Exclude the correct option from the options pool
    var remainingOptions = optionsPool.filter(option => option !== currentCountry);

    // Get four random countries from the remaining options as incorrect options
    shuffleArray(remainingOptions);
    remainingOptions = remainingOptions.slice(0, 4);

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
    totalTime += 10 - timeLeft
    resetTimer()
    if (isCorrect) {
        if (timeLeft < 1) {
            closeCalls++;
            extraMessage = "Close call!"
        }
        else if (timeLeft > 8.9) {
            quickAnswers++;
            extraMessage = "Quick!"
        }
        else {
            extraMessage = ""
        }
        correctAnswers++;
        var correctElement = document.getElementById("correct");
        correctElement.textContent = "Correct Answers: " + correctAnswers;
        currentStreak++;
        var streakElement = document.getElementById("streak");
        streakElement.textContent = "Streak: " + currentStreak;
        if (currentStreak >= maxStreak) {
            maxStreak = currentStreak;
        }
        if ((10 - timeLeft) < fastestAnswer) {
            fastestAnswer = 10 - timeLeft;
        }
        if ((10 - timeLeft) > slowestAnswer) {
            slowestAnswer = 10 - timeLeft;
        }
        displayMessage("Correct! " + extraMessage, 1000);
        setTimeout(displayFlagAndOptions, 1000);
    } else {
        incorrectAnswers++;
        var incorrectElement = document.getElementById("incorrect");
        incorrectElement.textContent = "Incorrect Answers: " + incorrectAnswers;
        currentStreak = 0;
        var streakElement = document.getElementById("streak");
        streakElement.textContent = "Streak: " + currentStreak;
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
function redirectToResults() {
    var correctAnswersPercentage = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;
    var resultsMessage;

    if (correctAnswersPercentage < 50) {
        var resultsMessage = "Study harder!";
    }
    else if (correctAnswersPercentage < 70) {
        var resultsMessage = "A decent result!";
    }
    else if (correctAnswersPercentage < 80) {
        var resultsMessage = "Good work!";
    }
    else if (correctAnswersPercentage < 90) {
        var resultsMessage = "A great result!";
    }
    else if (correctAnswersPercentage < 100) {
        var resultsMessage = "Wow! Excellent work!";
    }
    else {
        var resultsMessage = "A perfect result! Incredible!";
    }

    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("incorrectAnswers", incorrectAnswers);
    localStorage.setItem("streak", currentStreak);
    localStorage.setItem("maxStreak", maxStreak);
    localStorage.setItem("correctAnswersPercentage", correctAnswersPercentage);
    localStorage.setItem("resultsMessage", resultsMessage);
    localStorage.setItem("quickAnswers", quickAnswers);
    localStorage.setItem("closeCalls", closeCalls);
    localStorage.setItem("fastestAnswer", fastestAnswer.toFixed(2));
    localStorage.setItem("slowestAnswer", slowestAnswer.toFixed(2));
    localStorage.setItem("totalTime", totalTime.toFixed(2));
    window.location.href = "resultsEuropeTimed.html";
}

// Display the initial flag and options when the page loads
window.onload = displayFlagAndOptions;
