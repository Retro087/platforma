import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./chat-list";
import { io } from "socket.io-client";
import { addMessage, getMessages } from "../../store/chatSlice";
import { useParams } from "react-router";
import { socket } from "../../socket/socket";
import ContainerLayout from "../../layouts/container-layout";
import { getChats } from "../../store/chatsSlice";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const select = useSelector((state) => ({
    list: state.chat.list,
    load: state.chat.load,
    myId: state.auth.myId,
  }));

  useEffect(() => {
    dispatch(getMessages({ id: params.id, myId: select.myId }));
    dispatch(getChats(select.myId));
    socket.on("newMessage", (message) => {
      dispatch(addMessage(message.message));
    });
    return () => {
      socket.off("newMessage");
    };
  }, [params.id, select.myId]);

  const sendMessage = (content) => {
    socket.emit("sendMessage", {
      senderId: select.myId,
      recieverId: params.id,
      content: content,
      token: localStorage.getItem("token"),
    });
  };

  return (
    <ContainerLayout width={1120}>
      <ChatList myId={select.myId} send={sendMessage} list={select.list} />
    </ContainerLayout>
  );
};

export default ChatContainer;
