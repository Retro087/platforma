import React from "react";
import s from "./style.module.css";

const TransactionsBlock = (props) => {
  return (
    <div className={s.wrap}>
      {props.transactions.map((i) => {
        return (
          <div className={s.item}>
            <span className={s.title}>{i.status}</span>
            <span className={s.date}>{i.createdAt}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsBlock;
