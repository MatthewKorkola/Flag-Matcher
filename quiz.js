// Arrays to store country names
var countriesEurope = [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia_and_Herzegovina",
    "Bulgaria",
    "Croatia",
    "Cyprus",
    "the_Czech_Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Ireland",
    "Italy",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Moldova",
    "Monaco",
    "Montenegro",
    "the_Netherlands",
    "North_Macedonia",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russia",
    "San_Marino",
    "Serbia",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "the_United_Kingdom",
    "Vatican_City"
];

var countriesAfrica = [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina_Faso",
    "Burundi",
    "Cameroon",
    "Cape_Verde",
    "the_Central_African_Republic",
    "Chad",
    "the_Comoros",
    "the_Democratic_Republic_of_the_Congo",
    "the_Republic_of_the_Congo",
    "Djibouti",
    "Egypt",
    "Equatorial_Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "The_Gambia",
    "Ghana",
    "Guinea",
    "Guinea-Bissau",
    "Ivory_Coast",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "São_Tomé_and_Príncipe",
    "Senegal",
    "Seychelles",
    "Sierra_Leone",
    "Somalia",
    "South_Africa",
    "South_Sudan",
    "Sudan",
    "Tanzania",
    "Togo",
    "Tunisia",
    "Uganda",
    "Zambia",
    "Zimbabwe"
];


var countriesAsia = [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "East_Timor",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Israel",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Lebanon",
    "Malaysia",
    "Maldives",
    "Mongolia",
    "Myanmar",
    "Nepal",
    "North_Korea",
    "Oman",
    "Pakistan",
    "the_Philippines",
    "Qatar",
    "Saudi_Arabia",
    "Singapore",
    "South_Korea",
    "Sri_Lanka",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Thailand",
    "Turkmenistan",
    "the_United_Arab_Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen"
];

var countriesAmericasAndOceania = [
    "Antigua_and_Barbuda",
    "Argentina",
    "Australia",
    "the_Bahamas",
    "Barbados",
    "Belize",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa_Rica",
    "Cuba",
    "Dominica",
    "the_Dominican_Republic",
    "Ecuador",
    "El_Salvador",
    "the_Federated_States_of_Micronesia",
    "Fiji",
    "Grenada",
    "Guatemala",
    "Guyana",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Kiribati",
    "the_Marshall_Islands",
    "Mexico",
    "Nauru",
    "New_Zealand",
    "Nicaragua",
    "Palau",
    "Panama",
    "Papua_New_Guinea",
    "Paraguay",
    "Peru",
    "Saint_Kitts_and_Nevis",
    "Saint_Lucia",
    "Saint_Vincent_and_the_Grenadines",
    "Samoa",
    "the_Solomon_Islands",
    "Suriname",
    "Tonga",
    "Trinidad_and_Tobago",
    "Tuvalu",
    "the_United_States",
    "Uruguay",
    "Vanuatu",
    "Venezuela"
];


// Choose countries array based on selected region
var countries;

var region = localStorage.getItem('region');

if (region === 'Europe') {
    countries = countriesEurope;
} 
else if (region === 'Asia') {
    countries = countriesAsia;
}
else if (region === "Africa") {
    countries = countriesAfrica;
}
else if (region === "The Americas and Oceania") {
    countries = countriesAmericasAndOceania;
}
else {
    // Handle invalid selection
    console.error("Invalid region selection!");
    countries = [];
}

// Array to store the original options pool
var optionsPool = [...countries];

// Variable to keep track of the current flag number
var currentFlagNumber = 0;

var correctAnswers = 0;

var incorrectAnswers = 0;

var currentStreak = 0;

var maxStreak = 0;

var answerSelected = false;

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
        // All flags have been seen, return to the main menu
        redirectToResults();
        return;
    }

    enableOptionButtons();
    answerSelected = false;

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
    if (!answerSelected) { // Check if an answer has already been selected
        answerSelected = true; // Set flag to true once an answer is selected
        // Disable option buttons
        disableOptionButtons();

        if (isCorrect) {
            correctAnswers++;
            var correctElement = document.getElementById("correct");
            correctElement.textContent = "Correct Answers: " + correctAnswers;
            currentStreak++;
            var streakElement = document.getElementById("streak");
            streakElement.textContent = "Streak: " + currentStreak;
            if (currentStreak >= maxStreak) {
                maxStreak = currentStreak
            }
            displayMessage("Correct!", 1000);
            setTimeout(displayFlagAndOptions, 1000);
        } else {
            incorrectAnswers++
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
    localStorage.setItem("correctAnswersPercentage", correctAnswersPercentage.toFixed(2));
    localStorage.setItem("resultsMessage", resultsMessage);
    window.location.href = "results.html";
}

// Display the initial flag and options when the page loads
window.onload = displayFlagAndOptions;
