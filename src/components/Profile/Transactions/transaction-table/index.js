import React from "react";
import TransactionItem from "../transaction-item";
import s from "./style.module.css";
const TransactionTable = ({ tableHeaders, transactions }) => {
  return (
    <div>
      <table className={s.table}>
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => {
            return <TransactionItem item={item} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
