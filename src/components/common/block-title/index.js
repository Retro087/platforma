import React from "react";
import s from "./style.module.css";
const BlockTitle = ({ title }) => {
  return <div className={s.wrap}>{title}</div>;
};

export default BlockTitle;
