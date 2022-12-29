import React from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HistoryIcon from "@mui/icons-material/History";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-top">
        <img className="logo" src="https://cdn-icons-png.flaticon.com/128/562/562678.png"></img>
      </div>
      
      <div className="sidebar-bottom">
        <Link to="/owner-dashboard" style={{ textDecoration: "none" }}>
          <div className="sidebar-bottom-item">
            <HomeIcon sx={{ fontSize: 60 }}/>
            
          </div>
        </Link>
       
        <Link to="/owner-dashboard/menu" style={{ textDecoration: "none" }}>
          <div className="sidebar-bottom-item">
            <RestaurantMenuIcon sx={{ fontSize: 60 }}/>
           
          </div>
        </Link>
        <Link to="/owner-dashboard/confirmOrder" style={{ textDecoration: "none" }} onClick={<IconButton size="40"></IconButton>}>
          <div className="sidebar-bottom-item">
            <ShoppingCartIcon sx={{ fontSize: 60 }}/>
            
          </div>
        </Link>
       
        <Link to="/owner-dashboard/wallet" style={{ textDecoration: "none" }}>
          <div className="sidebar-bottom-item">
            <AccountBalanceWalletIcon sx={{ fontSize: 60 }}/>
            
          </div>
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;
