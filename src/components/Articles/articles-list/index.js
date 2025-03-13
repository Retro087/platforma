import React from "react";
import s from "./style.module.css";

import ArticleItem from "./article-item";
import ArticlesListSkeleton from "./article-list-skeleton";

const ArticlesList = ({
  isAuth,
  isLoad,
  list,
  myId,
  deleteFavorite,
  addFavorite,
  deleteProduct,
}) => {
  if (isLoad) {
    return <ArticlesListSkeleton />;
  }

  if (!list.length) {
    return <div>Ничего не найдено</div>;
  }

  return (
    <div className={s.wrap}>
      {list.map((i, ind) => {
        return (
          <ArticleItem
            myId={myId}
            isAuth={isAuth}
            deleteFavorite={deleteFavorite}
            addFavorite={addFavorite}
            deleteProduct={deleteProduct}
            key={ind}
            item={i}
          />
        );
      })}
    </div>
  );
};

export default ArticlesList;
