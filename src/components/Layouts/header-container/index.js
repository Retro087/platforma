import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ArticlesList from "../../Articles/articles-list";
import ContainerLayout from "../../../layouts/container-layout";
import Header from "./header";
import BlockTitle from "../../common/block-title";
import HeroSection from "../../common/hero-section";
import { fetchCategories } from "../../../store/categoriesSlice";
import { useNavigate, useSearchParams } from "react-router";
import { setParams } from "../../../store/articlesSlice";
import useFilter from "../../../hooks/useFilter";
import { logout } from "../../../store/authSlice";

const HeaderContainer = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const select = useSelector((state) => ({
    categories: state.categories.list,
    isAuth: state.auth.isAuth,
    profile: state.auth.profile,
    filters: state.articles.filters,
  }));

  const [filter, setFilter] = useFilter(select.filters);

  const callbacks = {
    toAuth: useCallback(() => navigate("/auth")),
    toProfile: useCallback(() => navigate("/profile")),
    toSell: useCallback(() => navigate("/sell")),
    setParams: useCallback((query) => {
      setFilter({ query });
    }),
    logout: useCallback(() => dispatch(logout()), []),
  };

  return (
    <>
      <Header
        profile={select.profile}
        isAuth={select.isAuth}
        toAuth={callbacks.toAuth}
        toProfile={callbacks.toProfile}
        categories={select.categories}
        setParams={callbacks.setParams}
        logout={callbacks.logout}
        toSell={callbacks.toSell}
      />
    </>
  );
};

export default HeaderContainer;
