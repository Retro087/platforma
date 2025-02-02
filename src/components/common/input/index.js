import React, { useState } from "react";
import s from "./style.module.css";
const Input = ({ label, onChange, value }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={s.input_block}>
      <label
        style={{ color: active.login ? "#8fadff" : "#000" }}
        className={s.label}
      >
        {label}
      </label>
      <input
        onBlur={() => setActive({ ...active, login: false })}
        style={{ borderColor: active.login ? "#8fadff" : "#dadada" }}
        onFocus={() => setActive({ ...active, login: true })}
        className={s.input}
        onChange={(e) => onChange(e)}
        value={value}
      />
    </div>
  );
};

export default Input;
