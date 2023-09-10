import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchParagraphs = createAsyncThunk(
  "paragraphs/fetchParagraphs",
  async (params) => {
    const { paras, format } = params;
    const response = await fetch(
      `https://baconipsum.com/api/?type=all-meat&start-with-lorem=1&paras=${paras}&format=${format}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch paragraphs");
    }

    const data = await response.text();
    return data;
  }
);

const paragraphsSlice = createSlice({
  name: "paragraphs",
  initialState: {
    paragraphs: "",
    isLoading: false,
    isError: false,
  },
  reducers: {
    generateParagraphs: (state, action) => {
      state.paragraphs = action.payload;
      state.selectedParagraph = action.payload[0];
    },
    setNumParagraphs: (state, action) => {
      state.numParagraphs = parseInt(action.payload, 10);
    },
    toggleDisplayAsHTML: (state) => {
      state.displayAsHTML = !state.displayAsHTML;
    },
    selectParagraph: (state, action) => {
      state.selectedParagraph = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParagraphs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchParagraphs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.paragraphs = action.payload;
      })
      .addCase(fetchParagraphs.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.paragraphs = [];
      });
  },
});

export const {
  generateParagraphs,
  setNumParagraphs,
  toggleDisplayAsHTML,
  selectParagraph,
} = paragraphsSlice.actions;

export const selectParagraphs = (state) => state.paragraphs.paragraphs;

export default paragraphsSlice.reducer;
