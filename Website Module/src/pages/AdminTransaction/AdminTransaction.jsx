import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import { connect } from "react-redux";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import TransactionBar from "../../components/TransactionBar/TransactionBar";
import "./AdminTransaction.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../../constants/API";
import * as WalletActions from "../../store/actions/wallet";
const AdminTransaction = ({ totalCustomers, token_main, wallet }) => {
  const [_orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token_main) {
      navigate("/");
    }
  }, []);
  const fetchHistory = async () => {
    const data = await axios.get(
      `${API.admin_server}/api/v1/admin/orders?status=COMPLETED`,
      {
        headers: {
          Authorization: `Bearer ${token_main}`,
        },
      }
    );
    const orders = data.data.data;
    setOrders(orders);
  };
  useEffect(() => {
    fetchHistory();
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
                <CurrencyRupeeSharpIcon />
              </div>
            </div>
          </div>
          <div className="admin-box box-report">
            <div className="box-left">
              <p className="box-title">MONTHLY REPORT</p>
              {/* <p className="month-name">Month</p> */}
              <select name="month" id="month" style={{ padding: "5px" }}>
                <option value="current">Current</option>
                <option value="prev">Previous</option>
              </select>
              <button className="gen">Generate</button>
            </div>
          </div>
        </div>
        <div className="admin-search">
          <div className="admin-search-results">
            {_orders.map((order) => {
              return <TransactionBar id={order._id} price={order.price} />;
            })}
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

export default connect(mapStateToProps, mapStateToDispatch)(AdminTransaction);
