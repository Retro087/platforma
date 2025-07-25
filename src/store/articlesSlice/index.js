import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFavorite, deleteFavorite } from "../favoriteSlice";
import services from "../../services";

export const fetchArticles = createAsyncThunk(
  "articles/fetch",
  async ({
    category = "all",
    userId = null,
    min,
    max,
    query,
    page = 1,
    limit = 10,
  }) => {
    return services.articlesAPI.getArticles({
      category,
      userId,
      min,
      max,
      query,
      page,
      limit,
    });
  }
);

export const getDrafts = createAsyncThunk("articles/drafts", async (userId) => {
  return services.articlesAPI.getDrafts(userId);
});

export const createProduct = createAsyncThunk(
  "articles/create",
  async (url) => {
    return services.articlesAPI.createArticle(url);
  }
);

export const updateProduct = createAsyncThunk(
  "articles/update",
  async ({ id, data, status }) => {
    return services.articlesAPI.updateArticle(id, data, status);
  }
);

export const deleteProduct = createAsyncThunk("articles/delete", async (id) => {
  return services.articlesAPI.deleteArticle(id);
});

export const addView = createAsyncThunk("articles/addView", async (id) => {
  return services.articlesAPI.addView(id);
});

export const saveExpenses = createAsyncThunk(
  "articles/addExpenses",
  async ({ id, expenses }) => {
    return services.articlesAPI.saveExpenses(expenses, id);
  }
);

export const getExpenses = createAsyncThunk(
  "articles/getExpenses",
  async (id) => {
    return services.articlesAPI.getExpenses(id);
  }
);

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    list: [],
    drafts: [],
    expenses: [],
    totalProducts: null,
    step: 1,
    currentPage: 1,
    totalPages: null,
    load: false,
    filters: {
      query: "",
      min: 0,
      max: Infinity,
    },
    err: "",
  },
  reducers: {
    setParams: (state, action) => {
      state.filters = action.payload;
    },
    nextStep: (state) => {
      state.step++;
    },
    backStep: (state) => {
      state.step--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      debugger;
      state.list = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.totalProducts = action.payload.totalProducts;
      state.currentPage = action.payload.currentPage;
      state.step = 1;
      state.load = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.list.push(action.payload);
      state.load = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.list = action.payload;
      state.load = false;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.list = action.payload;
      state.load = false;
    });
    builder.addCase(fetchArticles.pending, (state) => {
      state.load = true;
      state.list = [];
    });
    builder.addCase(fetchArticles.rejected, (state, err) => {
      state.err = err;
    });
    builder.addCase(deleteFavorite.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        const arr = state.list.map((i) => {
          if (i.id === Number(action.payload.id)) {
            return { ...i, isFavorite: false };
          }
          return i;
        });
        state.list = arr;
        state.success = true;
      }
      state.load = false;
    });
    builder.addCase(addFavorite.fulfilled, (state, action) => {
      if (action.payload.result === 0) {
        const arr = state.list.map((i) => {
          if (i.id === Number(action.payload.newFavorite.itemId)) {
            return { ...i, isFavorite: true };
          }
          return i;
        });
        state.list = arr;
        state.success = true;
      }
      state.load = false;
    });
    builder.addCase(getDrafts.fulfilled, (state, action) => {
      state.drafts = action.payload;
      state.load = false;
    });
    builder.addCase(deleteProduct.rejected, (state, err) => {});
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.list = state.list.filter((i) => {
        return Number(i.id) !== Number(action.payload.id);
      });

      state.load = false;
    });
    builder.addCase(getExpenses.fulfilled, (state, action) => {
      debugger;
      state.expenses = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setParams, nextStep, backStep } = articlesSlice.actions;

export default articlesSlice.reducer;
