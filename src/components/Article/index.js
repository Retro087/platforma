import React, { useCallback, useEffect, useState } from "react";
import ArticleCard from "./article-card-main";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getArticle } from "../../store/articleSlice";
import Header from "../Layouts/header-container/header";
import HeaderContainer from "../Layouts/header-container";
import ArticleCardMain from "./article-card-main";
import ContainerLayout from "../../layouts/container-layout";
import ArticleSidebar from "./article-sidebar";
import { addView } from "../../store/articlesSlice";
import { createChat } from "../../store/chatsSlice";
import { createRequest, getRequest } from "../../store/purchaseRequests";
import ConfirmModal from "../common/confirm-modal";
import RequestModal from "../common/request-modal";

const ArticleCardContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    article: state.article.data,
    myId: state.auth.myId,
    request: state.purchase.request,
  }));
  const [request, setRequest] = useState(false);
  const [buy, setBuy] = useState(false);

  useEffect(() => {
    if (
      select.article.status === "draft" &&
      select.article.user_id !== select.myId
    ) {
      navigate("/");
    }
  }, [select.article, select.myId]);

  useEffect(() => {
    dispatch(getArticle({ userId: select.myId, itemId: params.id }));
    dispatch(getRequest(params.id));
  }, [params.id]);

  useEffect(() => {
    if (
      select.myId !== select.article.user_id &&
      select.myId &&
      select.article.id
    ) {
      dispatch(addView(select.article.id));
    }
  }, [select.article, select.myId]);
  const callbacks = {
    createChat: useCallback((user1, user2) =>
      dispatch(createChat({ user1, user2 }))
    ),
    createRequest: (businessId, amount) => {
      dispatch(createRequest({ businessId, amount }));
    },
  };
  return (
    <ContainerLayout
      justify="space-between"
      alignItems="start"
      display="flex"
      width={1350}
    >
      <ArticleCardMain item={select.article} />
      <ArticleSidebar
        item={select.article}
        request={select.request}
        id={select.article.id}
        myId={select.myId}
        author={select.article.user_id}
        title={select.article.name}
        price={select.article.price}
        createChat={callbacks.createChat}
        createRequest={() => setRequest(true)}
        buy={() => setBuy(true)}
      />
      {buy ? (
        <ConfirmModal
          onCancel={() => setBuy(false)}
          onConfirm={() => {
            callbacks.createRequest(select.article.id, select.article.price);
            setBuy(false);
          }}
        />
      ) : (
        ""
      )}
      {request ? (
        <RequestModal
          onCancel={() => setRequest(false)}
          onConfirm={(price) => {
            callbacks.createRequest(select.article.id, price);
            setRequest(false);
          }}
        />
      ) : (
        ""
      )}
    </ContainerLayout>
  );
};

export default ArticleCardContainer;
