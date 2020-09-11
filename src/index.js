function formatDate(timestamp) {
  let date = new Date(timestamp);
  return `${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "00f59b8f2bccd0db3d87558a2dc2abfa";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value;
  search(city);
}
let formButton = document.querySelector("#search-form");
formButton.addEventListener("click", handleSubmit);

function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector(".now-temp").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document
    .querySelector("#description-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document.querySelector(".time").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2">
              <h4>
              ${formatHours(forecast.dt * 1000)}
              </h4>
              <img src ="http://openweathermap.org/img/wn/${
                forecast.weather[0].icon
              }@2x.png" id="forecast-icon" /> 
              <div class="forecast-text">
                   ${Math.round(forecast.main.temp_min)}°/ 
                   <strong>
                   ${Math.round(forecast.main.temp_max)}°
                   </strong>
             </div>
        </div>
        `;
  }
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector(".now-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );
}
function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector(".now-temp").innerHTML = Math.round(
    celsiusTemperature
  );
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
search("London");
