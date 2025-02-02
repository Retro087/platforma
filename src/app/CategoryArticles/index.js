import React from "react";
import PageLayout from "../../layouts/page-layout";
import ArticlesContainer from "../../components/Articles";
import ContainerLayout from "../../layouts/container-layout";
import { useSelector } from "react-redux";
import CategoryArticlesContainer from "../../components/CategoryArticles";

const CategoryArticles = ({ category }) => {
  return (
    <PageLayout>
      <ContainerLayout width={1140}>
        <CategoryArticlesContainer category={category} />
      </ContainerLayout>
    </PageLayout>
  );
};

export default CategoryArticles;
