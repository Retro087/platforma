import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export const getMessages = createAsyncThunk(
  "messages/fetch",
  async ({ id, myId }) => {
    const response = await fetch(
      `http://localhost:5000/api/chat/${id}?senderId=${myId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    return data;
  }
);

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
