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
import { API } from "../../constants/API";
import axios from "axios";

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
  const handle_data = async () => {
    console.log("Hello");
    // const data = await axios.post(
    //   `${API.canteen_server}/api/v1/canteen/dishes/category`,
    //   {},
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token_main}`,
    //     },
    //   }
    // );
    const data = await axios.get(`${API.django_server}`);
    console.log("data", data);
  };

  React.useEffect(() => {
    // console.log("Hello");
    handle_data();
    console.log("Chart");
  }, []);

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
