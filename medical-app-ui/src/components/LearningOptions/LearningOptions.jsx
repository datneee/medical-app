import React from "react";
import "./LearningOptions.scss";

const LearningOptions = (props) => {
  const options = [
    {
      text: "Chăm sóc sắc đẹp",
      handler: () => {
        window.location.href = "http://localhost:3000/store?category=1";
      },
      id: 1,
    },
    {
      text: "Chăm sóc cá nhân ",
      handler: () => {
        window.location.href = "http://localhost:3000/store?category=2";
      },
      id: 2,
    },
    {
      text: "Thiết bị y tế",
      handler: () => {
        window.location.href = "http://localhost:3000/store?category=3";
      },
      id: 3,
    },
    {
      text: "Thực phẩm chức năng",
      handler: () => {
        window.location.href = "http://localhost:3000/store?category=4";
      },
      id: 4,
    },
    {
      text: "Thuốc",
      handler: () => {
        window.location.href = "http://localhost:3000/store?category=5";
      },
      id: 5,
    },
  ];

  const optionsMarkup = options.map((option) => (
    <button
      className="learning-option-button"
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default LearningOptions;
