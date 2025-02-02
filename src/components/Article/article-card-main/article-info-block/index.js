import React from "react";
import s from "./style.module.css";
const ArticleInfoBlock = ({ title, value }) => {
  return (
    <div className={s.text_block}>
      <div className={s.text}>
        <p className={s.text_title}>{title}</p>
        <p className={s.text_value}>{value}</p>
      </div>
      <div className={s.line}></div>
    </div>
  );
};

export default ArticleInfoBlock;
