import React, { useEffect, useState } from "react";
import { useWeatherContext } from "../context/WeatherContext";
import { useGeoContext } from "../context/GeoContext";
import { useLoadingContext } from "../context/LoadingContext";
import "./Container.css";
import DailyWidget from "./DailyWidget";

function Container() {
  const { weatherData, getWeatherData } = useWeatherContext();
  const { geoData } = useGeoContext();
  const { loading, weatherFetch } = useLoadingContext();
  const [selectedCity, setSelectedCity] = useState(geoData[0]?.name);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(geoData);
  const [showDropdown, setShowDropdown] = useState(false); // New state variable to handle dropdown visibility

  const handleCityChange = (event) => {
    setSearchTerm(event.target.value);
    setShowDropdown(true); // Show the dropdown when a letter is typed
  };

  const handleSelectCity = (cityName) => {
    setSearchTerm(cityName);
    setSelectedCity(cityName);
    setShowDropdown(false); // Hide the dropdown after a city is selected
  };

  const handleSearchBarClick = () => {
    setSearchTerm((searchTerm) => (searchTerm != null ? searchTerm : ""));
    setSearchResults(geoData); // Show all cities when the search bar is clicked
    setShowDropdown(true); // Show the dropdown when the search bar is clicked
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
      setSearchTerm((searchTerm) => (searchTerm.length ? searchTerm : null));
    }, 100);
  };

  useEffect(() => {
    // Fetch weather data for the selected city
    getWeatherData(selectedCity);
  }, [selectedCity, getWeatherData]);

  useEffect(() => {
    // Filter cities based on search term
    if (searchTerm) {
      setSearchResults(
        geoData.filter((city) =>
          city.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setSearchResults(geoData);
    }
  }, [geoData, searchTerm]);

  return (
    <div className="weather-container">
      {/* City Search Input */}
      <div className="city-search">
        <label htmlFor="city">Search for a City: </label>
        <input
          type="text"
          id="city"
          value={searchTerm}
          onChange={handleCityChange}
          onFocus={handleSearchBarClick} // Show all cities when the search bar is clicked
          onBlur={handleSearchBlur} // Hide the dropdown with a slight delay
          placeholder="Enter city name..."
        />
        {showDropdown &&
          searchTerm != null && ( // Show the dropdown only when showDropdown is true
            <div className="city-suggestions">
              {searchResults.map((city, id) => (
                <div
                  key={id}
                  className="suggestion"
                  onClick={() => handleSelectCity(city.name)}
                >
                  {city.name}
                </div>
              ))}
            </div>
          )}
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {weatherFetch && (
            <>
              {/* Current Weather Section */}
              <DailyWidget
                weatherData={weatherData}
                today={true}
                selectedCity={selectedCity}
              />

              {/* 7-day Forecast Section */}
              <div className="weekly-forecast">
                {weatherData.daily.time.map((date, index) => (
                  <DailyWidget
                    key={index}
                    index={index}
                    weatherData={weatherData}
                    today={false}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Container;
