import React, { useState } from "react";
import s from "./style.module.css";
import Arrow from "../../../common/arrow";
const ArticleDescription = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={s.desc}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          borderBottom: open ? "1px solid #d3d3d3" : "none",
        }}
        className={s.desc_header}
      >
        <span className={s.about_title}>О бизнесе</span>
        <div>
          <Arrow isOpen={open} />
        </div>
      </div>
      <div style={{ display: open ? "block" : "none" }} className={s.desc_text}>
        {props.description}
      </div>
    </div>
  );
};

export default ArticleDescription;
