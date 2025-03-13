import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllUsers } from "../../store/adminSlice";
import AdminHeaderContainer from "../Layouts/admin-header";
import DashboardSidebar from "./dashboard-sidebar";
import ContainerLayout from "../../layouts/container-layout";
import AdminUsers from "./admin-users";
import AdminProducts from "./admin-products";

const AdminDashboardContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    users: state.admin.users,
  }));

  const render = () => {
    switch (params.page) {
      case "users":
        return <AdminUsers />;

      case "products":
        return <AdminProducts />;

      default:
        break;
    }
  };

  const list = [
    { title: "Пользователи", link: "users" },
    { title: "Листинги", link: "products" },
    { title: "Покупки", link: "payments" },
    { title: "Выплаты", link: "payouts" },
  ];

  return (
    <div>
      <ContainerLayout alignItems="start" display="flex">
        <DashboardSidebar active={params.page} list={list} />
        <div
          style={{
            overflow: "scroll",
            height: "100vh",
            padding: "15px 35px 15px ",
            flex: 1,
            boxSizing: "border-box",
          }}
        >
          <AdminHeaderContainer />
          {render()}
        </div>
      </ContainerLayout>
    </div>
  );
};

export default AdminDashboardContainer;
