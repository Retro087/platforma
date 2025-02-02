import React from "react";
import s from "./style.module.css";

const GridLayout = ({ columns, children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
      className={s.wrap}
    >
      {children}
    </div>
  );
};

export default GridLayout;
