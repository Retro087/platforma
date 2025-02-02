import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";

export const fetchFavorite = createAsyncThunk("favorite/fetch", async () => {
  return services.favoriteAPI.getFavorites();
});

export const addFavorite = createAsyncThunk("favorite/add", async (itemId) => {
  return services.favoriteAPI.addFavorite(itemId);
});

export const deleteFavorite = createAsyncThunk(
  "favorite/delete",
  async (itemId) => {
    return services.favoriteAPI.deleteFavorite(itemId);
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    list: [],
    load: false,
    err: "",
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavorite.fulfilled, (state, action) => {
      state.list = action.payload;
      state.load = false;
    });
    builder.addCase(fetchFavorite.pending, (state) => {
      state.load = true;
      state.list = [];
    });
    builder.addCase(fetchFavorite.rejected, (state, err) => {
      state.err = err;
    });
    builder.addCase(addFavorite.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        state.list = [...state.list, action.payload.newFavorite];
        state.success = true;
      }
      state.load = false;
    });
    builder.addCase(addFavorite.pending, (state) => {
      state.load = true;
      state.success = false;
    });
    builder.addCase(addFavorite.rejected, (state, err) => {
      state.err = err;
      state.success = false;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        state.list = [
          ...state.list.filter((i) => i.id !== Number(action.payload.id)),
        ];
        state.success = true;
      }
      state.load = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = favoriteSlice.actions;

export default favoriteSlice.reducer;
