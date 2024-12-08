import { createSlice } from "@reduxjs/toolkit";

export const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    list: [
      {
        title: "Фронтенд разработка для чайников",
        price: 3500,
        description: "Крутой курс для каждого. Вы научитесь всему",
        author: "John d.",
      },
    ],
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = coursesSlice.actions;

export default coursesSlice.reducer;
