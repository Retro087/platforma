import React from "react";
import s from "./style.module.css";
import CourseItem from "../course-item";

const CoursesList = (props) => {
  debugger;
  return (
    <div className={s.wrap}>
      {props.list.map((i, ind) => {
        return <CourseItem key={ind} item={i} />;
      })}
    </div>
  );
};

export default CoursesList;
