import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchAuthMe, fetchReg } from "../authSlice";
import services from "../../services";

export const updateProfile = createAsyncThunk(
  "profile/update",
  async (update) => {
    return services.profileAPI.updateProfile(update);
  }
);

export const getProfile = createAsyncThunk("profile/get", async () => {
  return services.profileAPI.getProfile();
});

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        debugger;
        state.profile = action.payload.profile;
      }
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        debugger;
        state.profile = action.payload.profile;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = profileSlice.actions;

export default profileSlice.reducer;
