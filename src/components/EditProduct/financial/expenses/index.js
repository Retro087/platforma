import React, { useEffect, useState } from "react";
import HeaderContainer from "../../../Layouts/header-container";
import BlockTitle from "../../../common/block-title";
import Input from "../../../common/input";
import AddItem from "../../../common/add-item";
import Button from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, saveExpenses } from "../../../../store/articlesSlice";

const Expenses = (props) => {
  const dispatch = useDispatch();
  const expensesAll = useSelector((state) => state.articles.expenses);
  const [expenses, setExpenses] = useState([
    { title: "Реклама", monthAvg: 0, name: "reclama" },
    { title: "Домен", monthAvg: 0, name: "domen" },
  ]);

  useEffect(() => {
    dispatch(getExpenses(props.id));
  }, [props.id]);

  useEffect(() => {
    if (expensesAll.length) {
      setExpenses(expensesAll);
    }
  }, [expensesAll]);

  const addExpense = () => {
    const newExpense = {
      title: "",
      monthAvg: 0,
      name: `expense_${Date.now()}`,
    };
    setExpenses([...expenses, newExpense]);
  };

  const updateExpense = (index, field, value) => {
    const updatedExpenses = [...expenses];
    if (field === "monthAvg") {
      value = parseInt(value) || 0;
    }
    updatedExpenses[index] = { ...updatedExpenses[index], [field]: value };
    setExpenses(updatedExpenses);
  };

  const saveExpense = () => {
    const filteredExpenses = expenses.filter(
      (el) =>
        el.title.trim() !== "" &&
        el.monthAvg !== null &&
        el.monthAvg !== undefined
    );
    dispatch(saveExpenses({ expenses: filteredExpenses, id: props.id }));
    setExpenses(filteredExpenses);
  };

  return (
    <div>
      <BlockTitle title="Расходы" />

      {expenses.map((expense, index) => (
        <div
          key={expense.name}
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "15px",
            alignItems: "center",
          }}
        >
          <Input
            name={`title_${index}`}
            label="Название расхода"
            value={expense.title}
            onChange={(e) => updateExpense(index, "title", e.target.value)}
            style={{ flex: 1 }}
          />

          <Input
            name={`monthAvg_${index}`}
            label="Средняя стоимость/месяц"
            type="number"
            value={expense.monthAvg}
            onChange={(e) => updateExpense(index, "monthAvg", e.target.value)}
            style={{ width: "200px" }}
          />
        </div>
      ))}

      <AddItem onClick={addExpense} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button onClick={() => props.backStep()} value="Назад" />
        <Button
          onClick={() => {
            // Перед удалением проверим и очистим пустые элементы
            saveExpense();
            // Потом перейдем к следующему этапу
            props.nextStep();
            // Если нужно, можно передавать expenses родителю
            // props.setExpenses(expenses);
          }}
          value="Вперед"
        />
      </div>
    </div>
  );
};

export default Expenses;
