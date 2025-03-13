import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";
import { createProduct } from "../articlesSlice";

export const readNotification = createAsyncThunk(
  "notifications/read",
  async (id) => {
    return services.notificationsAPI.readNotification(id);
  }
);
export const getNotifications = createAsyncThunk(
  "notifications/get",
  async () => {
    return services.notificationsAPI.getNotifications();
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    load: false,
    err: "",
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload); //  Добавляем новое уведомление в начало списка
    },
  },
  extraReducers: (bulider) => {
    bulider.addCase(getNotifications.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    bulider.addCase(readNotification.fulfilled, (state, action) => {
      state.list = state.list.map((notification) =>
        notification.id === action.payload.id
          ? { ...notification, isRead: true }
          : notification
      );
    });
  },
});

// Action creators are generated for each case reducer function
export const { addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
