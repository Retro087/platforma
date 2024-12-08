import React from "react";
import s from "./style.module.css";
const CourseItem = (props) => {
  return (
    <div className={s.wrap}>
      <h2 className={s.title}>{props.item.title}</h2>
      <p className={s.description}>{props.item.description}</p>
      <p className={s.price}>{props.item.price}</p>
      <button className={s.btn}>Подробнее</button>
    </div>
  );
};

export default CourseItem;
