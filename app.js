const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const weatherResult = document.querySelector('#weather-result');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = searchInput.value.trim();
  if (city.length === 0) {
    return;
  }
  const apiUrl = `https://wttr.in/${city}?format=%C\n%t\n%T\n`;
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      console.log(data);
      weatherResult.innerHTML = `<pre>${data}</pre>`;
    })
    .catch(error => {
      console.error('There was a problem fetching the weather data:', error);
      weatherResult.textContent = 'Sorry, there was a problem fetching the weather data.';
    });
});
