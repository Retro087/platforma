import React from "react";
import s from "./style.module.css";
const ArticlePayList = ({ list }) => {
  return (
    <div className={s.wrap}>
      <h2 className={s.title}>Способы оплаты</h2>
      <div>
        <ul className={s.list}>
          {list.map((i) => {
            return <li className={s.item}>{i}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ArticlePayList;
