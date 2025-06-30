import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const useInterceptorRefreshToken = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const navigate = useNavigate();
      debugger;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        debugger;
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            debugger;
            if (!refreshToken) {
              debugger;
              // No refresh token, redirect to login or handle as needed
              return navigate("/auth"); // Example: Redirect to login page
            }

            const refreshResponse = await axios.post(
              "http://localhost:5000/api/auth/refresh-token", // Replace with your refresh token endpoint
              { refreshToken: refreshToken },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            debugger;
            const { token: newToken, refreshToken: newRefreshToken } =
              refreshResponse.data;

            localStorage.setItem("token", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`; // Update default header
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`; // Update failed request header

            // Retry all failed requests
            failedRequests.forEach((cb) => cb(newToken));
            failedRequests = [];

            return instance(originalRequest); // Retry the original request with the new token
          } catch (refreshError) {
            // Refresh token failed, redirect to login or handle as needed
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            navigate("/auth");
            // Example: Redirect to login page
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        } else {
          // If already refreshing, queue the request
          return new Promise(function (resolve, reject) {
            failedRequests.push((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(instance(originalRequest));
            });
          });
        }
      }

      return Promise.reject(error);
    }
  );
};

export default useInterceptorRefreshToken;
