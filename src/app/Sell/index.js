import React from "react";
import PageLayout from "../../layouts/page-layout";
import SellContainer from "../../components/Sell";
import ContainerLayout from "../../layouts/container-layout";

const Sell = () => {
  return (
    <PageLayout>
      <ContainerLayout width={1140}>
        <SellContainer />
      </ContainerLayout>
    </PageLayout>
  );
};

export default Sell;
