import React, { useEffect } from "react";
import "./Wallet.css";
import { Link } from "react-router-dom";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
import Chart from "../Chart/Chart";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RevenueBox from "../RevenueBox/RevenueBox";
import PayReqs from "../PayReqs/PayReqs";

const Wallet = () => {
  const [month, setMonth] = React.useState("current");
  const [balance, setBalance] = React.useState();
  const [currentreq, setCurrentreq] = React.useState();
  const [pastreq, setPastreq] = React.useState();
  const [chart, setChart] = React.useState(true);
  const data = [
    {
      name: "Samosa",
      qty: 40,
    },
    {
      name: "Gujrati Thali",
      qty: 30,
    },
    {
      name: "Coffee",
      qty: 20,
    },
    {
      name: "Tea",
      qty: 27,
    },
    {
      name: "Idli Sambhar",
      qty: 18,
    },
    {
      name: "Upma",
      qty: 23,
    },
    {
      name: "Poha",
      qty: 34,
    },
  ];
  const balance_fetch = async () => {
    const data = await axios.get(`${API.canteen_server}/api/v1/canteen/wallet`);
    // console.log("data", data.data.wallet);
    let bal = data.data.wallet;
    setBalance(bal);
  };
  const currentreq_fetch = async () => {
    const data = await axios.get(
      `${API.canteen_server}/api/v1/cashpayment/canteenView`
    );
    console.log("Currentpayreq", data.data.data);
    let _data = data.data.data;
    setCurrentreq(_data);
  };
  const pastreq_fetch = async () => {
    const data = await axios.get(
      `${API.canteen_server}/api/v1/cashpayment/adminHistory`
    );
    console.log("adminHistory", data.data.data);
    let _data = data.data.data;
    setPastreq(_data);
  };

  // let navigate = useNavigate();
  useEffect(() => {
    balance_fetch();
    currentreq_fetch();
    pastreq_fetch();
  }, []);
  function render_req() {
    const payreq_fetch = async () => {
      const data = await axios.get(
        `${API.canteen_server}/api/v1/cashpayment/canteenView`
      );
      console.log("data", data);
      // let bal = data.data.wallet;
      // setBalance(bal);
    };
    payreq_fetch();
  }
  function reset() {
    console.log("entered");
    async function _reset() {
      const res = await axios.get(
        `${API.canteen_server}/api/v1/canteen/resetButton`,
        { headers: {} }
      );
      console.log("done res graph", res);
    }
    _reset();
  }

  return (
    <div className="home-container">
      <div className="top-components">
        <div className="wallet-box">
          <div className="box-left">
            <p className="box-title">USERS</p>
            <p className="box-value">458</p>

            <button
              className="pay-btn"
              onClick={() => {
                setChart(false);
              }}
            >
              See All Users
            </button>
          </div>
          <div className="box-right">
            <div className="box-right-top green">
              <KeyboardArrowUpSharpIcon />
              {/* <p>+5%</p> */}
            </div>
            <div className="box-right-bottom red">
              <AccountBoxRoundedIcon />
            </div>
          </div>
        </div>

        <div className="admin-box box-report">
          <div className="box-left">
            <p className="box-title">MONTHLY REPORT</p>
            {/* <p className="month-name">Month</p> */}
            <select
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                console.log(e.target.value);
              }}
              id="month"
              style={{ padding: "5px" }}
            >
              <option value="current">Current</option>
              <option value="prev">Previous</option>
            </select>
            <div className="report-buttons">
              <a
                href={
                  month === "prev"
                    ? `${API.canteen_server}/api/v1/canteen/lastMonthReport`
                    : `${API.canteen_server}/api/v1/canteen/thisMonthReport`
                }
                className="gen-btn"
              >
                GENERATE
              </a>
              <button onClick={reset()} className="chart-btn">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="wallet-box">
          <div className="box-left">
            <p className="box-title">WALLET</p>
            <p className="box-value">₹{balance}</p>
            <p className="box-desc">See Total Balance</p>
          </div>
          <div className="box-right">
            <div className="box-right-top green">
              <KeyboardArrowUpSharpIcon />
              {/* <p>+2%</p> */}
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
        {chart ? (
          <div className="bottom-right">
            {/* <p className="box-title">Last 7 Months (income)</p>
            <Chart />
            <p className="box-title">Last 7 Months (income)</p>
            <Chart /> 
            <p className="box-title">Last 7 Months (income)</p> */}
            <Chart data={data} />
          </div>
        ) : (
          <div className="bottom-right">
            <PayReqs oldreqs={pastreq.reverse()} currentreqs={currentreq} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
