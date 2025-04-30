import React from "react";
import s from "./style.module.css";
const BlockTitle = ({ title, fs }) => {
  return (
    <div style={{ fontSize: fs }} className={s.wrap}>
      {title}
    </div>
  );
};

export default BlockTitle;
