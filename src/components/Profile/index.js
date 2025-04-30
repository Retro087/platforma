import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import Login from "../Auth/login";
import Registration from "../Auth/registration";
import { fetchAuth, fetchReg } from "../../store/authSlice";
import HeaderContainer from "../Layouts/header-container";
import ProfilePersonal from "./profile-personal";
import ContainerLayout from "../../layouts/container-layout";
import ProfileSidear from "./profile-sidebar";
import { Modal } from "bootstrap";
import AuthInput from "../common/input";
import ModalWrap from "../common/modal";
import { getProfile, updateProfile } from "../../store/profileSlice";
import ProfileSidebar from "./profile-sidebar";
import Drafts from "./drafts";
import MyProducts from "./my-products";
import MyRequests from "./my-requests";
import TransactionsContainer from "./Transactions";

const ProfileContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();

  const [pagesList, setPageList] = useState([
    { name: "Персональные", link: "personal" },
    { name: "Черновики", link: "drafts" },
    { name: "Мои товары", link: "my-products" },
    { name: "Мои запросы на покупку", link: "purchase-requests" },

    { name: "Успешные сделки", link: "transactions" },
  ]);

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    profile: state.profile.profile,
    role: state.auth.role,
    myId: state.auth.myId,
  }));

  const callbacks = {
    update: useCallback((update) => dispatch(updateProfile(update)), []),
    setSelectedPage: (link) => {
      navigate(`/profile/${link}`);
    },
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (select.role === "admin") {
      setPageList([...pagesList, { name: "Админка", link: "admin" }]);
    }
  }, [select.role]);

  const renderContent = () => {
    switch (params.page) {
      case "drafts": {
        return <Drafts />;
      }
      case "admin": {
        navigate("/admin");
        break;
      }
      case "my-products": {
        return <MyProducts />;
      }
      case "purchase-requests": {
        return <MyRequests />;
      }
      case "transactions": {
        return <TransactionsContainer />;
      }
      default:
        return (
          <ProfilePersonal
            update={callbacks.update}
            title={"Персональные"}
            profile={select.profile}
            myId={select.myId}
          />
        );
    }
  };

  if (!select.profile) {
    return <div>'не найдено'</div>;
  }

  return (
    <div>
      <ContainerLayout alignItems="start" display="flex" width={1140}>
        <ProfileSidebar
          myId={select.myId}
          setSelectedPage={callbacks.setSelectedPage}
          selectedPage={params.page || "personal"}
          pagesList={pagesList}
          profile={select.profile}
        />
        {renderContent()}
      </ContainerLayout>
    </div>
  );
};

export default ProfileContainer;
