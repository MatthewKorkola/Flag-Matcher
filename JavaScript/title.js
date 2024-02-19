// Define continent-country map
var continentCountries = {
    "Europe": [
        "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia_and_Herzegovina", "Bulgaria", "Croatia",
        "Cyprus", "Czech_Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece",
        "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
        "Moldova", "Monaco", "Montenegro", "Netherlands", "North_Macedonia", "Norway", "Poland", "Portugal",
        "Romania", "Russia", "San_Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
        "Turkey", "Ukraine", "United_Kingdom", "Vatican_City"
    ],
    "Africa": [
        "Algeria", "Angola", "Benin", "Botswana", "Burkina_Faso", "Burundi", "Cameroon", "Cape_Verde",
        "Central_African_Republic", "Chad", "Comoros", "Democratic_Republic_of_the_Congo", "Republic_of_the_Congo",
        "Djibouti", "Egypt", "Equatorial_Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana",
        "Guinea", "Guinea-Bissau", "Ivory_Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
        "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
        "São_Tomé_and_Príncipe", "Senegal", "Seychelles", "Sierra_Leone", "Somalia", "South_Africa", "South_Sudan",
        "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
    ],
    "Asia": [
        "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China",
        "East_Timor", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait",
        "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North_Korea",
        "Oman", "Pakistan", "Philippines", "Qatar", "Saudi_Arabia", "Singapore", "South_Korea", "Sri_Lanka", "Syria",
        "Taiwan", "Tajikistan", "Thailand", "Turkmenistan", "United_Arab_Emirates", "Uzbekistan", "Vietnam", "Yemen"
    ],
    "AmericasAndOceania": [
        "Antigua_and_Barbuda", "Argentina", "Australia", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil",
        "Canada", "Chile", "Colombia", "Costa_Rica", "Cuba", "Dominica", "Dominican_Republic", "Ecuador",
        "El_Salvador", "Federated_States_of_Micronesia", "Fiji", "Grenada", "Guatemala", "Guyana", "Haiti",
        "Honduras", "Jamaica", "Kiribati", "Marshall_Islands", "Mexico", "Nauru", "New_Zealand", "Nicaragua",
        "Palau", "Panama", "Papua_New_Guinea", "Paraguay", "Peru", "Saint_Kitts_and_Nevis", "Saint_Lucia",
        "Saint_Vincent_and_the_Grenadines", "Samoa", "Solomon_Islands", "Suriname", "Tonga", "Trinidad_and_Tobago",
        "Tuvalu", "United_States", "Uruguay", "Vanuatu", "Venezuela"
    ]
};

var flagPosition = { top: '22%', left: '50%', transform: 'translate(-50%, -50%)' };

var flagWidth = 200; // Default flag width
var flagHeight = 120; // Default flag height

// Function to create a flag element with fade-in and fade-out effects, with resizing
function createFlag(country, position, width, height) {
    var flag = document.createElement('img');
    flag.classList.add('flag');
    flag.src = "Flags/Flag_of_" + country.replace(/\s/g, '_') + ".svg.png";
    flag.style.opacity = 0;
    flag.style.position = 'absolute';
    flag.style.top = position.top;
    flag.style.left = position.left;
    flag.style.transform = position.transform; // Center the flag

    if (country === "Vatican_City" || country === "Switzerland") {
        width = 120;
    } else {
        width = 200;
    }

    flag.style.width = width + 'px';
    flag.style.height = height + 'px';

    document.body.appendChild(flag);

    // Apply fade-in effect
    var opacity = 0;
    var fadeInInterval = setInterval(function () {
        opacity += 0.02; // Increment opacity gradually
        flag.style.opacity = opacity;
        if (opacity >= 1) {
            clearInterval(fadeInInterval); // Stop the interval when opacity reaches 1
            // Apply fade-out effect
            setTimeout(function () {
                var fadeOutInterval = setInterval(function () {
                    opacity -= 0.02; // Decrement opacity gradually
                    flag.style.opacity = opacity;
                    if (opacity <= 0) {
                        clearInterval(fadeOutInterval); // Stop the interval when opacity reaches 0
                        document.body.removeChild(flag); // Remove the flag element from the DOM
                        startFlagAnimations(); // Start the animation with a new flag
                    }
                }, 20);
            }, 2000); // Wait for 2 seconds before starting fade-out
        }
    }, 20); // Adjust fade-in speed
}

// Function to select a random country
function getRandomCountry() {
    var continents = Object.keys(continentCountries);
    var randomContinentIndex = Math.floor(Math.random() * continents.length);
    var continent = continents[randomContinentIndex];
    var countries = continentCountries[continent];
    var randomCountryIndex = Math.floor(Math.random() * countries.length);
    return countries[randomCountryIndex];
}

// Function to start the flag animations with resizing
function startFlagAnimations() {
    createFlag(getRandomCountry(), flagPosition, flagWidth, flagHeight); // Generate a single flag above the <h2> text
}

// Start flag animations
startFlagAnimations();
