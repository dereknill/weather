// References
const buttonSearch = document.querySelector(".button-search");
const inputLocation = document.querySelector(".input-location");
const weatherDataDiv = document.querySelector(".section-stats");

// Global Variables
const apiKey = "8940deef2b061764b69b6f3d91287d7e";

function getWeatherData(location) {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`,
    { mode: "cors" }
  )
    .then((response) => {
      response.json().then((weatherData) => {
        return weatherData;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayWeatherData(weatherData) {}

// Event Handlers

function buttonSearchHandler() {
  const weatherData = getWeatherData(inputLocation.value);
  displayWeatherData(weatherData);
}

// Wire Event Listeners
buttonSearch.addEventListener("click", buttonSearchHandler);
