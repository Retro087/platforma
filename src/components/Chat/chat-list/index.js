import React, { useState } from "react";
import s from "./style.module.css";
import Message from "./message";
const ChatList = ({ list, send, myId, active }) => {
  const [value, setValue] = useState("");

  const sendMes = () => {
    if (value.length && active) {
      send(value, active);
      setValue("");
    }
  };

  if (!active) {
    return (
      <div className={s.wrap_empty}>
        <span className={s.empty}>Выберите или добавьте новый чат</span>
      </div>
    );
  }
  return (
    <div className={s.wrap}>
      <div className={s.content}>
        {list.length
          ? list.map((i, index) => {
              return <Message myId={myId} key={index} item={i} />;
            })
          : ""}
      </div>
      <div className={s.input_group}>
        <input
          className={s.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className={s.btn} onClick={() => sendMes()}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatList;
