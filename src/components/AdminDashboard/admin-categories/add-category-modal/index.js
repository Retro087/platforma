import React, { useState } from "react";
import Input from "../../../common/input";
import Button from "../../../common/Button";
import s from "./style.module.css";
const AddCategoryModal = ({ onSave, setOpen }) => {
  const [value, setValue] = useState("");
  return (
    <div className={s.wrap}>
      <div className={s.con}>
        <Input
          value={value}
          label={"Новая категория"}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              onSave(value);
              setOpen(false);
            }}
            value={"Добавить"}
          />
          <Button
            onClick={() => {
              setOpen(false);
            }}
            bc="red"
            value={"Отмена"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
