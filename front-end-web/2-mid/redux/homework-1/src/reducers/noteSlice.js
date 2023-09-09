import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = [];

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const selectNotes = (state) => state.notes;
export const selectFilter = (state) => state.filter;

export const selectFilteredNotes = createSelector(
  [selectNotes, selectFilter],
  (notes, filter) => {
    return notes.filter((note) => note.text.includes(filter));
  }
);

export const { addNote } = noteSlice.actions;
export default noteSlice.reducer;
