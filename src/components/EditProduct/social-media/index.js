import React, { useState } from "react";
import Button from "../../common/Button";

const SocialMedia = (props) => {
  const [socials, setSocials] = useState([
    { platform: "Facebook", followers: 0, id: `social_${Date.now()}` },
    { platform: "Instagram", followers: 0, id: `social_${Date.now() + 1}` },
  ]);

  const addSocial = () => {
    const newSocial = {
      platform: "",
      followers: 0,
      id: `social_${Date.now()}`,
    };
    setSocials([...socials, newSocial]);
  };

  const updateSocial = (index, field, value) => {
    const updated = [...socials];
    if (field === "followers") {
      value = parseInt(value) || 0;
    }
    updated[index] = { ...updated[index], [field]: value };
    setSocials(updated);
  };

  const removeSocial = (index) => {
    const updated = [...socials];
    updated.splice(index, 1);
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
          <input
            type="text"
            placeholder="Платформа"
            value={social.platform}
            onChange={(e) => updateSocial(index, "platform", e.target.value)}
            style={{ flex: 2 }}
          />
          <input
            type="number"
            placeholder="Подписчики"
            value={social.followers}
            onChange={(e) => updateSocial(index, "followers", e.target.value)}
            style={{ width: "150px" }}
          />
          <button
            onClick={() => removeSocial(index)}
            style={{ padding: "5px 10px" }}
          >
            Удалить
          </button>
        </div>
      ))}
      <button
        onClick={addSocial}
        style={{ marginTop: "10px", padding: "8px 12px" }}
      >
        Добавить соцсеть
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={() => props.backStep()} value={"Назад"} />
        <Button
          onClick={() => {
            props.nextStep();
          }}
          marginb="50px"
          value={"Вперед"}
        />
      </div>
    </div>
  );
};

export default SocialMedia;
