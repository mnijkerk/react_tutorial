import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";

const FilterButton = ({ term, selection, setSelection }) => (
  <button
    className="filterButtons"
    style={{
      border: "1px solid black",
      borderRadius: "5px",
      width: "14rem",
      height: "5rem",
      fontSize: "40px",
      margin: "10px",
    }}
  >
    <input
      type="radio"
      id={term}
      className="btn-check"
      checked={term === selection}
      autoComplete="off"
      onChange={() => setSelection(term)}
    />
    <label htmlFor={term}>{term}</label>
  </button>
);

export default FilterButton;
