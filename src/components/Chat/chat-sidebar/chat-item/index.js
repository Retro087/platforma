import React from "react";
import s from "./style.module.css";
import { useNavigate } from "react-router";
import icon from "../../../../assets/icon.png";
import CheckedMessage from "../../../common/checked-message";
import { DateFormat } from "../../../../utils/DateFormat";
const ChatItem = ({ item, active }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{ backgroundColor: active == item.chatId ? "#eeeeee" : "" }}
      className={s.wrap}
      onClick={() => navigate(`/chats/${item.chatId}/${item.recieverId}`)}
    >
      <div className={s.icon}>
        <img style={{ width: 25, height: 25 }} src={item.photo || icon} />
      </div>
      <div style={{ flex: 1 }}>
        <div className={s.date_isRead}>
          <span className={s.name}>{item.username}</span>
          {item.isRead ? <CheckedMessage isRead={item.isRead} /> : ""}
          {/*<span className={s.date}>{DateFormat(item.lastMessageDate)}</span>*/}
        </div>

        <span className={s.last}>{item.lastMessage}</span>
      </div>
      {item.unreadCount ? (
        <span className={s.unread}>{item.unreadCount}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatItem;
