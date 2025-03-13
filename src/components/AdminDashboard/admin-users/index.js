import React, { useEffect, useState } from "react";
import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  adminCreateUser,
  adminDeleteUser,
  adminUpdateUser,
  getAllUsers,
} from "../../../store/adminSlice";
import AdminUsersItem from "./admin-users-item";
import AdminUpdateModal from "./admin-update-modal";
import ConfirmModal from "../../common/confirm-modal";
import add from "../../../assets/add.png";
const AdminUsers = () => {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const [create, setCreate] = useState(false);
  const select = useSelector((state) => ({
    users: state.admin.users,
  }));

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const callbacks = {
    update: ({ id, data }) => {
      dispatch(adminUpdateUser({ id, data }));
    },
    delete: (id) => {
      dispatch(adminDeleteUser(id));
    },
    addUser: (data) => {
      dispatch(adminCreateUser(data));
    },
  };

  return (
    <>
      <div className={s.wrap}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: 25,
            paddingRight: 15,
            cursor: "pointer",
          }}
        >
          <img
            style={{ width: 25, height: 25 }}
            onClick={() => setCreate(true)}
            src={add}
          />
        </div>

        {select.users.length
          ? select.users.map((i) => {
              return (
                <AdminUsersItem
                  setDelete={setDeleteId}
                  setUpdate={setUpdate}
                  item={i}
                />
              );
            })
          : ""}
        {update ? (
          <AdminUpdateModal
            setUpdate={setUpdate}
            update={callbacks.update}
            i={update}
          />
        ) : (
          ""
        )}
        {deleteId ? (
          <ConfirmModal
            onConfirm={() => {
              callbacks.delete(deleteId);
              setDeleteId(false);
            }}
            onCancel={() => setDeleteId(false)}
          />
        ) : (
          ""
        )}
        {create ? (
          <AdminUpdateModal
            setUpdate={setCreate}
            update={callbacks.addUser}
            i={{ username: "", password: "", role: "", email: "" }}
            isCreate={true}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default AdminUsers;
