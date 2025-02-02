import React, { useCallback, useEffect } from "react";
import ArticleCard from "./article-card-main";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "../../store/articleSlice";
import Header from "../Layouts/header-container/header";
import HeaderContainer from "../Layouts/header-container";
import ArticleCardMain from "./article-card-main";
import ContainerLayout from "../../layouts/container-layout";
import ArticleSidebar from "./article-sidebar";

const ArticleCardContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    article: state.article.data,
    myId: state.auth.myId,
  }));

  useEffect(() => {
    dispatch(getArticle({ userId: select.myId, itemId: params.id }));
  }, [params.id]);

  return (
    <ContainerLayout
      justify="space-between"
      alignItems="start"
      display="flex"
      width={1350}
    >
      <ArticleCardMain item={select.article} />
      <ArticleSidebar
        title={select.article.name}
        price={select.article.price}
      />
    </ContainerLayout>
  );
};

export default ArticleCardContainer;
