import React, { useState } from "react";
import Input from "../../../common/input";
import s from "./style.module.css";
import Button from "../../../common/Button";
const AdminUpdateModal = ({ i, update, setUpdate, isCreate }) => {
  const [localItem, setLocalItem] = useState(i);

  return (
    <div className={s.wrap}>
      <div className={s.con}>
        <h2 className={s.title}>{isCreate ? "Создание" : "Изменение"}</h2>
        {Object.keys(i).map((i) => {
          return (
            <Input
              label={i}
              value={localItem[i]}
              onChange={(e) =>
                setLocalItem((prev) => ({ ...prev, [i]: e.target.value }))
              }
            />
          );
        })}
        <div className={s.btns}>
          <Button
            onClick={() => {
              update(!isCreate ? { id: i.id, data: localItem } : localItem);
              setUpdate(false);
            }}
            value={"Сохранить"}
          />
          <Button
            onClick={() => setUpdate(false)}
            value={"Отменить"}
            bc="red"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateModal;
