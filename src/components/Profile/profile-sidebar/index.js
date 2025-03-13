import React from "react";
import icon from "../../../assets/icon.png";
import s from "./style.module.css";
const ProfileSidebar = (props) => {
  return (
    <div className={s.wrap}>
      <div className={s.con}>
        <h2 className={s.title}>{props.profile.username}</h2>
        <div className={s.photo_block}>
          <div className={s.img_block}>
            <img src={props.profile.photo || icon} />
          </div>

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
