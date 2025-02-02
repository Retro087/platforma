import React from "react";
import Button from "../../common/Button";
import s from "./style.module.css";
const EditHeader = ({ onPreview }) => {
  return (
    <div className={s.wrap}>
      <div style={{ color: "#FFF" }}>Logo</div>
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
