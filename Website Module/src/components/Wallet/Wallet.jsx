import React from "react";
import "./Wallet.css";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import axios from "axios";
import { API } from "../../constants/API";
import Chart from "../Chart/Chart";
import RevenueBox from "../RevenueBox/RevenueBox";

const Wallet = () => {
  return (
    <div className="home-container">
      <div className="top-components">
        <div className="wallet-box">
          <div className="box-left">
            <p className="box-title">USERS</p>
            <p className="box-value">458</p>
            <p className="box-desc">See All Users</p>
          </div>
          <div className="box-right">
            <div className="box-right-top green">
              <KeyboardArrowUpSharpIcon />
              <p>+5%</p>
            </div>
            <div className="box-right-bottom red">
              <AccountBoxRoundedIcon />
            </div>
          </div>
        </div>

        <div className="wallet-box">
          <div className="box-left">
            <p className="box-title">CURRENT ORDERS</p>
            <p className="box-value">143</p>
            <p className="box-desc">See All Orders</p>
          </div>
          <div className="box-right">
            <div className="box-right-top red">
              <KeyboardArrowDownSharpIcon />
              <p>-1%</p>
            </div>
            <div className="box-right-bottom yellow">
              <ShoppingCartIcon />
            </div>
          </div>
        </div>

        <div className="wallet-box">
          <div className="box-left">
            <p className="box-title">WALLET</p>
            <p className="box-value">₹2561</p>
            <p className="box-desc">See Total Balance</p>
          </div>
          <div className="box-right">
            <div className="box-right-top green">
              <KeyboardArrowUpSharpIcon />
              <p>+2%</p>
            </div>
            <div className="box-right-bottom green">
              <CurrencyRupeeSharpIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-components">
        {/* <div className="bottom-left">
          <div className="revenue-box">
            <RevenueBox />
          </div>
        </div> */}
        <div className="bottom-right">
          <p className="box-title">Last 7 Months (income)</p>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
