import React from "react";
import s from "./style.module.css";
import delet from "../../../../assets/delete.png";
const CategoryItem = ({ item, onDelete }) => {
  return (
    <div className={s.wrap}>
      <div className={s.category}>{item.Category}</div>

      <div onClick={() => onDelete(item.id)} className={s.del}>
        <img src={delet} />
      </div>
    </div>
  );
};

export default CategoryItem;
