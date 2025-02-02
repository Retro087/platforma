import React from "react";
import EditProductContainer from "../../components/EditProduct";
import PageLayout from "../../layouts/page-layout";
import ContainerLayout from "../../layouts/container-layout";
import EditHeader from "../../components/EditProduct/edit-header";

const EditProduct = () => {
  return (
    <div>
      <EditHeader />
      <ContainerLayout width={1140}>
        <EditProductContainer />
      </ContainerLayout>
    </div>
  );
};

export default EditProduct;
