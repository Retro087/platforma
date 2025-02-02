import React from "react";
import ArticleBuyCard from "./article-buy-card";
import ArticlePayList from "./article-pay-list";

const ArticleSidebar = ({ title, price }) => {
  return (
    <div>
      <ArticleBuyCard title={title} price={price} />
      <ArticlePayList list={["paypal", "yandex"]} />
    </div>
  );
};

export default ArticleSidebar;
