import React, { useEffect, useState } from "react";
import Input from "../../common/input";
import Button from "../../common/Button";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/articlesSlice";
import { useNavigate, useParams } from "react-router";
import BlockTitle from "../../common/block-title";

const Financial = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    margin: "",
    profit: "",
    views: "",
    subs: "",
  });

  useEffect(() => {
    if (props.article.id) {
      setData({
        ...data,
        margin: props.article.margin,
        profit: props.article.profit,
        views: props.article.views,
        subs: props.article.subs,
      });
    }
  }, [props.article]);

  return (
    <div>
      <Input
        name={"margin"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.margin}
        label={"Маржа"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"profit"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.profit}
        label={"Профит"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"views"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.views}
        label={"Просмотры"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"subs"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.subs}
        label={"Подписчики"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />

      <Button
        onClick={() => {
          props.updateProduct(data, "published");
          navigate("/");
        }}
        value={"Далее"}
      />
    </div>
  );
};

export default Financial;
