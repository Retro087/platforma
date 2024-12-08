import React from "react";
import s from "./style.module.css";

const Header = (props) => {
  return (
    <div className={s.wrap}>
      <div className={s.logo}>
        <img />
      </div>
      <div className={s.profile}>
        {props.profile ? props.profile : <span>Профиля нет</span>}
      </div>
    </div>
  );
};

export default Header;
