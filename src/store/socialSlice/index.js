import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";
import { createProduct } from "../articlesSlice";

export const getSocials = createAsyncThunk("social/get", async (id) => {
  return services.socialAPI.getSocials(id);
});

export const updateSocial = createAsyncThunk(
  "social/update",
  async (social) => {
    return services.socialAPI.updateSocial(social);
  }
);

export const deleteSocial = createAsyncThunk("social/delete", async () => {
  return services.socialAPI.deleteSocial();
});

export const addSocial = createAsyncThunk(
  "social/add",
  async ({ social, id }) => {
    return services.socialAPI.addSocial(social, id);
  }
);

export const socialSlice = createSlice({
  name: "social",
  initialState: {
    list: [],
    load: false,
    err: "",
  },
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getSocials.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    bulider.addCase(addSocial.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload.social];
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = socialSlice.actions;

export default socialSlice.reducer;
