import React from "react";
import s from "./style.module.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const Charts = ({ views, favorites, data }) => {
  return (
    <div className={s.wrap}>
      {data.length ? (
        <BarChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="favorites" fill="#8884d8" name="Избранное" />
          <Bar dataKey="views" fill="#82ca9d" name="Просмотры" />
        </BarChart>
      ) : (
        <div className={s.empty}>
          Данных пока не достаточно для отображения более подробной статистики
        </div>
      )}

      <div className={s.data}>
        <div className={s.views}>
          <h2>Просмотры: {views}</h2>
        </div>
        <div className={s.views}>
          <h2>В избранном: {favorites}</h2>
        </div>
      </div>
    </div>
  );
};

export default Charts;
