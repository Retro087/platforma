import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./articlesSlice";
import profileSlice from "./profileSlice";
import articleSlice from "./articleSlice";
import categoriesSlice from "./categoriesSlice";
import authSlice from "./authSlice";
import initSlice from "./initializeSlice";
import favoriteSlice from "./favoriteSlice";
import chatSlice from "./chatSlice";
import chatsSlice from "./chatsSlice";

export default configureStore({
  reducer: {
    articles: articlesSlice,
    profile: profileSlice,
    article: articleSlice,
    categories: categoriesSlice,
    auth: authSlice,
    init: initSlice,
    favorite: favoriteSlice,
    chat: chatSlice,
    chats: chatsSlice,
  },
});
