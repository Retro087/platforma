import React from "react";
import s from "./style.module.css";
function Pagination({ limit, page, totalPages, onChange, indent = 2 }) {
  // Количество страниц

  // Номера слева и справа относительно активного номера, которые остаются видимыми
  let left = Math.max(page - indent, 1);
  let right = Math.min(left + indent * 2, totalPages);
  // Корректировка когда страница в конце
  left = Math.max(right - indent * 2, 1);

  // Массив номеров, чтобы удобней рендерить
  let items = [];
  // Первая страница всегда нужна
  if (left > 1) items.push(1);
  // Пропуск
  if (left > 2) items.push(null);
  // Последовательность страниц
  for (let page = left; page <= right; page++) items.push(page);
  // Пропуск
  if (right < totalPages - 1) items.push(null);
  // Последняя страница
  if (right < totalPages) items.push(totalPages);

  const onClickHandler = (number) => (e) => {
    if (onChange && number) {
      e.preventDefault();
      onChange(number);
    }
  };

  if (totalPages === 1) {
    return "";
  }

  return (
    <ul className={s.list}>
      {items.map((number, index) => (
        <li
          className={s.item}
          style={
            number === page
              ? {
                  backgroundColor: "rgb(130, 184, 255)",
                  color: "#FFF",
                }
              : {}
          }
          key={index}
          onClick={onClickHandler(number)}
        >
          {number ? <a>{number}</a> : "..."}
        </li>
      ))}
    </ul>
  );
}
export default Pagination;
