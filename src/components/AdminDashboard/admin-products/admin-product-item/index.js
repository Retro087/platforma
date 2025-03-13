import React from "react";
import s from "./style.module.css";
import edit from "../../../../assets/pencil.png";
import delet from "../../../../assets/delete.png";
const AdminProductItem = ({ item, deleteProduct }) => {
  return (
    <div className={s.wrap}>
      <span className={s.item}>{item.id || "-"}</span>
      <span className={s.item}>{item.name || "-"}</span>
      <span className={s.item}>{item.short || "-"}</span>
      <span className={s.item}>{item.price || "-"}</span>
      <div className={s.actions}>
        <img
          onClick={() => deleteProduct(item.id)}
          className={s.del}
          src={delet}
        />
      </div>
    </div>
  );
};

export default AdminProductItem;
