import { createSlice } from "@reduxjs/toolkit";
import cityCoordinatesData from "../assets/data/coordinates.json";

const initialState = {
  cityCoordinates: cityCoordinatesData,
  selectedCity: "Tokyo",
};

const cityCoordinatesSlice = createSlice({
  name: "cityCoordinates",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
});

export const selectCityCoordinates = (cityName) => (state) => {
  cityName = cityName || state.cityCoordinates.selectedCity;
  return state.cityCoordinates.cityCoordinates.find(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );
};

export const selectCityNames = (state) => {
  return state.cityCoordinates.cityCoordinates.map((city) => city.name);
};

export const { setCity } = cityCoordinatesSlice.actions;
export default cityCoordinatesSlice.reducer;
