import React, { useState } from "react";
import paymentService from "../../services/paymentService";

const Payment = ({ businessId = 1, amount = 500, buyerId = 1 }) => {
  const [message, setMessage] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  const handleCreatePayment = async () => {
    try {
      const data = await paymentService.createPayment({
        businessId,
        amount,
        buyerId,
      });
      setMessage("Перенаправление на страницу оплаты...");
      setPaymentUrl(data.confirmationUrl);
      setPaymentId(data.paymentId);
      window.location.href = data.confirmationUrl; // Redirect to  payment page
    } catch (error) {
      setMessage(error.message || "Ошибка при создании платежа.");
    }
  };

  return (
    <div>
      <button onClick={handleCreatePayment}>Оплатить через ЮKassa</button>
      {message && <p>{message}</p>}
      {paymentUrl && <p>Payment URL: {paymentUrl}</p>}
      {paymentId && <p>Payment ID: {paymentId}</p>}
    </div>
  );
};

export default Payment;
