import React, { useEffect, useState } from "react";
import HistoryIcon from "@mui/icons-material/History";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./HomeOwnerDashboard.css";
import Header from "../../components/Header_Home/Header";
import CollapsibleBox from "../../components/Collapsible/CollapsibleBox";
import * as OrdersActions from "../../store/actions/Orders";
import * as AuthActions from "../../store/actions/auth";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { API } from "../../constants/API";
const HomeOwnerDashboard = ({
  newOrder,
  token,
  orderId,
  getCurrentOrders,
  Flag,
  setloaded,
}) => {
  let [newOrders, setNewOrders] = useState(newOrder);
  let [first_id, setFirst_id] = useState(0);
  let [time, setTime] = useState(Date.now());
  let [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const btn1_handle = () => {
    navigate("/owner-history");
  };
  const btn2_handle = () => {
    navigate("/owner-dashboard/profileScreen");
  };

  useEffect(() => {
    getCurrentOrders();
    console.log("orderId Intr", orderId);
    if (!loading) {
      alert("Order is Completed!");
    }
  }, [orderId]);
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    console.log("orders", newOrder);
    setloaded(true);
  }, []);

  useEffect(() => {
    if (Flag) {
      setloading(false);
    }
    const interval = setInterval(() => {
      getCurrentOrders();

      console.log("item", newOrder);
      setTime(Date.now());
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

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
                  title="Current Orders"
                  btn1={btn1_handle}
                  btn1title={<HistoryIcon sx={{ fontSize: 40 }} />}
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
                      <CollapsibleBox
                        _button={item.orderdetail.button}
                        orderId={item.orderdetail._id}
                        item_arr={item.items}
                        otp={item.orderdetail.otp}
                        cust_name={item.userdetail}
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

function mapStateToProps(state) {
  return {
    newOrder: state.Orders.newOrders,
    token: state.auth.token,
    orderId: state.Orders.orderId,
    Flag: state.auth.flag,
  };
}
function mapStateToDispatch(dispatch) {
  return {
    getCurrentOrders: () => {
      return dispatch(OrdersActions.setNewOrders());
    },
    setloaded: (flag) => {
      return dispatch(AuthActions.setloaded(flag));
    },
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(HomeOwnerDashboard);
