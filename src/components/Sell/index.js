import React, { useCallback, useEffect, useState } from "react";
import UrlChoose from "./url-choose";
import { useDispatch, useSelector } from "react-redux";

import Drafts from "../Profile/drafts";
import { getArticle } from "../../store/articleSlice";
import { useNavigate, useParams } from "react-router";
import { createProduct } from "../../store/articlesSlice";

const SellContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    myId: state.auth.myId,
    drafts: state.articles.drafts,
    article: state.article.data,
  }));

  const callbacks = {
    createProduct: useCallback(async (url) => {
      let id = await dispatch(createProduct(url));
      navigate(`/product/edit/${id.payload.id}`);
    }, []),
  };

  return (
    <div>
      <UrlChoose {...callbacks} />
    </div>
  );
};

export default SellContainer;
