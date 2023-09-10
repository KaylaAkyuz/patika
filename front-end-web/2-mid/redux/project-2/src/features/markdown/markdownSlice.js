import { createSlice } from "@reduxjs/toolkit";

const markdownSlice = createSlice({
  name: "markdown",
  initialState: {
    markdownContent: "",
  },
  reducers: {
    setMarkdownContent: (state, action) => {
      state.markdownContent = action.payload;
    },
  },
});

export const { setMarkdownContent } = markdownSlice.actions;

export default markdownSlice.reducer;
