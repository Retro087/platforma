import React from "react";
import s from "./style.module.css";
const ProfileItem = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.title, props.value)}
      className={s.wrap}
    >
      <div className={s.title}>{props.title}</div>
      <div className={s.value_block}>
        <span className={s.value}>
          {props.value ? props.value : "Не указано"}
        </span>
      </div>
    </div>
  );
};

export default ProfileItem;
