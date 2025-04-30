import React, { useRef, useState } from "react";
import icon from "../../../assets/icon.png";
import s from "./style.module.css";
import edit from "../../../assets/pencil.png";
import { useDispatch } from "react-redux";
import { updatePhoto } from "../../../store/profileSlice";
const ProfileSidebar = (props) => {
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

  return (
    <div className={s.wrap}>
      <div className={s.con}>
        <h2 className={s.title}>{props.profile.username}</h2>
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
        <div>
          {props.pagesList.map((i, index) => {
            return (
              <div
                style={{
                  color:
                    props.selectedPage === i.link ? "rgb(63, 130, 255)" : "",
                }}
                className={s.listItem}
                onClick={() => props.setSelectedPage(i.link)}
                key={index}
              >
                {i.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
