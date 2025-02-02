import React from "react";
import s from "./style.module.css";
import { DateFormat } from "../../../../utils/DateFormat";
const Message = (props) => {
  return (
    <div className={props.item.senderId === props.myId ? s.wrap_me : s.wrap}>
      <div
        className={`${s.container} ${
          props.item.senderId === props.myId ? s.me : ""
        }`}
      >
        <span className={`${s.content}`}>{props.item.content}</span>
        <span className={s.date}>{DateFormat(props.item.createdAt)}</span>
      </div>
    </div>
  );
};

export default Message;
