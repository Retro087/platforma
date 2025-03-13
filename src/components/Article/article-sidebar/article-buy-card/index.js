import React, { useState } from "react";
import s from "./style.module.css";
import Button from "../../../common/Button";
import { useNavigate } from "react-router";
import paymentService from "../../../../services/paymentService";
import { currencyFormat } from "../../../../utils/CurrencyFormat";

const ArticleBuyCard = ({
  price,
  title,
  item,
  id,
  author,
  createChat,
  myId,
  createRequest,
  buy,
  request,
}) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  /*const handleCreatePayment = async () => {
    try {
      const data = await paymentService.createPayment({
        businessId: id,
      });

      window.location.href = data.confirmationUrl; // Redirect to  payment page
    } catch (error) {
      setMessage(error.message || "Ошибка при создании платежа.");
    }
  };*/

  const handleContactSeller = async () => {
    try {
      const response = await createChat(myId, author); // Дожидаемся ответа

      if (response.payload.result === 0) {
        // Успешно создан или найден чат
        const chatId = response.payload.chat.id;
        navigate(`/chats/${chatId}`); // Перенаправляем на страницу чата
      } else {
        // Обработка ошибок (например, нет ответа или нет поля selected)
        console.error("Ошибка при создании чата:", response);
        alert("Не удалось создать чат. Попробуйте позже.");
      }
    } catch (error) {
      // Обработка ошибок (например, ошибка сети)
      console.error("Ошибка при создании чата:", error);
      alert("Произошла ошибка при создании чата.");
    }
  };
  return (
    <div className={s.wrap}>
      <div className={s.img}>
        <span className={s.img_title}>{title}</span>
      </div>
      <div className={s.con}>
        <div className={s.priceBlock}>
          <span className={s.title}>Ориентировачная цена</span>
          <span className={s.price}>{currencyFormat(price)} руб</span>
        </div>
        {author === myId ? (
          <div className={s.forAuthor}>
            <Button
              value={"Изменить"}
              width={"100%"}
              marginb="15px"
              onClick={() => navigate(`/product/edit/${item.id}`)}
            />
            <span>Просмотры: {item.views_count}</span>
            <span>В избранном: {item.favorites_count || 0}</span>
          </div>
        ) : (
          <div className={s.btns}>
            <Button
              value={"Связаться с продавцом"}
              onClick={handleContactSeller}
              fs="16px"
              width={"100%"}
              bc="#3744ff"
              color={"#FFF"}
              marginb="15px"
              fw="500"
            />
            {request?.status ? (
              <Button
                value={request.status}
                fs="16px"
                width={"100%"}
                bc={"rgb(190, 192, 197)"}
                color={"#FFF"}
                marginb="15px"
                fw="500"
              />
            ) : (
              <>
                <Button
                  onClick={() => createRequest()}
                  value={"Сделать предлоджение"}
                  width={"100%"}
                  bc="#3744ff"
                  color={"#FFF"}
                  fs="16px"
                  marginb="15px"
                  fw="500"
                />
                <Button
                  onClick={() => buy()}
                  value={"Купить"}
                  width={"100%"}
                  bc="#3744ff"
                  color={"#FFF"}
                  fs="16px"
                  fw="500"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleBuyCard;
