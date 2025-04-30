import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../../services";

export const getAllUsers = createAsyncThunk("admin/users", async () => {
  return services.adminAPI.getAllUsers();
});

export const getAllProducts = createAsyncThunk("admin/products", async () => {
  return services.adminAPI.getProducts();
});

export const getAllpayments = createAsyncThunk("admin/payments", async () => {
  return services.adminAPI.getAllPayments();
});

export const adminUpdateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ data, id }) => {
    return services.adminAPI.updateUser(data, id);
  }
);

export const adminDeleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id) => {
    return services.adminAPI.deleteUser(id);
  }
);

export const adminCreateUser = createAsyncThunk(
  "admin/CreateUser",
  async (data) => {
    return services.adminAPI.createUser(data);
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    products: [],
    payments: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getAllpayments.fulfilled, (state, action) => {
      state.payments = action.payload;
    });

    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(adminUpdateUser.fulfilled, (state, action) => {
      state.users = state.users.map((user) => {
        if (Number(user.id) === Number(action.payload.id)) {
          return action.payload; // Заменяем старый элемент новым
        }
        return user; // Возвращаем старый элемент без изменений
      });
    });
    builder.addCase(adminDeleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter(
        (i) => Number(i.id) !== Number(action.payload)
      );
    });
    builder.addCase(adminCreateUser.fulfilled, (state, action) => {
      state.users = [...state.users, action.payload];
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = adminSlice.actions;

export default adminSlice.reducer;
