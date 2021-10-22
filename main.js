const api = {
  key: "866e08820c36308085c3d495bbbdc4c5",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  if (weather.cod == '404') {
    let err = document.querySelector('.err');
    err.style.display = 'block';
    let mar = document.querySelector('#mar');
    mar.style.display = 'block';
  }

  else {
    let err = document.querySelector('.err');
    err.style.display = 'none';
    let mar = document.querySelector('#mar');
    mar.style.display = 'none';

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let lon = document.querySelector('.location .lonlan');
    lon.innerText = `Location : ${Math.round(weather.coord.lat).toFixed(1)}°N/ ${Math.round(weather.coord.lon).toFixed(1)}°S`;

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${weather.main.temp_min}°c / ${weather.main.temp_max}°c`;

    let feel = document.querySelector('.feel');
    feel.innerText = `Feels_like ${weather.main.feels_like}°c `;
  }
}


function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

setInterval(updateTime, 1000);

function updateTime() {
  time.innerHTML = new Date();
}



