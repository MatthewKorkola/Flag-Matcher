// Arrays to store country names
var countriesEurope = [
    "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia_and_Herzegovina", "Bulgaria", "Croatia",
    "Cyprus", "Czech_Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany",
    "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania",
    "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North_Macedonia", "Norway",
    "Poland", "Portugal", "Romania", "Russia", "San_Marino", "Serbia", "Slovakia", "Slovenia",
    "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United_Kingdom", "Vatican_City"
];

var countriesAfrica = [
    "Algeria", "Angola", "Benin", "Botswana", "Burkina_Faso", "Burundi", "Cameroon", "Cape_Verde",
    "Central_African_Republic", "Chad", "Comoros", "Democratic_Republic_of_the_Congo", "Republic_of_the_Congo",
    "Djibouti", "Egypt", "Equatorial_Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia",
    "Ghana", "Guinea", "Guinea-Bissau", "Ivory_Coast", "Kenya", "Lesotho", "Liberia", "Libya",
    "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia",
    "Niger", "Nigeria", "Rwanda", "São_Tomé_and_Príncipe", "Senegal", "Seychelles", "Sierra_Leone", "Somalia",
    "South_Africa", "South_Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
];

var countriesAsia = [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia",
    "China", "East_Timor", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan",
    "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia",
    "Myanmar", "Nepal", "North_Korea", "Oman", "Pakistan", "Philippines", "Qatar", "Saudi_Arabia",
    "Singapore", "South_Korea", "Sri_Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand",
    "Turkmenistan", "United_Arab_Emirates", "Uzbekistan", "Vietnam", "Yemen"
];

var countriesAmericasAndOceania = [
    "Antigua_and_Barbuda", "Argentina", "Australia", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil",
    "Canada", "Chile", "Colombia", "Costa_Rica", "Cuba", "Dominica", "Dominican_Republic", "Ecuador",
    "El_Salvador", "Federated_States_of_Micronesia", "Fiji", "Grenada", "Guatemala", "Guyana", "Haiti",
    "Honduras", "Jamaica", "Kiribati", "Marshall_Islands", "Mexico", "Nauru", "New_Zealand", "Nicaragua",
    "Palau", "Panama", "Papua_New_Guinea", "Paraguay", "Peru", "Saint_Kitts_and_Nevis", "Saint_Lucia",
    "Saint_Vincent_and_the_Grenadines", "Samoa", "Solomon_Islands", "Suriname", "Tonga",
    "Trinidad_and_Tobago", "Tuvalu", "United_States", "Uruguay", "Vanuatu", "Venezuela"
];

// Choose countries array based on selected region
var countries;

var random = false;

var region = localStorage.getItem('region');

if (region === '30 Random') {
    countries = countriesEurope.concat(countriesAsia, countriesAfrica, countriesAmericasAndOceania);
    random = true;
}
else if (region === 'Europe') {
    countries = countriesEurope;
} 
else if (region === 'Asia') {
    countries = countriesAsia;
}
else if (region === "Africa") {
    countries = countriesAfrica;
}
else if (region === 'The Americas and Oceania') {
    countries = countriesAmericasAndOceania;
}
else if (region === 'All Countries') {
    countries = countriesEurope.concat(countriesAsia, countriesAfrica, countriesAmericasAndOceania);
}
else {
    // Handle invalid selection
    console.error("Invalid region selection!");
    countries = [];
}

// Array to store the original options pool
var optionsPool = [...countries];

if (random) {
    shuffleArray(countries);
    countries = countries.slice(0, 30);
}

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

const timeGiven = 5;

var fastestAnswer = timeGiven;

var slowestAnswer = 0;

var totalTime = 0;

var answerSelected = false;

var flagWidth = 200;

var flagHeight = 120;

// Function to start the timer
function startTimer(correctCountry) {
    timeLeft = 5; // Set the initial time limit to 5 seconds

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

        // Change the color of the timer text if less than 1.4 seconds remain
        if (timeLeft < 1.4) {
            timerElement.style.textShadow = "0 0 3px firebrick";
        } else {
            // Reset text color and shadow for other cases
            timerElement.style.textShadow = ""; // Reset to default
        }

        // If time runs out, handle it as an incorrect answer and reset the timer
        if (timeLeft <= 0) {
            disableOptionButtons()
            totalTime += timeGiven;
            resetTimer();
            incorrectAnswers++;
            var incorrectElement = document.getElementById("incorrect");
            incorrectElement.textContent = "Incorrect Answers: " + incorrectAnswers;
            currentStreak = 0;
            var streakElement = document.getElementById("streak");
            streakElement.textContent = "Streak: " + currentStreak;
            displayMessage("Time depleted! The correct country is: " + correctCountry.replace(/_/g, ' '), 3000);
            setTimeout(displayFlagAndOptions, 3000);
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
    if (!countries || countries.length === 0) {
        // All flags have been seen
        redirectToResults();
        return;
    }

    enableOptionButtons();
    answerSelected = false;

    // Increment the current flag number
    currentFlagNumber++;

    var progressElement = document.getElementById("progress");
    if (random) {
        progressElement.textContent = "Flag: " + currentFlagNumber + " / 30";
    }
    else {
        progressElement.textContent = "Flag: " + currentFlagNumber + " / " + optionsPool.length;
    }

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
        option.classList.add("option");
    }

    // Display the flag
    var flagImage = document.getElementById("flag");
    flagImage.src = "Flags/Flag_of_" + currentCountry + ".svg.png";
    flagImage.alt = currentCountry;

    // Set flag dimensions based on the country
    flagWidth = 200; // Default width

    if (currentCountry === "Switzerland" || currentCountry === "Vatican_City") {
        flagWidth = 120; // Adjusted width for Switzerland and Vatican City
    }

    // Apply the dimensions to the flag image
    flagImage.style.width = flagWidth + "px";
    flagImage.style.height = flagHeight + "px";
}

