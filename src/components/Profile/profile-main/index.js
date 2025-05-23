import React, { useRef, useState } from "react";
import s from "./style.module.css";
import { useDispatch } from "react-redux";
import edit from "../../../assets/pencil.png";
import icon from "../../../assets/icon.png";
import star from "../../../assets/star.png";
import { updatePhoto } from "../../../store/profileSlice";
import MyProducts from "../my-products";
import TransactionsContainer from "../Transactions";
import MyRequests from "../my-requests";

const ProfileMain = (props) => {
  const [editPhoto, setEditPhoto] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    debugger;
    if (file) {
      const formData = new FormData();
      formData.append("updatePicture", file); // 'profilePicture' is the field name your backend expects
      dispatch(updatePhoto({ photo: formData, id: props.myId }));
    }
  };
  debugger;
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: 50 }}
        className={s.mainBlock}
      >
        <div className={s.top}>
          <div className={s.photo_block}>
            {editPhoto ? (
              <div
                onMouseLeave={() => setEditPhoto(false)}
                className={s.img_edit}
                onClick={() => fileInputRef.current.click()}
              >
                <img src={edit} />
              </div>
            ) : (
              <div
                onMouseEnter={() => setEditPhoto(true)}
                className={s.img_block}
              >
                <img src={props.profile.photo || icon} />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            <div className={s.txt}>
              <span className={s.city}>{props.profile.city}</span>
            </div>
          </div>
          <div className={s.text}>
            <h2 className={s.name}>{props.profile.personal.name}</h2>
            <p className={s.role}>Бизнес-брокер</p>
            <div className={s.rate}>
              <img src={star} />
              <img src={star} />
              <img src={star} />
              4.9
            </div>
            <p className={s.descr}>
              Помогаю предприннимателям покупать и продавать бизнес уже 12 лет
            </p>
            <button className={s.edit}>Редактировать профиль</button>
          </div>
        </div>
        <MyProducts />
        <TransactionsContainer />
        <MyRequests />
      </div>
    </div>
  );
};

export default ProfileMain;
