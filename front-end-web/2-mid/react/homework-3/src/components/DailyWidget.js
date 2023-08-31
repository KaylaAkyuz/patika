import React, { useState } from "react";
import weatherIconsMap from "../assets/data/weatherIconsMap";

const getIcon = (weatherData, today, fill, day) => {
  return `./weather-icons/${fill}/${
    day ? weatherData.day : weatherData.night
  }.svg`;
};

function DailyWidget({ index, weatherData, today, selectedCity }) {
  const [day] = useState(weatherData.isDay);
  const [fill] = useState("fill");
  const date = index
    ? new Date(weatherData.daily.time[index]).toLocaleDateString(undefined, {
        weekday: "short",
      })
    : "Today";

  return (
    <>
      {today ? (
        <div className="current-weather">
          <h2>{selectedCity}</h2>
          <p>
            {weatherIconsMap[weatherData.current_weather.weathercode].label}
          </p>
          <p>Temperature: {weatherData.current_weather.temperature}°C</p>
        </div>
      ) : (
        <div
          className="daily-forecast"
          style={
            !index
              ? {
                  backgroundColor: "#f0f0f0",
                  borderColor: "#bbb",
                }
              : {}
          }
        >
          <p>{date}</p>
          <img
            src={getIcon(
              weatherIconsMap[weatherData.daily.weathercode[index]],
              today,
              fill,
              day
            )}
            alt="Weather Icon"
            style={{
              width: "60px",
            }}
          />
          <p>{weatherIconsMap[weatherData.daily.weathercode[index]].label}</p>
          <p>Max Temp: {weatherData.daily.temperature_2m_max[index]}°C</p>
          <p>Min Temp: {weatherData.daily.temperature_2m_min[index]}°C</p>
        </div>
      )}
    </>
  );
}

export default DailyWidget;
