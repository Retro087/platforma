import React from "react";
import s from "./style.module.css";
const HeroSection = () => {
  return (
    <div className={s.wrap}>
      <div className={s.img}></div>
      <p className={s.text}>Крутая платформа</p>
    </div>
  );
};

export default HeroSection;
