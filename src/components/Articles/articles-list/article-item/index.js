import React, { useState } from "react";
import s from "./style.module.css";
import { Link, useNavigate } from "react-router";

import FavoriteIcon from "../../../common/favorite-icon";

import ArticleInfoShort from "../article-info-short";
import Button from "../../../common/Button";
import { currencyFormat } from "../../../../utils/CurrencyFormat";
import notPhoto from "../../../../assets/photonot.png";
const ArticleItem = (props) => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);

  return (
    <div className={s.wrap}>
      {props.myId === props.item.user_id ? (
        <div className={s.for_sellers}>
          <span onClick={() => setHide(!hide)} className={s.breads}>
            ...
          </span>
          <div className={hide ? s.hide : s.menu}>
            <div
              onClick={() => {
                props.deleteProduct(props.item.id);
                setHide(true);
              }}
              className={s.item}
            >
              Удалить
            </div>
            <div
              onClick={() => navigate(`/product/edit/${props.item.id}`)}
              className={s.item}
            >
              Изменить
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <Link className={s.a} to={`/article/${props.item.id}`}>
        <div className={s.container}>
          <div className={s.img}>
            <img
              style={!props.item.photo ? { width: 35, height: 35 } : ""}
              src={props.item.photo || notPhoto}
            />
          </div>
          <div className={s.text}>
            <h2 className={s.title}>{props.item.name}</h2>
            <p className={s.short}>{props.item.short}</p>
            <ArticleInfoShort
              city={props.item.city}
              age={props.item.age}
              profit={props.item.profit}
              margin={props.item.margin}
              subs={props.item.subs}
              views={props.item.views}
            />
          </div>
        </div>
      </Link>
      <div className={s.priceCon}>
        <span className={s.asking}>Запрашиваемая цена</span>
        <p className={s.price}>{currencyFormat(props.item.price)}</p>

        <Button marginb="35px" value={"Посмотреть"} />

        <div
          onClick={() => {
            if (props.isAuth) {
              props.item.isFavorite
                ? props.deleteFavorite(props.item.id)
                : props.addFavorite(props.item.id);
            } else {
              navigate("/auth");
            }
          }}
          className={s.favourite}
        >
          <FavoriteIcon active={props.item.isFavorite} />
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
