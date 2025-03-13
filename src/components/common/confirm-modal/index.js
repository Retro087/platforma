import React from "react";
import Button from "../Button";
import s from "./style.module.css";
const ConfirmModal = ({ onCancel, onConfirm }) => {
  return (
    <div className={s.wrap}>
      <div className={s.con}>
        <h2 className={s.title}>Вы уверены что хотите сделать это?</h2>
        <div className={s.btns}>
          <Button onClick={() => onConfirm()} value={"Подтвердить"} />
          <Button onClick={() => onCancel()} value={"Отмена"} bc="red" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
