import React from "react";
import "./Card.css";

const Card = ({ title, data, lastUpdated, color }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <h2>{title}</h2>
      <p className="data">{data.toLocaleString()}</p>
      <p className="last-updated">
        Last Updated <br />
        {lastUpdated}
      </p>
      {title === "Infected" ? (
        <p className="description">
          The number of people who have been infected with COVID-19.
        </p>
      ) : title === "Recovered" ? (
        <p className="description">
          The number of people who have recovered from COVID-19.
        </p>
      ) : title === "Deceased" ? (
        <p className="description">
          The number of people who have deceased from COVID-19.
        </p>
      ) : title === "Active" ? (
        <p className="description">
          The number of people who are currently infected with COVID-19.
        </p>
      ) : null}
    </div>
  );
};

export default Card;
