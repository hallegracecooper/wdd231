const apiKey = '58a4a7799339ff3586b8f50c73cd7e3e';

document.addEventListener('DOMContentLoaded', function() {
    fetchLocationInformation('american falls');
});

function fetchLocationInformation(cityName) {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
    fetch(cityUrl)
    .then(response => response.json())
    .then(data => {
        const americanFalls = data.find(item => item.state === 'Idaho');
        if (americanFalls) {
            const lat = americanFalls.lat;
            const lon = americanFalls.lon;
            fetchCurrentWeather(lat, lon);
            fetchThreeDayForecast(lat, lon);
        } else {
            console.error('American Falls not found in the location data.');
        }
    })
    .catch(error => {
        console.error('Error fetching location data:', error);
    });
}

function fetchCurrentWeather(lat, lon) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayCurrentWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
    });
}

function displayCurrentWeather(data) {
    let weatherDescription = data.weather.map(item => item.description).join(', ');
    weatherDescription = weatherDescription.replace(/\b\w/g, char => char.toUpperCase());

    const temperature = Math.round(data.main.temp);

    document.getElementById('weather-description').textContent = weatherDescription;
    document.getElementById('current-temperature').textContent = `${temperature}°F`;
}


function fetchThreeDayForecast(lat, lon) {
    const threeDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(threeDayForecastUrl)
    .then(response => response.json())
    .then(data => {
        displayThreeDayForeCast(data);
    })
    .catch(error => {
        console.error('Error fetching 3-day forecast data:', error);
    });
}

function displayThreeDayForeCast(data) {
    const forecast = [
        createForecastObject(data.list[0]),
        createForecastObject(data.list[8]),
        createForecastObject(data.list[16])
    ]

    forecast.forEach((forecastItem, index) => {
        document.getElementById(`forecast-day-${index + 1}`).textContent = `${forecastItem.date} (${forecastItem.day}) `;
        document.getElementById(`forecast-feels-like-${index + 1}`).textContent = `Feels Like: ${forecastItem.feelsLike}°F`
        document.getElementById(`forecast-temp-${index + 1}`).textContent = `Avg: ${forecastItem.temp}°F`
        document.getElementById(`forecast-high-${index + 1}`).textContent = `High: ${forecastItem.high}°F`
        document.getElementById(`forecast-low-${index + 1}`).textContent = `Low: ${forecastItem.low}°F`
        document.getElementById(`forecast-humidity-${index + 1}`).textContent = `Humidity: ${forecastItem.humidity}%`
    });
}

function createForecastObject(weatherObjData) {
    const dateDay = convertDateTimeToObject(weatherObjData.dt_txt);
    console.log(dateDay);
    const weather = weatherObjData.main
    return weatherObj = {
        day: dateDay.day,
        date: dateDay.shortDate,
        temp: Math.round(weather.temp),
        feelsLike: Math.round(weather.feels_like),
        high: Math.round(weather.temp_max),
        low: Math.round(weather.temp_min),
        humidity: Math.round(weather.humidity)
    }
}

function convertDateTimeToObject(dt_txt) {
    const date = new Date(dt_txt);
    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
    const shortDate = date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
    return { day, shortDate };
}

fetch('data/members.json')
    .then(response => response.json())
    .then(members => {
        console.log(members);
        displaySpotlight(members);
    })
    .catch(error => {
        console.error('Error fetching members data:', error);
    });

function displaySpotlight(members) {
    const spotlightMembers = members.filter(member => member.membership === 1 || member.membership === 2);

    const randomSpotlights = getRandomMembers(spotlightMembers, 3);

    randomSpotlights.forEach((member, index) => {
        const spotlightContainer = document.getElementById('spotlight-members');

        const card = document.createElement('div');
        card.classList.add('member-card');
        

        const image = document.createElement('img');
        image.src = member.image;
        image.alt = `${member.name} logo`;
        card.appendChild(image);

        const name = document.createElement('h3');
        name.textContent = member.name;
        card.appendChild(name);

        const address = document.createElement('p');
        address.textContent = `Address: ${member.address}`;
        card.appendChild(address);

        const phone = document.createElement('p');
        phone.textContent = `Phone: ${member.phone}`;
        card.appendChild(phone);

        const website = document.createElement('p');
        website.innerHTML = `Website: <a href="${member.website}" target="_blank">${member.website}</a>`;
        card.appendChild(website);

        const membership = document.createElement('p');
        membership.textContent = `Membership Level: ${member.membership === 1 ? 'Gold' : 'Silver'}`;
        card.appendChild(membership);

        spotlightContainer.appendChild(card);
    });
}

function getRandomMembers(members, num) {
    const shuffled = members.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}
