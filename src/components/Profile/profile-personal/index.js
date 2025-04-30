import React, { useRef, useState } from "react";
import s from "./style.module.css";
import ProfileItem from "./profile-item";
import ModalWrap from "../../common/modal";
import { updatePhoto } from "../../../store/profileSlice";
import { useDispatch } from "react-redux";

const ProfilePersonal = (props) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    title: "",
    value: "",
    isOpen: false,
  });

  const onClick = (title, value) => {
    setModal({ title, value, isOpen: true });
  };

  const onSave = (value) => {
    props.update({ [modal.title]: value });
    setModal({ title: "", value: "", isOpen: false });
  };

  const onCancel = () => {
    setModal({ title: "", value: "", isOpen: false });
  };

  return (
    <div className={s.wrap}>
      <h2 className={s.title}>{props.title}</h2>

      <div className={s.items}>
        {Object.entries(props.profile.personal).map(([key, value]) => (
          <ProfileItem key={key} onClick={onClick} title={key} value={value} />
        ))}
      </div>
      {modal.isOpen ? (
        <ModalWrap onSave={onSave} onCancel={onCancel} {...modal} />
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePersonal;
