const cherche = document.getElementById("cherche");
const temperature = document.getElementById("temperature");
const header = document.getElementById("header");
const icon = document.getElementById("icon");
const iconExplain = document.getElementById("icon-explain");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const fahrenheit = document.getElementById("fahrenheit");
const iconSearch = document.getElementById("icon-search")
const urlApi = 'https://community-open-weather-map.p.rapidapi.com/weather?q=';
const apiKey = '1db2a95b93d860c1ad3f5ae9cf71ff1f';
const weatherQuery = cherche.value;
const weatherCard= document.getElementById("weather-card");



const displayWeather = (data) => {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.getElementById('header').innerText = `Weather in ${name}`;
    document.getElementById('temperature').innerText = Math.floor(temp) +'°C';
    document.getElementById('icon').src = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
    document.getElementById('description').innerText = description;
    document.getElementById('humidity').innerText = `humidity: ${humidity}%`;
    document.getElementById('wind').innerText = `wind: ${speed}km/h`;

    weatherCard.classList.remove("loading");
}

const weather = {
    fetchWeather(city) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => displayWeather(data))
        .catch(err => alert('Wrong city name!'));
    }
}
const switchTofahrenheit = () => {
    if(temperature.innerText.includes('C')) {
        fahrenheit.innerText = 'Celsius';
        temperature.innerText = temperature.innerText.replace('°C', '');
        temperature.innerText = Number(temperature.innerText) * 9/5 + 32 + ' °F';
    } else if(temperature.innerText.includes('F')) {
        fahrenheit.innerText = 'Fahrenheit';        
        temperature.innerText = temperature.innerText.replace('°F', '');
        temperature.innerText = Math.floor((Number(temperature.innerText) - 32) * 5/9) + ' °C';}
    }

fahrenheit.addEventListener("click", switchTofahrenheit);
iconSearch.addEventListener("click", () => {
    weather.fetchWeather(cherche.value);
})
cherche.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
    weather.fetchWeather(cherche.value);
    }
  });

