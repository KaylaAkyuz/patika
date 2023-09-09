import { createSlice } from "@reduxjs/toolkit";
import productsData from "../assets/data/products.json";

const initialState = productsData;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export const selectProductById = (productId) => (state) =>
  state.products.find((product) => product.id === productId);

export default productsSlice.reducer;
