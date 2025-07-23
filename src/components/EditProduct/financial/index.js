import React, { useEffect, useState } from "react";
import Input from "../../common/input";
import Button from "../../common/Button";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/articlesSlice";
import { useNavigate, useParams } from "react-router";
import BlockTitle from "../../common/block-title";
import MonthlyFinancial from "./monthly-financial";
import Select from "../../common/select";

const Financial = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [isMonthly, setIsMonthly] = useState(false);
  const [data, setData] = useState({
    gross_revenue_last_12_months: 0,
    expenses_last_12_months: 0,
    profit: 0,
    avg_monthly_revenue: 0,
    monthly_expenses: 0,
    rentability: 0,
    views: "",
    subs: "",
    currency: "",
  });
  const [currency, setCurrency] = useState(["usd", "руб", "eur"]);

  // Обновляем данные, если есть статья
  useEffect(() => {
    if (props.article.id) {
      setData({
        ...data,
        gross_revenue_last_12_months:
          props.article.gross_revenue_last_12_months,
        expenses_last_12_months: props.article.expenses_last_12_months,
        profit: props.article.profit,
        avg_monthly_revenue: props.article.avg_monthly_revenue,
        monthly_expenses: props.article.monthly_expenses,
        rentability: props.article.rentability,
        views: props.article.views,
        subs: props.article.subs,
        currency: props.article.currency,
      });
    }
  }, [props.article]);

  // Расчетные показатели при изменении входных данных
  useEffect(() => {
    const gross = parseFloat(data.gross_revenue_last_12_months) || 0;
    const expenses = parseFloat(data.expenses_last_12_months) || 0;
    const profit = Math.round(gross - expenses);
    const avgMonthlyRevenue = Math.round(gross / 12);
    const monthlyExpenses = Math.round(expenses / 12);
    const rentability = gross ? Math.round((profit / gross) * 100) : 0; // целое число

    setData((prev) => ({
      ...prev,
      profit: profit,
      avg_monthly_revenue: avgMonthlyRevenue,
      monthly_expenses: monthlyExpenses,
      rentability: rentability,
    }));
  }, [data.gross_revenue_last_12_months, data.expenses_last_12_months]);

  return (
    <div>
      <div style={{ marginBottom: 25 }}>
        <h2 style={{ fontSize: 19, fontWeight: 500, marginBottom: 10 }}>
          Готовы ли вы предоставить ежемесячный финансовый отчет?
        </h2>
        <p>Если нет, вы можете предоставить годовой отчет</p>
      </div>

      <div style={{ marginBottom: 25 }}>
        <Button
          bc={isMonthly ? "blue" : "gray"}
          mr="15px"
          onClick={() => setIsMonthly(true)}
          value={"Да"}
        />
        <Button
          bc={!isMonthly ? "blue" : "gray"}
          onClick={() => setIsMonthly(false)}
          value={"Нет"}
        />
      </div>

      <Select
        mb={25}
        name={"currency"}
        value={data.currency}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        label={"Валюта"}
      >
        {currency.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </Select>

      {isMonthly ? (
        <MonthlyFinancial />
      ) : (
        <>
          <Input
            name={"gross_revenue_last_12_months"}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: parseInt(e.target.value) || 0,
              })
            }
            value={data.gross_revenue_last_12_months}
            label={"Годовой доход за последние 12 месяцев"}
            type="number"
            onBlur={() => {
              if (data.gross_revenue_last_12_months) {
                props.updateProduct(data, "draft");
              }
            }}
          />
          <Input
            name={"expenses_last_12_months"}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: parseInt(e.target.value) || 0,
              })
            }
            value={data.expenses_last_12_months}
            label={"Общие расходы за последние 12 месяцев"}
            type="number"
            onBlur={() => {
              if (data.expenses_last_12_months) {
                props.updateProduct(data, "draft");
              }
            }}
          />
          <Input
            name={"profit"}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: parseInt(e.target.value) || 0,
              })
            }
            value={data.profit}
            label={"Чистая прибыль"}
            type="number"
            onBlur={() => {
              if (data.profit !== null) {
                props.updateProduct(data, "draft");
              }
            }}
          />
          <Input
            name={"avg_monthly_revenue"}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: parseInt(e.target.value) || 0,
              })
            }
            value={data.avg_monthly_revenue}
            label={"Среднемесячный доход"}
            type="number"
            onBlur={() => {
              if (data.avg_monthly_revenue !== null) {
                props.updateProduct(data, "draft");
              }
            }}
          />
          <Input
            name={"monthly_expenses"}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: parseInt(e.target.value) || 0,
              })
            }
            value={data.monthly_expenses}
            label={"Среднемесячные расходы"}
            type="number"
            onBlur={() => {
              if (data.monthly_expenses !== null) {
                props.updateProduct(data, "draft");
              }
            }}
          />
          <Input
            name={"rentability"}
            onChange={(e) =>
              setData({
                ...data,
                [e.target.name]: parseInt(e.target.value) || 0,
              })
            }
            value={data.rentability}
            label={"Рентабельность"}
            type="number"
            onBlur={() => {
              if (data.rentability !== null) {
                props.updateProduct(data, "draft");
              }
            }}
          />
        </>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <Button onClick={() => props.backStep()} value={"Назад"} />
        <Button
          onClick={() => {
            // Передача данных при переходе
            props.updateProduct({ ...data });
            props.nextStep();
          }}
          value={"Далее"}
        />
      </div>
    </div>
  );
};

export default Financial;
