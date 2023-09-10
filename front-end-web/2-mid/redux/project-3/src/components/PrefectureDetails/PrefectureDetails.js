import React from "react";
import "./PrefectureDetails.css";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Cell,
} from "recharts";

const PrefectureDetails = ({ prefectureData }) => {
  const customData = [
    {
      name: "Infected",
      value: prefectureData?.infected || 0,
      color: "#ff6b81",
    },
    {
      name: "Recovered",
      value: prefectureData?.recovered || 0,
      color: "#50d890",
    },
    {
      name: "Deceased",
      value: prefectureData?.deceased || 0,
      color: "#39f9e6",
    },
    {
      name: "Active",
      value: prefectureData?.active || 0,
      color: "#ffcc29",
    },
  ];

  return (
    <div className="prefecture-details">
      <h2>Prefecture Details</h2>
      {prefectureData ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={customData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {customData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Select a prefecture to view details.</p>
      )}
    </div>
  );
};

export default PrefectureDetails;
