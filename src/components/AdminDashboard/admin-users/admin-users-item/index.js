import React from "react";
import s from "./style.module.css";
import edit from "../../../../assets/pencil.png";
import delet from "../../../../assets/delete.png";
const AdminUsersItem = ({ item, setUpdate, setDelete }) => {
  return (
    <div className={s.wrap}>
      <span className={s.item}>{item.username || "-"}</span>
      <span className={s.item}>{item.phone || "-"}</span>
      <span className={s.item}>{item.email || "-"}</span>
      <span className={s.item}>{item.role || "-"}</span>
      <div className={s.actions}>
        <img onClick={() => setUpdate(item)} className={s.edit} src={edit} />

        <img onClick={() => setDelete(item.id)} className={s.del} src={delet} />
      </div>
    </div>
  );
};

export default AdminUsersItem;
