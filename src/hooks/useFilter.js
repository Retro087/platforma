import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Если используете Redux
import qs from "qs";
import { setParams } from "../store/articlesSlice";
const useFilter = (initialFilters) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Если используете Redux

  // Состояние для хранения фильтров

  const handleFilterChange = (value) => {
    const newFilters = { ...initialFilters, ...value };

    // Обновляем состояние только если оно изменилось
    if (JSON.stringify(newFilters) !== JSON.stringify(initialFilters)) {
      dispatch(setParams(newFilters)); // Обновляем состояние в Redux
      // Обновляем URL с новыми параметрами
      const newQueryString = qs.stringify(newFilters);
      const params = new URLSearchParams(location.search);
      params.set("filter", newQueryString);
      navigate({ search: params.toString() });
    }
  };

  // Эффект для установки начального состояния из URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterFromUrl =
      params.get("filter") ||
      qs.stringify({ min: 0, max: Infinity, query: "" });

    const parsedFilters = qs.parse(filterFromUrl);

    // Обновляем состояние только если оно изменилось
    if (JSON.stringify(parsedFilters) !== JSON.stringify(initialFilters)) {
      dispatch(setParams(parsedFilters)); // Обновляем состояние в Redux
    }
  }, [location.search, initialFilters]);

  return [initialFilters, handleFilterChange];
};

export default useFilter;
