import React from "react";
import PageLayout from "../../layouts/page-layout";
import ArticlesContainer from "../../components/Articles";
import ContainerLayout from "../../layouts/container-layout";
import { useSelector } from "react-redux";
import BlockTitle from "../../components/common/block-title";

const Main = () => {
  const list = useSelector((state) => state.articles.list);
  return (
    <PageLayout>
      <ContainerLayout width={1140}>
        <BlockTitle title={"Все товары"} />
        <ArticlesContainer articles={list} />
      </ContainerLayout>
    </PageLayout>
  );
};

export default Main;
