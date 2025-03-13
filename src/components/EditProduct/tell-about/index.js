import React, { useEffect, useState } from "react";
import Input from "../../common/input";
import Button from "../../common/Button";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/articlesSlice";
import { useParams } from "react-router";
import BlockTitle from "../../common/block-title";

const TellAbout = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  let [data, setData] = useState({
    name: "",
    description: "",
    short: "",
    price: "",
    category: "",
    city: "",
    age: "",
  });

  useEffect(() => {
    if (props.article.id) {
      if (props.article.category) {
        setData({
          ...data,
          name: props.article.name,
          description: props.article.description,
          short: props.article.short,
          price: props.article.price,
          age: props.article.age,
          city: props.article.city,
          category: props.article.category,
        });
      } else {
        setData({
          ...data,
          name: props.article.name,
          description: props.article.description,
          short: props.article.short,
          price: props.article.price,
          age: props.article.age,
          city: props.article.city,
          category: props.categories[0].Category,
        });
      }
    }
  }, [props.article]);
  return (
    <div>
      <Input
        name={"name"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.name}
        label={"Название"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"description"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.description}
        label={"Описание"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"short"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.short}
        label={"Короткое описание"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"city"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.city || ""}
        label={"Город"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"age"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.age || ""}
        label={"Сколько лет вашему бизнесу"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"price"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.price}
        label={"Цена"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <select
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
        name={"category"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
        value={data.category}
        label={"Категория"}
      >
        {props.categories.map((i, index) => {
          return (
            <option value={i.Category} key={index}>
              {i.Category}
            </option>
          );
        })}
      </select>
      <Button
        onClick={() => {
          props.updateProduct(data, "draft");
          props.nextStep();
        }}
        value={"Далее"}
      />
    </div>
  );
};

export default TellAbout;
