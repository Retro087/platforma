import axios from "axios";

const services = {};

let instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 4, onlyFriends, name) {
    return instance
      .get(
        `users?page=${currentPage}&count=${pageSize}&friend=${onlyFriends}&term=${name}`
      )
      .then((response) => {
        return response.data;
      });
  },
  followUser(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  unfollowUser(userId) {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
};

services.profileAPI = {
  getProfile() {
    return instance.get(`profile/`).then((response) => response.data);
  },
  updateProfile(update) {
    return instance
      .patch(`profile/`, { ...update })
      .then((response) => response.data);
  },
};

services.authAPI = {
  authMe() {
    return instance.get(`auth/authMe`).then((response) => response.data);
  },
  logIn(email, password, rememberMe = false) {
    return instance
      .post(`auth/login`, { email, password })
      .then((responce) => responce.data);
  },
  reg(email, password, username) {
    return instance
      .post(`auth/register`, { email, password, username })
      .then((responce) => responce.data);
  },
  logOut() {
    return instance.delete(`auth/login`).then((response) => response.data);
  },
};

services.articlesAPI = {
  getArticles({ category = "all", userId = null, min, max, query }) {
    return instance
      .get(
        `products?category=${category}&userId=${userId}&min=${min}&max=${max}&query=${query}`
      )
      .then((response) => response.data);
  },
  getArticle(itemId, userId) {
    return instance
      .get(`products/${itemId}?userId=${userId}`)
      .then((response) => response.data);
  },
  getDrafts(userId) {
    return instance
      .get(`products/drafts?userId=${userId}`)
      .then((res) => res.data);
  },
  createArticle(url) {
    return instance.post(`products/`, { url }).then((res) => res.data);
  },
  updateArticle(id, data, status) {
    return instance
      .patch(`products/${id}`, { data, status })
      .then((res) => res.data);
  },
  deleteArticle(id) {
    return instance.delete(`products/${id}`).then((res) => res.data);
  },
};

services.favoriteAPI = {
  getFavorites() {
    return instance.get(`favorite/`).then((response) => response.data);
  },
  addFavorite(itemId) {
    return instance
      .post(`favorite/${itemId}`)
      .then((response) => response.data);
  },
  deleteFavorite(itemId) {
    return instance
      .delete(`favorite/${itemId}`)
      .then((response) => response.data);
  },
};

services.categoriesAPI = {
  getCategories() {
    return instance.get(`categories/`).then((response) => response.data);
  },
};

export default services;
