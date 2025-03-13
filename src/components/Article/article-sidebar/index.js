import React from "react";
import ArticleBuyCard from "./article-buy-card";
import ArticlePayList from "./article-pay-list";

const ArticleSidebar = ({
  title,
  id,
  price,
  author,
  myId,
  createChat,
  createRequest,
  buy,
  request,
  item,
}) => {
  return (
    <div>
      <ArticleBuyCard
        id={id}
        myId={myId}
        item={item}
        createChat={createChat}
        createRequest={createRequest}
        author={author}
        title={title}
        price={price}
        buy={buy}
        request={request}
      />
      <ArticlePayList list={["paypal", "yandex"]} />
    </div>
  );
};

export default ArticleSidebar;
