//vanilla-weather-app netlify

//Show local time
let now = new Date();
let currentHours = String(now.getHours()).padStart(2, "0");
let currentMinutes = String(now.getMinutes()).padStart(2, "0");
let current = `${currentHours}:${currentMinutes}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function updateParagraph(newP) {
  let showLocalTime = document.querySelector("#local-time");
  showLocalTime.innerHTML = newP;
}

function localTime(now, days, current) {
  let currentDay = days[now.getDay()];
  let currentTime = current;
  updateParagraph(`${currentDay} ${currentTime}`);
}
localTime(now, days, current);

//Change unit, not done
/*function convertToFahrenheit(event) {
  event.preventDefault();
  let degreeElement = document.querySelector("#degrees-top");
  let degree = degreeElement.innerHTML;
  degree = Number(degree);
  //degreeElement.innerHTML = 66;
  degreeElement.innerHTML = Math.round((degree * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let degreeElement = document.querySelector("#degrees-top");
  degree = Number(degree);
  //degreeElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);*/

//Weather API
function searchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city");
  searchCity(searchCityInput.value);
}

function searchCity(searchCityInput) {
  //let lat = position.coords.latitude;
  //let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "f74f9f2338bf06af72a7c11d8921c9c0";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${searchCityInput}&appid=${apiKey}&units=${units}`;
  //let apiUrl = `${apiEndpoint}q=${searchCityInput}&lat${lat}&lon${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", searchSubmit);

function updateTemp(newTemp) {
  let showTemp = document.querySelector("#degrees-top");
  showTemp.innerHTML = newTemp;
}

function showWeather(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = response.data.name;
  if (temperature > 0) {
    updateTemp(`☀️ ${temperature}`);
  } else {
    updateTemp(`🌨️${temperature}`);
  }

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
searchCity("Stockholm");
