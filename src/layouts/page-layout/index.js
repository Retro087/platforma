import React from "react";
import HeaderContainer from "../../components/Layouts/header-container";
import ContainerLayout from "../container-layout";

const PageLayout = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      {children}
    </>
  );
};

export default PageLayout;