// Function to check the user's answer
function checkAnswer(isCorrect, correctCountry) {
    if (!answerSelected) {
        answerSelected = true;
        disableOptionButtons();

        totalTime += timeGiven - timeLeft;
        resetTimer()
        if (isCorrect) {
            if (timeLeft < 1.4) {
                closeCalls++;
                extraMessage = "Close call!";
            }
            else if (timeLeft > 3.6) {
                quickAnswers++;
                extraMessage = "Quick!";
            }
            else {
                extraMessage = "";
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
            if ((timeGiven - timeLeft) < fastestAnswer) {
                fastestAnswer = timeGiven - timeLeft;
            }
            if ((timeGiven - timeLeft) > slowestAnswer) {
                slowestAnswer = timeGiven - timeLeft;
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
            displayMessage("Incorrect! The correct country is: " + correctCountry.replace(/_/g, ' '), 3000);
            setTimeout(displayFlagAndOptions, 3000);
        }
    }
}

// Function to display a message on the screen for a specified duration
function displayMessage(message, duration) {
    var messageElement = document.getElementById("message");
    messageElement.textContent = message;
    messageElement.style.display = "block";

    messageElement.style.color = "black";
    messageElement.style.textShadow = "";

    if (message.startsWith("Correct!")) {
        messageElement.style.color = "rgb(218, 165, 32)";
        messageElement.style.textShadow = "0 0 3px black";
        if (message.includes("Quick!")) {
            // Change color for "Quick!" if it appears after "Correct!"
            messageElement.innerHTML = messageElement.innerHTML.replace("Quick!", `<span style="color: rgb(57, 255, 20); text-shadow: 0 0 3px black;">Quick!</span>`);
        }
        else if (message.includes("Close call!")) {
            // Change color for "Close call!" if it appears after "Correct!"
            messageElement.innerHTML = messageElement.innerHTML.replace("Close call!", `<span style="color: lightgray; text-shadow: 0 0 3px firebrick;">Close call!</span>`);
        }
    }
    else {
        // Reset text color for other messages
        var incorrectIndex = message.indexOf("!") + 1;
        var incorrectPart = message.slice(0, incorrectIndex);
        var restOfMessage = message.slice(incorrectIndex);
        messageElement.innerHTML = `<span style="text-shadow: 0 0 3px firebrick;">${incorrectPart}</span>${restOfMessage}`;
    }

    setTimeout(function () {
        messageElement.style.display = "none";
    }, duration);
}

// Function to enable option buttons
function enableOptionButtons() {
    var optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach(function(button) {
        button.disabled = false;
    });
}

// Function to disable option buttons
function disableOptionButtons() {
    var optionButtons = document.querySelectorAll("#options button");
    optionButtons.forEach(function(button) {
        button.disabled = true;
    });
}

// Function to advance to the results page
function redirectToResults() {
    var correctAnswersPercentage = (correctAnswers / (correctAnswers + incorrectAnswers)) * 100;
    var resultsMessage;

    if (correctAnswersPercentage < 50) {
        resultsMessage = "Study harder!";
    }
    else if (correctAnswersPercentage < 70) {
        resultsMessage = "A decent result!";
    }
    else if (correctAnswersPercentage < 80) {
        resultsMessage = "Good work!";
    }
    else if (correctAnswersPercentage < 90) {
        resultsMessage = "A great result!";
    }
    else if (correctAnswersPercentage < 100) {
        resultsMessage = "Wow! Excellent work!";
    }
    else {
        resultsMessage = "A perfect result! Incredible!";
    }

    var numberOfFlags;
    if (random) {
        numberOfFlags = 30;
    }
    else {
        numberOfFlags = optionsPool.length;
    }

    var points = 1000 + (5 * correctAnswers) - (5 * incorrectAnswers) + (2 * maxStreak) + 
    (2 * quickAnswers) - (2 * closeCalls) + (100 / (fastestAnswer + 1)) - (5 * slowestAnswer) + 
    (50 - (50 * (totalTime / (numberOfFlags * timeGiven))));

    // Allow the user to store data again.
    localStorage.removeItem('dataStored');

    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("incorrectAnswers", incorrectAnswers);
    localStorage.setItem("streak", currentStreak);
    localStorage.setItem("maxStreak", maxStreak);
    localStorage.setItem("correctAnswersPercentage", correctAnswersPercentage.toFixed(2));
    localStorage.setItem("resultsMessage", resultsMessage);
    localStorage.setItem("quickAnswers", quickAnswers);
    localStorage.setItem("closeCalls", closeCalls);
    localStorage.setItem("fastestAnswer", fastestAnswer.toFixed(2));
    localStorage.setItem("slowestAnswer", slowestAnswer.toFixed(2));
    localStorage.setItem("totalTime", totalTime.toFixed(2));
    localStorage.setItem("points", Math.round(points));
    window.location.href = "resultsTimed.html";
}

// Display the initial flag and options when the page loads
window.onload = displayFlagAndOptions;
