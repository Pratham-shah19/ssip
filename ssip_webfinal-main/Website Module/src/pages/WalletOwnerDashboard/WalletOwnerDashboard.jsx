import React, { useEffect } from "react";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Sidebar from "../../components/Sidebar/Sidebar";
import Home from "../../components/Home/Home";
import Header from "../../components/Header_Home/Header";
import Wallet from "../../components/Wallet/Wallet";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const WalletOwnerDashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
  const btn1_handle = () => {
    //le.log("kirtan");
    return <p>Hello</p>;
  };

  const btn2_handle = () => {
    navigate("/owner-dashboard/profileScreen");
  };
  return (
    <div className="owner-dashboard-container">
      <div className="owner-inner-container">
        <div className="owner-left">
          <Sidebar />
        </div>
        <div className="owner-right">
          <div className="header_handle">
            <Header
              title="Owner Analytics"
              btn2={btn2_handle}
              btn2title={<AccountCircleIcon sx={{ fontSize: 40 }} />}
            />
          </div>
          <hr />
          <Wallet />
        </div>
      </div>
    </div>
  );
};

export default WalletOwnerDashboard;
