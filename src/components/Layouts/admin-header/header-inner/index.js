import React from "react";
import s from "./style.module.css";
import ContainerLayout from "../../../../layouts/container-layout";
import not from "../../../../assets/icon.png";
const HeaderInner = ({ profile }) => {
  return (
    <div className={s.wrap}>
      <div className={s.logo}>Logo</div>

      <div className={s.profile}>
        <div className={s.photo}>
          <img className={s.icon} src={profile.photo ? profile.photo : not} />
        </div>

        {profile.username}
      </div>
    </div>
  );
};

export default HeaderInner;
