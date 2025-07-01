import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Login from "./login";
import Registration from "./registration";
import { clearErr, fetchAuth, fetchReg } from "../../store/authSlice";
import Error from "../common/error";

const AuthContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [reg, setReg] = useState(false);
  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    err: state.auth.err,
  }));

  const callbacks = {
    auth: useCallback((auth) => dispatch(fetchAuth(auth)), []),
    reg: useCallback((auth) => dispatch(fetchReg(auth)), []),
    toReg: () => {
      setReg(true);
    },
    toAuth: () => {
      setReg(false);
    },
    toAuthGoogle: () => {
      window.location = "http://localhost:5000/auth/google";
    },
  };

  useEffect(() => {
    if (select.isAuth) {
      return navigate("/");
    }
  }, [select.isAuth]);

  useEffect(() => {
    if (select.err) {
      setTimeout(() => dispatch(clearErr()), 5000);
    }
  }, [select.err]);

  return (
    <div>
      {reg ? (
        <Registration
          toAuthGoogle={callbacks.toAuthGoogle}
          reg={callbacks.reg}
          toAuth={callbacks.toAuth}
        />
      ) : (
        <Login
          toAuthGoogle={callbacks.toAuthGoogle}
          auth={callbacks.auth}
          toReg={callbacks.toReg}
        />
      )}
      {select.err ? <Error err={select.err} /> : ""}
    </div>
  );
};

export default AuthContainer;
