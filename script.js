let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('city').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      getWeather();
    }
  });
  
  updateRecentSearches();
});

async function getWeather() {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }
  
  document.getElementById("weather-result").innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
    </div>
  `;
  document.getElementById("weather-result").classList.remove("weather-hidden");
  
  const apiKey = "b1aa9b28656d4b50a5854737251305";
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      showError(data.error.message || "City not found. Please check the spelling.");
      return;
    }

    const location = data.location.name;
    const country = data.location.country;
    const localTime = new Date(data.location.localtime).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const temp = Math.round(data.current.temp_c);
    const condition = data.current.condition.text;
    const conditionCode = data.current.condition.code;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const iconUrl = data.current.condition.icon;
    const feelsLike = Math.round(data.current.feelslike_c);
    const uvIndex = data.current.uv;
    const isDay = data.current.is_day;
    
    setDynamicBackground(conditionCode, isDay);

    addToRecentSearches(location);

    const weatherResult = document.getElementById("weather-result");
    weatherResult.innerHTML = `
      <div class="weather-card">
        <div class="weather-location">
          <h2>${location}</h2>
          <span>${country}</span>
        </div>
        
        <div class="weather-time">
          Local time: ${localTime}
        </div>
        
        <div class="weather-icon">
          <img src="${iconUrl}" alt="${condition}">
        </div>
        
        <div class="weather-temp">${temp}°C</div>
        <div class="weather-condition">${condition}</div>
        
        <div class="weather-details">
          <div class="weather-detail">
            <div class="value">${feelsLike}°C</div>
            <div class="label">Feels Like</div>
          </div>
          
          <div class="weather-detail">
            <div class="value">${humidity}%</div>
            <div class="label">Humidity</div>
          </div>
          
          <div class="weather-detail">
            <div class="value">${wind} km/h</div>
            <div class="label">Wind</div>
          </div>
          
          <div class="weather-detail">
            <div class="value">${uvIndex}</div>
            <div class="label">UV Index</div>
          </div>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Weather API Error:", error);
    showError("Failed to fetch weather data. Please try again.");
  }
}

function setDynamicBackground(conditionCode, isDay) {
  let backgroundClass = '';

  if ([1000].includes(conditionCode)) {
    backgroundClass = isDay ? 'bg-clear-day' : 'bg-clear-night';
  } 
  else if ([1003].includes(conditionCode)) {
    backgroundClass = isDay ? 'bg-partly-cloudy-day' : 'bg-partly-cloudy-night';
  }
  else if ([1006, 1009].includes(conditionCode)) {
    backgroundClass = 'bg-cloudy';
  }
  else if ([1030, 1135, 1147].includes(conditionCode)) {
    backgroundClass = 'bg-fog';
  }
  else if ([1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246].includes(conditionCode)) {
    backgroundClass = 'bg-rain';
  }
  else if ([1087, 1273, 1276, 1279, 1282].includes(conditionCode)) {
    backgroundClass = 'bg-thunderstorm';
  }
  else if ([1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1261, 1264].includes(conditionCode)) {
    backgroundClass = 'bg-snow';
  }
  else {
    backgroundClass = isDay ? 'bg-default-day' : 'bg-default-night';
  }
  document.body.classList.remove(
    'bg-clear-day', 'bg-clear-night', 'bg-partly-cloudy-day', 
    'bg-partly-cloudy-night', 'bg-cloudy', 'bg-fog', 'bg-rain',
    'bg-thunderstorm', 'bg-snow', 'bg-default-day', 'bg-default-night'
  );

  document.body.classList.add(backgroundClass);
}

function showError(message) {
  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-circle"></i> 
      ${message}
    </div>
  `;
  weatherResult.classList.remove("weather-hidden");
}

function addToRecentSearches(city) {
  recentSearches = recentSearches.filter(item => item !== city);

  recentSearches.unshift(city);

  if (recentSearches.length > 5) {
    recentSearches = recentSearches.slice(0, 5);
  }

  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

  updateRecentSearches();
}

function updateRecentSearches() {
  const recentList = document.getElementById("recent-list");
  
  if (recentSearches.length === 0) {
    document.getElementById("recent-searches").style.display = "none";
    return;
  }
  
  document.getElementById("recent-searches").style.display = "block";
  recentList.innerHTML = "";
  
  recentSearches.forEach(city => {
    const cityEl = document.createElement("div");
    cityEl.className = "recent-item";
    cityEl.textContent = city;
    cityEl.addEventListener("click", () => {
      document.getElementById("city").value = city;
      getWeather();
    });
    recentList.appendChild(cityEl);
  });
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("city").value = `${lat},${lon}`;
      getWeather();
    }, error => {
      console.error("Geolocation error:", error);
      showError("Unable to get your location. Please search manually.");
    });
  } else {
    showError("Geolocation is not supported by your browser.");
  }
}

function showError(message) {
  const weatherResult = document.getElementById("weather-result");
  weatherResult.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-circle"></i> 
      ${message}
    </div>
  `;
  weatherResult.classList.remove("weather-hidden");
}

function addToRecentSearches(city) {
  recentSearches = recentSearches.filter(item => item !== city);
  
  recentSearches.unshift(city);
  
  if (recentSearches.length > 5) {
    recentSearches = recentSearches.slice(0, 5);
  }
  
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));

  updateRecentSearches();
}

function updateRecentSearches() {
  const recentList = document.getElementById("recent-list");
  
  if (recentSearches.length === 0) {
    document.getElementById("recent-searches").style.display = "none";
    return;
  }
  
  document.getElementById("recent-searches").style.display = "block";
  recentList.innerHTML = "";
  
  recentSearches.forEach(city => {
    const cityEl = document.createElement("div");
    cityEl.className = "recent-item";
    cityEl.textContent = city;
    cityEl.addEventListener("click", () => {
      document.getElementById("city").value = city;
      getWeather();
    });
    recentList.appendChild(cityEl);
  });
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      document.getElementById("city").value = `${lat},${lon}`;
      getWeather();
    }, error => {
      console.error("Geolocation error:", error);
      showError("Unable to get your location. Please search manually.");
    });
  } else {
    showError("Geolocation is not supported by your browser.");
  }
}