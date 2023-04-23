import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getData } from "../data";

const Statistics = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStats = async () => {
      const stats = await getData();
      console.log(stats);
      setStats(stats);
      setLoading(false);
    };
    getStats();
  }, []);

  return (
    <div className="stats">
      <div className="column-left">
        <p> Tổng số ca bệnh toàn thế giới :</p>
        <p> Tổng số ca bệnh trong nước :</p>
        <p> Số ca bệnh đã phục hồi :</p>
        <p> Tổng số người đã mất :</p>
        <p> Số người đang điều trị :</p>
      </div>
      <div className="column-right">
        <ClipLoader color={"#fff"} loading={loading} />
        <p>{stats?.total?.world?.cases}</p>
        <p>{stats?.total?.internal?.cases}</p>
        <p>{stats?.total?.internal?.recovered}</p>
        <p>{stats?.total?.internal?.death}</p>
        <p>{stats?.total?.internal?.treating}</p>
      </div>
    </div>
  );
};

export default Statistics;
