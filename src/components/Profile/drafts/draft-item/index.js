import React from "react";
import s from "./style.module.css";
import { DateFormat } from "../../../../utils/DateFormat";
import { Link } from "react-router";
const DraftItem = ({ item }) => {
  return (
    <div className={s.wrap}>
      <span className={s.item}>{item.name || item.url}</span>
      <span className={s.item}>{DateFormat(item.created_at)}</span>
      <span className={s.item}>{item.category}</span>
      <Link to={`/product/edit/${item.id}`}>
        <span className={s.item_link}>Изменить</span>
      </Link>
    </div>
  );
};

export default DraftItem;
