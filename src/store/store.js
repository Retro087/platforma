import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./coursesSlice";
import profileSlice from "./profileSlice";

export default configureStore({
  reducer: {
    courses: coursesSlice,
    profile: profileSlice,
  },
});
