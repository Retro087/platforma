import React from "react";
import HeaderContainer from "../../components/Layouts/header-container";
import ContainerLayout from "../../layouts/container-layout";
import ArticleCardMain from "../../components/Article/article-card-main";
import ArticleCardContainer from "../../components/Article";
import PageLayout from "../../layouts/page-layout";

const Article = () => {
  return (
    <PageLayout>
      <ArticleCardContainer />
    </PageLayout>
  );
};

export default Article;
