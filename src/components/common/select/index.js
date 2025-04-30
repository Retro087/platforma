import React, { useState } from "react";
import s from "./style.module.css";
const Select = ({
  onChange,
  w = 150,
  h = 25,
  mb = 15,
  name,
  onBlur,
  value,
  label,
  children,
}) => {
  const [active, setActive] = useState(false);
  return (
    <div className={s.wrap}>
      <label style={{ color: active ? "#8fadff" : "#000" }} className={s.label}>
        {label}
      </label>
      <select
        style={{
          width: w,
          height: h,
          marginBottom: mb,
          borderColor: active ? "#8fadff" : "#dadada",
        }}
        onClick={() => setActive(!active)}
        className={s.select}
        onChange={(e) => {
          onChange(e);
        }}
        name={name}
        onBlur={(e) => {
          setActive(false);
          if (onBlur) {
            onBlur(e);
          }
        }}
        value={value}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
