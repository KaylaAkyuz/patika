import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  correctWordCount: 0,
  wrongWordCount: 0,
  correctKeyPressCount: 0,
  wrongKeyPressCount: 0,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    incrementCorrectWordCount: (state) => {
      state.correctWordCount += 1;
    },
    incrementWrongWordCount: (state) => {
      state.wrongWordCount += 1;
    },
    incrementCorrectKeyPressCount: (state) => {
      state.correctKeyPressCount += 1;
    },
    incrementWrongKeyPressCount: (state) => {
      state.wrongKeyPressCount += 1;
    },
    resetScore: (state) => {
      return initialState;
    },
  },
});

export const selectAllScores = createSelector(
  (state) => state.score,
  (score) => {
    const {
      correctWordCount,
      wrongWordCount,
      correctKeyPressCount,
      wrongKeyPressCount,
    } = score;
    const wpm = Math.floor(correctWordCount);
    const totalWords = correctWordCount + wrongWordCount;
    const totalKeyPresses = correctKeyPressCount + wrongKeyPressCount;
    let accuracy = Math.floor((correctKeyPressCount / totalKeyPresses) * 100);
    let wordAccuracy = Math.floor((correctWordCount / totalWords) * 100);
    if (isNaN(accuracy)) {
      accuracy = 0;
    }
    if (isNaN(wordAccuracy)) {
      wordAccuracy = 0;
    }

    return {
      wpm,
      accuracy,
      wordAccuracy,
      correctWordCount,
      wrongWordCount,
      correctKeyPressCount,
      wrongKeyPressCount,
      totalWords,
      totalKeyPresses,
    };
  }
);

export const {
  startTimer,
  endTimer,
  incrementCorrectWordCount,
  incrementWrongWordCount,
  incrementCorrectKeyPressCount,
  incrementWrongKeyPressCount,
  incrementTotalWords,
  resetScore,
} = scoreSlice.actions;

export default scoreSlice.reducer;
