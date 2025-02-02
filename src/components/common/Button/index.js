import React from "react";
import s from "./style.module.css";
const Button = ({
  value,
  bc = "#194fff",
  color = "white",
  width = 150,
  heigth = 40,
  border = "none",
  marginb = "none",
  mr = "none",
  fs = "15px",
  fw = "400",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={s.wrap}
      style={{
        color: color,
        width: width,
        height: heigth,
        backgroundColor: bc,
        border: border,
        marginBottom: marginb,
        fontSize: fs,
        fontWeight: fw,
        marginRight: mr,
      }}
    >
      {value}
    </button>
  );
};

export default Button;
