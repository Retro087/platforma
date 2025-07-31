import React, { useState, useEffect } from "react";
import Button from "../../common/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addSocial,
  deleteSocial,
  getSocials,
  updateSocial,
} from "../../../store/socialSlice";
import { useParams } from "react-router-dom";
import Input from "../../common/input";

const SocialMedia = (props) => {
  const [socials, setSocials] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const select = useSelector((state) => ({
    socials: state.social.list,
  }));

  useEffect(() => {
    dispatch(getSocials(params.id));
  }, [params.id]);

  useEffect(() => {
    setSocials(select.socials);
  }, [select.socials]);

  const addSoc = () => {
    const newSocial = {
      platform: "",
      followers: 0,
      id: `social_${Date.now()}`,
    };
    dispatch(addSocial({ social: newSocial, id: params.id }));
  };

  const updateSocialLocal = (index, field, value) => {
    const updated = [...socials];
    if (field === "followers") {
      value = parseInt(value) || 0;
    }
    updated[index] = { ...updated[index], [field]: value };
    setSocials(updated);
  };

  return (
    <div>
      <h2>Социальные сети и подписчики</h2>
      {socials.map((social, index) => (
        <div
          key={social.id}
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Input
            type="text"
            ph="Платформа"
            value={social.platform}
            onBlur={() => dispatch(updateSocial(social))}
            onChange={(e) =>
              updateSocialLocal(index, "platform", e.target.value)
            }
            style={{ flex: 2 }}
          />
          <Input
            type="number"
            ph="Подписчики"
            onBlur={() => dispatch(updateSocial(social))}
            value={social.followers}
            onChange={(e) =>
              updateSocialLocal(index, "followers", e.target.value)
            }
            style={{ width: "150px" }}
          />
          <button
            onClick={() => {
              dispatch(deleteSocial(social.id));
            }}
            style={{ padding: "5px 10px" }}
          >
            Удалить
          </button>
        </div>
      ))}
      <button
        onClick={addSoc}
        style={{ marginTop: "10px", padding: "8px 12px" }}
      >
        Добавить соцсеть
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button onClick={() => props.backStep()} value="Назад" />
        <Button
          onClick={() => {
            // Передать текущие соцсети родителю, если нужно
            if (props.setSocials) {
              props.setSocials(socials);
            }
            props.nextStep();
          }}
          value="Вперед"
        />
      </div>
    </div>
  );
};

export default SocialMedia;
