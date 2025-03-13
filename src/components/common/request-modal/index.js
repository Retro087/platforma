import React, { useState } from "react";
import Button from "../Button";
import s from "./style.module.css";
import Input from "../input";
const RequestModal = ({ onCancel, onConfirm }) => {
  const [price, setPrice] = useState("");

  return (
    <div className={s.wrap}>
      <div className={s.con}>
        <h2 className={s.title}>Введите предлагаемую цену:</h2>
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          label={"Цена"}
        />
        <div className={s.btns}>
          <Button onClick={() => onConfirm(price)} value={"Подтвердить"} />
          <Button onClick={() => onCancel()} value={"Отмена"} bc="red" />
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
