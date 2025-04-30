import React from "react";
import add from "../../../assets/add.png";
const AddItem = ({ onClick }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        marginBottom: 25,
        paddingRight: 15,
        cursor: "pointer",
      }}
    >
      <img style={{ width: 25, height: 25 }} onClick={onClick} src={add} />
    </div>
  );
};

export default AddItem;
