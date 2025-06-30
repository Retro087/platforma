import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { Route, Routes } from "react-router";

import React, { useEffect } from "react";

import AuthContainer from "./components/Auth";
import { initialize } from "./store/initializeSlice";
import WithAuth from "./components/hoc/withAuth";

import Favorite from "./app/Favorite";

import Article from "./app/Article";

import Chat from "./app/Chat";
import CategoryArticles from "./app/CategoryArticles";
import Main from "./app/Main";
import Profile from "./app/Profile";
import Sell from "./app/Sell";
import EditProductContainer from "./components/EditProduct";
import EditProduct from "./app/EditProduct";
import Stats from "./app/Stats";
import PrivateRoute from "./components/hoc/privateRoute";
import AdminDashboardContainer from "./components/AdminDashboard";
import Payment from "./components/Payment";

function App() {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    categories: state.categories.list,
    init: state.init.initialized,
  }));
  useEffect(() => {
    debugger;
    dispatch(initialize());
  }, []);

  if (!select.init) {
    return <div>Загрузка</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/admin/:page?"
          element={
            <PrivateRoute requiredRole={"admin"}>
              <AdminDashboardContainer />
            </PrivateRoute>
          }
        />

        {select.categories.map((i, index) => {
          return (
            <Route
              key={index}
              path={`/${i.Category}`}
              element={<CategoryArticles category={i.Category} />}
            />
          );
        })}
        <Route path="/" element={<Main />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route
          path="/profile/:page?"
          element={
            <WithAuth>
              <Profile />
            </WithAuth>
          }
        />
        <Route
          path="/favorite"
          element={
            <WithAuth>
              <Favorite />
            </WithAuth>
          }
        />
        <Route
          path="/chats/:id?/:reciever?"
          element={
            <WithAuth>
              <Chat />
            </WithAuth>
          }
        />

        <Route
          path="/sell"
          element={
            <WithAuth>
              <Sell />
            </WithAuth>
          }
        />
        <Route
          path="product/edit/:id"
          element={
            <WithAuth>
              <EditProduct />
            </WithAuth>
          }
        />
        <Route
          path="stats/:id"
          element={
            <WithAuth>
              <Stats />
            </WithAuth>
          }
        />
        <Route
          path="/payment"
          element={
            <WithAuth>
              <Payment />
            </WithAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
