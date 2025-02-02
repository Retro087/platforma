import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    return services.categoriesAPI.getCategories();
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
