import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
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

const ProfileContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState("Персональные");

  const select = useSelector((state) => ({
    isAuth: state.auth.isAuth,
    profile: state.profile.profile,
  }));

  const callbacks = {
    update: useCallback((update) => dispatch(updateProfile(update)), []),
  };
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  debugger;
  const renderContent = () => {
    switch (selectedPage) {
      case "Персональные": {
        return (
          <ProfilePersonal
            update={callbacks.update}
            title={"Персональные"}
            profile={select.profile}
          />
        );
      }
      case "Черновики": {
        return <Drafts />;
      }
    }
  };

  const pagesList = ["Персональные", "Черновики"];

  if (!select.profile) {
    return <div>'не найдено'</div>;
  }

  return (
    <div>
      <ContainerLayout alignItems="start" display="flex" width={1140}>
        <ProfileSidebar
          setSelectedPage={setSelectedPage}
          selectedPage={selectedPage}
          pagesList={pagesList}
          profile={select.profile}
        />
        {renderContent()}
      </ContainerLayout>
    </div>
  );
};

export default ProfileContainer;
