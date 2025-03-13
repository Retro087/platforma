import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAuth, fetchAuthMe, fetchReg } from "../authSlice";
import services from "../../services";

export const getRequests = createAsyncThunk("requests/get", async (type) => {
  return services.purchaseRequestsAPI.getRequests(type);
});

export const getRequest = createAsyncThunk("request/get", async (productId) => {
  return services.purchaseRequestsAPI.getRequest(productId);
});

export const createRequest = createAsyncThunk(
  "purchase/createRequest",
  async ({ businessId, amount }) => {
    return services.purchaseRequestsAPI.createRequest(businessId, amount);
  }
);

export const acceptRequest = createAsyncThunk(
  "purchase/accept",
  async (requestid) => {
    return services.purchaseRequestsAPI.acceptRequest(requestid);
  }
);

export const rejectRequest = createAsyncThunk(
  "purchase/reject",
  async (requestid) => {
    return services.purchaseRequestsAPI.rejectRequest(requestid);
  }
);
export const createTransfer = createAsyncThunk(
  "transfer/create",
  async ({ purchaseRequestId, description = "" }) => {
    return services.purchaseRequestsAPI.createTransfer(
      purchaseRequestId,
      description
    );
  }
);

export const confirmForBuyer = createAsyncThunk(
  "transfer/confirm-buyer",
  async (transferId) => {
    return services.purchaseRequestsAPI.confirmForBuyer(transferId);
  }
);

export const confirmForSeller = createAsyncThunk(
  "transfer/confirm-Seller",
  async (transferId) => {
    return services.purchaseRequestsAPI.confirmForSeller(transferId);
  }
);

export const purchaseRequestsSlice = createSlice({
  name: "purchaseRequests",
  initialState: {
    requests: [],
    request: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRequests.fulfilled, (state, action) => {
      debugger;
      state.requests = action.payload;
    });
    builder.addCase(getRequest.fulfilled, (state, action) => {
      debugger;
      state.request = action.payload;
    });
    builder.addCase(confirmForBuyer.fulfilled, (state, action) => {
      debugger;
      state.requests = state.requests.map((i) => {
        if (i.id == action.payload.id) {
          return { ...i, status: action.payload.status };
        }
        return i;
      });
    });
    builder.addCase(confirmForSeller.fulfilled, (state, action) => {
      debugger;
      state.requests = state.requests.map((i) => {
        if (i.id == action.payload.id) {
          return { ...i, status: action.payload.status };
        }
        return i;
      });
    });
    builder.addCase(createTransfer.fulfilled, (state, action) => {
      debugger;
      state.requests = state.requests.map((i) => {
        if (i.id == action.payload.id) {
          return { ...i, status: action.payload.status };
        }
        return i;
      });
    });
    builder.addCase(acceptRequest.fulfilled, (state, action) => {
      debugger;
      state.requests = state.requests.map((i) => {
        if (i.id == action.payload.id) {
          return { ...i, status: "accepted" };
        }
        return i;
      });
    });
    builder.addCase(rejectRequest.fulfilled, (state, action) => {
      debugger;
      state.requests = state.requests.map((i) => {
        if (i.id == action.payload.id) {
          return { ...i, status: "rejected" };
        }
        return i;
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = purchaseRequestsSlice.actions;

export default purchaseRequestsSlice.reducer;
