import React from "react";
import { Meta, BreadCrum } from "../../components";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, [])
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
