import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";
import { updatePhoto } from "../profileSlice";

export const fetchAuth = createAsyncThunk("auth/fetch", async (auth) => {
  return services.authAPI.logIn(auth.login, auth.password);
});

export const fetchAuthMe = createAsyncThunk("authMe/fetch", async () => {
  return services.authAPI.authMe();
});

export const fetchReg = createAsyncThunk("reg/fetch", async (auth) => {
  return services.authAPI.reg(auth.login, auth.password, auth.name);
});

export const logoutFetch = createAsyncThunk("logout", async (auth) => {
  return services.authAPI.logOut();
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    load: false,
    myId: null,
    err: "",
    role: null,
    profile: null,
  },
  reducers: {
    clearErr(state) {
      state.err = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        state.isAuth = true;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        state.myId = action.payload.user.id;
        state.profile = action.payload.user;
        state.role = action.payload.user.role;
      }

      state.load = false;
    });
    builder.addCase(fetchAuth.pending, (state) => {
      state.load = true;
    });
    builder.addCase(logoutFetch.fulfilled, (state) => {
      state.isAuth = false;
      state.profile = null;
      state.myId = null;
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.profile.photo = action.payload.photo;
    });
    builder.addCase(fetchAuth.rejected, (state, err) => {
      state.err = err.error.message;

      state.load = false;
    });
    builder.addCase(fetchReg.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        state.err = action.payload.message;
        state.isAuth = true;
        state.myId = action.payload.user.id;
        state.profile = action.payload.user;
        state.role = action.payload.user.role;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }

      state.load = false;
    });
    builder.addCase(fetchReg.pending, (state) => {
      state.load = true;
    });
    builder.addCase(fetchReg.rejected, (state, err) => {
      state.err = err;
      state.load = false;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        state.myId = action.payload.user.id;
        state.isAuth = true;
        state.profile = action.payload.user;
        state.role = action.payload.user.role;
      }
      state.load = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearErr } = authSlice.actions;

export default authSlice.reducer;
