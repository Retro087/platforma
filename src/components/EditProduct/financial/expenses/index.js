import React, { useState } from "react";
import HeaderContainer from "../../../Layouts/header-container";
import BlockTitle from "../../../common/block-title";
import Input from "../../../common/input";
import AddItem from "../../../common/add-item";
import Button from "../../../common/Button";

const Expenses = (props) => {
  const [expenses, setExpenses] = useState([
    { title: "Реклама", monthAvg: 0, name: "reclama" },
    { title: "Домен", monthAvg: 0, name: "domen" },
  ]);

  function addExpense() {
    props.addExpense();
  }

  return (
    <div>
      {expenses.map((i) => {
        return (
          <div style={{ display: "flex", gap: 35 }}>
            <Input
              name={i.name}
              onChange={(e) => setExpenses()}
              label={"Название расхода"}
              value={i.title}
            />{" "}
            <Input
              onChange={(e) =>
                setExpenses(
                  ...expenses.map((el) => {
                    if (i.title === el.title) {
                      return { ...el, monthAvg: e.target.value };
                    }
                    return el;
                  })
                )
              }
              value={i.monthAvg}
              label={"Средняя стоимость/месяц"}
            />
          </div>
        );
      })}
      <AddItem onClick={addExpense} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => props.backStep()} value={"Назад"} />
        <Button
          onClick={() => {
            props.nextStep();
          }}
          marginb="50px"
          value={"Вперед"}
        />
      </div>
    </div>
  );
};

export default Expenses;
