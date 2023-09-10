import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTotalData = createAsyncThunk(
  "totalCovid/fetchTotalData",
  async () => {
    const response = await axios.get(
      "https://covid19-japan-web-api.vercel.app/api/v1/total"
    );
    return response.data;
  }
);

const totalCovidSlice = createSlice({
  name: "totalCovid",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTotalData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTotalData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectTotalCovid = (state) => {
  const data = state.totalCovid.data;
  if (!data) {
    return null;
  }

  const infected = data.positive || 0;
  const recovered = data.discharge || 0;
  const deceased = data.death || 0;
  const active = infected - (recovered + deceased);

  return {
    ...data,
    infected,
    recovered,
    deceased,
    active,
  };
};

export default totalCovidSlice.reducer;
