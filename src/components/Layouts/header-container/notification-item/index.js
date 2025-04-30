import React from "react";
import { DateFormat } from "../../../../utils/DateFormat";
import s from "./style.module.css";
const NotificationItem = ({ notification }) => {
  return (
    <div
      style={{ backgroundColor: notification.isRead ? "" : "#dadada" }}
      className={s.wrap}
    >
      <span className={s.mes}>{notification.message}</span>
      <span className={s.date}>{DateFormat(notification.createdAt)}</span>
    </div>
  );
};

export default NotificationItem;
