// References
const buttonSearch = document.querySelector(".button-search");
const inputLocation = document.querySelector(".input-location");
const weatherDataContainer = document.querySelector(".container");

// Global Variables
const apiKey = "8940deef2b061764b69b6f3d91287d7e";

function getWeatherData(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`,
    { mode: "cors" }
  )
    .then((response) => {
      response.json().then((weatherData) => {
        if (weatherData.cod == 404) {
          displayWarning();
        } else {
          console.log(weatherData);
          displayWeatherData(weatherData);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayWeatherData(weatherData) {
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let html = `<div class="section-stats">
  <div class="stats-title">
    <div class="city-info">
      <div class="city-name">${weatherData.name}</div>
      <div class="country-name">${days[date.getDay()]} ${
    weatherData.sys.country
  }</div>
    </div>
    <div class="weather-info">
      <div class="weather-icon"><img src="http://openweathermap.org/img/wn/${
        weatherData.weather[0].icon
      }.png"></div>
      <div class="weather-title">${weatherData.weather[0].description}</div>
    </div>
  </div>
  <div class="stats-info">
    <div class="temperature">${kelvinToF(weatherData.main.temp)}°</div>
    <div class="humidity-pressure">
      <div>Humidity: ${weatherData.main.humidity}%</div>
      <div>Pressure: ${weatherData.main.pressure} mb</div>
    </div>
  </div>
  <div class="stats-description">
    <div class="weather-bottom">
      <div>Low: ${kelvinToF(weatherData.main.temp_min)}°</div>
      <div>High: ${kelvinToF(weatherData.main.temp_max)}°</div>
    </div>
    <div class="weather-bottom-sunset">
      <div>Sunrise: ${formatTime(
        weatherData.sys.sunrise,
        weatherData.timezone
      )}</div>
      <div>Sunset: ${formatTime(
        weatherData.sys.sunset,
        weatherData.timezone
      )}</div>
    </div>
  </div>
</div>`;

  weatherDataContainer.innerHTML = html;
}

function kelvinToF(degKelvin) {
  return Math.round((degKelvin - 273.15) * (9 / 5) + 32);
}

function formatTime(unixTime, offset) {
  let date = new Date((unixTime + offset) * 1000);

  let hours = date.getUTCHours();

  let minutes = date.getUTCMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 12) {
    minutes += " AM";
  } else if (hours == 12) {
    minutes += " PM";
  } else {
    hours -= 12;
    minutes += " PM";
  }

  return `${hours}:${minutes}`;
}

function displayWarning() {
  let html = `
  <div class="section-warning">
    <h1>Error: city not found</h1>
    <h2>
    Location must be in format:
    <br>
    "City"
    <br>
    "City, State"
    <br>
    "City, State, Country"
    </h2>
  </div>
  `;
  weatherDataContainer.innerHTML = html;
}
// Event Handlers

function buttonSearchHandler() {
  getWeatherData(inputLocation.value);
}

// Wire Event Listeners
buttonSearch.addEventListener("click", buttonSearchHandler);
document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    buttonSearchHandler();
  }
});
