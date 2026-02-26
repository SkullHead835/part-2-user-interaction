const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const messageDiv = document.getElementById("message");

async function getWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        showLoading();
        searchBtn.disabled = true;

        const response = await axios.get(apiURL);
        const data = response.data;

        document.getElementById("city-name").textContent = data.name;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;

        const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather-icon").src = iconURL;

        messageDiv.innerHTML = "";
    } catch (error) {
        showError("City not found. Please enter a valid city name.");
    } finally {
        searchBtn.disabled = false;
    }
}

function showError(message) {
    messageDiv.innerHTML = `<p class="error">${message}</p>`;
}

function showLoading() {
    messageDiv.innerHTML = `<p class="loading">Loading...</p>`;
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    getWeather(city);
    cityInput.value = "";
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});
