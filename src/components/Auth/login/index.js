import React, { useState } from "react";
import s from "./style.module.css";
import AuthInput from "../../common/input";
import Input from "../../common/input";
const Login = (props) => {
  const [data, setData] = useState({ login: "", password: "" });

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <div className={s.left}>
          <h2 className={s.left_title}>Войдите, чтобы иметь возможность:</h2>
          <ul className={s.left_list}>
            <li className={s.left_item}>Добавлять в избранное</li>
            <li className={s.left_item}>Писать продавцам</li>
            <li className={s.left_item}>Размещать товары</li>
          </ul>
        </div>
        <div className={s.rigth}>
          <Input
            value={data.login}
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Логин"}
          />
          <Input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label={"Пароль"}
          />
          <div onClick={() => props.auth(data)} className={s.btn_block}>
            <button className={s.btn}>Войти</button>
          </div>

          <div className={s.reg} onClick={props.toReg}>
            Зарегистрироваться
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
