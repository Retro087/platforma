import React, { useState } from "react";
import s from "./style.module.css";
import arrow from "../arrow";
import Arrow from "../arrow";
const PriceFilter = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ padding: open ? "" : 0 }} className={s.price}>
        <div onClick={() => setOpen(!open)} className={s.title}>
          <span className={s.price_title}>Цена, руб</span>
          <Arrow isOpen={open} width={35} heigth={25} />
        </div>

        <div style={{ display: open ? "flex" : "none" }} className={s.inputs}>
          <div className={s.min}>
            <div className={s.container}>
              <span className={s.text}>От</span>
              <input
                className={s.input}
                value={props.min}
                onChange={(e) => props.handleChangeMin(e.target.value)}
              />
            </div>
          </div>
          <div className={s.max}>
            <div className={s.container}>
              <span className={s.text}>До</span>
              <input
                className={s.input}
                value={props.max == Infinity ? 0 : props.max}
                onChange={(e) => props.handleChangeMax(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
