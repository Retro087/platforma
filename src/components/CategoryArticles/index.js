import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import ArticlesList from "../Articles";

import BlockTitle from "../common/block-title";

import ArticleFilters from "../common/Filters";
import GridLayout from "../../layouts/grid-layout";

import { fetchArticles, setParams } from "../../store/articlesSlice";

import { addFavorite, deleteFavorite } from "../../store/favoriteSlice";

import useFilter from "../../hooks/useFilter";
const CategoryArticlesContainer = (props) => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    articles: state.articles.list,
    categories: state.categories.list,
    load: state.articles.load,
    myId: state.auth.myId,
    filters: state.articles.filters,
  }));

  const [filters, setFilters] = useFilter(select.filters);

  useEffect(() => {
    dispatch(
      fetchArticles({
        category: props.category,
        userId: select.myId,
        ...filters,
      })
    );
  }, [props.category, filters]);

  const callbacks = {
    addFavorite: useCallback((id) => dispatch(addFavorite(id)), []),
    deleteFavorite: useCallback((id) => dispatch(deleteFavorite(id)), []),
    handleChangeMin(value) {
      setFilters({ min: value });
    },
    handleChangeMax(value) {
      setFilters({ max: value });
    },
  };
  return (
    <>
      <BlockTitle title={props.category ? props.category : "Все товары"} />
      <div style={{ display: "flex" }}>
        <ArticleFilters
          min={filters.min}
          max={filters.max}
          handleChangeMax={callbacks.handleChangeMax}
          handleChangeMin={callbacks.handleChangeMin}
        />

        <ArticlesList
          deleteFavorite={callbacks.deleteFavorite}
          addFavorite={callbacks.addFavorite}
          gap={45}
          columns={4}
          articles={select.articles}
        />
      </div>
    </>
  );
};

export default CategoryArticlesContainer;
