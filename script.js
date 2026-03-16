const apiKey = "067795871cc2b406df79f8c434fc8d4b";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBtn = document.querySelector(".searchbtn");
const searchInput = document.getElementById("search");

searchBtn.addEventListener("click", () => {
  const city = searchInput.value.trim();
  if (city) fetchWeather(city);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
  }
});

async function fetchWeather(city) {
  try {
    const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod !== 200) {
      alert("City not found!");
      return;
    }


  document.querySelector(".card").style.display = "flex";
document.querySelector(".cardtwo").style.display = "flex";

    
    document.querySelector(".city-name").textContent = data.name.toUpperCase();
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidityvalue").textContent = `${data.main.humidity}%`;
    document.querySelector(".windspeedvalue").textContent = `${data.wind.speed} m/s`;
    document.querySelector("h5").innerHTML = `<span class="material-symbols-outlined">device_thermostat</span> feels like ${Math.round(data.main.feels_like)}°C`;

    
    const condition = data.weather[0].main;
    const now = Date.now() / 1000;
    const isNight = now < data.sys.sunrise || now > data.sys.sunset;

    changeBackground(condition, isNight);

  } catch (err) {
    alert("Something went wrong!");
  }
}

function changeBackground(condition, isNight) {
  let bg = "";

  if (condition === "Clear") {
    bg = isNight ? "url(img/night.jpg)" : "url(img/clearsky.jpg)";
  } else if (condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm") {
    bg = isNight ? "url(img/rainnight.jpg)" : "url(img/rain.jpg)";
  } else if (condition === "Snow") {
    bg = isNight ? "url(img/snownight.jpg)" : "url(img/snow.jpg)";
  } else if (condition === "Clouds") {
    bg = isNight ? "url(img/cloudynight.jpg)" : "url(img/cloudy.jpg)";
  } else {
    bg = isNight ? "url(img/night.jpg)" : "url(img/clearsky.jpg)";
  }

  document.body.style.backgroundImage = bg;
}