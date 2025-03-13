import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import s from "./style.module.css";
import ArticleInfoShort from "../../../Articles/articles-list/article-info-short";
import { currencyFormat } from "../../../../utils/CurrencyFormat";
const MyProductsItem = ({ item, deleteProduct }) => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  return (
    <div>
      <div className={s.wrap}>
        <div className={s.for_sellers}>
          <span onClick={() => setHide(!hide)} className={s.breads}>
            ...
          </span>
          <div className={hide ? s.hide : s.menu}>
            <div onClick={() => deleteProduct(item.id)} className={s.item}>
              Удалить
            </div>
            <div
              onClick={() => navigate(`/product/edit/${item.id}`)}
              className={s.item}
            >
              Изменить
            </div>
            <div
              onClick={() => navigate(`/stats/${item.id}`)}
              className={s.item}
            >
              Подробная статистика
            </div>
          </div>
        </div>

        <Link className={s.a} to={`/article/${item.id}`}>
          <div className={s.container}>
            <div className={s.img}>
              <img src={item.photo} />
            </div>
            <div className={s.text}>
              <h2 className={s.title}>{item.name}</h2>
              <p className={s.short}>{item.short}</p>
              <ArticleInfoShort
                city={item.city}
                age={item.age}
                profit={item.profit}
                margin={item.margin}
                subs={item.subs}
                views={item.views}
              />
            </div>
          </div>
        </Link>
        <div className={s.priceCon}>
          <span className={s.asking}>Запрашиваемая цена</span>
          <p className={s.price}>{currencyFormat(item.price)} </p>
        </div>
        <div className={s.stat}>
          <span className={s.views}>
            Количество просмотров: {item.views_count}
          </span>
          <span className={s.favorites}>
            Добавили в избранное: {item.favorites_count}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyProductsItem;
