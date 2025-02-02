import React from "react";
import s from "./style.module.css";

import ArticleInfoBlockShort from "../article-info-block-short";
const ArticleInfoShort = (props) => {
  return (
    <div className={s.info}>
      <ArticleInfoBlockShort value={props.city} title={"Местонахождение"} />
      <ArticleInfoBlockShort value={props.age} title={"Возраст компании"} />
      <ArticleInfoBlockShort value={props.profit} title={"Прибыль"} />
      <ArticleInfoBlockShort value={props.margin} title={"Маржа"} />
      <ArticleInfoBlockShort value={props.views} title={"Просмотры"} />
      <ArticleInfoBlockShort value={props.subs} title={"Подписчики"} />
    </div>
  );
};

export default ArticleInfoShort;
