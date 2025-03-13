import React from "react";
import s from "./style.module.css";

const ContainerLayout = ({
  width,
  alignItems = "center",
  justify = "start",

  display = "block",
  children,
}) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "100%",
        display: display,
        alignItems: alignItems,
        justifyContent: justify,
      }}
      className={s.wrap}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;
