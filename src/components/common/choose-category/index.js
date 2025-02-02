import React, { useState } from "react";
import s from "./style.module.css";
import { Link } from "react-router";
const ChooseCategory = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={s.wrap}>
      <button className={s.btn} onClick={() => setOpen(!open)}>
        Категории
      </button>

      {open ? (
        <div className={s.categories}>
          {props.list.map((i, index) => {
            return (
              <Link to={`/${i.Category}`} key={index} className={s.item}>
                {i.Category}
              </Link>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChooseCategory;
