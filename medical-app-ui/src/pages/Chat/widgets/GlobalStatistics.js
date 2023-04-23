import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getData } from "../data";

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getData();

      // const filteredFlights = flights.filter((item) => item.Status === null);

      setStats(stats);
      setLoading(false);
    };
    getStats();
  }, []);

  return (
    <div className="stats">
      <div className="column-left">
        <p> Tổng số ca mắc :</p>
        <p> Số lượng người đã phục hồi :</p>
        <p> Số ca đang được điều trị :</p>
        <p> Số lượng người mất :</p>
      </div>

      <div className="column-right">
        <ClipLoader color={"#fff"} loading={loading} />
        <p>{stats?.total?.world?.cases}</p>
        <p>{stats?.total?.world?.recovered}</p>
        <p>{stats?.total?.world?.treating}</p>
        <p>{stats?.total?.world?.death}</p>
      </div>
    </div>
  );
};

export default Statistics;
