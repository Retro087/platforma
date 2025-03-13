import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../../store/statsSlice";
import { useParams } from "react-router";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Charts from "./charts";
import BlockTitle from "../common/block-title";
import StatsSidebar from "./stats-sidebar";
import ContainerLayout from "../../layouts/container-layout";
const StatsContainer = () => {
  const select = useSelector((state) => ({
    favorites: state.stats.favorites,
    views: state.stats.views,
    data: state.stats.data,
  }));
  const params = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStats(params.id));
  }, [params.id]);

  return (
    <div>
      <ContainerLayout alignItems="start" display="flex" width={1500}>
        <StatsSidebar />
        <div style={{ flex: 1 }}>
          <BlockTitle title={`Статистика`} />
          <Charts
            views={select.views}
            data={select.data}
            favorites={select.favorites}
          />
        </div>
      </ContainerLayout>
    </div>
  );
};

export default StatsContainer;
