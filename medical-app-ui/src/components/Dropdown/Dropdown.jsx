import React from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ categories }) => {
  return (
    <div className="dropdown-list">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Medical categories
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {categories.map((category, index) => (
            <li key={category.id}>
              <Link
                className="dropdown-item"
                to={"/store?category=" + category?.id}
              >
                {category?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
