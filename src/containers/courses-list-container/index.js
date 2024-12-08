import React from "react";
import Header from "../../components/header";
import { useSelector } from "react-redux";
import CoursesList from "../../components/courses-list";

const CoursesListContainer = () => {
  const select = useSelector((state) => ({
    courses: state.courses.list,
  }));

  return (
    <div>
      <CoursesList list={select.courses} />
    </div>
  );
};

export default CoursesListContainer;
