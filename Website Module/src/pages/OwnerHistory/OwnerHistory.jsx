import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./OwnerHistory.css";
import Header from "../../components/Header_Home/Header";
import * as WalletActions from "../../store/actions/wallet";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CollapsibleGen from "../../components/CollapsibleGen/CollapsibleGen";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const OwnerHistory = () => {
  let [newOrders, setNewOrders] = useState([]);
  let [loading, setloading] = useState(true);
  const [time, setTime] = useState(Date.now());
  const newOrder = useSelector((state) => state.wallet.orderHistory);
  //   //le.log("order1", newOrder);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const btn2_handle = () => {
    navigate("/owner-dashboard/profileScreen");
  };
  const loadProducts = useCallback(async () => {
    try {
      await dispatch(WalletActions.setOrderHistory());
      setNewOrders(newOrder);
      //le.log("orders", newOrder);
    } catch (err) {
      //le.log(err.message);
    }
  }, [dispatch]);

  //Just an Session Handling

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const interval = setInterval(() => {
      loadProducts().then(() => setloading(false));
      setTime(Date.now());
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [newOrder]);

  return (
    <>
      {loading === false ? (
        <div className="owner-dashboard-container">
          <div className="owner-inner-container">
            <div className="owner-left">
              <Sidebar />
            </div>
            <div className="owner-right">
              <div className="header_handle">
                <Header
                  title="Past Orders"
                  btn2={btn2_handle}
                  btn2title={<AccountCircleIcon sx={{ fontSize: 40 }} />}
                />
              </div>

              <div className="hr_line">
                <hr />
              </div>
              <div className="home_comp">
                {!loading &&
                  newOrder.map((item) => {
                    return (
                      <CollapsibleGen
                        _button={item.data.button}
                        orderId={item.data._id}
                        item_arr={item.items}
                        otp={item.data.otp}
                        cust_name={item.userdetail.username}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default OwnerHistory;
