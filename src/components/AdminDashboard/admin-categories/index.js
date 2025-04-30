import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../../store/categoriesSlice";
import s from "./style.module.css";
import CategoryItem from "./category-item";
import BlockTitle from "../../common/block-title";
import CategoriesList from "./categories-list";
import AddCategoryModal from "./add-category-modal";
import ConfirmModal from "../../common/confirm-modal";
import add from "../../../assets/add.png";
import AddItem from "../../common/add-item";
const AdminCategories = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const select = useSelector((state) => ({
    categories: state.categories.list,
  }));

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const callbacks = {
    addCategory: (value) => {
      dispatch(addCategory(value));
    },
    deleteCategory: (id) => {
      dispatch(deleteCategory(id));
    },
  };

  return (
    <div>
      <AddItem onClick={() => setOpen(true)} />
      <BlockTitle title={"Категории"} />
      <CategoriesList
        onDelete={setDeleteId}
        setOpen={setOpen}
        list={select.categories}
      />
      {open ? (
        <AddCategoryModal onSave={callbacks.addCategory} setOpen={setOpen} />
      ) : (
        ""
      )}
      {deleteId ? (
        <ConfirmModal
          onConfirm={() => {
            callbacks.deleteCategory(deleteId);
            setDeleteId(false);
          }}
          onCancel={() => setDeleteId(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminCategories;
