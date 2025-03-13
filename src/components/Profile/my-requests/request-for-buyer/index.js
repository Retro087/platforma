import React, { useState } from "react";
import s from "./style.module.css";
import paymentService from "../../../../services/paymentService";
const RequestForBuyer = ({ item, myId, confirmTransferBuyer }) => {
  let pay = async () => {
    const data = await paymentService.createPayment({
      businessId: item.businessId,
      amount: item.price,
      buyerId: item.buyerId,
      purchaseRequestId: item.id,
    });
    window.location.href = data.confirmationUrl;
  };

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
      className={s.wrap}
    >
      <td className={s.item}>{item.id}</td>
      <td className={s.item}>{item.buyerId}</td>
      <td className={s.item}>{item.businessId}</td>
      <td className={s.item}>{item.sellerId}</td>
      <td className={s.item}>{item.amount}</td>
      <td className={s.item}>{item.status}</td>
      {item.status === "accepted" || item.status === "awaiting_payment" ? (
        <button onClick={() => pay()}>Оплатить</button>
      ) : (
        ""
      )}
      {item.status === "assets_transferred" ? (
        <button onClick={() => confirmTransferBuyer(item.assetTransferId)}>
          Подтвердите передачу активов
        </button>
      ) : (
        ""
      )}
      {item.status === "paid" ? <td>Ожидайте передачи активов</td> : ""}
    </tr>
  );
};

export default RequestForBuyer;
