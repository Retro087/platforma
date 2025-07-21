import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./chat-list";
import { io } from "socket.io-client";
import { addMessage, getMessages, readMessage } from "../../store/chatsSlice";
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
    chats: state.chats.chats,
  }));

  useEffect(() => {
    if (params.id) {
      dispatch(getMessages(params.id));

      const handleNewMessage = (message) => {
        dispatch(addMessage(message.message));
      };

      const handleMessageError = (error) => {
        console.error("Message error:", error);
        //  Обработка ошибки (например, отображение сообщения пользователю)
        alert(`Error: ${error.message}`);
      };
      const handleMessageRead = ({ messageId, chatId, userId }) => {
        //  Проверяем, что сообщение относится к текущему чату
        if (params.id === chatId) {
          dispatch(readMessage({ messageId, userId }));
        }
      };

      socket.on("newMessage", handleNewMessage);
      socket.on("messageError", handleMessageError);
      socket.on("message_read", handleMessageRead);

      // Присоединяемся к комнате (чату)
      socket.emit("join_room", { id: params.id });

      return () => {
        socket.off("newMessage", handleNewMessage);
        socket.off("messageError", handleMessageError);
        socket.off("message_read", handleMessageRead);
        // socket.off("join_room");  Не нужно отписываться от join_room, т.к. это происходит один раз при подключении к чату
      };
    }
  }, [select.myId, params.id]);

  const sendMessage = async (content, chatId) => {
    try {
      //  Получаем токен (например, из Redux или localStorage)
      //  Функция для получения токена

      await socket.emit("sendMessage", {
        senderId: select.myId,
        recieverId: params.reciever,
        chatId: chatId,
        content: content,
        token: "token",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  const markAsRead = (messageId) => {
    socket.emit("mark_as_read", {
      messageId,
      userId: select.myId,
      chatId: params.id,
    });
  };

  if (!select.chats.length) {
    return (
      <ContainerLayout h="800px" width={1140}>
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #FFF",
            borderRadius: 10,
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#000",
              padding: 10,
              backgroundColor: "#FFF",
              borderRadius: 10,
              position: "absolute",
              top: "40%",
            }}
          >
            У вас нет активных чатов
          </span>
        </div>
      </ContainerLayout>
    );
  }

  return (
    <ContainerLayout alignItems="stretch" h="800px" display="flex" width={1140}>
      <ChatSidebar acitve={params.id} />
      <ChatList
        markAsRead={markAsRead}
        active={params.id}
        myId={select.myId}
        send={sendMessage}
        list={select.messages}
      />
    </ContainerLayout>
  );
};

export default ChatContainer;
