import React from "react";
import s from "./style.module.css";
const Error = ({ err }) => {
  return <div className={s.wrap}>{err}</div>;
};

export default Error;
