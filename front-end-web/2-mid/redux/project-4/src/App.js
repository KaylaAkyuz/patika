import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import WeatherDropdown from "./components/WeatherDropdown";
import { fetchWeatherData } from "./slices/weatherSlice";
import {
  setCity,
  selectCityCoordinates,
  selectCityNames,
} from "./slices/cityCoordinatesSlice";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

function App() {
  const dispatch = useDispatch();
  const { weatherData, loading, error } = useSelector((state) => state.weather);
  const selectedCity = useSelector(
    (state) => state.cityCoordinates.selectedCity
  );
  const cityNames = useSelector(selectCityNames);

  const { lat: latitude, lng: longitude } = useSelector(
    selectCityCoordinates(selectedCity)
  );

  useEffect(() => {
    if (latitude && longitude) {
      const apiUrl = `${BASE_URL}?latitude=${latitude}&longitude=${longitude}&hourly=is_day&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=auto`;
      dispatch(fetchWeatherData(apiUrl));
    }
  }, [dispatch, latitude, longitude]);

  const renderWeatherCards = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (weatherData) {
      const { temperature_2m_max, temperature_2m_min, time, weathercode } =
        weatherData.daily;

      return time.map((date, index) => (
        <WeatherCard
          key={date}
          day={new Date(date).toLocaleDateString("en-US", { weekday: "long" })}
          weatherCode={weathercode[index]}
          maxTemp={temperature_2m_max[index]}
          minTemp={temperature_2m_min[index]}
        />
      ));
    }

    return null;
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Weather Forecast of Japan</h1>
      </div>
      <WeatherDropdown
        cities={cityNames}
        selectedCity={selectedCity}
        onChange={(city) => {
          dispatch(setCity(city));
        }}
      />
      <div className="weather-cards">{renderWeatherCards()}</div>
    </div>
  );
}

export default App;
