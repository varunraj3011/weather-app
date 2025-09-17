import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // search icon
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import "./App.css";


const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. Swaziland)",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"


];

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // 🔥 function to map weather to icons
  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return <WiDaySunny size={40} color="yellow" />;
      case "Clouds":
        return <WiCloud size={40} color="lightgray" />;
      case "Rain":
        return <WiRain size={40} color="blue" />;
      case "Snow":
        return <WiSnow size={40} color="skyblue" />;
      case "Thunderstorm":
        return <WiThunderstorm size={40} color="purple" />;
      case "Fog":
      case "Mist":
      case "Haze":
        return <WiFog size={40} color="gray" />;
      default:
        return <WiDaySunny size={40} color="orange" />;
    }
  };

  // Handle input change (filter suggestions)
  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const filtered = countries.filter((c) =>
        c.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSelect = (country) => {
    setCity(country);
    setSuggestions([]);
  };

  const fetchWeather = async () => {
    if (!city) return;

    try {
      // Current weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setWeather(null);
        setForecast([]);
        return;
      }

      setWeather(data);

      // Forecast (5 days / 3 hours)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${
          import.meta.env.VITE_APP_ID
        }&units=metric`
      );
      const forecastData = await forecastRes.json();

      // Pick midday entries
      const dailyData = forecastData.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );
      setForecast(dailyData);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="app">
      <div className="Tittle"><h3>Sky<span>Cast</span></h3>
      </div>
      {/* 🔍 Search */}
      
      <div className="search-bars">
        <div className="search-bar">
          <input
            type="text"
            value={city}
            placeholder="Search"
            onChange={handleChange}
          />

          {/* 🔽 Suggestion dropdown */}
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((s, i) => (
                <li key={i} onClick={() => handleSelect(s)}>
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={fetchWeather}>
          <FaSearch size={18} />
        </button>
      </div>

      <div className="main">
        {/* 🌡 Current Weather */}
        {weather && (
          <div className="current-weather">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p>{weather.weather[0].description}</p>
            {/* ✅ Show weather icon */}
            {getWeatherIcon(weather.weather[0].main)}

            <div className="details">
             <div className="detail"><p>Visibility: {weather.visibility / 1000} km</p></div> 
             <div className="detail"> <p>Wind: {weather.wind.speed} m/s</p></div>
             <div className="detail"> <p>Humidity: {weather.main.humidity}%</p></div>
              <div className="detail"> <p>Pressure: {weather.main.pressure} hPa</p></div>
                <div className="detail"><p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p></div>
                <div className="detail"><p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p></div>
            </div>
          </div>
        )}

        {/* 📅 Sidebar Forecast */}
        {forecast.length > 0 && (
          <div className="sidebar">
            <h3>5-Day Forecast</h3>
            {forecast.map((day, i) => (
              <div key={i} className="forecast-item">
                <p>
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p>{Math.round(day.main.temp)}°C</p>
                <p>{day.weather[0].main}</p>
                {/* ✅ Show forecast icon */}
                {getWeatherIcon(day.weather[0].main)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

