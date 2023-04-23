import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { Link } from "react-router-dom";

const makeStyle = (status) => {
  if (status === "Processing") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "black",
    };
  } else if (status === "Processed") {
    return {
      background: "rgba(255, 173, 173, 0.56)",
      color: "white",
    };
  } else if (status === "Delivering") {
    return {
      background: "#ffe084",
      color: "white",
    };
  } else if (status === "Complete") {
    return {
      background: "rgb(89, 191, 255)",
      color: "white",
    };
  }
};

export default function BasicTable({ orders }) {
  return (
    <div className="Table">
      <h3 className="mb-3">Các đơn hàng gần đây</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Khách mua</TableCell>
              <TableCell align="left">Ngày</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {orders?.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  #{row?.id}
                </TableCell>
                <TableCell align="left">{row?.user?.fullName}</TableCell>
                <TableCell align="left">
                  {row?.orderItems[0]?.createdDate}
                </TableCell>
                <TableCell align="left">
                  <span
                    className="status"
                    style={makeStyle(row?.orderItems[0]?.status)}
                  >
                    {row?.orderItems[0]?.status}
                  </span>
                </TableCell>
                <Link
                  to={"/orders?id=" + row?.id}
                  align="left"
                  className="Details"
                >
                  Chi tiết đơn hàng
                </Link>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
