import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequest,
  confirmForBuyer,
  confirmForSeller,
  createTransfer,
  getRequests,
  rejectRequest,
  updateStatus,
} from "../../../store/purchaseRequests";
import Request from "./request-for-seller";
import BlockTitle from "../../common/block-title";
import RequestTable from "./request-table";
import { useNavigate, useParams } from "react-router";
import Button from "../../common/Button";

const MyRequests = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    requests: state.purchase.requests,
    myId: state.auth.myId,
  }));
  const [sort, setSort] = useState(null);
  useEffect(() => {
    // Получаем параметр sort из URL
    if (sort === "incoming" || sort === "outgoing") {
      dispatch(getRequests(sort)); // Передаем "incoming" или "outgoing" в getRequests
    } else {
      dispatch(getRequests()); // Если параметр отсутствует или невалиден, получаем все запросы
    }
  }, [sort]);

  const callbacks = {
    confirm: (id) => {
      dispatch(acceptRequest(id));
    },
    reject: (id) => {
      dispatch(rejectRequest(id));
    },
    pay: () => {
      dispatch(PaymentRequest);
    },
    confirmTransferBuyer: (transferId) => {
      dispatch(confirmForBuyer(transferId));
    },
    confirmTransferSeller: (transferId) => {
      dispatch(confirmForSeller(transferId));
    },
    createTransfer: (purchaseRequestId, description) => {
      dispatch(createTransfer({ purchaseRequestId, description }));
    },
    handleSortChange: (newSort) => {
      setSort(newSort);
      // Обновляем URL с новым параметром сортировки
      // Используем navigate для изменения URL
    },
  };

  const tableHeaders = [
    "Id запроса",
    "Id покупателя",
    "Id товара",
    "Id продавца",
    "Цена",
    "Статус",
  ];
  return (
    <div style={{ flex: 1 }}>
      <BlockTitle title={"Запросы на покупку"} />
      <div>
        <Button
          value={"Входящие"}
          mr="15px"
          onClick={() => callbacks.handleSortChange("incoming")}
        />
        <Button
          value={"Исходящие"}
          mr="15px"
          onClick={() => callbacks.handleSortChange("outgoing")}
        />
        <Button
          value={"Все"}
          mr="15px"
          onClick={() => callbacks.handleSortChange(null)}
        />
      </div>
      <RequestTable
        myid={select.myId}
        requests={select.requests}
        tableHeaders={tableHeaders}
        {...callbacks}
      />
    </div>
  );
};

export default MyRequests;
