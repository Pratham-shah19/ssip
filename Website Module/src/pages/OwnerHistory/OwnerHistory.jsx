import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./OwnerHistory.css";
import Header from "../../components/Header_Home/Header";
import * as WalletActions from "../../store/actions/wallet";
import * as OrdersActions from "../../store/actions/Orders";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import CollapsibleGen from "../../components/CollapsibleGen/CollapsibleGen";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import * as AuthActions from "../../store/actions/auth";
const OwnerHistory = ({
  token,
  orderHistory,
  getOrderHistory,
  setHistloaded,
  Histflag,
}) => {
  let [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const btn2_handle = () => {
    navigate("/owner-dashboard/profileScreen");
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getOrderHistory();
    setHistloaded(true);
  }, []);
  useEffect(() => {
    if (Histflag) {
      setloading(false);
    }
    const interval = setInterval(() => {
      getOrderHistory();
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
                  orderHistory.map((item) => {
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

function mapStateToProps(state) {
  return {
    orderHistory: state.Orders.oldOrders,
    token: state.auth.token,
    Histflag: state.auth.Histflag,
  };
}
function mapStateToDispatch(dispatch) {
  return {
    getOrderHistory: () => {
      return dispatch(OrdersActions.setOldOrders());
    },
    setHistloaded: (Histflag) => {
      return dispatch(AuthActions.setHistloaded(Histflag));
    },
  };
}

export default connect(mapStateToProps, mapStateToDispatch)(OwnerHistory);
