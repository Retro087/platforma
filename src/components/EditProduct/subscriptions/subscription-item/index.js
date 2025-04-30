import React from "react";
import s from "./style.module.css";
const SubscriptionItem = ({ item }) => {
  return (
    <div className={s.wrap}>
      <div className={s.leftside}>
        <div>
          <h2 className={s.title}>{item.title}</h2>
          <span className={s.price}>{item.price}</span>
          <span className={s.price_type}>USD/month</span>
        </div>

        <p className={s.description}>{item.description}</p>
      </div>
      <div className={s.rigthside}>
        <img className={s.img} src={item.img} />
      </div>
    </div>
  );
};

export default SubscriptionItem;
