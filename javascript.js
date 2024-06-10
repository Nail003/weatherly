// Load DOM elements
const searchForm = document.getElementsByClassName("search-form")[0]
const weatherLocation = document.getElementsByClassName("weather-container__location")[0]
const [tempCelcius, tempFahrenheit] = document.getElementsByClassName("weather-container__temperature")

// Add Event Listeners for search form
searchForm.addEventListener("submit", handleSearchFormSubmit(getWeather))

// Get the defualt weather
showWeather()

function handleSearchFormSubmit() {
    // Gets the user search result
    // Gets the weather for provided input
    // Shows the input
    return async (e) => {
        // Prevent form submission
        e.preventDefault()

        // Get the user input
        const inputs = e.target.getElementsByTagName("input")
        const search = inputs["search"].value

        // Show the searched city weather
        showWeather(search)
    }
}

async function showWeather(city) {
    // Request the city data
    const weatherData = await getWeather(city)

    // Render received data
    renderWeatherData(weatherData)
}

async function getWeather(city = "Islamabad") {
    // Return the current weather of the provided city
    // The city name should be valid

    // Start Loading Screen
    renderLoadingScreen()

    try {
        // Request weather
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=b6bb1af7a7b04a32892162615240906&q=${city}`, { mode: "cors" })
        response = await response.json()

        // Extract Data
        const { country, name } = response.location
        const { temp_c, temp_f } = response.current

        // Process Data
        const location = getLocation(country, name)

        // Return weather data
        return { location, tempC: temp_c, tempF: temp_f }
    } catch (e) {
        // Error handler
        console.log(Error(e));
    }
}

function getLocation(country, city) {
    // Return formated "city, country" string
    return `${city}, ${country}`
}

function renderWeatherData({ location, tempC, tempF }) {
    weatherLocation.textContent = location
    tempCelcius.innerHTML = `${tempC}&degC`
    tempFahrenheit.innerHTML = `${tempF}&degF`
}

function renderLoadingScreen() {
    const loadingMessage = "Loading"
    const loadingMessageSmall = "..."
    weatherLocation.textContent = loadingMessage
    tempCelcius.innerHTML = loadingMessageSmall
    tempFahrenheit.innerHTML = loadingMessageSmall
}