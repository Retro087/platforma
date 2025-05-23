import React, { useState } from "react";
import s from "./style.module.css";
import AuthInput from "../../common/input";
import card from "../../../assets/image.png";
import google from "../../../assets/google.png";
import apple from "../../../assets/devicon_apple.png";
const Registration = (props) => {
  const [data, setData] = useState({ login: "", password: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.auth(data);
      }}
      className={s.wrap}
    >
      <div className={s.container}>
        <div className={s.left}>
          <div className={s.left_card}>
            <div className={s.left_card_text}>
              <h1>Добро пожаловать в StarLine</h1>
              <p>С возвращением</p>
            </div>
            <img src={card} />
          </div>
        </div>
        <div className={s.rigth}>
          <div className={s.logo}>StarLine</div>
          <h1 className={s.title}>Войти в аккаунт </h1>
          <AuthInput
            value={data.login}
            ph="email@gmail.com"
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Электронная почта"}
          />
          <AuthInput
            value={data.password}
            ph="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label={"Пароль"}
          />
          <div className={s.btn_block}>
            <button
              style={{ marginBottom: 50 }}
              type={"submit"}
              className={s.btn}
            >
              Войти
            </button>
          </div>
          <div className={s.spacer}>
            <span>Или</span>
          </div>
          <div className={s.btn_block}>
            <button
              style={{
                marginBottom: 10,
                gap: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="button"
              className={s.btn}
            >
              <img src={google} />
              Google
            </button>
            <button
              type="button"
              className={s.btn}
              style={{
                gap: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={apple} />
              Apple
            </button>
          </div>
          <div className={s.reg} onClick={() => props.toReg()}>
            Нет аккаута? <span>Зарегистрируйся</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Registration;
