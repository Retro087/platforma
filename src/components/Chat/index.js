import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./chat-list";
import { io } from "socket.io-client";
import { addMessage, getMessages } from "../../store/chatsSlice";
import { useParams } from "react-router";
import { socket } from "../../socket/socket";
import ContainerLayout from "../../layouts/container-layout";
import { getChats } from "../../store/chatsSlice";
import ChatSidebar from "./chat-sidebar";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const select = useSelector((state) => ({
    messages: state.chats.messages,
    load: state.chats.load,
    myId: state.auth.myId,
    selected: state.chats.selectedChat,
  }));

  useEffect(() => {
    if (params.id) {
      dispatch(getMessages(params.id));
      socket.on("newMessage", (message) => {
        dispatch(addMessage(message.message));
      });
      return () => {
        socket.off("newMessage");
      };
    }
  }, [select.myId, select.selected, params.id]);

  const sendMessage = (content, chatId) => {
    socket.emit("sendMessage", {
      senderId: select.myId,

      chatId,
      content: content,
      token: localStorage.getItem("token"),
    });
  };

  return (
    <ContainerLayout alignItems="start" display="flex" width={1140}>
      <ChatSidebar acitve={params.id} />
      <ChatList
        active={params.id}
        myId={select.myId}
        send={sendMessage}
        list={select.messages}
      />
    </ContainerLayout>
  );
};

export default ChatContainer;
