import React from "react";
import "./WeatherDropdown.css";
import Select from "react-select";

const WeatherDropdown = ({ cities, selectedCity, onChange }) => {
  const options = cities.map((city) => ({
    value: city,
    label: city,
  }));

  return (
    <div className="weather-dropdown">
      <label htmlFor="city">Select a Prefecture: </label>
      <Select
        id="city"
        options={options}
        value={
          selectedCity ? { value: selectedCity, label: selectedCity } : null
        }
        className="select"
        onChange={(selectedOption) =>
          onChange(selectedOption ? selectedOption.value : "")
        }
        placeholder="Select a Prefecture"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            text: "orangered",
            primary25: "#ffecf0",
            primary75: "#ffecf0",
            primary: "pink",
          },
        })}
        styles={{
          control: (provided) => ({
            ...provided,
            width: "200px",
            borderRadius: "10px",
          }),
          option: (provided, state) => ({
            ...provided,
            ":active": {
              backgroundColor: "#f48fb1",
              color: "white",
            },
          }),
        }}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default WeatherDropdown;
