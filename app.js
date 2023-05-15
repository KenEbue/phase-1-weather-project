const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const weatherResult = document.querySelector('#weather-result');
const tempToggle = document.querySelector('#temp-toggle');

let isCelsius = false;

// The portion of the site that displays the weather

function displayWeather(city, weather, temp, time) {
  let tempDisplay = parseFloat(temp);
  if (isCelsius) {
    tempDisplay = (tempDisplay - 32) * 5 / 9;
  }
  tempDisplay = tempDisplay.toFixed(1);
  const tempUnit = isCelsius ? "°C" : "°F";
  weatherResult.innerHTML = `<p>${city} is ${weather.trim()}</p><p>${tempDisplay} ${tempUnit}</p><p>${time.trim()}</p>`;
}

// Function fetching from the API

function fetchWeather(city) {
  const apiUrl = `https://wttr.in/${city}?format=%C,%t,%T`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      const [weather, temp, time] = data.split(',');
      displayWeather(city, weather, temp, time);
      tempToggle.textContent = `Toggle to °${isCelsius ? 'F' : 'C'}`;
    })
    .catch(error => {
      console.error('There was a problem fetching the weather data:', error);
      weatherResult.textContent = 'Sorry, there was a problem fetching the weather data.';
    });
}

// First event listener 'submit' to fulfill the goals

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city.length === 0) {
    return;
  }
  fetchWeather(city);
});

// Added a toggle button for Fahrenheit/Celsius. 2nd event listener used.

tempToggle.addEventListener('click', (e) => {
  isCelsius = !isCelsius;
  const tempUnit = isCelsius ? "°C" : "°F";
  tempToggle.textContent = `Toggle to ${isCelsius ? 'F' : 'C'}`;
  const tempText = weatherResult.querySelector("p:nth-child(2)");
  const [tempDisplay, tempUnitDisplay] = tempText.textContent.split(" ");
  const temp = isCelsius ? (tempDisplay - 32) * 5 / 9 : (tempDisplay * 9 / 5) + 32; // Fixed display
  tempText.textContent = `${temp.toFixed(1)} ${tempUnit}`;
});
