import React from "react";
import { useSelector } from "react-redux";
import HeaderInner from "./header-inner";

const AdminHeaderContainer = () => {
  const select = useSelector((state) => ({
    profile: state.auth.profile,
  }));
  return (
    <div>
      <HeaderInner profile={select.profile} />
    </div>
  );
};

export default AdminHeaderContainer;
