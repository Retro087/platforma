import React from "react";
import Button from "../../common/Button";
import s from "./style.module.css";
import { useNavigate } from "react-router";
const EditHeader = ({ onPreview }) => {
  const navigate = useNavigate();
  return (
    <div className={s.wrap}>
      <div onClick={() => navigate("/")} style={{ color: "#FFF" }}>
        Logo
      </div>
      <Button
        onClick={onPreview}
        value={"Посмотреть превью"}
        heigth={40}
        width={250}
      />
    </div>
  );
};

export default EditHeader;
