import React from "react";
import s from "./style.module.css";
import { DateFormat } from "../../../../utils/DateFormat";
import CheckedMessage from "../../../common/checked-message";

const Message = (props) => {
  return (
    <div
      onClick={() => {
        if (!props.item.isRead) props.markAsRead(props.item.id);
      }}
      className={props.item.senderId === props.myId ? s.wrap_me : s.wrap}
    >
      <div
        className={`${s.container} ${
          props.item.senderId === props.myId ? s.me : ""
        }`}
      >
        <span className={`${s.content}`}>{props.item.content}</span>
        <div className={s.data}>
          <span className={s.date}>{DateFormat(props.item.createdAt)}</span>
          <CheckedMessage isRead={props.item.isRead} />
        </div>
      </div>
    </div>
  );
};

export default Message;
