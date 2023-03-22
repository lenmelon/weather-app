let now = new Date();
let hour = now.getHours();
if (hour < 10) hour = `0${hour}`;
let minutes = now.getMinutes();
if (minutes < 10) minutes = `0${minutes}`;
let date = now.getDate();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes} h`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let city = searchInput.value;
  let key = "2980ff43226d67e53abfcdb6d457dcc8";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(url).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#temp-number");
  degrees.innerHTML = `${temperature}`;

  let precipitation = response.data.clouds.all;
  let rainPercentage = document.querySelector("#precipitation");
  rainPercentage.innerHTML = `${precipitation}%`;

  let humidity = response.data.main.humidity;
  let humidityPercentage = document.querySelector("#humidity");
  humidityPercentage.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind} km/h`;

  let description = response.data.weather[0].description;
  let currentWeather = document.querySelector("#weather-description");
  currentWeather.innerHTML = `${description}`;
}
