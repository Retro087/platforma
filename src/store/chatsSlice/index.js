import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";
import services from "../../services";

export const getChats = createAsyncThunk("chats/get", async () => {
  return services.chatsAPI.getChats();
});

export const createChat = createAsyncThunk(
  "chats/create",
  async ({ user1, user2 }) => {
    return services.chatsAPI.createChat(user1, user2);
  }
);

export const getMessages = createAsyncThunk("chats/getMes", async (id) => {
  return services.chatsAPI.getMessages(id);
});

export const getUnreadCount = createAsyncThunk("chats/getUnread", async () => {
  return services.chatsAPI.getUnread();
});

export const chatsSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    messages: [],
    unreadCount: null,
    selectedChat: null,
    load: false,
    err: "",
  },
  reducers: {
    addChat(state, action) {
      state.list.push(action.payload);
    },
    setSelectedChat(state, chat) {
      state.selectedChat = chat;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    readMessage(state, action) {
      state.messages = state.messages.map((message) => {
       
        if (
          Number(message.id) === Number(action.payload.messageId) &&
          Number(message.recieverId) === Number(action.payload.userId)
        ) {
          //  Убедимся, что это сообщение для текущего пользователя
          return { ...message, isRead: true };
        }
        return message;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.fulfilled, (state, action) => {
      debugger;
      state.chats = action.payload;
      state.load = false;
    });
    builder.addCase(getChats.pending, (state) => {
      state.load = true;
    });
    builder.addCase(getChats.rejected, (state, err) => {
      debugger;
      state.err = err;
    });
    builder.addCase(createChat.fulfilled, (state, action) => {
      state.chats.push(action.payload.chat);
      state.selectedChat = action.payload.chat.id;
      state.load = false;
    });
    builder.addCase(createChat.rejected, (state, err) => {
      state.err = err;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      debugger;
      state.messages = action.payload;
      state.load = false;
    });
    builder.addCase(getMessages.pending, (state) => {
      state.load = true;
    });
    builder.addCase(getMessages.rejected, (state, err) => {});
    builder.addCase(getUnreadCount.fulfilled, (state, action) => {
      debugger;
      state.unreadCount = action.payload;
      state.load = false;
    });
    builder.addCase(getUnreadCount.pending, (state) => {
      state.load = true;
    });
    builder.addCase(getUnreadCount.rejected, (state, err) => {
      debugger;
    });
  },
});

// Action creators are generated for each case reducer function
export const { addChat, setSelectedChat, addMessage, readMessage } =
  chatsSlice.actions;

export default chatsSlice.reducer;
