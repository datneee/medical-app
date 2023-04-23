import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getData } from "../data";

import Link from "./Link";

const DeliveryLink = () => {
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
  const getUrl = () => {
    return (
      <div className="stats">
        <div className="column-left">
          <p> Tổng số ca bệnh trong nước :</p>
          <p> Số ca bệnh đã phục hồi :</p>
          <p> Tổng số người đã mất :</p>
          <p> Số người đang điều trị :</p>
        </div>
        <div className="column-right">
          <ClipLoader color={"#fff"} loading={loading} />
          <p>{stats?.today?.internal?.cases}</p>
          <p>{stats?.today?.internal?.recovered}</p>
          <p>{stats?.today?.internal?.death}</p>
          <p>{stats?.today?.internal?.treating}</p>
        </div>
      </div>
    );
  };

  return getUrl();
};

export default DeliveryLink;
