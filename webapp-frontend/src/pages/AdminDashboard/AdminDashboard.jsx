import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import "./AdminDashboard.css";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import AccountBoxRoundedIcon from "@mui/icons-material/AccountBoxRounded";
import TokenIcon from '@mui/icons-material/Token';
import CurrencyRupeeSharpIcon from "@mui/icons-material/CurrencyRupeeSharp";
import KeyboardArrowUpSharpIcon from "@mui/icons-material/KeyboardArrowUpSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DetailBar from "../../components/DetailBar/DetailBar";
import { useSelector,useDispatch } from "react-redux";
import * as CustomerActions from '../../store/actions/Customers';
import * as WalletActions from '../../store/actions/wallet';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const [search,setSearch] = useState("");
  const navigate  = useNavigate();
  const token_main =  useSelector((state) => state.auth.token_admin);
  console.log('token_main', token_main);
  useEffect(() =>{
    if(!token_main){
      navigate("/");
    }
  },[])

  const dispatch = useDispatch()
  dispatch(WalletActions.setWalletPrice())
  dispatch(WalletActions.setOrderHistory())
  const wallet =  useSelector((state) => state.wallet.Wallet);
  const handleChange = async (e) => {
    console.log('e.target.value',e.target.value)
    //setSearch(e.target.value)
    //dispatch(CustomerActions.setCustomers(e.target.value))
    setSearch(e.target.value);
    console.log('search',search)
    //const token_main = getState().auth.token_admin;
            console.log('token_main', token_main);
            
            const data =  await axios.post(
                `http://127.0.0.1:5000/api/v1/admin/customers?name=${e.target.value}`,{},{
                    headers:{
                        Authorization: `Bearer ${token_main}`
                    }
                }
            );
            console.log('data', data);
  }

  return (
    <div className="admin-container">
      <div className="admin-outer">
        <AdminNavbar />
        <div className="top-components">
          <div className="admin-box">
            <div className="box-left">
              <p className="box-title">USERS</p>
              <p className="box-value">458</p>
              <Link to='/admin-dashboard' style={{textDecoration: "none", color: "black"}}><p className="box-desc">See All Users</p></Link>
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
          </div>

          <div className="admin-box">
            <div className="box-left">
              <p className="box-title">WALLET</p>
              <p className="box-value">₹{wallet}</p>
              <Link to='/admin-dashboard/transaction' style={{textDecoration: "none", color: "black"}}><p className="box-desc">See Total Balance</p></Link>
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
          <div className="admin-search-inner">
            <input type="text" name="search" onChange={handleChange} id="search" value={search} placeholder="Search any customer" />
            <PersonSearchIcon style={{transform: "scale(1.5)", cursor: "pointer"}}/>
          </div>
          <div className="admin-search-results">
            <DetailBar/>
            <DetailBar/>
            <DetailBar/>
            <DetailBar/>
            <DetailBar/>
            <DetailBar/>
            <DetailBar/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
