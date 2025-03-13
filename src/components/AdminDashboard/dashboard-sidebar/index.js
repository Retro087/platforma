import React from "react";
import { useNavigate } from "react-router";
import s from "./style.module.css";
const DashboardSidebar = ({ list, active }) => {
  const navigate = useNavigate();

  return (
    <div className={s.wrap}>
      {list.map((i) => {
        return (
          <div
            style={{ backgroundColor: active === i.link ? "#f0f0f0" : "" }}
            className={s.item}
            onClick={() => navigate(`/admin/${i.link}`)}
          >
            {i.title}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardSidebar;
