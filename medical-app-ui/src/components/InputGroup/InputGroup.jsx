import React from "react";
import { BsSearch } from "react-icons/bs";

const InputGroup = () => {
  return (
    <div class="input-group">
      <input
        type="text"
        class="form-control py-2"
        placeholder="Search product here ..."
        aria-label="Search product here ..."
        aria-describedby="basic-addon2"
      />
      <span class="input-group-text" id="basic-addon2">
        <BsSearch class="fs-6" />
      </span>
    </div>
  );
};

export default InputGroup;
