import React, { useEffect } from "react";
import PageLayout from "../../layouts/page-layout";
import ArticlesContainer from "../../components/Articles";
import BlockTitle from "../../components/common/block-title";
import { useDispatch, useSelector } from "react-redux";
import ContainerLayout from "../../layouts/container-layout";
import { fetchFavorite } from "../../store/favoriteSlice";
import FavoritesContainer from "../../components/Favorite";

const Favorite = () => {
  return (
    <PageLayout>
      <ContainerLayout width={1140}>
        <BlockTitle title={"Избранное"} />
        <FavoritesContainer />
      </ContainerLayout>
    </PageLayout>
  );
};

export default Favorite;
