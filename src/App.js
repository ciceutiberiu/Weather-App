import React, { useState } from "react";
import Moment from "react-moment";
import "./App.css";

const API = {
  key: "d422805e5934e441e1a2cf51f7a6686b",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});

  const searchLocation = async (e) => {
    if (e.key === "Enter") {
      const res = await fetch(
        `${API.base}weather?q=${input}&units=metric&APPID=${API.key}`
      );
      const data = await res.json();

      setWeather(data);
      setInput("");
      console.log(data);
    }
  };

  return (
    <div
      className={
        typeof weather.name != "undefined"
          ? weather.main.temp > 18
            ? "app"
            : "app cold"
          : "app"
      }
    >
      <main>
        <h1>Weather App</h1>
        <div className="search">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyPress={searchLocation}
          />
        </div>
        {typeof weather.name != "undefined" ? (
          <div>
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="weather-box">
              <div className="temperature">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="date">
              <Moment format="DD MMMM YYYY, hh:mm"></Moment>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
