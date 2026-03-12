// API Configuration
const API_CONFIG = {
    baseUrl: 'http://localhost:8080',
    endpoint: '/weather/forecast'
};

// DOM elements
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const daysSelect = document.getElementById('days');
const searchBtn = document.getElementById('searchBtn');
const weatherApp = document.getElementById('weatherApp');
const currentWeatherEl = document.getElementById('currentWeather');
const forecastDaysEl = document.getElementById('forecastDays');
const forecastTitle = document.getElementById('forecastTitle');
const backToSearchBtn = document.getElementById('backToSearch');
const refreshBtn = document.getElementById('refreshData');
const cityTags = document.querySelectorAll('.city-tag');

// Weather condition to icon mapping
const WEATHER_ICONS = {
    "Clear": "fas fa-sun",
    "Clouds": "fas fa-cloud",
    "Rain": "fas fa-cloud-rain",
    "Snow": "fas fa-snowflake",
    "Thunderstorm": "fas fa-bolt",
    "Drizzle": "fas fa-cloud-drizzle",
    "Mist": "fas fa-smog",
    "Fog": "fas fa-smog",
    "Haze": "fas fa-smog",
    "Smoke": "fas fa-smog",
    "Dust": "fas fa-smog",
    "Sand": "fas fa-smog",
    "Ash": "fas fa-smog",
    "Squall": "fas fa-wind",
    "Tornado": "fas fa-wind"
};

// Weather condition to background gradient mapping
const WEATHER_BACKGROUNDS = {
    "Clear": ["#FFD700", "#FF8C00"],
    "Clouds": ["#B0C4DE", "#778899"],
    "Rain": ["#4682B4", "#5F9EA0"],
    "Snow": ["#E6E6FA", "#B0E0E6"],
    "Thunderstorm": ["#4B0082", "#191970"],
    "Drizzle": ["#87CEEB", "#00BFFF"],
    "default": ["#1a2980", "#26d0ce"]
};

// Store current search parameters
let currentSearch = {
    city: '',
    days: 0
};

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', initializeApp);

// Main initialization function
function initializeApp() {
    // Load last searched city from localStorage if available
    const lastSearch = getLastSearch();
    if (lastSearch) {
        cityInput.value = lastSearch.city;
        daysSelect.value = lastSearch.days;
        currentSearch = lastSearch;
    }
    
    // Setup event listeners
    setupEventListeners();
}

// Setup all event listeners
function setupEventListeners() {
    // Form submission
    weatherForm.addEventListener('submit', handleFormSubmit);
    
    // Back to search button
    backToSearchBtn.addEventListener('click', showSearchSection);
    
    // Refresh button
    refreshBtn.addEventListener('click', () => {
        if (currentSearch.city && currentSearch.days) {
            fetchWeatherData(currentSearch.city, currentSearch.days);
        }
    });
    
    // Quick city tags
    cityTags.forEach(tag => {
        tag.addEventListener('click', () => {
            cityInput.value = tag.dataset.city;
            daysSelect.value = 3;
            handleFormSubmit(new Event('submit'));
        });
    });
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    const city = cityInput.value.trim();
    const days = parseInt(daysSelect.value);
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    // Store current search
    currentSearch = { city, days };
    
    // Save search to localStorage
    saveLastSearch(city, days);
    
    // Show weather section
    showWeatherSection();
    
    // Fetch weather data
    fetchWeatherData(city, days);
}

// Show search section
function showSearchSection() {
    weatherApp.style.display = 'none';
    document.querySelector('.search-section').style.display = 'flex';
    // Clear previous data
    clearWeatherData();
}

// Show weather section
function showWeatherSection() {
    document.querySelector('.search-section').style.display = 'none';
    weatherApp.style.display = 'flex';
}

// Clear previous weather data
function clearWeatherData() {
    currentWeatherEl.innerHTML = '';
    forecastDaysEl.innerHTML = '';
}

// Save last search to localStorage
function saveLastSearch(city, days) {
    localStorage.setItem('lastWeatherSearch', JSON.stringify({ city, days }));
}

// Get last search from localStorage
function getLastSearch() {
    const lastSearch = localStorage.getItem('lastWeatherSearch');
    return lastSearch ? JSON.parse(lastSearch) : null;
}

// Format date to readable string
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Get day name from date
function getDayName(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
}

// Get icon class based on weather condition
function getWeatherIcon(condition) {
    for (const key in WEATHER_ICONS) {
        if (condition.includes(key)) {
            return WEATHER_ICONS[key];
        }
    }
    return "fas fa-cloud";
}

// Update background based on weather condition
function updateBackground(condition) {
    let gradient = WEATHER_BACKGROUNDS.default;
    
    for (const key in WEATHER_BACKGROUNDS) {
        if (condition.includes(key)) {
            gradient = WEATHER_BACKGROUNDS[key];
            break;
        }
    }
    
    document.body.style.background = `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`;
}

// Show loading state
function showLoading() {
    currentWeatherEl.innerHTML = `
        <div class="loading">
            <i class="fas fa-sun"></i>
            <p>Loading weather data...</p>
        </div>
    `;
    
    forecastDaysEl.innerHTML = `
        <div class="loading">
            <i class="fas fa-cloud-sun"></i>
            <p>Loading forecast data...</p>
        </div>
    `;
    
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    searchBtn.disabled = true;
}

