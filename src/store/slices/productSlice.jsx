import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetchProd: [],
  fetchCateg: [],
  status: "idle",
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "Loading...";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProd = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.fetchCateg = [...action.payload, { id: 0, name: "all" }];
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;

export const fetchProducts = createAsyncThunk("products", async () => {
  // const data = await fetch("https://api.escuelajs.co/api/v1/products");
  const data = await fetch("https://dummyjson.com/products");
  const result = await data.json();
  // console.log(result.products)
  return result.products;
});

export const fetchCategories = createAsyncThunk("categories", async () => {
  // const data = await fetch("https://api.escuelajs.co/api/v1/categories");
  const data = await fetch("https://dummyjson.com/products");
  const result = await data.json();
  // console.log(result.products[0].category)
  return result.products;
});
