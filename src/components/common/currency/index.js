import React from "react";
import s from "./style.module.css";
const Currency = ({ list }) => {
  return (
    <div className={s.wrap}>
      <span className={s.title}>Валюта:</span>
      <select className={s.select}>
        {list.map((i, index) => {
          return (
            <option className={s.option} key={index}>
              {i}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Currency;
