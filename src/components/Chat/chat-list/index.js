import React, { useEffect, useRef, useState } from "react";
import s from "./style.module.css";
import Message from "./message";
const ChatList = ({ list, send, myId, active, markAsRead }) => {
  const [value, setValue] = useState("");
  const chatContainerRef = useRef(null); //  Создаем реф для контейнера чата

  //  Функция для прокрутки к низу
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
      //  Прокрутка к низу
    }
  };

  const sendMes = () => {
    if (value.length && active) {
      send(value, active);
      setValue("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [list]);

  if (!active) {
    return (
      <div className={s.wrap_empty}>
        <span className={s.empty}>Выберите или добавьте новый чат</span>
      </div>
    );
  }
  return (
    <div className={s.wrap}>
      <div ref={chatContainerRef} className={s.content}>
        {list.length
          ? list.map((i, index) => {
              return (
                <Message
                  markAsRead={markAsRead}
                  myId={myId}
                  key={index}
                  item={i}
                />
              );
            })
          : ""}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMes();
        }}
        className={s.input_group}
      >
        <input
          className={s.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className={s.btn} onClick={() => sendMes()}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default ChatList;
