import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { getMessages } from "../chatsSlice";

const socket = io("http://localhost:5000");

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    list: [],
    load: false,
    err: "",
  },
  reducers: {
    addMessage(state, action) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.list = action.payload;
      state.load = false;
    });
    builder.addCase(getMessages.pending, (state) => {
      state.load = true;
    });
    builder.addCase(getMessages.rejected, (state, err) => {
      state.err = err;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
