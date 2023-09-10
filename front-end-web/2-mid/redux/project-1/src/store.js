import { configureStore } from "@reduxjs/toolkit";
import paragraphsReducer from "./features/paragraphs/paragraphsSlice";

const store = configureStore({
  reducer: {
    paragraphs: paragraphsReducer,
  },
});

export default store;
