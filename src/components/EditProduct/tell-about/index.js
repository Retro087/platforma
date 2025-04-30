import React, { useEffect, useState } from "react";
import Input from "../../common/input";
import Button from "../../common/Button";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/articlesSlice";
import { useParams } from "react-router";
import BlockTitle from "../../common/block-title";
import Select from "../../common/select";

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
    reason_for_selling: "",
    founded_date: null,
  });

  useEffect(() => {
    if (props.article.id) {
      debugger;
      if (props.article.category) {
        setData({
          ...data,
          name: props.article.name,
          description: props.article.description,
          short: props.article.short,
          price: props.article.price,
          age: props.article.age,
          city: props.article.city,
          reason_for_selling: props.article.reason_for_selling,
          founded_date: props.article.founded_date,
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
          reason_for_selling: props.article.reason_for_selling,
          founded_date: props.article.founded_date,
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
        w={"200px"}
        label={"Дата основания"}
        name="founded_date"
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.founded_date}
        type="date"
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
        label={"Где расположен ваш бизнес"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Input
        name={"reason_for_selling"}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        value={data.reason_for_selling || ""}
        label={"Причина продажи"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
      />
      <Select
        label={"Категория"}
        value={data.category}
        name={"category"}
        onBlur={(e) => {
          if (e.target.value) {
            props.updateProduct(data, "draft");
          }
        }}
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
      >
        {props.categories.map((i, index) => {
          return (
            <option value={i.Category} key={index}>
              {i.Category}
            </option>
          );
        })}
      </Select>

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
