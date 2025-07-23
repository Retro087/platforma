import React, { useEffect, useState } from "react";
import s from "./style.module.css";
import Button from "../../common/Button";
const MonetizationType = (props) => {
  const types = [
    { value: "Подписка" },
    { value: "Транзакционная комиссия" },
    { value: "Реклама" },
    { value: "Продажа товаров" },
    { value: "Лидогенерация" },
    { value: "Другое" },
  ];

  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;

    let newSelectedTypes; //  Временная переменная

    if (selectedTypes.includes(value)) {
      // Если опция уже выбрана, удаляем ее из списка
      debugger;
      newSelectedTypes = selectedTypes.filter((option) => option !== value);
    } else {
      debugger;
      // Если опция не выбрана, добавляем ее в список
      newSelectedTypes = [...selectedTypes, value];
    }

    setSelectedTypes(newSelectedTypes);
    props.updateProduct({
      monetization_model: newSelectedTypes,
    }); //  Обновляем состояние
  };

  useEffect(() => {
    if (props.article && props.article.monetization_model) {
      try {
        debugger;
        //  Пытаемся распарсить строку JSON
        const parsedTypes = JSON.parse(props.article.monetization_model);
        setSelectedTypes(parsedTypes);
      } catch (e) {
        //  Если не удалось распарсить, оставляем как есть
        setSelectedTypes(props.article.monetization_model);
      }
    } else {
      setSelectedTypes([]);
    }
  }, [props.article]);

  return (
    <div>
      {types.map((option) => (
        <label
          style={{
            backgroundColor: selectedTypes.includes(option.value)
              ? "#cce5ff"
              : "white",
            borderLeft: selectedTypes.includes(option.value)
              ? "4px solid blue"
              : "1px solid #ced4da",
            padding: "15px",
            boxSizing: "border-box",
            borderRadius: "3px",
            border: "1px solid #ced4da",
            display: "flex",
          }}
          className={s.lab}
          key={option.value}
        >
          <div className={s.text}>{option.value}</div>
          <input
            className={s.input}
            type="checkbox"
            value={option.value}
            checked={selectedTypes.includes(option.value)}
            onChange={handleCheckboxChange}
            style={{ marginRight: "5px", width: "50px" }}
          />
        </label>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => props.backStep()} value={"Назад"} />
        <Button
          onClick={() => {
            props.updateProduct({
              monetization_model: selectedTypes,
            });
            props.nextStep();
          }}
          marginb="50px"
          value={"Вперед"}
        />
      </div>
    </div>
  );
};

export default MonetizationType;
