import React from "react";
import s from "./style.module.css";

const ContainerLayout = ({
  width,
  alignItems = "center",
  justify = "start",
  h = "100%",
  display = "block",
  children,
}) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: h,
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
