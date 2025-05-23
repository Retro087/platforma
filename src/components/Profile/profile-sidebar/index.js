import React, { useRef, useState } from "react";
import icon from "../../../assets/icon.png";
import s from "./style.module.css";
import edit from "../../../assets/pencil.png";
import { useDispatch } from "react-redux";
import { updatePhoto } from "../../../store/profileSlice";
import ProfilePersonal from "../profile-personal";
const ProfileSidebar = (props) => {
  return (
    <div>
      <ProfilePersonal
        update={props.update}
        title={"Персональные"}
        profile={props.profile}
        myId={props.myId}
      />
    </div>
  );
};

export default ProfileSidebar;
