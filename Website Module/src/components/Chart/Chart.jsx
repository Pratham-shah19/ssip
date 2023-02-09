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
  let [_data, setData] = React.useState();
  // const data = [
  //   {
  //     name: "January",
  //     uv: 4000,
  //   },
  //   {
  //     name: "February",
  //     uv: 3000,
  //   },
  //   {
  //     name: "March",
  //     uv: 2000,
  //   },
  //   {
  //     name: "April",
  //     uv: 2780,
  //   },
  //   {
  //     name: "May",
  //     uv: 1890,
  //   },
  //   {
  //     name: "June",
  //     uv: 2390,
  //   },
  //   {
  //     name: "July",
  //     uv: 3490,
  //   },
  // ];
  const handle_data = async () => {
    const data = await axios.get(`${API.django_server}`);
    console.log(data.data.Graph);
    // const peopleArrays = [data.data.Graph];

    // const peopleObjects = peopleArrays.map(([name, qty]) => ({
    //   name,
    //   qty,
    // }));
    let temp_data = [data.data.Graph];
    var result = temp_data.map((a) => a.foo);
    console.log(result);
    // You can use Object.keys() and map() to do this
    // var obj = {"1":5,"2":7,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0,"12":0}
    var result = Object.keys(data.data.Graph).map((key) => [
      key,
      data.data.Graph[key],
    ]);
    // console.log(result.length);
    // console.log("data", data.data.Graph);
    let final_object = {};
    for (var i = 0, j = 0; i < result.length; i++) {
      final_object[i].dish_name = result[i][j];
      j++;
      final_object[i].orders = result[i][j];
      j = 0;
    }
    // console.log("final_object", final_object);
    setData(data);
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
        data={_data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dish_name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="orders"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
