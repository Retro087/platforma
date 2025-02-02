import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const WithAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
  }));

  useEffect(() => {
    if (!select.isAuth) {
      navigate("/auth");
    }
  }, [select.isAuth]);

  return <div>{children}</div>;
};

export default WithAuth;
