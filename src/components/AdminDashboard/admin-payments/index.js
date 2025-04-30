import React, { useEffect } from "react";
import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllpayments } from "../../../store/adminSlice";

const AdminPayments = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    payments: state.admin.payments,
  }));

  useEffect(() => {
    dispatch(getAllpayments());
  }, []);

  return (
    <div>
      {select.payments.map((i) => {
        return <div>{i.id}</div>;
      })}
    </div>
  );
};

export default AdminPayments;
