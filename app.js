// Initialize and set Open Weather Map API to use
const api = {
  key: "cb6101d51c6937e84a559b423a17cfab",
  base: "https://api.openweathermap.org/data/2.5/",
};

// Assign the search box to a variable
const searchbox = document.querySelector(".search-box");

// Set an event listener for when key is pressed in search box
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  // Enter key is 13 keycode in JS
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  // Fetch request for API, attach query to weather from searchbox value
  // Set units to celsius and set app id to API
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      // Can now use the multiple properties from weather in the API
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  //Assign and replace the city with the name and country from API
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  //Assign and replace the date with the current date via static arrays
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  //Assign and replace the temperature element with the main temp from API; round to nearest integer
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  //Assign and replace the weather description element with the phrase from API
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  //Assign and replace the min and max temperatures elements using API; round to nearest integers
  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
