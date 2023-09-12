import { configureStore } from "@reduxjs/toolkit";
import checkersReducer from "./features/checkers/checkersSlice";

export const store = configureStore({
  reducer: {
    checkers: checkersReducer,
  },
});
