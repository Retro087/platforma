import React, { useState } from "react";
import s from "./style.module.css";
import ChooseCategory from "../../../common/choose-category";
import logo from "../../../../assets/logo.png";
import ContainerLayout from "../../../../layouts/container-layout";
import loopa from "../../../../assets/search.png";
import icon from "../../../../assets/icon.png";
import chat from "../../../../assets/chat.png";
import notification from "../../../../assets/notifications.png";

import { Link } from "react-router";
import FavoriteIcon from "../../../common/favorite-icon";
import Button from "../../../common/Button";
import Notification from "../notification-item";
import NotificationItem from "../notification-item";
import BlockTitle from "../../../common/block-title";

const Header = (props) => {
  const [input, setInput] = useState("");
  const [focus, setFocus] = useState(false);
  const [hide, setHide] = useState(true);
  const [openNotifications, setOpenNotifications] = useState(false);
  return (
    <div className={s.wrap}>
      <ContainerLayout display={"flex"} width={1140}>
        <Link to={"/"}>
          <div className={s.logo}>
            <img src={logo} />
          </div>
        </Link>
        <ChooseCategory list={props.categories} />
        <div className={s.search}>
          <img className={s.loopa} src={loopa} />
          <input
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className={focus ? s.focus : s.input}
          />
          <button
            onClick={() => props.setParams(input)}
            disabled={focus ? true : false}
            className={focus ? s.focus_btn : s.btn}
          >
            Найти
          </button>
        </div>
        <div className={s.profile}>
          {props.isAuth ? (
            <div className={s.actions}>
              <div className={s.fav_block}>
                <Link to="/favorite">
                  <FavoriteIcon />
                </Link>
              </div>
              <div className={s.fav_block}>
                <Link to="/chats">
                  <img className={s.chat} src={chat} />
                  {props.unread ? (
                    <span className={s.unread}>{props.unread}</span>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
              <div className={s.fav_block}>
                <img
                  onClick={() => setOpenNotifications(!openNotifications)}
                  className={s.chat}
                  src={notification}
                />
                {openNotifications ? (
                  <div
                    onClick={() => props.readNotifications()}
                    className={s.notifications}
                  >
                    <BlockTitle fs={20} title={"Уведмоления"} />
                    {props.notifications.length ? (
                      props.notifications.map((i) => {
                        return <NotificationItem notification={i} />;
                      })
                    ) : (
                      <div>Уведомлений нет</div>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Button
                onClick={() => props.toSell()}
                mr="25px"
                value={"Продать сейчас"}
              />
              <div onClick={() => setHide(!hide)} className={s.profile_block}>
                <span className={s.login}>{props.profile.username}</span>
                <div className={s.icon}>
                  <img src={props.profile.photo ? props.profile.photo : icon} />
                </div>
                {!hide ? (
                  <ul className={s.hide}>
                    <li onClick={props.toProfile} className={s.hide_item}>
                      Профиль
                    </li>
                    <li onClick={props.logout} className={s.hide_item}>
                      Выйти
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <button onClick={() => props.toAuth()} className={s.btn_auth}>
              Войти
            </button>
          )}
        </div>
      </ContainerLayout>
    </div>
  );
};

export default Header;
