import React from "react";
import { Meta, BreadCrum } from "../../components";

const About = () => {
  return (
    <div>
      <Meta title={"About"} />
      <BreadCrum title="About" />
      <iframe
        width={"100%"}
        height={"420px"}
        src="https://www.rcainc.com/medical-device-cybersecurity/"
        title="description"
      ></iframe>
    </div>
  );
};

export default About;
