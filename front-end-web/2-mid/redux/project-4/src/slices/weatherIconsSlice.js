import { createSlice } from "@reduxjs/toolkit";
import weatherIconsMap from "../assets/data/weatherIconsMap.json";

const initialState = {
  iconsMap: weatherIconsMap,
};

const weatherIconsSlice = createSlice({
  name: "weatherIcons",
  initialState,
  reducers: {},
});

export const selectWeatherIcon = (state, weatherCode) => {
  const { iconsMap } = state.weatherIcons;
  return iconsMap[weatherCode] || null;
};

export default weatherIconsSlice.reducer;
