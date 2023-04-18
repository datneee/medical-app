import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Login } from "../../Pages";

const Verification = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);
  const Component = () => {
    if (user?.role == "ADMIN") return children;
    else return <Login />;
  };
  return <Component />;
};

export default Verification;
