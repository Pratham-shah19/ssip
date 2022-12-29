import React from "react";
import "./Home.css";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

import Chart from "../Chart/Chart";
import RevenueBox from "../RevenueBox/RevenueBox";
import CollapsibleBox from "../Collapsible/CollapsibleBox";



const Home = () => {
  return (
        <div className="ordersContainer">
          <CollapsibleBox />
        </div>
  );
};

export default Home;
