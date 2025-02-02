import React, { useState } from "react";
import s from "./style.module.css";

import PriceFilter from "../price-filter";
const Filters = (props) => {
  return (
    <div className={s.wrap}>
      <PriceFilter
        handleChangeMin={props.handleChangeMin}
        handleChangeMax={props.handleChangeMax}
        min={props.min}
        max={props.max}
      />
    </div>
  );
};

export default Filters;
