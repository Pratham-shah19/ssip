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
<<<<<<< HEAD
import { API } from "../../constants/API";
const AdminDashboard = ({
  setOrderHistory,
  token_main,
  setWalletPrice,
  wallet,
  totalCustomers,
}) => {
=======

const AdminDashboard = () => {
>>>>>>> upstream/main
  const [search, setSearch] = useState("");
  const [searchres, setSearchres] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token_main) {
      navigate("/");
    }
    setOrderHistory();
    setWalletPrice();
  }, []);
  async function handleChange(e) {
    // console.log("e.target.value", e.target.value);
    //setSearch(e.target.value)
    //dispatch(CustomerActions.setCustomers(e.target.value))
    setSearch(e.target.value);
<<<<<<< HEAD
    const data = await axios.get(
      `${API.admin_server}/api/v1/admin/customers?name=${e.target.value}`,
=======
    // console.log("search", search);
    //const token_main = getState().auth.token_admin;
    // console.log("token_main", token_main);

    const data = await axios.post(
      `http://127.0.0.1:5000/api/v1/admin/customers?name=${e.target.value}`,
      {},
>>>>>>> upstream/main
      {
        headers: {
          Authorization: `Bearer ${token_main}`,
        },
      }
    );
    // console.log("data", data);

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

          {/* <div className="admin-box">
            <div className="box-left">
              <p className="box-title">AVAILABLE COINS</p>
              <p className="box-value">143</p>
              <p className="box-desc">See All COINS</p>
            </div>
            <div className="box-right">
              <div className="box-right-top red">
                <KeyboardArrowDownSharpIcon />
                <p>-1%</p>
              </div>
              <div className="box-right-bottom yellow">
                <TokenIcon />
              </div>
            </div>
          </div> */}

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
                <CurrencyRupeeSharpIcon />
              </div>
            </div>
          </div>
          <div className="admin-box box-report">
            <div className="box-left">
              <p className="box-title">MONTHLY REPORT</p>
              {/* <p className="box-value">Month</p> */}
              <select name="month" id="month" style={{ padding: "5px" }}>
                <option value="current">Current</option>
                <option value="prev">Previous</option>
              </select>
              <button className="gen">Generate</button>
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
            {/* {console.log("len", searchres.length)} */}
            {searchres.length <= 0 ? (
              <h1>Search Employee</h1>
            ) : (
              searchres.map((item) => {
                return <DetailBar data={item} />;
              })
            )}

            {/* <DetailBar data={searchres} /> */}
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
