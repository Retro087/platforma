import React, { useState } from "react";

const AssetsForSale = () => {
  const [assets, setAssets] = useState([
    { name: "Квартира", included: true, id: `asset_${Date.now()}` },
    { name: "Дом", included: false, id: `asset_${Date.now() + 1}` },
  ]);

  const addAsset = () => {
    const newAsset = { name: "", included: false, id: `asset_${Date.now()}` };
    setAssets([...assets, newAsset]);
  };

  const updateAsset = (index, field, value) => {
    const updated = [...assets];
    if (field === "included") {
      value = !!value;
    }
    if (field === "name") {
      value = value.trim();
    }
    updated[index] = { ...updated[index], [field]: value };
    setAssets(updated);
  };

  const removeAsset = (index) => {
    const updated = [...assets];
    updated.splice(index, 1);
    setAssets(updated);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Активы для продажи
      </h2>
      {assets.map((asset, index) => (
        <div
          key={asset.id}
          style={{
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
            position: "relative",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            transition: "transform 0.3s",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // Можно добавить эффект "flip" или анимацию при клике
          }}
        >
          <div style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Название актива"
              value={asset.name}
              onChange={(e) => updateAsset(index, "name", e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "15px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
              }}
            >
              <input
                type="checkbox"
                checked={asset.included}
                onChange={(e) =>
                  updateAsset(index, "included", e.target.checked)
                }
                style={{ marginRight: "5px" }}
              />
              В продаже
            </label>
            <button
              onClick={() => removeAsset(index)}
              style={{
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={addAsset}
        style={{
          display: "block",
          margin: "20px auto 0",
          padding: "10px 20px",
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Добавить актив
      </button>
    </div>
  );
};

export default AssetsForSale;
