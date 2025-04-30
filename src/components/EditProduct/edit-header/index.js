import React from "react";
import Button from "../../common/Button";
import s from "./style.module.css";
import { useNavigate, useParams } from "react-router";
const EditHeader = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className={s.wrap}>
      <div onClick={() => navigate("/")} style={{ color: "#FFF" }}>
        Logo
      </div>
      <Button
        onClick={() => navigate(`/article/${params.id}`)}
        value={"Посмотреть превью"}
        heigth={40}
        width={250}
      />
    </div>
  );
};

export default EditHeader;
