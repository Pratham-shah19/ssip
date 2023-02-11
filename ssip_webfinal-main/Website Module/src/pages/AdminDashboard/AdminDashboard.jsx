import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DetailBar from "../../components/DetailBar/DetailBar";
import { useSelector, useDispatch } from "react-redux";
import * as WalletActions from "../../store/actions/wallet";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
const AdminDashboard = ({
  setOrderHistory,
  token_main,
  setWalletPrice,
  wallet,
  totalCustomers,
}) => {
  const [search, setSearch] = useState("");
  const [searchres, setSearchres] = useState([]);
  const [month, setMonth] = useState("prev");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token_main) {
      navigate("/");
    }
    setOrderHistory();
    setWalletPrice();
  }, []);

  async function handleChange(e) {
    console.log("e.target.value", e.target.value);
    setSearch(e.target.value);
    const data = await axios.get(
      `${API.admin_server}/api/v1/admin/customers?name=${e.target.value}`,
      {
        headers: {
          Authorization: `Bearer ${token_main}`,
        },
      }
    );
    setSearchres(data.data.data);
  }

  useEffect(() => {
    handleChange();
  }, []);
  return (
    <div className="admin-container">
      <div className="admin-outer">
        <AdminNavbar />
        <div className="top-components">
          <div className="admin-box">
            <div className="box-left">
              <p className="box-title">USERS</p>
              <p className="box-value">{totalCustomers ? totalCustomers : 0}</p>
              <Link
                to="/admin-dashboard"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="box-desc">See All Users</p>
              </Link>
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
          <div className="admin-box">
            <div className="box-left">
              <p className="box-title">WALLET</p>
              <p className="box-value">₹{wallet}</p>
              <Link
                to="/admin-dashboard/transaction"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="box-desc">See Total Balance</p>
              </Link>
            </div>
            <div className="box-right">
              <div className="box-right-top green">
                <KeyboardArrowUpSharpIcon />
                <p>+2%</p>
              </div>
              <div className="box-right-bottom green">
                <Link to="/admin-dashboard/Payment">
                  <button className="gen2">Pay</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="admin-box box-report">
            <div className="box-left">
              <p className="box-title">MONTHLY REPORT</p>
              {/* <p className="box-value">Month</p> */}
              {/* <input list="months" name="month" id="month">

              </input type=""> */}
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
              {/* <button onClick={handleGenerate} className="gen"> */}
              <a
                href={
                  // month === "prev"
                  month === "current"
                    ? "http://127.0.0.1:5000/api/v1/admin/thismonthreport"
                    : "http://127.0.0.1:5000/api/v1/admin/lastmonthreport"
                  // : "http://127.0.0.1:5000/api/v1/admin/thismonthreport"
                }
                className="rep-btn"
              >
                Generate
              </a>
              {/* </button> */}
            </div>
          </div>
        </div>
        <div className="admin-search">
          <div className="admin-search-inner">
            <input
              type="text"
              name="search"
              onChange={handleChange}
              id="search"
              value={search}
              placeholder="Search any customer"
            />
            <PersonSearchIcon
              style={{ transform: "scale(1.5)", cursor: "pointer" }}
            />
          </div>
          <div className="admin-search-results">
            {searchres.length <= 0 ? (
              <h1>Search Employee</h1>
            ) : (
              <div>
                <div className="wid">
                  <p className="result-id"  style={{minWidth: "170px", paddingLeft: "90px"}}s>ID</p>
                  <p className="result-name">NAME</p>
                  <p className="result-email">EMAIL</p>
                  <p className="result-number">WALLET</p>
                </div>
                <div className="dt-cont">
                {searchres.map((item) => <DetailBar data={item} />)} 
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    token_main: state.auth.token_admin,
    wallet: state.wallet.Wallet,
    totalCustomers: state.wallet.totalCustomers,
  };
}
function mapStateToDispatch(dispatch) {
  return {
    setWalletPrice: () => {
      return dispatch(WalletActions.setWalletPrice());
    },
    setOrderHistory: () => {
      return dispatch(WalletActions.setOrderHistory());
    },
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(AdminDashboard);
