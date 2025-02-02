import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuthMe } from "../authSlice";
import { fetchCategories } from "../categoriesSlice";

export let initialize = createAsyncThunk("initial", async (_, thunkApi) => {
  let promise = thunkApi.dispatch(fetchAuthMe());
  let promise2 = thunkApi.dispatch(fetchCategories());
  Promise.all([promise, promise2]).then(() => {
    thunkApi.dispatch(succesInitialized());
  });
});

export const initSlice = createSlice({
  name: "init",
  initialState: {
    initialized: false,
  },
  reducers: {
    succesInitialized(state) {
      state.initialized = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { succesInitialized } = initSlice.actions;

export default initSlice.reducer;
