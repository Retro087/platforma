import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  listing: null,
  payment: null,
  step: 1,
  loading: false,
  error: null,
};

export const createListing = createAsyncThunk(
  "listing/createListing",
  async ({ userId, url }) => {
    const response = await fetch("http://localhost:5000/api/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, url, data: {} }),
    });
    const data = await response.json();
    return data;
  }
);

export const updateListing = createAsyncThunk(
  "listing/updateListing",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to update listing");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPayment = createAsyncThunk(
  "listing/createPayment",
  async ({ listingId, amount }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, amount }),
      });
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to create payment");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePayment = createAsyncThunk(
  "listing/updatePayment",
  async ({ paymentId, status }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payments/${paymentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message || "Failed to update payment");
      }
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetListing: (state) => {
      state.listing = null;
      state.payment = null;
      state.step = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.loading = false;
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listing = action.payload;
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { nextStep, prevStep, resetListing } = listingSlice.actions;
export default listingSlice.reducer;
