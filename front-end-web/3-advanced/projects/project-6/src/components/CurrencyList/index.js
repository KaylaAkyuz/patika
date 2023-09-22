import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

Chart.register(...registerables);

const CurrencyList = ({ data }) => {
  const [chartData, setChartData] = useState({});
  const [fetchingCharts, setFetchingCharts] = useState(false);

  const columns = [
    {
      title: "#",
      dataIndex: "market_cap_rank",
      key: "market_cap_rank",
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Coin Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <img
            src={record.image}
            alt={text}
            style={{ width: "24px", marginRight: "8px" }}
          />
          {text} ({record.symbol.toUpperCase()})
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      className: "right-aligned-title",
      render: (text) => (
        <div style={{ textAlign: "right" }}>${parseFloat(text).toFixed(2)}</div>
      ),
    },
    {
      title: "Change (24h)",
      dataIndex: "price_change_24h",
      key: "price_change_24h",
      className: "right-aligned-title",
      render: (text, record) => {
        const priceChange24h = parseFloat(text);
        const priceChangePercentage24h = parseFloat(
          record.price_change_percentage_24h
        );
        const isProfit = !isNaN(priceChange24h) && priceChange24h > 0;
        const textColor = isProfit ? "green" : "red";

        return (
          <div style={{ textAlign: "right", color: textColor }}>
            {isNaN(priceChange24h) ? "N/A" : `$${priceChange24h.toFixed(2)}`} (
            {isNaN(priceChangePercentage24h)
              ? "N/A"
              : `${priceChangePercentage24h.toFixed(2)}%`}
            )
          </div>
        );
      },
    },
    {
      title: "Volume (24h)",
      dataIndex: "total_volume",
      key: "total_volume",
      className: "right-aligned-title",
      render: (text) => (
        <div
          style={{
            textAlign: "right",
            color: parseFloat(text) > 0 ? "green" : "red",
          }}
        >
          ${parseFloat(text).toLocaleString()}
        </div>
      ),
    },
    {
      title: "Total Supply",
      dataIndex: "total_supply",
      key: "total_supply",
      className: "right-aligned-title",
      render: (text) => (
        <div style={{ textAlign: "right" }}>
          {text ? text.toLocaleString() : "N/A"}
        </div>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "market_cap",
      key: "market_cap",
      className: "right-aligned-title",
      render: (text) => (
        <div style={{ textAlign: "right" }}>
          ${parseFloat(text).toLocaleString()}
        </div>
      ),
    },
    {
      title: "ATL",
      dataIndex: "atl",
      key: "atl",
      className: "right-aligned-title",
      render: (text) => (
        <div style={{ textAlign: "right" }}>${parseFloat(text).toFixed(2)}</div>
      ),
    },
    {
      title: "ATH",
      dataIndex: "ath",
      key: "ath",
      className: "right-aligned-title",
      render: (text) => (
        <div style={{ textAlign: "right" }}>${parseFloat(text).toFixed(2)}</div>
      ),
    },
    {
      title: "Chart (7 days)",
      dataIndex: "id",
      key: "chart",
      render: (id) => (
        <div style={{ width: "100%", boxSizing: "border-box" }}>
          {" "}
          {chartData[id] ? (
            <Line
              data={chartData[id]}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: false,
                  tooltip: false,
                },
                scales: {
                  x: {
                    display: false,
                  },
                  y: {
                    display: false,
                  },
                },
              }}
            />
          ) : fetchingCharts ? (
            "Loading chart..."
          ) : (
            <Button
              onClick={() => handleFetchChart(id)}
              disabled={!chartData[id] && fetchingCharts}
            >
              Fetch Chart
            </Button>
          )}
        </div>
      ),
    },
  ];

  const handleFetchChart = async (id) => {
    setFetchingCharts(true);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days: 7,
          },
        }
      );

      const formattedChartData = {
        labels: response.data.prices.map((item) => new Date(item[0])),
        datasets: [
          {
            label: "Price (USD)",
            data: response.data.prices.map((item) => item[1]),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      setChartData((prevChartData) => ({
        ...prevChartData,
        [id]: formattedChartData,
      }));
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setFetchingCharts(false);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      const first3Items = data.slice(0, 3);
      for (const item of first3Items) {
        handleFetchChart(item.id);
      }
    }
  }, [data]);

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={false}
      rowKey="id"
      style={{
        marginTop: "1rem",
      }}
    />
  );
};

export default CurrencyList;
