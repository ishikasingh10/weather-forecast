# 🌤️ Weather Forecast Web App

A sleek and responsive weather application that provides real-time weather updates for any city in the world or based on your current location. Built using **HTML, CSS, and JavaScript**, and powered by the **WeatherAPI**.

> 📍 Try it live: [Live Demo](https://code-wizard25.github.io/Weather-forecast/)

---

## 🔍 Features

- 🌎 **Search by City** – Enter a city name to get the current weather conditions.
- 📍 **Current Location Weather** – Automatically fetch weather based on your geolocation.
- ⏰ **Local Time Display** – See the current local time of the searched city.
- 🔁 **Recent Searches** – Stores your last 5 searched cities using `localStorage`.
- 🌈 **Dynamic Backgrounds** – The background changes based on weather and time (day/night).
- 📱 **Responsive Design** – Fully functional on desktop, tablet, and mobile devices.
- ⚠️ **Error Handling** – User-friendly error messages for invalid city names or API issues.

---

## 🖥️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **API**: [WeatherAPI](https://www.weatherapi.com/)
- **Browser Storage**: localStorage for caching recent searches

---

## 📁 Project Structure

```bash
weather-forecast/
├── index.html         # Main webpage
├── style.css          # Styles for layout and weather themes
├── script.js          # Core logic and API integration
````

---

## 📦 How It Works

1. **User Input**: Enter a city or allow browser to fetch your geolocation.
2. **API Call**: Sends a request to WeatherAPI to retrieve current weather data.
3. **DOM Update**: Updates weather info, local time, and UI visuals.
4. **Storage**: Stores city name in recent searches (max 5).

---

## 🚀 Getting Started Locally

To run this project on your local machine:

```bash
git clone https://github.com/ishikasingh10/weather-forecast.git
cd weather-forecast
open index.html  # Or open in your preferred browser/editor
```

> ⚠️ This app uses a demo WeatherAPI key. For full functionality:

1. Visit [https://www.weatherapi.com/](https://www.weatherapi.com/)
2. Create an account and get your API key.
3. Replace the API key in `script.js` with your own.

```javascript
const apiKey = "YOUR_API_KEY_HERE"; // Replace this in script.js
```

---


## ❗ Known Issues

* May not work properly if **location permissions** are denied.
* API request limits if the demo API key is used excessively.

---

## 🧠 Learnings

* Working with third-party APIs (WeatherAPI)
* DOM manipulation with vanilla JavaScript
* Implementing dynamic and responsive UI elements
* Using `localStorage` for state persistence
* Graceful error handling and UX enhancements

---

## ✨ Contributions

Feel free to fork this repo and enhance it! You can:

* Add hourly/weekly forecast
* Add dark mode toggle
* Improve animations or themes
* Switch to React/Vue for more complex state management

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙋‍♀️ Author

**Ishika Singh**
GitHub: [@ishikasingh10](https://github.com/ishikasingh10)


