import React from "react";
import s from "./style.module.css";
import Button from "../../../common/Button";

const ArticleBuyCard = ({ price, title }) => {
  return (
    <div className={s.wrap}>
      <div className={s.img}>
        <span className={s.img_title}>{title}</span>
      </div>
      <div className={s.con}>
        <div className={s.priceBlock}>
          <span className={s.title}>Ориентировачная цена</span>
          <span className={s.price}>{price} руб</span>
        </div>
        <div className={s.btns}>
          <Button
            value={"Связаться с продавцом"}
            fs="16px"
            width={"100%"}
            bc="#3744ff"
            color={"#FFF"}
            marginb="15px"
            fw="500"
          />
          <Button
            value={"Сделать предлоджение"}
            width={"100%"}
            bc="#3744ff"
            color={"#FFF"}
            fs="16px"
            fw="500"
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleBuyCard;
