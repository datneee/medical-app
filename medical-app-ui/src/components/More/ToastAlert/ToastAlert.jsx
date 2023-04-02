import Alert from "react-bootstrap/Alert";
import React from "react";
import "./ToastAlert.scss";

const ToastAlert = (props) => {
  const { variant, children } = props;
  return (
    <Alert className="alert-message" variant={variant}>
      {children}
    </Alert>
  );
};

export default ToastAlert;
