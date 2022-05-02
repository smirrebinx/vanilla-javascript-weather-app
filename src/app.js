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
  let fahrenheitDegree = document.querySelector("#currentDegree");
  let fahrenheit = Math.round((celsiusDegree * 9) / 5 + 32);
  fahrenheitDegree.innerHTML = `${fahrenheit}`;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#currentDegree");
  currentDegree.innerHTML = `${Math.round(celsiusDegree)}`;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let celsiusDegree = null;

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
  let showtmp = document.querySelector("#currentDegree");
  showtmp.innerHTML = newTemp;
}

function showForecast() {
  //let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `    
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img src="https://openweathermap.org/img/wn/50d@2x.png" 
            alt=""
            width="42" />
            <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">6°</span> 
            <span class="weather-forecast-temperature-min">2°</span></div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showWeather(response) {
  celsiusDegree = Math.round(response.data.main.temp);
  let cityHeading = document.querySelector("#city-heading");
  cityHeading.innerHTML = response.data.name;
  let icon = document.querySelector("#icon");
  /*let img = document.querySelector("#weather-img");*/
  updateTemp(`${celsiusDegree}`);

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
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);

  /*if (description === "Clear sky") {
    (document.querySelector("#weather-img").innerHTML = "src"), `img/clear.png`;
  }*/
}
searchCity("Malmo");
showForecast();
