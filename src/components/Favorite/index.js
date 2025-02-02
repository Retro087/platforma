import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import ArticlesList from "../Articles";

import {
  addFavorite,
  deleteFavorite,
  fetchFavorite,
} from "../../store/favoriteSlice";

const FavoritesContainer = (props) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    articles: state.favorite.list,

    load: state.favorite.load,
    myId: state.auth.myId,
  }));

  useEffect(() => {
    dispatch(fetchFavorite());
  }, []);

  const callbacks = {
    addFavorite: useCallback((id) => dispatch(addFavorite(id)), []),
    deleteFavorite: useCallback((id) => dispatch(deleteFavorite(id)), []),
  };
  return (
    <>
      <ArticlesList
        deleteFavorite={callbacks.deleteFavorite}
        addFavorite={callbacks.addFavorite}
        gap={45}
        columns={4}
        articles={select.articles}
      />
    </>
  );
};

export default FavoritesContainer;
