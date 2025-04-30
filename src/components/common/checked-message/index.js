import React from "react";
import s from "./style.module.css";
import addMessage from "../../../assets/addMessage.png";
import readMess from "../../../assets/read.png";
const CheckedMessage = ({ isRead }) => {
  return (
    <div className={s.read}>
      <img src={isRead ? readMess : addMessage} />
    </div>
  );
};

export default CheckedMessage;
