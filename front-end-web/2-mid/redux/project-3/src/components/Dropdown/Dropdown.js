import React from "react";
import Select from "react-select";
import "./Dropdown.css";

const Dropdown = ({ prefectures, selectedPrefecture, onChange }) => {
  const options = prefectures.map((prefecture) => ({
    value: prefecture,
    label: prefecture,
  }));

  return (
    <div className="dropdown">
      <label htmlFor="prefecture">Select a Prefecture: </label>
      <Select
        id="prefecture"
        options={options}
        className="select"
        value={
          selectedPrefecture
            ? { value: selectedPrefecture, label: selectedPrefecture }
            : null
        }
        onChange={(selectedOption) =>
          onChange(selectedOption ? selectedOption.value : "")
        }
        placeholder="Select a Prefecture"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            text: "orangered",
            primary25: "#ffecf0",
            primary75: "#ffecf0",
            primary: "pink",
          },
        })}
        styles={{
          control: (provided) => ({
            ...provided,
            width: "150px",
            borderRadius: "10px",
          }),
          option: (provided, state) => ({
            ...provided,
            ":active": {
              backgroundColor: "#f48fb1",
              color: "white",
            },
          }),
        }}
      />
    </div>
  );
};

export default Dropdown;
