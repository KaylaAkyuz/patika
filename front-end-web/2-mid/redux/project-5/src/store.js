import { configureStore } from "@reduxjs/toolkit";
import wordsReducer from "./slices/wordsSlice";
import scoreReducer from "./slices/scoreSlice";

const store = configureStore({
  reducer: {
    words: wordsReducer,
    score: scoreReducer,
  },
});

export default store;
