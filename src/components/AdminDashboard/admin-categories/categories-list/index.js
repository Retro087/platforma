import React from "react";
import s from "./style.module.css";
import CategoryItem from "../category-item";
const CategoriesList = ({ list, setOpen, onDelete }) => {
  return (
    <div className={s.wrap}>
      {list.map((i, index) => {
        return <CategoryItem onDelete={onDelete} key={index} item={i} />;
      })}
    </div>
  );
};

export default CategoriesList;
