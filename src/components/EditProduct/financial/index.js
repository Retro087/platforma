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
  const [isMonthly, setIsMonthly] = useState(true);
  const [data, setData] = useState({
    gross_revenue_last_12_months: 0,
    mrr: 0,
    last_3_month: 0,
    profit: "",
    views: "",
    subs: "",
    currency: "",
  });
  const [currency, setCurrency] = useState(["usd", "руб", "eur"]);

  useEffect(() => {
    if (props.article.id) {
      setData({
        ...data,
        margin: props.article.margin,
        profit: props.article.profit,
        views: props.article.views,
        subs: props.article.subs,
        gross_revenue_last_12_months:
          props.article.gross_revenue_last_12_months,
        mrr: props.article.mrr,
        last_3_month: props.article.last_3_month,
      });
    }
  }, [props.article]);

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
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
        label={"Валюта"}
      >
        {currency.map((i) => {
          return <option>{i}</option>;
        })}
      </Select>

      {isMonthly ? (
        <MonthlyFinancial />
      ) : (
        <>
          <Input
            name={"gross_revenue_last_12_months"}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            value={data.gross_revenue_last_12_months}
            label={"Годовой доход за последние 12 месяцев"}
            onBlur={(e) => {
              if (e.target.value) {
                props.updateProduct(data, "draft");
              }
            }}
          />
          <Input
            name={"mrr"}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            value={data.mrr}
            label={"Средняя ежемесячная выручка"}
            onBlur={(e) => {
              if (e.target.value) {
                props.updateProduct(data, "draft");
              }
            }}
          />
          <Input
            name={"last_3_month"}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            value={data.last_3_month}
            label={"Выручка за последние три месяца"}
            onBlur={(e) => {
              if (e.target.value) {
                props.updateProduct(data, "draft");
              }
            }}
          />
        </>
      )}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => props.backStep()} value={"Назад"} />
        <Button
          onClick={() => {
            props.updateProduct(data);
            props.nextStep();
          }}
          value={"Далее"}
        />
      </div>
    </div>
  );
};

export default Financial;
