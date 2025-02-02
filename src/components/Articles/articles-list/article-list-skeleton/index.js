import React from "react";
import s from "./style.module.css";

import ArticleItem from "../article-item";
import Loader from "../../../common/loader";

const ArticlesListSkeleton = (props) => {
  return (
    <div className={s.wrap}>
      {[...new Array(3)].map((item, i) => (
        <Loader key={i} />
      ))}
    </div>
  );
};

export default ArticlesListSkeleton;
