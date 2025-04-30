import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ArticlesList from "./articles-list";

import {
  deleteProduct,
  fetchActions,
  fetchArticles,
  setParams,
} from "../../store/articlesSlice";

import { addFavorite, deleteFavorite } from "../../store/favoriteSlice";

import { useLocation, useNavigate, useSearchParams } from "react-router";

import useFilter from "../../hooks/useFilter";
import { getUnreadCount } from "../../store/chatsSlice";
const ArticlesContainer = (props) => {
  const dispatch = useDispatch();

  const select = useSelector((state) => ({
    categories: state.categories.list,
    load: state.articles.load,
    myId: state.auth.myId,
    filters: state.articles.filters,
    isAuth: state.auth.isAuth,
    list: state.articles.list,
    currentPage: state.articles.currentPage,
    totalPages: state.articles.totalPages,
    limit: state.articles.limit,
  }));

  useEffect(() => {
    dispatch(
      fetchArticles({
        category: "all",
        userId: select.myId,
        ...select.filters,
      })
    );
  }, [select.filters, select.myId]);

  const callbacks = {
    addFavorite: useCallback((id) => dispatch(addFavorite(id)), []),
    deleteFavorite: useCallback((id) => dispatch(deleteFavorite(id)), []),
    deleteProduct: useCallback((id) => dispatch(deleteProduct(id)), []),
  };
  return (
    <>
      <ArticlesList
        limit={select.limit}
        page={select.currentPage}
        totalPages={select.totalPages}
        isAuth={select.isAuth}
        addFavorite={callbacks.addFavorite}
        deleteFavorite={callbacks.deleteFavorite}
        isLoad={select.load}
        list={props.articles}
        myId={select.myId}
        deleteProduct={callbacks.deleteProduct}
      />
    </>
  );
};

export default ArticlesContainer;
