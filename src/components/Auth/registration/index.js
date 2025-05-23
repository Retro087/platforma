import React, { useState } from "react";
import s from "./style.module.css";
import AuthInput from "../../common/input";
import card from "../../../assets/image 21.png";
import google from "../../../assets/google.png";
import apple from "../../../assets/devicon_apple.png";
const Registration = (props) => {
  const [data, setData] = useState({ login: "", password: "", name: "" });
  const [step, setStep] = useState(1);

  const getInputByStep = () => {
    switch (step) {
      case 1:
        return (
          <AuthInput
            value={data.login}
            ph="email@gmail.com"
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Электронная почта"}
          />
        );
      case 2:
        return (
          <AuthInput
            value={data.password}
            ph="password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label={"Пароль"}
          />
        );
      case 3:
        return (
          <AuthInput
            value={data.name}
            ph="Name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            label={"Имя"}
          />
        );
      default:
        return (
          <AuthInput
            value={data.login}
            ph="email@gmail.com"
            onChange={(e) => setData({ ...data, login: e.target.value })}
            label={"Электронная почта"}
          />
        );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.reg(data);
      }}
      className={s.wrap}
    >
      <div className={s.container}>
        <div className={s.left}>
          <div className={s.left_card}>
            <div className={s.left_card_text}>
              <h1>Добро пожаловать в StarLine</h1>
              <p>Создайте свой продукт </p>
            </div>
            <img src={card} />
          </div>
        </div>
        <div className={s.rigth}>
          <div className={s.logo}>StarLine</div>
          <h1 className={s.title}>Создай свой аккаунт</h1>
          {getInputByStep()}

          <div className={s.btn_block}>
            <button
              style={{ marginBottom: 50 }}
              type={"button"}
              onClick={
                step !== 3 ? () => setStep(step + 1) : () => props.reg(data)
              }
              className={s.btn}
            >
              {step === 3 ? "Зарегистрироваться" : "Далее"}
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
          <div className={s.reg} onClick={() => props.toAuth()}>
            Уже есть аккаунт? <span>Войдите в него</span>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Registration;
