import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import TokenIcon from "@mui/icons-material/Token";
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import TransactionBar from "../../components/TransactionBar/TransactionBar";
import { useSelector } from "react-redux";
import "./AdminTransaction.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminTransaction = () => {
  const [id, setid] = useState("");
  const [price, setPrice] = useState(0);
  const [_orders, setOrders] = useState([]);
  const token_main = useSelector((state) => state.auth.token_admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token_main) {
      navigate("/");
    }
  }, []);
  const fetchHistory = async () => {
    //le.log("called_fetchhistoy");
    const data = await axios.get(
      `http://127.0.0.1:5000/api/v1/admin/orders?status=COMPLETED`,
      {
        headers: {
          Authorization: `Bearer ${token_main}`,
        },
      }
    );
    //le.log("data_history", data);
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
              <p className="box-value">458</p>
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
              <p className="box-value">₹2561</p>
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
        </div>
        <div className="admin-search">
          <div className="admin-search-results">
            {_orders.map((order) => {
              //le.log(order);
              return <TransactionBar id={order._id} price={order.price} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTransaction;
