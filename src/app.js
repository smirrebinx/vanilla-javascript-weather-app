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
function convertToFahrenheit(event) {
  event.preventDefault();
  let degreeElement = document.querySelector("#degrees-top");
  let fahrenheitDegree = (celsiusDegree * 9) / 5 + 32;
  degreeElement.innerHTML = Math.round(fahrenheitDegree);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let degreeElement = document.querySelector("#degrees-top");
  degreeElement.innerHTML = Math.round(celsiusDegree);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusDegree = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
fahrenheitLink.addEventListener("click", convertToCelsius);

//Weather API
/*function searchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city");
  searchCity(searchCityInput.value);
}*/

function searchCity(searchCityInput) {
  let units = "metric";
  let apiKey = "f74f9f2338bf06af72a7c11d8921c9c0";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${searchCityInput}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city");
  searchCity(searchCityInput.value);
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", searchSubmit);

function updateTemp(newTemp) {
  let showtmp = document.querySelector("#degrees-top");
  showtmp.innerHTML = newTemp;
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = response.data.name;
  let icon = document.querySelector("#icon");
  /*let img = document.querySelector("#weather-img");*/
  updateTemp(`${temperature}`);

  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  //if else depending on description
  /*img.setAttribute("src", `img/rain.png`);
  img.setAttribute("src", `img/clear.png`);
  img.setAttribute("src", `img/snow.png`);
  img.setAttribute("alt", response.data.weather[0].description);*/

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}
searchCity("Malmo");
