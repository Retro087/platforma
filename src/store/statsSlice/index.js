import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";
import { createProduct } from "../articlesSlice";

export const getStats = createAsyncThunk("stats/get", async (id) => {
  return services.statsAPI.getStats(id);
});

export const statsSlice = createSlice({
  name: "stats",
  initialState: {
    views: null,
    favorites: null,
    data: [],
    load: false,
  },
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getStats.pending, (state) => {
      state.load = true;
    });
    bulider.addCase(getStats.fulfilled, (state, action) => {
      state.data = action.payload.chartData.map((stat) => ({
        date: new Date(stat.date).toLocaleString(),

        favorites: Number(stat.favorites) ?? 0,
        views: Number(stat.views) ?? 0,
      }));
      state.views = action.payload.views;
      state.favorites = action.payload.favorites;
      state.load = false;
    });
    bulider.addCase(getStats.rejected, (state, action) => {
      state.load = false;
    });
    bulider.addCase(createProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.load = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = statsSlice.actions;

export default statsSlice.reducer;
