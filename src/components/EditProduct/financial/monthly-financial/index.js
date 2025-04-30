import React, { useEffect, useState } from "react";
import Input from "../../../common/input";
import s from "./style.module.css";
import BlockTitle from "../../../common/block-title";
const MonthlyFinancial = () => {
  const [financialData, setFinancialData] = useState([]);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  useEffect(() => {
    const initialData = Array.from({ length: 12 }, (_, i) => {
      // Calculate the month and year for each entry
      let monthIndex = (currentMonth - i + 12) % 12; // Ensure positive modulo
      let year = currentYear;
      if (currentMonth - i < 0) {
        year = currentYear - 1; // Adjust year for months in the previous year
      }

      const monthName = new Date(year, monthIndex, 1).toLocaleString(
        "default",
        { month: "long" }
      );

      return {
        month: monthName,
        year: year,
        revenue: "",
        expenses: "",
        profit: 0,
      };
    }).reverse(); // Reverse to display from January of last year (or current year)

    setFinancialData(initialData);
  }, [currentYear, currentMonth]);

  const handleInputChange = (index, field, value) => {
    const newFinancialData = [...financialData];
    newFinancialData[index][field] = value;

    // Calculate profit when either revenue or expenses change
    const revenue = parseFloat(newFinancialData[index].revenue) || 0;
    const expenses = parseFloat(newFinancialData[index].expenses) || 0;
    newFinancialData[index].profit = revenue - expenses;

    setFinancialData(newFinancialData);
  };

  return (
    <div>
      <BlockTitle title={"Месячный отчет"} />
      <table style={{ width: "100%" }}>
        <thead className={s.thead}>
          <tr>
            <th className={s.th}>Месяц</th>
            <th className={s.th}>Выручка</th>
            <th className={s.th}>Расходы</th>
            <th className={s.th}>Чистая прибыль</th>
          </tr>
        </thead>
        <tbody>
          {financialData.map((i, index) => {
            return (
              <tr className={s.tr}>
                <td className={s.td}>{i.month + i.year}</td>
                <td className={s.td}>
                  <Input
                    type="number"
                    value={i.revenue}
                    onChange={(e) =>
                      handleInputChange(index, "revenue", e.target.value)
                    }
                  />
                </td>
                <td className={s.td}>
                  <Input
                    type="number"
                    value={i.expenses}
                    onChange={(e) =>
                      handleInputChange(index, "expenses", e.target.value)
                    }
                  />
                </td>
                <td className={s.td}>{i.profit.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyFinancial;
