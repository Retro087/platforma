import React from "react";
import { useSelector } from "react-redux";
import SubscriptionItem from "./subscription-item";

const Subscriptions = () => {
  const select = useSelector((state) => ({
    subs: state.subs.list,
  }));
  return (
    <div>
      {select.subs.map((i) => {
        return <SubscriptionItem item={i} />;
      })}
    </div>
  );
};

export default Subscriptions;
