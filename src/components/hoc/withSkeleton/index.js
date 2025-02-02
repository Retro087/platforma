import React from "react";
import ArticlesListSkeleton from "../../Articles/articles-list/article-list-skeleton";

const WithSkeleton = ({
  children,
  isLoad,
  columns = 4,
  gap = 45,
  length = 8,
}) => {
  if (isLoad) {
    return <ArticlesListSkeleton columns={columns} gap={gap} length={length} />;
  }
  return <>{children}</>;
};

export default WithSkeleton;
