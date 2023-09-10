import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weatherSlice";
import cityCoordinatesReducer from "./slices/cityCoordinatesSlice";
import weatherIconsReducer from "./slices/weatherIconsSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    cityCoordinates: cityCoordinatesReducer,
    weatherIcons: weatherIconsReducer,
  },
});

export default store;
