import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Login } from "../../pages";

const Verification = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);
  
  const Component = () => {
    if (user) return children;
    else return <Login />;
  };
  return <Component />;
};

export default Verification;
