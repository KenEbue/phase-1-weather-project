const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const weatherResult = document.querySelector('#weather-result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city.length === 0) {
    return;
  }
  const apiUrl = `http://www.7timer.info/bin/civil.php?lon=&lat=&ac=0&unit=metric&output=json&tzshift=0&city=${city}`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.dataseries.length === 0) {
        throw new Error('No weather data available');
      }
      const weather = data.dataseries[0];
      const weatherString = `Temperature: ${weather.temp2m}°C, Wind speed: ${weather.wind10m}m/s, Description: ${weather.weather}`;
      weatherResult.textContent = weatherString;
    })
    .catch(error => {
      console.error('There was a problem fetching the weather data:', error);
      weatherResult.textContent = 'Sorry, there was a problem fetching the weather data.';
    });
});

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(JSON.stringify(data));
    // code to display temperature, wind speed, and description goes here
  });
