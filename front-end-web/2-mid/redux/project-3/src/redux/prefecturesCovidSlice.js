import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const convertStats = (data) => {
  const infected = data.cases || 0;
  const recovered = data.discharge || 0;
  const deceased = data.deaths || 0;
  const active = infected - (recovered + deceased);

  return {
    ...data,
    infected,
    recovered,
    deceased,
    active,
  };
};

export const fetchPrefecturesData = createAsyncThunk(
  "prefecturesCovid/fetchPrefecturesData",
  async () => {
    const response = await axios.get(
      "https://covid19-japan-web-api.now.sh/api/v1/prefectures"
    );
    return response.data;
  }
);

const prefecturesCovid = createSlice({
  name: "prefecturesCovid",
  initialState: {
    data: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrefecturesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrefecturesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPrefecturesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const selectPrefecturesCovid = (state) => state.prefecturesCovid;
export const selectPrefectureCovidData = (prefecture) => (state) => {
  const prefecturesCovid = selectPrefecturesCovid(state);
  if (!prefecturesCovid.data) {
    return null;
  }
  const jaFind = prefecturesCovid.data.find(
    (data) => data.name_ja === prefecture
  );
  const enFind = prefecturesCovid.data.find(
    (data) => data.name_en.toLowerCase() === prefecture.toLowerCase()
  );

  if (jaFind) {
    return convertStats(jaFind);
  }
  if (enFind) {
    return convertStats(enFind);
  }
  return null;
};

export const selectPrefectures = (state) => {
  const prefecturesCovid = selectPrefecturesCovid(state);
  if (!prefecturesCovid.data) {
    return [];
  }
  return prefecturesCovid.data.map((data) => data.name_en);
};

export default prefecturesCovid.reducer;
