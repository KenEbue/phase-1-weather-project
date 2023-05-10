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
      const temperature = `${weather.temp2m}°C`;
      const windSpeed = `${weather.wind10m.speed} m/s`;
      const description = weather.weather;
      const weatherString = `Temperature: ${temperature}, Wind speed: ${windSpeed}, Description: ${description}`;
      weatherResult.textContent = weatherString;
    })
    .catch(error => {
      console.error('There was a problem fetching the weather data:', error);
      weatherResult.textContent = 'Sorry, there was a problem fetching the weather data.';
    });
});
