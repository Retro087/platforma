import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";
import { createProduct } from "../articlesSlice";

export const getArticle = createAsyncThunk(
  "article/get",
  async ({ userId = null, itemId }) => {
    return services.articlesAPI.getArticle(itemId, userId);
  }
);
export const articleSlice = createSlice({
  name: "article",
  initialState: {
    data: {},

    load: false,
  },
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getArticle.pending, (state) => {
      state.load = true;
    });
    bulider.addCase(getArticle.fulfilled, (state, action) => {
      state.data = action.payload;
      state.load = false;
    });
    bulider.addCase(getArticle.rejected, (state, action) => {
      state.load = false;
    });
    bulider.addCase(createProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.load = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = articleSlice.actions;

export default articleSlice.reducer;
