import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatsProductItem from "./stats-product-item";
import BlockTitle from "../../common/block-title";
import { useNavigate, useParams } from "react-router";
import { getMyProducts } from "../../../store/profileSlice";

const StatsSidebar = () => {
  const select = useSelector((state) => ({
    myProducts: state.profile.myProducts,
  }));
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProducts());
  }, []);
  const navigate = useNavigate();
  const callbacks = {
    onClick: (id) => navigate(`/stats/${id}`),
  };

  return (
    <div style={{ width: 400, marginRight: 25 }}>
      <BlockTitle title={"Мои товары"} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 15,
          boxSizing: "border-box",
        }}
      >
        <span style={{ flex: 1 }}>Id</span>
        <span style={{ flex: 1 }}>Название</span>
        <span style={{ flex: 1 }}>Описание</span>
        <span style={{ flex: 1 }}>Цена</span>
      </div>
      {select.myProducts.map((i, ind) => {
        return (
          <StatsProductItem
            onClick={callbacks.onClick}
            active={params.id}
            key={ind}
            item={i}
          />
        );
      })}
    </div>
  );
};

export default StatsSidebar;
