import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const InputGroup = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate(`/store?search=${searchValue}`);
  };
  return (
    <div className="input-group">
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        type="text"
        className="form-control py-2"
        placeholder="Search product here ..."
        aria-label="Search product here ..."
        aria-describedby="basic-addon2"
      />
      <span
        onClick={handleSearch}
        className="input-group-text"
        id="basic-addon2"
      >
        <BsSearch className="fs-6" />
      </span>
    </div>
  );
};

export default InputGroup;
