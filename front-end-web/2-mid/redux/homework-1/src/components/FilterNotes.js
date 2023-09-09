import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../actions";
import "./FilterNotes.css";

const FilterNotes = () => {
  const [filterText, setFilterText] = useState("");
  const dispatch = useDispatch();

  const handleFilterNotes = (text) => {
    setFilterText(text);
    dispatch(setFilter(text));
  };

  return (
    <div>
      <input
        type="text"
        className="filter-notes"
        placeholder="Search Notes..."
        value={filterText}
        onChange={(e) => handleFilterNotes(e.target.value)}
      />
    </div>
  );
};

export default FilterNotes;
