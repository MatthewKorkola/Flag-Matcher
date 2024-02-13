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
    "Czech_Republic",
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
    "Netherlands",
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
    "United_Kingdom",
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
    "Central_African_Republic",
    "Chad",
    "Comoros",
    "Democratic_Republic_of_the_Congo",
    "Republic_of_the_Congo",
    "Djibouti",
    "Egypt",
    "Equatorial_Guinea",
    "Eritrea",
    "Eswatini",
    "Ethiopia",
    "Gabon",
    "Gambia",
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
    "Philippines",
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
    "United_Arab_Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen"
];

var countriesAmericasAndOceania = [
    "Antigua_and_Barbuda",
    "Argentina",
    "Australia",
    "Bahamas",
    "Barbados",
    "Belize",
    "Bolivia",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa_Rica",
    "Cuba",
    "Dominica",
    "Dominican_Republic",
    "Ecuador",
    "El_Salvador",
    "Federated_States_of_Micronesia",
    "Fiji",
    "Grenada",
    "Guatemala",
    "Guyana",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Kiribati",
    "Marshall_Islands",
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
    "Solomon_Islands",
    "Suriname",
    "Tonga",
    "Trinidad_and_Tobago",
    "Tuvalu",
    "United_States",
    "Uruguay",
    "Vanuatu",
    "Venezuela"
];

// Merge all countries into one array and sort alphabetically
var allCountriesSorted = countriesEurope.concat(countriesAfrica, countriesAsia, countriesAmericasAndOceania).sort();

function showFlags() {
    var selectedRegion = document.getElementById("region").value;
    var countries;

    switch (selectedRegion) {
        case "Europe":
            countries = countriesEurope;
            break;
        case "Asia":
            countries = countriesAsia;
            break;
        case "Africa":
            countries = countriesAfrica;
            break;
        case "AmericasAndOceania":
            countries = countriesAmericasAndOceania;
            break;
        default:
            countries = allCountriesSorted;
            break;
    }

    var flagsContainer = document.getElementById("flags-container");
    flagsContainer.innerHTML = ""; // Clear previous content

    // Loop through countries and create flag elements
    countries.forEach(function(country) {
        var flagContainer = document.createElement("div");
        var flagElement = document.createElement("img");
        var captionElement = document.createElement("p");
        
        flagElement.src = "Flags/Flag_of_" + country + ".svg.png";
        flagElement.alt = country;
        
        captionElement.textContent = country.replace(/_/g, ' '); // Replace underscores with spaces
        
        flagContainer.appendChild(flagElement);
        flagContainer.appendChild(captionElement);
        
        flagsContainer.appendChild(flagContainer);
    });
}

// Initial call to display flags for the default selected region
showFlags();