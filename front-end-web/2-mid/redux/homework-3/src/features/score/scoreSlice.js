import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  score: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    increaseScore: (state, action) => {
      state.score += action.payload;
    },
    resetScore: (state, action) => {
      state.score = 0;
    },
  },
});

export const selectScore = (state) => state.score.score;

export const { increaseScore, resetScore } = scoreSlice.actions;

export default scoreSlice.reducer;
