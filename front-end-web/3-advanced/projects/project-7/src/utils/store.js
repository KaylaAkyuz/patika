import { configureStore } from "@reduxjs/toolkit";
import cardsSliceReducer from "../features/cards/cardsSlice";
import scoreSliceReducer from "../features/score/scoreSlice";

const store = configureStore({
  reducer: {
    cards: cardsSliceReducer,
    score: scoreSliceReducer,
  },
});

export default store;
