import React from "react";
import s from "./style.module.css";
import ArticleInfoBlock from "../article-info-block";
const ArticleInfo = (props) => {
  return (
    <div className={s.info}>
      <ArticleInfoBlock value={props.city} title={"Местонахождение"} />
      <ArticleInfoBlock value={props.age} title={"Возраст компании"} />
      <ArticleInfoBlock value={props.profit} title={"Прибыль"} />
      <ArticleInfoBlock value={props.margin} title={"Маржа"} />
      <ArticleInfoBlock value={props.views} title={"Просмотры"} />
      <ArticleInfoBlock value={props.subs} title={"Подписчики"} />
    </div>
  );
};

export default ArticleInfo;
