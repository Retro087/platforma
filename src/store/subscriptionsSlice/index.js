import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";
import { createProduct } from "../articlesSlice";

export const getSubscriptions = createAsyncThunk(
  "subscriptions/get",
  async () => {
    return services.subsriptionsAPI.getSubs();
  }
);

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    list: [
      {
        title: "Pro",
        description:
          "Pro подписка, которая дает большие преимущества для вас. ",
        price: 73,
      },
      {
        title: "Standart",
        description:
          "Стандартная подписка, которая дает возможность выложить объявление",
        price: 30,
      },
    ],
    load: false,
    err: "",
  },
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getSubscriptions.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
