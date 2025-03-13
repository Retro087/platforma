import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../store/adminSlice";
import AdminProductItem from "./admin-product-item";
import { deleteProduct, updateProduct } from "../../../store/articlesSlice";

const AdminProducts = () => {
  const select = useSelector((state) => ({
    products: state.admin.products,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const callbacks = {
    update: ({ id, data }) => {
      dispatch(updateProduct({ id, data }));
    },
    deleteProduct: (id) => {
      dispatch(deleteProduct(id));
    },
  };
  return (
    <div>
      {select.products.map((i) => {
        return <AdminProductItem {...callbacks} item={i} />;
      })}
    </div>
  );
};

export default AdminProducts;
