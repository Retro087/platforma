import React, { useState } from "react";
import s from "./style.module.css";
import Button from "../Button";
import Input from "../input";
const ModalWrap = ({ title, value, onCancel, onSave }) => {
  const [valueI, setValueI] = useState(value);
  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <div>
          <h2 className={s.title}>Изменить</h2>
        </div>
        <Input
          onChange={(e) => setValueI(e.target.value)}
          label={title}
          value={valueI}
        />
        <div className={s.btns}>
          <Button
            onClick={() => onSave(valueI)}
            color={"#FFF"}
            bc="rgb(152, 188, 255)"
            value={"Сохранить"}
          />
          <Button
            onClick={onCancel}
            color={"#FFF"}
            bc="rgb(255, 76, 76)"
            value={"Отменить"}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalWrap;
