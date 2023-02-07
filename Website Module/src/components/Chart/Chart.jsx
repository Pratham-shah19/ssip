import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    {
      name: "January",
      uv: 4000,
    },
    {
      name: "February",
      uv: 3000,
    },
    {
      name: "March",
      uv: 2000,
    },
    {
      name: "April",
      uv: 2780,
    },
    {
      name: "May",
      uv: 1890,
    },
    {
      name: "June",
      uv: 2390,
    },
    {
      name: "July",
      uv: 3490,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="85%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
