import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchAuthMe, fetchReg } from "../authSlice";
import services from "../../services";

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (update) => {
    return services.profileAPI.updateProfile(update);
  }
);

export const updatePhoto = createAsyncThunk(
  "profile/updatePhoto",
  async ({ photo, id }) => {
    return services.profileAPI.updatePhoto(photo, id);
  }
);

export const getMyProducts = createAsyncThunk("articles/my", async () => {
  return services.articlesAPI.getMyArticles();
});

export const getProfile = createAsyncThunk("profile/get", async () => {
  let item = localStorage.getItem("token");

  return services.profileAPI.getProfile();
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    myProducts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        state.profile = action.payload.profile;
      }
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        state.profile = action.payload.profile;
      }
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      debugger;
      state.profile.photo = action.payload.photo;
    });
    builder.addCase(getMyProducts.fulfilled, (state, action) => {
      debugger;
      state.myProducts = action.payload.products;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = profileSlice.actions;

export default profileSlice.reducer;
