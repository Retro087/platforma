import React, { useEffect } from "react";
import { Route, Redirect, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateRoute = ({ children, requiredRole, ...rest }) => {
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    role: state.auth.role,
  }));

  useEffect(() => {

  })


  // Если все проверки пройдены, отображаем компонент
  return <>{children}</>;
};

export default PrivateRoute;
