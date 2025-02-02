import React, { useState } from "react";
import s from "./style.module.css";
import AuthInput from "../../common/input";
const Registration = (props) => {
  const [data, setData] = useState({ login: "", password: "", name: "" });

  return (
    <div className={s.wrap}>
      <div className={s.container}>
        <div className={s.left}>
          <h2 className={s.left_title}>
            Зарегистрируйтесь, чтобы иметь возможность:
          </h2>
          <ul className={s.left_list}>
            <li className={s.left_item}>Добавлять в избранное</li>
            <li className={s.left_item}>Писать продавцам</li>
            <li className={s.left_item}>Размещать товары</li>
          </ul>
        </div>
        <div className={s.rigth}>
          <AuthInput
            value={data.login}
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Логин"}
          />
          <AuthInput
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label={"Пароль"}
          />
          <AuthInput
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            label={"Имя"}
          />
          <div className={s.btn_block}>
            <button onClick={() => props.reg(data)} className={s.btn}>
              Зарегистрироваться
            </button>
          </div>
          <div className={s.reg} onClick={() => props.toAuth()}>
            Войти
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
