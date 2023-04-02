import React from "react";
import { BsSearch } from "react-icons/bs";

const InputGroup = () => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control py-2"
        placeholder="Search product here ..."
        aria-label="Search product here ..."
        aria-describedby="basic-addon2"
      />
      <span className="input-group-text" id="basic-addon2">
        <BsSearch className="fs-6" />
      </span>
    </div>
  );
};

export default InputGroup;
