import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBuyerTransactions,
  getSellerTransactions,
} from "../../../store/transactionSlice";
import BlockTitle from "../../common/block-title";
import Button from "../../common/Button";
import TransactionTable from "./transaction-table";

const TransactionsContainer = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    transactions: state.transactions.list,
  }));
  const [page, setPage] = useState("seller");
  const tableHeaders = [
    "Id сделки",
    "Id покупателя",
    "Id товара",
    "Id продавца",
    "Цена",
  ];

  useEffect(() => {
    if (page === "seller") {
      dispatch(getSellerTransactions());
    } else {
      dispatch(getBuyerTransactions());
    }
  }, [page]);

  return (
    <div style={{ flex: 1 }}>
      <BlockTitle title={"Успешные сделки"} />
      <Button mr="15px" value={"Проданные"} onClick={() => setPage("seller")} />
      <Button value={"Купленные"} onClick={() => setPage("buyer")} />
      <TransactionTable
        transactions={select.transactions}
        tableHeaders={tableHeaders}
      />
    </div>
  );
};

export default TransactionsContainer;
