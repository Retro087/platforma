import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../../store/chatsSlice";
import s from "./style.module.css";
import ChatItem from "./chat-item";
import BlockTitle from "../../common/block-title";
const ChatSidebar = ({ acitve, chats }) => {
  const dispatch = useDispatch();

  return (
    <div className={s.wrap}>
      <BlockTitle title={"Чаты"} />
      {chats.map((i, ind) => {
        return <ChatItem active={acitve} key={ind} item={i} />;
      })}
    </div>
  );
};

export default ChatSidebar;
