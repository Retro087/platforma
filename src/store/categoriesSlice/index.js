import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";

export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    return services.categoriesAPI.getCategories();
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (category) => {
    return services.categoriesAPI.addCategory(category);
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    return services.categoriesAPI.deleteCategory(id);
  }
);

export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, data }) => {
    return services.categoriesAPI.updateCategory(id, data);
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
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.list.push(action.payload.newCategory);
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.list = state.list.filter((i) => {
        return Number(i.id) !== Number(action.payload.deletedCategory);
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
