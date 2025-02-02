import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrafts } from "../../../store/articlesSlice";
import DraftItem from "./draft-item";
import BlockTitle from "../../common/block-title";

const Drafts = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    drafts: state.articles.drafts,
    myId: state.auth.myId,
  }));

  useEffect(() => {
    dispatch(getDrafts(select.myId));
  }, [select.myId]);

  return (
    <div style={{ flexGrow: 1 }}>
      <BlockTitle title={"Черновики"} />
      {select.drafts.map((i, ind) => {
        return <DraftItem key={ind} item={i} />;
      })}
    </div>
  );
};

export default Drafts;
