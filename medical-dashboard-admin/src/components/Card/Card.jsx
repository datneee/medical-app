import React, { useEffect, useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import axiosClient from "../../utils/httpsRequests/axiosClient";

// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;
  const [revenue, setRevenue] = useState(0);
  const [order, setOrder] = useState(0);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  useEffect(() => {
    axiosClient
      .get("http://localhost:8080/api/v1/orderitems/revenue?month=" + month)
      .then((res) => {
        if (param.id == "revenue") {
          setRevenue(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axiosClient
      .get(
        "http://localhost:8080/api/v1/orderitems/orderInMonth?month=" + month
      )
      .then((res) => {
        if (param.id == "order") {
          setOrder(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month]);
  return (
    <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      // onClick={setExpanded}
    >
      <div className="radialBar">
        <select
          style={{ background: "transparent", color: "white" }}
          className="form-control form-select"
          onClick={(e) => {
            e.preventDefault();
          }}
          onChange={(e) => setMonth(e.target.value)}
          defaultValue={month}
        >
          <option style={{ color: "#000" }} value="1">
            Tháng 1
          </option>
          <option style={{ color: "#000" }} value="2">
            Tháng 2
          </option>
          <option style={{ color: "#000" }} value="3">
            Tháng 3
          </option>
          <option style={{ color: "#000" }} value="4">
            Tháng 4
          </option>
          <option style={{ color: "#000" }} value="5">
            Tháng 5
          </option>
          <option style={{ color: "#000" }} value="6">
            Tháng 6
          </option>
          <option style={{ color: "#000" }} value="7">
            Tháng 7
          </option>
          <option style={{ color: "#000" }} value="8">
            Tháng 8
          </option>
          <option style={{ color: "#000" }} value="9">
            Tháng 9
          </option>
          <option style={{ color: "#000" }} value="10">
            Tháng 10
          </option>
          <option style={{ color: "#000" }} value="11">
            Tháng 11
          </option>
          <option style={{ color: "#000" }} value="12">
            Tháng 12
          </option>
        </select>
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />

        {param.id == "revenue" && (
          <span>
            {" "}
            {revenue.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}{" "}
          </span>
        )}
        {param.id == "order" && <span>{order.length} đơn hàng</span>}
        <div className="d-flex align-items-center gap-10">
          <div className="d-flex gap-10 align-items-center">
            <span>Tháng</span>
            <span>{month}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };

  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>
      <div className="chartContainer">
        <Chart options={data.options} series={param.series} type="area" />
      </div>
      <span>This month</span>
    </motion.div>
  );
}

export default Card;
