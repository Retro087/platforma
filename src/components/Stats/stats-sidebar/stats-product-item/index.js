import React from "react";
import s from "./style.module.css";
const StatsProductItem = ({ item, active, onClick }) => {
  return (
    <div
      onClick={() => onClick(item.id)}
      style={{ backgroundColor: active == item.id ? "#f1f1f1" : "" }}
      className={s.wrap}
    >
      <div className={s.con}>
        <span className={s.item}>{item.id}</span>
        <span className={s.item}>{item.name}</span>
        <span className={s.item}>{item.short}</span>
        <span className={s.item}>{item.price}</span>
      </div>
    </div>
  );
};

export default StatsProductItem;
