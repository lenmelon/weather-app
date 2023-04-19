function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let city = searchInput.value;
  let key = "a8d8b06f3c747033oa766c71fbfca38t";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;

  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let degrees = document.querySelector("#temp-number");
  degrees.innerHTML = `${temperature}`;

  let city = response.data.city;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;

  let humidity = response.data.temperature.humidity;
  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} km/h`;

  let description = response.data.condition.description;
  let currentWeather = document.querySelector("#weather-description");
  currentWeather.innerHTML = `${description}`;

  let dateElement = document.querySelector("#current-date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
