import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";
import { createProduct } from "../articlesSlice";

export const getBuyerTransactions = createAsyncThunk(
  "transactions/buyer",
  async () => {
    return services.transactionsAPI.getBuyer();
  }
);
export const getSellerTransactions = createAsyncThunk(
  "transactions/seller",
  async () => {
    return services.transactionsAPI.getSeller();
  }
);

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    load: false,
    err: "",
  },
  reducers: {},
  extraReducers: (bulider) => {
    bulider.addCase(getBuyerTransactions.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    bulider.addCase(getSellerTransactions.fulfilled, (state, action) => {
      debugger;
      state.list = action.payload;
    });
    bulider.addCase(getSellerTransactions.rejected, (state, action) => {
      debugger;
      state.list = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = transactionsSlice.actions;

export default transactionsSlice.reducer;
