import axios from "axios";
import { refreshToken } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const services = {};

let instance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

// Interceptor для автоматического добавления токена и обновления при необходимости

let isRefreshing = false;
let failedRequests = [];

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Обработка ошибки 401 (недостаточно прав / просроченный токен)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Отправляем запрос на обновление токена.
          // Предполагается, что сервер обновит куки, а не вернет токен в теле.
          await instance.post("auth/refresh-token");

          // После обновления куки, повторяем все ожидающие запросы
          failedRequests.forEach((cb) => cb());
          failedRequests = [];

          // Повторный запрос оригинального запроса
          return instance(originalRequest);
        } catch (refreshError) {
          // Ошибка при обновлении токена — например, редирект на страницу входа
          // Можно очистить куки или сделать логику выхода
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Если уже идет обновление токена, ждем его завершения
        return new Promise((resolve, reject) => {
          failedRequests.push(() => {
            // После обновления куки, повторяем запрос
            resolve(instance(originalRequest));
          });
        });
      }
    }

    // Для остальных ошибок возвращаем их дальше
    return Promise.reject(error);
  }
);

services.subsriptionsAPI = {
  getSubs() {
    return instance.get(`subscriptions/`).then((response) => response.data);
  },
};

services.adminAPI = {
  getAllUsers() {
    return instance.get(`admin/users`).then((response) => response.data);
  },
  getAllPayments() {
    return instance.get(`admin/payments`).then((res) => res.data);
  },
  updateUser(update, id) {
    return instance
      .patch(`admin/users/${id}`, { ...update })
      .then((response) => response.data);
  },
  deleteUser(id) {
    return instance
      .delete(`admin/users/${id}`)
      .then((response) => response.data);
  },
  createUser(data) {
    return instance
      .post(`admin/users/`, { ...data })
      .then((response) => response.data);
  },
  getProducts() {
    return instance.get(`admin/products`).then((res) => res.data);
  },
};
services.transactionsAPI = {
  getBuyer() {
    return instance.get(`transactions/buyer`).then((response) => response.data);
  },
  getSeller() {
    return instance
      .get(`transactions/seller`)
      .then((response) => response.data);
  },
};

services.notificationsAPI = {
  getNotifications() {
    return instance.get(`notifications/`).then((response) => response.data);
  },
  readNotification(id) {
    return instance
      .put(`notifications/${id}/read`)
      .then((response) => response.data);
  },
};

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
  updatePhoto(photo, id) {
    return instance
      .post(`profile/${id}/photo`, photo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
};

services.purchaseRequestsAPI = {
  createRequest(businessId, amount) {
    return instance
      .post(`purchase-requests/`, { businessId, amount })
      .then((response) => response.data);
  },
  getRequests(type) {
    return instance
      .get(`purchase-requests?type=${type}`)
      .then((response) => response.data);
  },
  getRequest(productId) {
    return instance
      .get(`purchase-requests/${productId}`)
      .then((response) => response.data);
  },
  acceptRequest(requestId) {
    return instance
      .put(`purchase-requests/${requestId}/accept`)
      .then((response) => response.data);
  },
  rejectRequest(requestId) {
    return instance
      .put(`purchase-requests/${requestId}/reject`)
      .then((response) => response.data);
  },
  createTransfer(purchaseRequestId, description) {
    return instance
      .post(`asset-transfers/`, {
        purchaseRequestId,
        description,
      })
      .then((response) => response.data);
  },
  confirmForBuyer(transferId) {
    return instance
      .put(`asset-transfers/${transferId}/confirm-buyer`)
      .then((response) => response.data);
  },
  confirmForSeller(transferId) {
    return instance
      .put(`asset-transfers/${transferId}/confirm-seller`)
      .then((response) => response.data);
  },
};

services.statsAPI = {
  getStats(id) {
    return instance
      .get(`products/stats/${id}`)
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
    return instance.delete(`auth/logout`).then((response) => response.data);
  },
  refreshToken(refreshToken) {
    return instance
      .post(`auth/refresh-token`, { refreshToken })
      .then((res) => res.data);
  },
};

services.articlesAPI = {
  getArticles({
    category = "all",
    userId = null,
    min,
    max,
    query,
    page,
    limit,
  }) {
    return instance
      .get(
        `products?category=${category}&userId=${userId}&min=${min}&max=${max}&query=${query}&page=${page}&limit=${limit}`
      )
      .then((response) => response.data);
  },
  getMyArticles() {
    return instance.get(`products/my`).then((response) => response.data);
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
  addView(id) {
    return instance.post(`products/${id}/view`).then((res) => res.data);
  },
  saveExpenses(expenses, id) {
    debugger;
    return instance
      .post(`expenses/${id}`, { expenses })
      .then((res) => res.data);
  },
  addExpense(expense, id) {
    debugger;
    return instance.post(`expenses/${id}`, { expense }).then((res) => res.data);
  },
  getExpenses(id) {
    return instance.get(`expenses/${id}`).then((res) => res.data);
  },
  updateExpense(expense) {
    return instance.put(`expenses/`, { expense }).then((res) => res.data);
  },
  deleteExpense(id) {
    return instance.delete(`expenses/${id}`).then((res) => res.data);
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
  addCategory(category) {
    return instance
      .post(`categories/`, { category })
      .then((response) => response.data);
  },
  deleteCategory(id) {
    return instance
      .delete(`categories/${id}`)
      .then((response) => response.data);
  },
  updateCategory(id, data) {
    return instance
      .patch(`categories/`, { id, updateData: data })
      .then((response) => response.data);
  },
};

services.chatsAPI = {
  getChats() {
    return instance.get(`chats/`).then((response) => response.data);
  },
  createChat(user1, user2) {
    return instance
      .post(`chats/`, { user1, user2 })
      .then((response) => response.data);
  },
  getMessages(id) {
    return instance.get(`chats/${id}`).then((res) => res.data);
  },
  getUnread() {
    return instance.get(`chats/unreadCount`).then((res) => {
      return res.data;
    });
  },
};

export default services;
