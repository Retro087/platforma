import React from "react";
import s from "./style.module.css";

import ArticleItem from "./article-item";
import ArticlesListSkeleton from "./article-list-skeleton";

const ArticlesList = (props) => {
  if (props.isLoad) {
    return <ArticlesListSkeleton />;
  }

  if (!props.list.length) {
    return <div>Ничего не найдено</div>;
  }

  return (
    <div className={s.wrap}>
      {props.list.map((i, ind) => {
        return (
          <ArticleItem
            myId={props.myId}
            isAuth={props.isAuth}
            deleteFavorite={props.deleteFavorite}
            addFavorite={props.addFavorite}
            deleteProduct={props.deleteProduct}
            key={ind}
            item={i}
          />
        );
      })}
    </div>
  );
};

export default ArticlesList;
