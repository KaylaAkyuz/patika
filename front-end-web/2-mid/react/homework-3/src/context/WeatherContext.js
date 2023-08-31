import React, { createContext, useState, useContext } from "react";
import { useGeoContext } from "./GeoContext";
import { useLoadingContext } from "./LoadingContext";

const WeatherContext = createContext();

function WeatherContextProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const { geoData } = useGeoContext();
  const { setWeatherFetch } = useLoadingContext();

  const getWeatherData = async (cityName) => {
    const matchingCity = geoData.find((city) => city.name === cityName);
    if (matchingCity) {
      const { lat, lng } = matchingCity;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&current_weather=true&timezone=auto`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.reason);
          } else {
            setWeatherData(data);
            setWeatherFetch(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, getWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
}

const useWeatherContext = () => useContext(WeatherContext);

export { useWeatherContext, WeatherContextProvider };