// Hide loading state
function hideLoading() {
    searchBtn.innerHTML = '<i class="fas fa-cloud-sun-rain"></i> Get Weather Forecast';
    searchBtn.disabled = false;
}

// Show error state
function showError(message) {
    currentWeatherEl.innerHTML = `
        <div class="error">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <p style="margin-top: 10px; font-size: 1rem;">Make sure your API is running at: ${API_CONFIG.baseUrl}</p>
        </div>
    `;
    
    forecastDaysEl.innerHTML = '';
    hideLoading();
}

// Validate API response data
function validateWeatherData(data, requestedDays) {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid API response: data is not an object');
    }
    
    if (!data.weather || typeof data.weather !== 'object') {
        throw new Error('Invalid API response: missing weather object');
    }
    
    if (!data.day_temp || !Array.isArray(data.day_temp)) {
        throw new Error('Invalid API response: day_temp is not an array');
    }
    
    // Check if we have at least the requested number of days
    if (data.day_temp.length < requestedDays) {
        console.warn(`API returned ${data.day_temp.length} days, but requested ${requestedDays}`);
    }
    
    // Validate each day's data
    data.day_temp.forEach((day, index) => {
        if (!day.day || !day.tempMax || !day.tempMin || !day.tempAvg) {
            throw new Error(`Invalid day data at index ${index}`);
        }
    });
    
    return true;
}

// Render current weather
function renderCurrentWeather(data, city, days) {
    const iconClass = getWeatherIcon(data.weather.condition);
    
    currentWeatherEl.innerHTML = `
        <div class="location-info">
            <h2>${data.weather.city}</h2>
            <p>${data.weather.country}</p>
            <p class="date-display">${formatDate(new Date().toISOString().split('T')[0])}</p>
        </div>
        <div class="temp-info">
            <div class="current-temp">${data.weather.temperature}</div>
            <div class="condition">
                <i class="${iconClass} weather-icon"></i>
                <span>${data.weather.condition}</span>
            </div>
        </div>
    `;
    
    // Update background based on weather condition
    updateBackground(data.weather.condition);
}

// Render forecast days - ONLY show the requested number of days
function renderForecastDays(data, city, days) {
    // Clear previous content
    forecastDaysEl.innerHTML = '';
    
    // Update forecast title
    forecastTitle.textContent = `${days}-Day Forecast for ${city}`;
    
    // Filter and validate temperature data
    const validDays = data.day_temp.filter(day => {
        // Validate temperatures are reasonable for the city
        // For Indian cities, temperatures should be between -10°C and 50°C
        const isTempReasonable = 
            day.tempMax > -10 && day.tempMax < 50 &&
            day.tempMin > -10 && day.tempMin < 50 &&
            day.tempAvg > -10 && day.tempAvg < 50;
        
        // Also check that tempMax >= tempMin
        const isTempOrderValid = day.tempMax >= day.tempMin;
        
        return isTempReasonable && isTempOrderValid;
    });
    
    // Only show the requested number of days (or less if API returns less valid days)
    const daysToShow = Math.min(days, validDays.length);
    
    if (daysToShow === 0) {
        forecastDaysEl.innerHTML = `
            <div class="error">
                <i class="fas fa-thermometer-empty"></i>
                <p>Invalid temperature data received from API</p>
                <p style="font-size: 1rem; margin-top: 10px;">Please check your API implementation</p>
            </div>
        `;
        return;
    }
    
    for (let i = 0; i < daysToShow; i++) {
        const day = validDays[i];
        const dayName = getDayName(day.day);
        const formattedDate = formatDate(day.day);
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="day-info">
                <h3>${dayName}</h3>
                <p>${formattedDate}</p>
                <p>Average: ${day.tempAvg.toFixed(1)}°C</p>
            </div>
            <div class="day-temps">
                <div>
                    <span class="temp-max">${day.tempMax.toFixed(1)}°C</span>
                    <span class="temp-min">${day.tempMin.toFixed(1)}°C</span>
                </div>
                <div class="temp-avg">High / Low</div>
            </div>
        `;
        
        forecastDaysEl.appendChild(forecastCard);
    }
    
    // Show warning if we filtered out invalid data
    if (validDays.length < data.day_temp.length) {
        const warning = document.createElement('div');
        warning.className = 'warning';
        warning.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <p>Filtered ${data.day_temp.length - validDays.length} days with invalid temperature data</p>
        `;
        forecastDaysEl.parentNode.insertBefore(warning, forecastDaysEl.nextSibling);
    }
    
    hideLoading();
}

// Fetch data from API
async function fetchWeatherData(city, days) {
    showLoading();
    
    try {
        // Construct the API URL
        const apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoint}/${encodeURIComponent(city.toLowerCase())}/${days}`;
        console.log('Fetching from API:', apiUrl);
        
        // Fetch data from your API with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(apiUrl, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Validate data structure
        validateWeatherData(data, days);
        
        // Render the data
        renderCurrentWeather(data, city, days);
        renderForecastDays(data, city, days);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        
        if (error.name === 'AbortError') {
            showError('Request timeout. Please check if your API server is running.');
        } else if (error.message.includes('Failed to fetch')) {
            showError('Cannot connect to API server. Make sure it\'s running at: ' + API_CONFIG.baseUrl);
        } else {
            showError('Failed to load weather data: ' + error.message);
        }
    }
}