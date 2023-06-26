function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let tempElement = document.querySelector("#temperature");

function fahrenheitfunction(event) {
  event.preventDefault();
  let celsiusTemp = tempElement.textContent;
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  tempElement.textContent = fahrenheitTemp;
}
fahrenheitLink.addEventListener("click", fahrenheitfunction);

function celsiusfunction(event) {
  event.preventDefault();
  let fahrenheitTemp = tempElement.textContent;
  let celsiusTemp = Math.round((fahrenheitTemp - 32) / 1.8);
  tempElement.textContent = celsiusTemp;
}
celsiusLink.addEventListener("click", celsiusfunction);

// Feature #1
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Feature #2
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElt = document.querySelector("#humidity");
  humidityElt.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;

  let descriptionElt = document.querySelector("#description");
  descriptionElt.innerHTML = response.data.weather[0].description;

  let precipiationElt = document.querySelector("#precipitation");
  precipiationElt.innerHTML = `Precipiation: ${response.data.clouds.all}%`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentTemperature);
}

function showCurrentTemperature(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "e0a5a97de9a0b7a951e9d154a8f9bad8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    showWeather(response);
  });
}
