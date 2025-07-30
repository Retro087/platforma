import React, { useEffect, useState } from "react";
import HeaderContainer from "../../../Layouts/header-container";
import BlockTitle from "../../../common/block-title";
import Input from "../../../common/input";
import AddItem from "../../../common/add-item";
import Button from "../../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  saveExpenses,
  updateExpense,
} from "../../../../store/articlesSlice";

const Expenses = (props) => {
  const dispatch = useDispatch();
  const expensesAll = useSelector((state) => state.articles.expenses);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    dispatch(getExpenses(props.id));
  }, [props.id]);

  useEffect(() => {
    setExpenses(expensesAll);
  }, [expensesAll]);

  const addExp = () => {
    const newExpense = {
      title: "",
      amount: 0,
      name: `expense_${Date.now()}`,
    };
    dispatch(addExpense({ id: props.id, expense: newExpense }));
  };

  const updateExpenselocal = (index, field, value) => {
    const updatedExpenses = [...expenses];
    if (field === "amount") {
      value = parseInt(value) || 0;
    }
    updatedExpenses[index] = { ...updatedExpenses[index], [field]: value };
    setExpenses(updatedExpenses);
  };
  debugger;
  return (
    <div>
      <BlockTitle title="Расходы" />

      {expenses.length ? (
        expenses.map((expense, index) => (
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
              onBlur={() => dispatch(updateExpense(expense))}
              onChange={(e) =>
                updateExpenselocal(index, "title", e.target.value)
              }
              style={{ flex: 1 }}
            />

            <Input
              name={`amount_${index}`}
              label="Средняя стоимость/месяц"
              type="number"
              value={expense.amount}
              onBlur={() => dispatch(updateExpense(expense))}
              onChange={(e) =>
                updateExpenselocal(index, "amount", e.target.value)
              }
              style={{ width: "200px" }}
            />
            <button onClick={() => dispatch(deleteExpense(expense.id))}>
              Удалить
            </button>
          </div>
        ))
      ) : (
        <div style={{ color: "#FFF" }}>Добавьте расходы</div>
      )}

      <AddItem onClick={addExp} />

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
