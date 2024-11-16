import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Label,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import YAML from "yaml";

function _renderChart(chartData) {
  let bars = [];
  Object.keys(chartData.barOptions).forEach(function (key, index) {
    bars.push(
      <Bar
        key={index}
        dataKey={key}
        fill={chartData.barOptions[key].fillColor}
      />,
    );
  });
  return (
    <div
      style={{
        paddingBottom: "56.25%" /* 16:9 */,
        position: "relative",
        height: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={chartData.data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid />
            <XAxis
              dataKey={chartData.axis.x.dataKey}
              interval={0}
              textAnchor="middle"
            />
            <YAxis>
              <Label
                angle={-90}
                value={chartData.axis.y.label}
                position="insideLeft"
                style={{
                  textAnchor: "middle",
                  fill: "var(--ifm-font-color-base)",
                }}
              />
            </YAxis>
            <Tooltip
              contentStyle={{ backgroundColor: "var(--ifm-background-color)" }}
              labelStyle={{ color: "var(--ifm-font-color-base)" }}
            />
            <Legend />
            {bars}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function Chart(props) {
  const [chartData, setChartData] = useState(undefined);

  const fetchChartData = async (chartDataUrl) => {
    const resp = await fetch(chartDataUrl);
    // TODO - handle error cases
    const yamlText = await resp.text();
    const data = YAML.parse(yamlText);
    // With the chart data, construct whats needed to make the chart
    setChartData(data);
  };

  useEffect(() => {
    fetchChartData(props.chartDataUrl);
  }, [props?.chartDataUrl]);

  return (
    <div>
      {props.title ? (
        <div className="flex justify-center my-4 text-center">
          <div className="w-full">{props.title}</div>
        </div>
      ) : null}
      <div className="flex justify-center my-4">
        <div className="w-full">
          {chartData === undefined
            ? "Loading Chart Data"
            : _renderChart(chartData)}
        </div>
      </div>
    </div>
  );
}
