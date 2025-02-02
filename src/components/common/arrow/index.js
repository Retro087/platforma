import React from "react";
import s from "./style.module.css";
import arr from "../../../assets/arrow.png";
const Arrow = ({ width = 35, heigth = 25, isOpen }) => {
  return (
    <div
      className={s.wrap}
      style={{
        width: width,
        height: heigth,
        transform: isOpen ? "rotate(180deg)" : "none",
      }}
    >
      <img src={arr} />
    </div>
  );
};

export default Arrow;
