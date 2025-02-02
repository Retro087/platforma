import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../common/input";
import { createProduct, nextStep } from "../../../store/articlesSlice";
import Button from "../../common/Button";
import Drafts from "../../Profile/drafts";

const UrlChoose = (props) => {
  const [url, setUrl] = useState("");

  return (
    <div>
      <Input
        onChange={(e) => setUrl(e.target.value)}
        value={url}
        label={"Введите url своего бизнеса"}
      />
      <Button
        onClick={() => {
          props.createProduct(url);
        }}
        value={"Продолжить"}
        marginb="45px"
      />
      <Drafts />
    </div>
  );
};

export default UrlChoose;
