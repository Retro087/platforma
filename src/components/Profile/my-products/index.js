import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlockTitle from "../../common/block-title";
import MyProductsItem from "./my-products-item";
import { addCategory } from "../../../store/categoriesSlice";
import { getMyProducts } from "../../../store/profileSlice";

const MyProducts = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    products: state.profile.myProducts,
  }));

  useEffect(() => {
    dispatch(getMyProducts());
    dispatch(addCategory("Новая категория"));
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <BlockTitle title={"Мои объявления"} />
      {select.products.length ? (
        select.products.map((i) => {
          return <MyProductsItem item={i} />;
        })
      ) : (
        <div>Пусто</div>
      )}
    </div>
  );
};

export default MyProducts;
