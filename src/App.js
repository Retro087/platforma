import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import { Route, Routes } from "react-router";

import { useEffect } from "react";

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

function App() {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    categories: state.categories.list,
    init: state.init.initialized,
  }));
  useEffect(() => {
    dispatch(initialize());
  }, []);

  if (!select.init) {
    return <div>Загрузка</div>;
  }

  return (
    <div className="App">
      <Routes>
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
          path="/profile"
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
          path="/chat/:id"
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
      </Routes>
    </div>
  );
}

export default App;
