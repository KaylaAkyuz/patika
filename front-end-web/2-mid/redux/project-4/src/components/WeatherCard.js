import React from "react";
import "./WeatherCard.css";
import { useSelector } from "react-redux";
import { selectWeatherIcon } from "../slices/weatherIconsSlice";

const WeatherCard = ({ day, weatherCode, maxTemp, minTemp }) => {
  const weatherIcon = useSelector((state) =>
    selectWeatherIcon(state, weatherCode)
  );

  return (
    <div className="weather-card">
      <p className="day">{day}</p>
      <img
        src={`./weather-icons/fill/${weatherIcon.day}.svg`}
        alt="Weather Icon"
      />
      <p className="max-temp">{maxTemp}°C</p>
      <p className="min-temp">{minTemp}°C</p>
    </div>
  );
};

export default WeatherCard;
