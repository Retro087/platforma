import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getArticle } from "../../store/articleSlice";
import TellAbout from "./tell-about";
import EditHeader from "./edit-header";
import BlockTitle from "../common/block-title";
import { backStep, nextStep, updateProduct } from "../../store/articlesSlice";
import Financial from "./financial";
import MonetizationType from "./monetization-type";
import Expenses from "./financial/expenses";
import Subscriptions from "./subscriptions";
import SocialMedia from "./social-media";
import AssetsForSale from "./assets-for-sale";

const EditProductContainer = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const select = useSelector((state) => ({
    article: state.article.data,
    myId: state.auth.myId,
    categories: state.categories.list,
    step: state.articles.step,
  }));

  useEffect(() => {
    dispatch(getArticle({ userId: select.myId, itemId: params.id }));
  }, []);

  const callbacks = {
    updateProduct: useCallback((data, status) => {
      dispatch(
        updateProduct({
          id: params.id,
          data,
          status,
        })
      );
    }, []),
    nextStep: useCallback(() => dispatch(nextStep()), []),
    backStep: useCallback(() => dispatch(backStep()), []),
  };

  const render = () => {
    switch (select.step) {
      case 1:
        return (
          <TellAbout
            updateProduct={callbacks.updateProduct}
            categories={select.categories}
            article={select.article}
            nextStep={callbacks.nextStep}
          />
        );

      case 2:
        return <Financial {...callbacks} article={select.article} />;
      case 3:
        return <MonetizationType {...callbacks} article={select.article} />;
      case 4:
        return <Expenses {...callbacks} />;
      case 5:
        return <SocialMedia {...callbacks} />;
      case 6:
        return <AssetsForSale />;
      default:
        break;
    }
  };

  return (
    <>
      <BlockTitle title={"Расскажите о своем бизнесе"} />
      {render()}
    </>
  );
};

export default EditProductContainer;
