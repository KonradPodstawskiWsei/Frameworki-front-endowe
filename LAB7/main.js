const placesKey = 'places';
let places = JSON.parse(localStorage.getItem(placesKey)) || [];

const API_KEY = "dd7e95d71728f3b01b77809355e04259";
const TIME_TO_CACHE_UPDATE = 5 * 60 * 1000;
const MAX_RECORDS = 10;

function savePlaces() {
    localStorage.setItem(placesKey, JSON.stringify(places));
}

async function fetchWeatherForPlace(placeName) {
    const placeIndex = places.findIndex(place => place.name === placeName);
    const needsUpdate = placeIndex === -1 || Date.now() - places[placeIndex].lastUpdated > TIME_TO_CACHE_UPDATE;

    if (!needsUpdate) return;

    const encodedPlaceName = encodeURIComponent(placeName);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedPlaceName}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch weather data for ${placeName}`);
        const data = await response.json();

        const weatherData = {
            name: placeName,
            weather: {
                temp: data.main.temp,
                humidity: data.main.humidity,
                icon: data.weather[0].icon,
            },
            lastUpdated: Date.now()
        };

        if (placeIndex === -1) {
            places.push(weatherData);
        } else {
            places[placeIndex] = weatherData;
        }

        savePlaces();
        displayWeather();
    } catch (error) {
        console.error('Error fetching weather:', error.message);
    }
}

function addPlace() {
    const newCityName = document.getElementById('newCityInput').value.trim();
    if (newCityName && !places.some(place => place.name === newCityName)) {
        if (places.length >= MAX_RECORDS) {
            alert("Max cities limit reached.");

            return;
        }

        fetchWeatherForPlace(newCityName);
        document.getElementById('newCityInput').value = '';
    } else {
        alert("City name cannot be empty or already added.");
    }
}

function removePlace(placeName) {
    places = places.filter(place => place.name !== placeName);
    savePlaces();
    displayWeather();
}

function displayWeather() {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.innerHTML = '';
    
    places.forEach(({ name, weather, lastUpdated }) => {
        if (weather && lastUpdated) {
            const element = document.createElement('div');
            element.className = 'city';
            element.innerHTML = `
                <h3>${name}</h3>
                <p>Temperature: ${weather.temp}°C</p>
                <p>Humidity: ${weather.humidity}%</p>
                <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="Weather icon">
                <p>Last Updated: ${new Date(lastUpdated).toLocaleTimeString()}</p>
                <button onclick="removePlace('${name}')">Remove</button>
            `;
            weatherContainer.appendChild(element);
        }
    });
}

document.getElementById('addCityButton').addEventListener('click', addPlace);

setInterval(() => {
    places.forEach(place => fetchWeatherForPlace(place.name));
}, TIME_TO_CACHE_UPDATE);

document.addEventListener('DOMContentLoaded', () => {
    displayWeather();
});
