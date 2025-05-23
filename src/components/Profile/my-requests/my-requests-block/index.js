import React from "react";
import s from "./style.module.css";

const MyRequestsBlock = (props) => {
  return (
    <div className={s.wrap}>
      {props.requests.map((i) => {
        return (
          <div className={s.item}>
            <div className={s.text}>
              <h2 className={s.title}>{i.status}</h2>
              <p className={s.descr}>{i.createdAt}</p>
            </div>
            <button className={s.btn}>Подробнее</button>
          </div>
        );
      })}
    </div>
  );
};

export default MyRequestsBlock;
