import React from "react";
import s from "./style.module.css";
import { useNavigate } from "react-router";
const ChatItem = ({ item, active }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ backgroundColor: active == item.chatId ? "#eeeeee" : "" }}
      className={s.wrap}
      onClick={() => navigate(`/chats/${item.chatId}`)}
    >
      {item.username}
      {item.unreadCount ? (
        <span className={s.unread}>{item.unreadCount}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatItem;
