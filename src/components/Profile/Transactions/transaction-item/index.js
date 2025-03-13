import React from "react";
import s from "./style.module.css";
const TransactionItem = ({ item }) => {
  return (
    <tr className={s.wrap}>
      <td className={s.item}>{item.id}</td>
      <td className={s.item}>{item.buyerId}</td>
      <td className={s.item}>{item.businessId}</td>
      <td className={s.item}>{item.sellerId}</td>
      <td className={s.item}>{item.amount}</td>
    </tr>
  );
};

export default TransactionItem;
