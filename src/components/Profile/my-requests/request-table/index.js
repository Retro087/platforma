import React from "react";
import s from "./style.module.css";
import Request from "../request-for-seller";
import RequestForSeller from "../request-for-seller";
import RequestForBuyer from "../request-for-buyer";
const RequestTable = ({
  tableHeaders,
  requests,
  myid,
  confirm,
  reject,
  createTransfer,
  confirmTransferBuyer,
  confirmTransferSeller,
}) => {
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
          {requests.map((item) => {
            if (item.sellerId === myid) {
              return (
                <RequestForSeller
                  confirm={confirm}
                  reject={reject}
                  myId={myid}
                  key={item.id}
                  item={item}
                  createTransfer={createTransfer}
                  confirmTransferSeller={confirmTransferSeller}
                />
              );
            }
            return (
              <RequestForBuyer
                confirmTransferBuyer={confirmTransferBuyer}
                item={item}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
