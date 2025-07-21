import React, { useRef, useState } from "react";
import icon from "../../../assets/icon.png";
import s from "./style.module.css";
import edit from "../../../assets/pencil.png";
import { useDispatch } from "react-redux";
import { updatePhoto } from "../../../store/profileSlice";
import ProfilePersonal from "../profile-personal";
import Drafts from "../drafts";
const ProfileSidebar = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
      <ProfilePersonal
        update={props.update}
        title={"Персональные"}
        profile={props.profile}
        myId={props.myId}
      />
      <Drafts />
    </div>
  );
};

export default ProfileSidebar;
