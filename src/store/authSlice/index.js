import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";

export const fetchAuth = createAsyncThunk("auth/fetch", async (auth) => {
  return services.authAPI.logIn(auth.login, auth.password);
});

export const fetchAuthMe = createAsyncThunk("authMe/fetch", async () => {
  return services.authAPI.authMe();
});

export const fetchReg = createAsyncThunk("reg/fetch", async (auth) => {
  return services.authAPI.reg(auth.login, auth.password, auth.name);
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
    logout(state) {
      localStorage.removeItem("token");
      state.isAuth = false;
      state.profile = null;
      state.myId = null;
    },
    clearErr(state) {
      state.err = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
   
      if (action.payload.result === 0) {
        state.isAuth = true;
        localStorage.setItem("token", action.payload.token);

        state.myId = action.payload.user.id;
        state.profile = action.payload.user;
        state.role = action.payload.user.role;
      }

      state.load = false;
    });
    builder.addCase(fetchAuth.pending, (state) => {
      state.load = true;
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
export const { logout, clearErr } = authSlice.actions;

export default authSlice.reducer;
