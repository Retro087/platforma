import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

export const getChats = createAsyncThunk("chats/fetch", async (id) => {
  const response = await fetch(`http://localhost:5000/api/chats/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await response.json();
  return data;
});

export const chatsSlice = createSlice({
  name: "chat",
  initialState: {
    list: [],
    load: false,
    err: "",
  },
  reducers: {
    addChat(state, action) {
      state.list.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      debugger;
      state.list = action.payload;
      state.load = false;
    });
    builder.addCase(getChats.pending, (state) => {
      state.load = true;
    });
    builder.addCase(getChats.rejected, (state, err) => {
      state.err = err;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addChat } = chatsSlice.actions;

export default chatsSlice.reducer;
