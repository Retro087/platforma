import React, { useEffect, useState } from "react";
import Input from "../../common/input";
import Button from "../../common/Button";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../store/articlesSlice";
import { useParams } from "react-router";
import BlockTitle from "../../common/block-title";

const Financial = (props) => {
  const dispatch = useDispatch();
  const params = useParams();

  let [margin, setMargin] = useState("");
  let [profit, setProfit] = useState("");
  let [views, setViews] = useState("");
  let [subs, setSubs] = useState("");

  useEffect(() => {
    if (props.article.id) {
      setMargin(props.article.margin);
      setProfit(props.article.profit);
      setViews(props.article.views);
      setSubs(props.article.subs);
    }
  }, [props.article]);

  return (
    <div>
      <Input
        onChange={(e) => setMargin(e.target.value)}
        value={margin}
        label={"Маржа"}
      />
      <Input
        onChange={(e) => setProfit(e.target.value)}
        value={profit}
        label={"Профит"}
      />
      <Input
        onChange={(e) => setViews(e.target.value)}
        value={views}
        label={"Просмотры"}
      />
      <Input
        onChange={(e) => setSubs(e.target.value)}
        value={subs}
        label={"Подписчики"}
      />

      <Button
        onClick={() => {
          props.updateProduct({
            id: params.id,
            data: { margin, profit, subs, views },
            status: "published",
          });
        }}
        value={"Далее"}
      />
    </div>
  );
};

export default Financial;
