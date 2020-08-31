function formatTime(time) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let now = new Date();
let currentTime = document.querySelector(".time");
currentTime.innerHTML = formatTime(now);
let currentDate = document.querySelector(".date");
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
currentDate.innerHTML = `${day} ${month} ${date}`;

function search(city) {
  let apiKey = "00f59b8f2bccd0db3d87558a2dc2abfa";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
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
  document.querySelector(".now-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
search("London");

function showPosition(position) {
  let apiKey = "00f59b8f2bccd0db3d87558a2dc2abfa";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  let h6 = document.querySelector("h6");
  h6.innerHTML = `The latitude is ${latitude} and the longitude is ${longitude}`;
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector(".geolocation");
currentLocationButton.addEventListener("click", getCurrentPosition);
