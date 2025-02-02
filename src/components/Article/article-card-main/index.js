import React, { useState } from "react";
import s from "./style.module.css";

import ArticleDescription from "./article-description";
import ArticleInfo from "./article-info";
import Currency from "../../common/currency";
const ArticleCardMain = (props) => {
  return (
    <div className={s.wrap}>
      <div className={s.main}>
        <div className={s.header}>
          <span className={s.category}>{props.item.category}</span>
          <Currency list={["eur", "usd", "руб"]} />
        </div>

        <h2 className={s.title}>{props.item.name}</h2>
        <p className={s.short}>{props.item.short}</p>
      </div>
      <ArticleInfo
        city={props.item.city}
        age={props.item.age}
        profit={props.item.profit}
        margin={props.item.margin}
        subs={props.item.subs}
        views={props.item.views}
      />
      <ArticleDescription description={props.item.description} />
    </div>
  );
};

export default ArticleCardMain;
