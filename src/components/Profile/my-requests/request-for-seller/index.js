import React, { useState } from "react";
import s from "./style.module.css";
const RequestForSeller = ({
  item,
  myId,
  confirm,
  reject,
  confirmTransferSeller,
  createTransfer,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <tr
      style={{
        backgroundColor:
          item.status === "rejected"
            ? "rgb(255, 232, 232)"
            : item.status === "accepted"
            ? "rgb(177, 255, 197)"
            : "rgb(221, 244, 255)",
      }}
      onClick={() => setOpen(!open)}
      className={s.wrap}
    >
      <td className={s.item}>{item.id}</td>
      <td className={s.item}>{item.buyerId}</td>
      <td className={s.item}>{item.businessId}</td>
      <td className={s.item}>{item.sellerId}</td>
      <td className={s.item}>{item.amount}</td>
      <td className={s.item}>{item.status}</td>
      {item.sellerId == myId && item.status == "pending" ? (
        <td onClick={() => setOpen(!open)} className={s.item}>
          ...
        </td>
      ) : (
        <td></td>
      )}
      {open && item.status == "pending" ? (
        <div className={s.modal}>
          <div onClick={() => confirm(item.id)} className={s.modalItem}>
            Принять
          </div>
          <div onClick={() => reject(item.id)} className={s.modalItem}>
            Отказ
          </div>
        </div>
      ) : (
        ""
      )}
      {item.status === "paid" ? (
        <button onClick={() => createTransfer(item.id)}>
          Подтвердите передачу активов
        </button>
      ) : (
        ""
      )}
      {item.status === "assets_confirmed" ? (
        <button onClick={() => confirmTransferSeller(item.assetTransferId)}>
          Подтвердите получение средств
        </button>
      ) : (
        ""
      )}
    </tr>
  );
};

export default RequestForSeller;
