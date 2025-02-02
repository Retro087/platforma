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

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [short, setShort] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [city, setCity] = useState("");
  let [age, setAge] = useState("");
  useEffect(() => {
    if (props.article.id) {
      debugger;
      setName(props.article.name);
      setDescription(props.article.description);
      setShort(props.article.short);
      setPrice(props.article.price);
      if (props.article.category) {
        setCategory(props.article.category);
      } else {
        setCategory(props.categories[0].Category);
      }
      setAge(props.article.age);
      setCity(props.article.city);
    }
  }, [props.article]);
  debugger;
  return (
    <div>
      <Input
        onChange={(e) => setName(e.target.value)}
        value={name}
        label={"Название"}
      />
      <Input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        label={"Описание"}
      />
      <Input
        onChange={(e) => setShort(e.target.value)}
        value={short}
        label={"Короткое описание"}
      />
      <Input
        onChange={(e) => setCity(e.target.value)}
        value={city || ""}
        label={"Город"}
      />
      <Input
        onChange={(e) => setAge(e.target.value)}
        value={age || ""}
        label={"Сколько лет вашему бизнесу"}
      />
      <Input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        label={"Цена"}
      />
      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
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
          props.updateProduct({
            id: params.id,
            data: { name, description, short, price, category, age, city },
            status: "draft",
          });
          props.nextStep();
        }}
        value={"Далее"}
      />
    </div>
  );
};

export default TellAbout;
